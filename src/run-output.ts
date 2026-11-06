import type { Layers, RunMeta, Settings } from "./types.js";
import type { PageReport, SiteReport } from "./report-types.js";
import { countBy, fragmentAllowed, siteFindings, totalOf, type Finding } from "./findings.js";
import { fragmentForQuote, tablePlaceOfPart } from "./quote-fragments.js";


export interface PageIndexEntry {
  slug: string;
  url: string;
  title: string;
  group: string;
  subsection: string;
  profile: string;
  template: string;
  action: string | null;
  summary: string | null;
  compliance: { high: number; medium: number; low: number; error: string | null };
  /** `to_fix` counts every GEO finding; the severity split is absent in runs made before GEO had severities */
  geo: { to_fix: number; high?: number; medium?: number; low?: number; error: string | null };
  seo: { high: number; medium: number; low: number };
  checked_at: string;
}

export interface GroupTotals {
  pages: number;
  compliance: { high: number; medium: number; low: number };
  geo: number;
  geo_sev?: { high: number; medium: number; low: number };
  seo: { high: number; medium: number; low: number };
  actions: Record<string, number>;
}

export interface RunIndexFile {
  schema_version: 2;
  pages: PageIndexEntry[];
  totals: GroupTotals;
  by_group: Record<string, GroupTotals>;
  by_subsection: Record<string, GroupTotals>;
  site: { compliance: { high: number; medium: number; low: number }; seo: number; geo: number };
  /** layers that ran; absent in runs made before layers could be turned off (all three) */
  layers?: Layers;
}

export interface RunListEntry {
  id: string;
  started_at: string;
  ended_at: string;
  pages_checked: number;
  cost_usd: number | null;
  tokens: RunMeta["tokens"];
  model?: string;
  layers?: Layers;
  /** running, done, stopped, error or interrupted (the server restarted during the run) */
  status?: string;
  /** 2 = readable by the viewer; 1 = made before the zone redesign (no longer stored) */
  format: 1 | 2;
}

function emptyTotals(): GroupTotals {
  return {
    pages: 0,
    compliance: { high: 0, medium: 0, low: 0 },
    geo: 0,
    geo_sev: { high: 0, medium: 0, low: 0 },
    seo: { high: 0, medium: 0, low: 0 },
    actions: {},
  };
}

function addTo(t: GroupTotals, e: PageIndexEntry): void {
  t.pages++;
  t.compliance.high += e.compliance.high;
  t.compliance.medium += e.compliance.medium;
  t.compliance.low += e.compliance.low;
  t.geo += e.geo.to_fix;
  if (t.geo_sev) {
    t.geo_sev.high += e.geo.high ?? 0;
    t.geo_sev.medium += e.geo.medium ?? 0;
    t.geo_sev.low += e.geo.low ?? 0;
  }
  t.seo.high += e.seo.high;
  t.seo.medium += e.seo.medium;
  t.seo.low += e.seo.low;
  const a = e.compliance.error ? "not_checked" : (e.action ?? "keep");
  t.actions[a] = (t.actions[a] ?? 0) + 1;
}


/** Bump when `fragmentForQuote` changes: stored fragments are recomputed on the next report build. */
const LOCATOR_VERSION = 3;

export interface StoredZones {
  zones: { id: string; label?: string; text?: string; parts?: { type: string; index: number; text: string }[] }[];
}

/** Attach text-fragment values for quotes found in the visible page text. Changes the report in place. */
export function attachFragments(r: PageReport, html: string, zonesFile: StoredZones | null, settings: Settings): boolean {
  const zones = zonesFile?.zones;
  let changed = false;
  for (const p of r.compliance.problems) {
    for (const l of p.locations) {
      if (l.locator === LOCATOR_VERSION || !l.verified || !fragmentAllowed(l.zone_id)) continue;
      // the text of the part the location names, so the link goes to that element and not to the first one with the same words
      const partText = l.part
        ? zones?.find((z) => z.id === l.zone_id)?.parts?.find((x) => `${x.type} ${x.index}` === l.part)?.text
        : undefined;
      const found = fragmentForQuote(html, settings, l.quote, partText);
      l.fragment = found.fragment;
      l.place = found.place;
      l.locator = LOCATOR_VERSION;
      changed = true;
    }
  }
  for (const c of r.geo.code) {
    for (const pl of c.places ?? []) {
      if (pl.place !== undefined || !pl.part?.startsWith("table_cell")) continue;
      const text = zones?.find((z) => z.id === pl.zone_id)?.parts?.find((x) => `${x.type} ${x.index}` === pl.part)?.text;
      pl.place = (text && tablePlaceOfPart(html, settings, text)) || "";
      changed = true;
    }
  }
  for (const a of r.geo.llm) {
    if (a.fragment !== undefined || !a.evidence || !a.evidence_verified || !fragmentAllowed(a.zone_id ?? "page")) continue;
    a.fragment = fragmentForQuote(html, settings, a.evidence).fragment;
    changed = true;
  }
  return changed;
}

/** One row of the page list, counted from the page's findings. */
export function pageIndexEntry(slug: string, report: PageReport, findings: Finding[]): PageIndexEntry {
  const c = countBy(findings, "compliance");
  const s = countBy(findings, "seo");
  const g = countBy(findings, "geo");
  return {
    slug,
    url: report.final_url,
    title: report.title || report.final_url,
    group: report.category,
    subsection: report.subsection,
    profile: report.profile,
    template: report.template,
    action: report.compliance.error ? null : report.compliance.action,
    summary: report.compliance.summary,
    compliance: { high: c.high, medium: c.medium, low: c.low, error: report.compliance.error },
    geo: { to_fix: totalOf(g), high: g.high, medium: g.medium, low: g.low, error: report.geo.error },
    seo: { high: s.high, medium: s.medium, low: s.low },
    checked_at: report.checked_at,
  };
}

/** The viewer index of a run: page rows, totals per group and subsection, site counts. */
export function buildRunIndex(entries: PageIndexEntry[], site: SiteReport | null, layers: Layers | undefined): RunIndexFile {
  const sorted = [...entries].sort((a, b) => a.url.localeCompare(b.url));
  const totals = emptyTotals();
  const byGroup: Record<string, GroupTotals> = {};
  const bySub: Record<string, GroupTotals> = {};
  for (const e of sorted) {
    addTo(totals, e);
    addTo((byGroup[e.group] ??= emptyTotals()), e);
    addTo((bySub[`${e.group}/${e.subsection}`] ??= emptyTotals()), e);
  }
  let siteCounts: RunIndexFile["site"] = { compliance: { high: 0, medium: 0, low: 0 }, seo: 0, geo: 0 };
  if (site) {
    const sf = siteFindings(site);
    const c = countBy(sf, "compliance");
    const seo = countBy(sf, "seo");
    siteCounts = { compliance: { high: c.high, medium: c.medium, low: c.low }, seo: seo.high + seo.medium + seo.low, geo: totalOf(countBy(sf, "geo")) };
  }
  return { schema_version: 2, pages: sorted, totals, by_group: byGroup, by_subsection: bySub, site: siteCounts, ...(layers ? { layers } : {}) };
}
