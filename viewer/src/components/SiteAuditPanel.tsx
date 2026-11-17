import { useState } from "react";
import type { AuditCounts, AuditRow, AuditSeverity, AuditWhere, SiteAudit, TemplateIssue } from "../types.js";
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

const pretty = (s: string) => s.replace(/_/g, " ");
const ITEMS_SHOWN = 30;
const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";

/** A few plain sentences under a block's title. The text comes from config/checks.json (Settings, Check texts). */
export function Hint({ text }: { text: string | undefined }) {
  return text ? <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">{text}</p> : null;
}

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

/** What changed since the previous snapshot: green is fixed, red is new. */
function Change({ row }: { row: AuditRow }) {
  if (!row.change) return null;
  return (
    <span className="ml-2 whitespace-nowrap text-xs tabular-nums">
      {row.change.added > 0 && <span className="text-red-600 dark:text-red-400">▲ {row.change.added} new</span>}
      {row.change.fixed > 0 && <span className="ml-1.5 text-emerald-600 dark:text-emerald-400">▼ {row.change.fixed} fixed</span>}
    </span>
  );
}

/** One check: its result in a line, and on click why it matters, how to fix it and which pages fail. */
function CheckRow({ row, showChange }: { row: AuditRow; showChange: boolean }) {
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
          {showChange && <Change row={row} />}
          {failing && row.by_profile.some((p) => p.failing > 0) && (
            <span className="ml-2 text-xs text-slate-500">
              {row.by_profile
                .filter((p) => p.failing > 0)
                .slice(0, 4)
                .map((p) => `${pretty(p.profile)} ${p.failing}`)
                .join(", ")}
              {row.by_profile.filter((p) => p.failing > 0).length > 4 ? ", …" : ""}
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
                    {it.profile && <span className="text-slate-400">{pretty(it.profile)}</span>}
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

function Group({ title, blurb, rows, defaultOpen, showChange }: { title: string; blurb: string; rows: AuditRow[]; defaultOpen: boolean; showChange: boolean }) {
  const failing = rows.filter((r) => r.status === "fail");
  const passed = rows.filter((r) => r.status !== "fail");
  const [showPassed, setShowPassed] = useState(false);
  const worst = (["high", "medium", "low"] as AuditSeverity[]).find((s) => failing.some((r) => r.severity === s));
  return (
    <details open={defaultOpen} className="rounded border border-slate-200 dark:border-slate-700">
      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-slate-500">{failing.length ? `${failing.length} of ${rows.length} checks fail` : `all ${rows.length} checks pass`}</span>
        {worst && <SeverityBadge severity={worst} />}
        <span className="w-full text-xs text-slate-500">{blurb}</span>
      </summary>
      <div className="border-t border-slate-200 dark:border-slate-700">
        {failing.map((r) => (
          <CheckRow key={r.id} row={r} showChange={showChange} />
        ))}
        {passed.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700">
            <button type="button" className="w-full px-3 py-2 text-left text-sm text-emerald-700 hover:bg-slate-50 dark:text-emerald-400 dark:hover:bg-slate-800/60" onClick={() => setShowPassed(!showPassed)}>
              {showPassed ? "Hide" : "Show"} {passed.length} passing {passed.length === 1 ? "check" : "checks"}
            </button>
            {showPassed && passed.map((r) => <CheckRow key={r.id} row={r} showChange={showChange} />)}
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

const dateOf = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** The top of the Site page: what the snapshot covers, the verdict per layer, what to fix first. */
export function AuditSummary({ audit }: { audit: SiteAudit }) {
  const { summary, coverage, previous } = audit;
  const t = summary.template;
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
      {previous && (
        <p className="text-sm">
          <b>Since the snapshot of {dateOf(previous.started_at)}:</b>{" "}
          {previous.fixed + previous.added + previous.checks_cleared + previous.checks_broken === 0 ? (
            <span>nothing changed.</span>
          ) : (
            <>
              <span className="text-emerald-700 dark:text-emerald-400">{previous.fixed} failures fixed</span>,{" "}
              <span className={previous.added ? "text-red-600 dark:text-red-400" : ""}>{previous.added} new</span>
              {previous.checks_cleared > 0 && <span>; {previous.checks_cleared} checks now pass</span>}
              {previous.checks_broken > 0 && <span>; {previous.checks_broken} checks now fail</span>}
              <span className="text-slate-500"> (pages checked in both snapshots only).</span>
            </>
          )}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <LayerCard name="SEO" c={summary.seo} />
        <LayerCard name="GEO (code checks)" c={summary.geo} />
        <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Template text (model)</div>
          {t.checked ? (
            <>
              <div className="mt-1 text-2xl">
                <Counts high={t.high} medium={t.medium} low={t.low} />
              </div>
              <div className="text-xs text-slate-500">high / medium / low problems</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {t.issues.length} different problems in banners, forms and site-wide markup ({t.findings} findings).
              </div>
            </>
          ) : (
            <>
              <div className="mt-1 text-2xl text-slate-400">not checked</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Use “Check shared blocks with the model” at the top.</div>
            </>
          )}
        </div>
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
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Fix first</h3>
          <Hint text={audit.blocks.fix_first} />
          <ol className="space-y-1.5 pt-1 text-sm">
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
        <b>Not covered here:</b> {summary.not_checked.join("; ")}.
      </div>
    </div>
  );
}

const BASIS_LABELS: Record<string, string> = {
  "contradicts sources": "contradicts the documents",
  "not in sources": "not in the documents",
  "term list": "term the company does not use",
};

function IssueCard({ i }: { i: TemplateIssue }) {
  return (
    <li className="rounded border border-slate-200 p-3 text-sm dark:border-slate-700">
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={i.severity} />
        <span className="font-medium">{i.title}</span>
        {i.basis && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{BASIS_LABELS[i.basis] ?? i.basis}</span>}
        <span className="ml-auto text-xs text-slate-500">{i.pages} pages</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Where: {i.places.join(", ")}</p>
      {i.quote && <blockquote className="mt-2 border-l-2 border-slate-300 pl-2 text-slate-700 dark:border-slate-600 dark:text-slate-300">{i.quote}</blockquote>}
      {i.issue && <p className="mt-2">{i.issue}</p>}
      {i.fix && (
        <p className="mt-1">
          <b>Fix.</b> {i.fix}
        </p>
      )}
      {i.rule && <p className="mt-1 text-xs text-slate-500">Rule: {i.rule}</p>}
    </li>
  );
}

/** What the model found in the texts that repeat across pages, each problem once with every place it appears. */
export function TemplateIssues({ audit }: { audit: SiteAudit }) {
  const t = audit.summary.template;
  if (!t.checked) {
    return <p className="rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800/40">Not checked yet: an empty list below does not mean there are no problems. Use “Check shared blocks with the model” at the top of the page.</p>;
  }
  return (
    <div className="space-y-2">
      <p className="text-sm">
        <b>{t.findings}</b> findings are <b>{t.issues.length}</b> different problems: {t.high} high, {t.medium} medium, {t.low} low. The cards under it show the same findings banner by banner, where you can mark decisions.
      </p>
      <ul className="space-y-2">
        {t.issues.map((i) => (
          <IssueCard key={`${i.kind}-${i.title}`} i={i} />
        ))}
      </ul>
    </div>
  );
}

interface Filters {
  sev: "all" | AuditSeverity;
  layer: "all" | "seo" | "geo";
  profile: string;
  hidePassing: boolean;
  query: string;
}

const NO_FILTER: Filters = { sev: "all", layer: "all", profile: "all", hidePassing: false, query: "" };

/** The row as the filters see it: for one page type only that type's pages count. `null` hides the row. */
function applyFilters(row: AuditRow, f: Filters): AuditRow | null {
  if (f.sev !== "all" && row.severity !== f.sev) return null;
  if (f.layer !== "all" && row.layer !== f.layer) return null;
  const q = f.query.trim().toLowerCase();
  if (q && !`${row.title} ${row.id} ${row.why}`.toLowerCase().includes(q)) return null;
  let r = row;
  if (f.profile !== "all") {
    // site-only checks and checks that do not apply to this page type have no numbers for it
    const p = row.by_profile.find((x) => x.profile === f.profile);
    if (!p) return null;
    const items = row.items.filter((it) => it.profile === f.profile || it.profiles?.includes(f.profile));
    r = { ...row, failing: p.failing, total: p.total, places: p.failing, items, more: 0, by_profile: [p], status: row.status === "not_checked" ? row.status : p.failing ? "fail" : "ok", change: undefined };
  }
  if (f.hidePassing && r.status !== "fail") return null;
  return r;
}

/** Every check of the snapshot, by group: failing checks open to their pages, passing ones folded. */
export function AuditGroups({ audit }: { audit: SiteAudit }) {
  const [f, setF] = useState<Filters>(NO_FILTER);
  // groups open by their own rule until a button forces them; the counter remounts the groups
  const [expand, setExpand] = useState<{ mode: "auto" | "all" | "none"; n: number }>({ mode: "auto", n: 0 });
  const filtered = f.sev !== "all" || f.layer !== "all" || f.profile !== "all" || f.hidePassing || f.query.trim() !== "";
  const visible = audit.rows.map((r) => applyFilters(r, f)).filter((r): r is AuditRow => r !== null);
  const set = (patch: Partial<Filters>) => setF({ ...f, ...patch });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <select className={field} value={f.sev} onChange={(e) => set({ sev: e.target.value as Filters["sev"] })} aria-label="Severity">
          <option value="all">Any severity</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className={field} value={f.layer} onChange={(e) => set({ layer: e.target.value as Filters["layer"] })} aria-label="Layer">
          <option value="all">SEO and GEO</option>
          <option value="seo">SEO</option>
          <option value="geo">GEO</option>
        </select>
        <select className={field} value={f.profile} onChange={(e) => set({ profile: e.target.value })} aria-label="Page type">
          <option value="all">All page types</option>
          {audit.profiles.map((p) => (
            <option key={p.profile} value={p.profile}>
              {pretty(p.profile)} ({p.pages})
            </option>
          ))}
        </select>
        <input className={`${field} w-48`} placeholder="Search checks" value={f.query} onChange={(e) => set({ query: e.target.value })} aria-label="Search checks" />
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={f.hidePassing} onChange={(e) => set({ hidePassing: e.target.checked })} /> Hide passing
        </label>
        <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setExpand({ mode: "all", n: expand.n + 1 })}>
          Open all groups
        </button>
        <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setExpand({ mode: "none", n: expand.n + 1 })}>
          Close all
        </button>
        {filtered && (
          <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setF(NO_FILTER)}>
            Reset filters
          </button>
        )}
        <span className="text-slate-500">
          {visible.length} of {audit.rows.length} checks
        </span>
      </div>
      {f.profile !== "all" && <p className="text-xs text-slate-500">Showing only {pretty(f.profile)} pages. Checks that exist for the whole site (robots.txt, sitemap, llms.txt) are hidden. The summary above stays for the whole site.</p>}
      {audit.groups.map((g) => {
        const rows = visible.filter((r) => r.group === g.key);
        if (!rows.length) return null;
        const auto = !g.apart && rows.some((r) => r.status === "fail");
        return <Group key={`${g.key}-${expand.n}`} title={g.title} blurb={g.blurb} rows={rows} defaultOpen={expand.mode === "all" ? true : expand.mode === "none" ? false : auto} showChange={f.profile === "all"} />;
      })}
      {visible.length === 0 && <p className="text-sm text-slate-500">No check matches these filters.</p>}
    </div>
  );
}
