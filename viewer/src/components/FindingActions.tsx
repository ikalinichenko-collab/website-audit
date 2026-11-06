import { createContext, useContext, useState } from "react";
import { api } from "../api.js";
import type { Finding, FindingStatus } from "../types.js";

/** Where a decision is saved: the page (or the site pass, slug null) of a run, and how to reload its findings afterwards. */
export interface FindingActionsValue {
  runId: string;
  slug: string | null;
  reload: () => void;
}

export const FindingActionsContext = createContext<FindingActionsValue | null>(null);

export const STATUS_LABEL: Record<FindingStatus, string> = {
  accepted: "Accepted",
  false_positive: "False positive",
  fixed: "Fixed",
};

const STATUS_HELP: Record<FindingStatus, string> = {
  accepted: "Known and kept as it is. Stays closed in later runs.",
  false_positive: "The audit is wrong here. Stays closed in later runs.",
  fixed: "Changed on the site. Opens again if a later run still finds it.",
};

const STATUS_CLASS: Record<FindingStatus, string> = {
  accepted: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  false_positive: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  fixed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

/** The decision of a problem card: the status shared by all its places, none when they differ or are open. */
export function groupStatus(group: Finding[]): Finding | undefined {
  const first = group[0];
  return first?.status && group.every((f) => f.status === first.status) ? first : undefined;
}

/** Plain text a developer or copywriter can act on. */
export function taskText(group: Finding[]): string {
  const f = group[0]!;
  const places = [...new Set(group.map((x) => [x.zone_label || x.zone_id, x.place || x.part.replace(/_/g, " ")].filter(Boolean).join(", ")))].filter(Boolean);
  const quotes = [...new Set(group.map((x) => x.quote).filter(Boolean))].slice(0, 5);
  const lines = [
    `${f.title}${f.severity ? ` (${f.severity})` : ""}`,
    f.url !== "site" ? `Page: ${f.url}` : "",
    places.length ? `Where: ${places.join("; ")}` : "",
    ...quotes.map((q) => `Text: "${q}"`),
    f.issue ? `Problem: ${f.issue}` : "",
    f.fix ? `What to do: ${f.fix}` : "",
    f.rule ? `Based on: ${f.rule}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

const btn = "rounded border border-slate-300 px-2 py-0.5 text-xs hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800";

/** Chip with the decision, or the buttons to make one, and the copy-task button. Hidden where no run is loaded. */
export function StatusBar({ group }: { group: Finding[] }) {
  const ctx = useContext(FindingActionsContext);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!ctx || !group.length) return null;
  const current = groupStatus(group);
  const reopened = group.some((f) => f.reopened);

  async function set(status: FindingStatus | null) {
    setBusy(true);
    setError(null);
    try {
      await api.setFindingStatus(ctx!.runId, ctx!.slug, [...new Set(group.map((f) => f.fid))], status, note.trim());
      setNote("");
      ctx!.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(taskText(group));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Could not copy to the clipboard");
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2 text-xs dark:border-slate-800">
      {current ? (
        <>
          <span className={`rounded px-1.5 py-0.5 font-semibold ${STATUS_CLASS[current.status!]}`} title={STATUS_HELP[current.status!]}>
            {STATUS_LABEL[current.status!]}
          </span>
          <span className="text-slate-500">
            {current.status_at ? new Date(current.status_at).toLocaleDateString() : ""}
            {current.status_by ? `, ${current.status_by}` : ""}
            {current.status_note ? `: ${current.status_note}` : ""}
          </span>
          <button type="button" className={btn} disabled={busy} onClick={() => set(null)}>
            Reopen
          </button>
        </>
      ) : (
        <>
          {reopened && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200" title="Marked fixed earlier, but this run still finds it">
              Back after fix
            </span>
          )}
          <span className="text-slate-500">Mark as</span>
          {(Object.keys(STATUS_LABEL) as FindingStatus[]).map((s) => (
            <button key={s} type="button" className={btn} disabled={busy} title={STATUS_HELP[s]} onClick={() => set(s)}>
              {STATUS_LABEL[s]}
            </button>
          ))}
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            placeholder="Note (optional)"
            className="min-w-[8rem] flex-1 rounded border border-slate-300 bg-white px-2 py-0.5 text-xs dark:border-slate-600 dark:bg-slate-900"
          />
        </>
      )}
      <button type="button" className={`${btn} ml-auto`} onClick={copy} title="Copy a task for a developer or copywriter">
        {copied ? "Copied" : "Copy task"}
      </button>
      {error && <span className="w-full text-red-600">{error}</span>}
    </div>
  );
}
