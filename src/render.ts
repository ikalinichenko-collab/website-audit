import type { PageReport, SiteReport } from "./report-types.js";
import { countBy, FIX_WHERE_LABELS, kindLabel, pageFindings, siteFindings, totalOf, type Finding, type Layer } from "./findings.js";
import { textFragmentUrl } from "./quote-fragments.js";
import { categoryLabel } from "./categories.js";

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2, "": 3 } as const;

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csvRow(cells: (string | number)[]): string {
  return cells.map(csvCell).join(",");
}

function showLink(f: Finding): string {
  if (!f.fragment || f.url === "site") return "";
  return ` [show on page](${textFragmentUrl(f.url, f.fragment)})`;
}

function placeLine(f: Finding): string {
  const where = [f.zone_label || f.zone_id, f.part].filter(Boolean).join(", ");
  const quote = f.quote ? `"${f.quote.replace(/\s+/g, " ")}"` : "";
  return `- ${where}${where && quote ? ": " : ""}${quote}${f.verified ? "" : " (not found in this zone)"}${showLink(f)}`;
}

function counts(findings: Finding[], layer: Layer): string {
  const c = countBy(findings, layer);
  return `${c.high} high, ${c.medium} medium, ${c.low} low${layer === "geo" && c.other ? `, ${c.other} without severity` : ""}`;
}

/** Group findings of one layer into "problems": same kind, title and issue. */
function groupProblems(list: Finding[]): Finding[][] {
  const m = new Map<string, Finding[]>();
  for (const f of list) {
    const key = `${f.kind}|${f.title}|${f.issue}`;
    m.set(key, [...(m.get(key) ?? []), f]);
  }
  return [...m.values()].sort(
    (a, b) => SEVERITY_ORDER[a[0]!.severity] - SEVERITY_ORDER[b[0]!.severity],
  );
}

function renderProblems(list: Finding[], maxPlaces: number): string[] {
  const lines: string[] = [];
  for (const g of groupProblems(list)) {
    const f = g[0]!;
    const sev = f.severity ? `[${f.severity}] ` : "";
    const kind =
      f.layer === "compliance"
        ? ` (${categoryLabel(f.kind)}${f.basis && f.basis !== "contradicts sources" ? `, ${f.basis}` : ""})`
        : "";
    lines.push(`### ${sev}${f.title}${kind}${g.length > 1 ? `, ${g.length} places` : ""}`);
    if (f.issue) lines.push(f.issue);
    if (f.fix) lines.push(`Fix: ${f.fix}`);
    if (f.rule) lines.push(`Rule: ${f.rule}`);
    for (const p of g.slice(0, maxPlaces)) lines.push(placeLine(p));
    if (g.length > maxPlaces) lines.push(`- and ${g.length - maxPlaces} more (see findings.csv)`);
    lines.push("");
  }
  return lines;
}

export function renderPageReport(r: PageReport, site: SiteReport | null): string {
  const findings = pageFindings(r, site);
  const by = (layer: Layer) => findings.filter((f) => f.layer === layer);
  const L: string[] = [];
  L.push(`# ${r.title || r.final_url}`);
  L.push("");
  L.push(`${r.final_url} | ${r.category} / ${r.subsection} | template: ${r.template} | checked ${r.checked_at}`);
  L.push("");
  if (r.compliance.error) L.push(`Compliance: not checked (${r.compliance.error})`);
  else L.push(`Compliance action: **${r.compliance.action ?? "keep"}**. ${r.compliance.summary ?? ""}`);
  L.push("");
  L.push(`- Compliance: ${counts(findings, "compliance")}`);
  L.push(`- GEO: ${counts(findings, "geo")}`);
  L.push(`- SEO: ${counts(findings, "seo")}`);
  if (r.shared_variants.length) L.push(`- Shared zones on this page: ${r.shared_variants.join(", ")} (checked in the site report)`);
  const authorPlaces = findings.filter((f) => f.fix_where === "author").length;
  if (authorPlaces) L.push(`- ${authorPlaces} place(s) are in the author profile, not in the page text (zone "Author")`);
  const templateProblems = site ? countBy(siteFindings(site), "compliance") : null;
  if (templateProblems && templateProblems.high + templateProblems.medium + templateProblems.low) {
    L.push(`- Site template and settings (shared banner, forms, site-wide JSON-LD) are checked once for the whole site, see site.md`);
  }
  L.push("");

  const toReview = findings.filter((f) => !f.verified);
  const ok = (layer: Layer) => by(layer).filter((f) => f.verified);

  L.push("## Compliance", "");
  if (r.compliance.error) L.push(`Not checked: ${r.compliance.error}`, "");
  else if (!ok("compliance").length) L.push("No problems.", "");
  else L.push(...renderProblems(ok("compliance"), 5));

  L.push("## GEO", "");
  const llm = r.geo.llm;
  if (llm.length) {
    L.push("Questions", "");
    for (const a of llm) {
      const unconfirmed = a.answer === "no" && a.needs_confirm && a.confirmed === false;
      const mark = a.answer === "yes" ? "yes" : a.answer === "none" ? "NO ANSWER" : unconfirmed ? "no (not confirmed)" : a.answer === "no" ? "NO" : "n/a";
      L.push(`- ${mark}: ${a.title}${a.value ? ` (${a.value})` : ""}. ${a.note}${a.answer === "no" && a.fix ? ` To do: ${a.fix}` : ""}`);
    }
    L.push("");
  }
  const geoFindings = ok("geo").filter((f) => !llm.some((a) => a.id === f.kind));
  if (geoFindings.length) {
    L.push("Checks", "", ...renderProblems(geoFindings, 5));
  } else if (!llm.length) {
    L.push("No GEO checks apply to this page type or no problems.", "");
  }

  L.push("## SEO", "");
  if (!ok("seo").length) L.push("No problems.", "");
  else L.push(...renderProblems(ok("seo"), 5));

  if (toReview.length) {
    L.push("## To review", "", "The model's quote or rule was not found where it said.", "");
    for (const f of toReview) L.push(`- [${f.layer}] ${f.title}: ${placeLine(f).slice(2)}`);
    L.push("");
  }
  return L.join("\n");
}

