import { useState } from "react";
import type { Finding } from "../types.js";
import { SeverityBadge } from "./Badges.js";
import { categoryLabel } from "../labels.js";
import { showOnPageUrl } from "../utils.js";

const SEV_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2, "": 3 };

/** Same kind, title and issue: one problem with several places. */
export function groupProblems(list: Finding[]): Finding[][] {
  const m = new Map<string, Finding[]>();
  for (const f of list) {
    const key = `${f.layer}|${f.kind}|${f.title}|${f.issue}`;
    m.set(key, [...(m.get(key) ?? []), f]);
  }
  return [...m.values()].sort((a, b) => SEV_ORDER[a[0]!.severity]! - SEV_ORDER[b[0]!.severity]!);
}

function PlaceLine({ f }: { f: Finding }) {
  const where = [f.zone_label || f.zone_id, f.part].filter(Boolean).join(", ");
  const link = f.url !== "site" ? showOnPageUrl(f.url, f.fragment) : null;
  return (
    <li className="text-sm">
      <span className="text-slate-500">{where}</span>
      {f.quote && (
        <span className="ml-1 italic text-slate-700 dark:text-slate-300">&ldquo;{f.quote}&rdquo;</span>
      )}
      {!f.verified && <span className="ml-1 text-xs text-amber-600">not found in this zone</span>}
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="ml-2 text-xs text-blue-600 hover:underline dark:text-blue-400">
          show on page
        </a>
      )}
      {f.quote && (
        <button
          type="button"
          className="ml-2 rounded border border-slate-300 px-1.5 py-0.5 text-xs hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          onClick={() => navigator.clipboard.writeText(f.quote)}
        >
          Copy
        </button>
      )}
    </li>
  );
}

function ProblemCard({ group }: { group: Finding[] }) {
  const [all, setAll] = useState(false);
  const f = group[0]!;
  const shown = all ? group : group.slice(0, 5);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <SeverityBadge severity={f.severity} />
        {f.layer === "compliance" && (
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {categoryLabel(f.kind)}
          </span>
        )}
        {f.basis && f.basis !== "contradicts sources" && (
          <span className="rounded bg-sky-50 px-1.5 py-0.5 text-xs text-sky-700 dark:bg-sky-950 dark:text-sky-300">{f.basis}</span>
        )}
        <span className="font-semibold">{f.title}</span>
        {group.length > 1 && <span className="text-xs text-slate-500">{group.length} places</span>}
      </div>
      {f.issue && <p className="text-sm">{f.issue}</p>}
      {f.fix && (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium">Fix:</span> {f.fix}
        </p>
      )}
      {f.rule && <p className="mt-1 text-xs text-slate-500">{f.rule}</p>}
      <ul className="mt-2 space-y-1 border-t border-slate-100 pt-2 dark:border-slate-800">
        {shown.map((p, i) => (
          <PlaceLine key={i} f={p} />
        ))}
      </ul>
      {group.length > 5 && (
        <button type="button" className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400" onClick={() => setAll(!all)}>
          {all ? "show first 5" : `show all ${group.length}`}
        </button>
      )}
    </div>
  );
}

/** Findings grouped into problems (by layer view). */
export function FindingList({ findings, empty }: { findings: Finding[]; empty: string }) {
  if (!findings.length) return <p className="text-sm text-slate-500">{empty}</p>;
  return (
    <div className="space-y-3">
      {groupProblems(findings).map((g, i) => (
        <ProblemCard key={i} group={g} />
      ))}
    </div>
  );
}

/** Findings of all layers grouped by zone, in page order. */
export function FindingsByZone({ findings, zoneOrder }: { findings: Finding[]; zoneOrder: string[] }) {
  const zones = new Map<string, Finding[]>();
  for (const f of findings) {
    const key = f.zone_id || "page";
    zones.set(key, [...(zones.get(key) ?? []), f]);
  }
  const keys = [...zones.keys()].sort((a, b) => {
    const ia = zoneOrder.indexOf(a);
    const ib = zoneOrder.indexOf(b);
    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
  });
  if (!keys.length) return <p className="text-sm text-slate-500">No findings.</p>;
  return (
    <div className="space-y-5">
      {keys.map((k) => {
        const list = zones.get(k)!;
        return (
          <section key={k}>
            <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {list[0]!.zone_label || k} <span className="font-normal text-slate-400">({k})</span>
            </h3>
            <div className="space-y-2">
              {groupProblems(list).map((g, i) => (
                <div key={i} className="rounded border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {g[0]!.layer}
                    </span>
                    <SeverityBadge severity={g[0]!.severity} />
                    <span className="font-medium">{g[0]!.title}</span>
                  </div>
                  {g[0]!.issue && <p className="mt-1 text-sm">{g[0]!.issue}</p>}
                  <ul className="mt-1 space-y-1">
                    {g.map((p, i2) => (
                      <PlaceLine key={i2} f={p} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
