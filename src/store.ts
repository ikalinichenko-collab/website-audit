import type { Layers, RunMeta, Settings } from "./types.js";
import type { PageReport, SiteReport } from "./report-types.js";
import { db } from "./db.js";
import { shownName } from "./users.js";
import { FINDING_STATUSES, pageFindings, siteFindings, type Finding, type FindingStatus, type Layer } from "./findings.js";
import { buildFindingsCsv, buildSummaryCsv, renderPageReport, renderSiteReport } from "./render.js";
import { attachFragments, buildRunIndex, pageIndexEntry, type PageIndexEntry, type RunIndexFile, type RunListEntry, type StoredZones } from "./run-output.js";
import { buildSiteSources, type SiteSources } from "./site-sources.js";
import { loadSeoConfig } from "./config.js";
import { graphUrl } from "./links.js";

export type RunStatus = "running" | "done" | "stopped" | "error" | "interrupted";

const ZERO_TOKENS = { input: 0, cached_input: 0, output: 0 };
const FINGERPRINTS_KEY = "site_wide_fingerprints";

// ---- writing a run -------------------------------------------------------------

export async function createRun(run: { id: string; startedAt: string; model: string; layers: Layers; options: unknown; startedBy?: string | null }): Promise<void> {
  await db().query("INSERT INTO runs (id, status, started_at, model, layers, options, started_by) VALUES ($1, 'running', $2, $3, $4, $5, $6)", [
    run.id,
    run.startedAt,
    run.model,
    JSON.stringify(run.layers),
    JSON.stringify(run.options),
    run.startedBy ?? null,
  ]);
}

/** Saves one finished page. The run can be read from now on, the page already counts in its index. */
export async function savePage(runId: string, slug: string, report: PageReport, html: string, zones: StoredZones, settings: Settings): Promise<void> {
  attachFragments(report, html, zones, settings);
  const entry = pageIndexEntry(slug, report, pageFindings(report, null));
  await db().query(
    `INSERT INTO pages (run_id, slug, url, report, entry, html, zones, checked_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (run_id, slug) DO UPDATE SET report = $4, entry = $5, html = $6, zones = $7, checked_at = $8`,
    [runId, slug, report.url, JSON.stringify(report), JSON.stringify(entry), html, JSON.stringify(zones), report.checked_at],
  );
}

/** Refreshes the site map row of a page the run has just fetched. */
export async function saveSitePage(
  runId: string,
  row: { url: string; final_url: string; title: string; meta: string; h1: string; links_out: string[]; checked_at: string },
): Promise<void> {
  await db().query(
    `INSERT INTO site_pages (url, final_url, title, meta, h1, links_out, run_id, checked_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (url) DO UPDATE SET final_url = $2, title = $3, meta = $4, h1 = $5, links_out = $6, listing = false, run_id = $7, checked_at = $8`,
    [row.url, row.final_url, row.title, row.meta, row.h1, JSON.stringify(row.links_out), runId, row.checked_at],
  );
}

export interface SiteMapRow {
  url: string;
  title: string;
  meta: string;
  h1: string;
  checked_at: string;
}

/** The site map without the URLs a run has just fetched (it knows those better). Empty when no site check has been made. */
export async function loadSiteMapExcept(finalUrls: string[]): Promise<SiteMapRow[]> {
  const r = await db().query<{ final_url: string; title: string; meta: string; h1: string; checked_at: Date }>(
    "SELECT final_url, title, meta, h1, checked_at FROM site_pages WHERE NOT (final_url = ANY($1::text[]))",
    [finalUrls],
  );
  return r.rows.map((x) => ({ url: x.final_url, title: x.title, meta: x.meta, h1: x.h1, checked_at: x.checked_at.toISOString() }));
}

