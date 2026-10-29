import type { AuditConfig } from "./types.js";
import { resolvePageType } from "./page-type.js";

/** Round-robin sample up to `limit` URLs across page types. */
export function sampleUrlsRoundRobin(
  urls: string[],
  limit: number,
  config: AuditConfig,
): string[] {
  const buckets = new Map<string, string[]>();
  for (const u of urls) {
    const pt = resolvePageType(u, config);
    if (!buckets.has(pt)) buckets.set(pt, []);
    buckets.get(pt)!.push(u);
  }
  const keys = [...buckets.keys()];
  const out: string[] = [];
  const idx = new Map<string, number>(keys.map((k) => [k, 0]));

  while (out.length < limit) {
    let progressed = false;
    for (const k of keys) {
      if (out.length >= limit) break;
      const i = idx.get(k)!;
      const list = buckets.get(k)!;
      if (i < list.length) {
        out.push(list[i]!);
        idx.set(k, i + 1);
        progressed = true;
      }
    }
    if (!progressed) break;
  }
  return out;
}
