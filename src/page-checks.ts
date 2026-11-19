import { db } from "./db.js";
import type { PageReport, SiteReport } from "./report-types.js";
import { pageFindings, type Finding, type Layer } from "./findings.js";
import { attachFragments, buildRunIndex, pageIndexEntry, type BriefListState, type PageIndexEntry, type RunIndexFile, type StoredZones } from "./run-output.js";
import { shownName } from "./users.js";
import type { Layers, Settings, TokenUsage } from "./types.js";
import { buildFindingsCsv, buildSummaryCsv } from "./render.js";
import { layerRan, LAYERS, withStatuses } from "./store.js";

/**
 * Page checks: the current deep check of each page, one row per page, with no run around it. A recheck overwrites the row;
 * the findings of the check before the last change of the page are kept (`prev`) so a recheck can say what the edit fixed.
 */

/** The findings of the check before the last change of the page. */
export interface PrevCheck {
  checked_at: string;
  /** layers that ran cleanly in that check: only those are compared */
  layers: Layer[];
  findings: Finding[];
}

export interface StoredCheck {
  slug: string;
  url: string;
  report: PageReport;
  checked_at: Date;
  checked_by: string | null;
  model: string | null;
  layers: Layers | null;
  site_run_id: string | null;
  content_hash: string | null;
  prev: PrevCheck | null;
}

const COLUMNS = "slug, url, report, checked_at, checked_by, model, layers, site_run_id, content_hash, prev";

/** The stored check of an address (without the page's HTML and zones), or null. */
export async function previousCheck(url: string): Promise<StoredCheck | null> {
  const r = await db().query<StoredCheck>(`SELECT ${COLUMNS} FROM page_checks WHERE url = $1`, [url]);
  return r.rows[0] ?? null;
}

export async function getCheckRow(slug: string): Promise<(StoredCheck & { zones: { zones?: { id: string; text?: string }[] } }) | null> {
  const r = await db().query<StoredCheck & { zones: { zones?: { id: string; text?: string }[] } }>(`SELECT ${COLUMNS}, zones FROM page_checks WHERE slug = $1`, [slug]);
  return r.rows[0] ?? null;
}

/** The snapshot a checked page was read against (null when there was none). */
export async function getCheckSnapshotId(slug: string): Promise<string | null> {
  const r = await db().query<{ site_run_id: string | null }>("SELECT site_run_id FROM page_checks WHERE slug = $1", [slug]);
  return r.rows[0]?.site_run_id ?? null;
}

export async function getCheckReport(slug: string): Promise<PageReport | null> {
  const r = await db().query<{ report: PageReport }>("SELECT report FROM page_checks WHERE slug = $1", [slug]);
  return r.rows[0]?.report ?? null;
}

/** The site report of a snapshot (null for none). */
async function siteOf(runId: string | null): Promise<SiteReport | null> {
  if (!runId) return null;
  const r = await db().query<{ site: SiteReport | null }>("SELECT site FROM runs WHERE id = $1", [runId]);
  return r.rows[0]?.site ?? null;
}

export interface SaveCheck {
  slug: string;
  report: PageReport;
  html: string;
  zones: StoredZones;
  settings: Settings;
  checkedBy: string | null;
  model: string;
  layers: Layers;
  /** the latest snapshot at the time of the check: what the page is read against */
  snapshot: { id: string; site: SiteReport } | null;
  prev: StoredCheck | null;
  /** what this check cost (shown in the list) */
  cost: number;
}

