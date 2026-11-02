import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type AppState, type JobDetail } from "../api.js";
import { useRunContext } from "../context/RunContext.js";
import { Notice, buttonClass, primaryClass } from "../components/ResourceEditor.js";

type Mode = "urls" | "draft" | "scope";

const TOKENS_PER_PAGE = 27_000;
const SECONDS_PER_PAGE = 25;

function countUrls(text: string): number {
  return new Set(text.split(/[\s,]+/).filter((s) => /^https?:\/\//.test(s))).size;
}

function estimate(pages: number, noLlm: boolean): string {
  if (noLlm) return `${pages} page${pages === 1 ? "" : "s"}, no LLM calls`;
  const tokens = Math.round((pages * TOKENS_PER_PAGE + 20_000) / 1000);
  const minutes = Math.max(1, Math.round((pages * SECONDS_PER_PAGE) / 4 / 60));
  return `${pages} page${pages === 1 ? "" : "s"}, about ${2 * pages + 2} LLM calls, roughly ${tokens} thousand input tokens, about ${minutes} min`;
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
  const [noLlm, setNoLlm] = useState(false);
  const [draftName, setDraftName] = useState("draft.md");
  const [draftText, setDraftText] = useState("");
  const [draftType, setDraftType] = useState("post");
  const [scope, setScope] = useState<{ total: number; by_subsection: Record<string, number> } | null>(null);
  const [scopeOk, setScopeOk] = useState(false);
  const [limit, setLimit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const jobId = useRef<string | null>(null);
  const draftFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api
      .state()
      .then((s) => {
        setState(s);
        if (s.running_job) attach(s.running_job);
      })
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);

  const attach = useCallback((id: string) => {
    jobId.current = id;
    setLog([]);
  }, []);

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
  const keyMissing = state !== null && !state.has_api_key && !noLlm;

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

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(
          [
            ["urls", "Pages by link"],
            ["draft", "Draft text"],
            ["scope", "Whole site"],
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
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={noLlm} onChange={(e) => setNoLlm(e.target.checked)} /> Skip LLM
            </label>
            <span className="text-slate-500">{pages ? estimate(pages, noLlm) : "Paste at least one link"}</span>
          </div>
          {pages > 20 && !noLlm && <Notice kind="warn">More than 20 pages with the LLM takes a while and uses many tokens.</Notice>}
          <button
            type="button"
            className={primaryClass}
            disabled={!pages || running || keyMissing}
            onClick={() => start({ text, force, noLlm })}
          >
            Run {pages > 1 ? `${pages} pages` : "page"}
          </button>
        </div>
      )}

      {mode === "draft" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Check text that is not on the site yet. Compliance and GEO run; SEO needs a live page.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <input
              ref={draftFile}
              type="file"
              accept=".md,.txt,.html,.htm"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setDraftName(f.name);
                setDraftText(await f.text());
                e.target.value = "";
              }}
            />
            <button type="button" className={buttonClass} onClick={() => draftFile.current?.click()}>
              Load a file...
            </button>
            <label className="flex items-center gap-1">
              File name <input className={`${field} w-48`} value={draftName} onChange={(e) => setDraftName(e.target.value)} />
            </label>
            <label className="flex items-center gap-1">
              Page type
              <select className={field} value={draftType} onChange={(e) => setDraftType(e.target.value)}>
                <option value="post">Article</option>
                <option value="service">Service</option>
                <option value="homepage">Home</option>
                <option value="company">Company</option>
                <option value="podcast">Podcast</option>
                <option value="legal">Legal</option>
              </select>
            </label>
          </div>
          <textarea
            className={`${field} w-full font-mono`}
            rows={14}
            placeholder="# Title&#10;&#10;Text of the draft in markdown..."
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
          <button
            type="button"
            className={primaryClass}
            disabled={!draftText.trim() || running || !state?.has_api_key}
            onClick={() => start({ draft: { name: draftName, content: draftText, type: draftType } })}
          >
            Run draft
          </button>
          {state && !state.has_api_key && <p className="text-xs text-slate-500">A draft needs the LLM, so OPENAI_API_KEY must be set.</p>}
        </div>
      )}

      {mode === "scope" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Audits every page in the scope from the sitemap (Settings, General and scope). This is the full audit.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={buttonClass}
              onClick={() => {
                setError(null);
                api.scope().then(setScope).catch((e) => setError(String(e instanceof Error ? e.message : e)));
              }}
            >
              Count pages
            </button>
            <label className="flex items-center gap-1 text-sm">
              or a sample of
              <input className={`${field} w-16`} value={limit} onChange={(e) => setLimit(e.target.value.replace(/\D/g, ""))} />
              pages
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} /> Ignore saved results
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={noLlm} onChange={(e) => setNoLlm(e.target.checked)} /> Skip LLM
            </label>
          </div>
          {scope && (
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="font-medium">{estimate(scope.total, noLlm)}</p>
              <ul className="mt-1 text-slate-600 dark:text-slate-400">
                {Object.entries(scope.by_subsection).sort().map(([k, n]) => (
                  <li key={k}>
                    {k}: {n}
                  </li>
                ))}
              </ul>
              {!noLlm && (
                <label className="mt-2 flex items-center gap-1">
                  <input type="checkbox" checked={scopeOk} onChange={(e) => setScopeOk(e.target.checked)} />
                  I understand this uses many tokens and runs for hours
                </label>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              className={primaryClass}
              disabled={running || keyMissing || !scope || (!noLlm && !scopeOk)}
              onClick={() => start({ all: true, force, noLlm })}
            >
              Run the whole scope
            </button>
            <button
              type="button"
              className={buttonClass}
              disabled={running || keyMissing || !limit}
              onClick={() => start({ limit: Number(limit), force, noLlm })}
            >
              Run a sample of {limit || "N"}
            </button>
          </div>
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
  runs: { id: string; pages_checked: number; started_at: string; format?: 1 | 2 }[];
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
            {r.format === 1 ? (
              <span className="text-xs text-slate-500">old format, cannot be opened</span>
            ) : (
              <>
                <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => onSelect(r.id)}>
                  open
                </button>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/data/${r.id}/findings.csv`} download>
                  findings.csv
                </a>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/data/${r.id}/summary.csv`} download>
                  summary.csv
                </a>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={`/data/${r.id}/site.md`} target="_blank" rel="noreferrer">
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
