import type { PageReport, SiteReport } from "./report-types.js";
import { categoryLabel } from "./categories.js";

export type Layer = "compliance" | "geo" | "seo";
export type Severity = "high" | "medium" | "low";

/** One place of one finding: the unit of findings.csv and of the viewer lists. */
export interface Finding {
  url: string;
  group: string;
  subsection: string;
  layer: Layer;
  /** empty only for the site-wide GEO findings (robots.txt, llms.txt) */
  severity: Severity | "";
  /** compliance category, GEO or SEO check id */
  kind: string;
  title: string;
  zone_id: string;
  zone_label: string;
  part: string;
  quote: string;
  issue: string;
  fix: string;
  rule: string;
  /** false: the quote or rule was not found where the model said; shown under "To review" */
  verified: boolean;
  /** text-fragment value for a link to the live page */
  fragment: string | null;
  /** Compliance only: why it is a finding */
  basis?: "contradicts sources" | "not in sources" | "term list";
  /** Compliance only: what the page says and what the documents say about the same subject (from the model; none for term-list findings) */
  page_value?: string;
  source_value?: string;
  /** Compliance only: why this place is a problem (from the model); absent in older reports and for term-list hits */
  reason?: string;
  /** readable place for a table cell ("table, row ..., column ...") instead of "table_cell 18" */
  place?: string;
  /** who edits it: site template and settings, this page's own content, or the author profile */
  fix_where: FixWhere;
}

export type FixWhere = "template" | "page" | "author";

export const FIX_WHERE_LABELS: Record<FixWhere, string> = {
  template: "Site template and settings",
  page: "This page",
  author: "Author profile",
};

type FindingDraft = Omit<Finding, "fix_where">;

export const SEO_LABELS: Record<string, string> = {
  http_status: "Page does not return a clean 200",
  title_length: "Title length",
  meta_present: "Meta description missing",
  meta_length: "Meta description length",
  h1_count: "H1 count is not one",
  title_h1_match: "Title and H1 say different things",
  canonical: "Canonical",
  indexable: "Page is noindex",
  schema_required: "Required structured data missing",
  schema_recommended: "Recommended structured data missing",
  author: "Author missing",
  dates: "Dates missing in structured data",
  date_mismatch: "Visible date differs from dateModified",
  broken_internal_links: "Broken internal link",
  redirecting_internal_links: "Internal link goes through a redirect",
  link_to_services: "No link to a service page",
  alt_missing: "Image without alt attribute",
  alt_empty: "Image with empty alt",
  image_dimensions: "Image without width and height",
  heading_order: "Heading level skipped",
  og_present: "Open Graph tags missing",
  og_url_canonical: "og:url differs from canonical",
  twitter_card: "twitter:card missing",
  html_lang: "html lang missing",
  viewport: "Viewport meta missing",
  jsonld_valid: "JSON-LD does not parse",
  article_fields: "Article schema fields missing",
  anchors_resolve: "Anchor link has no target",
  faq_schema_matches_dom: "FAQ markup and schema disagree",
};

export const GEO_LABELS: Record<string, string> = {
  answer_first: "Opening does not answer the H1",
  buyer_problem: "Page does not open with a buyer problem",
  lead_with_hire: "Page does not lead with the hire",
  recruiting_firm_early: "Does not say early that GoGloby is a recruiting firm",
  faq_quality: "FAQ answers are not direct",
  buyer_ready: "Not written for buyers ready to hire",
  target_keyword: "No matching search term",
  uses_data: "No quotable data",
  proof_background: "Does not use founders' background as proof",
  sell_against_open_role: "Does not compare with an open full-time role",
  home_title_exact: "Home title differs from the approved one",
  trap_terms: "Trap term in title, H1, meta or og",
  nearshore_not_first: "Nearshore or LatAm in the hero",
  faq_present: "No FAQ",
  target_keyword_placement: "Target term missing",
  em_dash: "Em dash",
  ampersand: "\"&\" instead of \"and\"",
  uk_spelling: "UK spelling",
};

