import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./config.js";
import { CHECK_NAMES } from "./checklist-meta.js";

let cache: Record<string, { name: string; rule: string }> | null = null;

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
  return checkIds
    .map((id) => {
      const r = rules[id];
      if (!r) return `### ${id}\n(No rule text found.)`;
      return `### ${id} — ${r.name}\n${r.rule}`;
    })
    .join("\n\n");
}
