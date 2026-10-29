import * as cheerio from "cheerio";
import { createHash } from "node:crypto";
import type { AuditConfig } from "./types.js";
import type { PageData, PageImage, PageLink } from "./types.js";
import { resolvePageType } from "./page-type.js";
import { isInternal, truncateWords } from "./utils.js";

type CheerioRoot = ReturnType<typeof cheerio.load>;

function isNavOrButton(el: { tagName?: string; attribs?: Record<string, string> }): boolean {
  const tag = el.tagName?.toLowerCase();
  if (tag === "button" || tag === "nav" || tag === "header" || tag === "footer") return true;
  const role = el.attribs?.role?.toLowerCase();
  if (role === "navigation" || role === "button") return true;
  return false;
}

function normalizeVisibleText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** First `<p>` after H1, else first visible text block after H1 (see checklist Locations). */
function extractFirstParagraphAfterH1($m: CheerioRoot): string {
  const h1 = $m("h1").first();
  if (h1.length) {
    const p = h1.nextAll("p").first();
    if (p.length) return normalizeVisibleText(p.text());
    let el = h1.next();
    while (el.length) {
      const node = el.get(0);
      if (node && isNavOrButton(node)) {
        el = el.next();
        continue;
      }
      if (el.is("script, style, noscript")) {
        el = el.next();
        continue;
      }
      const t = normalizeVisibleText(el.text());
      if (t.length >= 20) return t;
      el = el.next();
    }
    const mainText = normalizeVisibleText($m.text());
    const h1Text = normalizeVisibleText(h1.text());
    const idx = mainText.indexOf(h1Text);
    if (idx >= 0) {
      const after = mainText.slice(idx + h1Text.length).trim();
      if (after) return after.split(/\s+/).slice(0, 80).join(" ");
    }
    if (mainText.length) return mainText.split(/\s+/).slice(0, 80).join(" ");
    return "";
  }
  const p = $m("p").first();
  if (p.length) return normalizeVisibleText(p.text());
  const mainText = normalizeVisibleText($m.text());
  if (mainText.length) return mainText.split(/\s+/).slice(0, 80).join(" ");
  return "";
}

function parseJsonLdBlocks(html: string): unknown[] {
  const $ = cheerio.load(html);
  const blocks: unknown[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const text = $(el).html()?.trim();
    if (!text) return;
    try {
      blocks.push(JSON.parse(text));
    } catch {
      /* invalid json-ld */
    }
  });
  return blocks;
}

function hasType(o: Record<string, unknown>): boolean {
  const t = o["@type"];
  return typeof t === "string" || (Array.isArray(t) && t.length > 0);
}

/** Recursively collect every JSON-LD object with an @type (nested Person, etc.). */
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

function flattenJsonLd(nodes: unknown[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const n of nodes) walkJsonLdTypedNodes(n, out);
  return out;
}

function extractDates(jsonLd: unknown[]): { published: string | null; modified: string | null } {
  let published: string | null = null;
  let modified: string | null = null;
  for (const node of flattenJsonLd(jsonLd)) {
    if (!node || typeof node !== "object") continue;
    const o = node as Record<string, unknown>;
    if (typeof o.datePublished === "string" && !published) published = o.datePublished;
    if (typeof o.dateModified === "string") modified = o.dateModified;
  }
  return { published, modified };
}

const GENERIC_AUTHOR_LINK = new Set([
  "view profile",
  "read more",
  "author",
  "profile",
]);

