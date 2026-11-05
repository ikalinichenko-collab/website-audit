import type { PageZones, Zone } from "./types.js";
import type { GeoCodeConfig } from "./config.js";
import { stripGoGlobySuffix } from "./categories.js";

export type GeoType = "home" | "service" | "article" | "company" | "legal" | "podcast";

/** GEO page type from the scope profile (config/settings.json `scope`). */
export function geoTypeOf(profile: string): GeoType {
  switch (profile) {
    case "home":
      return "home";
    case "service":
      return "service";
    case "company":
      return "company";
    case "legal":
      return "legal";
    case "podcast":
      return "podcast";
    default:
      return "article";
  }
}

export interface GeoPlace {
  zone_id: string;
  part?: string;
  /** readable place for a table cell, set when reports are built */
  place?: string;
  value: string;
}

export interface GeoCodeCheck {
  id: string;
  status: "pass" | "fail" | "na";
  value: string;
  places?: GeoPlace[];
  /** Target keyword placement: zones where the term is missing. */
  missing?: string[];
  /** from `severity` in config/geo.json; set when the checks are run */
  severity?: "high" | "medium" | "low";
}

/** The check with the severity its id has in config/geo.json (medium when not listed). */
export function withSeverity(check: GeoCodeCheck, config: GeoCodeConfig): GeoCodeCheck {
  return { ...check, severity: config.severity?.[check.id] ?? "medium" };
}

const STYLE_SKIP_KINDS = new Set(["toc", "date"]);

function auditedZones(zones: PageZones): Zone[] {
  return zones.zones.filter((z) => !z.skipped && z.scope === "page");
}

function snippet(text: string, index: number, len: number): string {
  const from = Math.max(0, index - 30);
  const to = Math.min(text.length, index + len + 30);
  return `${from > 0 ? "…" : ""}${text.slice(from, to).replace(/\s+/g, " ")}${to < text.length ? "…" : ""}`;
}

/** JSON-LD text as plain words: tags stripped, entities decoded ("Fees &amp; Picks" is "Fees & Picks"). */
function plainLd(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function squash(s: string): string {
  return s.replace(/\s+/g, "").toLowerCase();
}

/** The visible text of the page as one string without whitespace, to find out whether JSON-LD only repeats it. */
function visibleKey(zones: Zone[]): string {
  return zones.filter((z) => z.kind !== "json_ld").map((z) => squash(z.text)).join("|");
}

/** A style match in JSON-LD is a duplicate when the words around it also stand in the visible text: it is one edit, reported there. */
function repeatsVisible(text: string, index: number, len: number, shown: string): boolean {
  const ctx = text.slice(Math.max(0, index - 30), index + len + 30);
  return shown.includes(squash(ctx));
}

/** Find all regex matches inside parts of the given zones. */
function scan(zones: Zone[], re: RegExp, skipKinds?: Set<string>, shown?: string): GeoPlace[] {
  const out: GeoPlace[] = [];
  const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  for (const z of zones) {
    if (skipKinds?.has(z.kind)) continue;
    for (const part of z.parts) {
      const p = shown !== undefined && z.kind === "json_ld" ? { ...part, text: plainLd(part.text) } : part;
      g.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = g.exec(p.text)) !== null) {
        if (m[0] === "") {
          g.lastIndex++;
          continue;
        }
        if (shown !== undefined && z.kind === "json_ld" && repeatsVisible(p.text, m.index, m[0].length, shown)) continue;
        out.push({
          zone_id: z.id,
          part: p.type === "field" && z.parts.length === 1 ? undefined : `${p.type} ${p.index}`,
          value: `${m[0]} | ${snippet(p.text, m.index, m[0].length)}`,
        });
      }
    }
  }
  return out;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function checkOf(id: string, places: GeoPlace[], okValue: string): GeoCodeCheck {
  return {
    id,
    status: places.length ? "fail" : "pass",
    value: places.length ? `${places.length} found` : okValue,
    places,
  };
}

const NON_TEXT_PART = new Set(["image"]);

function firstContentZone(zones: PageZones): Zone | undefined {
  return zones.zones.find(
    (z) => !z.skipped && z.scope === "page" && (z.kind === "block" || z.id === "article:intro" || z.kind === "article_section"),
  );
}

/** Text of the first paragraph of the first content zone. */
function firstParagraph(zones: PageZones): { zone: Zone; text: string } | null {
  for (const z of zones.zones) {
    if (z.skipped || z.scope !== "page") continue;
    if (!(z.kind === "block" || z.kind === "article_section" || z.kind === "unknown")) continue;
    const p = z.parts.find((x) => x.type === "paragraph" && x.text.length >= 20);
    if (p) return { zone: z, text: p.text };
  }
  return null;
}

