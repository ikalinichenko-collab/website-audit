import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api, type JobDetail } from "../api.js";
import { useRunContext } from "../context/RunContext.js";
import { getIndex } from "../data.js";
import type { BriefListState, PageIndexEntry, RunIndexFile } from "../types.js";
import { ActionBadge, Counts, GeoCounts } from "../components/Badges.js";
import { JobBar } from "../components/JobBar.js";
import { buttonClass } from "../components/ResourceEditor.js";
import { actionKey, defaultSort } from "../utils.js";
import { ACTION_COLUMNS, GROUP_ORDER } from "../labels.js";
import { Loading } from "../components/Loading.js";
import { Help } from "../components/Help.js";

const when = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
const money = (v: number) => (v === 0 ? "$0" : v < 0.01 ? "<$0.01" : `$${v.toFixed(v < 1 ? 3 : 2)}`);
const shortPath = (u: string) => u.replace(/^https?:\/\/[^/]+/, "") || "/";

/** What each sortable column sorts by. */
const sev = (c: { high: number; medium: number; low: number }): number => c.high * 1e6 + c.medium * 1e3 + c.low;
const SORTS: Record<string, (e: PageIndexEntry) => string | number> = {
  title: (e) => e.title.toLowerCase(),
  group: (e) => `${e.group}/${e.subsection}`,
  action: (e) => ACTION_COLUMNS.findIndex((a) => a.key === actionKey(e)),
  compliance: (e) => sev(e.compliance),
  geo: (e) => e.geo.to_fix,
  seo: (e) => sev(e.seo),
  brief: (e) => (e.brief ? e.brief.partial + e.brief.missing : -1),
  checked: (e) => Date.parse(e.checked_at),
};

