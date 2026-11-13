import * as cheerio from "cheerio";
import type { PageZones } from "./types.js";
import { isInternal } from "./utils.js";

/** URL as the link graph knows it: no hash, no trailing slash. */
export function graphUrl(u: string): string {
  return u.split("#")[0]!.replace(/\/$/, "");
}

/**
 * Internal links in the main content of a page: the audited page zones only, so the menu, footer, related-content
 * widget and shared template zones (banner, forms) do not count as a page linking to another.
 */
export function mainContentLinks(zones: PageZones, finalUrl: string, baseUrl: string, skipPatterns: string[]): string[] {
  const out = new Set<string>();
  for (const z of zones.zones) {
    if (z.skipped || z.scope !== "page") continue;
    for (const p of z.parts) {
      for (const l of p.links ?? []) {
        if (/^(mailto:|tel:|javascript:)/i.test(l.href) || l.href.startsWith("#")) continue;
        let abs: string;
        try {
          abs = new URL(l.href, finalUrl).href;
        } catch {
          continue;
        }
        if (!isInternal(abs, baseUrl) || skipPatterns.some((s) => abs.includes(s))) continue;
        out.add(graphUrl(abs));
      }
    }
  }
  return [...out];
}

/**
 * Internal links of a listing page, read from the HTML outside the site header, footer and menus. The item cards of a
 * listing are not text parts, so the zones miss most of them; here every card counts as a link from the listing.
 */
export function listingLinks(html: string, pageUrl: string, baseUrl: string, skipPatterns: string[]): string[] {
  const $ = cheerio.load(html);
  $("script, style, noscript, header, footer, nav, .site-header, .site-footer").remove();
  const out = new Set<string>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href) || href.startsWith("#")) return;
    try {
      const abs = new URL(href, pageUrl).href;
      if (isInternal(abs, baseUrl) && !skipPatterns.some((s) => abs.includes(s))) out.add(graphUrl(abs));
    } catch {
      /* not a URL */
    }
  });
  return [...out];
}

/** The address of page `n` of a listing: a link on `html` to `<listing path>/page/<n>/`, or null when the page has none. */
export function nextListingPage(html: string, pageUrl: string, listingUrl: string, n: number): string | null {
  const base = new URL(listingUrl);
  const want = `${base.pathname.replace(/\/$/, "")}/page/${n}`;
  const re = /<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    try {
      const u = new URL(m[1]!, pageUrl);
      if (u.hostname === base.hostname && u.pathname.replace(/\/$/, "") === want) return u.href.split("#")[0]!;
    } catch {
      /* not a URL */
    }
  }
  return null;
}

export interface GraphNode {
  /** graph URL of the sitemap entry */
  url: string;
  profile: string;
  /** fetched in this run */
  inRun: boolean;
  /** the page cannot be a page of the graph (it redirects to another URL of the list) */
  skip?: boolean;
  /** a listing page (reached from the menu, it links to its items): its links count, but it is not reported as an orphan */
  exempt?: boolean;
}

export interface OrphanResult {
  /** inbound page count per node, or null when the graph is not complete */
  inbound: Map<string, number> | null;
  orphans: string[];
  /** why orphans were not worked out */
  note?: string;
}

/**
 * Inbound links per page and the pages nobody links to. The graph is complete when every node has a stored link list;
 * until then counts would be too low, so nothing is reported. A partial run reports only orphans among its own pages.
 */
export function orphanPages(nodes: GraphNode[], links: Map<string, string[]>, profiles: string[], partial: boolean): OrphanResult {
  const live = nodes.filter((n) => !n.skip);
  const missing = live.filter((n) => !links.has(n.url));
  if (missing.length) {
    return { inbound: null, orphans: [], note: `${missing.length} of ${live.length} in-scope pages have no stored links yet: run the site check on the whole site` };
  }
  const known = new Set(live.map((n) => n.url));
  const sources = new Map<string, Set<string>>();
  for (const [from, targets] of links) {
    if (!known.has(from)) continue;
    for (const t of targets) {
      if (t === from || !known.has(t)) continue;
      const s = sources.get(t) ?? new Set<string>();
      s.add(from);
      sources.set(t, s);
    }
  }
  const inbound = new Map(live.map((n) => [n.url, sources.get(n.url)?.size ?? 0]));
  const orphans = live.filter((n) => profiles.includes(n.profile) && !n.exempt && inbound.get(n.url) === 0 && (!partial || n.inRun)).map((n) => n.url);
  return { inbound, orphans };
}
