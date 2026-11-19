import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api.js";
import { Help } from "../components/Help.js";
import { Loading } from "../components/Loading.js";
import { SeverityBadge } from "../components/Badges.js";
import { buttonClass } from "../components/ResourceEditor.js";
import { LAYER_CHIP, LAYER_TAG } from "../components/ReportParts.js";
import { LAYER_LABELS } from "../labels.js";
import type { FindingStatus, Layer, TaskItem } from "../types.js";

/** One page's share of a problem. */
interface PageBit {
  slug: string;
  title: string;
  group: string;
  subsection: string;
  items: TaskItem[];
}

/** A problem as the list shows it: the same problem (layer, check, title, wording) on one page or on several, with its places. */
interface Problem {
  key: string;
  layer: Layer;
  severity: string;
  title: string;
  issue: string;
  fix: string;
  basis?: TaskItem["basis"];
  items: TaskItem[];
  pages: PageBit[];
  /** the decision shared by every place of the problem; none while any place is open or the places differ */
  status?: FindingStatus;
  isNew: boolean;
  reopened: boolean;
}

const SEV_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };
const STATUS_LABEL: Record<FindingStatus, string> = { accepted: "Accepted", false_positive: "False positive", fixed: "Fixed" };
const STATUS_CLASS: Record<FindingStatus, string> = {
  accepted: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  false_positive: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  fixed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};
const EDGE: Record<string, string> = { high: "border-l-red-500", medium: "border-l-amber-500", low: "border-l-slate-400" };
const LAYERS: Layer[] = ["compliance", "geo", "seo"];

const when = (iso: string) => new Date(iso).toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function buildProblems(items: TaskItem[]): Problem[] {
  const m = new Map<string, TaskItem[]>();
  for (const t of items) {
    const key = `${t.layer}|${t.kind}|${t.title}|${t.issue}`;
    m.set(key, [...(m.get(key) ?? []), t]);
  }
  return [...m.entries()]
    .map(([key, list]) => {
      const f = list[0]!;
      const bySlug = new Map<string, PageBit>();
      for (const t of list) {
        const bit = bySlug.get(t.slug) ?? { slug: t.slug, title: t.page_title, group: t.group, subsection: t.subsection, items: [] };
        bit.items.push(t);
        bySlug.set(t.slug, bit);
      }
      const first = f.status;
      return {
        key,
        layer: f.layer,
        severity: f.severity,
        title: f.title,
        issue: f.issue,
        fix: f.fix,
        ...(f.basis ? { basis: f.basis } : {}),
        items: list,
        pages: [...bySlug.values()],
        ...(first && list.every((x) => x.status === first) ? { status: first } : {}),
        isNew: list.every((x) => x.change === "new"),
        reopened: list.some((x) => x.reopened),
      } as Problem;
    })
    .sort((a, b) => (SEV_RANK[a.severity] ?? 3) - (SEV_RANK[b.severity] ?? 3) || b.items.length - a.items.length || a.title.localeCompare(b.title));
}

/** "structured data, hero, 4 more": where the places are, in a few words. */
function whereText(items: TaskItem[]): string {
  const names = [...new Set(items.map((i) => i.zone_label || i.zone_id).filter(Boolean))];
  return names.length <= 2 ? names.join(", ") : `${names.slice(0, 2).join(", ")}, ${names.length - 2} more`;
}

