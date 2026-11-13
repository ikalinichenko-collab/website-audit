import type { PageReport, SeoSiteResult } from "./report-types.js";
import { urlsMatch } from "./utils.js";

/** Failing checks that are collapsed per profile when they fail on (nearly) every page of it. */
const COLLAPSE_IDS = new Set(["schema_recommended", "schema_required", "image_dimensions", "heading_order", "link_to_services"]);
const COLLAPSE_SHARE = 0.9;

export interface TextSlots {
  url: string;
  title: string;
  meta: string;
  h1: string;
  /** Set on a page taken from the site map (not fetched in this run): when it was last fetched. */
  map_checked_at?: string;
}

/**
 * Site-level SEO checks computed from the page reports (duplicates, collapsed failures, sitemap hygiene).
 * `slots` holds the pages of this run plus, in a partial run, the site map pages it did not fetch; a duplicate is
 * kept only when it involves a page of this run, so a small run does not repeat old duplicates between other pages.
 */
export function seoSiteChecks(reports: PageReport[], slots: TextSlots[]): SeoSiteResult {
  const duplicates: SeoSiteResult["duplicates"] = [];
  for (const [key, id] of [
    ["title", "duplicate_title"],
    ["meta", "duplicate_meta"],
    ["h1", "duplicate_h1"],
  ] as const) {
    const m = new Map<string, string[]>();
    for (const s of slots) {
      const v = s[key].trim();
      if (!v) continue;
      m.set(v, [...(m.get(v) ?? []), s.url]);
    }
    for (const [value, urls] of m) {
      if (urls.length < 2) continue;
      const mapped = urls.map((u) => slots.find((s) => s.url === u)!.map_checked_at).filter((t): t is string => !!t);
      if (mapped.length === urls.length) continue;
      duplicates.push({ id, value, urls, ...(mapped.length ? { others_as_of: mapped.sort()[0]! } : {}) });
    }
  }

  const collapsed: SeoSiteResult["collapsed"] = [];
  const byProfile = new Map<string, PageReport[]>();
  for (const r of reports) byProfile.set(r.profile, [...(byProfile.get(r.profile) ?? []), r]);
  for (const [profile, list] of byProfile) {
    if (list.length < 3) continue;
    for (const id of COLLAPSE_IDS) {
      const checks = list.map((r) => r.seo.checks.find((c) => c.id === id));
      const present = checks.filter((c) => c);
      const failing = present.filter((c) => c!.status === "fail");
      if (present.length >= 3 && failing.length / present.length >= COLLAPSE_SHARE) {
        collapsed.push({ id, profile, pages_failing: failing.length, pages_total: present.length, value: failing[0]!.value });
      }
    }
  }

  const sitemap_hygiene: SeoSiteResult["sitemap_hygiene"] = [];
  for (const r of reports) {
    // a sitemap lists the pages that are their own canonical; one whose canonical is another URL is a hygiene problem
    const canon = r.seo.checks.find((c) => c.id === "canonical");
    if (canon && canon.value && canon.value !== "missing") {
      let target = "";
      try {
        target = new URL(canon.value, r.final_url).href;
      } catch {
        /* not a URL: the canonical check reports it */
      }
      if (target && !urlsMatch(target, r.final_url)) sitemap_hygiene.push({ url: r.url, problem: `canonical points to ${target}`, severity: "medium" });
    }
    const http = r.seo.checks.find((c) => c.id === "http_status");
    if (http?.status === "fail") sitemap_hygiene.push({ url: r.url, problem: http.value });
    const idx = r.seo.checks.find((c) => c.id === "indexable");
    if (idx?.status === "fail") sitemap_hygiene.push({ url: r.url, problem: `noindex (${idx.value})` });
  }
  return { duplicates, collapsed, sitemap_hygiene };
}

/** True when a failing check was collapsed into a site-wide entry for the page's profile. */
export function isCollapsed(site: SeoSiteResult, profile: string, checkId: string): boolean {
  return site.collapsed.some((c) => c.profile === profile && c.id === checkId);
}
