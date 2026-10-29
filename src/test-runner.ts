import "dotenv/config";
import * as fs from "node:fs";
import path from "node:path";
import { projectRoot } from "./config.js";
import { httpGet, extractPageData } from "./fetch-page.js";
import { loadAuditConfig } from "./config.js";
import { runScan } from "./pipeline.js";
import { allItemEvidenceText } from "./checks/items.js";
import type { CheckItem, PageResult } from "./types.js";
import { urlToSlug } from "./utils.js";
import { expectedStatusForValue, VALUE_CHECK_IDS } from "./value-checks.js";

interface Expectation {
  check: string;
  status_in?: string[];
  value_in?: string[];
  evidence_contains_any?: string[];
  evidence_must_not_contain?: string[];
  items_with_verdict?: Record<string, string[]>;
  status_must_match_value?: boolean;
  item_rule?: string;
  note?: string;
}

interface ExpectationsFile {
  pages: Array<{ url: string; expect: Expectation[] }>;
}

function getCheckResult(result: PageResult, check: string) {
  return result.results[check as keyof typeof result.results];
}

function getCheckValue(result: PageResult, check: string): string[] {
  if (check === "H1") return [result.recommendation.action];
  if (check === "H2") return [result.recommendation.priority];
  const r = getCheckResult(result, check);
  if (!r) return [];
  if (r.value) return [r.value, ...allItemEvidenceText(r)];
  return allItemEvidenceText(r);
}

function getCheckStatus(result: PageResult, check: string): string {
  if (check === "H1" || check === "H2") {
    return "n/a";
  }
  const r = getCheckResult(result, check);
  return r?.status ?? "missing";
}

