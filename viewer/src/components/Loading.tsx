/** A grey placeholder while a screen loads, instead of the bare word "Loading...". */
export function Loading({ rows = 3 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse space-y-3">
      <div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-4 rounded bg-slate-100 dark:bg-slate-800/70" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}
