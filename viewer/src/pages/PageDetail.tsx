import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { useRunContext } from "../context/RunContext.js";
import { getIndex, getPage, getPageFindings } from "../data.js";
import type { Finding, Layer, PageCompare, PageIndexEntry, PageReport } from "../types.js";
import { ActionBadge, SeverityBadge } from "../components/Badges.js";
import { FindingActionsContext } from "../components/FindingActions.js";
import { GeoQuestions } from "../components/GeoQuestions.js";
import { countCards, FindingList, FindingsByZone, groupProblems } from "../components/FindingList.js";
import { ACTION_HELP, GEO_LABELS, GEO_STYLE_KINDS, LAYER_LABELS, variantLabel } from "../labels.js";
import { defaultSort } from "../utils.js";

type Tab = Layer | "review";

const REST_LABEL = { pass: "Passed", na: "Not applicable", none: "Not answered", unconfirmed: "Not confirmed" } as const;
const REST_CLASS = {
  pass: "text-emerald-600 dark:text-emerald-400",
  na: "text-slate-400",
  none: "text-amber-600",
  unconfirmed: "text-amber-600",
} as const;

const NOT_FOUND_HINT =
  "The model quoted text or a rule that could not be matched with this page or with a document heading. Check these by hand before acting on them.";

function Note({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">{children}</p>;
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        {hint && <Note>{hint}</Note>}
      </div>
      {children}
    </section>
  );
}

