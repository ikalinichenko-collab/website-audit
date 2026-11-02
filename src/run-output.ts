import * as fs from "node:fs";
import path from "node:path";
import type { RunMeta, Settings } from "./types.js";
import type { PageReport, SiteReport } from "./report-types.js";
import { countBy, fragmentAllowed, pageFindings, siteFindings, type Finding } from "./findings.js";
import { buildFindingsCsv, buildSummaryCsv, renderPageReport, renderSiteReport } from "./render.js";
import { fragmentForQuote } from "./quote-fragments.js";
import { projectRoot } from "./utils.js";
import { readJson } from "./paths.js";

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
  geo: { to_fix: number; error: string | null };
  seo: { high: number; medium: number; low: number };
  checked_at: string;
}

export interface GroupTotals {
  pages: number;
  compliance: { high: number; medium: number; low: number };
  geo: number;
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
}

export interface RunListEntry {
  id: string;
  started_at: string;
  ended_at: string;
  pages_checked: number;
  cost_usd: number | null;
  tokens: RunMeta["tokens"];
  /** 2 = readable by the viewer; 1 = made before the zone redesign */
  format: 1 | 2;
}

function emptyTotals(): GroupTotals {
  return {
    pages: 0,
    compliance: { high: 0, medium: 0, low: 0 },
    geo: 0,
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
  t.seo.high += e.seo.high;
  t.seo.medium += e.seo.medium;
  t.seo.low += e.seo.low;
  const a = e.compliance.error ? "not_checked" : (e.action ?? "keep");
  t.actions[a] = (t.actions[a] ?? 0) + 1;
}

function loadReports(runPath: string): { slug: string; report: PageReport }[] {
  const dir = path.join(runPath, "pages");
  if (!fs.existsSync(dir)) return [];
  const out: { slug: string; report: PageReport }[] = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json") || f.endsWith(".zones.json") || f.endsWith(".findings.json")) continue;
    const r = readJson<PageReport>(path.join(dir, f));
    if (r?.schema_version === 2) out.push({ slug: f.replace(/\.json$/, ""), report: r });
  }
  return out;
}

/** Attach text-fragment values for quotes found in the visible page text, then save the page JSON. */
function attachFragments(runPath: string, slug: string, r: PageReport, settings: Settings): boolean {
  const htmlPath = path.join(runPath, "pages", `${slug}.html`);
  if (!fs.existsSync(htmlPath)) return false;
  const html = fs.readFileSync(htmlPath, "utf8");
  let changed = false;
  for (const p of r.compliance.problems) {
    for (const l of p.locations) {
      if (l.fragment !== undefined || !l.verified || !fragmentAllowed(l.zone_id)) continue;
      l.fragment = fragmentForQuote(html, settings, l.quote);
      changed = true;
    }
  }
  for (const a of r.geo.llm) {
    if (a.fragment !== undefined || !a.evidence || !a.evidence_verified || !fragmentAllowed(a.zone_id ?? "page")) continue;
    a.fragment = fragmentForQuote(html, settings, a.evidence);
    changed = true;
  }
  return changed;
}

/** Rebuild per-page `.md`, `site.md`, both CSV files and the viewer index from the JSON in a run folder. */
export function writeRunOutputs(runPath: string, settings: Settings): { pages: number } {
  const site = readJson<SiteReport>(path.join(runPath, "site.json"));
  const loaded = loadReports(runPath);
  const entries: PageIndexEntry[] = [];
  const allFindings: Finding[] = [];
  const reports: PageReport[] = [];

  for (const { slug, report } of loaded) {
    if (attachFragments(runPath, slug, report, settings)) {
      fs.writeFileSync(path.join(runPath, "pages", `${slug}.json`), JSON.stringify(report, null, 2));
    }
    fs.writeFileSync(path.join(runPath, "pages", `${slug}.md`), renderPageReport(report, site));
    const f = pageFindings(report, site);
    fs.writeFileSync(path.join(runPath, "pages", `${slug}.findings.json`), JSON.stringify(f, null, 1));
    allFindings.push(...f);
    reports.push(report);
    const c = countBy(f, "compliance");
    const s = countBy(f, "seo");
    entries.push({
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
      geo: { to_fix: countBy(f, "geo").other, error: report.geo.error },
      seo: { high: s.high, medium: s.medium, low: s.low },
      checked_at: report.checked_at,
    });
  }
  entries.sort((a, b) => a.url.localeCompare(b.url));

  const totals = emptyTotals();
  const byGroup: Record<string, GroupTotals> = {};
  const bySub: Record<string, GroupTotals> = {};
  for (const e of entries) {
    addTo(totals, e);
    addTo((byGroup[e.group] ??= emptyTotals()), e);
    addTo((bySub[`${e.group}/${e.subsection}`] ??= emptyTotals()), e);
  }

  let siteCounts: RunIndexFile["site"] = { compliance: { high: 0, medium: 0, low: 0 }, seo: 0, geo: 0 };
  if (site) {
    const sf = siteFindings(site);
    fs.writeFileSync(path.join(runPath, "site.findings.json"), JSON.stringify(sf, null, 1));
    allFindings.push(...sf);
    const c = countBy(sf, "compliance");
    siteCounts = { compliance: { high: c.high, medium: c.medium, low: c.low }, seo: countBy(sf, "seo").high + countBy(sf, "seo").medium + countBy(sf, "seo").low, geo: countBy(sf, "geo").other };
    fs.writeFileSync(path.join(runPath, "site.md"), renderSiteReport(site, reports));
  }

  fs.writeFileSync(path.join(runPath, "summary.csv"), buildSummaryCsv(reports, site));
  fs.writeFileSync(path.join(runPath, "findings.csv"), buildFindingsCsv(allFindings));
  const index: RunIndexFile = { schema_version: 2, pages: entries, totals, by_group: byGroup, by_subsection: bySub, site: siteCounts };
  fs.writeFileSync(path.join(runPath, "index.json"), JSON.stringify(index, null, 2));
  writeRunsManifest();
  return { pages: entries.length };
}

export function writeRunsManifest(): RunListEntry[] {
  const resultsRoot = path.join(projectRoot(), "results");
  fs.mkdirSync(resultsRoot, { recursive: true });
  const runs: RunListEntry[] = [];
  for (const name of fs.readdirSync(resultsRoot)) {
    if (name === "latest" || name === "runs.json") continue;
    const runPath = path.join(resultsRoot, name);
    if (!fs.statSync(runPath).isDirectory()) continue;
    const meta = readJson<RunMeta>(path.join(runPath, "run.json"));
    if (!meta) continue;
    runs.push({
      id: name,
      started_at: meta.started_at,
      ended_at: meta.ended_at,
      pages_checked: meta.pages_checked,
      cost_usd: meta.cost_usd,
      tokens: meta.tokens,
      format: readJson<{ schema_version?: number }>(path.join(runPath, "index.json"))?.schema_version === 2 ? 2 : 1,
    });
  }
  runs.sort((a, b) => b.started_at.localeCompare(a.started_at));
  fs.writeFileSync(path.join(resultsRoot, "runs.json"), JSON.stringify(runs, null, 2));
  return runs;
}
