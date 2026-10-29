import * as fs from "node:fs";
import path from "node:path";
import { CHECK_NAMES, REPORT_SECTIONS, SITE_CHECK_IDS } from "../checklist-meta.js";
import { projectRoot } from "../config.js";
import type { CheckItem, CheckResult, PageResult, SiteResult } from "../types.js";
import { ensureDirSync, urlToSlug } from "../utils.js";
import {
  detectSiteWideIssues,
  isSiteWideFinding,
  siteWideKeySet,
  type SiteWideIssue,
} from "./site-wide.js";
import {
  compareChecksBySeverity,
  countFailsWarnsPageLevel,
  pageLevelFailingCheckIds,
  topFailingChecks,
} from "./severity-order.js";

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

function siteWideLine(checkId: string): string {
  return `Site-wide issue, see site.md (${checkId})`;
}

function formatCheckLine(
  id: string,
  r: CheckResult,
  siteWideKeys: Set<string>,
): string[] {
  const lines: string[] = [];

  if (r.items?.length) {
    const visibleItems: CheckItem[] = [];
    for (const item of r.items) {
      if (isSiteWideFinding(id, r, item, siteWideKeys)) {
        visibleItems.push({
          ...item,
          name: siteWideLine(id),
          evidence: [],
          fix: "",
          locations: [],
          count: null,
        });
      } else {
        visibleItems.push(item);
      }
    }
    const worst = visibleItems.reduce(
      (acc, i) => {
        const rank = { fail: 4, warn: 3, skip: 2, pass: 1, na: 0, info: 0 } as const;
        return rank[i.status] >= rank[acc] ? i.status : acc;
      },
      "pass" as CheckResult["status"],
    );
    lines.push(
      [
        `${statusIcon(worst)} **${id}** ${CHECK_NAMES[id] ?? id}`,
        r.value ? ` — value: ${r.value}` : "",
        r.evidence.length ? ` — evidence: ${r.evidence.join(" | ")}` : "",
        r.locations.length ? ` — locations: ${r.locations.join(", ")}` : "",
        r.count != null ? ` — count: ${r.count}` : "",
        r.fix ? ` — fix: ${r.fix}` : "",
        r.source_ref ? ` — source: ${r.source_ref}` : "",
      ].join(""),
    );
    for (const item of visibleItems) {
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
    return lines;
  }

  if (isSiteWideFinding(id, r, undefined, siteWideKeys)) {
    lines.push(
      `${statusIcon(r.status)} **${id}** ${CHECK_NAMES[id] ?? id} — ${siteWideLine(id)}`,
    );
    return lines;
  }

  lines.push(
    [
      `${statusIcon(r.status)} **${id}** ${CHECK_NAMES[id] ?? id}`,
      r.value ? ` — value: ${r.value}` : "",
      r.evidence.length ? ` — evidence: ${r.evidence.join(" | ")}` : "",
      r.locations.length ? ` — locations: ${r.locations.join(", ")}` : "",
      r.count != null ? ` — count: ${r.count}` : "",
      r.fix ? ` — fix: ${r.fix}` : "",
      r.source_ref ? ` — source: ${r.source_ref}` : "",
    ].join(""),
  );
  return lines;
}

export function writePageReport(
  result: PageResult,
  outPath: string,
  siteWideKeys: Set<string> = new Set(),
): void {
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
      if (r) lines.push(...formatCheckLine(id, r, siteWideKeys));
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

function writeSiteMd(
  runDir: string,
  siteWide: SiteWideIssue[],
  site: SiteResult | null,
): void {
  const lines: string[] = ["# Site report", ""];

  const schemaManifestPath = path.join(runDir, "site-wide-schema.json");
  if (fs.existsSync(schemaManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(schemaManifestPath, "utf8")) as {
      nodes: Array<{ type: string; name: string; page_count: number; pages: string[] }>;
    };
    lines.push("## Site-wide JSON-LD nodes", "");
    if (!manifest.nodes?.length) {
      lines.push("_(none in this run)_", "");
    } else {
      for (const n of manifest.nodes) {
        lines.push(
          `- **${n.type}** — ${n.name} — ${n.page_count} page(s)`,
          `  - Example: ${n.pages[0] ?? ""}`,
          "",
        );
      }
    }
  }

  lines.push("## Site-wide issues", "");
  if (!siteWide.length) {
    lines.push("_(none)_", "");
  } else {
    for (const issue of siteWide) {
      const label =
        issue.kind === "item" && issue.itemName
          ? `${issue.checkId} — ${issue.itemName}`
          : `${issue.checkId} — ${CHECK_NAMES[issue.checkId] ?? issue.checkId}`;
      lines.push(
        `- **${label}** — ${issue.pageCount}/${issue.totalPages} pages`,
        `  - Example: ${issue.exampleUrl}`,
        `  - Evidence: ${issue.evidence}`,
        "",
      );
    }
  }

  if (site?.results) {
    lines.push("## Site-level checks", "");
    for (const id of SITE_CHECK_IDS) {
      if (id === "S6") continue;
      const r = site.results[id];
      if (!r) continue;
      lines.push(
        [
          `${statusIcon(r.status)} **${id}** ${CHECK_NAMES[id] ?? id}`,
          r.evidence.length ? ` — ${r.evidence.join(" | ")}` : "",
          r.fix ? ` — fix: ${r.fix}` : "",
        ].join(""),
      );
    }
    lines.push("");
  }

  const s6 = site?.results?.S6;
  if (s6) {
    lines.push("## S6 — Site-wide schema", "");
    lines.push(
      [
        `${statusIcon(s6.status)} **S6** ${CHECK_NAMES.S6 ?? "Site-wide schema"}`,
        s6.evidence.length ? ` — ${s6.evidence.join(" | ")}` : "",
        s6.fix ? ` — fix: ${s6.fix}` : "",
      ].join(""),
      "",
    );
    if (s6.items?.length) {
      lines.push("### Problems", "");
      for (const item of s6.items) {
        lines.push(
          [
            `- ${statusIcon(item.status)} **${item.name}**`,
            item.evidence.length ? `\n  - ${item.evidence.join("\n  - ")}` : "",
            item.fix ? `\n  - fix: ${item.fix}` : "",
          ].join(""),
          "",
        );
      }
    } else {
      lines.push("_(no problems)_", "");
    }
  }

  fs.writeFileSync(path.join(runDir, "site.md"), lines.join("\n"));
}

export function rebuildSiteMd(
  runDir: string,
  pageResults: PageResult[],
  site: SiteResult | null,
): void {
  const siteWide = detectSiteWideIssues(pageResults);
  writeSiteMd(runDir, siteWide, site);
}

export function writeRunReports(
  runId: string,
  pageResults: PageResult[],
  hasSite: boolean,
): void {
  generateRunReports(runId, pageResults, hasSite);
}

export function generateRunReports(
  runId: string,
  pageResults: PageResult[],
  hasSiteJson: boolean,
): void {
  const root = projectRoot();
  const runDir = path.join(root, "results", runId);
  const reportDir = path.join(runDir, "report");
  ensureDirSync(fs, runDir);
  ensureDirSync(fs, reportDir);

  const siteWide = detectSiteWideIssues(pageResults);
  const siteWideKeys = siteWideKeySet(siteWide);

  let site: SiteResult | null = null;
  const sitePath = path.join(runDir, "site.json");
  if (hasSiteJson && fs.existsSync(sitePath)) {
    site = JSON.parse(fs.readFileSync(sitePath, "utf8")) as SiteResult;
  }

  writeSiteMd(runDir, siteWide, site);

  for (const pr of pageResults) {
    const slug = urlToSlug(pr.url);
    writePageReport(pr, path.join(reportDir, `${slug}.md`), siteWideKeys);
  }

  const csvLines = [
    "url,page_type,action,priority," +
      REPORT_SECTIONS.map((s) => `${s.letter}_fail,${s.letter}_warn`).join(",") +
      ",top_failing_checks",
  ];
  for (const pr of pageResults) {
    const counts = countFailsWarnsPageLevel(pr, siteWideKeys);
    const top = topFailingChecks(pr, siteWideKeys, 3).join(";");
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

  writeReadme(runId, pageResults, siteWideKeys);
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

function writeReadme(
  runId: string,
  pageResults: PageResult[],
  siteWideKeys: Set<string>,
): void {
  const runDir = path.join(projectRoot(), "results", runId);
  const byAction = new Map<string, number>();
  const byPriority = new Map<string, number>();
  const failCounts = new Map<string, number>();

  for (const pr of pageResults) {
    byAction.set(pr.recommendation.action, (byAction.get(pr.recommendation.action) ?? 0) + 1);
    byPriority.set(pr.recommendation.priority, (byPriority.get(pr.recommendation.priority) ?? 0) + 1);
    for (const id of pageLevelFailingCheckIds(pr, siteWideKeys)) {
      failCounts.set(id, (failCounts.get(id) ?? 0) + 1);
    }
  }

  const topFails = [...failCounts.entries()]
    .sort((a, b) => b[1] - a[1] || compareChecksBySeverity(a[0], b[0]))
    .slice(0, 20);
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
    "## 20 most frequent failing checks (page-level)",
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
