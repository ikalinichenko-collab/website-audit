import * as cheerio from "cheerio";
import type { ExtractedPage, PageZones, Zone } from "./types.js";
import { flattenJsonLd, parseJsonLdDetailed, decodeCloudflareEmailsInHtml } from "./extract.js";
import { isInternal, urlsMatch } from "./utils.js";

export type Severity = "high" | "medium" | "low";

export interface SeoProfile {
  schema_required: string[];
  schema_recommended: string[];
  author: boolean;
  dates: boolean;
  link_to_services: boolean;
}

export interface SeoConfig {
  severity: Record<string, Severity>;
  title: { min: number; max: number };
  meta: { min: number; max: number };
  article_schema_fields: string[];
  skip_link_patterns: string[];
  /** A link whose path starts with this counts as a link to a service page. */
  service_path_prefix: string;
  profiles: Record<string, SeoProfile>;
}

export interface SeoPlace {
  zone_id: string;
  part?: string;
  value: string;
}

export interface SeoCheck {
  id: string;
  status: "pass" | "fail" | "na";
  severity: Severity;
  zone_id: string;
  value: string;
  places?: SeoPlace[];
}

export interface SeoResult {
  profile: string;
  checks: SeoCheck[];
}

export type LinkChecker = (url: string) => Promise<{ status: number; finalUrl: string }>;

export interface SeoInput {
  html: string;
  requestedUrl: string;
  baseUrl: string;
  page: ExtractedPage;
  zones: PageZones;
  profile: string;
  config: SeoConfig;
  linkChecker: LinkChecker;
}

const ARTICLE_TYPES = ["Article", "BlogPosting", "NewsArticle"];

function schemaTypes(json: unknown[]): Set<string> {
  const out = new Set<string>();
  for (const n of flattenJsonLd(json)) {
    const t = n["@type"];
    if (typeof t === "string") out.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
  }
  return out;
}

function stripSlash(u: string): string {
  return u.replace(/\/$/, "");
}

function partLabel(zone: Zone, partType: string, index: number): string {
  return `${partType} ${index}`;
}

