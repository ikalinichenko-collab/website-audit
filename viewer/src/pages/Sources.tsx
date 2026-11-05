import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ResourceInfo } from "../api.js";
import { TextEditor } from "../components/ResourceEditor.js";

export function Sources() {
  const [items, setItems] = useState<ResourceInfo[]>([]);
  const [open, setOpen] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [params] = useSearchParams();

  useEffect(() => {
    api
      .resources()
      .then((r) => {
        const s = r.filter((x) => x.group === "sources");
        setItems(s);
        const wanted = params.get("doc");
        setOpen(s.find((x) => x.id === wanted)?.id ?? s[0]?.id ?? "");
      })
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  const current = items.find((i) => i.id === open);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Company documents</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          The audit compares every page with these three files. If they disagree, decisions.md wins, then the Fact Sheet, then
          the Glossary. Edit the text here or upload a new version of a file. The old version is kept in history. After a change,
          the next run asks the LLM again for every page; pages are not rechecked until you run them.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700">
        {items.map((i, n) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setOpen(i.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${
              open === i.id ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"
            }`}
          >
            {n + 1}. {i.label}
          </button>
        ))}
      </div>
      {current && (
        <div className="space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {current.description} <span className="text-xs text-slate-500">({current.file})</span>
          </p>
          <TextEditor key={current.id} id={current.id} rows={26} upload focus={params.get("at")} />
        </div>
      )}
    </div>
  );
}