function extractVisibleAuthor(
  $: cheerio.CheerioAPI,
  $main: cheerio.CheerioAPI,
): string | null {
  const nameFromAuthorSlug = (href: string): string | null => {
    const slugMatch = href.match(/\/author\/([^/]+)\/?$/);
    if (!slugMatch) return null;
    return slugMatch[1]!
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const pickFromLinks = (root: cheerio.CheerioAPI): string | null => {
    let found: string | null = null;
    root('a[href*="/author/"]').each((_, el) => {
      if (found) return;
      const t = root(el).text().replace(/\s+/g, " ").trim();
      if (t && !GENERIC_AUTHOR_LINK.has(t.toLowerCase())) found = t;
    });
    if (found) return found;
    const authorLink = root('a[href*="/author/"]').first();
    if (authorLink.length) {
      const href = authorLink.attr("href") ?? "";
      const t = authorLink.text().replace(/\s+/g, " ").trim().toLowerCase();
      if (!t || GENERIC_AUTHOR_LINK.has(t)) {
        return nameFromAuthorSlug(href);
      }
      const block = authorLink.parent().text().replace(/\s+/g, " ").trim();
      if (block.length <= 80) {
        const byMatch = block.match(
          /\bby\s+([A-Za-z][A-Za-z.'-]*(?:\s+[A-Za-z][A-Za-z.'-]*)?)/i,
        );
        if (byMatch) return byMatch[1]!.trim();
      }
    }
    return null;
  };

  let visible =
    pickFromLinks($main) ??
    pickFromLinks($) ??
    null;

  if (!visible) {
    const header = $(".entry-header, .post-header, article .meta, .entry-meta")
      .first()
      .text()
      .replace(/\s+/g, " ");
    const byMatch = header.match(
      /\bby\s+([A-Za-z][A-Za-z.'-]*(?:\s+[A-Za-z][A-Za-z.'-]*)?)/i,
    );
    if (byMatch) visible = byMatch[1]!.trim();
  }
  if (!visible) {
    const byline = $(".author, .posted-by, .entry-author, .post-author")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    if (byline) visible = byline.replace(/^by\s+/i, "").trim();
  }
  return visible;
}

function extractAuthor(jsonLd: unknown[], $: cheerio.CheerioAPI): string | null {
  for (const node of flattenJsonLd(jsonLd)) {
    if (!node || typeof node !== "object") continue;
    const o = node as Record<string, unknown>;
    if (o.author) {
      if (typeof o.author === "string") return o.author;
      if (Array.isArray(o.author) && o.author[0]) {
        const a = o.author[0] as Record<string, unknown>;
        if (typeof a.name === "string") return a.name;
      }
      if (typeof o.author === "object" && o.author !== null) {
        const a = o.author as Record<string, unknown>;
        if (typeof a.name === "string") return a.name;
      }
    }
  }
  const metaAuthor = $('meta[name="author"]').attr("content");
  if (metaAuthor) return metaAuthor.trim();
  const relAuthor = $('[rel="author"]').first().text().trim();
  if (relAuthor) return relAuthor;
  return null;
}

export interface FetchResult {
  html: string;
  finalUrl: string;
  status: number;
  redirectChain: string[];
}

export async function httpGet(
  url: string,
  config: AuditConfig,
): Promise<FetchResult> {
  const redirectChain: string[] = [];
  let current = url;
  let status = 0;
  let html = "";
  for (let i = 0; i < 10; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), config.fetch.timeout_ms);
    try {
      const res = await fetch(current, {
        headers: { "User-Agent": config.fetch.user_agent },
        signal: ctrl.signal,
        redirect: "manual",
      });
      status = res.status;
      if (status >= 300 && status < 400) {
        const loc = res.headers.get("location");
        if (!loc) break;
        redirectChain.push(current);
        current = new URL(loc, current).href;
        continue;
      }
      html = await res.text();
      break;
    } finally {
      clearTimeout(t);
    }
  }
  return { html, finalUrl: current, status, redirectChain };
}