function parseVisibleDate(text: string): Date | null {
  const t = text.replace(/^(updated|published|last updated)( on)?:?\s*/i, "").trim();
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function runSeoChecks(input: SeoInput): Promise<SeoResult> {
  const { page, zones, config, profile: profileName } = input;
  const profile: SeoProfile = config.profiles[profileName] ?? {
    schema_required: [],
    schema_recommended: [],
    author: false,
    dates: false,
    link_to_services: false,
  };
  const sev = (id: string): Severity => config.severity[id] ?? "low";
  const checks: SeoCheck[] = [];
  const add = (c: Omit<SeoCheck, "severity"> & { severity?: Severity }): void => {
    checks.push({ ...c, severity: c.severity ?? sev(c.id) });
  };

  const $ = cheerio.load(decodeCloudflareEmailsInHtml(input.html));
  const pageZones = zones.zones.filter((z) => !z.skipped && z.scope === "page");
  const contentZones = pageZones.filter((z) => z.kind === "block" || z.kind === "article_section" || z.kind === "unknown");
  const finalUrl = page.final_url ?? input.requestedUrl;

  // ---- http_status -----------------------------------------------------
  const status = page.status ?? 0;
  const redirected = stripSlash(finalUrl) !== stripSlash(input.requestedUrl);
  add({
    id: "http_status",
    status: status >= 200 && status < 300 && !redirected ? "pass" : "fail",
    zone_id: "page",
    value: redirected ? `${status}, redirected to ${finalUrl}` : String(status),
  });

  // ---- title / meta ------------------------------------------------------
  const tl = page.title.length;
  if (tl === 0) {
    add({ id: "title_length", status: "fail", severity: sev("title_missing"), zone_id: "title", value: "missing" });
  } else if (tl > config.title.max) {
    add({ id: "title_length", status: "fail", severity: sev("title_too_long"), zone_id: "title", value: `${tl} characters (max ${config.title.max})` });
  } else if (tl < config.title.min) {
    add({ id: "title_length", status: "fail", severity: sev("title_too_short"), zone_id: "title", value: `${tl} characters (min ${config.title.min})` });
  } else {
    add({ id: "title_length", status: "pass", zone_id: "title", value: `${tl} characters`, severity: sev("title_too_long") });
  }
  const ml = page.meta_description.trim().length;
  add({
    id: "meta_present",
    status: ml > 0 ? "pass" : "fail",
    zone_id: "meta_description",
    value: ml > 0 ? `${ml} characters` : "missing",
  });
  if (ml > 0) {
    add({
      id: "meta_length",
      status: ml >= config.meta.min && ml <= config.meta.max ? "pass" : "fail",
      zone_id: "meta_description",
      value: `${ml} characters (${config.meta.min}-${config.meta.max})`,
    });
  }

  // ---- h1, canonical, indexable -----------------------------------------
  add({
    id: "h1_count",
    status: page.h1.length === 1 ? "pass" : "fail",
    zone_id: "h1",
    value: String(page.h1.length),
  });

  let canonOk = false;
  if (page.canonical) {
    const abs = new URL(page.canonical, finalUrl).href;
    if (urlsMatch(abs, finalUrl)) canonOk = true;
    else {
      const r = await input.linkChecker(abs);
      canonOk = r.status >= 200 && r.status < 400;
    }
  }
  add({ id: "canonical", status: canonOk ? "pass" : "fail", zone_id: "page", value: page.canonical || "missing" });
  add({
    id: "indexable",
    status: /noindex/i.test(page.meta_robots) ? "fail" : "pass",
    zone_id: "page",
    value: page.meta_robots || "no robots meta",
  });

  // ---- schema ---------------------------------------------------------------
  const present = schemaTypes(page.json_ld);
  const missingReq = profile.schema_required.filter((t) => !present.has(t));
  if (profile.schema_required.length) {
    add({
      id: "schema_required",
      status: missingReq.length ? "fail" : "pass",
      zone_id: "json_ld",
      value: missingReq.length ? `missing: ${missingReq.join(", ")}` : "present",
    });
  }
  const missingRec = profile.schema_recommended.filter((t) => !present.has(t));
  if (profile.schema_recommended.length) {
    add({
      id: "schema_recommended",
      status: missingRec.length ? "fail" : "pass",
      zone_id: "json_ld",
      value: missingRec.length ? `missing: ${missingRec.join(", ")}` : "present",
    });
  }

  // ---- author, dates ---------------------------------------------------------
  if (profile.author) {
    const ok = Boolean(page.author && page.author.trim().split(/\s+/).length >= 2);
    add({ id: "author", status: ok ? "pass" : "fail", zone_id: "author", value: page.author ?? "missing" });
  }
  if (profile.dates) {
    const ok = Boolean(page.date_published && page.date_modified);
    add({
      id: "dates",
      status: ok ? "pass" : "fail",
      zone_id: "json_ld",
      value: `published: ${page.date_published ?? "missing"}; modified: ${page.date_modified ?? "missing"}`,
    });
    const dz = pageZones.find((z) => z.id === "date");
    if (dz && page.date_modified) {
      const vis = parseVisibleDate(dz.text);
      const mod = new Date(page.date_modified);
      if (vis && !Number.isNaN(mod.getTime())) {
        const days = Math.abs(vis.getTime() - mod.getTime()) / 86_400_000;
        add({
          id: "date_mismatch",
          status: days <= 1 ? "pass" : "fail",
          zone_id: "date",
          value: `visible "${dz.text}" vs dateModified ${page.date_modified}`,
        });
      } else {
        add({ id: "date_mismatch", status: "na", zone_id: "date", value: `cannot parse visible date "${dz.text}"` });
      }
    }
  }

  // ---- links ------------------------------------------------------------------
  const linkPlaces = new Map<string, SeoPlace[]>();
  const hashLinks: SeoPlace[] = [];
  for (const z of pageZones) {
    for (const p of z.parts) {
      for (const l of p.links ?? []) {
        const href = l.href;
        if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
        if (href.startsWith("#")) {
          if (href.length > 1) hashLinks.push({ zone_id: z.id, part: partLabel(z, p.type, p.index), value: href });
          continue;
        }
        let abs: string;
        try {
          abs = new URL(href, finalUrl).href.split("#")[0]!;
        } catch {
          continue;
        }
        if (!isInternal(abs, input.baseUrl)) continue;
        if (config.skip_link_patterns.some((s) => abs.includes(s))) continue;
        const arr = linkPlaces.get(abs) ?? [];
        arr.push({ zone_id: z.id, part: partLabel(z, p.type, p.index), value: abs });
        linkPlaces.set(abs, arr);
      }
    }
  }
  const broken: SeoPlace[] = [];
  const redirecting: SeoPlace[] = [];
  for (const [url, places] of linkPlaces) {
    const r = await input.linkChecker(url);
    if (r.status < 200 || r.status >= 400) {
      broken.push(...places.map((p) => ({ ...p, value: `${url} (${r.status})` })));
    } else if (stripSlash(r.finalUrl.toLowerCase()) !== stripSlash(url.toLowerCase())) {
      redirecting.push(...places.map((p) => ({ ...p, value: `${url} -> ${r.finalUrl}` })));
    }
  }
  add({
    id: "broken_internal_links",
    status: broken.length ? "fail" : "pass",
    zone_id: "page",
    value: broken.length ? `${broken.length} broken` : `${linkPlaces.size} checked`,
    places: broken,
  });
  add({
    id: "redirecting_internal_links",
    status: redirecting.length ? "fail" : "pass",
    zone_id: "page",
    value: redirecting.length ? `${redirecting.length} redirect` : "none",
    places: redirecting,
  });
  if (profile.link_to_services) {
    const linked = [...linkPlaces.keys()].some((u) => new URL(u).pathname.startsWith(config.service_path_prefix));
    add({
      id: "link_to_services",
      status: linked ? "pass" : "fail",
      zone_id: "page",
      value: linked ? "yes" : `no link to ${config.service_path_prefix}*`,
    });
  }

  // ---- images ---------------------------------------------------------------
  const imgPlaces = (pick: (p: Zone["parts"][number]) => boolean): SeoPlace[] =>
    pageZones.flatMap((z) =>
      z.parts
        .filter((p) => p.type === "image" && pick(p))
        .map((p) => ({ zone_id: z.id, part: partLabel(z, p.type, p.index), value: p.file ?? p.src ?? "" })),
    );
  const noAlt = imgPlaces((p) => p.alt_state === "missing");
  const emptyAlt = imgPlaces((p) => p.alt_state === "empty");
  const noDims = imgPlaces((p) => p.dims === false);
  add({ id: "alt_missing", status: noAlt.length ? "fail" : "pass", zone_id: "page", value: `${noAlt.length} without alt`, places: noAlt });
  add({ id: "alt_empty", status: emptyAlt.length ? "fail" : "pass", zone_id: "page", value: `${emptyAlt.length} with empty alt`, places: emptyAlt });
  add({ id: "image_dimensions", status: noDims.length ? "fail" : "pass", zone_id: "page", value: `${noDims.length} without width/height`, places: noDims });

  // ---- heading order ----------------------------------------------------------
  const skips: SeoPlace[] = [];
  let prev = 1;
  for (const z of contentZones) {
    for (const p of z.parts) {
      if (p.type !== "heading" || !p.level) continue;
      if (p.level > prev + 1) {
        skips.push({ zone_id: z.id, part: partLabel(z, p.type, p.index), value: `h${prev} -> h${p.level}: ${p.text.slice(0, 50)}` });
      }
      prev = p.level;
    }
  }
  add({ id: "heading_order", status: skips.length ? "fail" : "pass", zone_id: "page", value: skips.length ? `${skips.length} skipped levels` : "ok", places: skips });

  // ---- regression guards --------------------------------------------------------
  const og = (k: string): string => $(`meta[property="og:${k}"]`).attr("content")?.trim() ?? "";
  const ogMissing = ["title", "description", "image"].filter((k) => !og(k));
  add({ id: "og_present", status: ogMissing.length ? "fail" : "pass", zone_id: "og_title", value: ogMissing.length ? `missing: ${ogMissing.join(", ")}` : "ok" });
  if (og("url") && page.canonical) {
    add({ id: "og_url_canonical", status: urlsMatch(og("url"), page.canonical) ? "pass" : "fail", zone_id: "page", value: `og:url ${og("url")} vs canonical ${page.canonical}` });
  }
  add({ id: "twitter_card", status: $('meta[name="twitter:card"]').attr("content") ? "pass" : "fail", zone_id: "page", value: $('meta[name="twitter:card"]').attr("content") ?? "missing" });
  add({ id: "html_lang", status: $("html").attr("lang") ? "pass" : "fail", zone_id: "page", value: $("html").attr("lang") ?? "missing" });
  add({ id: "viewport", status: $('meta[name="viewport"]').length ? "pass" : "fail", zone_id: "page", value: $('meta[name="viewport"]').length ? "ok" : "missing" });

  const ld = parseJsonLdDetailed(input.html);
  add({
    id: "jsonld_valid",
    status: ld.errors.length ? "fail" : "pass",
    zone_id: "json_ld",
    value: ld.errors.length ? `${ld.errors.length} block(s) do not parse: ${ld.errors[0]!.start}` : `${ld.blocks.length} block(s)`,
  });

  if (profile.schema_required.includes("Article")) {
    const art = flattenJsonLd(page.json_ld).find((n) =>
      [n["@type"]].flat().some((t) => typeof t === "string" && ARTICLE_TYPES.includes(t)),
    );
    if (art) {
      const miss = config.article_schema_fields.filter((f) => !art[f]);
      add({ id: "article_fields", status: miss.length ? "fail" : "pass", zone_id: "json_ld", value: miss.length ? `missing: ${miss.join(", ")}` : "ok" });
    } else {
      add({ id: "article_fields", status: "na", zone_id: "json_ld", value: "no Article node" });
    }
  }

  const ids = new Set<string>();
  $("[id]").each((_, el) => {
    ids.add($(el).attr("id") ?? "");
  });
  $("a[name]").each((_, el) => {
    ids.add($(el).attr("name") ?? "");
  });
  const deadAnchors = hashLinks.filter((l) => {
    let id = l.value.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* keep raw */
    }
    return !ids.has(id);
  });
  add({ id: "anchors_resolve", status: deadAnchors.length ? "fail" : "pass", zone_id: "page", value: deadAnchors.length ? `${deadAnchors.length} dead` : `${hashLinks.length} checked`, places: deadAnchors });

  const faqDom = pageZones.some((z) => z.id.startsWith("block:accordion") || /^article:(faq|frequently)/.test(z.id));
  const faqSchema = present.has("FAQPage");
  add({ id: "faq_schema_matches_dom", status: faqDom === faqSchema ? "pass" : "fail", zone_id: "json_ld", value: `accordion block: ${faqDom}, FAQPage schema: ${faqSchema}` });

  return { profile: profileName, checks };
}
