import { catalogEntry, loadChecksConfig, type CatalogEntry, type CheckGroupDef } from "./check-catalog.js";
import { siteFindings, type FixWhere } from "./findings.js";
import type { PageReport, SiteReport } from "./report-types.js";

type Severity = "high" | "medium" | "low";

/** One failing page or site item of a check. */
export interface AuditItem {
  url: string;
  profile?: string;
  value: string;
  /** a group of pages sharing the item (duplicates) */
  urls?: string[];
  /** profiles of the pages of a group */
  profiles?: string[];
}

/** One check over the whole site: what it is, how many pages fail it and which. */
export interface AuditRow {
  id: string;
  layer: "seo" | "geo";
  group: string;
  title: string;
  why: string;
  fix: string;
  where: FixWhere;
  severity: Severity;
  status: "ok" | "fail" | "not_checked";
  /** pages that fail, of `total` pages the check applies to (site checks: items) */
  failing: number;
  total: number;
  /** places inside the failing pages (style checks count every occurrence) */
  places: number;
  by_profile: { profile: string; failing: number; total: number }[];
  items: AuditItem[];
  /** how many items were left out of `items` */
  more: number;
  note?: string;
  /** against the previous snapshot: pages that now fail (that passed or were not failing) and pages that were fixed */
  change?: { added: number; fixed: number; prev_failing: number };
}

/** One problem the model found in the texts shared by many pages, once, with every place it appears. */
export interface TemplateIssue {
  title: string;
  kind: string;
  severity: Severity;
  basis: string;
  /** "Banner CTA (variant 2)", "Forms (variant 1)", "Site-wide structured data" */
  places: string[];
  /** distinct pages the places appear on; site-wide markup is on every page */
  pages: number;
  quote: string;
  issue: string;
  fix: string;
  rule: string;
}

export interface AuditCounts {
  high: number;
  medium: number;
  low: number;
  /** checks without findings, of `total` checks that ran */
  ok: number;
  total: number;
}

export interface SiteAudit {
  run_id: string;
  groups: CheckGroupDef[];
  pages: number;
  coverage: { sitemap_urls: number | null; in_scope: number | null; outside_scope: number | null };
  /** plain-language text under each block (config/checks.json) */
  blocks: Record<string, string>;
  /** page address to its slug in this snapshot: `#/pages/<slug>?run=<run_id>` is the page's report */
  slugs: Record<string, string>;
  /** pages per profile, for the page type filter */
  profiles: { profile: string; pages: number }[];
  /** the snapshot before this one, when there is one to compare with */
  previous: { run_id: string; started_at: string; pages: number; fixed: number; added: number; checks_cleared: number; checks_broken: number } | null;
  summary: {
    seo: AuditCounts;
    geo: AuditCounts;
    style: { checks: number; failing: number; pages: number; places: number };
    /** what the model found in banners, forms and site-wide markup; `checked` is false until the model has run on this snapshot */
    template: { checked: boolean; findings: number; high: number; medium: number; low: number; issues: TemplateIssue[] };
    /** the failing checks to fix first: severity, then pages affected */
    first: { id: string; title: string; severity: Severity; failing: number; total: number; where: FixWhere; fix: string }[];
    not_checked: string[];
  };
  rows: AuditRow[];
}

/** The previous snapshot, already worked out, to say what changed. */
export interface AuditPrevious {
  audit: SiteAudit;
  started_at: string;
  /** final URLs of the pages it checked */
  urls: Set<string>;
}

export interface AuditOptions {
  aiBots: string[];
  llmsUrl: string;
  /** profiles whose pages must be linked from another page */
  orphanProfiles: string[];
  /** page address (requested and final) to the slug the page has in the snapshot, so a page of a check opens its report */
  slugs?: Record<string, string>;
}

const SEV_RANK: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
const MAX_ITEMS = 1000;
const clip = (s: string, n = 160): string => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const norm = (u: string): string => u.replace(/\/$/, "");

interface Acc {
  entry: CatalogEntry;
  severity: Severity;
  total: number;
  places: number;
  items: AuditItem[];
  profiles: Map<string, { failing: number; total: number }>;
}