export function PageDetail() {
  const { slug = "" } = useParams();
  const { runId, runs } = useRunContext();
  const [page, setPage] = useState<PageReport | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [compare, setCompare] = useState<PageCompare | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [siblings, setSiblings] = useState<PageIndexEntry[]>([]);
  const [picked, setPicked] = useState<Tab | null>(null);
  const [byZone, setByZone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId) return;
    setError(null);
    setPicked(null);
    getPage(runId, slug)
      .then(setPage)
      .catch((e) => setError(String(e)));
    loadFindings();
  }, [runId, slug]);

  /** Also called after a decision is saved. */
  const loadFindings = useCallback(() => {
    if (!runId) return;
    getPageFindings(runId, slug)
      .then((r) => {
        setFindings(r.findings);
        setCompare(r.compare);
      })
      .catch(() => {
        setFindings([]);
        setCompare(null);
      });
  }, [runId, slug]);

  useEffect(() => {
    if (!runId) return;
    getIndex(runId)
      .then((i) => setSiblings([...i.pages].sort(defaultSort)))
      .catch(() => setSiblings([]));
  }, [runId]);

  // closed findings (accepted, false positive, fixed) are left out of the lists and counts unless asked for
  const okAll = useMemo(() => findings.filter((f) => f.verified), [findings]);
  const closedCount = useMemo(() => countCards(findings.filter((f) => f.status)), [findings]);
  const visible = useMemo(() => (showClosed ? findings : findings.filter((f) => !f.status)), [findings, showClosed]);
  const ok = useMemo(() => visible.filter((f) => f.verified), [visible]);
  const review = useMemo(() => visible.filter((f) => !f.verified), [visible]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!page) return <p className="text-slate-500">Loading...</p>;

  const of = (layer: Layer) => ok.filter((f) => f.layer === layer);
  const off: Record<Layer, boolean> = {
    compliance: !!page.compliance.skipped,
    geo: !!page.geo.skipped,
    seo: !!page.seo.skipped,
  };
  const problems = (layer: Layer) => groupProblems(of(layer));
  const cards = (list: Finding[]) => countCards(list);
  const count = (layer: Layer) => (off[layer] ? null : cards(of(layer)));

  // open on the first layer that has something to read
  const layers: Layer[] = ["compliance", "geo", "seo"];
  const firstWithFindings = layers.find((l) => !off[l] && of(l).length > 0) ?? "compliance";
  const tab: Tab = picked ?? firstWithFindings;

  const action = page.compliance.error ? "not_checked" : (page.compliance.action ?? "keep");
  const run = runs.find((r) => r.id === runId);
  const pos = siblings.findIndex((s) => s.slug === slug);
  const prev = pos > 0 ? siblings[pos - 1] : undefined;
  const next = pos >= 0 ? siblings[pos + 1] : undefined;

  // what to read first: high severity problems of Compliance and SEO, else the first medium ones
  const ranked = [...problems("compliance"), ...problems("seo")];
  const topHigh = ranked.filter((g) => g[0]!.severity === "high");
  const top = (topHigh.length ? topHigh : ranked.filter((g) => g[0]!.severity === "medium")).slice(0, 3);

  const tabs: { key: Tab; label: string; n: number | null }[] = [
    { key: "compliance", label: LAYER_LABELS.compliance, n: count("compliance") },
    { key: "geo", label: LAYER_LABELS.geo, n: count("geo") },
    { key: "seo", label: LAYER_LABELS.seo, n: count("seo") },
    { key: "review", label: "Not found on page", n: review.length },
  ];

  const layerTiles: { layer: Layer; hint: string }[] = [
    { layer: "compliance", hint: "against the company documents" },
    { layer: "geo", hint: "readiness for AI answers" },
    { layer: "seo", hint: "technical SEO" },
  ];

  const compliance = of("compliance");
  const contradicts = compliance.filter((f) => f.basis !== "not in sources");
  const unconfirmed = compliance.filter((f) => f.basis === "not in sources");

  const geoAnswers = page.geo.llm;
  const questionIds = new Set(geoAnswers.map((a) => a.id));
  // findings of the questions from Settings go to their cards; the rest are code checks
  // question cards always show, closed or not: a card with no "no" would read as a pass
  const geoQuestionFindings = okAll.filter((f) => f.layer === "geo" && questionIds.has(f.kind));
  const geoCodeFailing = of("geo").filter((f) => !questionIds.has(f.kind) && !GEO_STYLE_KINDS.includes(f.kind));
  const geoStyle = of("geo").filter((f) => !questionIds.has(f.kind) && GEO_STYLE_KINDS.includes(f.kind));
  const geoRest: { id: string; title: string; state: "pass" | "na" | "none" | "unconfirmed"; text: string }[] = [
    ...(page.geo.code ?? [])
      .filter((c) => c.status !== "fail")
      .map((c) => ({ id: c.id, title: GEO_LABELS[c.id] ?? c.id, state: c.status === "pass" ? ("pass" as const) : ("na" as const), text: c.status === "na" ? "" : c.value })),
  ];

  const layerBody = (layer: Layer, body: ReactNode) => {
    if (off[layer]) {
      return <Note>This layer was turned off for this run, so it was not checked. Run the page again with it on.</Note>;
    }
    return body;
  };

  return (
    <FindingActionsContext.Provider value={{ runId, slug, reload: loadFindings }}>
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link to="/pages" className="text-blue-600 hover:underline dark:text-blue-400">
          Back to pages
        </Link>
        {pos >= 0 && (
          <span className="ml-auto flex items-center gap-3 text-slate-500">
            {prev ? (
              <Link to={`/pages/${prev.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                Previous
              </Link>
            ) : (
              <span className="text-slate-300 dark:text-slate-600">Previous</span>
            )}
            <span className="tabular-nums">
              {pos + 1} of {siblings.length}, worst first
            </span>
            {next ? (
              <Link to={`/pages/${next.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                Next
              </Link>
            ) : (
              <span className="text-slate-300 dark:text-slate-600">Next</span>
            )}
          </span>
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold">{page.title}</h1>
        <a href={page.final_url} target="_blank" rel="noreferrer" className="text-sm text-slate-500 hover:underline">
          {page.final_url}
        </a>
        <p className="mt-1 text-xs text-slate-500">
          {page.category} / {page.subsection}, {page.template} template. Checked {new Date(page.checked_at).toLocaleString()}
          {run?.model ? ` with ${run.model}` : ""}
          {page.compliance.cached || page.geo.cached ? ". Part of the LLM result was reused from an earlier run" : ""}.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-start gap-3">
          <ActionBadge action={action} />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-medium">{ACTION_HELP[action]}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {page.compliance.error ? `Not checked: ${page.compliance.error}` : page.compliance.summary}
            </p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {layerTiles.map(({ layer, hint }) => {
            const n = count(layer);
            return (
              <button
                key={layer}
                type="button"
                onClick={() => {
                  setByZone(false);
                  setPicked(layer);
                }}
                className="rounded border border-slate-200 p-2 text-left hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold">{LAYER_LABELS[layer]}</span>
                  <span className="text-sm tabular-nums">
                    {n === null ? (
                      <span className="text-slate-400">off</span>
                    ) : n === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">no problems</span>
                    ) : (
                      <span className="font-medium">{n} to fix</span>
                    )}
                  </span>
                </div>
                <div className="text-xs text-slate-500">{hint}</div>
              </button>
            );
          })}
        </div>
        {top.length > 0 && (
          <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Start with</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
              {top.map((g, i) => (
                <li key={i}>
                  {g[0]!.title}
                  <span className="text-slate-500">
                    {" "}
                    ({LAYER_LABELS[g[0]!.layer]}, {g[0]!.severity})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {page.shared_variants.length > 0 && (
        <p className="text-xs text-slate-500">
          Shared parts of this page ({page.shared_variants.map(variantLabel).join(", ")}) are the same on many pages. They are
          checked once, on the{" "}
          <Link to="/site" className="text-blue-600 hover:underline dark:text-blue-400">
            Site
          </Link>{" "}
          page.
        </p>
      )}
      {page.zone_warnings.length > 0 && (
        <p className="rounded bg-amber-50 p-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          Could not split the page cleanly: {page.zone_warnings.join("; ")}
        </p>
      )}

      <ComparisonNote compare={compare} />
      {closedCount > 0 && (
        <p className="text-xs text-slate-500">
          {closedCount} closed {closedCount === 1 ? "problem is" : "problems are"} {showClosed ? "shown" : "hidden"} (accepted, false positive or fixed).{" "}
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setShowClosed(!showClosed)}>
            {showClosed ? "Hide closed" : "Show closed"}
          </button>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-700">
        {!byZone &&
          tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setPicked(t.key)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm ${
                tab === t.key ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"
              }`}
            >
              {t.label} <span className="text-xs text-slate-400">{t.n === null ? "off" : t.n}</span>
            </button>
          ))}
        <div className="ml-auto flex items-center gap-2 pb-2 text-sm">
          <span className="text-slate-500">Show</span>
          <div className="inline-flex overflow-hidden rounded border border-slate-300 dark:border-slate-600">
            {[
              { v: false, label: "By layer" },
              { v: true, label: "By place on page" },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setByZone(o.v)}
                className={`px-2.5 py-1 text-xs ${
                  byZone === o.v ? "bg-blue-600 font-semibold text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {byZone ? (
        <FindingsByZone
          findings={ok}
          zoneOrder={["title", "meta_description", "og_title", "og_description", "json_ld", "h1", ...page.zones.map((z) => z.id)]}
        />
      ) : tab === "compliance" ? (
        layerBody(
          "compliance",
          <div className="space-y-6">
            {page.compliance.error && <Note>Not fully checked: {page.compliance.error}</Note>}
            {compliance.length === 0 && !page.compliance.error && <Note>No problems.</Note>}
            {contradicts.length > 0 && (
              <Section
                title="Contradicts the company documents"
                hint="The page says something the documents rule out, or uses a retired term. Change it, or decide to keep it."
              >
                <FindingList findings={contradicts} empty="" />
              </Section>
            )}
            {unconfirmed.length > 0 && (
              <Section
                title="Not found in the documents"
                hint="The documents say nothing about these claims. They are not necessarily wrong: confirm each with its owner (client, metrics), then keep it or remove it."
              >
                <FindingList findings={unconfirmed} empty="" />
              </Section>
            )}
          </div>,
        )
      ) : tab === "geo" ? (
        layerBody(
          "geo",
          <div className="space-y-6">
            {page.geo.error && <Note>Not fully checked: {page.geo.error}</Note>}
            {geoAnswers.length === 0 && geoCodeFailing.length === 0 && geoStyle.length === 0 && <Note>No GEO problems.</Note>}
            <GeoQuestions answers={geoAnswers} findings={geoQuestionFindings} />
            {(geoCodeFailing.length > 0 || geoRest.length > 0 || geoStyle.length > 0) && (
              <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Code checks</h3>
                  <Note>Fixed checks made by code, not by the model and not from your questions: the approved wording, trap terms, FAQ, style.</Note>
                </div>
                {geoCodeFailing.length > 0 && <FindingList findings={geoCodeFailing} empty="" />}
                {geoStyle.length > 0 && (
                  <details open={geoCodeFailing.length === 0}>
                    <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Style ({cards(geoStyle)}), low priority
                    </summary>
                    <div className="mt-2">
                      <FindingList findings={geoStyle} empty="" />
                    </div>
                  </details>
                )}
              </div>
            )}
            {geoRest.length > 0 && (
              <details>
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Code checks without problems ({geoRest.length})
                </summary>
                <ul className="mt-2 space-y-1 text-sm">
                  {geoRest.map((r) => (
                    <li key={r.id}>
                      <span className={REST_CLASS[r.state]}>{REST_LABEL[r.state]}</span>{" "}
                      <span className="font-medium">{r.title}.</span>{" "}
                      <span className="text-slate-600 dark:text-slate-400">{r.text}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>,
        )
      ) : tab === "seo" ? (
        layerBody("seo", <FindingList findings={of("seo")} empty="No SEO problems." />)
      ) : (
        <div className="space-y-2">
          <Note>{NOT_FOUND_HINT}</Note>
          <FindingList findings={review} empty="Nothing here: every quote and rule was found." />
        </div>
      )}
    </div>
    </FindingActionsContext.Provider>
  );
}

/** What changed against the previous run of this page: new problems are chipped on their cards, the gone ones are listed here. */
function ComparisonNote({ compare }: { compare: PageCompare | null }) {
  if (!compare) return <p className="text-xs text-slate-500">No earlier run of this page to compare with.</p>;
  const gone = groupProblems(compare.resolved);
  const skipped = (["compliance", "geo", "seo"] as Layer[]).filter((l) => !compare.layers.includes(l));
  return (
    <div className="space-y-1 text-xs text-slate-500">
      <p>
        Compared with the run of {new Date(compare.previous_at).toLocaleString()}:{" "}
        <b>{gone.length}</b> {gone.length === 1 ? "problem" : "problems"} gone, new ones are marked <span className="font-semibold text-violet-700 dark:text-violet-300">New</span>.
        {skipped.length > 0 && ` Not compared (off or failed in one of the runs): ${skipped.map((l) => LAYER_LABELS[l]).join(", ")}.`}
        {" "}Compliance wording can differ between runs of the model, so a problem may show as gone and new at once.
      </p>
      {gone.length > 0 && (
        <details>
          <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-300">Gone since the previous run ({gone.length})</summary>
          <ul className="mt-1 space-y-1">
            {gone.map((g, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">{g[0]!.layer}</span>
                <SeverityBadge severity={g[0]!.severity} />
                <span>{g[0]!.title}</span>
                {g.length > 1 && <span className="text-xs text-slate-500">{g.length} places</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
