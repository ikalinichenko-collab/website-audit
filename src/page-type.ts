import type { Settings } from "./types.js";

export function resolvePageType(url: string, settings: Settings): string {
  let pathname: string;
  try {
    pathname = new URL(url).pathname;
    if (!pathname.endsWith("/") && pathname !== "/") pathname = `${pathname}/`;
    pathname = pathname.toLowerCase();
  } catch {
    return "other";
  }
  for (const rule of settings.page_types) {
    if (rule.default) continue;
    if (rule.path_equals !== undefined && pathname === rule.path_equals.toLowerCase()) {
      return rule.type;
    }
    if (rule.path_starts_with) {
      for (const prefix of rule.path_starts_with) {
        if (pathname.startsWith(prefix.toLowerCase())) return rule.type;
      }
    }
  }
  for (const rule of settings.page_types) {
    if (rule.default) return rule.type;
  }
  return "other";
}
