import * as cheerio from "cheerio";
import type { PageZones, Settings, Zone, ZoneKind, ZonePart, ZonePartType } from "./types.js";
import { collapseWhitespace } from "./utils.js";
import { decodeCloudflareEmailsInHtml } from "./extract.js";
import { realImageSrc } from "./html-content.js";

/** Minimal shape of a parsed DOM node (domhandler is not a direct dependency). */
interface DomNode {
  type: string;
  name?: string;
  data?: string;
  attribs?: Record<string, string>;
  children?: DomNode[];
  parent?: DomNode | null;
}

type $ = cheerio.CheerioAPI;

/** The job application form is not audited: it is for candidates, not for the company message. */
const JOB_MODAL = "#modal-job-form";
const ICON_RE = /arrow|chevron|close|menu/i;
const STRIP_TAGS = "script, style, noscript, template, iframe, svg";
const HEADING_RE = /^h[1-6]$/;
/** Elements that make a node a container: if one is inside, we recurse instead of taking the text whole. */
const STRUCTURAL = new Set([
  "div", "section", "article", "aside", "ul", "ol", "li", "table", "thead", "tbody", "tr",
  "td", "th", "p", "h1", "h2", "h3", "h4", "h5", "h6", "figure", "form", "dl", "dt", "dd",
  "blockquote", "nav", "header", "footer", "main", "details", "summary",
]);
const JSON_LD_TEXT_KEYS = new Set([
  "name", "headline", "description", "slogan", "alternateName", "text", "abstract", "articleBody",
]);

function isEl(n: DomNode): boolean {
  return n.type === "tag";
}

function textOf(n: DomNode): string {
  if (n.type === "text") return n.data ?? "";
  return (n.children ?? []).map(textOf).join(" ");
}

function norm(s: string): string {
  return collapseWhitespace(s);
}

function classesOf(n: DomNode): string[] {
  return (n.attribs?.class ?? "").split(/\s+/).filter(Boolean);
}

function hasStructuralDescendant(n: DomNode): boolean {
  for (const c of n.children ?? []) {
    if (!isEl(c)) continue;
    if (STRUCTURAL.has(c.name ?? "") || hasStructuralDescendant(c)) return true;
  }
  return false;
}

function partTypeOf(n: DomNode): ZonePartType {
  const name = n.name ?? "";
  if (HEADING_RE.test(name)) return "heading";
  if (name === "li") return "list_item";
  if (name === "td" || name === "th") return "table_cell";
  if (name === "button") return "button";
  if (name === "a") return /\b(btn|button)\b/i.test(n.attribs?.class ?? "") ? "button" : "link";
  return "paragraph";
}

/** Theme area or numbered group the node sits in, relative to the zone root. */
function areaOf(n: DomNode, root: DomNode): string | undefined {
  let cur: DomNode | null | undefined = n;
  let area: string | undefined;
  while (cur && cur !== root) {
    for (const c of classesOf(cur)) {
      if (/^block-(header|main|aside|table|footer)$/.test(c)) area = area ?? c;
      if (c === "swiper-slide" || /accordion[-_]+item/.test(c)) {
        const sibs = (cur.parent?.children ?? []).filter(
          (s) => isEl(s) && classesOf(s).some((x) => x === c),
        );
        const label = c === "swiper-slide" ? "slide" : "item";
        return `${label} ${sibs.indexOf(cur) + 1}`;
      }
    }
    cur = cur.parent;
  }
  return area;
}

function anchorsIn(n: DomNode): { href: string; text: string }[] {
  const out: { href: string; text: string }[] = [];
  const visit = (x: DomNode): void => {
    if (!isEl(x)) return;
    if (x.name === "a" && x.attribs?.href?.trim()) out.push({ href: x.attribs.href.trim(), text: norm(textOf(x)) });
    for (const c of x.children ?? []) visit(c);
  };
  visit(n);
  return out;
}

function imagePart(n: DomNode, pageUrl: string): Omit<ZonePart, "index"> | null {
  const a = n.attribs ?? {};
  const src = realImageSrc({ src: a.src, "data-src": a["data-src"], "data-lazy-src": a["data-lazy-src"] });
  if (!src) return null;
  let file = "";
  try {
    file = (new URL(src, pageUrl).pathname.split("/").pop() ?? "").split("?")[0] ?? "";
  } catch {
    file = (src.split("/").pop() ?? "").split("?")[0] ?? "";
  }
  const altRaw = a.alt;
  const alt = altRaw === undefined ? null : altRaw.trim();
  if (ICON_RE.test(`${alt ?? ""} ${file}`)) return null;
  const alt_state = altRaw === undefined ? "missing" : alt === "" ? "empty" : "text";
  const dims = Boolean(a.width?.trim() && a.height?.trim());
  return { type: "image", text: alt ?? "", src, file, alt, alt_state, dims };
}

