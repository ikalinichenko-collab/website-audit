import { XMLParser } from "fast-xml-parser";
import { headOrGetStatus } from "./fetch.js";
import type { GeoCodeConfig } from "./config.js";
import type { Settings } from "./types.js";

/** One check that exists only for the whole site, run once per snapshot (no model). */
export interface TechCheck {
  id: string;
  layer: "seo" | "geo";
  status: "pass" | "fail" | "na";
  severity: "high" | "medium" | "low";
  /** things the check looked at (bots x sections, links, sitemap files...) */
  total: number;
  items: { url: string; value: string }[];
  note?: string;
}

export interface TechContext {
  /** one in-scope URL per subsection: the paths robots.txt rules are tried on */
  probeUrls: string[];
  /** date of the last change of each fetched page, for the freshness check */
  pages: { url: string; profile: string; modified: string | null }[];
}

/** Defaults of the freshness check; `stale_after_days` and `stale_profiles` in config/geo.json override them. */
const STALE_DAYS = 365;
const STALE_PROFILES = ["article", "case_study", "guide", "country_guide"];
const LINK_CAP = 150;
const parser = new XMLParser({ ignoreAttributes: false });

interface Got {
  status: number;
  type: string;
  text: string;
  finalUrl: string;
}

async function get(url: string, settings: Settings): Promise<Got> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), settings.fetch.timeout_ms);
  try {
    const res = await fetch(url, { headers: { "User-Agent": settings.fetch.user_agent }, signal: ctrl.signal, redirect: "follow" });
    return { status: res.status, type: res.headers.get("content-type") ?? "", text: await res.text(), finalUrl: res.url || url };
  } finally {
    clearTimeout(t);
  }
}

/** The redirect chain of a URL, one request per hop. `null` when the address does not answer at all. */
async function chain(url: string, settings: Settings): Promise<{ hops: { url: string; status: number }[]; final: string } | null> {
  const hops: { url: string; status: number }[] = [];
  let current = url;
  for (let i = 0; i < 8; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), settings.fetch.timeout_ms);
    try {
      const res = await fetch(current, { headers: { "User-Agent": settings.fetch.user_agent }, signal: ctrl.signal, redirect: "manual" });
      hops.push({ url: current, status: res.status });
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) {
        current = new URL(loc, current).href;
        continue;
      }
      return { hops, final: current };
    } catch {
      return hops.length ? { hops, final: current } : null;
    } finally {
      clearTimeout(t);
    }
  }
  return { hops, final: current };
}

// ---- robots.txt ------------------------------------------------------------------------------

interface RobotsGroup {
  agents: string[];
  rules: { allow: boolean; path: string }[];
}

/** robots.txt groups and Sitemap lines (RFC 9309, the parts that decide whether a path may be fetched). */
export function parseRobots(text: string): { groups: RobotsGroup[]; sitemaps: string[] } {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let cur: RobotsGroup | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim().toLowerCase();
    const val = line.slice(i + 1).trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) groups.push((cur = { agents: [], rules: [] }));
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if (key === "allow" || key === "disallow") {
      lastWasAgent = false;
      // an empty Disallow allows everything: no rule
      if (cur && val) cur.rules.push({ allow: key === "allow", path: val });
    } else if (key === "sitemap") {
      if (val) sitemaps.push(val);
    }
  }
  return { groups, sitemaps };
}

