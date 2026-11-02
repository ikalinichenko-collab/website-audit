import { useEffect, useRef, useState } from "react";
import { api, type ResourceInfo } from "../api.js";

export const buttonClass =
  "rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800";
export const primaryClass =
  "rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50";

export function formatSize(n: number): string {
  return n > 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;
}

export function formatTs(ts: string): string {
  return ts.replace(/T/, " ").replace(/-(\d\d)-(\d\d)-\d+Z$/, ":$1:$2");
}

/** Message under an editor: saved, warning or error. */
export function Notice({ kind, children }: { kind: "ok" | "warn" | "error"; children: React.ReactNode }) {
  const cls = {
    ok: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    warn: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
    error: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
  }[kind];
  return <p className={`rounded px-3 py-2 text-sm ${cls}`}>{children}</p>;
}

/** Save with server validation and a version history. Shared by every editor. */
export function useResource(id: string) {
  const [info, setInfo] = useState<(ResourceInfo & { content: string }) | null>(null);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "warn" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<{ ts: string; size: number }[]>([]);

  async function load() {
    setMsg(null);
    try {
      const r = await api.resource(id);
      setInfo(r);
      setText(r.content);
      setHistory(await api.history(id));
    } catch (e) {
      setMsg({ kind: "error", text: String(e instanceof Error ? e.message : e) });
    }
  }

  useEffect(() => {
    void load();
  }, [id]);

  async function save(content = text) {
    setSaving(true);
    setMsg(null);
    try {
      const r = await api.save(id, content);
      const warn = r.warnings?.[0];
      setMsg(
        warn
          ? { kind: "warn", text: warn }
          : { kind: "ok", text: r.changed ? "Saved. The next run uses the new version." : "No changes." },
      );
      const fresh = await api.resource(id);
      setInfo(fresh);
      setText(fresh.content);
      setHistory(await api.history(id));
    } catch (e) {
      setMsg({ kind: "error", text: String(e instanceof Error ? e.message : e) });
    } finally {
      setSaving(false);
    }
  }

  async function restore(ts: string) {
    setMsg(null);
    try {
      await api.restore(id, ts);
      await load();
      setMsg({ kind: "ok", text: "Version restored." });
    } catch (e) {
      setMsg({ kind: "error", text: String(e instanceof Error ? e.message : e) });
    }
  }

  const dirty = info !== null && text.replace(/\r\n/g, "\n") !== info.content.replace(/\r\n/g, "\n");
  return { info, text, setText, msg, setMsg, saving, save, restore, history, dirty, reload: load };
}

export function HistoryList({
  id,
  history,
  onRestore,
}: {
  id: string;
  history: { ts: string; size: number }[];
  onRestore: (ts: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<{ ts: string; content: string } | null>(null);
  if (!history.length) return <p className="text-xs text-slate-500">No earlier versions yet.</p>;
  return (
    <div className="text-sm">
      <button type="button" className="text-blue-600 hover:underline dark:text-blue-400" onClick={() => setOpen(!open)}>
        {open ? "Hide" : "Show"} earlier versions ({history.length})
      </button>
      {open && (
        <ul className="mt-2 space-y-1">
          {history.map((h) => (
            <li key={h.ts} className="flex flex-wrap items-center gap-2">
              <span className="tabular-nums">{formatTs(h.ts)}</span>
              <span className="text-xs text-slate-500">{formatSize(h.size)}</span>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                onClick={async () => setPreview({ ts: h.ts, content: (await api.historyContent(id, h.ts)).content })}
              >
                view
              </button>
              <button type="button" className="text-xs text-blue-600 hover:underline dark:text-blue-400" onClick={() => onRestore(h.ts)}>
                restore
              </button>
            </li>
          ))}
        </ul>
      )}
      {preview && (
        <div className="mt-2 rounded border border-slate-200 p-2 dark:border-slate-700">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>Version {formatTs(preview.ts)}</span>
            <button type="button" onClick={() => setPreview(null)}>
              close
            </button>
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs">{preview.content}</pre>
        </div>
      )}
    </div>
  );
}

/** Plain text editor for a file, with upload, save and history. */
export function TextEditor({ id, rows = 18, upload = false }: { id: string; rows?: number; upload?: boolean }) {
  const r = useResource(id);
  const file = useRef<HTMLInputElement>(null);
  if (!r.info) return r.msg ? <Notice kind="error">{r.msg.text}</Notice> : <p className="text-slate-500">Loading...</p>;

  return (
    <div className="space-y-2">
      <textarea
        className="w-full rounded border border-slate-300 bg-white p-2 font-mono text-xs leading-relaxed dark:border-slate-600 dark:bg-slate-900"
        rows={rows}
        value={r.text}
        spellCheck={false}
        onChange={(e) => r.setText(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={primaryClass} disabled={!r.dirty || r.saving} onClick={() => r.save()}>
          {r.saving ? "Saving..." : "Save"}
        </button>
        <button type="button" className={buttonClass} disabled={!r.dirty} onClick={() => r.setText(r.info!.content)}>
          Discard changes
        </button>
        {upload && (
          <>
            <input
              ref={file}
              type="file"
              accept=".md,.txt,.markdown,text/plain,text/markdown"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                r.setText(await f.text());
                r.setMsg({ kind: "warn", text: `Loaded ${f.name} into the editor. Check it and press Save.` });
                e.target.value = "";
              }}
            />
            <button type="button" className={buttonClass} onClick={() => file.current?.click()}>
              Upload file...
            </button>
          </>
        )}
        <span className="ml-auto text-xs text-slate-500">
          {formatSize(r.info.size)}
          {r.info.modified && `, changed ${formatTs(r.info.modified.replace(/[:.]/g, "-"))}`}
        </span>
      </div>
      {r.dirty && <p className="text-xs text-amber-700 dark:text-amber-300">Unsaved changes.</p>}
      {r.msg && <Notice kind={r.msg.kind}>{r.msg.text}</Notice>}
      <HistoryList id={id} history={r.history} onRestore={r.restore} />
    </div>
  );
}
