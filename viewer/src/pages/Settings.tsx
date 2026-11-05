import { useState } from "react";
import { GeoQuestionsEditor, SeoEditor, ComplianceEditor } from "../components/StructuredEditors.js";
import { TextEditor } from "../components/ResourceEditor.js";
import { confirmLeave } from "../unsaved.js";

const TABS = [
  { key: "geo", label: "GEO questions" },
  { key: "seo", label: "SEO" },
  { key: "compliance", label: "Compliance severity" },
  { key: "geo-code", label: "GEO code checks" },
  { key: "prompts", label: "Prompts" },
  { key: "general", label: "General and scope" },
] as const;

type Tab = (typeof TABS)[number]["key"];

function Raw({ id, note }: { id: string; note: string }) {
  return (
    <div className="space-y-2">
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">{note}</p>
      <TextEditor key={id} id={id} rows={26} />
    </div>
  );
}

export function Settings() {
  const [tab, setTab] = useState<Tab>("geo");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => confirmLeave() && setTab(t.key)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${
              tab === t.key ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === "geo" && <GeoQuestionsEditor />}
      {tab === "seo" && <SeoEditor />}
      {tab === "compliance" && <ComplianceEditor />}
      {tab === "geo-code" && (
        <Raw
          id="geo"
          note="Home title, trap terms (regular expressions), words that must not lead the hero, the list of allowed ampersands, UK spellings to catch, AI bots for robots.txt. Saved only if every pattern is a valid regular expression. In JSON a backslash must be doubled."
        />
      )}
      {tab === "prompts" && (
        <div className="space-y-8">
          <Raw id="compliance-prompt" note="Instruction for the Compliance call. It must keep the {{report_language}} placeholder." />
          <Raw id="geo-prompt" note="Instruction for the GEO call. It must keep {{report_language}} and {{questions}}." />
        </div>
      )}
      {tab === "general" && (
        <Raw
          id="settings"
          note="Site address, the scope (which URLs are audited, with category, subsection and SEO profile for each), model, reasoning effort, how many pages run in parallel, fetch delay. A scope profile must exist in SEO settings."
        />
      )}
    </div>
  );
}