function patternRegex(path: string): RegExp {
  const anchored = path.endsWith("$");
  const body = (anchored ? path.slice(0, -1) : path).replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`);
}

/** The rule that decides `path` for `bot` (null when it is allowed with no rule at all). */
export function robotsVerdict(groups: RobotsGroup[], bot: string, path: string): { allowed: boolean; rule: string | null } {
  const name = bot.toLowerCase();
  const named = groups.filter((g) => g.agents.includes(name));
  const used = named.length ? named : groups.filter((g) => g.agents.includes("*"));
  let best: { allow: boolean; path: string } | null = null;
  for (const g of used) {
    for (const r of g.rules) {
      if (!patternRegex(r.path).test(path)) continue;
      if (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow)) best = r;
    }
  }
  return best ? { allowed: best.allow, rule: `${best.allow ? "Allow" : "Disallow"}: ${best.path}` } : { allowed: true, rule: null };
}

const pathOf = (u: string): string => {
  try {
    const x = new URL(u);
    return x.pathname + x.search;
  } catch {
    return u;
  }
};

async function robotsChecks(settings: Settings, geo: GeoCodeConfig, ctx: TechContext): Promise<TechCheck[]> {
  const origin = new URL(settings.base_url).origin;
  const r = await get(`${origin}/robots.txt`, settings);
  const readable = r.status === 200 && !/html/i.test(r.type) && !/^\s*</.test(r.text);
  const parsed = parseRobots(readable ? r.text : "");

  const problems: { url: string; value: string }[] = [];
  if (!readable) problems.push({ url: `${origin}/robots.txt`, value: r.status === 200 ? "answers 200 but is not a text file" : `HTTP ${r.status}` });
  else if (!parsed.sitemaps.length) problems.push({ url: `${origin}/robots.txt`, value: "no Sitemap: line" });
  const txt: TechCheck = { id: "robots_txt", layer: "seo", status: problems.length ? "fail" : "pass", severity: "medium", total: 1, items: problems };

  const paths = [...new Set(["/", ...ctx.probeUrls.map(pathOf)])];
  const reach = (bots: string[]): { total: number; items: { url: string; value: string }[] } => {
    const items: { url: string; value: string }[] = [];
    for (const bot of bots) {
      const blocked = paths
        .map((p) => ({ p, v: robotsVerdict(parsed.groups, bot, p) }))
        .filter((x) => !x.v.allowed)
        .map((x) => `${x.p} (${x.v.rule})`);
      if (blocked.length) items.push({ url: bot === "*" ? "All crawlers (*)" : bot, value: `blocked from ${blocked.slice(0, 4).join(", ")}${blocked.length > 4 ? `, +${blocked.length - 4} more` : ""}` });
    }
    return { total: bots.length, items };
  };
  const search = reach(["*", "Googlebot", "Bingbot"]);
  const ai = reach(geo.ai_bots);
  return [
    txt,
    { id: "robots_crawlers", layer: "seo", status: search.items.length ? "fail" : "pass", severity: "high", total: search.total, items: search.items, note: `Tried ${paths.length} section paths for *, Googlebot and Bingbot.` },
    { id: "robots_ai_bots", layer: "geo", status: ai.items.length ? "fail" : "pass", severity: "high", total: ai.total, items: ai.items, note: `Tried ${paths.length} section paths for ${geo.ai_bots.join(", ")}.` },
  ];
}

// ---- llms.txt ---------------------------------------------------------------------------------

async function llmsChecks(settings: Settings, geo: GeoCodeConfig): Promise<TechCheck[]> {
  const out: TechCheck[] = [];
  const r = await get(geo.llms_txt_url, settings);
  const isText = r.status === 200 && !/html/i.test(r.type) && !/^\s*</.test(r.text) && r.text.trim().length > 0;
  const links = [...new Set([...r.text.matchAll(/https?:\/\/[^\s)\]>"']+/g)].map((m) => m[0].replace(/[.,;]+$/, "")))];
  const problems: { url: string; value: string }[] = [];
  if (r.status !== 200) problems.push({ url: geo.llms_txt_url, value: `HTTP ${r.status}` });
  else if (!isText) problems.push({ url: geo.llms_txt_url, value: "not a plain text file (an HTML page or empty)" });
  else if (!links.length) problems.push({ url: geo.llms_txt_url, value: "names no page: an AI assistant has nothing to follow" });
  out.push({ id: "llms_txt_format", layer: "geo", status: problems.length ? "fail" : "pass", severity: "medium", total: 1, items: problems });

  if (isText && links.length) {
    const broken: { url: string; value: string }[] = [];
    const checked = links.slice(0, LINK_CAP);
    for (const l of checked) {
      const s = await headOrGetStatus(l, settings).catch(() => ({ status: 0, finalUrl: l }));
      if (s.status === 0 || s.status >= 400) broken.push({ url: l, value: s.status ? `HTTP ${s.status}` : "does not answer" });
      await new Promise((res) => setTimeout(res, Math.min(settings.fetch.delay_ms, 300)));
    }
    out.push({
      id: "llms_txt_links",
      layer: "geo",
      status: broken.length ? "fail" : "pass",
      severity: "medium",
      total: checked.length,
      items: broken,
      note: links.length > LINK_CAP ? `First ${LINK_CAP} of ${links.length} links checked.` : undefined,
    });
  }

  const full = await get(new URL("/llms-full.txt", geo.llms_txt_url).href, settings).catch(() => null);
  const fullOk = !!full && full.status === 200 && !/html/i.test(full.type) && full.text.trim().length > 0;
  out.push({ id: "llms_full_txt", layer: "geo", status: fullOk ? "pass" : "fail", severity: "low", total: 1, items: fullOk ? [] : [{ url: new URL("/llms-full.txt", geo.llms_txt_url).href, value: full ? `HTTP ${full.status}` : "does not answer" }], note: "Optional: the full text of the key pages in one file." });
  return out;
}

// ---- addresses and error pages ----------------------------------------------------------------

async function addressChecks(settings: Settings): Promise<TechCheck[]> {
  const base = new URL(settings.base_url);
  const home = `${base.origin}/`;
  const variants = [`http://${base.host}/`, base.host.startsWith("www.") ? `https://${base.host.slice(4)}/` : `https://www.${base.host}/`];
  const items: { url: string; value: string }[] = [];
  let tried = 0;
  for (const v of variants) {
    const c = await chain(v, settings);
    if (!c) continue; // the variant is not served at all: nothing to redirect
    tried++;
    const first = c.hops[0]!;
    const redirects = c.hops.length - 1;
    if (c.final !== home) items.push({ url: v, value: `ends on ${c.final}, not ${home}` });
    else if (![301, 308].includes(first.status)) items.push({ url: v, value: `redirects with ${first.status}, not a permanent 301 or 308` });
    else if (redirects > 1) items.push({ url: v, value: `${redirects} redirects in a row before ${home}` });
  }
  const https: TechCheck = { id: "site_https", layer: "seo", status: tried ? (items.length ? "fail" : "pass") : "na", severity: "high", total: tried, items };

  const missing = `${base.origin}/this-page-should-not-exist-${Math.random().toString(36).slice(2, 8)}/`;
  const r = await get(missing, settings);
  const soft: TechCheck = { id: "soft_404", layer: "seo", status: r.status === 404 || r.status === 410 ? "pass" : "fail", severity: "high", total: 1, items: r.status === 404 || r.status === 410 ? [] : [{ url: missing, value: `answers ${r.status} instead of 404` }] };
  return [https, soft];
}

