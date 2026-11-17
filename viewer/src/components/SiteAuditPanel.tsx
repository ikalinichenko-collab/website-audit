import { useState } from "react";
import type { AuditCounts, AuditRow, AuditSeverity, AuditWhere, SiteAudit } from "../types.js";
import { Counts, SeverityBadge } from "./Badges.js";

/** Same words as `FIX_WHERE_LABELS` in src/findings.ts. */
const WHERE_LABELS: Record<AuditWhere, string> = {
  template: "Site template and settings",
  page: "Each page",
  author: "Author profile",
};

const short = (u: string) => {
  try {
    const x = new URL(u);
    return x.pathname + x.search || "/";
  } catch {
    return u;
  }
};

const ITEMS_SHOWN = 30;

function Dot({ row }: { row: AuditRow }) {
  const cls =
    row.status === "ok"
      ? "bg-emerald-500"
      : row.status === "not_checked"
        ? "bg-slate-300 dark:bg-slate-600"
        : row.severity === "high"
          ? "bg-red-500"
          : row.severity === "medium"
            ? "bg-amber-500"
            : "bg-slate-400";
  return <span className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${cls}`} />;
}

function share(row: AuditRow): string {
  if (row.status === "not_checked") return "not checked";
  return `${row.failing} of ${row.total}`;
}

/** One check: its result in a line, and on click why it matters, how to fix it and which pages fail. */
function CheckRow({ row }: { row: AuditRow }) {
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const failing = row.status === "fail";
  const items = all ? row.items : row.items.slice(0, ITEMS_SHOWN);
  return (
    <div className="border-t border-slate-200 first:border-t-0 dark:border-slate-700">
      <button type="button" className="flex w-full items-start gap-3 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60" onClick={() => setOpen(!open)} aria-expanded={open}>
        <Dot row={row} />
        <span className="min-w-0 flex-1">
          <span className="font-medium">{row.title}</span>
          {failing && row.by_profile.length > 0 && (
            <span className="ml-2 text-xs text-slate-500">
              {row.by_profile
                .slice(0, 4)
                .map((p) => `${p.profile.replace(/_/g, " ")} ${p.failing}`)
                .join(", ")}
              {row.by_profile.length > 4 ? ", …" : ""}
            </span>
          )}
          {!failing && row.note && <span className="ml-2 text-xs text-slate-500">{row.note}</span>}
        </span>
        <span className={`shrink-0 text-sm tabular-nums ${failing ? "font-medium" : "text-slate-500"}`}>{share(row)}</span>
        <span className="w-16 shrink-0 text-right">{failing && <SeverityBadge severity={row.severity} />}</span>
      </button>
      {open && (
        <div className="space-y-2 bg-slate-50 px-9 py-3 text-sm dark:bg-slate-800/40">
          {row.why && (
            <p>
              <b>Why it matters.</b> {row.why}
            </p>
          )}
          {failing && row.fix && (
            <p>
              <b>How to fix.</b> {row.fix} <span className="text-slate-500">Edit in: {WHERE_LABELS[row.where]}.</span>
            </p>
          )}
          {row.note && failing && <p className="text-slate-600 dark:text-slate-400">{row.note}</p>}
          {failing && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {row.id === "robots_ai_bots" || row.id === "llms_txt" ? "Problem" : "Pages"} ({row.failing}
                {row.places > row.failing ? `, ${row.places} places` : ""})
              </p>
              <ul className="space-y-0.5 text-xs">
                {items.map((it, i) => (
                  <li key={`${it.url}-${i}`} className="flex flex-wrap gap-x-2">
                    {/^https?:/.test(it.url) ? (
                      <a href={it.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                        {short(it.url)}
                      </a>
                    ) : (
                      <span>{it.url}</span>
                    )}
                    {it.urls && it.urls.length > 1 && <span className="text-slate-500">+ {it.urls.slice(1).map(short).join(", ")}</span>}
                    {it.profile && <span className="text-slate-400">{it.profile.replace(/_/g, " ")}</span>}
                    <span className="text-slate-500">{it.value}</span>
                  </li>
                ))}
              </ul>
              {row.items.length > ITEMS_SHOWN && !all && (
                <button type="button" className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400" onClick={() => setAll(true)}>
                  Show all {row.items.length}
                </button>
              )}
              {row.more > 0 && <p className="mt-1 text-xs text-slate-500">{row.more} more not listed.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Group({ title, blurb, rows, defaultOpen }: { title: string; blurb: string; rows: AuditRow[]; defaultOpen: boolean }) {
  const failing = rows.filter((r) => r.status === "fail");
  const passed = rows.filter((r) => r.status !== "fail");
  const [showPassed, setShowPassed] = useState(false);
  const worst = (["high", "medium", "low"] as AuditSeverity[]).find((s) => failing.some((r) => r.severity === s));
  return (
    <details open={defaultOpen} className="rounded border border-slate-200 dark:border-slate-700">
      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-slate-500">
          {failing.length ? `${failing.length} of ${rows.length} checks fail` : `all ${rows.length} checks pass`}
        </span>
        {worst && <SeverityBadge severity={worst} />}
        <span className="w-full text-xs text-slate-500">{blurb}</span>
      </summary>
      <div className="border-t border-slate-200 dark:border-slate-700">
        {failing.map((r) => (
          <CheckRow key={r.id} row={r} />
        ))}
        {passed.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700">
            <button type="button" className="w-full px-3 py-2 text-left text-sm text-emerald-700 hover:bg-slate-50 dark:text-emerald-400 dark:hover:bg-slate-800/60" onClick={() => setShowPassed(!showPassed)}>
              {showPassed ? "Hide" : "Show"} {passed.length} passing {passed.length === 1 ? "check" : "checks"}
            </button>
            {showPassed && passed.map((r) => <CheckRow key={r.id} row={r} />)}
          </div>
        )}
      </div>
    </details>
  );
}

function LayerCard({ name, c }: { name: string; c: AuditCounts }) {
  const failing = c.high + c.medium + c.low;
  return (
    <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
      <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">{name}</div>
      <div className="mt-1 text-2xl">
        <Counts high={c.high} medium={c.medium} low={c.low} />
      </div>
      <div className="text-xs text-slate-500">high / medium / low checks failing</div>
      <div className="mt-2 text-sm">
        <b>{c.ok}</b> of {c.total} checks pass{failing === 0 ? ": nothing to fix" : ""}
      </div>
    </div>
  );
}

/** The top of the Site page: what the snapshot covers, the verdict per layer, what to fix first. */
export function AuditSummary({ audit }: { audit: SiteAudit }) {
  const { summary, coverage } = audit;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        <b>{audit.pages}</b> pages checked
        {coverage.sitemap_urls != null && (
          <>
            {" "}
            of <b>{coverage.sitemap_urls}</b> URLs in the sitemap
            {coverage.outside_scope ? `, ${coverage.outside_scope} outside the scope are not audited` : ", all of them in scope"}
          </>
        )}
        . Every check below ran on every page it applies to.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <LayerCard name="SEO" c={summary.seo} />
        <LayerCard name="GEO (code checks)" c={summary.geo} />
        <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Writing style</div>
          <div className="mt-1 text-2xl tabular-nums">{summary.style.places}</div>
          <div className="text-xs text-slate-500">places on {summary.style.pages} pages</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {summary.style.failing} of {summary.style.checks} style rules broken. Not counted in SEO or GEO.
          </div>
        </div>
      </div>
      {summary.first.length > 0 && (
        <div>
          <h3 className="mb-1 text-sm font-semibold">Fix first</h3>
          <ol className="space-y-1.5 text-sm">
            {summary.first.map((f, i) => (
              <li key={f.id} className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-5 text-slate-400">{i + 1}.</span>
                <SeverityBadge severity={f.severity} />
                <span className="font-medium">{f.title}</span>
                <span className="text-slate-500">
                  fails on {f.failing} of {f.total}. {f.fix} Edit in: {WHERE_LABELS[f.where]}.
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="text-sm text-slate-500">
        <b>Not checked here:</b> {summary.not_checked.join("; ")}.
      </div>
    </div>
  );
}

/** Every check of the snapshot, by group: failing checks open to their pages, passing ones folded. */
export function AuditGroups({ audit }: { audit: SiteAudit }) {
  return (
    <div className="space-y-3">
      {audit.groups.map((g) => {
        const rows = audit.rows.filter((r) => r.group === g.key);
        if (!rows.length) return null;
        return <Group key={g.key} title={g.title} blurb={g.blurb} rows={rows} defaultOpen={!g.apart && rows.some((r) => r.status === "fail")} />;
      })}
    </div>
  );
}