/** Adds links to a page's stored list (the pages of a listing count as part of the listing page). */
export async function addSiteLinks(url: string, links: string[]): Promise<void> {
  const cur = await db().query<{ links_out: string[] | null }>("SELECT links_out FROM site_pages WHERE url = $1", [url]);
  if (!cur.rows[0]) return;
  const merged = [...new Set([...(cur.rows[0].links_out ?? []), ...links])];
  await db().query("UPDATE site_pages SET links_out = $2, listing = true WHERE url = $1", [url, JSON.stringify(merged)]);
}

/** Stored main-content links of every page that has them, by the requested URL as a graph URL (no trailing slash). */
export async function loadSiteLinks(): Promise<Map<string, string[]>> {
  const r = await db().query<{ url: string; links_out: string[] }>("SELECT url, links_out FROM site_pages WHERE links_out IS NOT NULL");
  return new Map(r.rows.map((x) => [x.url.split("#")[0]!.replace(/\/$/, ""), x.links_out]));
}

/** When the site map last fetched each URL (by the requested URL). */
export async function loadSiteMapTimes(): Promise<Map<string, string>> {
  const r = await db().query<{ url: string; checked_at: Date }>("SELECT url, checked_at FROM site_pages");
  return new Map(r.rows.map((x) => [x.url, x.checked_at.toISOString()]));
}

export async function saveRunFingerprints(runId: string, fingerprints: string[]): Promise<void> {
  const value = JSON.stringify({ fingerprints });
  await db().query("UPDATE runs SET fingerprints = $2 WHERE id = $1", [runId, value]);
  await db().query("INSERT INTO kv (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2", [FINGERPRINTS_KEY, value]);
}

/** Site-wide JSON-LD fingerprints of the last multi-page run: single-page runs reuse them. */
export async function loadSavedFingerprints(): Promise<Set<string>> {
  const r = await db().query<{ value: { fingerprints: string[] } }>("SELECT value FROM kv WHERE key = $1", [FINGERPRINTS_KEY]);
  return new Set(r.rows[0]?.value.fingerprints ?? []);
}

/** Ends a run: saves the site pass, recomputes the page rows with it and builds the site sources. */
export async function finishRun(runId: string, status: RunStatus, meta: RunMeta | null, site: SiteReport | null): Promise<void> {
  const pool = db();
  if (site) {
    const rows = await pool.query<{ slug: string; report: PageReport }>("SELECT slug, report FROM pages WHERE run_id = $1", [runId]);
    for (const { slug, report } of rows.rows) {
      const entry = pageIndexEntry(slug, report, pageFindings(report, site));
      await pool.query("UPDATE pages SET entry = $3 WHERE run_id = $1 AND slug = $2", [runId, slug, JSON.stringify(entry)]);
    }
    const fps = (await pool.query<{ fingerprints: { fingerprints: string[] } | null }>("SELECT fingerprints FROM runs WHERE id = $1", [runId])).rows[0]?.fingerprints?.fingerprints ?? [];
    const sources = await buildSiteSources(fps, site, pagesOfRun(runId), async (slug) => {
      const z = await pool.query<{ zones: { zones: { id: string; label: string; text: string }[] } }>("SELECT zones FROM pages WHERE run_id = $1 AND slug = $2", [runId, slug]);
      return z.rows[0]?.zones.zones;
    });
    await pool.query("UPDATE runs SET site = $2, site_sources = $3 WHERE id = $1", [runId, JSON.stringify(site), JSON.stringify(sources)]);
  }
  await pool.query("UPDATE runs SET status = $2, ended_at = now(), meta = $3 WHERE id = $1", [runId, status, meta ? JSON.stringify(meta) : null]);
}

async function* pagesOfRun(runId: string): AsyncGenerator<{ slug: string; url: string; final_url: string; html: string }> {
  const slugs = (await db().query<{ slug: string }>("SELECT slug FROM pages WHERE run_id = $1 ORDER BY slug", [runId])).rows;
  for (const { slug } of slugs) {
    const r = await db().query<{ url: string; final_url: string; html: string }>(
      "SELECT url, report->>'final_url' AS final_url, html FROM pages WHERE run_id = $1 AND slug = $2",
      [runId, slug],
    );
    if (r.rows[0]) yield { slug, ...r.rows[0] };
  }
}

