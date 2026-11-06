import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type AppState, type JobDetail, type ModelOption, type ScopeGroup } from "../api.js";
import type { Layers } from "../types.js";
import { useRunContext } from "../context/RunContext.js";
import { Notice, buttonClass, primaryClass } from "../components/ResourceEditor.js";

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

function progressOf(log: string[]): { done: number; total: number } | null {
  for (let i = log.length - 1; i >= 0; i--) {
    const m = log[i]!.match(/^\[(\d+)\/(\d+)\]/);
    if (m) return { done: Number(m[1]), total: Number(m[2]) };
  }
  return null;
}

export function RunPage() {
  const { allRuns, setRunId, reload } = useRunContext();
  const navigate = useNavigate();
  const [state, setState] = useState<AppState | null>(null);
  const [mode, setMode] = useState<Mode>("urls");
  const [text, setText] = useState("");
  const [force, setForce] = useState(false);
  const [layers, setLayers] = useState<Layers>({ compliance: true, geo: true, seo: true });
  const [modelId, setModelId] = useState("");
  const [scope, setScope] = useState<{ total: number; groups: ScopeGroup[] } | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [scopeOk, setScopeOk] = useState(false);
  const [limit, setLimit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const jobId = useRef<string | null>(null);

  useEffect(() => {
    api
      .state()
      .then((s) => {
        setState(s);
        setModelId((cur) => cur || s.model);
        if (s.running_job) attach(s.running_job);
      })
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);

  const attach = useCallback((id: string) => {
    jobId.current = id;
    setLog([]);
  }, []);

  // the subsection list is loaded when the sections tab opens
  useEffect(() => {
    if (mode !== "scope" || scope) return;
    api.scope().then(setScope).catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, [mode, scope]);

  // poll the running job
  useEffect(() => {
    const t = setInterval(async () => {
      const id = jobId.current;
      if (!id) return;
      try {
        const j = await api.job(id, 0);
        setJob(j);
        setLog(j.log);
        if (j.status !== "running") {
          jobId.current = null;
          void reload();
          void api.state().then(setState);
        }
      } catch {
        /* server restarted */
      }
    }, 1500);
    return () => clearInterval(t);
  }, [reload]);

  const running = job?.status === "running" || (state?.running_job != null && jobId.current !== null);
  const pages = countUrls(text);
  const llmLayers = layers.compliance || layers.geo;
  const keyMissing = state !== null && !state.has_api_key && llmLayers;
  const model = state?.models.find((m) => m.id === modelId);
  const noLayer = !layers.compliance && !layers.geo && !layers.seo;
  const runOpts = { layers, model: modelId || undefined };
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
    setJob(null);
    try {
      const r = await api.startJob(body);
      if (r.rejected.length) setNotice(`Not accepted (only ${state?.base_url ?? "site"} URLs): ${r.rejected.join(", ")}`);
      attach(r.id);
      setState((s) => (s ? { ...s, running_job: r.id } : s));
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  }

  const progress = progressOf(log);
  const finishedRun = job && job.status !== "running" ? job.run_id : null;

  function openResults() {
    if (!finishedRun) return;
    setRunId(finishedRun);
    navigate("/pages");
  }

  const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Run an audit</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          Pages are fetched from the live site, split into zones and checked by three layers: Compliance and GEO use the LLM,
          SEO does not. A page whose text, documents and settings did not change is not asked again unless you tick "Ignore
          saved results".
        </p>
      </div>

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
          </div>
          {pages > 20 && llmLayers && <Notice kind="warn">More than 20 pages with the LLM takes a while and uses many tokens.</Notice>}
          <button
            type="button"
            className={primaryClass}
            disabled={!pages || running || keyMissing || noLayer}
            onClick={() => start({ text, force, ...runOpts })}
          >
            Run {pages > 1 ? `${pages} pages` : "page"}
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
            Run {plannedPages ? `${plannedPages} page${plannedPages === 1 ? "" : "s"}` : "selected"}
          </button>
        </div>
      )}

      {error && <Notice kind="error">{error}</Notice>}
      {notice && <Notice kind="warn">{notice}</Notice>}

      {(job || log.length > 0) && (
        <section className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-semibold">
              {job?.status === "running" || !job ? "Running" : job.status === "done" ? "Finished" : job.status === "stopped" ? "Stopped" : "Failed"}
            </h2>
            {progress && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {progress.done} of {progress.total} pages
              </span>
            )}
            {progress && (
              <div className="h-2 w-48 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-blue-600" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
              </div>
            )}
            {job?.status === "running" && (
              <button type="button" className={buttonClass} onClick={() => job && api.stopJob(job.id)}>
                Stop
              </button>
            )}
            {finishedRun && (
              <button type="button" className={primaryClass} onClick={openResults}>
                Open results
              </button>
            )}
          </div>
          {job?.error && <Notice kind="error">{job.error}</Notice>}
          <pre className="max-h-72 overflow-auto rounded bg-slate-50 p-2 text-xs dark:bg-slate-950">{log.join("\n")}</pre>
        </section>
      )}

      <RunList runs={allRuns} onSelect={(id) => { setRunId(id); navigate("/"); }} onDeleted={reload} />
    </div>
  );
}

function RunList({
  runs,
  onSelect,
  onDeleted,
}: {
  runs: { id: string; pages_checked: number; started_at: string; model?: string; cost_usd?: number | null; format?: 1 | 2 }[];
  onSelect: (id: string) => void;
  onDeleted: () => void;
}) {
  const [err, setErr] = useState<string | null>(null);
  if (!runs.length) return null;
  return (
    <section className="space-y-2">
      <h2 className="font-semibold">Earlier runs</h2>
      {err && <Notice kind="error">{err}</Notice>}
      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white text-sm dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
        {runs.map((r) => (
          <li key={r.id} className="flex items-center gap-3 px-3 py-2">
            <span className="tabular-nums">{r.id.replace(/T/, " ").slice(0, 19)}</span>
            <span className="text-slate-500">{r.pages_checked} pages</span>
            {r.model && <span className="text-xs text-slate-500">{r.model}</span>}
            {r.cost_usd != null && r.cost_usd > 0 && <span className="text-xs text-slate-500">${r.cost_usd.toFixed(r.cost_usd < 1 ? 3 : 2)}</span>}
            {r.format === 1 ? (
              <span className="text-xs text-slate-500">old format, cannot be opened</span>
            ) : (
              <>
                <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => onSelect(r.id)}>
                  open
                </button>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/api/runs/${r.id}/findings.csv`} download>
                  findings.csv
                </a>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/api/runs/${r.id}/summary.csv`} download>
                  summary.csv
                </a>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/api/runs/${r.id}/site.md`} target="_blank" rel="noreferrer">
                  site.md
                </a>
              </>
            )}
            <button
              type="button"
              className="ml-auto text-red-600 hover:underline"
              onClick={async () => {
                if (!window.confirm(`Delete run ${r.id}? This cannot be undone.`)) return;
                try {
                  await api.deleteRun(r.id);
                  onDeleted();
                } catch (e) {
                  setErr(String(e instanceof Error ? e.message : e));
                }
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
