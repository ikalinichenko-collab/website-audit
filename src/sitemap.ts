import { XMLParser } from "fast-xml-parser";
import type { Settings } from "./types.js";

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

export function shouldExcludeUrl(url: string, patterns: string[]): boolean {
  return patterns.some((p) => url.includes(p));
}

async function fetchTextUrl(url: string, settings: Settings): Promise<string> {
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

export async function collectSitemapUrls(settings: Settings): Promise<string[]> {
  const xml = await fetchTextUrl(settings.sitemap, settings);
  const parsed = parser.parse(xml);
  const allLocs = [...new Set(extractLocs(parsed))];
  const sitemapUrls = allLocs.filter((u) => u.endsWith(".xml"));
  const pageUrls: string[] = [];
  const toFetch = sitemapUrls.length > 0 ? sitemapUrls : [settings.sitemap];
  for (const sm of toFetch) {
    if (sm === settings.sitemap && sitemapUrls.length === 0) {
      pageUrls.push(...allLocs.filter((u) => !u.endsWith(".xml")));
      continue;
    }
    if (!sm.endsWith(".xml")) continue;
    try {
      const inner = await fetchTextUrl(sm, settings);
      pageUrls.push(...extractLocs(parser.parse(inner)).filter((u) => !u.endsWith(".xml")));
    } catch {
      /* skip */
    }
  }
  return [...new Set(pageUrls)].filter((u) => !shouldExcludeUrl(u, settings.exclude_url_patterns));
}