// ---- sitemap files ----------------------------------------------------------------------------

async function sitemapChecks(settings: Settings): Promise<TechCheck[]> {
  const idx = await get(settings.sitemap, settings);
  const parsed = parser.parse(idx.text) as Record<string, unknown>;
  const asArray = <T,>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
  const files = asArray((parsed.sitemapindex as { sitemap?: { loc: string } | { loc: string }[] } | undefined)?.sitemap).map((s) => s.loc);
  const list = files.length ? files : [settings.sitemap];

  const perFile: { file: string; total: number; withLastmod: number }[] = [];
  const seen = new Map<string, number>();
  const stray: { url: string; value: string }[] = [];
  const host = new URL(settings.base_url).host;
  let entries = 0;
  for (const f of list) {
    const x = f === settings.sitemap ? idx : await get(f, settings).catch(() => null);
    if (!x) continue;
    const urls = asArray((parser.parse(x.text) as { urlset?: { url?: { loc: string; lastmod?: string } | { loc: string; lastmod?: string }[] } }).urlset?.url);
    perFile.push({ file: f, total: urls.length, withLastmod: urls.filter((u) => !!u.lastmod).length });
    for (const u of urls) {
      entries++;
      seen.set(u.loc, (seen.get(u.loc) ?? 0) + 1);
      try {
        const p = new URL(u.loc);
        if (p.protocol !== "https:" || p.host !== host) stray.push({ url: u.loc, value: p.host !== host ? `on another host (${p.host})` : "not https" });
      } catch {
        stray.push({ url: u.loc, value: "not a URL" });
      }
    }
  }
  const lastmodItems = perFile.filter((f) => f.total && f.withLastmod / f.total < 0.9).map((f) => ({ url: f.file, value: `${f.withLastmod} of ${f.total} URLs have lastmod` }));
  const dupItems = [...seen].filter(([, n]) => n > 1).map(([url, n]) => ({ url, value: `listed ${n} times` }));
  return [
    { id: "sitemap_lastmod", layer: "seo", status: perFile.length ? (lastmodItems.length ? "fail" : "pass") : "na", severity: "low", total: perFile.length, items: lastmodItems },
    { id: "sitemap_urls_clean", layer: "seo", status: perFile.length ? (dupItems.length || stray.length ? "fail" : "pass") : "na", severity: "medium", total: entries, items: [...dupItems, ...stray] },
  ];
}