/** Glossary section behind each GEO code check; a check with no entry names no rule. */
const GEO_CODE_RULES: Record<string, string> = {
  home_title_exact: "Glossary §6",
  trap_terms: "Glossary §8",
  nearshore_not_first: "Glossary §9",
  em_dash: "Glossary §9",
  ampersand: "Glossary §9",
  uk_spelling: "Glossary §9",
};

const NO_FRAGMENT_ZONES = /^(title|meta_description|og_title|og_description|json_ld|banner_cta@|modals@)/;

export function fragmentAllowed(zoneId: string): boolean {
  return !NO_FRAGMENT_ZONES.test(zoneId);
}

function variantLabel(zoneId: string): string | null {
  const v = zoneId.match(/^(banner_cta|modals)@(\d+)$/);
  return v ? `${v[1] === "banner_cta" ? "Banner CTA" : "Forms"} (variant ${v[2]})` : null;
}

function zoneLabel(r: PageReport, zoneId: string): string {
  if (!zoneId || zoneId === "page") return zoneId === "page" ? "Whole page" : "";
  const found = r.zones.find((z) => z.id === zoneId)?.label;
  if (found) return found;
  return variantLabel(zoneId) ?? zoneId;
}

/** The model fills `source_value` with "not in Fact Sheet" when the documents are silent: that is the basis, not a value. */
function compared(p: { page_value: string | null; source_value: string | null; unverified: boolean }): Pick<Finding, "page_value" | "source_value"> {
  return {
    ...(p.page_value ? { page_value: p.page_value } : {}),
    ...(p.source_value && !p.unverified ? { source_value: p.source_value } : {}),
  };
}

function basisOf(p: { source: string; unverified: boolean; basis: string | null }): Finding["basis"] {
  return p.source === "code" ? "term list" : p.unverified ? "not in sources" : "contradicts sources";
}

/** "field 1" on single-field zones (title, meta) says nothing, so it is dropped. */
function cleanPart(part: string | null | undefined): string {
  return part && !/^field \d+$/.test(part) ? part : "";
}

function base(r: PageReport): Pick<Finding, "url" | "group" | "subsection"> {
  return { url: r.final_url, group: r.category, subsection: r.subsection };
}

/** Findings of one page across the three layers. Checks collapsed into a site-wide entry are left out. */
export function pageFindings(r: PageReport, site: SiteReport | null): Finding[] {
  // site-wide JSON-LD nodes are already removed from the page zones, so what is left is the page's own
  return pageFindingDrafts(r, site).map((f) => ({ ...f, fix_where: f.zone_id === "author" ? "author" : "page" }));
}