/** Flat, ordered, text-bearing parts of a subtree. */
function collectParts(root: DomNode, pageUrl: string): ZonePart[] {
  const raw: Omit<ZonePart, "index">[] = [];

  const images = (n: DomNode, area?: string): void => {
    if (n.type !== "tag") return;
    if (n.name === "img") {
      const p = imagePart(n, pageUrl);
      if (p) raw.push({ ...p, area });
      return;
    }
    for (const c of n.children ?? []) images(c, area);
  };

  const walk = (n: DomNode): void => {
    if (n.type === "text") {
      const t = norm(n.data ?? "");
      if (t) raw.push({ type: "paragraph", text: t, area: areaOf(n, root) });
      return;
    }
    if (!isEl(n)) return;
    const name = n.name ?? "";
    if (name === "img") {
      const p = imagePart(n, pageUrl);
      if (p) raw.push({ ...p, area: areaOf(n, root) });
      return;
    }
    if (!hasStructuralDescendant(n)) {
      const t = norm(textOf(n));
      const area = areaOf(n, root);
      if (t) {
        const type = partTypeOf(n);
        const part: Omit<ZonePart, "index"> = { type, text: t, area };
        if (type === "heading") part.level = Number(name[1]);
        if (name === "a" && n.attribs?.href) part.href = n.attribs.href;
        const links = anchorsIn(n);
        if (links.length) part.links = links;
        raw.push(part);
      }
      images(n, area);
      return;
    }
    for (const c of n.children ?? []) walk(c);
  };

  for (const c of root.children ?? []) walk(c);

  const counters: Record<string, number> = {};
  return raw.map((p) => {
    counters[p.type] = (counters[p.type] ?? 0) + 1;
    return { ...p, index: counters[p.type]! };
  });
}

function textFromParts(parts: ZonePart[]): string {
  return parts
    .map((p) => p.text)
    .filter(Boolean)
    .join("\n");
}

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "section"
  );
}

function shorten(s: string, n: number): string {
  const t = norm(s);
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
}