/** Writes the check of a page, replacing the one before. The page is readable from this moment on. */
export async function savePageCheck(c: SaveCheck): Promise<void> {
  attachFragments(c.report, c.html, c.zones, c.settings);
  const context = c.snapshot?.site ?? null;
  // the cost shown for a page is everything spent on it so far: the earlier checks (the log) and this one
  const spent = Number((await db().query<{ s: string }>("SELECT COALESCE(sum(cost_usd), 0) AS s FROM check_log WHERE kind = 'page' AND url = $1", [c.report.final_url])).rows[0]!.s) + c.cost;
  const entry: PageIndexEntry = { ...pageIndexEntry(c.slug, c.report, pageFindings(c.report, context)), model: c.model, layers: c.layers, cost_usd: spent };
  // The check before is kept only when the page's text changed since: then "what did my edit fix" compares with it. Rechecking an
  // unchanged page leaves the older one in place, so a second recheck does not erase what the first one showed.
  let prev: PrevCheck | null = c.prev?.prev ?? null;
  if (c.prev && (!c.prev.content_hash || c.prev.content_hash !== c.report.content_hash)) {
    prev = {
      checked_at: c.prev.checked_at.toISOString(),
      layers: LAYERS.filter((l) => layerRan(c.prev!.report, l)),
      findings: pageFindings(c.prev.report, context),
    };
  }
  await db().query(
    `INSERT INTO page_checks (slug, url, report, entry, html, zones, checked_at, checked_by, model, layers, site_run_id, content_hash, prev)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     ON CONFLICT (slug) DO UPDATE SET url = $2, report = $3, entry = $4, html = $5, zones = $6, checked_at = $7, checked_by = $8, model = $9, layers = $10,
       site_run_id = $11, content_hash = $12, prev = $13`,
    [
      c.slug,
      c.report.final_url,
      JSON.stringify(c.report),
      JSON.stringify(entry),
      c.html,
      JSON.stringify(c.zones),
      c.report.checked_at,
      c.checkedBy,
      c.model,
      JSON.stringify(c.layers),
      c.snapshot?.id ?? null,
      c.report.content_hash ?? null,
      prev ? JSON.stringify(prev) : null,
    ],
  );
}

export async function deleteCheck(slug: string): Promise<boolean> {
  const r = await db().query("DELETE FROM page_checks WHERE slug = $1", [slug]);
  return (r.rowCount ?? 0) > 0;
}

// ---- the list -------------------------------------------------------------------------------

/**
 * Every checked page as list rows. `changed` says the latest snapshot has a different text of the page: only a snapshot made after
 * the check can say that, so it is null (not known) otherwise.
 */
export async function listChecks(forEmail: string | null): Promise<PageIndexEntry[]> {
  const rows = (
    await db().query<{ slug: string; entry: PageIndexEntry; checked_by: string | null; checked_by_name: string | null; content_hash: string | null; checked_at: Date; url: string }>(
      `SELECT slug, entry, checked_by, CASE WHEN checked_by IS NULL THEN NULL ELSE ${shownName("checked_by")} END AS checked_by_name, content_hash, checked_at, url FROM page_checks`,
    )
  ).rows;
  const snap = (await db().query<{ id: string; started_at: Date }>("SELECT id, started_at FROM runs WHERE kind = 'site' AND status = 'done' AND site IS NOT NULL ORDER BY started_at DESC LIMIT 1")).rows[0];
  const hashes = new Map<string, string | null>();
  if (snap && rows.length) {
    const h = await db().query<{ url: string; h: string | null }>("SELECT report->>'final_url' AS url, report->>'content_hash' AS h FROM pages WHERE run_id = $1 AND report->>'final_url' = ANY($2)", [snap.id, rows.map((r) => r.url)]);
    for (const x of h.rows) hashes.set(x.url, x.h);
  }
  const briefs = await briefStates(rows);
  return rows.map((r) => {
    const snapHash = hashes.get(r.url) ?? null;
    const changed = snap && snap.started_at > r.checked_at && r.content_hash && snapHash ? r.content_hash !== snapHash : null;
    return { ...r.entry, checked_by: r.checked_by_name, mine: !!forEmail && r.checked_by === forEmail, changed, brief: briefs.get(r.slug) ?? null };
  });
}

/**
 * The brief of each checked page and its check. A check is out of date when a newer brief version was uploaded, or the page text
 * differs from the one it was made from (a check made before the hash was kept is judged by the date of the page check).
 */
