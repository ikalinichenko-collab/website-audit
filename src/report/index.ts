import * as fs from "node:fs";
import path from "node:path";
import { CHECK_NAMES, REPORT_SECTIONS } from "../checklist-meta.js";
import { projectRoot } from "../config.js";
import type { CheckResult, PageResult } from "../types.js";
import { ensureDirSync } from "../utils.js";

function statusIcon(status: string): string {
  switch (status) {
    case "pass":
      return "✅";
    case "fail":
      return "❌";
    case "warn":
      return "⚠️";
    case "na":
      return "➖";
    case "skip":
      return "⏭️";
    case "info":
      return "ℹ️";
    default:
      return "?";
  }
}

function formatCheckLine(id: string, r: CheckResult): string[] {
  const lines = [
    [
      `${statusIcon(r.status)} **${id}** ${CHECK_NAMES[id] ?? id}`,
      r.value ? ` — value: ${r.value}` : "",
      r.evidence.length ? ` — evidence: ${r.evidence.join(" | ")}` : "",
      r.locations.length ? ` — locations: ${r.locations.join(", ")}` : "",
      r.count != null ? ` — count: ${r.count}` : "",
      r.fix ? ` — fix: ${r.fix}` : "",
      r.source_ref ? ` — source: ${r.source_ref}` : "",
    ].join(""),
  ];
  if (r.items?.length) {
    for (const item of r.items) {
      lines.push(
        [
          `  ${statusIcon(item.status)} _${item.name}_`,
          item.evidence.length ? ` — ${item.evidence.join(" | ")}` : "",
          item.locations.length ? ` — locations: ${item.locations.join(", ")}` : "",
          item.count != null ? ` — count: ${item.count}` : "",
          item.fix ? ` — fix: ${item.fix}` : "",
        ].join(""),
      );
    }
  }
  return lines;
}

export function writePageReport(result: PageResult, outPath: string): void {
  ensureDirSync(fs, path.dirname(outPath));
  const lines: string[] = [
    `# Page report`,
    "",
    `- **URL:** ${result.url}`,
    `- **Type:** ${result.page_type}`,
    `- **Action:** ${result.recommendation.action}`,
    `- **Priority:** ${result.recommendation.priority}`,
    "",
    "## First paragraph",
    "",
    result.first_paragraph || "_(empty)_",
    "",
  ];

  for (const sec of REPORT_SECTIONS) {
    lines.push(`## ${sec.letter}. ${sectionTitle(sec.letter)}`, "");
    for (const id of sec.ids) {
      const r = result.results[id as keyof typeof result.results];
      if (r) lines.push(...formatCheckLine(id, r));
    }
    lines.push("");
  }

  fs.writeFileSync(outPath, lines.join("\n"));
}

function sectionTitle(letter: string): string {
  const titles: Record<string, string> = {
    A: "Technical SEO",
    B: "Structured data",
    C: "Wording",
    D: "Facts",
    E: "Positioning",
    F: "GEO",
    G: "Target keyword",
    H: "Recommendation",
  };
  return titles[letter] ?? letter;
}

function countFailsWarns(result: PageResult): Record<string, { fail: number; warn: number }> {
  const out: Record<string, { fail: number; warn: number }> = {};
  for (const sec of REPORT_SECTIONS) {
    out[sec.letter] = { fail: 0, warn: 0 };
    for (const id of sec.ids) {
      const r = result.results[id as keyof typeof result.results];
      if (r?.status === "fail") out[sec.letter]!.fail++;
      if (r?.status === "warn") out[sec.letter]!.warn++;
    }
  }
  return out;
}

function topFailingChecks(result: PageResult, n: number): string[] {
  const fails: string[] = [];
  for (const sec of REPORT_SECTIONS) {
    for (const id of sec.ids) {
      const r = result.results[id as keyof typeof result.results];
      if (r?.status === "fail") fails.push(id);
    }
  }
  return fails.slice(0, n);
}