function prettyName(name: string): string {
  const t = name.replace(/[-_]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function makeZone(
  id: string,
  kind: ZoneKind,
  label: string,
  parts: ZonePart[],
  opts: { scope?: "page" | "shared"; skipped?: boolean } = {},
): Zone {
  return {
    id,
    kind,
    label,
    scope: opts.scope ?? "page",
    skipped: opts.skipped ?? false,
    text: textFromParts(parts),
    parts,
  };
}

function simpleZone(id: string, kind: ZoneKind, label: string, text: string): Zone {
  const t = norm(text);
  const parts: ZonePart[] = t ? [{ type: "field", index: 1, text: t }] : [];
  return makeZone(id, kind, label, parts);
}

function jsonLdParts(nodes: Record<string, unknown>[]): ZonePart[] {
  const out: Omit<ZonePart, "index">[] = [];
  const visit = (v: unknown, path: string): void => {
    if (Array.isArray(v)) {
      v.forEach((x) => visit(x, path));
      return;
    }
    if (!v || typeof v !== "object") return;
    const o = v as Record<string, unknown>;
    const type = [].concat((o["@type"] as never) ?? []).join("/") || path;
    for (const [k, val] of Object.entries(o)) {
      if (typeof val === "string" && JSON_LD_TEXT_KEYS.has(k)) {
        const t = norm(val);
        if (t) out.push({ type: "field", text: t, area: `${type}.${k}` });
      } else if (val && typeof val === "object") {
        visit(val, type);
      }
    }
  };
  nodes.forEach((n) => visit(n, "node"));
  const seen = new Set<string>();
  return out
    .filter((p) => {
      const key = `${p.area}|${p.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((p, i) => ({ ...p, index: i + 1 }));
}

/** json_ld zone for a set of schema nodes (used for the site-wide schema pass). */
export function jsonLdZone(nodes: Record<string, unknown>[]): Zone | null {
  const parts = jsonLdParts(nodes);
  return parts.length ? makeZone("json_ld", "json_ld", "Structured data (JSON-LD)", parts) : null;
}

/** Split parts at each h2. Parts before the first h2 become `intro`. */
function splitAtH2(parts: ZonePart[]): { title: string | null; parts: ZonePart[] }[] {
  const groups: { title: string | null; parts: ZonePart[] }[] = [{ title: null, parts: [] }];
  for (const p of parts) {
    if (p.type === "heading" && p.level === 2) {
      groups.push({ title: p.text, parts: [p] });
    } else {
      groups[groups.length - 1]!.parts.push(p);
    }
  }
  return groups.filter((g) => g.parts.length > 0);
}

function reindex(parts: ZonePart[]): ZonePart[] {
  const c: Record<string, number> = {};
  return parts.map((p) => {
    c[p.type] = (c[p.type] ?? 0) + 1;
    return { ...p, index: c[p.type]! };
  });
}

function sectionZones(
  idPrefix: string,
  parts: ZonePart[],
  introLabel: string,
  kind: ZoneKind,
): Zone[] {
  const zones: Zone[] = [];
  const used = new Set<string>();
  for (const g of splitAtH2(parts)) {
    let id: string;
    let label: string;
    if (g.title === null) {
      id = `${idPrefix}:intro`;
      label = introLabel;
    } else {
      let s = slug(g.title);
      let n = 2;
      while (used.has(s)) s = `${slug(g.title)}-${n++}`;
      used.add(s);
      id = `${idPrefix}:${s}`;
      label = shorten(g.title, 70);
    }
    zones.push(makeZone(id, kind, label, reindex(g.parts)));
  }
  return zones;
}

function dropEl($: $, sel: string): void {
  try {
    $(sel).remove();
  } catch {
    /* invalid selector */
  }
}

export function buildZones(
  htmlIn: string,
  pageUrl: string,
  settings: Settings,
  pageJsonLd: Record<string, unknown>[],
): PageZones {
  const html = decodeCloudflareEmailsInHtml(htmlIn);
  const warnings: string[] = [];
  const zones: Zone[] = [];

  // ---- head-level zones -------------------------------------------------
  const head = cheerio.load(html);
  zones.push(simpleZone("title", "title", "Title", head("title").first().text()));
  zones.push(
    simpleZone(
      "meta_description",
      "meta_description",
      "Meta description",
      head('meta[name="description"]').attr("content") ?? "",
    ),
  );
  const ogTitle = head('meta[property="og:title"]').attr("content");
  if (ogTitle !== undefined) zones.push(simpleZone("og_title", "og_title", "og:title", ogTitle));
  const ogDesc = head('meta[property="og:description"]').attr("content");
  if (ogDesc !== undefined) {
    zones.push(simpleZone("og_description", "og_description", "og:description", ogDesc));
  }
  const ldParts = jsonLdParts(pageJsonLd);
  if (ldParts.length) zones.push(makeZone("json_ld", "json_ld", "Structured data (JSON-LD)", ldParts));

  // ---- shared zones, taken before hidden elements are stripped -----------
  const shared = cheerio.load(html);
  shared(STRIP_TAGS).remove();
  shared(JOB_MODAL).remove();
  shared("br").replaceWith(" ");
  const sharedZones: Zone[] = [];
  const banner = shared("section.banner-cta, .banner-cta").first();
  if (banner.length) {
    sharedZones.push(
      makeZone(
        "banner_cta",
        "banner_cta",
        "Banner CTA",
        collectParts(banner.get(0) as unknown as DomNode, pageUrl),
        { scope: "shared" },
      ),
    );
  }
  const modalEls = shared("#modal-contact-form, form.contact-form");
  if (modalEls.length) {
    const parts: ZonePart[] = [];
    modalEls.each((_, el) => {
      parts.push(...collectParts(el as unknown as DomNode, pageUrl));
    });
    sharedZones.push(makeZone("modals", "modals", "Forms and modals", reindex(parts), { scope: "shared" }));
  }

  // ---- working copy: strip hidden elements and things recorded elsewhere --
  const $d = cheerio.load(html);
  $d(STRIP_TAGS).remove();
  $d(JOB_MODAL).remove();
  $d("br").replaceWith(" ");
  for (const sel of settings.fetch.hidden_selectors ?? []) dropEl($d, sel);

  const skippedZones: Zone[] = [];
  const skipOut = (sel: string, id: string, kind: ZoneKind, label: string): void => {
    const els = $d(sel);
    if (!els.length) return;
    const parts: ZonePart[] = [];
    els.each((_, el) => {
      parts.push(...collectParts(el as unknown as DomNode, pageUrl));
    });
    skippedZones.push(makeZone(id, kind, label, reindex(parts), { skipped: true }));
    els.remove();
  };
  skipOut("header.site-header, body > header", "site_header", "site_header", "Site header");
  skipOut("footer.site-footer, body > footer", "site_footer", "site_footer", "Site footer");
  skipOut(
    "section.news-slider, .positions-related, .job-positions__related, .latest-guides",
    "related",
    "related",
    "Related content",
  );
  $d("section.banner-cta, .banner-cta").remove();
  $d("#modal-contact-form, form.contact-form").remove();

  // ---- main ---------------------------------------------------------------
  const main = $d("main").first();
  const root = (main.length ? main : $d("body")).get(0) as unknown as DomNode | undefined;
  if (!main.length) warnings.push("no <main> element, using <body>");

  const h1El = $d("h1.page-title").first().length ? $d("h1.page-title").first() : $d("main h1").first();
  zones.push(simpleZone("h1", "h1", "H1", h1El.text()));

  const dateEl = $d("main .page-caption").first();
  if (dateEl.length) zones.push(simpleZone("date", "date", "Date", dateEl.text()));

  const authorEl = $d("main .post-author").first();
  if (authorEl.length) {
    zones.push(makeZone("author", "author", "Author", collectParts(authorEl.get(0) as unknown as DomNode, pageUrl)));
  }

  let template: PageZones["template"] = "unknown";
  const bodyZones: Zone[] = [];

  const blockEls = $d("main section.gg-block").toArray() as unknown as DomNode[];
  const postContent = $d("main article.post-content").first();
  const pageMain = $d("main section.page-main").first();

  const addBlocks = (els: DomNode[]): void => {
    const counts: Record<string, number> = {};
    let unnamedLabelN = 0;
    for (const el of els) {
      const cls = classesOf(el).find((c) => c.startsWith("gg-block__"));
      const name = cls ? cls.slice("gg-block__".length) : "unnamed";
      counts[name] = (counts[name] ?? 0) + 1;
      const id = `block:${name}#${counts[name]}`;
      const parts = collectParts(el, pageUrl);
      const $el = $d(el as never);
      const headText =
        norm($el.find(".block-header h1, .block-header h2, .block-header h3").first().text()) ||
        norm($el.find("h1, h2, h3, h4").first().text());
      let label: string;
      if (headText) {
        label = name === "unnamed" ? shorten(headText, 70) : `${prettyName(name)}: ${shorten(headText, 60)}`;
      } else {
        unnamedLabelN++;
        label = name === "unnamed" ? `Block ${unnamedLabelN} (no heading)` : prettyName(name);
        if (name === "unnamed") warnings.push(`${id} has no heading`);
      }
      bodyZones.push(makeZone(id, "block", label, reindex(parts)));
    }
  };

  if (postContent.length) {
    template = "article";
    const toc = $d("main .post-sidebar").first();
    if (toc.length) {
      bodyZones.push(makeZone("toc", "toc", "Table of contents", collectParts(toc.get(0) as unknown as DomNode, pageUrl)));
    }
    bodyZones.push(
      ...sectionZones("article", collectParts(postContent.get(0) as unknown as DomNode, pageUrl), "Intro", "article_section"),
    );
    const pc = postContent.get(0) as unknown as DomNode;
    const inside = (n: DomNode): boolean => {
      for (let c = n.parent; c; c = c.parent) if (c === pc) return true;
      return false;
    };
    addBlocks(blockEls.filter((b) => !inside(b)));
  } else if (blockEls.length) {
    template = "block";
    addBlocks(blockEls);
  } else if (pageMain.length) {
    template = "legal";
    bodyZones.push(
      ...sectionZones("article", collectParts(pageMain.get(0) as unknown as DomNode, pageUrl), "Intro", "article_section"),
    );
  } else if (root) {
    warnings.push("unrecognised template: no gg-block, article.post-content or section.page-main");
    const sections = $d(root as never).children("section").toArray() as unknown as DomNode[];
    const sources = sections.length ? sections : [root];
    let n = 0;
    for (const s of sources) {
      const groups = splitAtH2(collectParts(s, pageUrl));
      for (const g of groups) {
        n++;
        bodyZones.push(
          makeZone(`unknown:${n}`, "unknown", g.title ? shorten(g.title, 70) : `Section ${n}`, reindex(g.parts)),
        );
      }
    }
  }

  zones.push(...bodyZones, ...sharedZones, ...skippedZones);
  return { template, zones, warnings };
}
