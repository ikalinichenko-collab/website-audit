import type { ScopeRule, Settings } from "./types.js";

export interface UrlScope {
  category: string;
  subsection: string;
  profile: string;
}

function pathOf(url: string): string | null {
  try {
    let p = new URL(url).pathname.toLowerCase();
    if (!p.endsWith("/")) p += "/";
    return p;
  } catch {
    return null;
  }
}

function matches(rule: ScopeRule, p: string): boolean {
  if (rule.exclude_path_equals?.some((x) => x.toLowerCase() === p)) return false;
  if (rule.path_equals !== undefined && p === rule.path_equals.toLowerCase()) return true;
  return (rule.path_starts_with ?? []).some((pre) => p.startsWith(pre.toLowerCase()));
}

/** Category, subsection and profile of a URL, or null when it is outside the audited scope. */
export function classifyUrl(url: string, settings: Settings): UrlScope | null {
  const p = pathOf(url);
  if (p === null) return null;
  for (const rule of settings.scope) {
    if (matches(rule, p)) {
      return { category: rule.category, subsection: rule.subsection, profile: rule.profile };
    }
  }
  return null;
}

export function filterInScope(urls: string[], settings: Settings): string[] {
  return urls.filter((u) => classifyUrl(u, settings) !== null);
}

/** Key of a subsection in run options and counts: "Category/Subsection". */
export function subsectionKey(s: { category: string; subsection: string }): string {
  return `${s.category}/${s.subsection}`;
}

/** The scope as category groups with their subsections, in settings order. */
export function scopeGroups(settings: Settings): { category: string; subsections: { key: string; name: string }[] }[] {
  const groups: { category: string; subsections: { key: string; name: string }[] }[] = [];
  for (const r of settings.scope) {
    let g = groups.find((x) => x.category === r.category);
    if (!g) groups.push((g = { category: r.category, subsections: [] }));
    const key = subsectionKey(r);
    if (!g.subsections.some((s) => s.key === key)) g.subsections.push({ key, name: r.subsection });
  }
  return groups;
}

/** Only the URLs whose subsection is in `keys`. */
export function filterBySubsections(urls: string[], keys: string[], settings: Settings): string[] {
  const want = new Set(keys);
  return urls.filter((u) => {
    const s = classifyUrl(u, settings);
    return s !== null && want.has(subsectionKey(s));
  });
}

/** Scope used for a URL given by hand that matches no rule: no schema, author or date requirements. */
export const OUT_OF_SCOPE: UrlScope = { category: "Other", subsection: "Other", profile: "legal" };

/** Up to `limit` URLs spread over the subsections, one per subsection per round. */
export function sampleAcrossSubsections(urls: string[], limit: number, settings: Settings): string[] {
  const bySub = new Map<string, string[]>();
  for (const u of urls) {
    const s = classifyUrl(u, settings);
    if (!s) continue;
    const key = subsectionKey(s);
    bySub.set(key, [...(bySub.get(key) ?? []), u]);
  }
  const keys = [...bySub.keys()];
  const picked: string[] = [];
  for (let round = 0; picked.length < limit; round++) {
    let added = false;
    for (const k of keys) {
      if (picked.length >= limit) break;
      const list = bySub.get(k)!;
      if (round < list.length) {
        picked.push(list[round]!);
        added = true;
      }
    }
    if (!added) break;
  }
  return picked;
}