export function renderSiteReport(site: SiteReport, reports: PageReport[]): string {
  const findings = siteFindings(site);
  const L: string[] = [];
  L.push(`# Site report`, "", `Run ${site.run_id}`, "");
  L.push("## Scope", "");
  for (const [k, n] of Object.entries(site.scope_counts).sort()) L.push(`- ${k}: ${n} pages`);
  L.push("");

  L.push("## Site checks", "");
  L.push(`- robots.txt AI bots: ${site.basics.robots.value}`);
  L.push(`- llms.txt: ${site.basics.llms_txt.value}`);
  L.push("- Sitemaps:");
  for (const [u, n] of Object.entries(site.basics.sitemaps)) L.push(`  - ${u}: ${n} URLs`);
  L.push("");

  L.push("## Shared zones", "");
  for (const v of site.shared.variants) L.push(`- ${v.id}: ${v.pages.length} pages`);
  L.push("");
  const shared = findings.filter((f) => f.subsection === "shared");
  if (site.shared.compliance?.error) L.push(`Not checked: ${site.shared.compliance.error}`, "");
  else if (site.shared.compliance?.summary) L.push(site.shared.compliance.summary, "");
  if (shared.length) L.push(...renderProblems(shared, 8));
  for (const v of site.shared.variants) {
    L.push(`Pages with ${v.id}: ${v.pages.map((u) => u.replace(/^https:\/\/[^/]+/, "") || "/").join(", ")}`, "");
  }

  L.push("## Site-wide structured data", "");
  if (!site.site_schema) L.push("Not checked.", "");
  else {
    if (site.site_schema.summary) L.push(site.site_schema.summary, "");
    L.push(...renderProblems(findings.filter((f) => f.subsection === "schema"), 8));
  }

  L.push("## SEO across pages", "");
  const collapsed = site.seo.collapsed;
  L.push("Failures on nearly every page of a type (listed once instead of per page):", "");
  if (!collapsed.length) L.push("- none");
  for (const c of collapsed) L.push(`- ${c.id} on ${c.pages_failing} of ${c.pages_total} ${c.profile} pages: ${c.value}`);
  L.push("", "Duplicates:", "");
  if (!site.seo.duplicates.length) L.push("- none");
  for (const d of site.seo.duplicates) L.push(`- ${d.id}: "${d.value.slice(0, 90)}" on ${d.urls.map((u) => u.replace(/^https:\/\/[^/]+/, "") || "/").join(", ")}`);
  L.push("", "Sitemap hygiene:", "");
  if (!site.seo.sitemap_hygiene.length) L.push("- none");
  for (const h of site.seo.sitemap_hygiene) L.push(`- ${h.url}: ${h.problem}`);
  L.push("");

  L.push("## Repeated wording", "");
  const byText = new Map<string, Set<string>>();
  for (const r of reports) {
    for (const p of r.compliance.problems) {
      for (const l of p.locations) {
        const q = l.quote.replace(/\s+/g, " ").trim();
        if (q.length < 8) continue;
        const key = `${p.category}|${q}`;
        byText.set(key, (byText.get(key) ?? new Set()).add(r.final_url));
      }
    }
  }
  const repeated = [...byText].filter(([, u]) => u.size >= 3).sort((a, b) => b[1].size - a[1].size).slice(0, 30);
  if (!repeated.length) L.push("No wording flagged on three or more pages.");
  for (const [key, urls] of repeated) {
    const [cat, q] = key.split("|", 2) as [string, string];
    L.push(`- "${q}" (${categoryLabel(cat)}): ${urls.size} pages`);
  }
  L.push("");
  return L.join("\n");
}

const FINDINGS_HEADER = ["url", "group", "layer", "severity", "category", "zone", "part", "quote", "issue", "fix", "rule", "basis", "fix_where"];

export function buildFindingsCsv(all: Finding[]): string {
  const rows = [csvRow(FINDINGS_HEADER)];
  for (const f of all) {
    rows.push(csvRow([f.url, f.group, f.layer, f.severity, kindLabel(f), f.zone_label || f.zone_id, f.part, f.quote, f.issue || f.title, f.fix, f.rule, f.basis ?? "", FIX_WHERE_LABELS[f.fix_where]]));
  }
  return rows.join("\n") + "\n";
}

export function buildSummaryCsv(reports: PageReport[], site: SiteReport | null): string {
  const rows = [
    csvRow([
      "url", "group", "subsection", "action", "compliance_high", "compliance_medium", "compliance_low",
      "geo_to_fix", "geo_high", "geo_medium", "geo_low", "seo_high", "seo_medium", "seo_low", "summary",
    ]),
  ];
  for (const r of reports) {
    const f = pageFindings(r, site);
    const c = countBy(f, "compliance");
    const g = countBy(f, "geo");
    const s = countBy(f, "seo");
    rows.push(csvRow([r.final_url, r.category, r.subsection, r.compliance.error ? "not_checked" : (r.compliance.action ?? "keep"), c.high, c.medium, c.low, totalOf(g), g.high, g.medium, g.low, s.high, s.medium, s.low, r.compliance.summary ?? ""]));
  }
  return rows.join("\n") + "\n";
}