export function writeRunReports(
  runId: string,
  pageResults: PageResult[],
  hasSite: boolean,
): void {
  const root = projectRoot();
  const runDir = path.join(root, "results", runId);
  ensureDirSync(fs, runDir);

  // summary.csv
  const csvLines = [
    "url,page_type,action,priority," +
      REPORT_SECTIONS.map((s) => `${s.letter}_fail,${s.letter}_warn`).join(",") +
      ",top_failing_checks",
  ];
  for (const pr of pageResults) {
    const counts = countFailsWarns(pr);
    const top = topFailingChecks(pr, 3).join(";");
    csvLines.push(
      [
        pr.url,
        pr.page_type,
        pr.recommendation.action,
        pr.recommendation.priority,
        ...REPORT_SECTIONS.flatMap((s) => [
          counts[s.letter]!.fail,
          counts[s.letter]!.warn,
        ]),
        `"${top}"`,
      ].join(","),
    );
  }
  fs.writeFileSync(path.join(runDir, "summary.csv"), csvLines.join("\n"));

  writeReadme(runId, pageResults, hasSite);
}

function previousRunPages(): Map<string, PageResult> | null {
  const root = projectRoot();
  const resultsDir = path.join(root, "results");
  if (!fs.existsSync(resultsDir)) return null;
  const runs = fs
    .readdirSync(resultsDir)
    .filter((d) => d !== "latest" && fs.statSync(path.join(resultsDir, d)).isDirectory())
    .sort()
    .reverse();
  if (runs.length < 2) return null;
  const prevDir = path.join(resultsDir, runs[1]!, "pages");
  if (!fs.existsSync(prevDir)) return null;
  const map = new Map<string, PageResult>();
  for (const f of fs.readdirSync(prevDir)) {
    const pr = JSON.parse(fs.readFileSync(path.join(prevDir, f), "utf8")) as PageResult;
    map.set(pr.url, pr);
  }
  return map;
}

function writeReadme(runId: string, pageResults: PageResult[], _hasSite: boolean): void {
  const runDir = path.join(projectRoot(), "results", runId);
  const byAction = new Map<string, number>();
  const byPriority = new Map<string, number>();
  const failCounts = new Map<string, number>();

  for (const pr of pageResults) {
    byAction.set(pr.recommendation.action, (byAction.get(pr.recommendation.action) ?? 0) + 1);
    byPriority.set(pr.recommendation.priority, (byPriority.get(pr.recommendation.priority) ?? 0) + 1);
    for (const [id, r] of Object.entries(pr.results)) {
      if (r.status === "fail") failCounts.set(id, (failCounts.get(id) ?? 0) + 1);
    }
  }

  const topFails = [...failCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);
  const needsDecision = pageResults.filter((p) =>
    p.recommendation.action.includes("needs_decision"),
  );

  const prev = previousRunPages();
  const fixed: string[] = [];
  const newFails: string[] = [];
  if (prev) {
    for (const pr of pageResults) {
      const old = prev.get(pr.url);
      if (!old) continue;
      for (const id of Object.keys(pr.results)) {
        const was = old.results[id as keyof typeof old.results]?.status;
        const now = pr.results[id as keyof typeof pr.results]?.status;
        if (was === "fail" && now === "pass") fixed.push(`${pr.url} ${id}`);
        if (was !== "fail" && now === "fail") newFails.push(`${pr.url} ${id}`);
      }
    }
  }

  const lines = [
    `# Audit run ${runId}`,
    "",
    "## Totals by action",
    "",
    ...[...byAction.entries()].map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## Totals by priority",
    "",
    ...[...byPriority.entries()].map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## 20 most frequent failing checks",
    "",
    ...topFails.map(([id, n]) => `- ${id} (${CHECK_NAMES[id]}): ${n}`),
    "",
    "## Needs decision",
    "",
    ...(needsDecision.length
      ? needsDecision.map((p) => `- ${p.url}`)
      : ["_(none)_"]),
    "",
    "## Change from previous run",
    "",
    "### Fixed failures",
    ...(fixed.slice(0, 30).length ? fixed.slice(0, 30).map((x) => `- ${x}`) : ["_(none)_"]),
    "",
    "### New failures",
    ...(newFails.slice(0, 30).length ? newFails.slice(0, 30).map((x) => `- ${x}`) : ["_(none)_"]),
  ];

  fs.writeFileSync(path.join(runDir, "README.md"), lines.join("\n"));
}