/** Recomputes fragments, page rows and site sources of a finished run (after a change in `fragmentForQuote` or the findings). */
export async function rebuildRun(runId: string, settings: Settings): Promise<number> {
  const pool = db();
  const run = (await pool.query<{ site: SiteReport | null }>("SELECT site FROM runs WHERE id = $1", [runId])).rows[0];
  if (!run) throw new Error(`No run ${runId}`);
  const slugs = (await pool.query<{ slug: string }>("SELECT slug FROM pages WHERE run_id = $1", [runId])).rows;
  for (const { slug } of slugs) {
    const r = (await pool.query<{ report: PageReport; html: string; zones: StoredZones }>("SELECT report, html, zones FROM pages WHERE run_id = $1 AND slug = $2", [runId, slug])).rows[0]!;
    attachFragments(r.report, r.html, r.zones, settings);
    const entry = pageIndexEntry(slug, r.report, pageFindings(r.report, run.site));
    await pool.query("UPDATE pages SET report = $3, entry = $4 WHERE run_id = $1 AND slug = $2", [runId, slug, JSON.stringify(r.report), JSON.stringify(entry)]);
  }
  return slugs.length;
}

// ---- cache: the latest earlier report of a URL where the layer actually ran ---------------

/** The latest saved report of this URL in which the layer was checked (not turned off). */
export async function previousReport(url: string, layer: "compliance" | "geo"): Promise<PageReport | null> {
  const r = await db().query<{ report: PageReport }>(
    `SELECT p.report FROM pages p JOIN runs r ON r.id = p.run_id
     WHERE p.url = $1 AND p.report->>'schema_version' = '2' AND COALESCE(p.report->$2->>'skipped', 'false') <> 'true'
       AND COALESCE(p.report->$2->>'error', '') NOT LIKE 'LLM skipped%'
     ORDER BY r.started_at DESC LIMIT 1`,
    [url, layer],
  );
  return r.rows[0]?.report ?? null;
}

// ---- reading ----------------------------------------------------------------------------

export async function latestRunId(): Promise<string | null> {
  const r = await db().query<{ id: string }>("SELECT id FROM runs WHERE status IN ('done', 'stopped') ORDER BY started_at DESC LIMIT 1");
  return r.rows[0]?.id ?? null;
}

export async function listRuns(): Promise<RunListEntry[]> {
  const r = await db().query<{
    id: string;
    status: RunStatus;
    started_at: Date;
    ended_at: Date | null;
    model: string | null;
    layers: Layers | null;
    meta: RunMeta | null;
    started_by: string | null;
    kind: string | null;
    pages: string;
  }>(`SELECT r.id, r.status, r.started_at, r.ended_at, r.model, r.layers, r.meta, r.options->>'kind' AS kind, CASE WHEN r.started_by IS NULL THEN NULL ELSE ${shownName("r.started_by")} END AS started_by, (SELECT count(*) FROM pages p WHERE p.run_id = r.id) AS pages
      FROM runs r ORDER BY r.started_at DESC`);
  return r.rows.map((x) => ({
    id: x.id,
    status: x.status,
    started_at: x.started_at.toISOString(),
    ended_at: (x.ended_at ?? x.started_at).toISOString(),
    pages_checked: x.meta?.pages_checked ?? Number(x.pages),
    cost_usd: x.meta?.cost_usd ?? null,
    tokens: x.meta?.tokens ?? ZERO_TOKENS,
    ...(x.model ? { model: x.model } : {}),
    ...(x.layers ? { layers: x.layers } : {}),
    ...(x.started_by ? { started_by: x.started_by } : {}),
    ...(x.kind === "site_scan" ? { kind: "site_scan" as const } : {}),
    format: 2 as const,
  }));
}

