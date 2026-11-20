import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, type AppState, type ModelOption, type ScopeGroup } from "../api.js";
import { JobPanel, useJob } from "../components/JobPanel.js";
import type { Layers, RunListEntry } from "../types.js";
import { useRunContext } from "../context/RunContext.js";
import { Notice, buttonClass, primaryClass } from "../components/ResourceEditor.js";
import { RUN_PREFILL_KEY, runLabel } from "../utils.js";
import { Help } from "../components/Help.js";

type Mode = "urls" | "scope";

// Measured on real runs (results/*/run.json): both LLM layers on one page use about 30k input and 7k output
// tokens (output includes reasoning). Half of the input counts as cached; small runs cache less, big ones more.
const INPUT_PER_PAGE = 30_000;
const OUTPUT_PER_PAGE = 7_000;
const CACHED_SHARE = 0.5;
const SECONDS_PER_PAGE = 25;

function countUrls(text: string): number {
  return new Set(text.split(/[\s,]+/).filter((s) => /^https?:\/\//.test(s))).size;
}

function money(v: number): string {
  return v < 0.01 ? "under $0.01" : `$${v < 10 ? v.toFixed(2) : Math.round(v)}`;
}

function estimate(pages: number, layers: Layers, model: ModelOption | undefined): string {
  const word = `${pages} page${pages === 1 ? "" : "s"}`;
  const llm = Number(layers.compliance) + Number(layers.geo);
  if (!llm || !model) return `${word}, no LLM calls`;
  const share = llm / 2;
  const inTok = pages * INPUT_PER_PAGE * share;
  const outTok = pages * OUTPUT_PER_PAGE * share;
  const p = model.price_per_million_tokens;
  const cost = (inTok * ((1 - CACHED_SHARE) * p.input + CACHED_SHARE * p.cached_input) + outTok * p.output) / 1_000_000;
  const minutes = Math.max(1, Math.round((pages * SECONDS_PER_PAGE) / 4 / 60));
  return `${word}, about ${llm * pages} LLM calls, roughly ${Math.round(inTok / 1000)} thousand input tokens, about ${money(cost)} on ${model.label}, about ${minutes} min`;
}

const SNAPSHOT_STALE_DAYS = 14;

/** Page checks read the latest site snapshot: say which, and warn (never block) when there is none or it is old. */
function SnapshotNote({ snapshot }: { snapshot: RunListEntry | undefined }) {
  const linkCls = "text-blue-600 hover:underline dark:text-blue-400";
  if (!snapshot) {
    return (
      <Notice kind="warn">
        There is no site snapshot yet. A page check reads the latest snapshot for the shared banners and forms, duplicate titles and who links to a page; without it those parts are skipped.{" "}
        <Link to="/site" className={linkCls}>
          Make a snapshot on Site Checks
        </Link>
        , or run anyway: the pages themselves are checked either way.
      </Notice>
    );
  }
  const days = Math.floor((Date.now() - new Date(snapshot.started_at).getTime()) / 86_400_000);
  if (days > SNAPSHOT_STALE_DAYS) {
    return (
      <Notice kind="warn">
        The latest site snapshot is {days} days old ({runLabel(snapshot).replace(" (site snapshot)", "")}), so the site may have changed since. The pages will be read against it anyway.{" "}
        <Link to="/site" className={linkCls}>
          Make a new snapshot on Site Checks
        </Link>
        .
      </Notice>
    );
  }
  return (
    <p className="text-sm text-slate-600 dark:text-slate-400">
      The pages will be read against the site snapshot of <b>{runLabel(snapshot).replace(" (site snapshot)", "")}</b> ({snapshot.pages_checked} pages).{" "}
      <Link to="/site" className={linkCls}>
        Site Checks
      </Link>
    </p>
  );
}

export function RunPage() {
  const { snapshots, checks, reloadChecks } = useRunContext();
  const [prefillFrom, setPrefillFrom] = useState<string | null>(null);
  const navigate = useNavigate();
  const [state, setState] = useState<AppState | null>(null);
  const [mode, setMode] = useState<Mode>("urls");
  const [text, setText] = useState("");
  const [force, setForce] = useState(false);
  // the live site is what a page says now (after a change); the snapshot copy is the text the audit saw
  const [fromSnapshot, setFromSnapshot] = useState(false);
  const [layers, setLayers] = useState<Layers>({ compliance: true, geo: true, seo: true });
  const [modelId, setModelId] = useState("");
  const [scope, setScope] = useState<{ total: number; groups: ScopeGroup[] } | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [scopeOk, setScopeOk] = useState(false);
  const [limit, setLimit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  // pages handed over by a check on Site Checks
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RUN_PREFILL_KEY);
      if (!raw) return;
      sessionStorage.removeItem(RUN_PREFILL_KEY);
      const p = JSON.parse(raw) as { urls?: string[]; from?: string };
      if (p.urls?.length) {
        setMode("urls");
        setText(p.urls.join("\n"));
        setPrefillFrom(p.from ?? "a check");
      }
    } catch {
      /* no storage or a broken value: the form stays empty */
    }
  }, []);

  useEffect(() => {
    api
      .state()
      .then((s) => {
        setState(s);
        setModelId((cur) => cur || s.model);
        // a whole-site check that is running is shown on Site Checks, not here
        if (s.running_job) {
          api
            .job(s.running_job, 1_000_000)
            .then((j) => {
              if (!j.options.all && (j.options as { kind?: string }).kind !== "site_llm") attach(j.id);
            })
            .catch(() => undefined);
        }
      })
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);

  const attach = useCallback((id: string) => setJobId(id), []);

  // the subsection list is loaded when the sections tab opens
  useEffect(() => {
    if (mode !== "scope" || scope) return;
    api.scope().then(setScope).catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, [mode, scope]);

  const onDone = useCallback(() => {
    void reloadChecks();
    void api.state().then(setState);
  }, [reloadChecks]);
  const view = useJob(jobId, onDone);
  const job = view.job;
  const log = view.lines;

  const running = job?.status === "running" || (state?.running_job != null && jobId !== null);
  const pages = countUrls(text);
  const llmLayers = layers.compliance || layers.geo;
  const keyMissing = state !== null && !state.has_api_key && llmLayers;
  const model = state?.models.find((m) => m.id === modelId);
  const noLayer = !layers.compliance && !layers.geo && !layers.seo;
  const runOpts = { layers, model: modelId || undefined, fromSnapshot: fromSnapshot && !!snapshots[0] && !snapshots[0].details_removed };
  const allKeys = scope ? scope.groups.flatMap((g) => g.subsections.map((x) => x.key)) : [];
  const pickedPages = scope ? scope.groups.flatMap((g) => g.subsections).filter((x) => picked.has(x.key)).reduce((n, x) => n + x.count, 0) : 0;
  const sampleN = Number(limit) || 0;
  const plannedPages = sampleN ? Math.min(sampleN, pickedPages) : pickedPages;

  function togglePicked(keys: string[], on: boolean) {
    setPicked((cur) => {
      const next = new Set(cur);
      for (const k of keys) {
        if (on) next.add(k);
        else next.delete(k);
      }
      return next;
    });
  }

  async function start(body: Parameters<typeof api.startJob>[0]) {
    setError(null);
    setNotice(null);
    try {
      const r = await api.startJob(body);
      if (r.rejected.length) setNotice(`Not accepted (only ${state?.base_url ?? "site"} URLs): ${r.rejected.join(", ")}`);
      attach(r.id);
      setState((s) => (s ? { ...s, running_job: r.id } : s));
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  }

  const finished = !!job && job.status !== "running";

  function openResults() {
    navigate("/pages");
  }

  // pages that are already checked are checked again: their result is replaced
  const known = new Set((checks ?? []).map((c) => c.url));
  const alreadyChecked = [...new Set(text.split(/[\s,]+/).filter((s) => /^https?:\/\//.test(s)))].filter((u) => known.has(u)).length;

  const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Add pages</h1>
        <div className="mt-2">
          <Help id="add-pages">
            <p>Paste the links of the pages you want to look at in depth. Each page is split into zones and checked by three layers: Compliance and GEO use the model, SEO does not. The result appears on Checked pages.</p>
            <p>A page that is already there is checked again and its result is replaced. The model is asked again only if the text, the documents or the settings changed, unless you tick "Ignore saved results".</p>
          </Help>
        </div>
      </div>

      <SnapshotNote snapshot={snapshots[0]} />
      {snapshots[0] && (
        <label className="flex flex-wrap items-center gap-2 text-sm">
          Read the pages from
          <select
            className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900"
            value={fromSnapshot && !snapshots[0].details_removed ? "copy" : "live"}
            onChange={(e) => setFromSnapshot(e.target.value === "copy")}
          >
            <option value="live">the live site (what the page says now)</option>
            <option value="copy" disabled={!!snapshots[0].details_removed}>
              the copy in the snapshot (what the audit saw)
            </option>
          </select>
          <span className="text-slate-500">
            {fromSnapshot ? "The same text the audit saw, and no request to the site. A page missing from the snapshot is still fetched live." : "Choose this to check a page after you changed it."}
          </span>
        </label>
      )}
      {prefillFrom && <Notice kind="ok">The links below come from the check “{prefillFrom}” on Site Checks. Change them if you like, then run.</Notice>}

      {state && !state.has_api_key && (
        <Notice kind="warn">OPENAI_API_KEY is not set in .env. You can still run with "Skip LLM" (SEO and code checks only).</Notice>
      )}

      <section className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-medium">Layers</span>
          {(
            [
              ["compliance", "Compliance (LLM)"],
              ["geo", "GEO (LLM and code)"],
              ["seo", "SEO (code)"],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="flex items-center gap-1">
              <input type="checkbox" checked={layers[k]} onChange={(e) => setLayers((l) => ({ ...l, [k]: e.target.checked }))} /> {label}
            </label>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <label htmlFor="model" className="font-medium">
              Model
            </label>
            <select id="model" className={field} value={modelId} onChange={(e) => setModelId(e.target.value)} disabled={!llmLayers}>
              {(state?.models ?? []).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </span>
        </div>
        {model && llmLayers && (
          <p className="text-xs text-slate-500">
            {model.label}: ${model.price_per_million_tokens.input} input, ${model.price_per_million_tokens.cached_input} cached input,{" "}
            ${model.price_per_million_tokens.output} output per million tokens.
          </p>
        )}
        {noLayer && <Notice kind="warn">Turn on at least one layer.</Notice>}
      </section>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(
          [
            ["urls", "Pages by link"],
            ["scope", "Sections or whole site"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${mode === k ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "urls" && (
        <div className="space-y-3">
          <textarea
            className={`${field} w-full font-mono`}
            rows={7}
            placeholder={"One link per line, for example\nhttps://gogloby.com/services/hire-ai-engineers/\nhttps://gogloby.com/insights/ai-adoption-statistics/"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} /> Ignore saved results
            </label>
            <span className="text-slate-500">{pages ? estimate(pages, layers, model) : "Paste at least one link"}</span>
            {alreadyChecked > 0 && (
              <span className="text-amber-700 dark:text-amber-400">
                {alreadyChecked} of these pages {alreadyChecked === 1 ? "is" : "are"} already checked and will be checked again.
              </span>
            )}
          </div>
          {pages > 20 && llmLayers && <Notice kind="warn">More than 20 pages with the LLM takes a while and uses many tokens.</Notice>}
          <button
            type="button"
            className={primaryClass}
            disabled={!pages || running || keyMissing || noLayer}
            onClick={() => start({ text, force, ...runOpts })}
          >
            Check {pages > 1 ? `${pages} pages` : "page"}
          </button>
        </div>
      )}

      {mode === "scope" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Pick whole categories or single subsections from the sitemap. Select everything for the full audit. The scope itself is set in
            Settings, General and scope.
          </p>
          {!scope && <p className="text-sm text-slate-500">Loading the sitemap...</p>}
          {scope && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={buttonClass} onClick={() => togglePicked(allKeys, true)}>
                  Select all ({scope.total})
                </button>
                <button type="button" className={buttonClass} onClick={() => setPicked(new Set())}>
                  Clear
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {scope.groups.map((g) => {
                  const keys = g.subsections.map((x) => x.key);
                  const on = keys.filter((k) => picked.has(k)).length;
                  return (
                    <fieldset key={g.category} className="space-y-1">
                      <label className="flex items-center gap-1 font-semibold">
                        <input
                          type="checkbox"
                          checked={on === keys.length}
                          ref={(el) => {
                            if (el) el.indeterminate = on > 0 && on < keys.length;
                          }}
                          onChange={(e) => togglePicked(keys, e.target.checked)}
                        />
                        {g.category}
                        <span className="font-normal text-slate-500">{g.subsections.reduce((n, x) => n + x.count, 0)}</span>
                      </label>
                      {g.subsections.map((x) => (
                        <label key={x.key} className="ml-5 flex items-center gap-1">
                          <input type="checkbox" checked={picked.has(x.key)} onChange={(e) => togglePicked([x.key], e.target.checked)} />
                          {x.name}
                          <span className="text-slate-500">{x.count}</span>
                        </label>
                      ))}
                    </fieldset>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-1">
                  only a sample of
                  <input className={`${field} w-16`} value={limit} onChange={(e) => setLimit(e.target.value.replace(/\D/g, ""))} />
                  pages, spread over the selected subsections
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} /> Ignore saved results
                </label>
              </div>
              <p className="font-medium">{plannedPages ? estimate(plannedPages, layers, model) : "Select at least one subsection"}</p>
              {llmLayers && plannedPages > 50 && (
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={scopeOk} onChange={(e) => setScopeOk(e.target.checked)} />
                  I understand this uses many tokens and runs for a long time
                </label>
              )}
            </div>
          )}
          <button
            type="button"
            className={primaryClass}
            disabled={running || keyMissing || noLayer || !plannedPages || (llmLayers && plannedPages > 50 && !scopeOk)}
            onClick={() => {
              const everything = picked.size === allKeys.length;
              start({
                ...(everything && !sampleN ? { all: true } : { subsections: [...picked], limit: sampleN || undefined }),
                force,
                ...runOpts,
              });
            }}
          >
            Check {plannedPages ? `${plannedPages} page${plannedPages === 1 ? "" : "s"}` : "selected"}
          </button>
        </div>
      )}

      {error && <Notice kind="error">{error}</Notice>}
      {notice && <Notice kind="warn">{notice}</Notice>}

      {jobId && (
        <section className="space-y-2">
          <JobPanel view={view} label={job?.status === "running" || !job ? "Checking pages" : job.status === "done" ? "Finished" : job.status === "stopped" ? "Stopped" : "Failed"} stop open />
          {job?.error && <Notice kind="error">{job.error}</Notice>}
          {finished && (
            <button type="button" className={primaryClass} onClick={openResults}>
              Open checked pages
            </button>
          )}
        </section>
      )}

    </div>
  );
}
