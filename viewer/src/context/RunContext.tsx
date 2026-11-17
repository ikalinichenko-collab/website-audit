import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { getIndex, getRuns } from "../data.js";
import type { PageIndexEntry, RunListEntry } from "../types.js";

interface RunContextValue {
  /** Runs the viewer can open (current format): the snapshots of the site. */
  runs: RunListEntry[];
  /** Site snapshots, newest first (what Site Checks shows). */
  snapshots: RunListEntry[];
  /** Every run folder, including old ones that can only be deleted. */
  allRuns: RunListEntry[];
  /** The checked pages (null until loaded). */
  checks: PageIndexEntry[] | null;
  loading: boolean;
  error: string | null;
  /** Reload the run list (after a snapshot finished or was deleted). */
  reload: () => Promise<void>;
  /** Reload the checked pages (after a check, a recheck or a delete). */
  reloadChecks: () => Promise<void>;
}

const RunContext = createContext<RunContextValue | null>(null);

export function RunProvider({ children }: { children: ReactNode }) {
  const [allRuns, setAllRuns] = useState<RunListEntry[]>([]);
  const runs = useMemo(() => allRuns.filter((r) => r.format !== 1), [allRuns]);
  const snapshots = useMemo(() => runs.filter((r) => r.kind === "site"), [runs]);
  const [checks, setChecks] = useState<PageIndexEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setAllRuns(await getRuns());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadChecks = useCallback(async () => {
    try {
      setChecks((await getIndex(null)).pages);
    } catch {
      setChecks((cur) => cur ?? []);
    }
  }, []);

  useEffect(() => {
    void reload();
    void reloadChecks();
  }, [reload, reloadChecks]);

  const value = useMemo(() => ({ runs, snapshots, allRuns, checks, loading, error, reload, reloadChecks }), [runs, snapshots, allRuns, checks, loading, error, reload, reloadChecks]);

  return <RunContext.Provider value={value}>{children}</RunContext.Provider>;
}

/**
 * The snapshot a page belongs to when it is opened from Site Checks (`?run=<snapshot>`); null for a checked page.
 * Only for components inside the router.
 */
export function useActiveRunId(): string | null {
  const [params] = useSearchParams();
  return params.get("run") || null;
}

export function useRunContext(): RunContextValue {
  const ctx = useContext(RunContext);
  if (!ctx) throw new Error("useRunContext outside provider");
  return ctx;
}
