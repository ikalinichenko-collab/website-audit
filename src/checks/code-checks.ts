import type { AuditConfig } from "../types.js";
import type { CheckResult, Location, PageData } from "../types.js";
import { makeResult } from "./result-factory.js";
import { schemaTypesPresent } from "../fetch-page.js";
import { urlsMatch, isInternal } from "../utils.js";

type LinkChecker = (url: string) => Promise<{ status: number; finalUrl: string }>;

function searchTexts(page: PageData, includeSchema = false): { text: string; location: Location }[] {
  const base = [
    { text: page.title, location: "title" as Location },
    { text: page.meta_description, location: "meta" as Location },
    ...page.h1.map((t) => ({ text: t, location: "h1" as Location })),
    ...page.h2.map((t) => ({ text: t, location: "h2" as Location })),
    { text: page.first_paragraph, location: "first_paragraph" as Location },
    { text: page.body, location: "body" as Location },
  ];
  if (includeSchema) {
    base.push({ text: JSON.stringify(page.json_ld), location: "schema" });
  }
  return base;
}

function indexOfPhrase(
  haystack: string,
  phrase: string,
  caseSensitive: boolean,
): number {
  if (caseSensitive) return haystack.indexOf(phrase);
  return haystack.toLowerCase().indexOf(phrase.toLowerCase());
}

function phraseMatchIgnored(
  fullText: string,
  phrase: string,
  caseSensitive: boolean,
  notInside?: string[],
): boolean {
  const idx = indexOfPhrase(fullText, phrase, caseSensitive);
  if (idx < 0) return true;
  if (!notInside?.length) return false;
  for (const outer of notInside) {
    const oIdx = indexOfPhrase(fullText, outer, caseSensitive);
    if (oIdx >= 0) {
      const oEnd = oIdx + outer.length;
      if (idx >= oIdx && idx + phrase.length <= oEnd) return true;
    }
  }
  return false;
}

function snippetAround(text: string, idx: number, len: number): string {
  const start = Math.max(0, idx - 20);
  const end = Math.min(text.length, idx + len + 20);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function findPhraseOccurrences(
  page: PageData,
  phrase: string,
  cs: boolean,
  notInside?: string[],
): { count: number; locations: Location[]; snippets: string[] } {
  const locations: Location[] = [];
  const snippets: string[] = [];
  let count = 0;
  for (const { text, location } of searchTexts(page, true)) {
    if (!text) continue;
    let searchFrom = 0;
    while (searchFrom < text.length) {
      const idx = cs
        ? text.indexOf(phrase, searchFrom)
        : text.toLowerCase().indexOf(phrase.toLowerCase(), searchFrom);
      if (idx < 0) break;
      const slice = text.slice(idx);
      if (phraseMatchIgnored(slice, phrase, cs, notInside)) {
        searchFrom = idx + 1;
        continue;
      }
      count++;
      if (!locations.includes(location)) locations.push(location);
      if (snippets.length < 2) {
        snippets.push(snippetAround(text, idx, phrase.length));
      }
      searchFrom = idx + phrase.length;
    }
  }
  return { count, locations, snippets };
}

export function runC1(page: PageData, config: AuditConfig): CheckResult {
  const items: import("../types.js").CheckItem[] = [];
  let totalCount = 0;

  for (const rule of config.exact_phrases.items) {
    const cs = rule.case_sensitive ?? false;
    const { count, locations, snippets } = findPhraseOccurrences(
      page,
      rule.phrase,
      cs,
      rule.not_inside,
    );
    totalCount += count;
    let fix = "";
    if (count > 0) {
      if (rule.replace_with) {
        fix = `Replace "${rule.phrase}" with ${rule.replace_with}.`;
      } else {
        fix = `Remove or rephrase "${rule.phrase}".`;
      }
    }
    items.push({
      name: rule.phrase,
      status: count > 0 ? "fail" : "pass",
      evidence: snippets,
      locations,
      count: count > 0 ? count : null,
      fix,
    });
  }

  const failing = items.filter((i) => i.status === "fail");
  return makeResult("C1", failing.length ? "fail" : "pass", {
    evidence: failing.length
      ? failing.slice(0, 2).map((i) => `${i.name}: ${i.evidence[0] ?? ""}`)
      : ["No banned phrases found."],
    fix: failing
      .slice(0, 3)
      .map((i) => i.fix)
      .filter(Boolean)
      .join(" "),
    source_ref: "audit.json: exact_phrases",
    items,
    count: totalCount || null,
    locations: [...new Set(failing.flatMap((i) => i.locations))],
  });
}

export function runC3(page: PageData, config: AuditConfig): CheckResult {
  const allowed = config.brand_spelling.allowed_phrases;
  const wrong = config.brand_spelling.wrong_spellings;
  const evidence: string[] = [];
  const locations: Location[] = [];
  let count = 0;

  const checkText = (text: string, location: Location, skipUrlLike: boolean) => {
    if (!text) return;
    if (skipUrlLike) {
      /* URLs/emails handled by caller */
    }
    for (const w of wrong) {
      const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        const before = text.slice(Math.max(0, m.index - 30), m.index + w.length + 30);
        if (allowed.some((a) => before.includes(a))) continue;
        count++;
        if (!locations.includes(location)) locations.push(location);
        if (evidence.length < 2) evidence.push(snippetAround(text, m.index, w.length));
      }
    }
  };

  for (const { text, location } of searchTexts(page)) {
    checkText(text, location, false);
  }
  const schemaStr = JSON.stringify(page.json_ld);
  checkText(schemaStr, "schema", true);

  if (count === 0) {
    return makeResult("C3", "pass", {
      evidence: [`Brand spelling "${config.code_facts.brand_name}" is consistent.`],
      source_ref: "audit.json: brand_spelling",
    });
  }
  return makeResult("C3", "fail", {
    evidence,
    locations,
    count,
    fix: `Use "${config.code_facts.brand_name}" consistently.`,
    source_ref: "audit.json: brand_spelling",
  });
}

