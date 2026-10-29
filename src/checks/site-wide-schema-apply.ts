import { collectOrganizationNodes, collectPersonNodes } from "../fetch-page.js";
import type { CheckResult, PageData } from "../types.js";
import { makeResult } from "./result-factory.js";
import {
  filterOutSiteWideNodes,
  pageLocalTypedNodes,
} from "./schema-fingerprint.js";

const NA_EVIDENCE = "only site-wide schema, see S6";

export function pageLocalSchemaJson(
  page: PageData,
  siteWideFingerprints: Set<string>,
): string {
  const local = pageLocalTypedNodes(page, siteWideFingerprints);
  return JSON.stringify(local);
}

export function filteredSchemaEvidence(
  page: PageData,
  siteWideFingerprints: Set<string>,
): {
  organizations: Record<string, unknown>[];
  persons: Record<string, unknown>[];
  localTypedCount: number;
} {
  const organizations = filterOutSiteWideNodes(
    collectOrganizationNodes(page.json_ld),
    siteWideFingerprints,
  );
  const persons = filterOutSiteWideNodes(
    collectPersonNodes(page.json_ld),
    siteWideFingerprints,
  );
  const localTypedCount = pageLocalTypedNodes(page, siteWideFingerprints).length;
  return { organizations, persons, localTypedCount };
}

export function siteWideSchemaNaResults(
  page: PageData,
  siteWideFingerprints: Set<string>,
  naCheckIds: Set<string>,
): Partial<Record<string, CheckResult>> {
  if (!siteWideFingerprints.size) return {};
  const { organizations, persons, localTypedCount } = filteredSchemaEvidence(
    page,
    siteWideFingerprints,
  );
  const out: Partial<Record<string, CheckResult>> = {};
  const na = (id: string) =>
    makeResult(id, "na", {
      evidence: [NA_EVIDENCE],
      source_ref: "checklist: site-wide schema",
    });

  if (!naCheckIds.has("B2") && organizations.length === 0) out.B2 = na("B2");
  if (!naCheckIds.has("B3") && persons.length === 0) out.B3 = na("B3");
  if (!naCheckIds.has("B4") && localTypedCount === 0) out.B4 = na("B4");
  return out;
}

export function excludeSiteWideFromLlmIds(
  activeIds: string[],
  page: PageData,
  siteWideFingerprints: Set<string>,
): string[] {
  if (!siteWideFingerprints.size) return activeIds;
  const { organizations, persons, localTypedCount } = filteredSchemaEvidence(
    page,
    siteWideFingerprints,
  );
  return activeIds.filter((id) => {
    if (id === "B2" && organizations.length === 0) return false;
    if (id === "B3" && persons.length === 0) return false;
    if (id === "B4" && localTypedCount === 0) return false;
    return true;
  });
}
