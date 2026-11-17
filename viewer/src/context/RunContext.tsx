import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "react-router-dom";
import { getRuns } from "../data.js";
import type { RunListEntry } from "../types.js";

interface RunContextValue {
  /** Runs the viewer can open (current format). */
  runs: RunListEntry[];
  /** Page checks: the runs of chosen pages (what Page Checks shows). */
  pageRuns: RunListEntry[];
  /** Site snapshots, newest first (what Site Checks shows). */
  snapshots: RunListEntry[];
  /** Every run folder, including old ones that can only be deleted. */
  allRuns: RunListEntry[];
  runId: string;
  setRunId: (id: string) => void;
  loading: boolean;
  error: string | null;
  /** Reload the run list (after a run finished or was deleted). */
  reload: () => Promise<void>;
}

const RunContext = createContext<RunContextValue | null>(null);

export function RunProvider({ children }: { children: ReactNode }) {
  const [allRuns, setAllRuns] = useState<RunListEntry[]>([]);
  const runs = useMemo(() => allRuns.filter((r) => r.format !== 1), [allRuns]);
  const pageRuns = useMemo(() => runs.filter((r) => r.kind !== "site"), [runs]);
  const snapshots = useMemo(() => runs.filter((r) => r.kind === "site"), [runs]);
  const [runId, setRunId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const list = await getRuns();
      setAllRuns(list);
      setError(null);
      // the selected run is always a page check: snapshots are opened on Site Checks
      const readable = list.filter((r) => r.format !== 1 && r.kind !== "site");
      setRunId((cur) => (cur && readable.some((r) => r.id === cur) ? cur : (readable[0]?.id ?? "")));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const value = useMemo(
    () => ({ runs, pageRuns, snapshots, allRuns, runId, setRunId, loading, error, reload }),
    [runs, pageRuns, snapshots, allRuns, runId, loading, error, reload],
  );

  return <RunContext.Provider value={value}>{children}</RunContext.Provider>;
}

/**
 * The run a page shows: the one named by `?run=` (a page of a snapshot opened from Site Checks), else the selected page check.
 * Only for components inside the router.
 */
export function useActiveRunId(): string {
  const { runId } = useRunContext();
  const [params] = useSearchParams();
  return params.get("run") || runId;
}

export function useRunContext(): RunContextValue {
  const ctx = useContext(RunContext);
  if (!ctx) throw new Error("useRunContext outside provider");
  return ctx;
}
