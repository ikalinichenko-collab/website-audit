import type { AuditConfig } from "./types.js";
import type { CheckItem, CheckResult } from "./types.js";
import { makeResult } from "./checks/result-factory.js";
import type { SiteWideSchemaEntry } from "./checks/schema-fingerprint.js";
import { collectPersonNodes } from "./fetch-page.js";
import { buildB3PersonEvidence } from "./checks/evidence.js";
import { runS6SchemaJudgement } from "./llm.js";
import { worstStatus } from "./checks/items.js";
import {
  catalogNodeSummaries,
  codeProblemsAggregateRating,
  codeProblemsC1C3,
  codeProblemsSchemaUrls,
} from "./s6-code-problems.js";

type LinkChecker = (url: string) => Promise<{ status: number; finalUrl: string }>;

export async function runS6SiteWideSchema(
  config: AuditConfig,
  catalog: SiteWideSchemaEntry[],
  skipLlm: boolean,
  linkChecker: LinkChecker,
): Promise<CheckResult> {
  if (!catalog.length) {
    return makeResult("S6", "pass", {
      evidence: ["No site-wide JSON-LD nodes in this run."],
      source_ref: "checklist: S6",
      items: [],
    });
  }

  const codeItems: CheckItem[] = [
    ...codeProblemsC1C3(catalog, config),
    ...codeProblemsAggregateRating(catalog),
    ...(await codeProblemsSchemaUrls(catalog, config, linkChecker)),
  ];

  const summaries = catalogNodeSummaries(catalog);
  const persons = collectPersonNodes(catalog.map((c) => c.sample));
  const b3Evidence = buildB3PersonEvidence(persons);

  let llmItems: CheckItem[] = [];
  if (!skipLlm) {
    llmItems = await runS6SchemaJudgement(config, {
      nodes: summaries,
      b3PersonEvidence: b3Evidence,
      codeProblemNames: codeItems.map((i) => i.name),
    });
  }

  const allItems = [...codeItems, ...llmItems];
  const status = allItems.length
    ? worstStatus(allItems.map((i) => i.status))
    : "pass";

  const failing = allItems.filter((i) => i.status === "fail" || i.status === "warn");
  const evidence =
    failing.length > 0
      ? failing.slice(0, 2).flatMap((i) => i.evidence.slice(0, 1))
      : [`${catalog.length} site-wide node(s), no problems found.`];

  return makeResult("S6", status, {
    evidence,
    source_ref: "checklist: S6",
    items: allItems,
    fix: failing
      .slice(0, 3)
      .map((i) => i.fix)
      .filter(Boolean)
      .join(" "),
    locations: ["schema"],
    count: allItems.length || null,
  });
}
