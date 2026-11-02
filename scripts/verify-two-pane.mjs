import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "screenshots", "two-pane-task");
fs.mkdirSync(outDir, { recursive: true });

const port = process.env.VIEWER_PORT ?? "5173";
const base = `http://localhost:${port}/#`;
const newRun = "2026-10-30T12-08-26-245Z";
const oldRun = "2026-10-30T08-51-51-536Z";
const homeSlug = "home_ffe28d62";
const podcastSlug = "podcast_tara-vasdani_f96c6211";

function hasSel(url) {
  return /sel=p(%3A|:)/i.test(url);
}

const answers = [];

async function selectRun(page, runId) {
  await page.selectOption("#run-select", runId);
  await page.waitForTimeout(600);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(`${base}/`);
await page.waitForSelector("#run-select", { timeout: 60000 });

// 1. Homepage tiles
await selectRun(page, newRun);
await page.goto(`${base}/pages/${encodeURIComponent(homeSlug)}`);
await page.waitForSelector("text=High");
const tileTexts = await page.locator(".grid.grid-cols-2 button").allTextContents();
const t1 = path.join(outDir, "01-header-tiles.png");
await page.screenshot({ path: t1, fullPage: false });
const hasHigh = tileTexts.some((t) => t.includes("High"));
const highN = await page.locator(".grid.grid-cols-2 button").first().locator(".text-lg").textContent();
answers.push({
  n: 1,
  yes: hasHigh && highN !== null && Number.parseInt(highN, 10) >= 0,
  note: `High tile shows ${highN?.trim()}`,
  shot: t1,
});

// 2. Left list fits laptop screen
const aside = page.locator("aside").first();
const asideBox = await aside.boundingBox();
const fits = asideBox ? asideBox.height <= 720 : false;
const t2 = path.join(outDir, "02-left-list.png");
await page.screenshot({ path: t2, fullPage: false });
answers.push({
  n: 2,
  yes: fits,
  note: `Aside height ${asideBox?.height?.toFixed(0)}px vs 720px viewport budget`,
  shot: t2,
});

// 3. Client figures rows (Hasbro, Keywords, Sydecar, Zillow)
await page.getByRole("button", { name: /Client figures/i }).first().click();
await page.waitForTimeout(300);
const listText = await page.locator("aside").innerText();
const t3 = path.join(outDir, "03-client-figures-list.png");
await page.screenshot({ path: t3, fullPage: false });
const clients = ["Hasbro", "Keywords", "Sydecar", "Zillow"];
const separateRows = clients.every((c) => listText.includes(c));
answers.push({
  n: 3,
  yes: separateRows,
  note: separateRows ? "Named clients appear in left list" : "Missing some client names in list",
  shot: t3,
});

// 4. Client figures group table
await page.getByRole("button", { name: /^Client figures \d/i }).click();
await page.waitForTimeout(400);
const t4 = path.join(outDir, "04-client-figures-table.png");
await page.screenshot({ path: t4, fullPage: false });
const tableHeaders = await page.locator("table th").allTextContents();
const hasTable =
  tableHeaders.some((h) => h.includes("Page value")) &&
  tableHeaders.some((h) => h.includes("Source value"));
answers.push({ n: 4, yes: hasTable, note: hasTable ? "Table visible" : "Table missing", shot: t4 });

// 5. Click problem, URL changes
await page.locator("aside li button").filter({ hasText: "Hasbro" }).first().click();
await page.waitForTimeout(300);
const url5 = page.url();
const t5 = path.join(outDir, "05-problem-detail-url.png");
await page.screenshot({ path: t5, fullPage: false });
answers.push({
  n: 5,
  yes: hasSel(url5),
  note: url5,
  shot: t5,
});

// 6. Reload keeps selection
const selBefore = new URL(url5).hash.split("sel=")[1]?.split("&")[0];
await page.reload();
await page.waitForSelector("text=Hasbro");
const url6 = page.url();
const t6 = path.join(outDir, "06-reload-selection.png");
await page.screenshot({ path: t6, fullPage: false });
answers.push({
  n: 6,
  yes: url6.includes(`sel=${selBefore}`),
  note: `sel=${selBefore}`,
  shot: t6,
});

// 7. Show on page link on body quote
const showLink = page.getByRole("link", { name: "Show on page" }).first();
const href = await showLink.getAttribute("href");
const t7 = path.join(outDir, "07-show-on-page-link.png");
await page.screenshot({ path: t7, fullPage: false });
const hrefOk = Boolean(href?.includes("#:~:text=") && href.includes("gogloby.com"));
answers.push({
  n: 7,
  yes: hrefOk,
  note: href ?? "no href",
  shot: t7,
});

// 8. Arrow keys
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(200);
const url8 = page.url();
const t8 = path.join(outDir, "08-arrow-key.png");
await page.screenshot({ path: t8, fullPage: false });
answers.push({
  n: 8,
  yes: hasSel(url8) && url8 !== url6,
  note: url8,
  shot: t8,
});

// 9. Old run opens
await selectRun(page, oldRun);
await page.goto(`${base}/pages/${encodeURIComponent(homeSlug)}`);
await page.waitForSelector("text=High", { timeout: 15000 });
const t9 = path.join(outDir, "09-old-run.png");
await page.screenshot({ path: t9, fullPage: false });
const err = await page.locator("text=Loading").count();
answers.push({ n: 9, yes: err === 0, note: "Old run homepage loaded", shot: t9 });

// 10. Podcast no problems
await page.goto(`${base}/pages/${encodeURIComponent(podcastSlug)}`);
await page.waitForSelector("text=No problems");
const t10 = path.join(outDir, "10-podcast-no-problems.png");
await page.screenshot({ path: t10, fullPage: false });
const geoLine = await page.getByText("GEO (").count();
const techLine = await page.getByText("Technical (").count();
answers.push({
  n: 10,
  yes: geoLine > 0 && techLine > 0,
  note: "No problems + GEO/technical lines",
  shot: t10,
});

await browser.close();

const md = answers
  .map(
    (a) =>
      `${a.n}. ${a.yes ? "Yes" : "No"} — ${a.note}\n   Screenshot: \`${path.relative(path.join(__dirname, ".."), a.shot).replace(/\\/g, "/")}\``,
  )
  .join("\n\n");

fs.writeFileSync(path.join(outDir, "checklist.md"), md + "\n");
console.log("Viewer port:", port);
console.log(md);
