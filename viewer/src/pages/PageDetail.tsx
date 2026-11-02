import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRunContext } from "../context/RunContext.js";
import { getPage, getPageFindings } from "../data.js";
import type { Finding, Layer, PageReport } from "../types.js";
import { ActionBadge } from "../components/Badges.js";
import { FindingList, FindingsByZone } from "../components/FindingList.js";
import { LAYER_LABELS } from "../labels.js";

type Tab = Layer | "review";

export function PageDetail() {
  const { slug = "" } = useParams();
  const { runId } = useRunContext();
  const [page, setPage] = useState<PageReport | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [tab, setTab] = useState<Tab>("compliance");
  const [byZone, setByZone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId) return;
    setError(null);
    getPage(runId, slug)
      .then(setPage)
      .catch((e) => setError(String(e)));
    getPageFindings(runId, slug)
      .then(setFindings)
      .catch(() => setFindings([]));
  }, [runId, slug]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!page) return <p className="text-slate-500">Loading...</p>;

  const ok = findings.filter((f) => f.verified);
  const review = findings.filter((f) => !f.verified);
  const of = (layer: Layer) => ok.filter((f) => f.layer === layer);
  const tabs: { key: Tab; label: string; n: number }[] = [
    { key: "compliance", label: LAYER_LABELS.compliance, n: of("compliance").length },
    { key: "geo", label: LAYER_LABELS.geo, n: of("geo").length },
    { key: "seo", label: LAYER_LABELS.seo, n: of("seo").length },
    { key: "review", label: "To review", n: review.length },
  ];
  const action = page.compliance.error ? "not_checked" : (page.compliance.action ?? "keep");

  return (
    <div className="space-y-4">
      <Link to="/pages" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
        Back to pages
      </Link>
      <div>
        <h1 className="text-xl font-semibold">{page.title}</h1>
        <a href={page.final_url} target="_blank" rel="noreferrer" className="text-sm text-slate-500 hover:underline">
          {page.final_url}
        </a>
        <p className="mt-1 text-xs text-slate-500">
          {page.category} / {page.subsection}, template {page.template}
          {page.shared_variants.length > 0 && `, shared zones: ${page.shared_variants.join(", ")}`}
        </p>
      </div>
      <div className="flex flex-wrap items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <ActionBadge action={action} />
        <p className="flex-1 text-sm">
          {page.compliance.error ? `Not checked: ${page.compliance.error}` : page.compliance.summary}
        </p>
      </div>
      {page.zone_warnings.length > 0 && (
        <p className="rounded bg-amber-50 p-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          Zone warnings: {page.zone_warnings.join("; ")}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-700">
        {!byZone &&
          tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm ${
                tab === t.key ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"
              }`}
            >
              {t.label} <span className="text-xs text-slate-400">{t.n}</span>
            </button>
          ))}
        <label className="ml-auto flex items-center gap-1 pb-2 text-sm">
          <input type="checkbox" checked={byZone} onChange={(e) => setByZone(e.target.checked)} />
          Group by zone
        </label>
      </div>

      {byZone ? (
        <FindingsByZone
          findings={ok}
          zoneOrder={["title", "meta_description", "og_title", "og_description", "json_ld", "h1", ...page.zones.map((z) => z.id)]}
        />
      ) : tab === "geo" ? (
        <div className="space-y-4">
          {page.geo.llm.length > 0 && (
            <ul className="space-y-1 text-sm">
              {page.geo.llm.map((a) => (
                <li key={a.id}>
                  <span className={a.answer === "no" ? "font-semibold text-red-600" : "text-slate-500"}>
                    {a.answer.toUpperCase()}
                  </span>{" "}
                  <span className="font-medium">{a.id}</span>
                  {a.value ? ` (${a.value})` : ""}. <span className="text-slate-600 dark:text-slate-400">{a.note}</span>
                </li>
              ))}
            </ul>
          )}
          <FindingList
            findings={of("geo").filter((f) => !page.geo.llm.some((a) => a.id === f.kind))}
            empty="No GEO code findings."
          />
        </div>
      ) : tab === "review" ? (
        <FindingList findings={review} empty="Nothing to review." />
      ) : (
        <FindingList findings={of(tab)} empty="No problems." />
      )}
    </div>
  );
}