export async function getRunMeta(runId: string): Promise<RunMeta | null> {
  const r = await db().query<{ started_at: Date; ended_at: Date | null; model: string | null; layers: Layers | null; meta: RunMeta | null; pages: string }>(
    "SELECT started_at, ended_at, model, layers, meta, (SELECT count(*) FROM pages p WHERE p.run_id = runs.id) AS pages FROM runs WHERE id = $1",
    [runId],
  );
  const x = r.rows[0];
  if (!x) return null;
  if (x.meta) return x.meta;
  // a run still going, or one that ended without a summary
  return {
    run_id: runId,
    started_at: x.started_at.toISOString(),
    ended_at: (x.ended_at ?? x.started_at).toISOString(),
    pages_checked: Number(x.pages),
    pages_skipped: 0,
    llm_calls: 0,
    llm_errors: 0,
    tokens: ZERO_TOKENS,
    cost_usd: null,
    ...(x.model ? { model: x.model } : {}),
    ...(x.layers ? { layers: x.layers } : {}),
  };
}

async function runSite(runId: string): Promise<SiteReport | null> {
  const r = await db().query<{ site: SiteReport | null }>("SELECT site FROM runs WHERE id = $1", [runId]);
  return r.rows[0]?.site ?? null;
}

export async function getSite(runId: string): Promise<SiteReport | null> {
  return runSite(runId);
}

export async function getSiteFindings(runId: string): Promise<Finding[] | null> {
  const site = await runSite(runId);
  return site ? withStatuses(siteFindings(site), await runStartedAt(runId)) : null;
}

export async function getSiteSources(runId: string): Promise<SiteSources | null> {
  const r = await db().query<{ site_sources: SiteSources | null }>("SELECT site_sources FROM runs WHERE id = $1", [runId]);
  return r.rows[0]?.site_sources ?? null;
}

export async function getRunIndex(runId: string): Promise<RunIndexFile | null> {
  const run = await db().query<{ site: SiteReport | null; layers: Layers | null }>("SELECT site, layers FROM runs WHERE id = $1", [runId]);
  if (!run.rows[0]) return null;
  const rows = await db().query<{ entry: PageIndexEntry }>("SELECT entry FROM pages WHERE run_id = $1", [runId]);
  return buildRunIndex(rows.rows.map((x) => x.entry), run.rows[0].site, run.rows[0].layers ?? undefined);
}

export async function getPage(runId: string, slug: string): Promise<PageReport | null> {
  const r = await db().query<{ report: PageReport }>("SELECT report FROM pages WHERE run_id = $1 AND slug = $2", [runId, slug]);
  return r.rows[0]?.report ?? null;
}

/** A page against the site map: duplicates and who links to it, as of the last time each page was fetched. */
export interface SiteCheck {
  /** false when the site map has no row for the page (it was never fetched by a run that fills the map) */
  available: boolean;
  as_of: string | null;
  /** how many pages the site map knows */
  map_pages: number;
  duplicates: { field: "title" | "meta" | "h1"; value: string; urls: string[] }[];
  /** other pages whose content links to this one */
  inbound: { url: string; title: string }[];
  /** the page's profile is one whose pages must be linked from other pages (orphan_profiles) */
  orphan_checked: boolean;
}