const PHONE_RE =
  /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}|\+\d{10,15}/g;

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export function runC4(page: PageData, config: AuditConfig): CheckResult {
  const texts = [
    page.main_text,
    page.title,
    page.meta_description,
    JSON.stringify(page.json_ld),
  ].join("\n");
  const expected = config.code_facts.phone_digits;
  const evidence: string[] = [];
  let status: "pass" | "fail" | "warn" = "pass";
  let fix = "";

  const matches = texts.match(PHONE_RE) ?? [];
  const seen = new Set<string>();
  for (const raw of matches) {
    const d = digitsOnly(raw);
    if (d.length < 10 || seen.has(d)) continue;
    seen.add(d);
    if (d.includes("555555") || /555/.test(raw.replace(/\D/g, "").slice(3, 6))) {
      status = "fail";
      evidence.push(`Placeholder number: ${raw}`);
      fix = "Remove fake 555 placeholder phone numbers.";
      continue;
    }
    const normalized = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
    const exp =
      expected.length === 11 && expected.startsWith("1") ? expected.slice(1) : expected;
    if (normalized !== exp && d !== expected) {
      status = "fail";
      evidence.push(`Wrong number: ${raw}`);
      fix = `Use the official phone number matching ${expected}.`;
    }
  }

  if (status === "pass" && evidence.length === 0) {
    return makeResult("C4", "pass", {
      evidence: ["Phone matches official digits or none listed."],
      source_ref: "audit.json: code_facts.phone_digits",
    });
  }
  return makeResult("C4", status, {
    evidence: evidence.slice(0, 2),
    count: evidence.length,
    fix,
    source_ref: "audit.json: code_facts.phone_digits",
  });
}

export function runC5(page: PageData): CheckResult {
  const em = "\u2014";
  const fields = searchTexts(page);
  let count = 0;
  const locations: Location[] = [];
  for (const { text, location } of fields) {
    const c = (text.match(new RegExp(em, "g")) ?? []).length;
    if (c) {
      count += c;
      locations.push(location);
    }
  }
  if (count === 0) {
    return makeResult("C5", "pass", {
      evidence: ["No em dashes found."],
      source_ref: "Glossary §9",
    });
  }
  return makeResult("C5", "fail", {
    evidence: [`${count} em dash(es) found.`],
    locations,
    count,
    fix: "Replace em dashes with commas or periods.",
    source_ref: "Glossary §9",
  });
}