async function briefStates(pages: { slug: string; content_hash: string | null; checked_at: Date }[]): Promise<Map<string, BriefListState>> {
  const out = new Map<string, BriefListState>();
  if (!pages.length) return out;
  const slugs = pages.map((p) => p.slug);
  const b = await db().query<{ slug: string; id: string; rows: number; uploaded_at: Date }>(
    "SELECT DISTINCT ON (slug) slug, id, jsonb_array_length(rows) AS rows, uploaded_at FROM page_briefs WHERE slug = ANY($1) ORDER BY slug, id DESC",
    [slugs],
  );
  const c = await db().query<{ slug: string; brief_id: string; checked_at: Date; content_hash: string | null; statuses: string[] }>(
    "SELECT slug, brief_id, checked_at, content_hash, ARRAY(SELECT x->>'status' FROM jsonb_array_elements(result->'rows') x) AS statuses FROM brief_checks WHERE slug = ANY($1) AND source = ''",
    [slugs],
  );
  const checks = new Map(c.rows.map((x) => [x.slug, x]));
  const page = new Map(pages.map((p) => [p.slug, p]));
  for (const x of b.rows) {
    const k = checks.get(x.slug);
    const p = page.get(x.slug)!;
    const count = (s: string): number => k?.statuses.filter((v) => v === s).length ?? 0;
    const stale = !k ? false : Number(k.brief_id) !== Number(x.id) || (k.content_hash ? k.content_hash !== p.content_hash : p.checked_at > k.checked_at);
    out.set(x.slug, { rows: Number(x.rows), uploaded_at: x.uploaded_at.toISOString(), checked_at: k ? k.checked_at.toISOString() : null, done: count("done"), partial: count("partial"), missing: count("missing"), stale });
  }
  return out;
}

/** The list in the shape of a run's index: totals and groups for the Overview, rows for the table. */
export async function getChecksIndex(forEmail: string | null): Promise<RunIndexFile> {
  return buildRunIndex(await listChecks(forEmail), null, undefined);
}

/** Every checked page as CSV: its findings, or one row per page. */
export async function checksCsv(kind: "findings" | "summary"): Promise<string> {
  const rows = (await db().query<{ report: PageReport; site_run_id: string | null }>("SELECT report, site_run_id FROM page_checks ORDER BY url")).rows;
  const sites = new Map<string, SiteReport | null>();
  for (const r of rows) if (r.site_run_id && !sites.has(r.site_run_id)) sites.set(r.site_run_id, await siteOf(r.site_run_id));
  const siteOfRow = (id: string | null): SiteReport | null => (id ? (sites.get(id) ?? null) : null);
  if (kind === "findings") return buildFindingsCsv(rows.flatMap((r) => pageFindings(r.report, siteOfRow(r.site_run_id))));
  const latest = (await db().query<{ id: string }>("SELECT id FROM runs WHERE kind = 'site' AND status = 'done' AND site IS NOT NULL ORDER BY started_at DESC LIMIT 1")).rows[0]?.id ?? null;
  return buildSummaryCsv(rows.map((r) => r.report), latest ? await siteOf(latest) : null);
}

// ---- one page ------------------------------------------------------------------------------

export interface CheckCompare {
  previous_run: string;
  previous_at: string;
  layers: Layer[];
  resolved: Finding[];
}

