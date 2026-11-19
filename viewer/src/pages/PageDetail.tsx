import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { api, type JobDetail } from "../api.js";
import { JobBar } from "../components/JobBar.js";
import { primaryClass } from "../components/ResourceEditor.js";
import { Chip, LayerTile, SevChip, SidePanel } from "../components/ReportParts.js";
import { useActiveRunId, useRunContext } from "../context/RunContext.js";
import { getIndex, getPage, getPageFindings, getPageShared, getSiteCheck } from "../data.js";
import type { BriefCheckRecord, Finding, Layer, PageCompare, PageIndexEntry, PageReport, PageShared, SinceSnapshot, SiteCheck } from "../types.js";
import { ActionBadge, SeverityBadge } from "../components/Badges.js";
import { FindingActionsContext } from "../components/FindingActions.js";
import { BriefTab } from "../components/BriefTab.js";
import { GeoQuestions } from "../components/GeoQuestions.js";
import { countCards, FindingList, FindingsByZone, groupProblems } from "../components/FindingList.js";
import { ACTION_HELP, GEO_LABELS, GEO_STYLE_KINDS, LAYER_LABELS, variantLabel } from "../labels.js";
import { defaultSort } from "../utils.js";
import { Loading } from "../components/Loading.js";

type Tab = Layer | "review" | "brief";

/** The coloured edge of the verdict card, by what the page needs. */
const VERDICT_EDGE: Record<string, string> = {
  rewrite: "border-l-red-500",
  needs_decision: "border-l-purple-500",
  fix: "border-l-amber-500",
  keep: "border-l-emerald-500",
  not_checked: "border-l-slate-400",
};