export async function runCodeChecks(
  page: PageData,
  config: AuditConfig,
  linkChecker: LinkChecker,
): Promise<Record<string, CheckResult>> {
  const r: Record<string, CheckResult> = {};

  // A1
  if (page.status === 200) {
    r.A1 = makeResult("A1", "pass", {
      evidence: [`HTTP ${page.status}`],
      source_ref: "checklist: A1",
    });
  } else if (page.status >= 300 && page.status < 400) {
    r.A1 = makeResult("A1", "warn", {
      evidence: [`Redirect to ${page.final_url}`],
      fix: "Ensure final URL returns 200.",
      source_ref: "checklist: A1",
    });
  } else {
    r.A1 = makeResult("A1", "fail", {
      evidence: [`HTTP ${page.status}`],
      fix: "Fix HTTP status to 200.",
      source_ref: "checklist: A1",
    });
  }

  // A2
  const tlen = page.title.length;
  const { min: tMin, max: tMax } = config.seo.title_length;
  if (tlen >= tMin && tlen <= tMax) {
    r.A2 = makeResult("A2", "pass", {
      evidence: [`${tlen} characters`],
      locations: ["title"],
      source_ref: "audit.json: seo",
    });
  } else {
    r.A2 = makeResult("A2", "fail", {
      evidence: [`${tlen} characters: "${page.title.slice(0, 40)}..."`],
      locations: ["title"],
      fix: `Adjust title to ${tMin}-${tMax} characters.`,
      source_ref: "audit.json: seo",
    });
  }

  // A3
  const mlen = page.meta_description.length;
  const { min: mMin, max: mMax } = config.seo.meta_description_length;
  if (!page.meta_description) {
    r.A3 = makeResult("A3", "fail", {
      evidence: ["Missing meta description"],
      locations: ["meta"],
      fix: `Add meta description (${mMin}-${mMax} characters).`,
      source_ref: "audit.json: seo",
    });
  } else if (mlen >= mMin && mlen <= mMax) {
    r.A3 = makeResult("A3", "pass", {
      evidence: [`${mlen} characters`],
      locations: ["meta"],
      source_ref: "audit.json: seo",
    });
  } else {
    r.A3 = makeResult("A3", "fail", {
      evidence: [`${mlen} characters`],
      locations: ["meta"],
      fix: `Adjust meta description to ${mMin}-${mMax} characters.`,
      source_ref: "audit.json: seo",
    });
  }

  // A4
  const h1c = page.h1.length;
  if (h1c === config.seo.h1_count) {
    r.A4 = makeResult("A4", "pass", {
      evidence: [`${h1c} H1`],
      locations: ["h1"],
      source_ref: "audit.json: seo",
    });
  } else {
    r.A4 = makeResult("A4", "fail", {
      evidence: [`${h1c} H1 element(s)`],
      locations: ["h1"],
      fix: `Use exactly ${config.seo.h1_count} H1.`,
      source_ref: "audit.json: seo",
    });
  }

  // A5
  if (!page.canonical) {
    r.A5 = makeResult("A5", "fail", {
      evidence: ["Missing canonical"],
      fix: "Add a self-referencing canonical link.",
      source_ref: "checklist: A5",
    });
  } else {
    const canonUrl = new URL(page.canonical, page.url).href;
    const check = await linkChecker(canonUrl);
    if (check.status === 200) {
      r.A5 = makeResult("A5", "pass", {
        evidence: [canonUrl],
        locations: ["meta"],
        source_ref: "checklist: A5",
      });
    } else {
      r.A5 = makeResult("A5", "fail", {
        evidence: [`Canonical ${canonUrl} returns ${check.status}`],
        fix: "Fix canonical to a URL that returns 200.",
        source_ref: "checklist: A5",
      });
    }
  }

  // A6
  const noindex = /noindex/i.test(page.meta_robots);
  const pt = page.page_type;
  if (!noindex) {
    r.A6 = makeResult("A6", "pass", {
      evidence: ["Indexable"],
      source_ref: "checklist: A6",
    });
  } else if (pt === "legal") {
    r.A6 = makeResult("A6", "warn", {
      evidence: ["noindex on legal page"],
      fix: "Legal page is noindex (acceptable if intentional).",
      source_ref: "checklist: A6",
    });
  } else if (pt === "service" || pt === "post") {
    r.A6 = makeResult("A6", "fail", {
      evidence: ["noindex present"],
      locations: ["meta"],
      fix: "Remove noindex from service or post pages.",
      source_ref: "checklist: A6",
    });
  } else {
    r.A6 = makeResult("A6", "warn", {
      evidence: ["noindex present"],
      source_ref: "checklist: A6",
    });
  }

  // A7
  const ogOk =
    page.open_graph["og:title"] &&
    page.open_graph["og:description"] &&
    page.open_graph["og:image"];
  r.A7 = makeResult("A7", ogOk ? "pass" : "fail", {
    evidence: ogOk
      ? ["og:title, og:description, og:image present"]
      : ["Missing one or more og:title, og:description, og:image"],
    locations: ["meta"],
    fix: ogOk ? "" : "Add complete Open Graph tags.",
    source_ref: "checklist: A7",
  });

  // A8
  const req = config.requirements_by_type[page.page_type] ?? config.requirements_by_type.other;
  if (!req.dates) {
    r.A8 = makeResult("A8", "na", { source_ref: "audit.json: requirements_by_type" });
  } else if (page.date_published && page.date_modified) {
    r.A8 = makeResult("A8", "pass", {
      evidence: [page.date_published, page.date_modified],
      locations: ["schema"],
      source_ref: "audit.json: requirements_by_type",
    });
  } else {
    r.A8 = makeResult("A8", "fail", {
      evidence: [
        `datePublished: ${page.date_published ?? "missing"}`,
        `dateModified: ${page.date_modified ?? "missing"}`,
      ],
      fix: "Add datePublished and dateModified in schema.",
      source_ref: "audit.json: requirements_by_type",
    });
  }

  // A9
  if (!req.author) {
    r.A9 = makeResult("A9", "na", { source_ref: "audit.json: requirements_by_type" });
  } else {
    const name = page.author_visible ?? page.author ?? "";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      r.A9 = makeResult("A9", "pass", {
        evidence: [name],
        source_ref: "audit.json: requirements_by_type",
      });
    } else {
      r.A9 = makeResult("A9", "fail", {
        evidence: [name || "missing author"],
        fix: "Show author full name (first and last).",
        source_ref: "audit.json: requirements_by_type",
      });
    }
  }

  // A10
  const imgCount = page.images_without_alt.length;
  r.A10 = makeResult("A10", imgCount === 0 ? "pass" : "warn", {
    evidence: imgCount ? [`${imgCount} images without alt`] : ["All main images have alt"],
    locations: imgCount ? ["image_alt"] : [],
    count: imgCount,
    fix: imgCount ? "Add alt text to main content images." : "",
    source_ref: "checklist: A10",
  });

  // A11
  const broken: string[] = [];
  const checked = new Set<string>();
  for (const link of page.internal_links) {
    if (checked.has(link.href)) continue;
    checked.add(link.href);
    const res = await linkChecker(link.href);
    if (res.status >= 400) broken.push(`${link.href} (${res.status})`);
  }
  r.A11 = makeResult("A11", broken.length ? "fail" : "pass", {
    evidence: broken.length ? broken.slice(0, 2) : ["No broken internal links"],
    locations: broken.length ? ["link_text"] : [],
    count: broken.length,
    fix: broken.length ? "Fix or remove broken internal links." : "",
    source_ref: "checklist: A11",
  });

  // A12
  const staffing = config.site.service_pages.staffing;
  const recruiting = config.site.service_pages.recruiting;
  const isServiceOrLegal =
    page.page_type === "service" ||
    page.page_type === "legal" ||
    urlsMatch(page.url, staffing) ||
    urlsMatch(page.url, recruiting);
  if (isServiceOrLegal) {
    r.A12 = makeResult("A12", "na", { source_ref: "checklist: A12" });
  } else {
    const hasStaff = page.internal_links.some((l) => urlsMatch(l.href, staffing));
    const hasRec = page.internal_links.some((l) => urlsMatch(l.href, recruiting));
    if (hasStaff || hasRec) {
      r.A12 = makeResult("A12", "pass", {
        evidence: [
          hasStaff ? "Links to staffing" : "",
          hasRec ? "Links to recruiting" : "",
        ].filter(Boolean),
        locations: ["link_text"],
        source_ref: "checklist: A12",
      });
    } else {
      r.A12 = makeResult("A12", "fail", {
        evidence: ["No link to staffing or recruiting service pages"],
        fix: "Add links to staffing and/or recruiting service pages in main content.",
        source_ref: "checklist: A12",
      });
    }
  }

  // B1
  const types = schemaTypesPresent(page.json_ld);
  const required = req.schema ?? [];
  const missing = required.filter((t) => !types.includes(t));
  r.B1 = makeResult("B1", missing.length ? "fail" : "pass", {
    evidence: missing.length
      ? [`Missing: ${missing.join(", ")}`, `Found: ${types.join(", ") || "none"}`]
      : [`Required types present: ${required.join(", ")}`],
    locations: ["schema"],
    fix: missing.length ? `Add JSON-LD types: ${missing.join(", ")}.` : "",
    source_ref: "audit.json: requirements_by_type",
  });

  r.C1 = runC1(page, config);
  r.C3 = runC3(page, config);
  r.C4 = runC4(page, config);
  r.C5 = runC5(page);

  return r;
}

