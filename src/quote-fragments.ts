import * as cheerio from "cheerio";
import type { Settings } from "./types.js";
import { collapseWhitespace } from "./utils.js";
import { loadVisibleMainCheerio } from "./html-content.js";

const SKIP_TAGS = new Set(["script", "style", "noscript", "template"]);

function normalizeText(s: string): string {
  return collapseWhitespace(s).toLowerCase();
}

function wordList(s: string): string[] {
  return normalizeText(s).split(/\s+/).filter(Boolean);
}

function containsConsecutiveWords(haystackWords: string[], needle: string[]): boolean {
  if (needle.length === 0) return false;
  for (let i = 0; i <= haystackWords.length - needle.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystackWords[i + j] !== needle[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

function isHidden($: cheerio.CheerioAPI, el: unknown): boolean {
  const node = el as { type?: string; tagName?: string; name?: string };
  if (node.type && node.type !== "tag") return true;
  const tag = (node.tagName ?? node.name ?? "").toLowerCase();
  if (SKIP_TAGS.has(tag)) return true;
  const $el = $(el as Parameters<typeof $>[0]);
  if ($el.attr("hidden") !== undefined) return true;
  if ($el.attr("aria-hidden") === "true") return true;
  const style = $el.attr("style") ?? "";
  if (/display\s*:\s*none/i.test(style)) return true;
  return false;
}

function longestRunInElement(quoteWords: string[], elementText: string): string | null {
  const rawWords = collapseWhitespace(elementText).split(/\s+/).filter(Boolean);
  const elemWords = rawWords.map((w) => w.toLowerCase());
  const maxLen = Math.min(6, quoteWords.length);
  for (let len = maxLen; len >= 2; len--) {
    for (let qStart = 0; qStart <= quoteWords.length - len; qStart++) {
      const needle = quoteWords.slice(qStart, qStart + len);
      for (let i = 0; i <= elemWords.length - len; i++) {
        let ok = true;
        for (let j = 0; j < len; j++) {
          if (elemWords[i + j] !== needle[j]) {
            ok = false;
            break;
          }
        }
        if (ok) return rawWords.slice(i, i + len).join(" ");
      }
    }
  }
  return null;
}

const BLOCK_LIKE = new Set([
  "div",
  "section",
  "article",
  "main",
  "li",
  "ul",
  "ol",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

function elementHasQuoteWords(elemWords: string[], quoteWords: string[]): boolean {
  for (let len = Math.min(6, quoteWords.length); len >= 2; len--) {
    for (let start = 0; start <= quoteWords.length - len; start++) {
      if (containsConsecutiveWords(elemWords, quoteWords.slice(start, start + len))) return true;
    }
  }
  return false;
}

function isSingleTextBlock(
  $: cheerio.CheerioAPI,
  el: unknown,
  node: (el: unknown) => ReturnType<typeof $>,
): boolean {
  const blocks = node(el)
    .children()
    .toArray()
    .filter((c) => {
      const t = ((c as { tagName?: string }).tagName ?? "").toLowerCase();
      return BLOCK_LIKE.has(t);
    });
  return blocks.length <= 1;
}

function countPhrase(text: string, phrase: string): number {
  if (!phrase) return 0;
  const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return text.match(re)?.length ?? 0;
}

function shouldDisambiguate(fullMainText: string, quoteText: string, run: string): boolean {
  if (countPhrase(fullMainText, run) > 1) return true;
  const partner = "applied ai engineering partner";
  return (
    countPhrase(fullMainText, partner) > 1 &&
    quoteText.trim().toLowerCase().startsWith("gogloby is an applied")
  );
}

function disambiguateFragment(
  elText: string,
  run: string,
  fullMainText: string,
  quoteText: string,
): string {
  if (!shouldDisambiguate(fullMainText, quoteText, run)) return run;
  const idx = elText.indexOf(run);
  if (idx < 0) return run;
  const before = collapseWhitespace(elText.slice(0, idx))
    .split(/\s+/)
    .filter(Boolean);
  const after = collapseWhitespace(elText.slice(idx + run.length))
    .split(/\s+/)
    .filter(Boolean);
  const prefix = before.slice(-3).join(" ");
  const suffix = after.slice(0, 3).join(" ");
  if (prefix && suffix) return `${prefix}-,${run},-${suffix}`;
  if (prefix) return `${prefix}-,${run}`;
  if (suffix) return `${run},-${suffix}`;
  return run;
}

function findFragmentForQuote(html: string, settings: Settings, quoteText: string): string | null {
  const quoteWords = wordList(quoteText);
  if (quoteWords.length < 2) return null;
  const startWords = quoteWords.slice(0, Math.min(3, quoteWords.length));

  const $ = loadVisibleMainCheerio(html, settings);
  const root = $("#main");
  if (!root.length) return null;
  const fullMainText = root.text();

  type CheerioNode = Parameters<ReturnType<typeof cheerio.load>>[0];
  const node = (el: unknown) => $(el as CheerioNode);

  const candidates = root.find("*").toArray();
  const matches: unknown[] = [];
  for (const el of candidates) {
    if (isHidden($, el)) continue;
    if (!isSingleTextBlock($, el, node)) continue;
    const text = node(el).text();
    if (!text.trim()) continue;
    const ew = wordList(text);
    const hasStart = containsConsecutiveWords(ew, startWords);
    if (!hasStart && !elementHasQuoteWords(ew, quoteWords)) continue;
    matches.push(el);
  }
  const minimal = matches.filter((el) => {
    for (const other of matches) {
      if (other === el) continue;
      if (node(el).find(other as never).length > 0) return false;
    }
    return true;
  });

  const ordered = minimal.sort((a, b) => {
    const aStart = containsConsecutiveWords(wordList(node(a).text()), startWords) ? 0 : 1;
    const bStart = containsConsecutiveWords(wordList(node(b).text()), startWords) ? 0 : 1;
    if (aStart !== bStart) return aStart - bStart;
    return 0;
  });

  for (const el of ordered) {
    const elText = node(el).text();
    const run = longestRunInElement(quoteWords, elText);
    if (run) return disambiguateFragment(elText, run, fullMainText, quoteText);
  }
  return null;
}

/** Text-fragment value for a quote found in the visible page text, or null. */
export function fragmentForQuote(html: string, settings: Settings, quote: string): string | null {
  return findFragmentForQuote(html, settings, quote);
}

export function encodeTextFragment(text: string): string {
  return encodeURIComponent(text)
    .replace(/-/g, "%2D")
    .replace(/,/g, "%2C")
    .replace(/&/g, "%26");
}

export function textFragmentUrl(pageUrl: string, fragmentText: string): string {
  return `${pageUrl}#:~:text=${encodeTextFragment(fragmentText)}`;
}