function pageFindingDrafts(r: PageReport, site: SiteReport | null): FindingDraft[] {
  const out: FindingDraft[] = [];
  const collapsed = new Set((site?.seo.collapsed ?? []).filter((c) => c.profile === r.profile).map((c) => c.id));

  for (const p of r.compliance.problems) {
    const locs = p.locations.length ? p.locations : [{ zone_id: "", part: null, quote: "", verified: false, fragment: null }];
    for (const l of locs) {
      out.push({
        ...base(r),
        layer: "compliance",
        severity: p.severity,
        kind: p.category,
        title: p.title,
        zone_id: l.zone_id,
        zone_label: zoneLabel(r, l.zone_id),
        part: cleanPart(l.part),
        ...(l.place ? { place: l.place } : {}),
        ...(l.reason ? { reason: l.reason } : {}),
        quote: l.quote,
        issue: p.issue,
        fix: p.fix,
        rule: p.rule,
        verified: l.verified && p.rule_verified,
        fragment: l.fragment ?? null,
        basis: basisOf(p),
        ...compared(p),
      });
    }
  }

  for (const a of r.geo.llm) {
    if (a.answer !== "no") continue;
    // a second answer that differed means the first one is not confirmed: listed apart, not a finding
    if (a.needs_confirm && a.confirmed === false) continue;
    out.push({
      ...base(r),
      layer: "geo",
      severity: a.severity ?? "medium",
      kind: a.id,
      title: a.title || GEO_LABELS[a.id] || a.id,
      zone_id: a.zone_id ?? "page",
      zone_label: zoneLabel(r, a.zone_id ?? "page"),
      part: "",
      quote: a.evidence ?? "",
      issue: a.note,
      fix: a.fix ?? "",
      rule: "",
      verified: a.evidence_verified !== false,
      fragment: a.fragment ?? null,
    });
  }
  const geoChecks = [...r.geo.code, ...(r.geo.placement ? [r.geo.placement] : [])];
  for (const c of geoChecks) {
    if (c.status !== "fail") continue;
    if (c.id === "target_keyword_placement") {
      for (const slot of c.missing ?? []) {
        out.push({
          ...base(r),
          layer: "geo",
          severity: c.severity ?? "medium",
          kind: c.id,
          title: GEO_LABELS[c.id]!,
          zone_id: slot,
          zone_label: zoneLabel(r, slot) || slot,
          part: "",
          quote: "",
          issue: `"${c.value}" is missing in ${slot}`,
          fix: "",
          rule: "Glossary §6",
          verified: true,
          fragment: null,
        });
      }
      continue;
    }
    const places = c.places?.length ? c.places : [{ zone_id: "page", value: c.value }];
    for (const pl of places) {
      out.push({
        ...base(r),
        layer: "geo",
        severity: c.severity ?? "medium",
        kind: c.id,
        title: GEO_LABELS[c.id] ?? c.id,
        zone_id: pl.zone_id,
        zone_label: zoneLabel(r, pl.zone_id),
        part: pl.part ?? "",
        ...(pl.place ? { place: pl.place } : {}),
        quote: pl.value,
        issue: c.places?.length ? "" : c.value,
        fix: "",
        rule: GEO_CODE_RULES[c.id] ?? "",
        verified: true,
        fragment: null,
      });
    }
  }

  for (const c of r.seo.checks) {
    if (c.status !== "fail" || collapsed.has(c.id)) continue;
    const places = c.places?.length ? c.places : [{ zone_id: c.zone_id, value: c.value, part: undefined }];
    for (const pl of places) {
      out.push({
        ...base(r),
        layer: "seo",
        severity: c.severity,
        kind: c.id,
        title: SEO_LABELS[c.id] ?? c.id,
        zone_id: pl.zone_id,
        zone_label: zoneLabel(r, pl.zone_id),
        part: pl.part ?? "",
        quote: pl.value,
        issue: c.places?.length ? c.value : "",
        fix: "",
        rule: "",
        verified: true,
        fragment: null,
      });
    }
  }
  return out;
}

/** Site-level findings: shared zones, site-wide schema, SEO site checks, collapsed failures. */
export function siteFindings(site: SiteReport): Finding[] {
  return siteFindingDrafts(site).map((f) => ({ ...f, fix_where: "template" }));
}

