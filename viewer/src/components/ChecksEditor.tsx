import { useEffect, useState } from "react";
import { HistoryList, Notice, useResource } from "./ResourceEditor.js";
import { SaveBar } from "./StructuredEditors.js";
import { Loading } from "./Loading.js";

const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";

interface Group {
  key: string;
  title: string;
  blurb: string;
  apart?: boolean;
}

interface Check {
  layer: "seo" | "geo";
  group: string;
  title: string;
  why: string;
  fix: string;
  where: "template" | "page" | "author";
}

interface ChecksConfig {
  groups: Group[];
  checks: Record<string, Check>;
  blocks?: Record<string, string>;
}

/** The blocks of the Site page that have a short explanation under their title. */
const BLOCKS: [string, string][] = [
  ["snapshot", "Snapshot bar"],
  ["summary", "Summary"],
  ["fix_first", "Fix first"],
  ["all_checks", "All checks"],
  ["template_text", "Template text (checked by the model)"],
  ["coverage", "Coverage and sitemap"],
];

const WHERE: [Check["where"], string][] = [
  ["template", "Site template and settings"],
  ["page", "Each page"],
  ["author", "Author profile"],
];

function parse(text: string): ChecksConfig | null {
  try {
    return JSON.parse(text) as ChecksConfig;
  } catch {
    return null;
  }
}

/**
 * What the Site page says about each technical check. The checks themselves live in code: this edits their name,
 * the reason, the fix and where to make it, and the groups they are shown in.
 */
export function ChecksEditor() {
  const r = useResource("checks");
  const [cfg, setCfg] = useState<ChecksConfig | null>(null);
  const [raw, setRaw] = useState(false);

  useEffect(() => {
    if (r.info) setCfg(parse(r.info.content));
  }, [r.info]);

  if (!r.info) return r.msg ? <Notice kind="error">{r.msg.text}</Notice> : <Loading />;
  if (!cfg) return <Notice kind="error">config/checks.json is not valid JSON. Fix it in the raw editor.</Notice>;

  const serialized = JSON.stringify(cfg, null, 2) + "\n";
  const dirty = raw ? r.dirty : serialized.trim() !== JSON.stringify(parse(r.info.content), null, 2).trim();
  const setCheck = (id: string, patch: Partial<Check>) => setCfg({ ...cfg, checks: { ...cfg.checks, [id]: { ...cfg.checks[id]!, ...patch } } });
  const setBlock = (key: string, text: string) => setCfg({ ...cfg, blocks: { ...(cfg.blocks ?? {}), [key]: text } });
  const setGroup = (key: string, patch: Partial<Group>) => setCfg({ ...cfg, groups: cfg.groups.map((g) => (g.key === key ? { ...g, ...patch } : g)) });

  return (
    <div className="space-y-5">
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
        What the Site page says about each technical check: its name, why it matters, how to fix it and where to make the fix. What a check
        looks at and its severity are not set here: severity is in the SEO and GEO settings. The page uses the new text on the next load.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={raw} onChange={(e) => setRaw(e.target.checked)} /> Edit as JSON (to add or remove a group)
      </label>
      {raw ? (
        <div className="space-y-2">
          <textarea
            className="w-full rounded border border-slate-300 bg-white p-2 font-mono text-xs dark:border-slate-600 dark:bg-slate-900"
            rows={28}
            value={r.text}
            onChange={(e) => r.setText(e.target.value)}
          />
          <SaveBar r={r} dirty={dirty} onSave={() => r.save()} />
        </div>
      ) : (
        <>
          <section className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-semibold">Explanations under the blocks of the Site page</h3>
            <p className="text-xs text-slate-500">A few plain sentences under each block title. Leave one empty to show nothing.</p>
            {BLOCKS.map(([key, label]) => (
              <label key={key} className="block space-y-0.5 text-xs text-slate-500">
                {label}
                <textarea className={`${field} w-full text-sm text-slate-900 dark:text-slate-100`} rows={3} value={cfg.blocks?.[key] ?? ""} onChange={(e) => setBlock(key, e.target.value)} />
              </label>
            ))}
          </section>
          {cfg.groups.map((g) => {
            const checks = Object.entries(cfg.checks).filter(([, c]) => c.group === g.key);
            return (
              <section key={g.key} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <div className="grid gap-2 md:grid-cols-[16rem_1fr_auto]">
                  <input className={`${field} font-semibold`} value={g.title} onChange={(e) => setGroup(g.key, { title: e.target.value })} aria-label="Group title" />
                  <input className={field} value={g.blurb} onChange={(e) => setGroup(g.key, { blurb: e.target.value })} aria-label="Group description" />
                  <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400" title="Left out of the summary counts, like writing style">
                    <input type="checkbox" checked={!!g.apart} onChange={(e) => setGroup(g.key, { apart: e.target.checked })} /> kept apart
                  </label>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {checks.map(([id, c]) => (
                    <div key={id} className="space-y-1.5 py-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono">{id}</span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 uppercase dark:bg-slate-800">{c.layer}</span>
                        <select className={`${field} ml-auto`} value={c.group} onChange={(e) => setCheck(id, { group: e.target.value })} aria-label="Group">
                          {cfg.groups.map((x) => (
                            <option key={x.key} value={x.key}>
                              {x.title}
                            </option>
                          ))}
                        </select>
                        <select className={field} value={c.where} onChange={(e) => setCheck(id, { where: e.target.value as Check["where"] })} aria-label="Where to fix">
                          {WHERE.map(([v, label]) => (
                            <option key={v} value={v}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input className={`${field} w-full font-medium`} value={c.title} onChange={(e) => setCheck(id, { title: e.target.value })} aria-label="Name" />
                      <div className="grid gap-2 md:grid-cols-2">
                        <label className="space-y-0.5 text-xs text-slate-500">
                          Why it matters
                          <textarea className={`${field} w-full text-sm text-slate-900 dark:text-slate-100`} rows={2} value={c.why} onChange={(e) => setCheck(id, { why: e.target.value })} />
                        </label>
                        <label className="space-y-0.5 text-xs text-slate-500">
                          How to fix
                          <textarea className={`${field} w-full text-sm text-slate-900 dark:text-slate-100`} rows={2} value={c.fix} onChange={(e) => setCheck(id, { fix: e.target.value })} />
                        </label>
                      </div>
                    </div>
                  ))}
                  {checks.length === 0 && <p className="py-2 text-sm text-slate-500">No checks in this group.</p>}
                </div>
              </section>
            );
          })}
          <SaveBar r={r} dirty={dirty} onSave={() => r.save(serialized)} />
        </>
      )}
      <HistoryList id="checks" history={r.history} onRestore={r.restore} />
    </div>
  );
}
