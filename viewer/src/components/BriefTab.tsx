import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api, type AppState } from "../api.js";
import type { BriefCheckRecord, BriefInfo, BriefStatus } from "../types.js";
import { headBadge, inAccordion, showOnPageUrl } from "../utils.js";
import { buttonClass, primaryClass } from "./ResourceEditor.js";

const when = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

const STATUS: Record<BriefStatus, { label: string; mark: string; cls: string }> = {
  done: { label: "Done", mark: "✓", cls: "text-emerald-600 dark:text-emerald-400" },
  partial: { label: "Partly", mark: "~", cls: "text-amber-600 dark:text-amber-400" },
  missing: { label: "Missing", mark: "✗", cls: "text-red-600 dark:text-red-400" },
  covered: { label: "Checked elsewhere", mark: "→", cls: "text-blue-600 dark:text-blue-400" },
  not_applicable: { label: "Not for the page", mark: "-", cls: "text-slate-400" },
};
const POINT_MARK = { done: STATUS.done, partial: STATUS.partial, missing: STATUS.missing } as const;

type Row = BriefCheckRecord["result"]["rows"][number];
type Evidence = Row["evidence"][number];

/** Where a quote sits on the page: a link that highlights it, or a note when the browser cannot (page head, closed FAQ item). */
function ShowOnPage({ url, e }: { url: string; e: Evidence }) {
  const head = headBadge(e.zone_id);
  if (head) {
    return (
      <span className="rounded bg-violet-100 px-1.5 py-0.5 font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300" title="This text is in the page head, not in the visible text, so the page cannot highlight it.">
        {head}
      </span>
    );
  }
  const link = e.verified && e.fragment ? showOnPageUrl(url, e.fragment) : null;
  if (!link) return null;
  return (
    <>
      {inAccordion(e.zone_id) && (
        <span className="text-slate-400" title="The browser cannot highlight text inside a closed accordion item: open the item first.">
          in a FAQ item: open it first
        </span>
      )}
      <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
        show on page
      </a>
    </>
  );
}

/** The audit check a row is covered by: "seo:canonical" is the SEO tab, "geo:..." the GEO tab. */
function CoveredBy({ id, onOpen }: { id: string; onOpen: (tab: "seo" | "geo") => void }) {
  const [layer, check] = id.includes(":") ? id.split(":") : ["seo", id];
  const tab = layer === "geo" ? "geo" : "seo";
  return (
    <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => onOpen(tab)}>
      {tab === "geo" ? "GEO" : "SEO"} check: {(check ?? id).replace(/_/g, " ")}
    </button>
  );
}

