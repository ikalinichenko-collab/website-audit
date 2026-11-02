import fs from "node:fs";
import * as cheerio from "cheerio";

const html = fs.readFileSync("results/latest/pages/home_ffe28d62.html", "utf8");
const phrase = "Applied AI Engineering partner";
const $ = cheerio.load(html);

function ancestorChain(el, depth = 5) {
  const out = [];
  let cur = el;
  for (let i = 0; i < depth && cur; i++) {
    const tag = cur.tagName ?? cur.name ?? "?";
    const cls = $(cur).attr("class")?.trim().split(/\s+/).slice(0, 8).join(" ") ?? "";
    const id = $(cur).attr("id") ?? "";
    out.push(`<${tag}${id ? `#${id}` : ""}${cls ? ` class="${cls}"` : ""}>`);
    cur = cur.parent;
  }
  return out;
}

const re = /Applied AI Engineering partner/gi;
let m;
const raw = [];
while ((m = re.exec(html)) !== null) raw.push(m.index);
console.log(`Raw HTML string occurrences: ${raw.length}\n`);

const reported = new Set();
$("body *").each((_, el) => {
  if (el.type !== "tag") return;
  const text = $(el).text().replace(/\s+/g, " ").trim();
  if (!text.toLowerCase().includes(phrase.toLowerCase())) return;
  const children = $(el)
    .children()
    .toArray()
    .filter((c) => c.type === "tag" && $(c).text().toLowerCase().includes(phrase.toLowerCase()));
  if (children.length > 0) return;
  const key = text.slice(0, 120);
  if (reported.has(key)) return;
  reported.add(key);
  console.log("--- leaf text node container ---");
  console.log(text.slice(0, 220));
  ancestorChain(el).forEach((a, i) => console.log(`  ${i + 1}. ${a}`));
});
