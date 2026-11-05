import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRunContext } from "../context/RunContext.js";
import { getIndex, getRun } from "../data.js";
import type { GroupTotals, Layers, RunIndexFile, RunMeta } from "../types.js";
import { ACTION_COLUMNS, GROUP_ORDER } from "../labels.js";
import { Counts, GeoCounts } from "../components/Badges.js";
import { formatDuration, formatTokens } from "../utils.js";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="text-xs uppercase text-slate-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{children}</div>
    </div>
  );
}

function Row({ name, t, link, layers }: { name: string; t: GroupTotals; link: string; layers: Layers }) {
  return (
    <tr className="border-t border-slate-100 dark:border-slate-800">
      <td className="px-3 py-2">
        <Link to={link} className="text-blue-600 hover:underline dark:text-blue-400">
          {name}
        </Link>
      </td>
      <td className="px-3 py-2 tabular-nums">{t.pages}</td>
      <td className="px-3 py-2">
        <Counts {...t.compliance} off={!layers.compliance} />
      </td>
      <td className="px-3 py-2">
        <GeoCounts total={t.geo} sev={t.geo_sev} off={!layers.geo} />
      </td>
      <td className="px-3 py-2">
        <Counts {...t.seo} off={!layers.seo} />
      </td>
      {ACTION_COLUMNS.map((a) => (
        <td key={a.key} className="px-3 py-2 tabular-nums text-slate-600 dark:text-slate-400">
          {t.actions[a.key] ?? 0}
        </td>
      ))}
    </tr>
  );
}

export function Overview() {
  const { runId } = useRunContext();
  const [index, setIndex] = useState<RunIndexFile | null>(null);
  const [meta, setMeta] = useState<RunMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId) return;
    setError(null);
    getIndex(runId)
      .then(setIndex)
      .catch((e) => setError(String(e)));
    getRun(runId)
      .then(setMeta)
      .catch(() => setMeta(null));
  }, [runId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!index) return <p className="text-slate-500">Loading...</p>;
  const groups = Object.keys(index.by_group).sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b));
  const subs = Object.keys(index.by_subsection).sort();
  const t = index.totals;
  const layers: Layers = index.layers ?? { compliance: true, geo: true, seo: true };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card title="Pages">{t.pages}</Card>
        <Card title="Compliance (high / medium / low)">
          <Counts {...t.compliance} off={!layers.compliance} />
        </Card>
        <Card title={t.geo_sev ? "GEO (high / medium / low)" : "GEO to fix"}>
          <GeoCounts total={t.geo} sev={t.geo_sev} off={!layers.geo} />
        </Card>
        <Card title="SEO (high / medium / low)">
          <Counts {...t.seo} off={!layers.seo} />
        </Card>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Site report: Compliance <Counts {...index.site.compliance} />, SEO {index.site.seo}, GEO {index.site.geo}.{" "}
        <Link to="/site" className="text-blue-600 hover:underline dark:text-blue-400">
          Open the site report
        </Link>
        {meta && (
          <span className="ml-3 text-xs text-slate-500">
            {meta.llm_calls} LLM calls, {formatTokens(meta.tokens.input + meta.tokens.cached_input)} input and{" "}
            {formatTokens(meta.tokens.output)} output tokens, {formatDuration(meta.started_at, meta.ended_at)}
            {meta.model && `, model ${meta.model}`}
            {meta.cost_usd != null && meta.llm_calls > 0 && `, $${meta.cost_usd.toFixed(meta.cost_usd < 1 ? 3 : 2)}`}
          </span>
        )}
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800">
            <tr>
              <th className="px-3 py-2">Group</th>
              <th className="px-3 py-2">Pages</th>
              <th className="px-3 py-2">Compliance</th>
              <th className="px-3 py-2">GEO</th>
              <th className="px-3 py-2">SEO</th>
              {ACTION_COLUMNS.map((a) => (
                <th key={a.key} className="px-3 py-2">
                  {a.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Row key={g} name={g} t={index.by_group[g]!} link={`/pages?group=${encodeURIComponent(g)}`} layers={layers} />
            ))}
            <tr>
              <td colSpan={9} className="bg-slate-50 px-3 py-1 text-xs uppercase text-slate-500 dark:bg-slate-800">
                By subsection
              </td>
            </tr>
            {subs.map((s) => (
              <Row key={s} name={s} t={index.by_subsection[s]!} link={`/pages?sub=${encodeURIComponent(s)}`} layers={layers} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
