import { db } from "./db.js";
import { shownName } from "./users.js";

/** Content briefs of pages (table `page_briefs`, migration 011): one CSV per page, a new upload is a new version. */

const MAX_VERSIONS = 20;

export interface BriefVersion {
  id: number;
  filename: string;
  uploaded_at: string;
  uploaded_by: string | null;
  row_count: number;
}

export interface Brief extends BriefVersion {
  url: string;
  /** one array of cells per CSV row; the row number is the index + 1 */
  rows: string[][];
}

export interface BriefInfo {
  /** the version asked for, else the newest */
  current: Brief | null;
  /** all versions, newest first */
  versions: BriefVersion[];
}

/** RFC 4180: quoted cells may hold commas, quotes ("") and line breaks. A leading BOM is dropped. */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i]!;
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += c;
    } else if (c === '"' && cell === "") quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      rows.push(row);
      row = [];
    } else cell += c;
  }
  if (quoted) throw new Error("The CSV has an unclosed quote");
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  // the trailing empty cells of each row carry nothing (the sheet is wider than the brief)
  return rows.map((r) => {
    let n = r.length;
    while (n > 0 && r[n - 1]!.trim() === "") n--;
    return r.slice(0, n);
  });
}

/** The path of an address, with the final slash dropped, for finding a page in its brief. */
function pathOf(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return url;
  }
}

/** A soft warning, never a block: the page path is nowhere in the brief, so the file may be for another page. */
export function mismatchWarning(rows: string[][], url: string): string | null {
  const p = pathOf(url);
  if (p === "/") return null;
  const all = rows.flat().join("\n");
  return all.includes(p) ? null : `The path ${p} is not found in this brief. Check that the file is the brief of this page.`;
}

/** Stores a brief as a new version. The cells are what was parsed; the text is kept as uploaded. */
export async function saveBrief(slug: string, url: string, filename: string, content: string, by: string | null): Promise<{ id: number; rows: number; warning: string | null }> {
  const rows = parseCsv(content);
  if (!rows.some((r) => r.length)) throw new Error("The file has no rows");
  const name = filename.replace(/[\\/]/g, "_").slice(0, 200) || "brief.csv";
  const r = await db().query<{ id: string }>(
    "INSERT INTO page_briefs (slug, url, filename, content, rows, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [slug, url, name, content, JSON.stringify(rows), by],
  );
  await db().query("DELETE FROM page_briefs WHERE slug = $1 AND id NOT IN (SELECT id FROM page_briefs WHERE slug = $1 ORDER BY id DESC LIMIT $2)", [slug, MAX_VERSIONS]);
  return { id: Number(r.rows[0]!.id), rows: rows.length, warning: mismatchWarning(rows, url) };
}

/** The versions of a page's brief and one of them in full (the newest unless `version` is given). */
export async function getBrief(slug: string, version?: number): Promise<BriefInfo> {
  const vs = await db().query<{ id: string; filename: string; uploaded_at: Date; uploaded_by: string | null; row_count: number }>(
    `SELECT id, filename, uploaded_at, CASE WHEN uploaded_by IS NULL THEN NULL ELSE ${shownName("uploaded_by")} END AS uploaded_by, jsonb_array_length(rows) AS row_count FROM page_briefs WHERE slug = $1 ORDER BY id DESC`,
    [slug],
  );
  const versions: BriefVersion[] = vs.rows.map((v) => ({ id: Number(v.id), filename: v.filename, uploaded_at: v.uploaded_at.toISOString(), uploaded_by: v.uploaded_by, row_count: v.row_count }));
  const pick = version === undefined ? versions[0] : versions.find((v) => v.id === version);
  if (!pick) return { current: null, versions };
  const full = await db().query<{ url: string; rows: string[][] }>("SELECT url, rows FROM page_briefs WHERE id = $1", [pick.id]);
  return { current: { ...pick, url: full.rows[0]!.url, rows: full.rows[0]!.rows }, versions };
}

/** Removes the brief of a page with all its versions. */
export async function deleteBrief(slug: string): Promise<boolean> {
  return ((await db().query("DELETE FROM page_briefs WHERE slug = $1", [slug])).rowCount ?? 0) > 0;
}

/** The slugs that have a brief, for lists. */
export async function briefSlugs(): Promise<Set<string>> {
  return new Set((await db().query<{ slug: string }>("SELECT DISTINCT slug FROM page_briefs")).rows.map((r) => r.slug));
}
