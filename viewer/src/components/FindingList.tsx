import { useState } from "react";
import { Link } from "react-router-dom";
import type { Finding, FixWhere } from "../types.js";
import { SeverityBadge } from "./Badges.js";
import { GEO_STYLE_KINDS, ruleDocId } from "../labels.js";
import { fragmentAllowed, showOnPageUrl } from "../utils.js";

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

/** One line of a problem: the places that share a quote (title, meta, og) are one line. */
interface Place {
  labels: string[];
  part: string;
  /** readable place of a table cell, replaces the part */
  place: string;
  f: Finding;
}

function mergePlaces(group: Finding[]): Place[] {
  const out = new Map<string, Place>();
  for (const f of group) {
    const label = f.zone_label || f.zone_id;
    // a part ("paragraph 3") pins the place; without one, the same text in title, meta and og is one edit
    const key = f.part ? `${f.zone_id}|${f.part}|${f.quote}` : `|${f.quote}|${f.quote ? "" : f.zone_id}`;
    const have = out.get(key);
    if (!have) out.set(key, { labels: [label], part: f.part, place: f.place ?? "", f });
    else if (!have.labels.includes(label)) have.labels.push(label);
  }
  return [...out.values()];
}

/** "table_cell 18" reads better as "table cell 18". */
function humanPart(part: string): string {
  return part.replace(/_/g, " ");
}

/** For style checks the stored value is "match | surrounding text": show the surrounding text. */
function displayQuote(f: Finding): string {
  if (GEO_STYLE_KINDS.includes(f.kind)) {
    const i = f.quote.indexOf(" | ");
    return i >= 0 ? f.quote.slice(i + 3) : f.quote;
  }
  return f.quote;
}

/** Zones that live in the page head: the badge tells the reader to look in the source, not on the page. */
function headBadge(zoneId: string): string | null {
  if (/^(title|meta_description|og_title|og_description)$/.test(zoneId)) return "in meta tags";
  if (zoneId === "json_ld") return "in structured data";
  return null;
}

function PlaceLine({ place, hideZone }: { place: Place; hideZone?: boolean }) {
  const { f } = place;
  const headKind = headBadge(f.zone_id);
  const where = [hideZone ? "" : place.labels.join(", "), place.place || humanPart(place.part)].filter(Boolean).join(", ");
  const link = f.url !== "site" ? showOnPageUrl(f.url, f.fragment) : null;
  const quote = displayQuote(f);
  // SEO values are measurements ("61 characters (max 60)"), not quotes from the page
  const measured = f.layer === "seo";
  return (
    <li className="rounded-md border border-slate-200 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-baseline gap-x-2">
        {where && (
          <>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Where</span>
            <span className="font-medium">{where}</span>
          </>
        )}
        {headKind && (
          <span
            className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
            title="This text is in the page head, not in the visible text, so the page cannot highlight it."
          >
            {headKind}
          </span>
        )}
        {!f.verified && <span className="text-xs text-amber-600">not found in this zone</span>}
        <span className="ml-auto text-xs">
          {link ? (
            <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
              show on page
            </a>
          ) : (
            f.url !== "site" &&
            !headKind &&
            !fragmentAllowed(f.zone_id) && (
              <span className="text-slate-400" title="This zone is shared by several templates, so the page cannot highlight it.">
                not visible on the page
              </span>
            )
          )}
        </span>
      </div>
      {quote &&
        (measured ? (
          <p className="mt-1 text-slate-700 dark:text-slate-300">{quote}</p>
        ) : (
          <p className="mt-1 border-l-2 border-slate-300 pl-2 italic text-slate-700 dark:border-slate-600 dark:text-slate-300">
            &ldquo;{quote}&rdquo;
          </p>
        ))}
      {f.reason && (
        <p className="mt-1.5 rounded bg-blue-50/70 px-2 py-1 text-slate-800 dark:bg-blue-950/40 dark:text-slate-200">
          <span className="mr-1 font-semibold text-blue-700 dark:text-blue-300">Why:</span>
          {f.reason}
        </p>
      )}
    </li>
  );
}

/** "Fact Sheet: Services; Glossary §7": each document name opens that document. */
function RuleLine({ rule }: { rule: string }) {
  const parts = rule.split(";").map((p) => p.trim()).filter(Boolean);
  return (
    <p className="mt-1 text-xs text-slate-500">
      Based on:{" "}
      {parts.map((p, i) => {
        const doc = ruleDocId(p);
        return (
          <span key={i}>
            {i > 0 && "; "}
            {doc ? (
              <Link to={`/sources?doc=${doc}&at=${encodeURIComponent(p)}`} title="Opens the document at this section" className="text-blue-600 hover:underline dark:text-blue-400">
                {p}
              </Link>
            ) : (
              p
            )}
          </span>
        );
      })}
    </p>
  );
}

