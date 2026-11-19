import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api.js";
import type { BriefInfo } from "../types.js";
import { buttonClass, primaryClass } from "./ResourceEditor.js";

const when = (iso: string) => new Date(iso).toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** The content brief of a page: upload (one CSV file is one brief), versions, and the rows as stored. */
export function BriefTab({ slug, url, onRows }: { slug: string; url: string; onRows: (rows: number | null) => void }) {
  const [info, setInfo] = useState<BriefInfo | null>(null);
  const [busy, setBusy] = useState(false);
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
  }, [load]);

  async function upload(f: File | undefined) {
    if (!f) return;
    setBusy(true);
    setError(null);
    setWarning(null);
    try {
      const r = await api.saveBrief(slug, url, f.name, await f.text());
      setWarning(r.warning);
      await load();
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

  const picker = (label: string, primary: boolean) => (
    <>
      <input ref={file} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} />
      <button type="button" disabled={busy} className={primary ? primaryClass : buttonClass} onClick={() => file.current?.click()}>
        {busy ? "Uploading..." : label}
      </button>
    </>
  );

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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
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

          <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-700">
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
        </>
      )}
    </div>
  );
}