export function runG2(
  page: PageData,
  targetKeyword: string | null,
): CheckResult {
  if (!targetKeyword || targetKeyword.toLowerCase() === "none") {
    return makeResult("G2", "na", {
      evidence: ["No target keyword from G1"],
      source_ref: "checklist: G2",
    });
  }
  const kw = targetKeyword.toLowerCase();
  const checks: [string, string][] = [
    ["title", page.title],
    ["h1", page.h1.join(" ")],
    ["h2", page.h2.join(" ")],
    ["meta", page.meta_description],
    ["first_paragraph", page.first_paragraph],
  ];
  const evidence: string[] = [];
  const locations: Location[] = [];
  let allYes = true;
  for (const [loc, text] of checks) {
    const yes = text.toLowerCase().includes(kw);
    evidence.push(`${loc}: ${yes ? "yes" : "no"}`);
    if (!yes) allYes = false;
    if (yes) locations.push(loc as Location);
  }
  return makeResult("G2", allYes ? "pass" : "warn", {
    evidence,
    locations,
    fix: allYes ? "" : "Place target keyword in title, H1, H2, meta, and first paragraph.",
    source_ref: "checklist: G2",
  });
}

export function runG4(
  pageUrl: string,
  targetKeyword: string | null,
  keywordByUrl: Map<string, string>,
  fullSiteRun: boolean,
): CheckResult {
  if (!fullSiteRun) {
    if (keywordByUrl.size === 0) {
      return makeResult("G4", "skip", {
        evidence: ["Single-page mode without previous full run"],
        source_ref: "checklist: G4",
      });
    }
  }
  if (!targetKeyword || targetKeyword.toLowerCase() === "none") {
    return makeResult("G4", "na", {
      evidence: ["No target keyword"],
      source_ref: "checklist: G4",
    });
  }
  const competitors: string[] = [];
  for (const [url, kw] of keywordByUrl) {
    if (url === pageUrl) continue;
    if (kw.toLowerCase() === targetKeyword.toLowerCase()) competitors.push(url);
  }
  if (competitors.length === 0) {
    return makeResult("G4", "pass", {
      evidence: ["No competing pages for this keyword"],
      source_ref: "checklist: G4",
    });
  }
  return makeResult("G4", "warn", {
    evidence: competitors.slice(0, 2),
    count: competitors.length,
    fix: "Resolve keyword cannibalization across competing URLs.",
    source_ref: "checklist: G4",
  });
}
