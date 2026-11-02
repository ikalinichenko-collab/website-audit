import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
function encodeTextFragment(text) {
  return encodeURIComponent(text)
    .replace(/-/g, "%2D")
    .replace(/,/g, "%2C")
    .replace(/&/g, "%26");
}

function textFragmentUrl(pageUrl, fragmentText) {
  return `${pageUrl}#:~:text=${encodeTextFragment(fragmentText)}`;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pageJson = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "results", "latest", "pages", "home_ffe28d62.json"),
    "utf8",
  ),
);

const targets = [
  "GoGloby is an Applied AI Engineering partner.",
  "HASBRO NYSE · $13.4B market cap · $4.7B revenue",
  "Get Your Applied AI Engineering Benchmark",
];

function findQuoteFragment(quoteText) {
  for (const p of pageJson.compliance.problems) {
    for (const q of p.quotes) {
      const text = typeof q === "string" ? q : q.text;
      if (text === quoteText || text.startsWith(quoteText)) {
        return typeof q === "string" ? null : q.fragment;
      }
    }
  }
  for (const p of pageJson.compliance.problems) {
    for (const q of p.quotes) {
      const text = typeof q === "string" ? q : q.text;
      if (text.includes(quoteText) || quoteText.includes(text.slice(0, 40))) {
        return typeof q === "string" ? null : q.fragment;
      }
    }
  }
  return null;
}

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const page = await browser.newPage();

for (const quote of targets) {
  const fragment = findQuoteFragment(quote);
  console.log("\n===", quote, "===");
  console.log("fragment:", fragment);
  if (!fragment) {
    console.log("RESULT: no fragment stored");
    continue;
  }
  const url = textFragmentUrl("https://gogloby.com/", fragment);
  console.log("url:", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2000);
  const highlight = await page.evaluate(() => {
    const sel = window.getSelection()?.toString() ?? "";
    const marks = document.querySelectorAll("mark, ::target-text").length;
    const y = window.scrollY;
    return { sel: sel.slice(0, 120), marks, scrollY: y };
  });
  const htmlSnippet = await page.evaluate((frag) => {
    const body = document.body.innerHTML;
    const idx = body.toLowerCase().indexOf(frag.split(" ")[0]?.toLowerCase() ?? "");
    if (idx < 0) return "(first word not found in innerHTML)";
    return body.slice(Math.max(0, idx - 80), idx + 200).replace(/\s+/g, " ");
  }, fragment);
  console.log("scrollY:", highlight.scrollY, "selection:", highlight.sel || "(empty)");
  console.log("HTML around first word:", htmlSnippet);
  const ok = highlight.scrollY > 0 || highlight.sel.length > 0;
  console.log("RESULT:", ok ? "scrolled/highlighted" : "no visible highlight");
}

await browser.close();
