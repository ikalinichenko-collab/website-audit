import type { PageZones, Settings, Zone, ZonePart } from "./types.js";
import { buildZones } from "./zones.js";

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "section"
  );
}

function zone(id: string, kind: Zone["kind"], label: string, parts: ZonePart[]): Zone {
  const counters: Record<string, number> = {};
  const indexed = parts.map((p) => {
    counters[p.type] = (counters[p.type] ?? 0) + 1;
    return { ...p, index: counters[p.type]! };
  });
  return { id, kind, label, scope: "page", skipped: false, text: indexed.map((p) => p.text).join("\n"), parts: indexed };
}

/** Zones of a markdown or plain-text draft: the first `#` is the H1, every `##` starts an article section. */
function markdownZones(raw: string): PageZones {
  const lines = raw.split(/\r?\n/);
  let h1 = "";
  const sections: { title: string | null; parts: ZonePart[] }[] = [{ title: null, parts: [] }];
  let para: string[] = [];
  const cur = () => sections[sections.length - 1]!;
  const flush = () => {
    const t = para.join(" ").replace(/\s+/g, " ").trim();
    if (t) cur().parts.push({ type: "paragraph", index: 0, text: t });
    para = [];
  };
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flush();
      const level = h[1]!.length;
      const text = h[2]!.replace(/\s+/g, " ").trim();
      if (level === 1 && !h1) {
        h1 = text;
      } else if (level === 2) {
        sections.push({ title: text, parts: [{ type: "heading", index: 0, text, level: 2 }] });
      } else {
        cur().parts.push({ type: "heading", index: 0, text, level });
      }
      continue;
    }
    const li = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.*)$/);
    if (li) {
      flush();
      cur().parts.push({ type: "list_item", index: 0, text: li[1]!.trim() });
      continue;
    }
    if (!line.trim()) flush();
    else para.push(line.trim());
  }
  flush();
  if (!h1) {
    const first = lines.find((l) => l.trim());
    h1 = (first ?? "").replace(/^#+\s*/, "").trim();
  }

  const zones: Zone[] = [zone("h1", "h1", "H1", h1 ? [{ type: "field", index: 0, text: h1 }] : [])];
  const used = new Set<string>();
  for (const s of sections) {
    if (!s.parts.length) continue;
    let id = "article:intro";
    let label = "Intro";
    if (s.title !== null) {
      let k = slug(s.title);
      let n = 2;
      while (used.has(k)) k = `${slug(s.title)}-${n++}`;
      used.add(k);
      id = `article:${k}`;
      label = s.title.length > 70 ? `${s.title.slice(0, 69)}…` : s.title;
    }
    zones.push(zone(id, "article_section", label, s.parts));
  }
  return { template: "article", zones, warnings: [] };
}

export function draftZones(raw: string, ext: string, settings: Settings): PageZones {
  if (ext === ".html" || ext === ".htm") return buildZones(raw, "draft://local", settings, []);
  return markdownZones(raw);
}