const shortDate = (iso: string) => new Date(iso).toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });

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
  const { runs, reloadChecks } = useRunContext();
  // null: a checked page (its own current check); a run id: a page of that snapshot
  const runId = useActiveRunId();
  // bumped after a recheck, so everything on the page is read again
  const [version, setVersion] = useState(0);
  const [job, setJob] = useState<{ id: string; label: string } | null>(null);
  const [recheckMsg, setRecheckMsg] = useState<string | null>(null);
  // a page of a snapshot is opened from Site Checks with ?run=<snapshot>: its links keep that and go back there
  const [qs] = useSearchParams();
  const runParam = qs.get("run");
  const suffix = runParam ? `?run=${encodeURIComponent(runParam)}` : "";
  const [page, setPage] = useState<PageReport | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [compare, setCompare] = useState<PageCompare | null>(null);
  const [since, setSince] = useState<SinceSnapshot | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [siblings, setSiblings] = useState<PageIndexEntry[]>([]);
  const [picked, setPicked] = useState<Tab | null>(null);
  // the chip under the title that is open: what changed since the snapshot, or since the earlier check
  const [detail, setDetail] = useState<"since" | "compare" | null>(null);
  const [verdictOpen, setVerdictOpen] = useState(false);
  const [byZone, setByZone] = useState(false);
  // the page's brief: rows loaded (null: none) and the stored check against it, for the summary tile and the tab
  const [briefRows, setBriefRows] = useState<number | null>(null);
  const [briefCheck, setBriefCheck] = useState<BriefCheckRecord | null>(null);

  useEffect(() => {
    api
      .brief(slug)
      .then((i) => setBriefRows(i.versions[0]?.row_count ?? null))
      .catch(() => setBriefRows(null));
    api
      .briefCheck(slug, runId)
      .then(setBriefCheck)
      .catch(() => setBriefCheck(null));
  }, [slug, runId, version]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setPicked(null);
    setDetail(null);
    getPage(runId, slug)
      .then(setPage)
      .catch((e) => setError(String(e)));
    loadFindings();
  }, [runId, slug, version]);

  /** Also called after a decision is saved. */
  const loadFindings = useCallback(() => {
    getPageFindings(runId, slug)
      .then((r) => {
        setFindings(r.findings);
        setCompare(r.compare);
        setSince(r.since_snapshot);
      })
      .catch(() => {
        setFindings([]);
        setCompare(null);
        setSince(null);
      });
  }, [runId, slug]);

  useEffect(() => {
    getIndex(runId)
      .then((i) => setSiblings([...i.pages].sort(defaultSort)))
      .catch(() => setSiblings([]));
  }, [runId, version]);

  // closed findings (accepted, false positive, fixed) are left out of the lists and counts unless asked for
  const okAll = useMemo(() => findings.filter((f) => f.verified), [findings]);
  const closedCount = useMemo(() => countCards(findings.filter((f) => f.status)), [findings]);
  const visible = useMemo(() => (showClosed ? findings : findings.filter((f) => !f.status)), [findings, showClosed]);
  const ok = useMemo(() => visible.filter((f) => f.verified), [visible]);
  const review = useMemo(() => visible.filter((f) => !f.verified), [visible]);

  useEffect(() => {
    if (page) document.title = `${page.title} · Site Audit`;
  }, [page]);

  // a link from Tasks (?focus=<finding>) opens the layer of that finding and scrolls to its card, once
  const focus = qs.get("focus");
  const focusedKey = useRef<string | null>(null);
  useEffect(() => {
    if (!focus || !page || !findings.length || focusedKey.current === `${slug}|${focus}`) return;
    const t = setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-fids~="${CSS.escape(focus)}"]`);
      if (!el) return;
      focusedKey.current = `${slug}|${focus}`;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.classList.add("ring-2", "ring-blue-500");
      setTimeout(() => el.classList.remove("ring-2", "ring-blue-500"), 2500);
    }, 200);
    return () => clearTimeout(t);
  }, [focus, page, findings, slug, picked]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!page) return <Loading />;

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
  // the list of checked pages links to ?tab=brief
  const focusLayer = focus ? findings.find((f) => f.fid === focus)?.layer : undefined;
  const tab: Tab = picked ?? (qs.get("tab") === "brief" ? "brief" : (focusLayer ?? firstWithFindings));

  const action = page.compliance.error ? "not_checked" : (page.compliance.action ?? "keep");
  const run = runs.find((r) => r.id === runId);
  const pos = siblings.findIndex((s) => s.slug === slug);
  // a checked page: who checked it, with what (from its row in the list)
  const entry = siblings[pos];
  const isCheck = runId === null;
  const prev = pos > 0 ? siblings[pos - 1] : undefined;
  const next = pos >= 0 ? siblings[pos + 1] : undefined;

  // what to read first: high severity problems of Compliance and SEO, else the first medium ones
  const ranked = [...problems("compliance"), ...problems("seo")];
  const topHigh = ranked.filter((g) => g[0]!.severity === "high");
  const top = (topHigh.length ? topHigh : ranked.filter((g) => g[0]!.severity === "medium")).slice(0, 3);

  // the brief is its own check (own file, own button, own cost): a fourth tile and a tab apart from the layers
  const briefToFix = briefCheck ? briefCheck.result.rows.filter((r) => r.status === "partial" || r.status === "missing").length : null;
  const briefLabel = briefRows === null ? "none" : briefToFix === null ? "not checked" : briefToFix === 0 ? "all done" : `${briefToFix} to fix`;

  /** "1 high", "2 medium" under a layer's number, from its problems as the list shows them. */
  const sevChips = (layer: Layer) => {
    const c = { high: 0, medium: 0, low: 0 };
    for (const g of problems(layer)) c[g[0]!.severity === "high" || g[0]!.severity === "medium" ? g[0]!.severity : "low"]++;
    return (["high", "medium", "low"] as const).filter((k) => c[k] > 0).map((k) => <SevChip key={k} kind={k} n={c[k]} />);
  };
  const pickLayer = (t: Tab) => {
    setByZone(false);
    setPicked(t);
  };
  const noun = isCheck ? "check" : "run";
  const goneCount = compare ? groupProblems(compare.resolved).length : 0;
  const summaryText = page.compliance.error ? `Not checked: ${page.compliance.error}` : (page.compliance.summary ?? "");

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
      <div
        className="sticky z-10 -mx-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
        style={{ top: runParam ? "3.4rem" : "5.4rem" }}
      >
        <Link to={runParam ? "/site?tab=pages" : "/pages"} className="shrink-0 text-sm text-blue-600 hover:underline dark:text-blue-400">
          &lsaquo; {runParam ? "Back to the snapshot pages" : "Back to checked pages"}
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold" title={page.title}>
          {page.title}
        </h1>
        {pos >= 0 && (
          <span className="flex shrink-0 items-center gap-3 text-sm text-slate-500">
            {prev ? (
              <Link to={`/pages/${prev.slug}${suffix}`} className="text-blue-600 hover:underline dark:text-blue-400">
                &lsaquo; Previous
              </Link>
            ) : (
              <span className="text-slate-300 dark:text-slate-600">&lsaquo; Previous</span>
            )}
            <span className="tabular-nums">
              {pos + 1} of {siblings.length}, worst first
            </span>
            {next ? (
              <Link to={`/pages/${next.slug}${suffix}`} className="text-blue-600 hover:underline dark:text-blue-400">
                Next &rsaquo;
              </Link>
            ) : (
              <span className="text-slate-300 dark:text-slate-600">Next &rsaquo;</span>
            )}
          </span>
        )}
        {isCheck && (
          <button
            type="button"
            className={primaryClass}
            disabled={!!job}
            title="Checks this page again as it was checked (same layers and model). The model is asked again only if the text changed."
            onClick={async () => {
              setRecheckMsg(null);
              try {
                const r = await api.startJob({ text: page.url, ...(entry?.layers ? { layers: entry.layers } : {}), ...(entry?.model ? { model: entry.model } : {}) });
                setJob({ id: r.id, label: "Rechecking this page" });
              } catch (e) {
                setRecheckMsg(String(e instanceof Error ? e.message : e));
              }
            }}
          >
            Recheck
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
          <a href={page.final_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:underline">
            {page.final_url}
          </a>
          <span className="text-xs text-slate-500">
            {page.category} / {page.subsection}, {page.template} template
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip title="When the page was checked, by whom and with which model">
            Checked {new Date(page.checked_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            {isCheck && entry?.checked_by ? ` by ${entry.checked_by}` : ""}
            {(entry?.model ?? run?.model) ? `, ${entry?.model ?? run?.model}` : ""}
          </Chip>
          {since && (
            <Chip
              tone={since.added.length > 0 ? "warn" : "good"}
              active={detail === "since"}
              onClick={() => setDetail(detail === "since" ? null : "since")}
              title="Technical checks (SEO and GEO rules) of this page against the site snapshot it was read against"
            >
              {since.resolved.length === 0 && since.added.length === 0
                ? `Same as the site snapshot of ${shortDate(since.snapshot_at)}`
                : `${since.resolved.length} fixed, ${since.added.length} new since the snapshot of ${shortDate(since.snapshot_at)}`}
            </Chip>
          )}
          {compare ? (
            <Chip active={detail === "compare"} onClick={() => setDetail(detail === "compare" ? null : "compare")} title={`Compared with the ${noun} of ${new Date(compare.previous_at).toLocaleString()}`}>
              {goneCount} {goneCount === 1 ? "problem" : "problems"} gone since the earlier {noun}
            </Chip>
          ) : (
            <Chip title={isCheck ? "It appears after the page changes and is checked again." : "There is no earlier run of this page."}>No earlier {noun} to compare with</Chip>
          )}
          {(page.compliance.cached || page.geo.cached) && <Chip title="The model was asked again only about what changed">Part of the model result reused from an earlier {noun}</Chip>}
        </div>
        {detail === "since" && <SinceSnapshotNote since={since} />}
        {detail === "compare" && <ComparisonNote compare={compare} isCheck={isCheck} />}
      </div>

      {job && (
        <JobBar
          jobId={job.id}
          label={job.label}
          onDone={(j: JobDetail) => {
            setJob(null);
            setRecheckMsg(j.status === "done" ? null : j.status === "stopped" ? "Stopped." : `The recheck failed: ${j.error ?? "see the log"}`);
            setVersion((v) => v + 1);
            void reloadChecks();
          }}
        />
      )}
      {recheckMsg && <p className="rounded bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">{recheckMsg}</p>}
      <CarriedNote page={page} />
      {page.zone_warnings.length > 0 && (
        <p className="rounded bg-amber-50 p-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">Could not split the page cleanly: {page.zone_warnings.join("; ")}</p>
      )}

      <div className={`flex items-start gap-3 rounded-lg border border-l-4 border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 ${VERDICT_EDGE[action] ?? VERDICT_EDGE.not_checked}`}>
        <ActionBadge action={action} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{ACTION_HELP[action]}</p>
          <p className={`max-w-4xl text-sm text-slate-600 dark:text-slate-400 ${verdictOpen ? "" : "line-clamp-2"}`}>{summaryText}</p>
          {summaryText.length > 200 && (
            <button type="button" className="text-sm text-blue-600 hover:underline dark:text-blue-400" onClick={() => setVerdictOpen(!verdictOpen)}>
              {verdictOpen ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.25rem_minmax(0,1fr)]">
        <LayerTile
          kind="compliance"
          name="Compliance"
          tag="model"
          hint="Wording against the company documents"
          count={count("compliance")}
          sev={sevChips("compliance")}
          selected={!byZone && tab === "compliance"}
          onClick={() => pickLayer("compliance")}
        />
        <LayerTile kind="geo" name="GEO" tag="model + code" hint="Readiness for AI answers" count={count("geo")} sev={sevChips("geo")} selected={!byZone && tab === "geo"} onClick={() => pickLayer("geo")} />
        <LayerTile kind="seo" name="SEO" tag="code" hint="Technical SEO" count={count("seo")} sev={sevChips("seo")} selected={!byZone && tab === "seo"} onClick={() => pickLayer("seo")} />
        <div aria-hidden className="hidden border-l-2 border-dashed border-slate-300 lg:mx-auto lg:block dark:border-slate-600" />
        <LayerTile
          kind="brief"
          name="Brief"
          tag="separate check"
          hint={briefRows === null ? "Upload the content brief" : "Against the content brief"}
          extra={briefCheck?.stale ? <span className="font-semibold text-amber-600 dark:text-amber-400"> · outdated</span> : undefined}
          count={briefRows === null ? "none" : briefToFix === null ? "not checked" : briefToFix}
          sev={
            briefCheck ? (
              <>
                <SevChip kind="partly" n={briefCheck.result.rows.filter((r) => r.status === "partial").length} label="partly" />
                {briefCheck.result.rows.some((r) => r.status === "missing") && <SevChip kind="high" n={briefCheck.result.rows.filter((r) => r.status === "missing").length} label="missing" />}
              </>
            ) : undefined
          }
          selected={!byZone && tab === "brief"}
          onClick={() => pickLayer("brief")}
          title="A separate check: its own file, button and cost. It is not part of the page's verdict."
        />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <main className="min-w-0 space-y-4">
      {(byZone || (tab !== "brief" && tab !== "review")) && (
        <div className="flex items-center justify-end gap-2 text-sm">
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
                className={`px-2.5 py-1 text-xs ${byZone === o.v ? "bg-blue-600 font-semibold text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
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
      ) : tab === "brief" ? (
        <BriefTab slug={slug} url={page.final_url || page.url} runId={runId} check={briefCheck} onCheck={setBriefCheck} onRows={setBriefRows} onOpenTab={setPicked} />
      ) : (
        <div className="space-y-2">
          <Note>{NOT_FOUND_HINT}</Note>
          <FindingList findings={review} empty="Nothing here: every quote and rule was found." />
        </div>
      )}
      </main>

      <aside className="space-y-3 xl:sticky xl:max-h-[calc(100vh-10rem)] xl:overflow-y-auto" style={{ top: runParam ? "7.5rem" : "9.5rem" }}>
        {top.length > 0 && (
          <SidePanel title="Start with">
            <ul className="list-disc space-y-1 pl-4">
              {top.map((g, i) => (
                <li key={i}>
                  <b>{g[0]!.title}</b>
                  <span className="text-slate-500">
                    {" "}
                    ({LAYER_LABELS[g[0]!.layer]}, {g[0]!.severity})
                  </span>
                </li>
              ))}
            </ul>
          </SidePanel>
        )}
        <SiteCheckBlock key={`site-${version}`} runId={runId} slug={slug} />
        <SharedBlocksBlock key={`shared-${version}`} runId={runId} slug={slug} />
        {(review.length > 0 || tab === "review") && (
          <SidePanel title="Not found on page">
            <p className="text-slate-600 dark:text-slate-400">The model quoted text or a rule that could not be matched with this page.</p>
            <button type="button" className="mt-1 text-blue-600 hover:underline dark:text-blue-400" onClick={() => pickLayer("review")}>
              Check these by hand ({review.length})
            </button>
          </SidePanel>
        )}
        {closedCount > 0 && (
          <SidePanel title="Closed findings">
            <p className="text-slate-600 dark:text-slate-400">
              {closedCount} closed {closedCount === 1 ? "problem is" : "problems are"} {showClosed ? "shown" : "hidden"} (accepted, false positive or fixed).
            </p>
            <button type="button" className="mt-1 text-blue-600 hover:underline dark:text-blue-400" onClick={() => setShowClosed(!showClosed)}>
              {showClosed ? "Hide closed" : "Show closed"}
            </button>
          </SidePanel>
        )}
      </aside>
      </div>
    </div>
    </FindingActionsContext.Provider>
  );
}

