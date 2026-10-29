import type { AuditConfig } from "../types.js";
import type { Location, MainContentImage, PageData } from "../types.js";

export interface NamedCandidate {
  candidate_id: string;
  name: string;
  in_fact_sheet: boolean;
  source: string;
  context: string;
  locations: Location[];
}

const FIGURE_RE =
  /\$[\d,.]+(?:[BMK])?|\d[\d,.]*\+|\d[\d,.]*\s*(?:million|billion|employees|%|M\+|K\+|B\+)/gi;

const CLIENT_CUE_RE =
  /clients?\s+include|trusted\s+by|our\s+clients|case\s+study|client\s+cards?/gi;

const CARD_LABEL_RE =
  /\b([A-Z][A-Z0-9&.'-]{2,}(?:\s+[A-Z0-9&.'-]+)*)\b[^.]{0,120}(?:\$|\d[\d,.]*\s*(?:million|billion|M\+|K\+|%|raised|revenue|employees))/g;

function buildAliasMap(
  clients: Record<string, string[]>,
): Map<string, { canonical: string; alias: string }> {
  const map = new Map<string, { canonical: string; alias: string }>();
  for (const [canonical, aliases] of Object.entries(clients)) {
    const all = new Set([canonical, ...aliases]);
    for (const a of all) {
      map.set(a.toLowerCase(), { canonical, alias: a });
      map.set(a.toUpperCase(), { canonical, alias: a });
    }
    map.set(canonical.toUpperCase(), { canonical, alias: canonical });
  }
  return map;
}

function isFactSheetClient(name: string, clients: Record<string, string[]>): boolean {
  const lower = name.toLowerCase();
  for (const [canonical, aliases] of Object.entries(clients)) {
    if (canonical.toLowerCase() === lower) return true;
    if (aliases.some((a) => a.toLowerCase() === lower)) return true;
  }
  return false;
}

function meaningfulFileName(fileName: string): boolean {
  if (!fileName || fileName.length < 4) return false;
  const base = fileName.replace(/\.[a-z0-9]+$/i, "").toLowerCase();
  if (/placeholder|spacer|pixel|1x1|icon|arrow|chevron|close|menu|map|background|^bg[-_]|sprite|avatar-default/.test(base))
    return false;
  if (/logo|client|brand|partner|company/.test(base)) return true;
  return companyFromLogoFileName(fileName) !== null;
}

function isLogoWallImage(img: MainContentImage): boolean {
  if (!img.src || img.src.startsWith("data:")) return false;
  const fn = (img.file_name ?? "").toLowerCase();
  if (/placeholder|spacer|pixel|1x1|icon|arrow|chevron|close|menu|map|background|^bg[-_]/.test(fn))
    return false;
  const alt = img.alt?.trim() ?? "";
  const fromFile = meaningfulFileName(img.file_name);
  const fromAlt = alt.length >= 2 && !/^(logo|image|photo|icon)$/i.test(alt);
  if (!fromFile && !fromAlt) return false;
  if (/logo|client|brand|partner/.test(fn)) return true;
  if (companyFromLogoFileName(img.file_name)) return true;
  if (fromAlt && fromFile) return true;
  return fromAlt && /logo|client|partner|trusted|brand/i.test(alt);
}

export function filterLogoImagesForD3(images: MainContentImage[]): MainContentImage[] {
  return (images ?? []).filter(isLogoWallImage);
}

