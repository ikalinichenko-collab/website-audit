import type { AuditConfig } from "../types.js";
import type { PageData } from "../types.js";
import {
  collectOrganizationNodes,
  collectPersonNodes,
} from "../fetch-page.js";

export interface TermOccurrence {
  term: string;
  location: string;
  snippet: string;
}

function searchTexts(page: PageData): { text: string; location: string }[] {
  return [
    { text: page.title, location: "title" },
    { text: page.meta_description, location: "meta" },
    ...page.h1.map((t) => ({ text: t, location: "h1" })),
    ...page.h2.map((t) => ({ text: t, location: "h2" })),
    { text: page.first_paragraph, location: "first_paragraph" },
    { text: page.body, location: "body" },
  ];
}

function snippetAround(text: string, idx: number, len: number): string {
  const start = Math.max(0, idx - 25);
  const end = Math.min(text.length, idx + len + 25);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

export function collectContextTermEvidence(
  page: PageData,
  config: AuditConfig,
): TermOccurrence[] {
  const out: TermOccurrence[] = [];
  for (const term of config.context_terms.items) {
    for (const { text, location } of searchTexts(page)) {
      if (!text) continue;
      let from = 0;
      const lower = text.toLowerCase();
      const tLower = term.toLowerCase();
      while (from < text.length) {
        const idx = lower.indexOf(tLower, from);
        if (idx < 0) break;
        out.push({
          term,
          location,
          snippet: snippetAround(text, idx, term.length),
        });
        from = idx + term.length;
      }
    }
  }
  return out;
}

export function collectSchemaEvidence(page: PageData): {
  organizations: Record<string, unknown>[];
  persons: Record<string, unknown>[];
} {
  return {
    organizations: collectOrganizationNodes(page.json_ld),
    persons: collectPersonNodes(page.json_ld),
  };
}

export function titleH1ForG3(page: PageData): { title: string; h1: string[] } {
  return { title: page.title, h1: page.h1 };
}

export function normalizeJobTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\band\b/g, "and")
    .trim();
}

const SOURCE_JOB_TITLES = [
  normalizeJobTitle("Co-Founder and CTO"),
  normalizeJobTitle("Co-Founder"),
];

export interface B3PersonEvidence {
  name: string;
  jobTitle: string | null;
  jobTitle_normalized: string | null;
  jobTitle_matches_approved_source: boolean;
  description: string | null;
  knowsAbout: unknown;
  sameAs: unknown;
  raw: Record<string, unknown>;
}

export function buildB3PersonEvidence(
  persons: Record<string, unknown>[],
): B3PersonEvidence[] {
  return persons.map((p) => {
    const jobTitle = typeof p.jobTitle === "string" ? p.jobTitle : null;
    const norm = jobTitle ? normalizeJobTitle(jobTitle) : null;
    const matches =
      norm !== null &&
      SOURCE_JOB_TITLES.some(
        (approved) => norm === approved || norm.includes(approved),
      );
    const name =
      typeof p.name === "string"
        ? p.name
        : typeof p["@id"] === "string"
          ? p["@id"]
          : "Unknown Person";
    return {
      name,
      jobTitle,
      jobTitle_normalized: norm,
      jobTitle_matches_approved_source: matches,
      description: typeof p.description === "string" ? p.description : null,
      knowsAbout: p.knowsAbout ?? null,
      sameAs: p.sameAs ?? null,
      raw: p,
    };
  });
}