function closestEvidence(evidence: string[], needle: string): string {
  if (!evidence.length) return "(no evidence)";
  let best = evidence[0]!;
  let bestScore = -1;
  const nLower = needle.toLowerCase();
  for (const e of evidence) {
    const words = nLower.split(/\s+/);
    let score = 0;
    for (const w of words) {
      if (e.toLowerCase().includes(w)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return best;
}

function evidenceMatchesPhrase(evidence: string[], phrase: string): boolean {
  const pl = phrase.toLowerCase();
  const evText = evidence.join(" ").toLowerCase();
  if (evText.includes(pl)) return true;
  return evidence.some(
    (e) =>
      e.toLowerCase().includes(pl) || e.toLowerCase().startsWith(`${pl}:`),
  );
}

async function pageContainsPhrase(url: string, phrase: string): Promise<boolean> {
  const config = loadAuditConfig();
  const slug = urlToSlug(url);
  const cached = path.join(projectRoot(), "data", "pages", `${slug}.json`);
  let page;
  if (fs.existsSync(cached)) {
    page = JSON.parse(fs.readFileSync(cached, "utf8"));
  } else {
    const fr = await httpGet(url, config);
    page = extractPageData(url, fr, config);
  }
  const imageHay = (page.main_content_images ?? [])
    .map(
      (img: { alt: string | null; file_name: string }) =>
        `${img.alt ?? ""} ${img.file_name}`,
    )
    .join("\n");
  const hay = [
    page.title,
    page.main_text,
    JSON.stringify(page.json_ld),
    imageHay,
  ]
    .join("\n")
    .toLowerCase();
  return hay.includes(phrase.toLowerCase());
}

function itemNameMatchesItemSpec(itemName: string, nameSpec: string): boolean {
  const alts = nameSpec.split("|").map((s) => s.trim()).filter(Boolean);
  const n = itemName.toLowerCase();
  return alts.some((alt) => {
    const a = alt.toLowerCase();
    if (n.includes(a)) return true;
    const words = a.split(/\s+/).filter(Boolean);
    return words.length > 1 && words.every((w) => n.includes(w));
  });
}

function itemHasVerdict(item: CheckItem, verdict: string): boolean {
  const hay = [...item.evidence, item.name, item.fix].join(" ").toLowerCase();
  return hay.includes(verdict.toLowerCase());
}

function checkItemsWithVerdict(result: PageResult, exp: Expectation): string | null {
  if (!exp.items_with_verdict || exp.check !== "D3") return null;
  const r = getCheckResult(result, "D3");
  if (!r?.items?.length) return "D3 has no items";
  for (const [verdict, nameSpecs] of Object.entries(exp.items_with_verdict)) {
    for (const nameSpec of nameSpecs) {
      const item = r.items.find(
        (i) => itemNameMatchesItemSpec(i.name, nameSpec) && itemHasVerdict(i, verdict),
      );
      if (!item) {
        const partial = r.items.find((i) => itemNameMatchesItemSpec(i.name, nameSpec));
        if (partial) {
          return `D3 item "${partial.name}" missing verdict ${verdict} (evidence: ${partial.evidence.join(" | ")})`;
        }
        return `D3 missing item for ${nameSpec} with verdict ${verdict}`;
      }
    }
  }
  return null;
}

function checkItemRule(result: PageResult, exp: Expectation): string | null {
  if (!exp.item_rule || exp.check !== "B3") return null;
  const r = getCheckResult(result, "B3");
  if (!r?.items) return null;
  const sergey = r.items.find((i) =>
    i.name.toLowerCase().includes("sergey"),
  );
  if (!sergey) return null;
  const text = [...sergey.evidence, sergey.fix, sergey.name].join(" ").toLowerCase();
  if (text.includes("jobtitle") && text.includes("mismatch")) {
    return "Sergey item reports jobTitle mismatch";
  }
  if (text.match(/job title.*(wrong|mismatch|does not match)/)) {
    return "Sergey item reports jobTitle mismatch";
  }
  return null;
}

function matchExpectation(
  result: PageResult,
  exp: Expectation,
): { ok: boolean; kind: "PASS" | "MISS" | "STALE"; detail: string } {
  const status = getCheckStatus(result, exp.check);
  const evidence = getCheckValue(result, exp.check);
  const evText = evidence.join(" ");

  const itemRuleErr = checkItemRule(result, exp);
  if (itemRuleErr) {
    return { ok: false, kind: "MISS", detail: itemRuleErr };
  }

  const verdictErr = checkItemsWithVerdict(result, exp);
  if (verdictErr) {
    return { ok: false, kind: "MISS", detail: verdictErr };
  }

  if (exp.status_in && !["H1", "H2"].includes(exp.check) && !exp.status_in.includes(status)) {
    return {
      ok: false,
      kind: "MISS",
      detail: `status ${status}, expected ${exp.status_in.join("|")}`,
    };
  }

  if (exp.value_in) {
    const values =
      exp.check === "H1"
        ? [result.recommendation.action]
        : exp.check === "H2"
          ? [result.recommendation.priority]
          : evidence;
    const matched = exp.value_in.some((v) =>
      values.some((val) => {
        const valLower = val.toLowerCase();
        const vLower = v.toLowerCase();
        if (valLower === vLower || valLower.includes(vLower)) return true;
        if (v.includes("_") && valLower.replace(/\s+/g, "_").includes(vLower))
          return true;
        return false;
      }),
    );
    if (!matched) {
      return {
        ok: false,
        kind: "MISS",
        detail: `values ${JSON.stringify(values)}, expected one of ${exp.value_in.join("|")}`,
      };
    }
  }

  if (exp.status_must_match_value && VALUE_CHECK_IDS.has(exp.check)) {
    const r = getCheckResult(result, exp.check);
    if (r?.value) {
      const expected = expectedStatusForValue(exp.check, r.value, result.page_type);
      if (r.status !== expected) {
        return {
          ok: false,
          kind: "MISS",
          detail: `status ${r.status}, expected ${expected} for value ${r.value}`,
        };
      }
    }
  }

  if (exp.evidence_contains_any) {
    const found = exp.evidence_contains_any.some((p) =>
      evidenceMatchesPhrase(evidence, p),
    );
    if (!found) {
      return {
        ok: false,
        kind: "MISS",
        detail: `closest evidence: ${closestEvidence(evidence, exp.evidence_contains_any[0]!)}`,
      };
    }
  }

  if (exp.evidence_must_not_contain) {
    for (const bad of exp.evidence_must_not_contain) {
      if (evText.includes(bad)) {
        return {
          ok: false,
          kind: "MISS",
          detail: `evidence must not contain "${bad}"`,
        };
      }
    }
  }

  return { ok: true, kind: "PASS", detail: "" };
}

async function main(): Promise<void> {
  const file = path.join(projectRoot(), "tests", "expectations.json");
  const expectations = JSON.parse(fs.readFileSync(file, "utf8")) as ExpectationsFile;

  for (const page of expectations.pages) {
    await runScan({ urls: [page.url], force: true });
  }

  let pass = 0;
  let miss = 0;
  let stale = 0;

  for (const page of expectations.pages) {
    console.log(`\n${page.url}`);
    const slug = urlToSlug(page.url);
    const resultPath = path.join(
      projectRoot(),
      "results",
      "latest",
      "pages",
      `${slug}.json`,
    );
    if (!fs.existsSync(resultPath)) {
      console.log("  MISSING result file");
      miss += page.expect.length;
      continue;
    }
    const result = JSON.parse(fs.readFileSync(resultPath, "utf8")) as PageResult;

    for (const exp of page.expect) {
      if (exp.evidence_contains_any) {
        let anyOnPage = false;
        for (const phrase of exp.evidence_contains_any) {
          if (await pageContainsPhrase(page.url, phrase)) {
            anyOnPage = true;
            break;
          }
        }
        if (!anyOnPage && exp.status_in?.includes("fail")) {
          console.log(`  STALE ${exp.check}: live page no longer contains expected phrase`);
          for (const phrase of exp.evidence_contains_any) {
            const onPage = await pageContainsPhrase(page.url, phrase);
            console.log(`    "${phrase}" on page: ${onPage}`);
          }
          stale++;
          continue;
        }
      }

      const m = matchExpectation(result, exp);
      if (m.ok) {
        console.log(
          `  PASS ${exp.check}${exp.evidence_contains_any ? ` (${exp.evidence_contains_any[0]})` : ""}`,
        );
        pass++;
      } else if (m.kind === "MISS") {
        console.log(`  MISS ${exp.check}: ${m.detail}`);
        miss++;
      }
    }
  }

  console.log(`\nSummary: ${pass} PASS, ${miss} MISS, ${stale} STALE`);
  if (miss > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