export function extractPageData(
  url: string,
  fetchResult: FetchResult,
  config: AuditConfig,
): PageData {
  const $ = cheerio.load(fetchResult.html);
  const baseUrl = config.site.base_url;

  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() ?? "";
  const metaRobots =
    $('meta[name="robots"]').attr("content")?.trim() ??
    $('meta[name="googlebot"]').attr("content")?.trim() ??
    "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() ?? "";

  const open_graph: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr("property");
    const content = $(el).attr("content");
    if (prop && content) open_graph[prop] = content;
  });

  const json_ld = parseJsonLdBlocks(fetchResult.html);
  const h1: string[] = [];
  $("h1").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) h1.push(t);
  });
  const h2: string[] = [];
  $("h2").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) h2.push(t);
  });
  const h3: string[] = [];
  $("h3").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) h3.push(t);
  });

  // Main content region
  type CheerioSel = ReturnType<typeof $>;
  let $main: CheerioSel = cheerio.load("<div></div>")("div");
  for (const sel of config.fetch.main_content_selectors) {
    const found = $(sel).first();
    if (found.length) {
      $main = found.clone();
      break;
    }
  }
  if (!$main.length) {
    $main = $("body").clone();
  }
  for (const ex of config.fetch.exclude_selectors) {
    $main.find(ex).remove();
  }

  const mainHtml = $.html($main);
  const $m = cheerio.load(mainHtml);

  const firstParagraph = extractFirstParagraphAfterH1($m);

  const firstParagraphTrimmed = truncateWords(
    firstParagraph,
    config.seo.first_paragraph_max_words,
  );

  const main_text = $m.text().replace(/\s+/g, " ").trim();
  let body = main_text;
  if (firstParagraphTrimmed && main_text.includes(firstParagraphTrimmed)) {
    body = main_text.replace(firstParagraphTrimmed, "").trim();
  }

  const internal_links: PageLink[] = [];
  const external_links: PageLink[] = [];
  $m("a[href]").each((_i, el) => {
    const href = $m(el).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
      return;
    const text = $m(el).text().replace(/\s+/g, " ").trim();
    const abs = new URL(href, url).href;
    const link: PageLink = { href: abs, text, internal: isInternal(abs, baseUrl) };
    if (link.internal) internal_links.push(link);
    else external_links.push(link);
  });

  const images_without_alt: PageImage[] = [];
  const main_content_images: import("./types.js").MainContentImage[] = [];
  $m("img").each((_i, el) => {
    const src = $m(el).attr("src") ?? $m(el).attr("data-src") ?? "";
    const altRaw = $m(el).attr("alt");
    const alt = altRaw === undefined ? null : altRaw.trim() || null;
    let file_name = "";
    try {
      const p = new URL(src, url).pathname;
      file_name = p.split("/").pop() ?? "";
    } catch {
      file_name = src.split("/").pop() ?? "";
    }
    main_content_images.push({ src, alt, file_name });
    if (alt === null || alt === "") {
      images_without_alt.push({ src, alt });
    }
  });

  const dates = extractDates(json_ld);
  const authorSchema = extractAuthor(json_ld, $);
  const author_visible = extractVisibleAuthor($, $m);
  const author = author_visible ?? authorSchema;

  const hashInput = JSON.stringify({
    title,
    metaDescription,
    main_text,
    h1,
    json_ld,
  });
  const content_hash = createHash("sha256").update(hashInput).digest("hex");

  return {
    url,
    final_url: fetchResult.finalUrl,
    status: fetchResult.status,
    redirect_chain: fetchResult.redirectChain,
    page_type: resolvePageType(url, config),
    title,
    meta_description: metaDescription,
    meta_robots: metaRobots,
    canonical,
    open_graph,
    json_ld,
    h1,
    h2,
    h3,
    first_paragraph: firstParagraphTrimmed,
    body,
    main_text,
    internal_links,
    external_links,
    images_without_alt,
    main_content_images,
    date_published: dates.published,
    date_modified: dates.modified,
    author,
    author_visible,
    content_hash,
    fetched_at: new Date().toISOString(),
  };
}

export function collectOrganizationNodes(jsonLd: unknown[]): Record<string, unknown>[] {
  const flat = flattenJsonLd(jsonLd);
  return flat.filter((n) => {
    if (!n || typeof n !== "object") return false;
    const t = (n as Record<string, unknown>)["@type"];
    if (t === "Organization") return true;
    if (Array.isArray(t) && t.includes("Organization")) return true;
    return false;
  }) as Record<string, unknown>[];
}

export function collectPersonNodes(jsonLd: unknown[]): Record<string, unknown>[] {
  const flat = flattenJsonLd(jsonLd);
  return flat.filter((n) => {
    if (!n || typeof n !== "object") return false;
    const t = (n as Record<string, unknown>)["@type"];
    if (t === "Person") return true;
    if (Array.isArray(t) && t.includes("Person")) return true;
    return false;
  }) as Record<string, unknown>[];
}

export function schemaTypesPresent(jsonLd: unknown[]): string[] {
  const types = new Set<string>();
  for (const node of flattenJsonLd(jsonLd)) {
    if (!node || typeof node !== "object") continue;
    const t = (node as Record<string, unknown>)["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
  }
  return [...types];
}
