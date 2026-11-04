import type { ReactNode } from "react";
import type { Finding, SiteSources } from "../types.js";
import { SeverityBadge } from "./Badges.js";
import { SCHEMA_EDIT_DEFAULT, SCHEMA_EDIT_HINTS, SHARED_EDIT_HINTS } from "../labels.js";

const short = (u: string) => u.replace(/^https:\/\/[^/]+/, "") || "/";

/** Quotes are matched in the source with entities decoded and whitespace collapsed. */
const norm = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function Findings({ list: all }: { list: Finding[] }) {
  const seen = new Set<string>();
  const list = all.filter((f) => {
    const k = `${f.title}|${f.part}|${f.quote}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (!list.length) return null;
  return (
    <ul className="mt-2 space-y-1 border-t border-slate-100 pt-2 dark:border-slate-800">
      {list.map((f, i) => (
        <li key={i} className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <SeverityBadge severity={f.severity} />
          <span className="font-medium">{f.title}</span>
          <span className="text-slate-500">{f.part}</span>
          {f.fix && <span className="basis-full pl-1 text-slate-600 dark:text-slate-400">Fix: {f.fix}</span>}
        </li>
      ))}
    </ul>
  );
}

function Where({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-300">{label}: </span>
      <span className="text-slate-600 dark:text-slate-400">{children}</span>
    </p>
  );
}

/** Text with the quoted fragments marked. Each line that holds a quote gets a red edge. */
function MarkedText({ text, quotes, mono }: { text: string; quotes: string[]; mono?: boolean }) {
  const needles = quotes.map((q) => (mono ? JSON.stringify(norm(q)).slice(1, -1) : norm(q))).filter(Boolean);
  return (
    <pre
      className={`mt-2 max-h-96 overflow-auto rounded bg-slate-50 p-2 text-xs dark:bg-slate-950 ${mono ? "font-mono" : "whitespace-pre-wrap font-sans text-sm"}`}
    >
      {text.split("\n").map((line, i) => {
        const hit = needles.find((n) => line.includes(n) || line.replace(/&amp;/g, "&").includes(n));
        if (!hit) return <div key={i}>{line || " "}</div>;
        const src = line.includes(hit) ? line : line.replace(/&amp;/g, "&");
        const at = src.indexOf(hit);
        return (
          <div key={i} className="border-l-2 border-red-500 bg-red-50 pl-1 dark:bg-red-950">
            {src.slice(0, at)}
            <mark className="bg-amber-200 dark:bg-amber-700 dark:text-white">{hit}</mark>
            {src.slice(at + hit.length)}
          </div>
        );
      })}
    </pre>
  );
}

export function SchemaNodeCard({ node, findings }: { node: SiteSources["schema_nodes"][number]; findings: Finding[] }) {
  const json = JSON.stringify(node.json, null, 2);
  const hint = SCHEMA_EDIT_HINTS[node.type] ?? SCHEMA_EDIT_DEFAULT;
  return (
    <details open={findings.length > 0} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <summary className="cursor-pointer text-sm">
        <span className="font-semibold">{node.type}</span>
        {node.name && <span className="ml-1">{node.name}</span>}
        <span className="ml-2 text-xs text-slate-500">
          on {node.pages} of {node.pages_total} pages
        </span>
        {findings.length > 0 && <span className="ml-2 text-xs font-medium text-red-600">{findings.length} places to fix</span>}
      </summary>
      <div className="mt-2 space-y-1">
        <Where label="Found">
          JSON-LD block in the head of every page, same content on {node.pages} of {node.pages_total}. Example:{" "}
          <a href={node.sample_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
            {short(node.sample_url)}
          </a>{" "}
          (Ctrl+U, search &ldquo;ld+json&rdquo;)
        </Where>
        <Where label="Edit in">{hint}</Where>
      </div>
      <Findings list={findings} />
      <MarkedText text={json} quotes={findings.map((f) => f.quote)} mono />
    </details>
  );
}

export function VariantCard({ variant, findings }: { variant: SiteSources["variants"][number]; findings: Finding[] }) {
  const hint = SHARED_EDIT_HINTS[variant.zone] ?? "Site template: the same text is on every page listed.";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="text-sm">
        <span className="font-semibold">{variant.label}</span> <span className="text-slate-500">({variant.id})</span>
        <span className="ml-2 text-xs text-slate-500">on {variant.pages.length} pages</span>
        {findings.length > 0 && <span className="ml-2 text-xs font-medium text-red-600">{findings.length} places to fix</span>}
      </div>
      <div className="mt-1 space-y-1">
        <Where label="Found">
          shared block, the same text on:{" "}
          {variant.pages.map((p) => (
            <a key={p} href={p} target="_blank" rel="noreferrer" className="mr-2 text-blue-600 hover:underline dark:text-blue-400">
              {short(p)}
            </a>
          ))}
        </Where>
        <Where label="Edit in">{hint}</Where>
      </div>
      <Findings list={findings} />
      {variant.text && <MarkedText text={variant.text} quotes={findings.map((f) => f.quote)} />}
    </div>
  );
}

/** Findings whose quote is found among a node's text values. */
export function findingsInNode(node: SiteSources["schema_nodes"][number], list: Finding[]): Finding[] {
  const leaves: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") leaves.push(norm(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(node.json);
  return list.filter((f) => f.quote && leaves.some((l) => l.includes(norm(f.quote))));
}
