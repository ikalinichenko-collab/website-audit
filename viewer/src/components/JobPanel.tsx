import { useEffect, useRef, useState } from "react";
import { api, type JobDetail } from "../api.js";
import { buttonClass } from "./ResourceEditor.js";

export interface JobView {
  job: JobDetail | null;
  lines: string[];
  /** when the last line arrived (browser clock); null before the first poll */
  changedAt: number | null;
}

/**
 * Follows a job: asks only for the log lines it has not got yet. `onDone` is called once when the job ends.
 * A poll that fails (the server restarted) is tried again on the next tick.
 */
export function useJob(jobId: string | null, onDone?: (job: JobDetail) => void): JobView {
  const [view, setView] = useState<JobView>({ job: null, lines: [], changedAt: null });
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setView({ job: null, lines: [], changedAt: null });
    if (!jobId) return;
    let stopped = false;
    let lines: string[] = [];
    let changedAt = Date.now();
    let busy = false;
    const tick = async () => {
      if (busy || stopped) return;
      busy = true;
      try {
        const j = await api.job(jobId, lines.length);
        if (stopped) return;
        if (j.log_total < lines.length) lines = [];
        if (j.log.length) {
          lines = lines.concat(j.log);
          changedAt = Date.now();
        }
        setView({ job: j, lines, changedAt });
        if (j.status !== "running") {
          stopped = true;
          clearInterval(t);
          onDoneRef.current?.({ ...j, log: lines });
        }
      } catch {
        /* the server restarted: try again on the next tick */
      } finally {
        busy = false;
      }
    };
    const t = setInterval(() => void tick(), 1200);
    void tick();
    return () => {
      stopped = true;
      clearInterval(t);
    };
  }, [jobId]);

  return view;
}

interface Phase {
  label: string;
  done: number | null;
  total: number | null;
}

/** What the job is doing now, from its last log lines: the page counter of the fetch or of the check, else the last line itself. */
export function phaseOf(lines: string[]): Phase {
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i]!;
    const check = l.match(/^\[(\d+)\/(\d+)\]/);
    if (check) return { label: "Checking pages", done: Number(check[1]), total: Number(check[2]) };
    const fetched = l.match(/^(?:Fetched|Read) (\d+)\/(\d+)/);
    if (fetched) return { label: "Fetching pages", done: Number(fetched[1]), total: Number(fetched[2]) };
    return { label: l, done: null, total: null };
  }
  return { label: "Starting", done: null, total: null };
}

function duration(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  return m ? `${m} min ${String(s % 60).padStart(2, "0")} s` : `${s} s`;
}

function lineClass(l: string): string {
  if (/error|failed|stop requested/i.test(l)) return "text-red-600 dark:text-red-400";
  if (/^(Fetched|Read) \d+\/\d+/.test(l)) return "text-slate-400 dark:text-slate-500";
  if (/^\[\d+\/\d+\]/.test(l)) return /\b[1-9]\d* (high|fail)/.test(l) ? "text-amber-700 dark:text-amber-400" : "";
  return "font-medium text-blue-700 dark:text-blue-300";
}

/** A line of the log with the numbers set apart from the address, so a long list stays readable. */
function LogLine({ text }: { text: string }) {
  const m = text.match(/^(\[\d+\/\d+\]|(?:Fetched|Read) \d+\/\d+[^:]*:)\s*(.*)$/);
  if (!m) return <div className={lineClass(text)}>{text}</div>;
  return (
    <div className={lineClass(text)}>
      <span className="inline-block w-24 tabular-nums text-slate-400 dark:text-slate-500">{m[1]}</span>
      {m[2]}
    </div>
  );
}

const SHOWN_LINES = 300;

/** How far a job is: what it does now, a bar, time spent, a warning when nothing was written for a while, and the log on demand. */
export function JobPanel({
  view,
  label,
  stop,
  open: openByDefault = false,
}: {
  view: JobView;
  label: string;
  /** shows Stop while the job runs */
  stop?: boolean;
  open?: boolean;
}) {
  const { job, lines, changedAt } = view;
  const [open, setOpen] = useState(openByDefault);
  const [now, setNow] = useState(Date.now());
  const logRef = useRef<HTMLDivElement>(null);
  const running = !job || job.status === "running";

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    const el = logRef.current;
    if (open && el) el.scrollTop = el.scrollHeight;
  }, [open, lines.length]);

  const p = phaseOf(lines);
  const started = job ? new Date(job.started_at).getTime() : now;
  const ended = job?.ended_at ? new Date(job.ended_at).getTime() : now;
  const quiet = running && changedAt ? now - changedAt : 0;
  const pct = p.total ? Math.round(((p.done ?? 0) / p.total) * 100) : null;
  const eta = running && p.done && p.total && p.done >= 5 && p.label === "Checking pages" ? ((now - started) / p.done) * (p.total - p.done) : null;
  const shown = lines.slice(-SHOWN_LINES);

  return (
    <div className="space-y-2 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm dark:border-blue-900 dark:bg-blue-950">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-medium">{label}</span>
        <span className="text-slate-700 dark:text-slate-300">{p.label}</span>
        {p.total != null && (
          <span className="tabular-nums">
            {p.done} of {p.total}
          </span>
        )}
        <span className="text-xs text-slate-500">
          {duration(ended - started)}
          {eta ? `, about ${duration(eta)} left` : ""}
        </span>
        <span className="flex-1" />
        <button type="button" className={buttonClass} onClick={() => setOpen((o) => !o)}>
          {open ? "Hide log" : `Show log (${lines.length})`}
        </button>
        {stop && running && job && (
          <button type="button" className={buttonClass} onClick={() => void api.stopJob(job.id)}>
            Stop
          </button>
        )}
      </div>
      {pct != null && (
        <div className="h-1.5 overflow-hidden rounded bg-blue-100 dark:bg-blue-900">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
      )}
      {quiet > 45_000 && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          No new line for {duration(quiet)}. A long step such as reading all pages or a slow link check writes nothing while it works; if this lasts several minutes, ask for the server log.
        </p>
      )}
      {open && (
        <div ref={logRef} className="max-h-72 overflow-auto rounded bg-white p-2 font-mono text-xs leading-5 dark:bg-slate-950">
          {lines.length > shown.length && <div className="text-slate-400">... {lines.length - shown.length} earlier lines not shown</div>}
          {shown.map((l, i) => (
            <LogLine key={lines.length - shown.length + i} text={l} />
          ))}
        </div>
      )}
    </div>
  );
}
