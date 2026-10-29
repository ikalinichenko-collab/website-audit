import type { AuditConfig } from "./types.js";
import { makeResult } from "./checks/result-factory.js";

export function naChecksForPageType(
  pageType: string,
  config: AuditConfig,
): string[] {
  const map = config.not_applicable_by_type ?? {};
  return map[pageType] ?? [];
}

export function applyNotApplicable(
  pageType: string,
  config: AuditConfig,
  results: Record<string, import("./types.js").CheckResult>,
): void {
  for (const id of naChecksForPageType(pageType, config)) {
    results[id] = makeResult(id, "na", {
      evidence: ["Not applicable to this page type."],
      source_ref: "audit.json: not_applicable_by_type",
    });
  }
}
