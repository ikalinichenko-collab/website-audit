import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./config.js";
import { CHECK_NAMES } from "./checklist-meta.js";

let cache: Record<string, { name: string; rule: string }> | null = null;
let h1RulesCache: string | null = null;

function loadH1ActionRules(md: string): string {
  if (h1RulesCache !== null) return h1RulesCache;
  const marker = "### Rules for H1 (action)";
  const start = md.indexOf(marker);
  if (start < 0) {
    h1RulesCache = "";
    return h1RulesCache;
  }
  const rest = md.slice(start);
  const end = rest.search(/\n## /);
  h1RulesCache = (end > 0 ? rest.slice(0, end) : rest).trim();
  return h1RulesCache;
}

/** Parse check ID, name and rule column from docs/checklist.md tables. */
export function loadCheckRules(): Record<string, { name: string; rule: string }> {
  if (cache) return cache;
  const md = readFileSync(path.join(projectRoot(), "docs", "checklist.md"), "utf8");
  const rules: Record<string, { name: string; rule: string }> = {};

  for (const line of md.split("\n")) {
    if (!line.startsWith("|")) continue;
    const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 4) continue;
    const id = parts[0]!;
    if (!/^[A-Z]\d+$/.test(id)) continue;
    if (parts[1] === "Check" || parts[1] === "---") continue;
    const name = parts[1] ?? CHECK_NAMES[id] ?? id;
    const rule = parts[parts.length - 1] ?? "";
    rules[id] = { name, rule };
  }
  cache = rules;
  return rules;
}

export function formatChecksForPrompt(checkIds: string[]): string {
  const rules = loadCheckRules();
  const md = readFileSync(path.join(projectRoot(), "docs", "checklist.md"), "utf8");
  let text = checkIds
    .map((id) => {
      const r = rules[id];
      if (!r) return `### ${id}\n(No rule text found.)`;
      return `### ${id} — ${r.name}\n${r.rule}`;
    })
    .join("\n\n");
  if (checkIds.includes("H1")) {
    const h1Extra = loadH1ActionRules(md);
    if (h1Extra) text += `\n\n${h1Extra}`;
  }
  return text;
}
