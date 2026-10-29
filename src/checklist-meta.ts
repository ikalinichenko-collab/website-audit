/** Fixed severities and check metadata from docs/checklist.md */

export const PAGE_CHECK_IDS = [
  "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4", "C5",
  "D1", "D2", "D3", "D4",
  "E1", "E2", "E3", "E4",
  "F1", "F2", "F3", "F4", "F5", "F6",
  "G1", "G2", "G3", "G4",
  "H1", "H2", "H3",
] as const;

export const SITE_CHECK_IDS = ["S1", "S2", "S3", "S4", "S5", "S6"] as const;

export type PageCheckId = (typeof PAGE_CHECK_IDS)[number];
export type SiteCheckId = (typeof SITE_CHECK_IDS)[number];

export const CHECK_NAMES: Record<string, string> = {
  A1: "HTTP status",
  A2: "Title length",
  A3: "Meta description length",
  A4: "Exactly one H1",
  A5: "Canonical",
  A6: "Indexable",
  A7: "Open Graph",
  A8: "Dates",
  A9: "Author",
  A10: "Image alt text",
  A11: "Broken internal links",
  A12: "Links to service pages",
  B1: "Expected schema types",
  B2: "Organization data",
  B3: "Person data",
  B4: "Schema matches the page",
  C1: "Banned phrases",
  C2: "Context terms",
  C3: "Brand spelling",
  C4: "Phone number",
  C5: "Em dash",
  D1: "Company facts",
  D2: "Client figures",
  D3: "Clients not in the Fact Sheet",
  D4: "Press and partners",
  E1: "Service fit",
  E2: "Positioning",
  E3: "Call to action",
  E4: "Lead order",
  F1: "Answer first",
  F2: "Buyer problem",
  F3: "Recruiting firm stated early",
  F4: "GoGloby named near claims",
  F5: "FAQ",
  F6: "Audience",
  G1: "Target keyword",
  G2: "Keyword placement",
  G3: "Trap terms in title or H1",
  G4: "Competing pages",
  H1: "Action",
  H2: "Priority",
  H3: "Reasons",
  S1: "AI bots allowed",
  S2: "llms.txt",
  S3: "Sitemaps",
  S4: "Content in raw HTML",
  S5: "Competing pages summary",
  S6: "Site-wide schema",
};

export const SEVERITIES: Record<string, "high" | "medium" | "low"> = {
  A1: "high", A2: "medium", A3: "medium", A4: "medium", A5: "high", A6: "high",
  A7: "low", A8: "medium", A9: "medium", A10: "low", A11: "high", A12: "medium",
  B1: "medium", B2: "high", B3: "medium", B4: "medium",
  C1: "high", C2: "high", C3: "high", C4: "high", C5: "low",
  D1: "high", D2: "high", D3: "high", D4: "low",
  E1: "high", E2: "high", E3: "medium", E4: "medium",
  F1: "high", F2: "medium", F3: "medium", F4: "medium", F5: "medium", F6: "medium",
  G1: "medium", G2: "medium", G3: "medium", G4: "medium",
  S1: "high", S2: "low", S3: "high", S4: "high", S5: "medium", S6: "high",
};

export const LLM_CHECK_IDS = [
  "B2", "B3", "B4", "C2", "D1", "D2", "D3", "D4",
  "E1", "E2", "E3", "E4", "F1", "F2", "F3", "F4", "F5", "F6",
  "G1", "G3", "H1", "H2", "H3",
] as const;

export const CODE_CHECK_IDS = [
  "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12",
  "B1", "C1", "C3", "C4", "C5", "G2", "G4",
  // D2/D3 are code+llm (candidates in code, verdict in LLM)
] as const;

export const REPORT_SECTIONS: { letter: string; ids: string[] }[] = [
  { letter: "A", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("A")) as string[] },
  { letter: "B", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("B")) as string[] },
  { letter: "C", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("C")) as string[] },
  { letter: "D", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("D")) as string[] },
  { letter: "E", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("E")) as string[] },
  { letter: "F", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("F")) as string[] },
  { letter: "G", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("G")) as string[] },
  { letter: "H", ids: PAGE_CHECK_IDS.filter((id) => id.startsWith("H")) as string[] },
];