function finish(id: string, a: Acc): AuditRow {
  const failing = a.items.length;
  return {
    id,
    layer: a.entry.layer,
    group: a.entry.group,
    title: a.entry.title || id,
    why: a.entry.why,
    fix: a.entry.fix,
    where: a.entry.where,
    severity: a.severity,
    status: failing ? "fail" : "ok",
    failing,
    total: a.total,
    places: a.places,
    by_profile: [...a.profiles].map(([profile, v]) => ({ profile, ...v })).sort((x, y) => y.failing - x.failing || y.total - x.total),
    items: a.items.slice(0, MAX_ITEMS),
    more: Math.max(0, a.items.length - MAX_ITEMS),
  };
}

/**
 * The whole-site view of a snapshot: every page check summed over the pages, plus the checks that only exist for the
 * site (robots, llms.txt, duplicates, orphans, sitemap hygiene). Computed from the stored reports, nothing is fetched.
 */
export function buildSiteAudit(site: SiteReport, reports: PageReport[], opts: AuditOptions, previous: AuditPrevious | null = null): SiteAudit {
  const cfg = loadChecksConfig();
  // groups kept out of the summary counts (writing style)
  const apart = new Set(cfg.groups.filter((g) => g.apart).map((g) => g.key));
  const accs = new Map<string, Acc>();
  const profileOf = new Map<string, string>();
  const profileTotals = new Map<string, number>();
  for (const r of reports) {
    profileOf.set(norm(r.final_url), r.profile);
    profileOf.set(norm(r.url), r.profile);
    profileTotals.set(r.profile, (profileTotals.get(r.profile) ?? 0) + 1);
  }

  // ---- page checks, summed over the pages ----
  for (const r of reports) {
    const checks: { layer: "seo" | "geo"; id: string; status: string; value: string; severity?: Severity; places?: unknown[] }[] = [];
    if (!r.seo.skipped) for (const c of r.seo.checks) checks.push({ layer: "seo", ...c });
    if (!r.geo.skipped) for (const c of r.geo.code) checks.push({ layer: "geo", ...c });
    for (const c of checks) {
      if (c.status === "na") continue;
      let a = accs.get(c.id);
      if (!a) {
        a = { entry: catalogEntry(cfg, c.id, c.layer), severity: c.severity ?? "medium", total: 0, places: 0, items: [], profiles: new Map() };
        accs.set(c.id, a);
      }
      a.total++;
      const p = a.profiles.get(r.profile) ?? { failing: 0, total: 0 };
      p.total++;
      if (c.status === "fail") {
        p.failing++;
        a.places += c.places?.length || 1;
        a.items.push({ url: r.final_url, profile: r.profile, value: clip(c.value) });
      }
      a.profiles.set(r.profile, p);
    }
  }
  const rows: AuditRow[] = [...accs].map(([id, a]) => finish(id, a));

  // ---- site-only checks ----
  const siteRow = (id: string, severity: Severity, total: number, items: AuditItem[], extra: Partial<AuditRow> = {}): AuditRow => {
    const e = catalogEntry(cfg, id, "seo");
    const byProfile = new Map<string, number>();
    for (const it of items) for (const u of it.urls ?? [it.url]) {
      const p = profileOf.get(norm(u));
      if (p) byProfile.set(p, (byProfile.get(p) ?? 0) + 1);
    }
    return {
      id,
      layer: e.layer,
      group: e.group,
      title: e.title,
      why: e.why,
      fix: e.fix,
      where: e.where,
      severity,
      status: items.length ? "fail" : "ok",
      failing: items.reduce((n, it) => n + (it.urls?.length ?? 1), 0),
      total,
      places: items.length,
      by_profile: [...byProfile].map(([profile, failing]) => ({ profile, failing, total: profileTotals.get(profile) ?? failing })).sort((x, y) => y.failing - x.failing),
      items: items.slice(0, MAX_ITEMS),
      more: Math.max(0, items.length - MAX_ITEMS),
      ...extra,
    };
  };

  const blocked = site.basics.robots.ok ? [] : site.basics.robots.value.replace(/^blocked:\s*/i, "").split(",").map((s) => s.trim()).filter(Boolean);
  // snapshots made before the site checks existed only know the crude robots.txt result
  if (!(site.tech ?? []).some((c) => c.id === "robots_ai_bots"))
  rows.push(
    siteRow("robots_ai_bots", "high", opts.aiBots.length, blocked.map((b) => ({ url: b, value: "blocked in robots.txt" })), {
      note: `Checked: ${opts.aiBots.join(", ")}. ${blocked.length ? `Blocked: ${blocked.join(", ")}.` : "All allowed."}`,
    }),
  );
  rows.push(
    siteRow("llms_txt", "medium", 1, site.basics.llms_txt.ok ? [] : [{ url: opts.llmsUrl, value: site.basics.llms_txt.value }], {
      note: site.basics.llms_txt.ok ? `${opts.llmsUrl}: ${site.basics.llms_txt.value}` : undefined,
    }),
  );
  for (const id of ["duplicate_title", "duplicate_meta", "duplicate_h1"] as const) {
    const groups = site.seo.duplicates.filter((d) => d.id === id);
    rows.push(
      siteRow(id, "medium", reports.length, groups.map((d) => ({ url: d.urls[0]!, urls: d.urls, profiles: [...new Set(d.urls.map((u) => profileOf.get(norm(u))).filter((p): p is string => !!p))], value: `"${clip(d.value, 90)}" on ${d.urls.length} pages` }))),
    );
  }
  if (site.seo.orphans === undefined) {
    rows.push(siteRow("orphan_page", "medium", 0, [], { status: "not_checked", note: site.seo.orphans_note ?? "The link graph was not worked out for this run." }));
  } else {
    const total = reports.filter((r) => opts.orphanProfiles.includes(r.profile)).length;
    rows.push(siteRow("orphan_page", "medium", total, site.seo.orphans.map((u) => ({ url: u, profile: profileOf.get(norm(u)), value: "no page links to it from its content" }))));
  }
  for (const c of site.tech ?? []) {
    rows.push(siteRow(c.id, c.severity, c.total, c.items, { note: c.note, ...(c.status === "na" ? { status: "not_checked" as const } : {}) }));
  }
  const hygiene = site.seo.sitemap_hygiene;
  rows.push(
    siteRow(
      "sitemap_hygiene",
      hygiene.some((h) => (h.severity ?? "high") === "high") ? "high" : "medium",
      site.sitemap?.filter((r) => r.scope && !r.excluded).length ?? reports.length,
      hygiene.map((h) => ({ url: h.url, value: h.problem })),
    ),
  );

  // ---- order: group, then problems first ----
  const groupRank = new Map(cfg.groups.map((g, i) => [g.key, i]));
  const statusRank = { fail: 0, ok: 1, not_checked: 2 } as const;
  rows.sort(
    (a, b) =>
      (groupRank.get(a.group) ?? 999) - (groupRank.get(b.group) ?? 999) ||
      statusRank[a.status] - statusRank[b.status] ||
      SEV_RANK[a.severity] - SEV_RANK[b.severity] ||
      b.failing - a.failing,
  );

  // ---- what changed since the previous snapshot ----
  // A page counts as fixed or new only when both snapshots checked it, so a bigger scope does not look like new problems.
  const nowUrls = new Set(reports.map((r) => norm(r.final_url)));
  const keysOf = (r: AuditRow): Set<string> => new Set(r.items.flatMap((it) => it.urls ?? [it.url]).map(norm));
  let fixedTotal = 0;
  let addedTotal = 0;
  let cleared = 0;
  let broken = 0;
  if (previous) {
    const prevUrls = new Set([...previous.urls].map(norm));
    const prevRows = new Map(previous.audit.rows.map((r) => [r.id, r]));
    for (const r of rows) {
      const p = prevRows.get(r.id);
      if (!p || p.status === "not_checked" || r.status === "not_checked") continue;
      const before = keysOf(p);
      const after = keysOf(r);
      const isPage = (k: string): boolean => /^https?:/.test(k);
      const fixed = [...before].filter((k) => !after.has(k) && (!isPage(k) || nowUrls.has(k))).length;
      const added = [...after].filter((k) => !before.has(k) && (!isPage(k) || prevUrls.has(k))).length;
      if (fixed || added) r.change = { added, fixed, prev_failing: p.failing };
      if (!apart.has(r.group)) {
        fixedTotal += fixed;
        addedTotal += added;
        if (p.status === "fail" && r.status === "ok") cleared++;
        if (p.status === "ok" && r.status === "fail") broken++;
      }
    }
  }

  // ---- the model's findings on the shared texts, once per problem ----
  const modelChecked = !!(site.shared.compliance || site.site_schema);
  const sharedPages = new Map(site.shared.variants.map((v) => [v.id, v.pages.map(norm)]));
  const placeLabel = (zone: string): string => {
    const m = zone.match(/^(banner_cta|modals)@(\d+)$/);
    return m ? `${m[1] === "banner_cta" ? "Banner CTA" : "Forms"} (variant ${m[2]})` : "Site-wide structured data";
  };
  const issues = new Map<string, TemplateIssue & { pageSet: Set<string> }>();
  let templateFindings = 0;
  for (const f of siteFindings(site)) {
    if (f.layer !== "compliance") continue;
    templateFindings++;
    const key = `${f.subsection}|${f.kind}|${f.title}`;
    const sev = (f.severity || "medium") as Severity;
    let i = issues.get(key);
    if (!i) {
      i = { title: f.title, kind: f.kind, severity: sev, basis: f.basis ?? "", places: [], pages: 0, quote: f.quote, issue: f.issue, fix: f.fix, rule: f.rule, pageSet: new Set() };
      issues.set(key, i);
    }
    if (SEV_RANK[sev] < SEV_RANK[i.severity]) i.severity = sev;
    const label = placeLabel(f.zone_id);
    if (!i.places.includes(label)) i.places.push(label);
    for (const u of f.subsection === "schema" ? [...nowUrls] : (sharedPages.get(f.zone_id) ?? [])) i.pageSet.add(u);
  }
  const templateIssues: TemplateIssue[] = [...issues.values()]
    .map(({ pageSet, ...i }) => ({ ...i, pages: pageSet.size }))
    .sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity] || b.pages - a.pages);

  // ---- summary ----
  const counts = (layer: "seo" | "geo"): AuditCounts => {
    const c: AuditCounts = { high: 0, medium: 0, low: 0, ok: 0, total: 0 };
    for (const r of rows) {
      if (r.layer !== layer || apart.has(r.group) || r.status === "not_checked") continue;
      c.total++;
      if (r.status === "ok") c.ok++;
      else c[r.severity]++;
    }
    return c;
  };
  const style = rows.filter((r) => apart.has(r.group) && r.status !== "not_checked");
  const stylePages = new Set<string>();
  for (const r of style) for (const it of r.items) stylePages.add(it.url);
  const first = rows
    .filter((r) => r.status === "fail" && !apart.has(r.group))
    .sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity] || b.failing - a.failing)
    .slice(0, 7)
    .map((r) => ({ id: r.id, title: r.title, severity: r.severity, failing: r.failing, total: r.total, where: r.where, fix: r.fix }));

  const map = site.sitemap;
  const inScope = map ? map.filter((r) => r.scope && !r.excluded).length : null;
  return {
    run_id: site.run_id,
    groups: cfg.groups,
    blocks: cfg.blocks ?? {},
    slugs: opts.slugs ?? {},
    pages: reports.length,
    profiles: [...profileTotals].map(([profile, pages]) => ({ profile, pages })).sort((a, b) => b.pages - a.pages),
    coverage: { sitemap_urls: map?.length ?? null, in_scope: inScope, outside_scope: map && inScope !== null ? map.length - inScope : null },
    previous: previous
      ? { run_id: previous.audit.run_id, started_at: previous.started_at, pages: previous.audit.pages, fixed: fixedTotal, added: addedTotal, checks_cleared: cleared, checks_broken: broken }
      : null,
    summary: {
      seo: counts("seo"),
      geo: counts("geo"),
      style: { checks: style.length, failing: style.filter((r) => r.status === "fail").length, pages: stylePages.size, places: style.reduce((n, r) => n + r.places, 0) },
      template: {
        checked: modelChecked,
        findings: templateFindings,
        high: templateIssues.filter((i) => i.severity === "high").length,
        medium: templateIssues.filter((i) => i.severity === "medium").length,
        low: templateIssues.filter((i) => i.severity === "low").length,
        issues: templateIssues,
      },
      first,
      not_checked: [
        "Compliance of each page against the company documents (needs the model, run it on the Run page)",
        "GEO questions about wording and answers (need the model)",
        ...(modelChecked ? [] : ["Shared banner and form texts, site-wide JSON-LD wording (need the model)"]),
        "Speed, Core Web Vitals and mobile rendering (need a browser)",
      ],
    },
    rows,
  };
}
