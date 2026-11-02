import { XMLParser } from "fast-xml-parser";
import type { Settings } from "./types.js";
import type { GeoCodeConfig } from "./config.js";

const parser = new XMLParser({ ignoreAttributes: false });

function extractLocs(obj: unknown): string[] {
  const urls: string[] = [];
  if (!obj || typeof obj !== "object") return urls;
  const rec = obj as Record<string, unknown>;
  if (rec.loc) {
    const loc = rec.loc;
    if (typeof loc === "string") urls.push(loc);
    else if (Array.isArray(loc)) urls.push(...loc.filter((x): x is string => typeof x === "string"));
  }
  for (const v of Object.values(rec)) {
    if (v && typeof v === "object") urls.push(...extractLocs(v));
  }
  return urls;
}

async function fetchText(url: string, settings: Settings): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), settings.fetch.timeout_ms);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": settings.fetch.user_agent },
      signal: ctrl.signal,
      redirect: "follow",
    });
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

export interface SiteBasics {
  robots: { value: string; ok: boolean };
  llms_txt: { value: string; ok: boolean };
  sitemaps: Record<string, number>;
}

/** robots.txt AI bots, llms.txt and sitemap counts (GEO and SEO site checks, no LLM). */
export async function runSiteBasics(settings: Settings, geo: GeoCodeConfig): Promise<SiteBasics> {
  const robotsUrl = new URL("/robots.txt", settings.base_url).href;
  let robotsText = "";
  try {
    robotsText = await fetchText(robotsUrl, settings);
  } catch {
    robotsText = "";
  }
  const blocked: string[] = [];
  for (const bot of geo.ai_bots) {
    const section = robotsText
      .split(/(?=User-agent:)/i)
      .find((s) => new RegExp(`User-agent:\\s*${bot}`, "i").test(s));
    if (section && /Disallow:\s*\/\s*$/im.test(section)) blocked.push(bot);
  }

  let llmsOk = false;
  let llmsValue = "missing";
  try {
    const txt = await fetchText(geo.llms_txt_url, settings);
    llmsOk = txt.trim().length > 0;
    llmsValue = llmsOk ? "present" : "empty";
  } catch {
    llmsValue = "fetch failed";
  }

  const sitemaps: Record<string, number> = {};
  try {
    const indexXml = await fetchText(settings.sitemap, settings);
    const locs = [...new Set(extractLocs(parser.parse(indexXml)))];
    const smUrls = locs.filter((u) => u.endsWith(".xml"));
    for (const sm of smUrls.length ? smUrls : [settings.sitemap]) {
      try {
        const xml = sm === settings.sitemap && !smUrls.length ? indexXml : await fetchText(sm, settings);
        sitemaps[sm] = extractLocs(parser.parse(xml)).filter((u) => !u.endsWith(".xml")).length;
      } catch {
        sitemaps[sm] = 0;
      }
    }
  } catch {
    sitemaps[settings.sitemap] = 0;
  }

  return {
    robots: { value: blocked.length ? `blocked: ${blocked.join(", ")}` : "all allowed", ok: blocked.length === 0 },
    llms_txt: { value: llmsValue, ok: llmsOk },
    sitemaps,
  };
}
