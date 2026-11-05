import type OpenAI from "openai";
import type { PageZones, Settings, TokenUsage, Zone } from "./types.js";
import { loadComplianceConfig, loadComplianceZonesInstruction, loadSourcesText, type ComplianceConfig } from "./config.js";
import { runComplianceZones } from "./llm.js";

export type Severity = "high" | "medium" | "low";

export interface ComplianceLocation {
  zone_id: string;
  /** e.g. "paragraph 3", found by code, never by the model */
  part: string | null;
  quote: string;
  verified: boolean;
  /** text-fragment value for a link to the live page, set when reports are built */
  fragment?: string | null;
  /** why this place is a problem, in the model's words; absent in reports made before it existed and for term-list hits */
  reason?: string;
  /** readable place for a table cell, set with the fragment */
  place?: string | null;
  /** version of the fragment code that set `fragment`; older ones are recomputed */
  locator?: number;
}

export interface ComplianceFinding {
  title: string;
  category: string;
  severity: Severity;
  rule: string;
  rule_verified: boolean;
  issue: string;
  fix: string;
  subject: string | null;
  page_value: string | null;
  source_value: string | null;
  count: number;
  locations: ComplianceLocation[];
  /** no location could be confirmed in its zone: show in the "To review" list */
  location_unverified: boolean;
  /** "code": found by the term list; "llm": reported by the model */
  source: "llm" | "code";
  /** a claim the sources do not contain (not a contradiction): lower severity */
  unverified: boolean;
  /** the model's reason: the sources give a different value, or say nothing about the claim; null for term-list findings */
  basis: "contradicts" | "not_in_sources" | null;
}

export interface ComplianceZoneResult {
  action: string | null;
  summary: string | null;
  problems: ComplianceFinding[];
  usage: TokenUsage;
  error: string | null;
}

const PAGE_KINDS = new Set([
  "title",
  "meta_description",
  "og_title",
  "og_description",
  "json_ld",
  "h1",
  "block",
  "article_section",
  "author",
  "unknown",
  "banner_cta",
  "modals",
]);
const SHARED_KINDS = new Set(["banner_cta", "modals"]);

function norm(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?\s]+$/, "")
    .trim()
    .toLowerCase();
}

function zonePayload(z: Zone): Record<string, unknown> {
  const images = z.parts
    .filter((p) => p.type === "image" && (p.alt || p.file))
    .map((p) => ({ alt: p.alt ?? "", file: p.file ?? "" }));
  return { id: z.id, label: z.label, text: z.text, ...(images.length ? { images } : {}) };
}

/** Page zones the Compliance call sees. */
export function compliancePayload(url: string, pageType: string, zones: PageZones): Record<string, unknown> {
  return {
    url,
    page_type: pageType,
    zones: zones.zones.filter((z) => !z.skipped && z.scope === "page" && PAGE_KINDS.has(z.kind)).map(zonePayload),
  };
}

/** Shared zones (banner CTA, forms and modals), checked once per run. */
export function sharedPayload(zones: PageZones): Record<string, unknown> {
  return {
    url: "site-wide",
    page_type: "shared",
    zones: zones.zones.filter((z) => !z.skipped && z.scope === "shared" && SHARED_KINDS.has(z.kind)).map(zonePayload),
  };
}