// ---- freshness --------------------------------------------------------------------------------

function freshnessCheck(ctx: TechContext, geo: GeoCodeConfig): TechCheck {
  const now = Date.now();
  const days = geo.stale_after_days ?? STALE_DAYS;
  const profiles = geo.stale_profiles ?? STALE_PROFILES;
  const dated = ctx.pages
    .filter((p) => profiles.includes(p.profile) && p.modified && !Number.isNaN(Date.parse(p.modified)))
    .map((p) => ({ url: p.url, at: Date.parse(p.modified!) }));
  const stale = dated.filter((p) => (now - p.at) / 86_400_000 > days).sort((a, b) => a.at - b.at);
  return {
    id: "content_stale",
    layer: "geo",
    status: dated.length ? (stale.length ? "fail" : "pass") : "na",
    severity: "low",
    total: dated.length,
    items: stale.map((p) => ({ url: p.url, value: `last modified ${new Date(p.at).toISOString().slice(0, 10)} (${Math.round((now - p.at) / (30.4 * 86_400_000))} months ago)` })),
    note: `Pages of ${profiles.join(", ")} not modified for over ${days} days (stale_after_days in GEO settings).`,
  };
}

/** The checks that only exist for the whole site. A check that cannot run is reported as `na`, never as a pass. */
export async function runSiteTech(settings: Settings, geo: GeoCodeConfig, ctx: TechContext, layers: { seo: boolean; geo: boolean }, log: (m: string) => void = () => undefined): Promise<TechCheck[]> {
  const out: TechCheck[] = [];
  const attempt = async (name: string, fn: () => Promise<TechCheck[]>): Promise<void> => {
    try {
      out.push(...(await fn()));
    } catch (e) {
      log(`Site check "${name}" could not run: ${e instanceof Error ? e.message : String(e)}`);
    }
  };
  await attempt("robots.txt", () => robotsChecks(settings, geo, ctx));
  if (layers.geo) await attempt("llms.txt", () => llmsChecks(settings, geo));
  if (layers.seo) {
    await attempt("addresses", () => addressChecks(settings));
    await attempt("sitemap", () => sitemapChecks(settings));
  }
  if (layers.geo) out.push(freshnessCheck(ctx, geo));
  return out.filter((c) => (c.layer === "seo" ? layers.seo : layers.geo));
}
