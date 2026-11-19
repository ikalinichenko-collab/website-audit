import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getIndex, getSpending } from "../data.js";
import type { GroupTotals, Layers, RunIndexFile, Spending } from "../types.js";
import { ACTION_COLUMNS, GROUP_ORDER } from "../labels.js";
import { Counts, GeoCounts } from "../components/Badges.js";
import { formatTokens } from "../utils.js";
import { Loading } from "../components/Loading.js";

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

const plural = (n: number, one: string, many: string): string => `${n} ${n === 1 ? one : many}`;
const money = (v: number): string => (v < 0.01 ? (v === 0 ? "$0" : "under $0.01") : `$${v.toFixed(v < 1 ? 3 : 2)}`);

/** The money the model checks cost: totals, by month, by person and the latest ones. */
function SpendingBlock({ spending }: { spending: Spending }) {
  const when = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  return (
    <details className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
      <summary className="cursor-pointer font-medium">
        What the model checks cost <span className="font-normal text-slate-500">{money(spending.total.cost)} in {plural(spending.total.checks, "check", "checks")}</span>
      </summary>
      <div className="mt-3 space-y-4">
        <p className="text-xs text-slate-500">
          One row is one page check or one model check of a snapshot's shared blocks. A check that reused every answer cost nothing. The cost is worked out from the tokens at the price of the model used.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">By month</h3>
            <table className="w-full text-xs">
              <tbody>
                {spending.by_month.map((m) => (
                  <tr key={m.month} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-1">{m.month}</td>
                    <td className="py-1 tabular-nums">{money(m.cost)}</td>
                    <td className="py-1 text-slate-500">{plural(m.checks, "check", "checks")}, {plural(m.calls, "model call", "model calls")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">By person</h3>
            <table className="w-full text-xs">
              <tbody>
                {spending.by_person.map((p) => (
                  <tr key={p.person} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-1">{p.person}</td>
                    <td className="py-1 tabular-nums">{money(p.cost)}</td>
                    <td className="py-1 text-slate-500">{plural(p.checks, "check", "checks")}, {plural(p.calls, "model call", "model calls")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Latest checks</h3>
          <div className="max-h-72 overflow-auto">
            <table className="w-full text-xs">
              <tbody>
                {spending.recent.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="whitespace-nowrap py-1 pr-3 tabular-nums">{when(r.at)}</td>
                    <td className="py-1 pr-3">{r.by ?? "command line"}</td>
                    <td className="max-w-md truncate py-1 pr-3">{r.kind === "site_llm" ? "shared blocks of a snapshot" : r.url.replace(/^https:\/\/[^/]+/, "") || "/"}</td>
                    <td className="py-1 pr-3 tabular-nums">{money(r.cost)}</td>
                    <td className="py-1 text-slate-500">{r.calls ? `${r.calls} calls, ${formatTokens(r.tokens.input + r.tokens.cached_input)} in, ${formatTokens(r.tokens.output)} out` : "reused every answer"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </details>
  );
}

/** The checked pages as a whole: how many, what is open, how many changed since they were checked, what it cost. */
export function Overview() {
  const [index, setIndex] = useState<RunIndexFile | null>(null);
  const [spending, setSpending] = useState<Spending | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    getIndex(null)
      .then(setIndex)
      .catch((e) => setError(String(e)));
    getSpending()
      .then(setSpending)
      .catch(() => setSpending(null));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!index) return <Loading />;
  if (index.pages.length === 0) {
    return (
      <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-lg font-semibold">No pages checked yet</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Checked pages are the pages you looked at in depth: wording against the company documents, GEO answers and the technical checks of each page. The whole-site picture is on Site Checks.
        </p>
        <p className="text-sm">
          <Link to="/add" className="text-blue-600 hover:underline dark:text-blue-400">
            Add pages
          </Link>
          {" · "}
          <Link to="/site" className="text-blue-600 hover:underline dark:text-blue-400">
            Open Site Checks
          </Link>
        </p>
      </div>
    );
  }
  const groups = Object.keys(index.by_group).sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b));
  const subs = Object.keys(index.by_subsection).sort();
  const t = index.totals;
  const layers: Layers = index.layers ?? { compliance: true, geo: true, seo: true };
  const changed = index.pages.filter((p) => p.changed === true).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card title="Pages checked">{t.pages}</Card>
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
        {changed > 0 ? (
          <>
            <b className="text-amber-700 dark:text-amber-400">{changed}</b> {changed === 1 ? "page has" : "pages have"} a different text in the latest snapshot than when {changed === 1 ? "it was" : "they were"} checked.{" "}
          </>
        ) : (
          "No page is known to have changed since it was checked. "
        )}
        <Link to="/pages" className="text-blue-600 hover:underline dark:text-blue-400">
          Open the checked pages
        </Link>
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
      {spending && spending.total.checks > 0 && <SpendingBlock spending={spending} />}
    </div>
  );
}