/** The page of a run against the site map (live: what the map knows now, not what it knew at the run). */
export async function getSiteCheck(runId: string, slug: string): Promise<SiteCheck | null> {
  const pg = await db().query<{ url: string; profile: string }>("SELECT url, report->>'profile' AS profile FROM pages WHERE run_id = $1 AND slug = $2", [runId, slug]);
  const page = pg.rows[0];
  if (!page) return null;
  const own = (await db().query<{ title: string; meta: string; h1: string; listing: boolean; checked_at: Date }>("SELECT title, meta, h1, listing, checked_at FROM site_pages WHERE url = $1", [page.url])).rows[0];
  const total = Number((await db().query<{ n: string }>("SELECT count(*) AS n FROM site_pages")).rows[0]!.n);
  if (!own) return { available: false, as_of: null, map_pages: total, duplicates: [], inbound: [], orphan_checked: false };
  const duplicates: SiteCheck["duplicates"] = [];
  for (const field of ["title", "meta", "h1"] as const) {
    const value = own[field].trim();
    if (!value) continue;
    const r = await db().query<{ url: string }>(`SELECT url FROM site_pages WHERE ${field} = $1 AND url <> $2 ORDER BY url`, [own[field], page.url]);
    if (r.rows.length) duplicates.push({ field, value, urls: r.rows.map((x) => x.url) });
  }
  const inbound = await db().query<{ url: string; title: string }>("SELECT url, title FROM site_pages WHERE url <> $2 AND links_out @> $1::jsonb ORDER BY url", [JSON.stringify([graphUrl(page.url)]), page.url]);
  return {
    available: true,
    as_of: own.checked_at.toISOString(),
    map_pages: total,
    duplicates,
    inbound: inbound.rows,
    orphan_checked: !own.listing && (loadSeoConfig().orphan_profiles ?? []).includes(page.profile),
  };
}

/** What changed on a page since the previous run of the same URL. */
export interface PageCompare {
  previous_run: string;
  previous_at: string;
  /** layers that ran cleanly in both runs; the others are not compared */
  layers: Layer[];
  /** findings of the previous run that are gone now */
  resolved: Finding[];
}

export interface PageFindingsResult {
  findings: Finding[];
  /** null when the page has no earlier run */
  compare: PageCompare | null;
}

export async function getPageFindings(runId: string, slug: string): Promise<PageFindingsResult | null> {
  const report = await getPage(runId, slug);
  if (!report) return null;
  const startedAt = await runStartedAt(runId);
  const findings = pageFindings(report, await runSite(runId));
  const compare = await compareWithPrevious(runId, startedAt, report, findings);
  return { findings: await withStatuses(findings, startedAt), compare };
}

const LAYERS: Layer[] = ["compliance", "geo", "seo"];

/** A layer can be compared when it ran without error in the report. */
function layerRan(r: PageReport, layer: Layer): boolean {
  const l = r[layer] as { skipped?: boolean; error?: string | null };
  return !l.skipped && !l.error;
}

async function compareWithPrevious(runId: string, startedAt: Date | null, report: PageReport, findings: Finding[]): Promise<PageCompare | null> {
  if (!startedAt) return null;
  const prev = (
    await db().query<{ id: string; started_at: Date; site: SiteReport | null; report: PageReport }>(
      `SELECT r.id, r.started_at, r.site, p.report FROM pages p JOIN runs r ON r.id = p.run_id
       WHERE p.url = $1 AND r.id <> $2 AND r.started_at < $3 AND p.report->>'schema_version' = '2'
       ORDER BY r.started_at DESC LIMIT 1`,
      [report.url, runId, startedAt],
    )
  ).rows[0];
  if (!prev) return null;
  const layers = LAYERS.filter((l) => layerRan(report, l) && layerRan(prev.report, l));
  const before = pageFindings(prev.report, prev.site).filter((f) => layers.includes(f.layer));
  const beforeIds = new Set(before.map((f) => f.fid));
  const nowIds = new Set(findings.map((f) => f.fid));
  for (const f of findings) if (layers.includes(f.layer) && !beforeIds.has(f.fid)) f.change = "new";
  return {
    previous_run: prev.id,
    previous_at: prev.started_at.toISOString(),
    layers,
    resolved: await withStatuses(before.filter((f) => !nowIds.has(f.fid)), prev.started_at),
  };
}

// ---- finding status -----------------------------------------------------------------------------

async function runStartedAt(runId: string): Promise<Date | null> {
  const r = await db().query<{ started_at: Date }>("SELECT started_at FROM runs WHERE id = $1", [runId]);
  return r.rows[0]?.started_at ?? null;
}

