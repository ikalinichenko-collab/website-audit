import { useEffect, useRef, useState } from "react";
import { api, type JobDetail } from "../api.js";
import { buttonClass } from "./ResourceEditor.js";

/** "[3/12] ..." in the log: how far the job is. */
function progressOf(log: string[]): { done: number; total: number } | null {
  for (let i = log.length - 1; i >= 0; i--) {
    const m = log[i]!.match(/^\[(\d+)\/(\d+)\]/);
    if (m) return { done: Number(m[1]), total: Number(m[2]) };
  }
  return null;
}

/** Follows a job started in the background (a recheck): what it is doing, the last log line, Stop. `onDone` is called once when it ends. */
export function JobBar({ jobId, label, onDone }: { jobId: string; label: string; onDone: (job: JobDetail) => void }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let finished = false;
    const t = setInterval(async () => {
      try {
        const j = await api.job(jobId, 0);
        setJob(j);
        if (j.status !== "running" && !finished) {
          finished = true;
          clearInterval(t);
          onDoneRef.current(j);
        }
      } catch {
        /* the server restarted: try again on the next tick */
      }
    }, 1200);
    return () => clearInterval(t);
  }, [jobId]);

  const p = job ? progressOf(job.log) : null;
  const last = job?.log[job.log.length - 1] ?? "";
  return (
    <div className="flex flex-wrap items-center gap-3 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm dark:border-blue-900 dark:bg-blue-950">
      <span className="font-medium">{label}</span>
      {p && (
        <span className="tabular-nums">
          {p.done} of {p.total} pages
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-xs text-slate-600 dark:text-slate-400">{last}</span>
      <button type="button" className={buttonClass} onClick={() => void api.stopJob(jobId)}>
        Stop
      </button>
    </div>
  );
}
