import { XMLParser } from "fast-xml-parser";
import type { AuditConfig } from "./types.js";

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
  for (const p of patterns) {
    if (url.includes(p)) return true;
  }
  return false;
}

export async function fetchText(url: string, userAgent: string, timeoutMs: number): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": userAgent },
      signal: ctrl.signal,
      redirect: "follow",
    });
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

export async function collectSitemapUrls(config: AuditConfig): Promise<string[]> {
  const xml = await fetchText(
    config.site.sitemap,
    config.fetch.user_agent,
    config.fetch.timeout_ms,
  );
  const parsed = parser.parse(xml);
  const allLocs = [...new Set(extractLocs(parsed))];
  const sitemapUrls = allLocs.filter((u) => u.endsWith(".xml"));
  const pageUrls: string[] = [];

  const toFetch = sitemapUrls.length > 0 ? sitemapUrls : [config.site.sitemap];
  for (const sm of toFetch) {
    if (sm === config.site.sitemap && sitemapUrls.length === 0) {
      pageUrls.push(...allLocs.filter((u) => !u.endsWith(".xml")));
      continue;
    }
    if (!sm.endsWith(".xml")) continue;
    try {
      const inner = await fetchText(sm, config.fetch.user_agent, config.fetch.timeout_ms);
      const innerParsed = parser.parse(inner);
      pageUrls.push(...extractLocs(innerParsed).filter((u) => !u.endsWith(".xml")));
    } catch {
      /* skip broken sitemap */
    }
  }

  const unique = [...new Set(pageUrls)];
  return unique.filter((u) => !shouldExcludeUrl(u, config.site.exclude_url_patterns));
}