/** The checked pages' problems with a decision for each: open, accepted, false positive or fixed. */
export function Tasks() {
  const [items, setItems] = useState<TaskItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await api.tasks());
      setError(null);
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const status = params.get("status") ?? "open";
  const sev = params.get("sev") ?? "";
  const pageFilter = params.get("page") ?? "";
  const mine = params.get("mine") === "1";
  const q = (params.get("q") ?? "").toLowerCase().trim();
  const view = params.get("view") === "page" ? "page" : "priority";
  const layerParam = params.get("layers");
  const layers = new Set<Layer>(layerParam ? (layerParam.split(",").filter((l) => LAYERS.includes(l as Layer)) as Layer[]) : LAYERS);

  function set(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  function toggleLayer(l: Layer) {
    const next = new Set(layers);
    if (next.has(l)) next.delete(l);
    else next.add(l);
    set("layers", next.size === LAYERS.length || next.size === 0 ? "" : [...next].join(","));
  }

  // everything, for the numbers on top; the filters narrow the list below
  const all = useMemo(() => buildProblems(items ?? []), [items]);
  const stats = useMemo(() => {
    const open = all.filter((p) => !p.status);
    return {
      open: open.length,
      high: open.filter((p) => p.severity === "high").length,
      accepted: all.filter((p) => p.status === "accepted").length,
      false_positive: all.filter((p) => p.status === "false_positive").length,
      fixed: all.filter((p) => p.status === "fixed").length,
    };
  }, [all]);
  const closed = stats.accepted + stats.false_positive + stats.fixed;

  const pagesList = useMemo(() => [...new Map((items ?? []).map((t) => [t.slug, t.page_title])).entries()], [items]);

  const shown = useMemo(() => {
    let l = items ?? [];
    l = l.filter((t) => layers.has(t.layer));
    if (sev) l = l.filter((t) => t.severity === sev);
    if (pageFilter) l = l.filter((t) => t.slug === pageFilter);
    if (mine) l = l.filter((t) => t.mine);
    const keep = (p: Problem) =>
      (status === "all" || (status === "open" ? !p.status : status === "closed" ? !!p.status : p.status === status)) &&
      (!q || `${p.title} ${p.issue} ${p.fix} ${p.pages.map((x) => x.title).join(" ")}`.toLowerCase().includes(q));
    if (view === "page") {
      const bySlug = new Map<string, TaskItem[]>();
      for (const t of l) bySlug.set(t.slug, [...(bySlug.get(t.slug) ?? []), t]);
      return {
        priority: [] as Problem[],
        pages: [...bySlug.entries()].map(([slug, list]) => ({ slug, title: list[0]!.page_title, problems: buildProblems(list).filter(keep) })).filter((p) => p.problems.length),
      };
    }
    return { priority: buildProblems(l).filter(keep), pages: [] as { slug: string; title: string; problems: Problem[] }[] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, layerParam, sev, pageFilter, mine, q, status, view]);

  const visible = view === "page" ? shown.pages.flatMap((p) => p.problems) : shown.priority;
  const layerCount = (l: Layer) => buildProblems((items ?? []).filter((t) => t.layer === l)).filter((p) => !p.status).length;

  /** Saves one decision for every place of the given problems: one request per page, as decisions are kept per page. */
  async function decide(problems: Problem[], to: FindingStatus | null, withNote: string) {
    setBusy(true);
    setMsg(null);
    try {
      for (const p of problems) for (const bit of p.pages) await api.setFindingStatus(null, bit.slug, [...new Set(bit.items.map((i) => i.fid))], to, withNote);
      setSelected(new Set());
      setNote("");
      await load();
    } catch (e) {
      setMsg(String(e instanceof Error ? e.message : e));
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!items) return <Loading />;
  if (items.length === 0) {
    return (
      <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-lg font-semibold">No tasks yet</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">Tasks are the problems found on the pages you checked. Check a page first and they appear here.</p>
        <Link to="/add" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Add pages
        </Link>
      </div>
    );
  }

  const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";
  const selectedProblems = visible.filter((p) => selected.has(p.key));
  const stat = (label: string, n: number, st: string, extra = "", sevKey = "") => {
    const on = status === st && sev === sevKey;
    return (
      <button
        type="button"
        onClick={() => {
          const next = new URLSearchParams(params);
          next.set("status", st);
          if (sevKey) next.set("sev", sevKey);
          else next.delete("sev");
          if (st === "open" && !sevKey) next.delete("status");
          setParams(next, { replace: true });
        }}
        className={`rounded-lg border bg-white p-3 text-left hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 ${on ? "border-blue-600 ring-2 ring-blue-600" : "border-slate-200 dark:border-slate-700"}`}
      >
        <div className={`text-2xl font-bold tracking-tight ${extra}`}>{n}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </button>
    );
  };

  /** Rows of one problem: tick, severity, what and where, how many places, the decision buttons. */
  const row = (p: Problem) => {
    const done = !!p.status;
    const by = p.items.find((i) => i.status_by)?.status_by;
    const at = p.items.find((i) => i.status_at)?.status_at;
    const noteText = p.items.find((i) => i.status_note)?.status_note;
    const first = p.pages[0]!;
    const many = p.pages.length > 1;
    const expanded = open.has(p.key);
    const places = p.items.length;
    return (
      <article key={p.key} className={`rounded-lg border border-l-4 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 ${EDGE[p.severity] ?? EDGE.low} ${done ? "opacity-70" : ""}`}>
        <div className="grid items-start gap-x-3 gap-y-2 px-3 py-2.5 lg:grid-cols-[1.5rem_5rem_minmax(0,1fr)_11rem_auto]">
          {done ? (
            <span />
          ) : (
            <input
              type="checkbox"
              aria-label={`Select ${p.title}`}
              className="mt-1"
              checked={selected.has(p.key)}
              onChange={(e) =>
                setSelected((cur) => {
                  const next = new Set(cur);
                  if (e.target.checked) next.add(p.key);
                  else next.delete(p.key);
                  return next;
                })
              }
            />
          )}
          <div>{done ? <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[p.status!]}`}>{STATUS_LABEL[p.status!]}</span> : <SeverityBadge severity={p.severity} />}</div>
          <div className="min-w-0">
            <div className={`font-semibold ${done ? "line-through decoration-slate-400" : ""}`}>
              <span className={`mr-1.5 rounded px-1.5 py-0.5 align-[1px] text-[11px] font-bold ${LAYER_TAG[p.layer]}`}>{LAYER_LABELS[p.layer]}</span>
              {p.title}
              {p.isNew && <span className="ml-2 rounded bg-violet-100 px-1.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">New</span>}
              {p.reopened && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">Found again</span>}
            </div>
            <div className="text-xs text-slate-500">
              {many ? (
                <>
                  <b className="text-slate-800 dark:text-slate-200">{p.pages.length} pages</b> · same problem on all of them
                </>
              ) : (
                <>
                  {first.title} · {first.group} / {first.subsection}
                </>
              )}
              {p.basis === "not in sources" && <span className="ml-2 font-semibold text-violet-700 dark:text-violet-300">not in the documents: confirm with its owner</span>}
            </div>
            {done ? (
              <div className="mt-0.5 text-xs text-slate-500">
                marked {STATUS_LABEL[p.status!].toLowerCase()}
                {by ? ` by ${by}` : ""}
                {at ? ` on ${when(at)}` : ""}
                {noteText ? ` · “${noteText}”` : ""}
              </div>
            ) : (
              p.fix && (
                <p className="mt-0.5 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  <b>What to do:</b> {p.fix}
                </p>
              )
            )}
          </div>
          <div className="text-sm">
            {plural(places, "place", "places")}
            {many ? " in total" : ""}
            <div className="text-xs text-slate-500">
              {many ? (
                <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setOpen((cur) => { const n = new Set(cur); if (n.has(p.key)) n.delete(p.key); else n.add(p.key); return n; })}>
                  {expanded ? "▾ hide the pages" : "▸ show the pages"}
                </button>
              ) : (
                whereText(p.items)
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {done ? (
              <button type="button" className={buttonClass} disabled={busy} onClick={() => void decide([p], null, "")}>
                Reopen
              </button>
            ) : (
              <>
                <button type="button" className={buttonClass} disabled={busy} onClick={() => void decide([p], "accepted", "")} title="Known and kept as it is">
                  {many ? "Accept all" : "Accept"}
                </button>
                <button type="button" className={buttonClass} disabled={busy} onClick={() => void decide([p], "false_positive", "")} title="The audit is wrong here">
                  False positive
                </button>
                <button type="button" className={buttonClass} disabled={busy} onClick={() => void decide([p], "fixed", "")} title="Changed on the site">
                  Fixed
                </button>
              </>
            )}
            {!many && (
              <Link to={`/pages/${encodeURIComponent(first.slug)}?focus=${encodeURIComponent(first.items[0]!.fid)}`} className="px-1 text-sm text-blue-600 hover:underline dark:text-blue-400">
                Open page ›
              </Link>
            )}
          </div>
        </div>
        {many && expanded && (
          <div className="space-y-1 rounded-b-lg border-t border-slate-200 bg-slate-50 py-2 pl-3 pr-3 dark:border-slate-700 dark:bg-slate-800/40 lg:pl-[7.25rem]">
            {p.pages.map((bit) => {
              const pp = buildProblems(bit.items)[0]!;
              return (
                <div key={bit.slug} className="grid items-center gap-x-3 gap-y-1 text-sm lg:grid-cols-[minmax(0,1fr)_8rem_auto]">
                  <span className="min-w-0 truncate">{bit.title}</span>
                  <span className="text-xs text-slate-500">{plural(bit.items.length, "place", "places")}</span>
                  <span className="flex flex-wrap items-center justify-end gap-1.5">
                    {pp.status ? (
                      <>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_CLASS[pp.status]}`}>{STATUS_LABEL[pp.status]}</span>
                        <button type="button" className={buttonClass} disabled={busy} onClick={() => void decide([{ ...pp }], null, "")}>
                          Reopen
                        </button>
                      </>
                    ) : (
                      (["accepted", "false_positive", "fixed"] as FindingStatus[]).map((s) => (
                        <button key={s} type="button" className={buttonClass} disabled={busy} onClick={() => void decide([pp], s, "")}>
                          {s === "accepted" ? "Accept" : STATUS_LABEL[s]}
                        </button>
                      ))
                    )}
                    <Link to={`/pages/${encodeURIComponent(bit.slug)}?focus=${encodeURIComponent(bit.items[0]!.fid)}`} className="px-1 text-blue-600 hover:underline dark:text-blue-400">
                      Open ›
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </article>
    );
  };

  /** Priority view: a block per severity, each with its problems. */
  const blocks = (["high", "medium", "low"] as const).map((s) => ({ s, list: shown.priority.filter((p) => p.severity === s) })).filter((b) => b.list.length);

  return (
    <div className="space-y-4 pb-24">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <Help id="tasks" title="How to use this list">
          <p>Everything found on the pages you checked, most serious first. Mark what you decided: accepted (known, kept as it is), false positive (the audit is wrong here) or fixed (changed on the site).</p>
          <p>Decisions are kept per finding, so they stay when a page is checked again. A problem marked fixed shows up again, as “Found again”, if a later check still finds it.</p>
          <p>The same problem on several pages is one row: decide for all pages at once, or open the row and decide page by page.</p>
        </Help>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stat("Open", stats.open, "open", "text-red-600 dark:text-red-400")}
        {stat("High, still open", stats.high, "open", "", "high")}
        {stat("Accepted", stats.accepted, "accepted")}
        {stat("False positive", stats.false_positive, "false_positive")}
        {stat("Fixed", stats.fixed, "fixed", "text-emerald-600 dark:text-emerald-400")}
      </div>
      <div>
        <div className="flex h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-hidden>
          <i className="bg-emerald-500" style={{ width: `${(stats.fixed / all.length) * 100}%` }} />
          <i className="bg-slate-400" style={{ width: `${(stats.accepted / all.length) * 100}%` }} />
          <i className="bg-violet-300" style={{ width: `${(stats.false_positive / all.length) * 100}%` }} />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {closed} of {all.length} problems closed · {stats.fixed} fixed, {stats.accepted} accepted, {stats.false_positive} false positive
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900">
        <div className="inline-flex overflow-hidden rounded border border-slate-300 dark:border-slate-600" role="group" aria-label="Status">
          {[
            ["open", "Open"],
            ["closed", "Closed"],
            ["all", "All"],
          ].map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                const next = new URLSearchParams(params);
                if (v === "open") next.delete("status");
                else next.set("status", v!);
                next.delete("sev");
                setParams(next, { replace: true });
              }}
              className={`px-2.5 py-1 text-xs ${status === v ? "bg-blue-600 font-semibold text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {LAYERS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => toggleLayer(l)}
            aria-pressed={layers.has(l)}
            className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${layers.has(l) ? LAYER_CHIP[l].on : LAYER_CHIP[l].off}`}
          >
            {LAYER_LABELS[l]} {layerCount(l)}
          </button>
        ))}
        <select className={field} value={sev} onChange={(e) => set("sev", e.target.value)} aria-label="Severity">
          <option value="">Any severity</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className={field} value={pageFilter} onChange={(e) => set("page", e.target.value)} aria-label="Page">
          <option value="">All pages ({pagesList.length})</option>
          {pagesList.map(([slug, title]) => (
            <option key={slug} value={slug}>
              {title.slice(0, 70)}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={mine} onChange={(e) => set("mine", e.target.checked ? "1" : "")} />
          Mine
        </label>
        <span className="flex-1" />
        <input className={`${field} w-56`} placeholder="Search problems" value={params.get("q") ?? ""} onChange={(e) => set("q", e.target.value)} />
        <div className="inline-flex overflow-hidden rounded border border-slate-300 dark:border-slate-600" role="group" aria-label="Group by">
          {[
            ["priority", "Priority"],
            ["page", "By page"],
          ].map(([v, label]) => (
            <button key={v} type="button" onClick={() => set("view", v === "priority" ? "" : v!)} className={`px-2.5 py-1 text-xs ${view === v ? "bg-blue-600 font-semibold text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {msg && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{msg}</p>}

      {visible.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-600">
          {status === "open" && !sev && !q ? "Nothing open with these filters. Everything found is decided." : "Nothing matches these filters."}
        </p>
      )}

      {view === "priority" ? (
        status === "open" ? (
          blocks.map((b) => (
            <section key={b.s} className="space-y-2">
              <h2 className="flex items-baseline gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                {b.s}
                <span className="font-normal normal-case">{plural(b.list.length, "problem", "problems")}</span>
              </h2>
              {b.list.map(row)}
            </section>
          ))
        ) : (
          <div className="space-y-2">{shown.priority.map(row)}</div>
        )
      ) : (
        shown.pages.map((pg) => (
          <section key={pg.slug} className="space-y-2">
            <h2 className="flex items-baseline gap-2 text-sm font-semibold">
              <Link to={`/pages/${encodeURIComponent(pg.slug)}`} className="text-blue-600 hover:underline dark:text-blue-400">
                {pg.title}
              </Link>
              <span className="text-xs font-normal text-slate-500">{plural(pg.problems.length, "problem", "problems")}</span>
            </h2>
            {pg.problems.map(row)}
          </section>
        ))
      )}

      {selectedProblems.length > 0 && (
        <div className="sticky bottom-4 mx-auto flex max-w-4xl flex-wrap items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm text-white shadow-xl">
          <b>{selectedProblems.length} selected</b>
          {(["accepted", "false_positive", "fixed"] as FindingStatus[]).map((s) => (
            <button key={s} type="button" disabled={busy} onClick={() => void decide(selectedProblems, s, note.trim())} className="rounded border border-slate-600 bg-slate-800 px-3 py-1 hover:bg-slate-700 disabled:opacity-50">
              {s === "accepted" ? "Accept" : STATUS_LABEL[s]}
            </button>
          ))}
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={`Note for ${selectedProblems.length === 1 ? "it" : "all"} (optional)`} className="min-w-40 flex-1 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-white placeholder:text-slate-400" />
          <button type="button" className="px-2 text-slate-300 hover:text-white" onClick={() => setSelected(new Set())}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
