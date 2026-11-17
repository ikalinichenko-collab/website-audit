import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api, type JobDetail } from "../api.js";
import { useRunContext } from "../context/RunContext.js";
import { getIndex } from "../data.js";
import type { PageIndexEntry, RunIndexFile } from "../types.js";
import { ActionBadge, Counts, GeoCounts } from "../components/Badges.js";
import { JobBar } from "../components/JobBar.js";
import { buttonClass } from "../components/ResourceEditor.js";
import { actionKey, defaultSort } from "../utils.js";
import { ACTION_COLUMNS, GROUP_ORDER } from "../labels.js";

const when = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
const money = (v: number) => (v === 0 ? "$0" : v < 0.01 ? "<$0.01" : `$${v.toFixed(v < 1 ? 3 : 2)}`);
const shortPath = (u: string) => u.replace(/^https?:\/\/[^/]+/, "") || "/";

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
    if (q) l = l.filter((e) => e.title.toLowerCase().includes(q) || e.url.toLowerCase().includes(q));
    return l.sort(defaultSort);
  }, [index, params]);

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

  if (!index) return <p className="text-slate-500">Loading...</p>;
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
  const busy = !!job;
  const allShown = list.length > 0 && list.every((e) => selected.has(e.slug));

  return (
    <div className="space-y-4">
      {checkMode && (
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          The pages you checked in depth, one line each. A recheck replaces the result of a page; the model is asked again only about what changed, and what the edit fixed is shown on the page. Choose several pages to recheck them together.
        </p>
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
          </>
        )}
        <input className={`${field} w-64`} placeholder="Search title or URL" value={params.get("q") ?? ""} onChange={(e) => set("q", e.target.value)} />
        <span className="ml-auto text-sm text-slate-500">{list.length} pages</span>
      </div>

      {checkMode && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button type="button" className={buttonClass} disabled={busy || selectedEntries.length === 0} onClick={() => void recheck(selectedEntries)}>
            Recheck selected ({selectedEntries.length})
          </button>
          <button type="button" className={buttonClass} disabled={busy || changedEntries.length === 0} onClick={() => void recheck(changedEntries)} title="Pages whose text in the latest snapshot differs from when they were checked">
            Recheck changed ({changedEntries.length})
          </button>
          <span className="text-xs text-slate-500">Several pages are rechecked with all layers and the default model.</span>
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

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800">
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
              <th className="px-3 py-2">Page</th>
              <th className="px-3 py-2">Group</th>
              {showCompliance && <th className="px-3 py-2">Action</th>}
              {showCompliance && <th className="px-3 py-2">Compliance</th>}
              <th className="px-3 py-2">GEO</th>
              <th className="px-3 py-2">SEO</th>
              {checkMode && <th className="px-3 py-2">Checked</th>}
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
                  <td className="px-3 py-2">
                    {e.compliance.error && checkMode ? (
                      <span className="text-xs text-slate-400" title={e.compliance.error}>
                        not checked
                      </span>
                    ) : (
                      <Counts {...e.compliance} off={!layers.compliance} />
                    )}
                  </td>
                )}
                <td className="px-3 py-2">
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
                <td className="px-3 py-2">
                  <Counts {...e.seo} off={!layers.seo} />
                </td>
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