/** What changed against the previous run of this page: new problems are chipped on their cards, the gone ones are listed here. */
const shortUrl = (u: string) => u.replace(/^https:\/\/[^/]+/, "") || "/";
const FIELD_LABEL = { title: "Title", meta: "Meta description", h1: "H1" } as const;

/** The page against the whole site: duplicates and who links to it. Read from the site map, so it shows what is known now. */
const SEV_TEXT: Record<string, string> = { high: "text-red-600 dark:text-red-400", medium: "text-amber-600 dark:text-amber-400", low: "text-slate-500" };

/** What changed in this page's technical checks since the site snapshot it was read against: did the fix help? */
function SinceSnapshotNote({ since }: { since: SinceSnapshot | null }) {
  if (!since) return null;
  const when = new Date(since.snapshot_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const none = since.resolved.length === 0 && since.added.length === 0;
  const row = (f: Finding, mark: string, cls: string) => (
    <li key={`${f.fid}`} className="flex flex-wrap gap-x-2">
      <span className={cls}>{mark}</span>
      <span className="font-medium">{f.title}</span>
      {f.zone_label && <span className="text-slate-500">{f.zone_label}</span>}
      <span className={SEV_TEXT[f.severity] ?? "text-slate-500"}>{f.severity}</span>
    </li>
  );
  return (
    <div className="space-y-1 rounded border border-slate-200 p-3 text-sm dark:border-slate-700">
      <p>
        <b>Since the site snapshot of {when}</b> <span className="text-slate-500">(technical checks: SEO and GEO rules)</span>:{" "}
        {none ? (
          <span>nothing changed. {since.unchanged} {since.unchanged === 1 ? "problem is" : "problems are"} the same as in the snapshot.</span>
        ) : (
          <>
            <span className="text-emerald-700 dark:text-emerald-400">{since.resolved.length} fixed</span>,{" "}
            <span className={since.added.length ? "text-red-600 dark:text-red-400" : ""}>{since.added.length} new</span>, {since.unchanged} unchanged.
          </>
        )}
      </p>
      {!none && (
        <ul className="space-y-0.5 text-xs">
          {since.resolved.map((f) => row(f, "fixed", "text-emerald-700 dark:text-emerald-400"))}
          {since.added.map((f) => row(f, "new", "text-red-600 dark:text-red-400"))}
        </ul>
      )}
    </div>
  );
}

/** The banner and forms this page carries are shared with other pages and were checked once, by the model, on the snapshot. */
function SharedBlocksBlock({ runId, slug }: { runId: string | null; slug: string }) {
  const [shared, setShared] = useState<PageShared | null>(null);
  useEffect(() => {
    setShared(null);
    getPageShared(runId, slug)
      .then(setShared)
      .catch(() => setShared(null));
  }, [runId, slug]);
  if (!shared) return null;
  const link = "text-blue-600 hover:underline dark:text-blue-400";
  const total = shared.variants.reduce((n, v) => n + v.problems.length, 0) + shared.schema.problems.length;
  const when = new Date(shared.snapshot_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const list = (problems: { title: string; severity: string; basis: string }[]) => (
    <ul className="ml-4 list-disc text-xs">
      {problems.map((p) => (
        <li key={p.title + p.severity}>
          <span className={SEV_TEXT[p.severity] ?? ""}>{p.severity}</span> {p.title}
        </li>
      ))}
    </ul>
  );
  return (
    <details className="rounded border border-slate-200 p-3 text-sm dark:border-slate-700" open={shared.checked && total > 0}>
      <summary className="cursor-pointer font-medium">
        Shared blocks on this page{" "}
        <span className="font-normal text-slate-500">
          {shared.checked ? (total ? `${total} problem${total === 1 ? "" : "s"} found by the model` : "no problems found by the model") : "not checked by the model yet"}
        </span>
      </summary>
      <div className="mt-2 space-y-2">
        <p className="text-xs text-slate-500">
          The banner and forms below are the same on other pages, so they are checked once on the snapshot of {when}, not with this page. The site-wide markup is on every page. Details and decisions are on{" "}
          <Link to="/site" className={link}>
            Site Checks
          </Link>
          .
        </p>
        {!shared.checked && <p>The model has not run on the shared blocks of this snapshot. Use “Check shared blocks with the model” on Site Checks (an unchanged text is answered from the earlier check without a new call).</p>}
        {shared.variants.length === 0 && <p className="text-slate-500">This page carries no shared banner or form text that other pages repeat.</p>}
        {shared.variants.map((v) => (
          <div key={v.id}>
            <b>{v.label}</b> <span className="text-slate-500">on {v.pages} pages</span>
            {shared.checked && (v.problems.length ? list(v.problems) : <p className="ml-4 text-xs text-slate-500">no problems found</p>)}
          </div>
        ))}
        {shared.checked && (
          <div>
            <b>Site-wide structured data</b> <span className="text-slate-500">on every page</span>
            {shared.schema.problems.length ? list(shared.schema.problems) : <p className="ml-4 text-xs text-slate-500">no problems found</p>}
          </div>
        )}
      </div>
    </details>
  );
}

function SiteCheckBlock({ runId, slug }: { runId: string | null; slug: string }) {
  const [check, setCheck] = useState<SiteCheck | null>(null);
  useEffect(() => {
    setCheck(null);
    getSiteCheck(runId, slug)
      .then(setCheck)
      .catch(() => setCheck(null));
  }, [runId, slug]);
  // without a site map the page is checked on its own, as before
  if (!check || !check.available) return null;

  const when = check.as_of ? new Date(check.as_of).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
  const orphan = check.orphan_checked && check.inbound.length === 0;
  const link = "text-blue-600 hover:underline dark:text-blue-400";
  return (
    <details className="rounded border border-slate-200 p-3 text-sm dark:border-slate-700" open={orphan || check.duplicates.length > 0}>
      <summary className="cursor-pointer font-medium">
        Against the site{" "}
        <span className="font-normal text-slate-500">
          {check.duplicates.length ? `${check.duplicates.length} duplicate${check.duplicates.length > 1 ? "s" : ""}, ` : "no duplicates, "}
          {orphan ? "orphan" : `${check.inbound.length} page${check.inbound.length === 1 ? "" : "s"} link here`}
        </span>
      </summary>
      <div className="mt-2 space-y-2">
        <p className="text-xs text-slate-500">
          This page's title, description and H1 are the ones this check read. The other {check.map_pages - 1} pages are as the site snapshot of {when} saw them: make a new snapshot on{" "}
          <Link to="/site" className={link}>
            Site Checks
          </Link>{" "}
          to refresh them.
        </p>
        {check.duplicates.length === 0 && <p>No other known page has the same title, meta description or H1.</p>}
        {check.duplicates.map((d) => (
          <div key={d.field}>
            <b>{FIELD_LABEL[d.field]}</b> is also on {d.urls.length} other page{d.urls.length > 1 ? "s" : ""}: <i>&ldquo;{d.value.slice(0, 90)}&rdquo;</i>
            <div className="text-xs">
              {d.urls.slice(0, 8).map((u) => (
                <a key={u} href={u} target="_blank" rel="noreferrer" className={`mr-2 ${link}`}>
                  {shortUrl(u)}
                </a>
              ))}
              {d.urls.length > 8 && <span className="text-slate-500">and {d.urls.length - 8} more</span>}
            </div>
          </div>
        ))}
        {orphan && (
          <p className="text-red-600 dark:text-red-400">
            Orphan: no other page links to this one from its content (menu, footer and related-content widgets do not count).
          </p>
        )}
        {check.inbound.length > 0 && (
          <div>
            <b>Linked from {check.inbound.length} page{check.inbound.length > 1 ? "s" : ""}</b>
            <div className="text-xs">
              {check.inbound.slice(0, 12).map((i) => (
                <a key={i.url} href={i.url} target="_blank" rel="noreferrer" className={`mr-2 ${link}`}>
                  {shortUrl(i.url)}
                </a>
              ))}
              {check.inbound.length > 12 && <span className="text-slate-500">and {check.inbound.length - 12} more</span>}
            </div>
          </div>
        )}
        {!check.orphan_checked && check.inbound.length === 0 && <p className="text-slate-500">No page links here from its content. This page type is reached from the menu, so it is not counted as an orphan.</p>}
      </div>
    </details>
  );
}

/** A layer this check did not run keeps the result of the check before: say which and from when. */
function CarriedNote({ page }: { page: PageReport }) {
  const parts = ([
    ["Compliance", page.compliance.as_of],
    ["GEO answers", page.geo.as_of],
    ["SEO", page.seo.as_of],
  ] as const).filter(([, at]) => !!at);
  if (!parts.length) return null;
  const at = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  return (
    <p className="rounded bg-amber-50 p-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
      Not rechecked this time, kept from the check before: {parts.map(([name, when]) => `${name} (${at(when!)})`).join(", ")}. If the page text changed since, recheck with the model.
    </p>
  );
}

function ComparisonNote({ compare, isCheck }: { compare: PageCompare | null; isCheck: boolean }) {
  const noun = isCheck ? "check" : "run";
  if (!compare) return <p className="text-xs text-slate-500">{isCheck ? "No earlier version of this page's check to compare with yet: it appears after the page changes and is checked again." : "No earlier run of this page to compare with."}</p>;
  const gone = groupProblems(compare.resolved);
  const skipped = (["compliance", "geo", "seo"] as Layer[]).filter((l) => !compare.layers.includes(l));
  return (
    <div className="space-y-1 text-xs text-slate-500">
      <p>
        Compared with the {noun} of {new Date(compare.previous_at).toLocaleString()}{isCheck ? " (before the page last changed)" : ""}:{" "}
        <b>{gone.length}</b> {gone.length === 1 ? "problem" : "problems"} gone, new ones are marked <span className="font-semibold text-violet-700 dark:text-violet-300">New</span>.
        {skipped.length > 0 && ` Not compared (off or failed in one of the runs): ${skipped.map((l) => LAYER_LABELS[l]).join(", ")}.`}
        {" "}Compliance wording can differ between runs of the model, so a problem may show as gone and new at once.
      </p>
      {gone.length > 0 && (
        <details>
          <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-300">Gone since the previous {noun} ({gone.length})</summary>
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
