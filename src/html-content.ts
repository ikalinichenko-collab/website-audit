import * as cheerio from "cheerio";
import type { Settings } from "./types.js";
import { decodeCloudflareEmailsInHtml } from "./extract.js";

const MAIN_SELECTORS = ["main", "article", '[role="main"]', "#content", ".entry-content"];
const EXCLUDE_SELECTORS = ["header", "nav", "footer", "script", "style", "noscript", "template", "iframe"];
const STRUCTURAL_REMOVE = ["script", "style", "noscript", "template", "iframe"];

/** Real image URL: lazy-loaded images keep a `data:` placeholder in `src` and the file in `data-src`. */
export function realImageSrc(attrs: {
  src?: string;
  "data-src"?: string;
  "data-lazy-src"?: string;
}): string {
  for (const v of [attrs["data-src"], attrs["data-lazy-src"], attrs.src]) {
    const t = v?.trim();
    if (t && !t.startsWith("data:")) return t;
  }
  return "";
}

/** Main content HTML after hidden/exclude stripping (matches extract pipeline). */
export function visibleMainHtml(html: string, settings: Settings): string {
  html = decodeCloudflareEmailsInHtml(html);
  const $ = cheerio.load(html);

  let $main = $("body").clone();
  for (const sel of MAIN_SELECTORS) {
    const found = $(sel).first();
    if (found.length && found.text().trim().length > 0) {
      $main = cheerio.load(`<div id="root">${found.html() ?? ""}</div>`)("#root");
      break;
    }
  }

  for (const sel of settings.fetch.hidden_selectors ?? []) {
    try {
      $main.find(sel).remove();
    } catch {
      /* invalid selector */
    }
  }
  for (const ex of EXCLUDE_SELECTORS) {
    $main.find(ex).remove();
  }
  for (const sel of settings.fetch.content_exclude_selectors ?? []) {
    try {
      $main.find(sel).remove();
    } catch {
      /* invalid */
    }
  }
  for (const sel of STRUCTURAL_REMOVE) {
    $main.find(sel).remove();
  }

  return $main.html() ?? "";
}

export function loadVisibleMainCheerio(html: string, settings: Settings): cheerio.CheerioAPI {
  const inner = visibleMainHtml(html, settings);
  return cheerio.load(`<div id="main">${inner}</div>`);
}