const BASIS_CHIP: Record<string, string> = {
  "contradicts sources": "Contradicts the documents",
  "not in sources": "Not in the documents",
  "term list": "Retired term",
};

const CHIP_CLASS: Record<string, string> = {
  "contradicts sources": "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "not in sources": "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "term list": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

/** The kind of step the auditor takes. Set by code from the basis and category, not by the model. */
function nextStep(f: Finding): string {
  if (f.layer !== "compliance" || f.basis === "term list") return "";
  if (f.basis === "not in sources") return "Confirm with the owner, then keep or remove.";
  return ["discontinued_offer", "positioning", "wrong_audience"].includes(f.kind)
    ? "Not a text edit: this needs a decision."
    : "Correct it to match the documents.";
}

function Compared({ f }: { f: Finding }) {
  if (!f.page_value) return null;
  const cell = "min-w-0 flex-1 rounded px-2 py-1.5 text-sm";
  return (
    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
      <div className={`${cell} bg-slate-50 dark:bg-slate-800`}>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">On the page</div>
        {f.page_value}
      </div>
      <div className={`${cell} bg-slate-50 dark:bg-slate-800`}>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">In the documents</div>
        {f.source_value ?? <span className="text-slate-500">Nothing about this</span>}
      </div>
    </div>
  );
}

function ProblemCard({ group }: { group: Finding[] }) {
  const [all, setAll] = useState(false);
  const f = group[0]!;
  const places = mergePlaces(group);
  const shown = all ? places : places.slice(0, 5);
  const chip = f.basis ? BASIS_CHIP[f.basis] : undefined;
  const step = nextStep(f);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <SeverityBadge severity={f.severity} />
        {chip && <span className={`rounded px-1.5 py-0.5 text-xs ${CHIP_CLASS[f.basis!]}`}>{chip}</span>}
        <span className="font-semibold">{f.title}</span>
        {places.length > 1 && <span className="text-xs text-slate-500">{places.length} places</span>}
      </div>
      <Compared f={f} />
      {f.issue && <p className="mt-2 text-sm">{f.issue}</p>}
      {(f.fix || step) && (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium">What to do:</span> {step && <span className="font-medium">{step}</span>} {f.fix}
        </p>
      )}
      {f.rule && <RuleLine rule={f.rule} />}
      <ul className="mt-3 space-y-2">
        {shown.map((p, i) => (
          <PlaceLine key={i} place={p} />
        ))}
      </ul>
      {places.length > 5 && (
        <button type="button" className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400" onClick={() => setAll(!all)}>
          {all ? "show first 5" : `show all ${places.length}`}
        </button>
      )}
    </div>
  );
}

const FIX_WHERE_ORDER: FixWhere[] = ["template", "page", "author"];
const FIX_WHERE_LABELS: Record<FixWhere, string> = {
  template: "Site template and settings",
  page: "This page",
  author: "Author profile",
};

/** Findings grouped into problems (by layer view); split by who edits them when more than one kind is present. */
export function FindingList({ findings, empty }: { findings: Finding[]; empty: string }) {
  if (!findings.length) return empty ? <p className="text-sm text-slate-500">{empty}</p> : null;
  // runs made before fix_where existed have none: those are page findings
  const where = (f: Finding): FixWhere => f.fix_where ?? "page";
  const kinds = FIX_WHERE_ORDER.filter((w) => findings.some((f) => where(f) === w));
  if (kinds.length < 2) {
    return (
      <div className="space-y-3">
        {groupProblems(findings).map((g, i) => (
          <ProblemCard key={i} group={g} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {kinds.map((w) => (
        <section key={w}>
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{FIX_WHERE_LABELS[w]}</h3>
          <div className="space-y-3">
            {groupProblems(findings.filter((f) => where(f) === w)).map((g, i) => (
              <ProblemCard key={i} group={g} />
            ))}
          </div>
        </section>
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
            <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{list[0]!.zone_label || k}</h3>
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
                  <ul className="mt-2 space-y-2">
                    {mergePlaces(g).map((p, i2) => (
                      <PlaceLine key={i2} place={p} hideZone />
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