export function runGeoCodeChecks(
  zones: PageZones,
  geoType: GeoType,
  config: GeoCodeConfig,
  schemaTypes: Set<string>,
): GeoCodeCheck[] {
  const checks: GeoCodeCheck[] = [];
  const page = auditedZones(zones);
  const byId = (id: string): Zone | undefined => page.find((z) => z.id === id);
  const hasGeo = geoType === "home" || geoType === "service" || geoType === "article" || geoType === "company";

  // ---- home_title_exact ---------------------------------------------------
  if (geoType === "home") {
    const t = stripGoGlobySuffix(byId("title")?.text ?? "").replace(/\s+/g, " ").trim();
    const ok = t.toLowerCase() === config.home_title.toLowerCase();
    checks.push({
      id: "home_title_exact",
      status: ok ? "pass" : "fail",
      value: ok ? t : `"${t}" (expected "${config.home_title}")`,
      places: ok ? [] : [{ zone_id: "title", value: t }],
    });
  }

  // ---- trap_terms ------------------------------------------------------------
  if (hasGeo) {
    const head = page.filter((z) => ["title", "h1", "meta_description", "og_title", "og_description"].includes(z.kind));
    const places: GeoPlace[] = [];
    for (const t of config.trap_terms) {
      for (const p of scan(head, new RegExp(t.pattern, "i"))) places.push({ ...p, value: `[${t.term}] ${p.value}` });
    }
    checks.push(checkOf("trap_terms", places, "none in title, H1, meta, og"));
  }

  // ---- nearshore_not_first -----------------------------------------------------
  if (geoType === "home" || geoType === "service") {
    const hero = page.find((z) => z.kind === "block");
    if (hero) {
      const heroText: Zone = {
        ...hero,
        parts: hero.parts.filter((p) => !NON_TEXT_PART.has(p.type)),
      };
      const re = new RegExp(`\\b(${config.nearshore_words.map(escapeRe).join("|")})`, "i");
      checks.push(checkOf("nearshore_not_first", scan([heroText], re), `not in ${hero.id}`));
    } else {
      checks.push({ id: "nearshore_not_first", status: "na", value: "no hero block" });
    }
  }

  // ---- faq_present -------------------------------------------------------------
  if (geoType === "home" || geoType === "service") {
    const faqBlock = page.find((z) => z.id.startsWith("block:accordion"));
    const faqSection = page.find((z) => /^article:(faq|frequently)/.test(z.id));
    const questionHeadings = page
      .flatMap((z) => z.parts)
      .filter((p) => p.type === "heading" && p.text.trim().endsWith("?")).length;
    const found: string[] = [];
    if (faqBlock) found.push(faqBlock.id);
    if (faqSection) found.push(faqSection.id);
    if (schemaTypes.has("FAQPage")) found.push("FAQPage schema");
    if (questionHeadings >= config.faq_min_question_headings) found.push(`${questionHeadings} question headings`);
    checks.push({
      id: "faq_present",
      status: found.length ? "pass" : "fail",
      value: found.length ? found.join(", ") : "no FAQ block, schema or question headings",
    });
  }

  // ---- writing rules (all in-scope pages) --------------------------------------
  const shown = visibleKey(page);
  const emDash = scan(page, /—/, STYLE_SKIP_KINDS, shown);
  checks.push(checkOf("em_dash", emDash, "none"));

  const allow = config.ampersand_allowlist.map(escapeRe);
  const amp: GeoPlace[] = [];
  const allowRe = new RegExp(allow.join("|"), "g");
  for (const z of page) {
    if (STYLE_SKIP_KINDS.has(z.kind)) continue;
    for (const part of z.parts) {
      const p = z.kind === "json_ld" ? { ...part, text: plainLd(part.text) } : part;
      const masked = p.text.replace(allowRe, (m) => " ".repeat(m.length));
      let i = masked.indexOf("&");
      while (i !== -1) {
        if (z.kind === "json_ld" && repeatsVisible(p.text, i, 1, shown)) {
          i = masked.indexOf("&", i + 1);
          continue;
        }
        amp.push({
          zone_id: z.id,
          part: p.type === "field" && z.parts.length === 1 ? undefined : `${p.type} ${p.index}`,
          value: `& | ${snippet(p.text, i, 1)}`,
        });
        i = masked.indexOf("&", i + 1);
      }
    }
  }
  checks.push(checkOf("ampersand", amp, "none"));

  const words = config.uk_spelling_words.map(escapeRe);
  const stems = config.uk_spelling_stems.map((s) => `${s}(?:${config.uk_spelling_endings.join("|")})`);
  const ukRe = new RegExp(`\\b(?:${[...words, ...stems].join("|")})\\b`, "i");
  checks.push(checkOf("uk_spelling", scan(page, ukRe, STYLE_SKIP_KINDS, shown), "none"));

  return checks.map((c) => withSeverity(c, config));
}

/** Placement of the LLM-chosen term in title, H1, first paragraph, meta description and an H2. */
export function checkTargetKeywordPlacement(zones: PageZones, term: string | null): GeoCodeCheck {
  if (!term) return { id: "target_keyword_placement", status: "na", value: "no term chosen" };
  const page = auditedZones(zones);
  const has = (text: string | undefined): boolean => (text ?? "").toLowerCase().includes(term.toLowerCase());
  const missing: string[] = [];
  if (!has(page.find((z) => z.kind === "title")?.text)) missing.push("title");
  if (!has(page.find((z) => z.kind === "h1")?.text)) missing.push("h1");
  if (!has(firstParagraph(zones)?.text)) missing.push("first_paragraph");
  if (!has(page.find((z) => z.kind === "meta_description")?.text)) missing.push("meta_description");
  const h2 = page
    .filter((z) => z.kind === "block" || z.kind === "article_section")
    .flatMap((z) => z.parts)
    .filter((p) => p.type === "heading" && p.level === 2);
  if (!h2.some((p) => has(p.text))) missing.push("h2");
  return {
    id: "target_keyword_placement",
    status: missing.length ? "fail" : "pass",
    value: term,
    missing,
  };
}

export { firstContentZone, firstParagraph };