/**
 * Adds the stored decision to each finding. A finding marked fixed counts as open again in a run that started after the
 * mark: it is still there.
 */
async function withStatuses(findings: Finding[], runStart: Date | null): Promise<Finding[]> {
  if (!findings.length) return findings;
  const rows = (
    await db().query<{ fid: string; status: FindingStatus; note: string | null; set_by: string | null; set_at: Date }>(
      `SELECT fid, status, note, CASE WHEN set_by IS NULL THEN NULL ELSE ${shownName("set_by")} END AS set_by, set_at FROM finding_status WHERE fid = ANY($1)`,
      [[...new Set(findings.map((f) => f.fid))]],
    )
  ).rows;
  const byFid = new Map(rows.map((r) => [r.fid, r]));
  return findings.map((f) => {
    const s = byFid.get(f.fid);
    if (!s) return f;
    if (s.status === "fixed" && runStart && runStart > s.set_at) return { ...f, reopened: true };
    return { ...f, status: s.status, ...(s.note ? { status_note: s.note } : {}), status_by: s.set_by, status_at: s.set_at.toISOString() };
  });
}

/** Sets or clears (status null) the decision for the given places of a page or of the site pass. */
export async function setFindingStatus(
  runId: string,
  slug: string | null,
  fids: string[],
  status: FindingStatus | null,
  note: string,
  by: string | null,
): Promise<number> {
  if (status !== null && !FINDING_STATUSES.includes(status)) throw new Error("Unknown status");
  const all = slug ? (await getPageFindings(runId, slug))?.findings : await getSiteFindings(runId);
  if (!all) throw new Error("Page or run not found");
  const wanted = new Set(fids);
  const places = [...new Map(all.filter((f) => wanted.has(f.fid)).map((f) => [f.fid, f])).values()];
  if (!places.length) throw new Error("None of these findings is in that run");
  if (status === null) {
    await db().query("DELETE FROM finding_status WHERE fid = ANY($1)", [places.map((f) => f.fid)]);
    return places.length;
  }
  for (const f of places) {
    await db().query(
      `INSERT INTO finding_status (fid, status, note, set_by, set_at, url, layer, kind, title, zone_id, quote) VALUES ($1, $2, $3, $4, now(), $5, $6, $7, $8, $9, $10)
       ON CONFLICT (fid) DO UPDATE SET status = $2, note = $3, set_by = $4, set_at = now()`,
      [f.fid, status, note || null, by, f.url, f.layer, f.kind, f.title, f.zone_id, f.quote.slice(0, 300)],
    );
  }
  return places.length;
}

async function allReports(runId: string): Promise<PageReport[]> {
  const r = await db().query<{ report: PageReport }>("SELECT report FROM pages WHERE run_id = $1 ORDER BY url", [runId]);
  return r.rows.map((x) => x.report);
}

// ---- generated files (computed when asked for) ----------------------------------------------

export async function pageMarkdown(runId: string, slug: string): Promise<string | null> {
  const report = await getPage(runId, slug);
  return report ? renderPageReport(report, await runSite(runId)) : null;
}

export async function siteMarkdown(runId: string): Promise<string | null> {
  const site = await runSite(runId);
  return site ? renderSiteReport(site, await allReports(runId)) : null;
}

export async function summaryCsv(runId: string): Promise<string> {
  return buildSummaryCsv(await allReports(runId), await runSite(runId));
}

export async function findingsCsv(runId: string): Promise<string> {
  const site = await runSite(runId);
  const all = (await allReports(runId)).flatMap((r) => pageFindings(r, site));
  return buildFindingsCsv([...all, ...(site ? siteFindings(site) : [])]);
}

// ---- deleting ---------------------------------------------------------------------------------

export async function deleteRun(runId: string): Promise<boolean> {
  const r = await db().query("DELETE FROM runs WHERE id = $1", [runId]);
  return (r.rowCount ?? 0) > 0;
}
