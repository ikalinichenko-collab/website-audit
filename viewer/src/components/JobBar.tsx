import type { JobDetail } from "../api.js";
import { JobPanel, useJob } from "./JobPanel.js";

/** Follows a job started in the background (a recheck): what it is doing, progress, the log on demand, Stop. `onDone` is called once when it ends. */
export function JobBar({ jobId, label, onDone }: { jobId: string; label: string; onDone: (job: JobDetail) => void }) {
  const view = useJob(jobId, onDone);
  return <JobPanel view={view} label={label} stop />;
}