function siteFindingDrafts(site: SiteReport): FindingDraft[] {
  const out: FindingDraft[] = [];
  const baseSite = { url: "site", group: "Site", subsection: "" };
  const fromCompliance = (res: NonNullable<SiteReport["site_schema"]>, source: string, label: string, pagesOf?: (zone: string) => string[]) => {
    for (const p of res.problems) {
      const locs = p.locations.length ? p.locations : [{ zone_id: "", part: null, quote: "", verified: false }];
      for (const l of locs) {
        const pages = pagesOf?.(l.zone_id) ?? [];
        out.push({
          ...baseSite,
          subsection: source,
          layer: "compliance",
          severity: p.severity,
          kind: p.category,
          title: p.title,
          zone_id: l.zone_id,
          zone_label: pages.length ? `${variantLabel(l.zone_id) ?? label} on ${pages.length} pages` : label,
          part: cleanPart(l.part),
          quote: l.quote,
          issue: p.issue,
          fix: p.fix,
          rule: p.rule,
          verified: l.verified && p.rule_verified,
          fragment: null,
          basis: basisOf(p),
          ...compared(p),
        });
      }
    }
  };
  if (site.shared.compliance) {
    fromCompliance(site.shared.compliance, "shared", "Shared zone", (z) => site.shared.variants.find((v) => v.id === z)?.pages ?? []);
  }
  if (site.site_schema) fromCompliance(site.site_schema, "schema", "Site-wide structured data");

  for (const c of site.seo.collapsed) {
    out.push({
      ...baseSite,
      layer: "seo",
      severity: "medium",
      kind: c.id,
      title: SEO_LABELS[c.id] ?? c.id,
      zone_id: "",
      zone_label: `${c.profile} pages`,
      part: "",
      quote: c.value,
      issue: `Fails on ${c.pages_failing} of ${c.pages_total} ${c.profile} pages`,
      fix: "",
      rule: "",
      verified: true,
      fragment: null,
    });
  }
  for (const d of site.seo.duplicates) {
    out.push({
      ...baseSite,
      layer: "seo",
      severity: "medium",
      kind: d.id,
      title: d.id.replace(/_/g, " "),
      zone_id: "",
      zone_label: "",
      part: "",
      quote: d.value,
      issue: `Same value on ${d.urls.length} pages: ${d.urls.join(", ")}`,
      fix: "",
      rule: "",
      verified: true,
      fragment: null,
    });
  }
  for (const h of site.seo.sitemap_hygiene) {
    out.push({
      ...baseSite,
      layer: "seo",
      severity: "high",
      kind: "sitemap_hygiene",
      title: "Sitemap URL is not a clean 200",
      zone_id: "",
      zone_label: "",
      part: "",
      quote: h.url,
      issue: h.problem,
      fix: "",
      rule: "",
      verified: true,
      fragment: null,
    });
  }
  if (!site.basics.robots.ok) {
    out.push({ ...baseSite, layer: "geo", severity: "", kind: "robots_ai_bots", title: "robots.txt blocks AI bots", zone_id: "", zone_label: "", part: "", quote: site.basics.robots.value, issue: site.basics.robots.value, fix: "", rule: "", verified: true, fragment: null });
  }
  if (!site.basics.llms_txt.ok) {
    out.push({ ...baseSite, layer: "geo", severity: "", kind: "llms_txt", title: "llms.txt missing or empty", zone_id: "", zone_label: "", part: "", quote: site.basics.llms_txt.value, issue: site.basics.llms_txt.value, fix: "", rule: "", verified: true, fragment: null });
  }
  return out;
}

export interface LayerCounts {
  high: number;
  medium: number;
  low: number;
  /** findings without severity (site-wide GEO findings) */
  other: number;
}

/** All distinct findings of a count, whatever their severity. */
export function totalOf(c: LayerCounts): number {
  return c.high + c.medium + c.low + c.other;
}

/** Counts distinct findings, not places: a compliance problem with 9 places counts once, a check once. */
export function countBy(findings: Finding[], layer: Layer): LayerCounts {
  const c: LayerCounts = { high: 0, medium: 0, low: 0, other: 0 };
  const seen = new Set<string>();
  for (const f of findings) {
    if (f.layer !== layer) continue;
    const key = layer === "compliance" ? `${f.kind}|${f.title}|${f.issue}` : `${f.url}|${f.kind}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (f.severity) c[f.severity]++;
    else c.other++;
  }
  return c;
}

export function kindLabel(f: Finding): string {
  return f.layer === "compliance" ? categoryLabel(f.kind) : f.title;
}