/** The brief of a page in the list: none, loaded, or checked with what is left to fix. Opens the Brief tab of the page. */
function BriefCell({ to, brief }: { to: string; brief: BriefListState | null }) {
  if (!brief) return <span className="text-slate-300 dark:text-slate-600" title="No brief is loaded for this page">-</span>;
  const toFix = brief.partial + brief.missing;
  return (
    <div className="text-xs">
      {brief.checked_at ? (
        <Link
          to={to}
          className={`hover:underline ${toFix === 0 ? "text-emerald-600 dark:text-emerald-400" : "font-medium text-violet-700 dark:text-violet-300"}`}
          title={`${brief.done} done, ${brief.partial} partly, ${brief.missing} missing. Checked ${when(brief.checked_at)}`}
        >
          {toFix === 0 ? "all done" : `${toFix} to fix`}
        </Link>
      ) : (
        <Link to={to} className="text-slate-500 hover:underline" title={`${brief.rows} rows loaded ${when(brief.uploaded_at)}`}>
          not checked
        </Link>
      )}
      {brief.stale && (
        <div>
          <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200" title="The brief or the page text changed since this check">
            outdated
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * The pages of a snapshot (`runId` given: shown inside Site Checks, the page links carry it), or the checked pages: the current
 * deep check of each page, with a recheck on every row.
 */
export function PagesTable({ runId: given }: { runId?: string } = {}) {
  const checkMode = !given;
  const runQuery = given ? `?run=${encodeURIComponent(given)}` : "";
  const { reloadChecks } = useRunContext();
  const [params, setParams] = useSearchParams();
  const [index, setIndex] = useState<RunIndexFile | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [job, setJob] = useState<{ id: string; label: string } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  // progress of the brief checks started from the list ("2 of 5"), null when none runs
  const [briefBusy, setBriefBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIndex(await getIndex(given ?? null));
    } catch {
      setIndex(null);
    }
  }, [given]);

  useEffect(() => {
    void load();
  }, [load]);

  const list = useMemo(() => {
    if (!index) return [];
    const group = params.get("group");
    const sub = params.get("sub");
    const action = params.get("action");
    const q = params.get("q")?.toLowerCase().trim();
    const highOnly = params.get("high") === "1";
    let l: PageIndexEntry[] = [...index.pages];
    if (group) l = l.filter((e) => e.group === group);
    if (sub) l = l.filter((e) => `${e.group}/${e.subsection}` === sub);
    if (action) l = l.filter((e) => actionKey(e) === action);
    if (highOnly) l = l.filter((e) => e.compliance.high + e.seo.high > 0);
    if (params.get("mine") === "1") l = l.filter((e) => e.mine);
    if (params.get("changed") === "1") l = l.filter((e) => e.changed === true);
    const brief = params.get("brief");
    if (brief === "has") l = l.filter((e) => e.brief);
    if (brief === "none") l = l.filter((e) => !e.brief);
    if (brief === "unchecked") l = l.filter((e) => e.brief && !e.brief.checked_at);
    if (brief === "outdated") l = l.filter((e) => e.brief?.stale);
    if (q) l = l.filter((e) => e.title.toLowerCase().includes(q) || e.url.toLowerCase().includes(q));
    const sort = params.get("sort");
    if (!sort || !SORTS[sort]) return l.sort(defaultSort);
    const sign = params.get("dir") === "asc" ? 1 : -1;
    const key = SORTS[sort]!;
    return l.sort((a, b) => {
      const x = key(a);
      const y = key(b);
      return (typeof x === "string" && typeof y === "string" ? x.localeCompare(y) : Number(x) - Number(y)) * sign || defaultSort(a, b);
    });
  }, [index, params]);

  /** Clicking a column title sorts by it, clicking it again flips the order (kept in the address, like the filters). */
  function sortBy(k: string) {
    const next = new URLSearchParams(params);
    if (params.get("sort") === k) next.set("dir", params.get("dir") === "asc" ? "desc" : "asc");
    else {
      next.set("sort", k);
      next.set("dir", k === "title" || k === "group" ? "asc" : "desc");
    }
    setParams(next, { replace: true });
  }

  function set(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  /** One page is rechecked as it was checked (same layers and model); several with the defaults: a page whose text did not change reuses the model's answers. */
  async function recheck(entries: PageIndexEntry[]) {
    setMsg(null);
    try {
      const one = entries.length === 1 ? entries[0]! : null;
      const r = await api.startJob({
        text: entries.map((e) => e.url).join("\n"),
        ...(one?.layers ? { layers: one.layers } : {}),
        ...(one?.model ? { model: one.model } : {}),
      });
      setJob({ id: r.id, label: one ? `Rechecking ${shortPath(one.url)}` : `Rechecking ${entries.length} pages` });
    } catch (e) {
      setMsg(String(e instanceof Error ? e.message : e));
    }
  }

  /** The brief check is its own call per page (one model call each); a result that is still current costs nothing. */
  async function checkBriefs(entries: PageIndexEntry[]) {
    const withBrief = entries.filter((e) => e.brief);
    if (!withBrief.length) return;
    const many = withBrief.length > 1;
    if (!window.confirm(`Check ${withBrief.length} ${many ? "pages" : "page"} against ${many ? "their briefs" : "its brief"}? One model call each, about $0.006; a result that is still current is reused.`)) return;
    setMsg(null);
    const failed: string[] = [];
    for (const [i, e] of withBrief.entries()) {
      setBriefBusy(`${i + 1} of ${withBrief.length}`);
      try {
        await api.runBriefCheck(e.slug, null, undefined, false);
      } catch (err) {
        failed.push(`${shortPath(e.url)}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    setBriefBusy(null);
    await load();
    setMsg(failed.length ? `Brief check failed for ${failed.length}: ${failed.join("; ")}` : `Brief checked for ${withBrief.length} ${many ? "pages" : "page"}.`);
  }

  function jobDone(j: JobDetail) {
    setJob(null);
    setSelected(new Set());
    void load();
    void reloadChecks();
    setMsg(j.status === "done" ? "Rechecked." : j.status === "stopped" ? "Stopped. The pages that were finished are updated." : `The recheck failed: ${j.error ?? "see the log"}`);
  }

  async function remove(e: PageIndexEntry) {
    if (!window.confirm(`Remove "${e.title}" from the checked pages? Decisions on its findings are kept.`)) return;
    try {
      await api.deleteCheck(e.slug);
      await load();
      await reloadChecks();
    } catch (err) {
      setMsg(String(err instanceof Error ? err.message : err));
    }
  }

  if (!index) return <Loading />;
  if (checkMode && index.pages.length === 0) {
    return (
      <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-lg font-semibold">No pages checked yet</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Add the links of the pages you want to look at in depth. They appear here, and each can be rechecked after you change it.
        </p>
        <p className="text-sm">
          <Link to="/add" className="text-blue-600 hover:underline dark:text-blue-400">
            Add pages
          </Link>
        </p>
      </div>
    );
  }
  const layers = index.layers ?? { compliance: true, geo: true, seo: true };
  const showCompliance = checkMode || layers.compliance;
  const groups = Object.keys(index.by_group).sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b));
  const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";
  const changedEntries = index.pages.filter((e) => e.changed === true);
  const selectedEntries = index.pages.filter((e) => selected.has(e.slug));
  const busy = !!job || !!briefBusy;
  const allShown = list.length > 0 && list.every((e) => selected.has(e.slug));
  const sortedBy = params.get("sort");
  const arrow = (k: string) => (sortedBy === k ? (params.get("dir") === "asc" ? " ▲" : " ▼") : "");
  /** A column title that sorts the table. */
  const th = (k: string, label: string) => (
    <th className="px-3 py-2" aria-sort={sortedBy === k ? (params.get("dir") === "asc" ? "ascending" : "descending") : "none"}>
      <button type="button" className="font-semibold uppercase hover:text-slate-900 dark:hover:text-slate-100" onClick={() => sortBy(k)} title="Sort by this column">
        {label}
        {arrow(k)}
      </button>
    </th>
  );

  return (
    <div className="space-y-4">
      {checkMode && (
        <Help id="checked-pages">
          <p>The pages you checked in depth, one line each. They are read against the latest site snapshot.</p>
          <p>A recheck replaces the result of a page: the model is asked again only about what changed, and what the edit fixed is shown on the page. Tick several pages to recheck them together, or to check them against their briefs.</p>
          <p>Click a column title to sort by it.</p>
        </Help>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <select className={field} value={params.get("group") ?? ""} onChange={(e) => set("group", e.target.value)}>
          <option value="">All groups</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select className={field} value={params.get("sub") ?? ""} onChange={(e) => set("sub", e.target.value)}>
          <option value="">All subsections</option>
          {Object.keys(index.by_subsection)
            .sort()
            .map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
        {showCompliance && (
          <select className={field} value={params.get("action") ?? ""} onChange={(e) => set("action", e.target.value)}>
            <option value="">Any action</option>
            {ACTION_COLUMNS.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
        )}
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={params.get("high") === "1"} onChange={(e) => set("high", e.target.checked ? "1" : "")} />
          Has high findings
        </label>
        {checkMode && (
          <>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={params.get("mine") === "1"} onChange={(e) => set("mine", e.target.checked ? "1" : "")} />
              Mine
            </label>
            <label className="flex items-center gap-1 text-sm" title="The latest snapshot has a different text of the page than when it was checked">
              <input type="checkbox" checked={params.get("changed") === "1"} onChange={(e) => set("changed", e.target.checked ? "1" : "")} />
              Changed since checked ({changedEntries.length})
            </label>
            <select className={field} value={params.get("brief") ?? ""} onChange={(e) => set("brief", e.target.value)} title="The content brief of the page">
              <option value="">Any brief</option>
              <option value="has">Has a brief</option>
              <option value="none">No brief</option>
              <option value="unchecked">Brief not checked</option>
              <option value="outdated">Brief check outdated</option>
            </select>
          </>
        )}
        <input className={`${field} w-64`} placeholder="Search title or URL" value={params.get("q") ?? ""} onChange={(e) => set("q", e.target.value)} />
        <span className="ml-auto text-sm text-slate-500">{list.length} pages</span>
      </div>

      {checkMode && (
        <div className="flex min-h-[2rem] flex-wrap items-center gap-3 text-sm">
          {selectedEntries.length > 0 && (
            <>
              <span className="font-medium">{selectedEntries.length} selected</span>
              <button type="button" className={buttonClass} disabled={busy} onClick={() => void recheck(selectedEntries)}>
                Recheck
              </button>
              <button type="button" className={buttonClass} disabled={busy || selectedEntries.every((e) => !e.brief)} onClick={() => void checkBriefs(selectedEntries)} title="Separate from the recheck: one model call per page that has a brief">
                {briefBusy ? `Checking briefs ${briefBusy}...` : `Check by brief (${selectedEntries.filter((e) => e.brief).length})`}
              </button>
              <button type="button" className="text-slate-600 hover:underline dark:text-slate-400" onClick={() => setSelected(new Set())}>
                Clear
              </button>
              <span className="text-xs text-slate-500">Several pages are rechecked with all layers and the default model.</span>
            </>
          )}
          {changedEntries.length > 0 && (
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void recheck(changedEntries)} title="Pages whose text in the latest snapshot differs from when they were checked">
              Recheck changed ({changedEntries.length})
            </button>
          )}
          <span className="ml-auto flex gap-3">
            <a className="text-blue-600 hover:underline dark:text-blue-400" href="/api/checks/findings.csv" download>
              findings.csv
            </a>
            <a className="text-blue-600 hover:underline dark:text-blue-400" href="/api/checks/summary.csv" download>
              summary.csv
            </a>
          </span>
        </div>
      )}
      {job && <JobBar jobId={job.id} label={job.label} onDone={jobDone} />}
      {msg && <p className="rounded bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">{msg}</p>}

      <div className="overflow-x-clip rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="sticky z-[5] bg-slate-50 text-xs uppercase text-slate-500 shadow-[0_1px_0_0_rgb(226,232,240)] dark:bg-slate-800 dark:shadow-[0_1px_0_0_rgb(51,65,85)]" style={{ top: checkMode ? "5.4rem" : "3.4rem" }}>
            <tr>
              {checkMode && (
                <th className="w-8 px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label="Select all shown"
                    checked={allShown}
                    onChange={(e) => setSelected(e.target.checked ? new Set(list.map((x) => x.slug)) : new Set())}
                  />
                </th>
              )}
              {th("title", "Page")}
              {th("group", "Group")}
              {showCompliance && th("action", "Action")}
              {showCompliance && th("compliance", "Compliance")}
              {th("geo", "GEO")}
              {th("seo", "SEO")}
              {checkMode && th("brief", "Brief")}
              {checkMode && th("checked", "Checked")}
              {checkMode && <th className="px-3 py-2" />}
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.slug} className="border-t border-slate-100 dark:border-slate-800">
                {checkMode && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select ${e.title}`}
                      checked={selected.has(e.slug)}
                      onChange={(ev) =>
                        setSelected((cur) => {
                          const next = new Set(cur);
                          if (ev.target.checked) next.add(e.slug);
                          else next.delete(e.slug);
                          return next;
                        })
                      }
                    />
                  </td>
                )}
                <td className="max-w-md px-3 py-2">
                  <Link to={`/pages/${encodeURIComponent(e.slug)}${runQuery}`} className="text-blue-600 hover:underline dark:text-blue-400">
                    {e.title}
                  </Link>
                  <div className="truncate text-xs text-slate-500">{e.url}</div>
                </td>
                <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                  {e.group} / {e.subsection}
                </td>
                {showCompliance && (
                  <td className="px-3 py-2">
                    <ActionBadge action={actionKey(e)} />
                  </td>
                )}
                {showCompliance && (
                  <td className="whitespace-nowrap px-3 py-2">
                    {e.compliance.error && checkMode ? (
                      <span className="text-xs text-slate-400" title={e.compliance.error}>
                        not checked
                      </span>
                    ) : (
                      <Counts {...e.compliance} off={!layers.compliance} />
                    )}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-2">
                  {e.geo.error && checkMode ? (
                    <span className="text-xs text-slate-400" title={e.geo.error}>
                      not checked
                    </span>
                  ) : (
                    <GeoCounts
                      total={e.geo.to_fix}
                      sev={e.geo.high === undefined ? undefined : { high: e.geo.high, medium: e.geo.medium ?? 0, low: e.geo.low ?? 0 }}
                      off={!layers.geo}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <Counts {...e.seo} off={!layers.seo} />
                </td>
                {checkMode && (
                  <td className="whitespace-nowrap px-3 py-2">
                    <BriefCell to={`/pages/${encodeURIComponent(e.slug)}?tab=brief`} brief={e.brief ?? null} />
                  </td>
                )}
                {checkMode && (
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="tabular-nums">{when(e.checked_at)}</div>
                    <div className="text-xs text-slate-500">
                      {e.checked_by ?? "command line"}
                      {e.cost_usd != null && e.cost_usd > 0 ? ` · ${money(e.cost_usd)}` : ""}
                    </div>
                    {e.changed === true && (
                      <span className="mt-0.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200" title="The latest snapshot has a different text of this page than when it was checked">
                        changed
                      </span>
                    )}
                  </td>
                )}
                {checkMode && (
                  <td className="whitespace-nowrap px-3 py-2 text-right text-sm">
                    <button type="button" className="text-blue-600 hover:underline disabled:opacity-40 dark:text-blue-400" disabled={busy} onClick={() => void recheck([e])}>
                      Recheck
                    </button>
                    <button type="button" className="ml-3 text-red-600 hover:underline disabled:opacity-40" disabled={busy} onClick={() => void remove(e)}>
                      remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