/** The findings of a checked page and what changed since the check before its last change; marks the new ones. */
export async function getCheckFindings(slug: string): Promise<{ findings: Finding[]; compare: CheckCompare | null; snapshotRunId: string | null; report: PageReport } | null> {
  const row = await getCheckRow(slug);
  if (!row) return null;
  const site = await siteOf(row.site_run_id);
  const findings = pageFindings(row.report, site);
  let compare: CheckCompare | null = null;
  if (row.prev) {
    const layers = LAYERS.filter((l) => layerRan(row.report, l) && row.prev!.layers.includes(l));
    const before = row.prev.findings.filter((f) => layers.includes(f.layer));
    const beforeIds = new Set(before.map((f) => f.fid));
    const nowIds = new Set(findings.map((f) => f.fid));
    for (const f of findings) if (layers.includes(f.layer) && !beforeIds.has(f.fid)) f.change = "new";
    compare = { previous_run: "", previous_at: row.prev.checked_at, layers, resolved: await withStatuses(before.filter((f) => !nowIds.has(f.fid)), new Date(row.prev.checked_at)) };
  }
  return { findings: await withStatuses(findings, row.checked_at), compare, snapshotRunId: row.site_run_id, report: row.report };
}

// ---- what the checks cost -------------------------------------------------------------------

export interface LogCheck {
  kind: "page" | "site_llm" | "brief";
  by: string | null;
  url: string;
  model: string | null;
  layers: Layers | null;
  tokens: TokenUsage;
  cost: number;
  calls: number;
  fromSnapshot: boolean;
}

export async function logCheck(c: LogCheck): Promise<void> {
  await db().query("INSERT INTO check_log (kind, by, url, model, layers, tokens, cost_usd, llm_calls, from_snapshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
    c.kind,
    c.by,
    c.url,
    c.model,
    c.layers ? JSON.stringify(c.layers) : null,
    JSON.stringify(c.tokens),
    c.cost,
    c.calls,
    c.fromSnapshot,
  ]);
}

export interface Spending {
  total: { cost: number; calls: number; checks: number };
  by_month: { month: string; cost: number; calls: number; checks: number }[];
  by_person: { person: string; cost: number; calls: number; checks: number }[];
  recent: { at: string; kind: string; by: string | null; url: string; model: string | null; cost: number; calls: number; tokens: TokenUsage }[];
}

/** What the model checks cost: totals, by month, by person, and the latest ones. */
export async function getSpending(): Promise<Spending> {
  const total = (await db().query<{ cost: string; calls: string; checks: string }>("SELECT COALESCE(sum(cost_usd), 0) AS cost, COALESCE(sum(llm_calls), 0) AS calls, count(*) AS checks FROM check_log")).rows[0]!;
  const months = await db().query<{ month: string; cost: string; calls: string; checks: string }>(
    "SELECT to_char(at, 'YYYY-MM') AS month, sum(cost_usd) AS cost, sum(llm_calls) AS calls, count(*) AS checks FROM check_log GROUP BY 1 ORDER BY 1 DESC LIMIT 12",
  );
  const people = await db().query<{ person: string | null; cost: string; calls: string; checks: string }>(
    `SELECT CASE WHEN by IS NULL THEN NULL ELSE ${shownName("by")} END AS person, sum(cost_usd) AS cost, sum(llm_calls) AS calls, count(*) AS checks FROM check_log GROUP BY 1 ORDER BY 2 DESC`,
  );
  const recent = await db().query<{ at: Date; kind: string; by: string | null; url: string; model: string | null; cost_usd: string; llm_calls: number; tokens: TokenUsage }>(
    `SELECT at, kind, CASE WHEN by IS NULL THEN NULL ELSE ${shownName("by")} END AS by, url, model, cost_usd, llm_calls, tokens FROM check_log ORDER BY at DESC LIMIT 100`,
  );
  return {
    total: { cost: Number(total.cost), calls: Number(total.calls), checks: Number(total.checks) },
    by_month: months.rows.map((m) => ({ month: m.month, cost: Number(m.cost), calls: Number(m.calls), checks: Number(m.checks) })),
    by_person: people.rows.map((p) => ({ person: p.person ?? "command line", cost: Number(p.cost), calls: Number(p.calls), checks: Number(p.checks) })),
    recent: recent.rows.map((r) => ({ at: r.at.toISOString(), kind: r.kind, by: r.by, url: r.url, model: r.model, cost: Number(r.cost_usd), calls: r.llm_calls, tokens: r.tokens })),
  };
}