function companyFromLogoFileName(fileName: string): string | null {
  const base = fileName.replace(/\.[a-z0-9]+$/i, "");
  const m = base.match(/logo[-_]?(.+)/i) ?? base.match(/client[-_]?(.+)/i);
  const slug = (m?.[1] ?? base).replace(/[-_]\d+$/, "").replace(/[-_]+/g, " ");
  if (!slug || slug.length < 2) return null;
  return slug
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function addCandidate(
  list: NamedCandidate[],
  seen: Set<string>,
  c: Omit<NamedCandidate, "candidate_id"> & { candidate_id?: string },
): void {
  const id = c.candidate_id ?? `${c.source}:${c.name}`.toLowerCase();
  if (seen.has(id)) return;
  seen.add(id);
  list.push({ ...c, candidate_id: id });
}

export function buildD3Candidates(
  page: PageData,
  config: AuditConfig,
): NamedCandidate[] {
  const clients = config.code_facts.clients ?? {};
  const list: NamedCandidate[] = [];
  const seen = new Set<string>();
  const text = page.main_text;

  let m: RegExpExecArray | null;
  CARD_LABEL_RE.lastIndex = 0;
  while ((m = CARD_LABEL_RE.exec(text)) !== null) {
    const label = m[1]!.trim();
    if (label.length < 3) continue;
    addCandidate(list, seen, {
      name: label,
      in_fact_sheet: isFactSheetClient(label, clients),
      source: "client_card",
      context: m[0]!.slice(0, 200),
      locations: ["body"],
    });
  }

  for (const img of filterLogoImagesForD3(page.main_content_images ?? [])) {
    const fromFile = companyFromLogoFileName(img.file_name);
    const fromAlt = img.alt?.trim();
    const name = fromAlt || fromFile;
    if (!name) continue;
    addCandidate(list, seen, {
      name,
      in_fact_sheet: isFactSheetClient(name, clients),
      source: "logo_image",
      context: `file_name: ${img.file_name}; alt: ${img.alt ?? ""}`,
      locations: ["image_alt"],
    });
  }

  CLIENT_CUE_RE.lastIndex = 0;
  while ((m = CLIENT_CUE_RE.exec(text)) !== null) {
    const slice = text.slice(m.index, m.index + 300);
    const caps = slice.match(/\b([A-Z]{3,}[A-Z0-9&.'-]*)\b/g) ?? [];
    for (const cap of caps) {
      if (cap === cap.toUpperCase() && cap.length >= 3) {
        addCandidate(list, seen, {
          name: cap,
          in_fact_sheet: isFactSheetClient(cap, clients),
          source: "text_cue",
          context: slice.slice(0, 150),
          locations: ["body"],
        });
      }
    }
  }

  return list;
}

function wordsAround(text: string, index: number, radiusWords: number): string {
  const before = text.slice(0, index);
  const after = text.slice(index);
  const bWords = before.split(/\s+/).slice(-radiusWords);
  const aWords = after.split(/\s+/).slice(0, radiusWords);
  return [...bWords, ...aWords].join(" ");
}

export function buildD2Candidates(
  page: PageData,
  config: AuditConfig,
): NamedCandidate[] {
  const clients = config.code_facts.clients ?? {};
  const aliasMap = buildAliasMap(clients);
  const hay = [page.main_text, page.body, page.title].join("\n");
  const list: NamedCandidate[] = [];
  const seen = new Set<string>();

  const figures: { index: number; match: string }[] = [];
  let fm: RegExpExecArray | null;
  FIGURE_RE.lastIndex = 0;
  while ((fm = FIGURE_RE.exec(hay)) !== null) {
    figures.push({ index: fm.index, match: fm[0]! });
  }

  for (const [aliasKey, { canonical, alias }] of aliasMap) {
    const re = new RegExp(
      `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi",
    );
    let am: RegExpExecArray | null;
    while ((am = re.exec(hay)) !== null) {
      const nearFigure = figures.some(
        (f) => Math.abs(f.index - am!.index) < 200,
      );
      if (!nearFigure) continue;
      const id = `d2:${canonical}`.toLowerCase();
      if (seen.has(id)) continue;
      seen.add(id);
      list.push({
        candidate_id: id,
        name: canonical,
        in_fact_sheet: true,
        source: "client_near_figure",
        context: wordsAround(hay, am.index, 25),
        locations: ["body"],
      });
      break;
    }
  }

  return list;
}

export function c2CandidatesFromOccurrences(
  occurrences: import("./evidence.js").TermOccurrence[],
): NamedCandidate[] {
  return occurrences.map((o, i) => ({
    candidate_id: `c2:${o.term}:${o.location}:${i}`,
    name: `${o.term} @ ${o.location}`,
    in_fact_sheet: false,
    source: "context_term",
    context: o.snippet,
    locations: [o.location as Location],
  }));
}