let headingCache: string[] | null = null;
export function resetHeadingCache(): void {
  headingCache = null;
}
/** Heading texts of the three source documents, lower case. */
function sourceHeadings(): string[] {
  if (headingCache) return headingCache;
  headingCache = [...loadSourcesText().matchAll(/^#{1,4}\s+(.+)$/gm)]
    .map((m) => m[1]!.replace(/^\d+\.\s*/, "").trim().toLowerCase())
    .filter((h) => h.length > 3);
  return headingCache;
}

/** A rule is accepted when it names a source document and a real section (heading text, or a Glossary § within 1-10). */
export function verifyRule(rule: string): boolean {
  const r = rule.toLowerCase();
  const doc = /decisions\.md|fact sheet|glossary/.test(r);
  if (!doc) return false;
  const sec = [...r.matchAll(/§\s*(\d+)/g)].map((m) => Number(m[1]));
  if (sec.length) return sec.every((n) => n >= 1 && n <= 10);
  return sourceHeadings().some((h) => r.includes(h));
}

function locate(zone: Zone | undefined, quote: string): { verified: boolean; part: string | null } {
  if (!zone) return { verified: false, part: null };
  const q = norm(quote);
  if (!q) return { verified: false, part: null };
  for (const p of zone.parts) {
    const hay = p.type === "image" ? `${p.alt ?? ""} ${p.file ?? ""}` : p.text;
    if (norm(hay).includes(q)) {
      return { verified: true, part: p.type === "field" && p.area ? p.area : `${p.type} ${p.index}` };
    }
  }
  return norm(zone.text).includes(q) ? { verified: true, part: null } : { verified: false, part: null };
}

/** The model says the sources contain nothing about the claim (as opposed to giving a different value): lower severity. */
function isUnverifiedClaim(category: string, basis: string | null | undefined, cfg: ComplianceConfig): boolean {
  return category in cfg.unverified_severity && basis === "not_in_sources";
}

function severityOf(
  category: string,
  locations: ComplianceLocation[],
  zones: PageZones,
  cfg: ComplianceConfig,
  unverified = false,
): Severity {
  if (unverified) return cfg.unverified_severity[category] ?? cfg.severity[category] ?? "low";
  const base = cfg.severity[category] ?? "low";
  if (category !== "old_terms") return base;
  const high = locations.some((l) => {
    const kind = zones.zones.find((z) => z.id === l.zone_id)?.kind;
    return (
      (kind && cfg.old_terms_high_kinds.includes(kind)) ||
      cfg.old_terms_high_zone_prefixes.some((p) => l.zone_id.startsWith(p))
    );
  });
  return high ? "high" : base;
}

export async function runComplianceLayer(
  client: OpenAI,
  settings: Settings,
  payload: Record<string, unknown>,
  zones: PageZones,
): Promise<ComplianceZoneResult> {
  const cfg = loadComplianceConfig();
  const instruction = loadComplianceZonesInstruction(settings.report_language);
  const res = await runComplianceZones(client, settings, instruction, payload);
  if (res.error || !res.data) {
    return { action: null, summary: null, problems: [], usage: res.usage, error: res.error ?? "empty response" };
  }
  const problems: ComplianceFinding[] = res.data.problems.map((p) => {
    const locations: ComplianceLocation[] = p.locations.slice(0, cfg.max_locations).map((l) => {
      const zone = zones.zones.find((z) => z.id === l.zone_id);
      const { verified, part } = locate(zone, l.quote);
      return { zone_id: l.zone_id, part, quote: l.quote, verified, ...(l.reason?.trim() ? { reason: l.reason.trim() } : {}) };
    });
    return {
      title: p.title,
      category: p.category,
      severity: severityOf(p.category, locations, zones, cfg, isUnverifiedClaim(p.category, p.basis, cfg)),
      rule: p.rule,
      rule_verified: verifyRule(p.rule),
      issue: p.issue,
      fix: p.fix,
      subject: p.subject,
      page_value: p.page_value,
      source_value: p.source_value,
      count: locations.length,
      locations,
      location_unverified: !locations.some((l) => l.verified),
      source: "llm" as const,
      unverified: isUnverifiedClaim(p.category, p.basis, cfg),
      basis: p.basis ?? null,
    };
  });
  return { action: res.data.action, summary: res.data.summary, problems, usage: res.usage, error: null };
}

/** Every occurrence of the banned terms (Glossary §7) in the zones, one problem per term. Deterministic and complete. */
function termProblems(scan: Zone[], zones: PageZones, cfg: ComplianceConfig): ComplianceFinding[] {
  const out: ComplianceFinding[] = [];
  for (const t of cfg.banned_terms ?? []) {
    let re: RegExp;
    try {
      re = new RegExp(t.pattern, "gi");
    } catch {
      continue;
    }
    const hits: ComplianceLocation[] = [];
    for (const z of scan) {
      for (const p of z.parts) {
        if (p.type === "image") continue;
        re.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = re.exec(p.text)) !== null) {
          if (m[0] === "") {
            re.lastIndex++;
            continue;
          }
          hits.push({
            zone_id: z.id,
            part: p.type === "field" && p.area ? p.area : p.type === "field" ? null : `${p.type} ${p.index}`,
            quote: m[0],
            verified: true,
          });
        }
      }
    }
    if (!hits.length) continue;
    const shown = hits.slice(0, cfg.max_locations);
    out.push({
      title: `Term not used: ${t.term}`,
      category: t.category,
      severity: severityOf(t.category, shown, zones, cfg),
      rule: t.rule,
      rule_verified: verifyRule(t.rule),
      issue: t.note ?? `"${t.term}" is a term or name the company no longer uses.`,
      fix: "Remove it or replace it as the Glossary says.",
      subject: t.term,
      page_value: null,
      source_value: null,
      count: hits.length,
      locations: shown,
      location_unverified: false,
      source: "code",
      unverified: false,
      basis: null,
    });
  }
  return out;
}

