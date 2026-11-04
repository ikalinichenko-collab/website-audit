const pill = "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset capitalize";

const ACTION_CLASS: Record<string, string> = {
  rewrite: "bg-red-100 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-200 dark:ring-red-900",
  needs_decision: "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:ring-purple-800",
  fix: "bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800",
  keep: "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800",
  not_checked: "bg-slate-200 text-slate-800 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600",
};

export function ActionBadge({ action }: { action: string }) {
  return <span className={`${pill} ${ACTION_CLASS[action] ?? ACTION_CLASS.not_checked}`}>{action.replace(/_/g, " ")}</span>;
}

const SEV_CLASS: Record<string, string> = {
  high: "bg-red-100 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-200 dark:ring-red-900",
  medium: "bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800",
  low: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600",
};

export function SeverityBadge({ severity }: { severity: string }) {
  if (!severity) return null;
  return <span className={`${pill} ${SEV_CLASS[severity]}`}>{severity}</span>;
}

export function Counts({ high, medium, low, off }: { high: number; medium: number; low: number; off?: boolean }) {
  if (off) return <span className="text-xs text-slate-400 dark:text-slate-500">off</span>;
  const cls = (n: number, c: string) => (n === 0 ? "text-slate-400 dark:text-slate-500" : c);
  return (
    <span className="tabular-nums">
      <span className={cls(high, "font-medium text-red-600 dark:text-red-400")}>{high}</span>
      <span className="text-slate-300"> / </span>
      <span className={cls(medium, "font-medium text-amber-600 dark:text-amber-400")}>{medium}</span>
      <span className="text-slate-300"> / </span>
      <span className={cls(low, "")}>{low}</span>
    </span>
  );
}
