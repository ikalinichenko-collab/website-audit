import type { AuditConfig } from "./types.js";

export function resolvePageType(url: string, config: AuditConfig): string {
  let pathname: string;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return "other";
  }
  for (const rule of config.page_types.rules) {
    if (rule.default) continue;
    if (rule.path_equals !== undefined && pathname === rule.path_equals) {
      return rule.type;
    }
    if (rule.path_starts_with) {
      for (const prefix of rule.path_starts_with) {
        if (pathname.startsWith(prefix)) return rule.type;
      }
    }
  }
  for (const rule of config.page_types.rules) {
    if (rule.default) return rule.type;
  }
  return "other";
}
