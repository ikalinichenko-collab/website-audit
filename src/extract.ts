import * as cheerio from "cheerio";
import type { Settings } from "./types.js";
import type { ExtractedPage } from "./types.js";
import { resolvePageType } from "./page-type.js";
import { isInternal, truncateWords, collapseWhitespace, sha256 } from "./utils.js";
import { filterOutSiteWideNodes } from "./schema-fingerprint.js";
import type { FetchResult } from "./fetch.js";
import { realImageSrc, visibleMainHtml } from "./html-content.js";

function decodeCloudflareEmail(encoded: string): string {
  const key = parseInt(encoded.slice(0, 2), 16);
  let out = "";
  for (let i = 2; i < encoded.length; i += 2) {
    out += String.fromCharCode(parseInt(encoded.slice(i, i + 2), 16) ^ key);
  }
  return out;
}

export function decodeCloudflareEmailsInHtml(html: string): string {
  const $ = cheerio.load(html);
  $("[data-cfemail]").each((_, el) => {
    const encoded = $(el).attr("data-cfemail");
    if (!encoded) return;
    try {
      const email = decodeCloudflareEmail(encoded);
      $(el).replaceWith(email);
    } catch {
      /* keep element */
    }
  });
  return $.html();
}

function hasType(o: Record<string, unknown>): boolean {
  const t = o["@type"];
  return typeof t === "string" || (Array.isArray(t) && t.length > 0);
}

function walkJsonLdTypedNodes(value: unknown, out: Record<string, unknown>[]): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const v of value) walkJsonLdTypedNodes(v, out);
    return;
  }
  const o = value as Record<string, unknown>;
  if (hasType(o)) out.push(o);
  for (const v of Object.values(o)) {
    if (v && typeof v === "object") walkJsonLdTypedNodes(v, out);
  }
}

export function flattenJsonLd(nodes: unknown[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const n of nodes) walkJsonLdTypedNodes(n, out);
  return out;
}

export function parseJsonLdBlocks(html: string): unknown[] {
  const $ = cheerio.load(html);
  const blocks: unknown[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const text = $(el).html()?.trim();
    if (!text) return;
    try {
      blocks.push(JSON.parse(text));
    } catch {
      /* invalid */
    }
  });
  return blocks;
}

/** Like parseJsonLdBlocks, but reports blocks that do not parse instead of skipping them silently. */
export function parseJsonLdDetailed(html: string): { blocks: unknown[]; errors: { start: string }[] } {
  const $ = cheerio.load(html);
  const blocks: unknown[] = [];
  const errors: { start: string }[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const text = $(el).html()?.trim();
    if (!text) return;
    try {
      blocks.push(JSON.parse(text));
    } catch {
      errors.push({ start: text.slice(0, 120) });
    }
  });
  return { blocks, errors };
}

function isNavOrButton(el: { tagName?: string; attribs?: Record<string, string> }): boolean {
  const tag = el.tagName?.toLowerCase();
  if (tag === "button" || tag === "nav" || tag === "header" || tag === "footer") return true;
  const role = el.attribs?.role?.toLowerCase();
  return role === "navigation" || role === "button";
}

function isTableOfContentsText(text: string): boolean {
  return /^table of contents\b/i.test(text.trim());
}

function paragraphTextIsUsable(text: string): boolean {
  const t = collapseWhitespace(text).replace(/^table of contents\s*/i, "").trim();
  if (t.length < 20) return false;
  return !isTableOfContentsText(t);
}

function extractFirstParagraphAfterH1($m: cheerio.CheerioAPI): string {
  const h1 = $m("#main h1").first();
  if (h1.length) {
    for (const p of h1.nextAll("p").toArray()) {
      const t = collapseWhitespace($m(p).text());
      if (paragraphTextIsUsable(t)) return t.replace(/^table of contents\s*/i, "").trim();
    }
    let el = h1.next();
    while (el.length) {
      const node = el.get(0);
      if (node && isNavOrButton(node)) {
        el = el.next();
        continue;
      }
      if (el.is("script, style, noscript, template, iframe")) {
        el = el.next();
        continue;
      }
      const t = collapseWhitespace(el.text());
      if (paragraphTextIsUsable(t)) return t.replace(/^table of contents\s*/i, "").trim();
      el = el.next();
    }
  }
  for (const p of $m("#main p").toArray()) {
    const t = collapseWhitespace($m(p).text());
    if (paragraphTextIsUsable(t)) return t.replace(/^table of contents\s*/i, "").trim();
  }
  return "";
}