function RowCard({ r, url, onOpen }: { r: Row; url: string; onOpen: (tab: "seo" | "geo") => void }) {
  const s = STATUS[r.status];
  return (
    <li id={`brief-row-${r.row}`} className="rounded border border-slate-200 p-3 dark:border-slate-700">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-semibold ${s.cls}`}>
          {s.mark} {s.label}
        </span>
        <span className="font-medium">{r.title}</span>
        <span className="text-xs text-slate-400">row {r.row}</span>
      </div>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{r.explanation}</p>
      {r.covered_by && (
        <p className="mt-1 text-sm">
          <CoveredBy id={r.covered_by} onOpen={onOpen} />
        </p>
      )}
      {r.points.length > 0 && (
        <ul className="mt-2 space-y-0.5 text-sm">
          {r.points.map((p, i) => (
            <li key={i}>
              <span className={POINT_MARK[p.status].cls}>{POINT_MARK[p.status].mark}</span> {p.text}
              {p.note && <span className="text-slate-500"> — {p.note}</span>}
            </li>
          ))}
        </ul>
      )}
      {r.fix && (
        <p className="mt-2 text-sm">
          <span className="font-medium">Fix:</span> {r.fix}
        </p>
      )}
      {r.evidence.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {r.evidence.map((e, i) => (
            <li key={i} className="flex flex-wrap items-baseline gap-x-2">
              <span>
                <span className="text-slate-400">{e.zone_id}{e.part ? `, ${e.part}` : ""}{e.place ? `, ${e.place}` : ""}:</span> “{e.quote}”
                {!e.verified && <span className="ml-1 text-amber-600"> (not found in this zone, check by hand)</span>}
              </span>
              <span className="ml-auto flex items-baseline gap-2">
                <ShowOnPage url={url} e={e} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** The result of a check against the brief: a short checklist on top, then every row with its explanation. */
function CheckResult({ c, url, onOpen }: { c: BriefCheckRecord; url: string; onOpen: (tab: "seo" | "geo") => void }) {
  const rows = c.result.rows;
  const judged = rows.filter((r) => r.status !== "not_applicable");
  const count = (s: BriefStatus) => rows.filter((r) => r.status === s).length;
  const skipped = rows.filter((r) => r.status === "not_applicable");
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-semibold">
            {count("done")} of {judged.length} done
          </span>
          , {count("partial")} partly, {count("missing")} missing
          {count("covered") ? `, ${count("covered")} checked in other tabs` : ""}
          {skipped.length ? `; ${skipped.length} rows are not about the page` : ""}.
        </p>
        {c.result.summary && <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">{c.result.summary}</p>}
        <ul className="grid gap-x-6 gap-y-0.5 text-sm sm:grid-cols-2">
          {judged.map((r) => (
            <li key={r.row} className="flex gap-2">
              <span className={`w-4 shrink-0 text-center font-semibold ${STATUS[r.status].cls}`}>{STATUS[r.status].mark}</span>
              <a href={`#brief-row-${r.row}`} onClick={(e) => { e.preventDefault(); document.getElementById(`brief-row-${r.row}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="hover:underline">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="space-y-3">
        {judged.map((r) => (
          <RowCard key={r.row} r={r} url={url} onOpen={onOpen} />
        ))}
      </ul>
      {skipped.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer text-slate-600 dark:text-slate-400">Rows not about the page ({skipped.length})</summary>
          <ul className="mt-2 space-y-1">
            {skipped.map((r) => (
              <li key={r.row}>
                <span className="text-xs text-slate-400">row {r.row}</span> <span className="font-medium">{r.title}.</span>{" "}
                <span className="text-slate-500">{r.explanation}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

/** The content brief of a page: upload (one CSV file is one brief), the check against it, versions and the rows as stored. */
export function BriefTab({
  slug,
  url,
  runId,
  check,
  onCheck,
  onRows,
  onOpenTab,
}: {
  slug: string;
  url: string;
  /** the snapshot the page is read from; null for a checked page */
  runId: string | null;
  /** the stored check, kept by the page so the summary tile and this tab show the same */
  check: BriefCheckRecord | null;
  onCheck: (c: BriefCheckRecord | null) => void;
  onRows: (rows: number | null) => void;
  onOpenTab: (tab: "seo" | "geo") => void;
}) {
  const [info, setInfo] = useState<BriefInfo | null>(null);
  const [state, setState] = useState<AppState | null>(null);
  const [model, setModel] = useState<string | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const file = useRef<HTMLInputElement>(null);

  const load = useCallback(
    (v?: number) =>
      api
        .brief(slug, v)
        .then((i) => {
          setInfo(i);
          onRows(i.versions[0]?.row_count ?? null);
        })
        .catch((e) => setError(String(e instanceof Error ? e.message : e))),
    [slug, onRows],
  );

  useEffect(() => {
    setInfo(null);
    setWarning(null);
    setError(null);
    void load();
  }, [load, slug]);

  useEffect(() => {
    api.state().then((s) => { setState(s); setModel((m) => m ?? s.model); }).catch(() => undefined);
  }, []);

  async function upload(f: File | undefined) {
    if (!f) return;
    setBusy(true);
    setError(null);
    setWarning(null);
    try {
      const r = await api.saveBrief(slug, url, f.name, await f.text());
      setWarning(r.warning);
      await load();
      // a new version: the stored check says it is out of date
      api.briefCheck(slug, runId).then(onCheck).catch(() => undefined);
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setBusy(false);
      if (file.current) file.current.value = "";
    }
  }

  async function remove() {
    if (!window.confirm("Remove the brief of this page with all its versions?")) return;
    setBusy(true);
    try {
      await api.deleteBrief(slug);
      setWarning(null);
      await load();
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setBusy(false);
    }
  }

  async function runCheck(force: boolean) {
    setChecking(true);
    setError(null);
    try {
      onCheck(await api.runBriefCheck(slug, runId, model, force));
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setChecking(false);
    }
  }

  const picker = (label: string, primary: boolean) => (
    <>
      <input ref={file} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} />
      <button type="button" disabled={busy} className={primary ? primaryClass : buttonClass} onClick={() => file.current?.click()}>
        {busy ? "Uploading..." : label}
      </button>
    </>
  );

  const modelLabel = useMemo(() => (id: string) => state?.models.find((m) => m.id === id)?.label ?? id, [state]);

  if (!info) return error ? <p className="text-red-600">{error}</p> : <p className="text-slate-500">Loading...</p>;
  const b = info.current;
  const newest = info.versions[0]?.id;

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {warning && (
        <p className="max-w-3xl rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          {warning}
        </p>
      )}

      {!b ? (
        <div className="max-w-3xl space-y-3 rounded border border-dashed border-slate-300 p-4 dark:border-slate-600">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No brief is loaded for this page. Upload the brief as a CSV file: one file is one brief of this page.
          </p>
          {picker("Upload brief (CSV)", true)}
        </div>
      ) : (
        <>
          <div className="divide-y divide-slate-200 rounded border border-slate-200 text-sm dark:divide-slate-700 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3">
              <span>
                <span className="font-medium">{b.filename}</span>{" "}
                <span className="text-slate-500">
                  version {info.versions.length - info.versions.findIndex((v) => v.id === b.id)} of {info.versions.length}, {b.row_count} rows, uploaded{" "}
                  {when(b.uploaded_at)}
                  {b.uploaded_by ? ` by ${b.uploaded_by}` : ""}
                </span>
              </span>
              {b.id !== newest && (
                <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => void load()}>
                  Show the latest
                </button>
              )}
              <span className="ml-auto flex gap-2">
                {picker("Upload a new version", false)}
                <button type="button" disabled={busy} className={buttonClass} onClick={() => void remove()}>
                  Remove brief
                </button>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 p-3">
              <button type="button" disabled={checking || busy} className={primaryClass} onClick={() => void runCheck(false)}>
                {checking ? "Checking..." : check ? "Check again" : "Check by brief"}
              </button>
              {state && (
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  Model
                  <select
                    value={model ?? state.model}
                    disabled={checking}
                    onChange={(e) => setModel(e.target.value)}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900"
                  >
                    {state.models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                        {m.id === state.model ? " (default)" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {checking && <span className="text-slate-500">One model call over the whole brief, usually under a minute.</span>}
              {check && !checking && (
                <span className="text-slate-500">
                  Checked {when(check.checked_at)}
                  {check.checked_by ? ` by ${check.checked_by}` : ""} with {modelLabel(check.model)}, ${check.cost_usd.toFixed(4)}.{" "}
                  <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => void runCheck(true)}>
                    Ask the model again
                  </button>
                </span>
              )}
            </div>
          </div>
          {check?.stale && (
            <p className="max-w-3xl rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
              The brief, the page text or the model changed since this check. Check again to read the page as it is now.
            </p>
          )}
          {!check && !checking && (
            <p className="max-w-3xl text-sm text-slate-500">
              The page is read as it was stored by its last check{runId ? " in this snapshot" : ""}. Check the page again first if it changed.
            </p>
          )}

          {check && <CheckResult c={check} url={url} onOpen={onOpenTab} />}

          {info.versions.length > 1 && (
            <details className="text-sm">
              <summary className="cursor-pointer text-slate-600 dark:text-slate-400">Versions ({info.versions.length})</summary>
              <ul className="mt-2 space-y-1">
                {info.versions.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      className={`hover:underline ${v.id === b.id ? "font-semibold" : "text-blue-600 dark:text-blue-400"}`}
                      onClick={() => void load(v.id)}
                    >
                      {when(v.uploaded_at)}
                    </button>{" "}
                    <span className="text-slate-500">
                      {v.filename}, {v.row_count} rows{v.uploaded_by ? `, ${v.uploaded_by}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {b.id !== newest && <p className="text-xs text-slate-500">This is an earlier version. A check always uses the latest.</p>}

          <details>
            <summary className="cursor-pointer text-sm text-slate-600 dark:text-slate-400">Brief rows as stored ({b.row_count})</summary>
            <div className="mt-2 overflow-x-auto rounded border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <tbody>
                  {b.rows.map((r, i) => (
                    <tr key={i} className="border-t border-slate-100 align-top first:border-t-0 dark:border-slate-800">
                      <td className="w-10 px-2 py-1 text-right tabular-nums text-slate-400">{i + 1}</td>
                      {r.length === 0 ? (
                        <td className="px-2 py-1 text-slate-300">-</td>
                      ) : (
                        r.map((c, j) => (
                          <td key={j} className="max-w-md whitespace-pre-wrap px-2 py-1">
                            {c}
                          </td>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      )}
    </div>
  );
}