/**
 * Final Compliance problems of a page: the model's problems (severity recomputed from the current config)
 * plus the term-list findings. A model location that repeats a term hit of the same category is dropped.
 * `only` limits the zones scanned for terms (shared variants); by default the page zones.
 */
export function finalizeCompliance(llm: ComplianceFinding[], zones: PageZones, only?: Zone[]): ComplianceFinding[] {
  const cfg = loadComplianceConfig();
  const scan = only ?? zones.zones.filter((z) => !z.skipped && z.scope === "page" && PAGE_KINDS.has(z.kind));
  const code = termProblems(scan, zones, cfg);
  const hits = code.flatMap((c) => c.locations.map((l) => ({ category: c.category, zone: l.zone_id, quote: norm(l.quote) })));
  const kept: ComplianceFinding[] = [];
  for (const p of llm) {
    const unverified = isUnverifiedClaim(p.category, p.basis, cfg);
    let locations = p.locations;
    if (p.category === "old_terms" || p.category === "discontinued_offer") {
      locations = locations.filter((l) => {
        const q = norm(l.quote);
        return !hits.some((h) => h.category === p.category && h.zone === l.zone_id && (q.includes(h.quote) || h.quote.includes(q)));
      });
      if (!locations.length) continue;
    }
    kept.push({
      ...p,
      locations,
      count: locations.length,
      unverified,
      severity: severityOf(p.category, locations, zones, cfg, unverified),
      location_unverified: !locations.some((l) => l.verified),
    });
  }
  return [...kept, ...code];
}

/**
 * Page verdict from the findings, so two runs of the same page agree. `needs_decision` stays the model's
 * call. `rewrite`: the visible main message is wrong, meaning a high positioning, offer or term problem in
 * the H1, a hero block or the first content zone (a wrong title or meta description alone is a `fix`).
 * Otherwise `fix` if anything is high or medium, else `keep`.
 */
export function deriveAction(modelAction: string | null, problems: ComplianceFinding[], zones: PageZones): string {
  if (modelAction === "needs_decision") return "needs_decision";
  const cfg = loadComplianceConfig();
  const firstContent = zones.zones.find((z) => !z.skipped && z.scope === "page" && ["block", "article_section", "unknown"].includes(z.kind))?.id;
  const kindOf = (id: string): string | undefined => zones.zones.find((z) => z.id === id)?.kind;
  const mainMessage = problems.some(
    (p) =>
      p.severity === "high" &&
      ["positioning", "discontinued_offer", "old_terms"].includes(p.category) &&
      p.locations.some(
        (l) =>
          l.verified &&
          (kindOf(l.zone_id) === "h1" || l.zone_id === firstContent || cfg.old_terms_high_zone_prefixes.some((x) => l.zone_id.startsWith(x))),
      ),
  );
  if (mainMessage) return "rewrite";
  return problems.some((p) => (p.severity === "high" || p.severity === "medium") && !p.location_unverified) ? "fix" : "keep";
}