function extractDates(jsonLd: unknown[]): { published: string | null; modified: string | null } {
  let published: string | null = null;
  let modified: string | null = null;
  for (const node of flattenJsonLd(jsonLd)) {
    if (typeof node.datePublished === "string" && !published) published = node.datePublished;
    if (typeof node.dateModified === "string") modified = node.dateModified;
  }
  return { published, modified };
}

function extractAuthor(jsonLd: unknown[], $: cheerio.CheerioAPI): string | null {
  for (const node of flattenJsonLd(jsonLd)) {
    const author = node.author;
    if (typeof author === "string") return author;
    if (Array.isArray(author) && author[0]) {
      const a = author[0] as Record<string, unknown>;
      if (typeof a.name === "string") return a.name;
    }
    if (author && typeof author === "object") {
      const a = author as Record<string, unknown>;
      if (typeof a.name === "string") return a.name;
    }
  }
  const metaAuthor = $('meta[name="author"]').attr("content");
  if (metaAuthor?.trim()) return metaAuthor.trim();
  return null;
}

export function extractFromHtml(
  html: string,
  url: string,
  settings: Settings,
  fetchResult: FetchResult | null,
  siteWideFingerprints: Set<string>,
): ExtractedPage {
  html = decodeCloudflareEmailsInHtml(html);
  const $ = cheerio.load(html);
  const baseUrl = settings.base_url;
  const pageUrl = fetchResult?.finalUrl ?? url;

  const title = collapseWhitespace($("title").first().text());
  const meta_description =
    $('meta[name="description"]').attr("content")?.trim() ?? "";
  const meta_robots =
    $('meta[name="robots"]').attr("content")?.trim() ??
    $('meta[name="googlebot"]').attr("content")?.trim() ??
    "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() ?? "";

  const json_ld = parseJsonLdBlocks(html);
  const h1: string[] = [];
  $("h1").each((_, el) => {
    const t = collapseWhitespace($(el).text());
    if (t) h1.push(t);
  });
  const h2: string[] = [];
  $("h2").each((_, el) => {
    const t = collapseWhitespace($(el).text());
    if (t) h2.push(t);
  });

  const $m = cheerio.load(`<div id="main">${visibleMainHtml(html, settings)}</div>`);
  const firstRaw = extractFirstParagraphAfterH1($m);
  const first_paragraph = truncateWords(firstRaw, 80);
  const main_text = collapseWhitespace($m("#main").text());

  const internal_links: ExtractedPage["internal_links"] = [];
  $m("#main a[href]").each((_, el) => {
    const href = $m(el).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const text = collapseWhitespace($m(el).text());
    const abs = new URL(href, pageUrl).href;
    if (isInternal(abs, baseUrl)) internal_links.push({ href: abs, text });
  });

  const images: ExtractedPage["images"] = [];
  $m("#main img").each((_, el) => {
    const src = realImageSrc({
      src: $m(el).attr("src"),
      "data-src": $m(el).attr("data-src"),
      "data-lazy-src": $m(el).attr("data-lazy-src"),
    });
    const altRaw = $m(el).attr("alt");
    const alt = altRaw === undefined ? null : altRaw.trim() || null;
    images.push({ src, alt });
  });

  const dates = extractDates(json_ld);
  const author = extractAuthor(json_ld, $);
  const allNodes = flattenJsonLd(json_ld);
  const page_json_ld = filterOutSiteWideNodes(allNodes, siteWideFingerprints);

  return {
    url: pageUrl,
    final_url: fetchResult?.finalUrl ?? pageUrl,
    status: fetchResult?.status ?? null,
    page_type: resolvePageType(pageUrl, settings),
    title,
    meta_description,
    meta_robots,
    canonical,
    h1,
    h2,
    first_paragraph,
    main_text,
    internal_links,
    images,
    json_ld,
    page_json_ld,
    author,
    date_published: dates.published,
    date_modified: dates.modified,
    source: "url",
  };
}
