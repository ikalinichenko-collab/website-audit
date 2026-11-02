import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useRunContext } from "../context/RunContext.js";
import { getIndex } from "../data.js";
import type { PageIndexEntry, RunIndexFile } from "../types.js";
import { ActionBadge, Counts } from "../components/Badges.js";
import { actionKey, defaultSort } from "../utils.js";
import { ACTION_COLUMNS, GROUP_ORDER } from "../labels.js";

export function PagesTable() {
  const { runId } = useRunContext();
  const [params, setParams] = useSearchParams();
  const [index, setIndex] = useState<RunIndexFile | null>(null);

  useEffect(() => {
    if (runId) {
      getIndex(runId)
        .then(setIndex)
        .catch(() => setIndex(null));
    }
  }, [runId]);

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
    if (q) l = l.filter((e) => e.title.toLowerCase().includes(q) || e.url.toLowerCase().includes(q));
    return l.sort(defaultSort);
  }, [index, params]);

  function set(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  if (!index) return <p className="text-slate-500">Loading...</p>;
  const groups = Object.keys(index.by_group).sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b));
  const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="space-y-4">
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
        <select className={field} value={params.get("action") ?? ""} onChange={(e) => set("action", e.target.value)}>
          <option value="">Any action</option>
          {ACTION_COLUMNS.map((a) => (
            <option key={a.key} value={a.key}>
              {a.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={params.get("high") === "1"} onChange={(e) => set("high", e.target.checked ? "1" : "")} />
          Has high findings
        </label>
        <input
          className={`${field} w-64`}
          placeholder="Search title or URL"
          value={params.get("q") ?? ""}
          onChange={(e) => set("q", e.target.value)}
        />
        <span className="ml-auto text-sm text-slate-500">{list.length} pages</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800">
            <tr>
              <th className="px-3 py-2">Page</th>
              <th className="px-3 py-2">Group</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Compliance</th>
              <th className="px-3 py-2">GEO</th>
              <th className="px-3 py-2">SEO</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.slug} className="border-t border-slate-100 dark:border-slate-800">
                <td className="max-w-md px-3 py-2">
                  <Link to={`/pages/${encodeURIComponent(e.slug)}`} className="text-blue-600 hover:underline dark:text-blue-400">
                    {e.title}
                  </Link>
                  <div className="truncate text-xs text-slate-500">{e.url}</div>
                </td>
                <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                  {e.group} / {e.subsection}
                </td>
                <td className="px-3 py-2">
                  <ActionBadge action={actionKey(e)} />
                </td>
                <td className="px-3 py-2">
                  <Counts {...e.compliance} />
                </td>
                <td className="px-3 py-2 tabular-nums">{e.geo.to_fix}</td>
                <td className="px-3 py-2">
                  <Counts {...e.seo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
