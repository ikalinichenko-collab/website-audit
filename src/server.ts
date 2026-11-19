import * as fs from "node:fs";
import * as http from "node:http";
import path from "node:path";
import dotenv from "dotenv";
import { projectRoot } from "./utils.js";
import { loadSettings } from "./config.js";
import { collectSitemapUrls } from "./sitemap.js";
import { classifyUrl, filterInScope, geoTypeGroups, scopeGroups, subsectionKey } from "./scope.js";
import { ALL_LAYERS, type Layers } from "./types.js";
import { FINDING_STATUSES, type FindingStatus } from "./findings.js";
import {
  RESOURCES,
  ValidationError,
  findResource,
  listHistory,
  listResources,
  loadResources,
  readHistory,
  readResource,
  writeResource,
} from "./resources.js";
import { getJob, listJobs, markInterrupted, parseUrls, requestStop, runningJobId, startJob, type JobOptions } from "./jobs.js";
import { tryGeoQuestion } from "./geo-try.js";
import { migrate } from "./db.js";
import { rememberUser } from "./users.js";
import { authRequired, checkAuthConfig, currentUser, handleAuth, sameOrigin, type User } from "./auth.js";
import * as store from "./store.js";
import { deleteBrief, getBrief, saveBrief } from "./briefs.js";
import { checkAgainstBrief, getBriefCheck } from "./brief-check.js";
import { checksCsv, deleteCheck, getChecksIndex, getSpending, getTasks } from "./page-checks.js";

const ROOT = projectRoot();
dotenv.config({ path: path.join(ROOT, ".env") });

const PORT = Number(process.env.PORT ?? 8787);
// local only unless HOST says otherwise (a deployed server sets HOST=0.0.0.0 and sits behind sign-in)
const HOST = process.env.HOST ?? "127.0.0.1";
const VIEWER_DIST = path.join(ROOT, "viewer", "dist");
const MAX_BODY = 5 * 1024 * 1024;

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function send(res: http.ServerResponse, status: number, body: unknown): void {
  const text = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(text);
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new ValidationError("Request body is larger than 5 MB"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function readJson<T>(req: http.IncomingMessage): Promise<T> {
  const text = await readBody(req);
  try {
    return JSON.parse(text || "{}") as T;
  } catch {
    throw new ValidationError("Request body is not valid JSON");
  }
}

function serveFile(res: http.ServerResponse, file: string): boolean {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return false;
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
  return true;
}

function safeJoin(root: string, rel: string): string | null {
  const p = path.normalize(path.join(root, rel));
  return p === root || p.startsWith(root + path.sep) ? p : null;
}

async function handleApi(req: http.IncomingMessage, res: http.ServerResponse, url: URL, user: User): Promise<void> {
  const method = req.method ?? "GET";
  const parts = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);

  if (parts[0] === "me" && method === "GET") {
    send(res, 200, { email: user.email, name: user.email ? await rememberUser(user.email, user.name) : user.name, sign_in: authRequired() });
    return;
  }

  if (parts[0] === "state" && method === "GET") {
    const s = loadSettings();
    send(res, 200, {
      base_url: s.base_url,
      model: s.llm.model,
      models: s.llm.models.map((m) => ({ id: m.id, label: m.label, price_per_million_tokens: m.price_per_million_tokens })),
      has_api_key: Boolean(process.env.OPENAI_API_KEY),
      running_job: runningJobId(),
      latest_run: await store.latestRunId(),
    });
    return;
  }

  // ---- editable files ---------------------------------------------------------
  if (parts[0] === "resources") {
    if (parts.length === 1 && method === "GET") {
      send(res, 200, listResources());
      return;
    }
    const r = findResource(parts[1] ?? "");
    if (!r) {
      send(res, 404, { error: "Unknown resource" });
      return;
    }
    if (parts.length === 2 && method === "GET") {
      const meta = listResources().find((x) => x.id === r.id)!;
      send(res, 200, { ...meta, content: readResource(r) });
      return;
    }
    if (parts.length === 2 && method === "PUT") {
      const body = await readJson<{ content?: string }>(req);
      if (typeof body.content !== "string") throw new ValidationError("content is required");
      const before = readResource(r).length;
      const out = await writeResource(r, body.content, user.email);
      const warnings: string[] = [];
      if (r.group === "sources" && before > 0 && body.content.length < before * 0.5) {
        warnings.push("The new file is less than half the size of the old one. The previous version is kept in the version list.");
      }
      send(res, 200, { ...out, warnings, running_job: runningJobId() });
      return;
    }
    if (parts[2] === "history" && parts.length === 3 && method === "GET") {
      send(res, 200, await listHistory(r));
      return;
    }
    if (parts[2] === "history" && parts.length === 4 && method === "GET") {
      const content = await readHistory(r, parts[3]!);
      if (content === null) send(res, 404, { error: "Version not found" });
      else send(res, 200, { content });
      return;
    }
    if (parts[2] === "restore" && method === "POST") {
      const body = await readJson<{ ts?: string }>(req);
      const content = await readHistory(r, String(body.ts ?? ""));
      if (content === null) throw new ValidationError("Version not found");
      send(res, 200, await writeResource(r, content, user.email));
      return;
    }
  }

  // ---- audits -------------------------------------------------------------------
  if (parts[0] === "scope" && method === "GET") {
    const settings = loadSettings();
    const urls = filterInScope(await collectSitemapUrls(settings), settings);
    const by: Record<string, number> = {};
    for (const u of urls) {
      const s = classifyUrl(u, settings);
      if (s) by[subsectionKey(s)] = (by[subsectionKey(s)] ?? 0) + 1;
    }
    const groups = scopeGroups(settings).map((g) => ({
      category: g.category,
      subsections: g.subsections.map((s) => ({ ...s, count: by[s.key] ?? 0 })),
    }));
    send(res, 200, { total: urls.length, groups });
    return;
  }

  // which pages get which GEO page type (the legend of "Applies to" in the question editor)
  if (parts[0] === "geo-types" && parts.length === 1 && method === "GET") {
    send(res, 200, geoTypeGroups(loadSettings()));
    return;
  }

  if (parts[0] === "jobs") {
    if (parts.length === 1 && method === "GET") {
      send(res, 200, await listJobs());
      return;
    }
    if (parts.length === 1 && method === "POST") {
      const body = await readJson<{
        text?: string;
        all?: boolean;
        limit?: number;
        force?: boolean;
        noLlm?: boolean;
        /** read the pages from the copy kept in the latest snapshot */
        fromSnapshot?: boolean;
        /** the free whole-site check: whole scope, no LLM, Compliance off */
        siteScan?: boolean;
        /** ask the model about the shared blocks (banner and form variants, site-wide JSON-LD) of this snapshot */
        siteLlm?: { run_id?: string };
        subsections?: string[];
        layers?: Partial<Layers>;
        model?: string;
      }>(req);
      const settings = loadSettings();
      const layers: Layers = { ...ALL_LAYERS, ...(body.layers ?? {}) };
      if (body.siteLlm) {
        const runId = String(body.siteLlm.run_id ?? "");
        if (!/^[0-9TZ-]+$/.test(runId)) throw new ValidationError("Bad run id");
        const model = body.model || settings.llm.model;
        if (!settings.llm.models.some((m) => m.id === model)) throw new ValidationError(`Unknown model "${model}"`);
        if (!process.env.OPENAI_API_KEY) throw new ValidationError("OPENAI_API_KEY is not set in .env");
        if (!(await store.isSnapshot(runId))) throw new ValidationError("That run is not a site snapshot");
        if (runningJobId()) {
          send(res, 409, { error: "Another audit is already running" });
          return;
        }
        const job = await startJob({ urls: [], kind: "site_llm", runId, model }, user.email);
        send(res, 202, { id: job.id, rejected: [] });
        return;
      }
      const siteScan = body.siteScan === true;
      // the free whole-site check: the whole scope, no model, Compliance off; it makes a site snapshot
      const common = siteScan
        ? { layers: { compliance: false, geo: true, seo: true }, model: settings.llm.model, noLlm: true }
        : { layers, model: body.model || settings.llm.model, force: body.force, noLlm: body.noLlm, fromSnapshot: body.fromSnapshot === true };
      if (!settings.llm.models.some((m) => m.id === common.model)) throw new ValidationError(`Unknown model "${common.model}"`);
      if (!layers.compliance && !layers.geo && !layers.seo) throw new ValidationError("Turn on at least one layer");
      let options: JobOptions;
      let rejected: string[] = [];
      if (!siteScan && body.subsections?.length) {
        const known = new Set(scopeGroups(settings).flatMap((g) => g.subsections.map((s) => s.key)));
        const bad = body.subsections.filter((k) => !known.has(k));
        if (bad.length) throw new ValidationError(`Unknown subsection: ${bad.join(", ")}`);
        const limit = body.limit ? Math.max(1, Math.min(500, Number(body.limit))) : undefined;
        options = { ...common, urls: [], subsections: body.subsections, limit };
      } else if (body.all || siteScan) {
        options = { ...common, urls: [], all: true };
      } else if (body.limit) {
        options = { ...common, urls: [], limit: Math.max(1, Math.min(500, Number(body.limit))) };
      } else {
        const parsed = parseUrls(String(body.text ?? ""));
        rejected = parsed.rejected;
        if (!parsed.urls.length) throw new ValidationError(rejected.length ? `No valid URLs. Not accepted: ${rejected.join(", ")}` : "Enter at least one URL");
        if (parsed.urls.length > 500) throw new ValidationError("At most 500 URLs at a time");
        options = { ...common, urls: parsed.urls };
      }
      if (!options.noLlm && (layers.compliance || layers.geo) && !process.env.OPENAI_API_KEY) {
        throw new ValidationError("OPENAI_API_KEY is not set in .env. Turn off Compliance and GEO, or add the key.");
      }
      if (runningJobId()) {
        send(res, 409, { error: "Another audit is already running" });
        return;
      }
      const job = await startJob(options, user.email);
      send(res, 202, { id: job.id, rejected });
      return;
    }
    const job = await getJob(parts[1] ?? "");
    if (!job) {
      send(res, 404, { error: "Unknown job" });
      return;
    }
    if (parts.length === 2 && method === "GET") {
      const from = Math.max(0, Number(url.searchParams.get("from") ?? 0));
      const { log, ...rest } = job;
      send(res, 200, { ...rest, log: log.slice(from), log_total: log.length });
      return;
    }
    if (parts[2] === "stop" && method === "POST") {
      send(res, 200, { stopped: await requestStop(job.id) });
      return;
    }
  }

  // ---- try one GEO question on one page (one model call, nothing is saved) --------
  if (parts[0] === "geo-try" && parts.length === 1 && method === "POST") {
    const body = await readJson<{ url?: string; question?: string; id?: string; model?: string }>(req);
    const { urls } = parseUrls(String(body.url ?? ""));
    if (urls.length !== 1) throw new ValidationError("Give one page address on the site");
    if (!process.env.OPENAI_API_KEY) throw new ValidationError("OPENAI_API_KEY is not set");
    try {
      send(res, 200, await tryGeoQuestion({ url: urls[0]!, question: String(body.question ?? ""), id: body.id, model: body.model }));
    } catch (e) {
      throw new ValidationError(e instanceof Error ? e.message : String(e));
    }
    return;
  }

  // ---- decisions about findings: accepted, false positive, fixed (status null clears it) ----
  if (parts[0] === "findings" && parts[1] === "status" && parts.length === 2 && method === "POST") {
    const body = await readJson<{ run_id?: string; slug?: string | null; fids?: string[]; status?: string | null; note?: string }>(req);
    // a page of a snapshot has a run id; a checked page has none (its slug is enough)
    const runId = body.run_id ? String(body.run_id) : null;
    if (runId !== null && !/^[0-9TZ-]+$/.test(runId)) throw new ValidationError("Bad run id");
    if (runId === null && !body.slug) throw new ValidationError("run_id or slug is required");
    if (!Array.isArray(body.fids) || !body.fids.length || body.fids.some((x) => typeof x !== "string")) throw new ValidationError("fids is required");
    const status = body.status ?? null;
    if (status !== null && !FINDING_STATUSES.includes(status as FindingStatus)) throw new ValidationError("status must be accepted, false_positive, fixed or null");
    try {
      const n = await store.setFindingStatus(runId, body.slug ? String(body.slug) : null, body.fids, status as FindingStatus | null, String(body.note ?? "").slice(0, 500), user.email);
      send(res, 200, { updated: n });
    } catch (e) {
      throw new ValidationError(e instanceof Error ? e.message : String(e));
    }
    return;
  }

  // ---- the brief of a page: one CSV per page, versions kept ----------------------------------
  if (parts[0] === "briefs" && parts[1] && /^[A-Za-z0-9._~-]+$/.test(parts[1]) && parts.length === 2) {
    const slug = parts[1];
    if (method === "GET") {
      const v = url.searchParams.get("version");
      if (v !== null && !/^\d+$/.test(v)) throw new ValidationError("Bad version");
      send(res, 200, await getBrief(slug, v === null ? undefined : Number(v)));
      return;
    }
    if (method === "PUT") {
      const body = await readJson<{ url?: string; filename?: string; content?: string }>(req);
      if (typeof body.content !== "string" || !body.content.trim()) throw new ValidationError("The file is empty");
      if (typeof body.url !== "string" || !/^https?:\/\//.test(body.url)) throw new ValidationError("The page address is required");
      try {
        send(res, 200, await saveBrief(slug, body.url, String(body.filename ?? "brief.csv"), body.content, user.email));
      } catch (e) {
        throw new ValidationError(e instanceof Error ? e.message : String(e));
      }
      return;
    }
    if (method === "DELETE") {
      if (!(await deleteBrief(slug))) send(res, 404, { error: "Not found" });
      else send(res, 200, { deleted: slug });
      return;
    }
  }

  // the check of a page against its brief: the stored result (GET) and a new check (POST, one model call)
  if (parts[0] === "briefs" && parts[1] && /^[A-Za-z0-9._~-]+$/.test(parts[1]) && parts.length === 3 && parts[2] === "check") {
    const slug = parts[1];
    const runOf = (v: unknown): string | null => {
      if (v === undefined || v === null || v === "") return null;
      if (typeof v !== "string" || !/^[0-9TZ-]+$/.test(v)) throw new ValidationError("Bad run id");
      return v;
    };
    if (method === "GET") {
      send(res, 200, await getBriefCheck(slug, runOf(url.searchParams.get("run"))));
      return;
    }
    if (method === "POST") {
      const body = await readJson<{ run_id?: string; model?: string; force?: boolean }>(req);
      try {
        send(res, 200, await checkAgainstBrief(slug, runOf(body.run_id), { ...(body.model ? { model: String(body.model) } : {}), force: body.force === true, by: user.email }));
      } catch (e) {
        throw new ValidationError(e instanceof Error ? e.message : String(e));
      }
      return;
    }
  }

  // ---- runs (read from the database; files are built when asked for) -----------------------
  // ---- checked pages: the current check of each page, no runs ---------------------------
  // the audit of the newest snapshots side by side: the trends on Site Checks
  if (parts[0] === "site-trends" && method === "GET" && parts.length === 1) {
    send(res, 200, await store.getSiteTrends());
    return;
  }
  // every finding of every checked page with its decision: the Tasks screen
  if (parts[0] === "tasks" && method === "GET" && parts.length === 1) {
    send(res, 200, await getTasks(user.email));
    return;
  }
  if (parts[0] === "checks") {
    if (method === "GET" && parts.length === 1) {
      send(res, 200, await getChecksIndex(user.email));
      return;
    }
    if (method === "GET" && parts.length === 2 && parts[1] === "spending") {
      send(res, 200, await getSpending());
      return;
    }
    if (method === "GET" && parts.length === 2 && (parts[1] === "findings.csv" || parts[1] === "summary.csv")) {
      const body = await checksCsv(parts[1] === "findings.csv" ? "findings" : "summary");
      res.writeHead(200, { "Content-Type": TYPES[".csv"]!, "Cache-Control": "no-store", "Content-Disposition": `attachment; filename="checked-pages-${parts[1]}"` });
      res.end(body);
      return;
    }
    const slug = parts[1];
    if (slug && /^[A-Za-z0-9._~-]+$/.test(slug)) {
      const one = (v: unknown): void => {
        if (v === null) send(res, 404, { error: "Not found" });
        else send(res, 200, v);
      };
      if (method === "GET" && parts.length === 2) return one(await store.getPage(null, slug));
      if (method === "GET" && parts.length === 3 && parts[2] === "findings") return one(await store.getPageFindings(null, slug));
      if (method === "GET" && parts.length === 3 && parts[2] === "shared") return one(await store.getPageShared(null, slug));
      if (method === "GET" && parts.length === 3 && parts[2] === "site-check") return one(await store.getSiteCheck(null, slug));
      if (method === "DELETE" && parts.length === 2) {
        if (!(await deleteCheck(slug))) send(res, 404, { error: "Not found" });
        else send(res, 200, { deleted: slug });
        return;
      }
    }
    send(res, 404, { error: "Not found" });
    return;
  }

  if (parts[0] === "runs") {
    if (parts.length === 1 && method === "GET") {
      send(res, 200, await store.listRuns());
      return;
    }
    const id = parts[1] ?? "";
    if (!/^[0-9TZ-]+$/.test(id)) throw new ValidationError("Bad run id");
    if (parts.length === 2 && method === "DELETE") {
      if (runningJobId()) throw new ValidationError("An audit is running; wait until it finishes");
      if (!(await store.deleteRun(id))) {
        send(res, 404, { error: "Run not found" });
        return;
      }
      send(res, 200, { deleted: id });
      return;
    }
    if (method === "GET") {
      const what = parts[2];
      const json = (v: unknown): void => {
        if (v === null) send(res, 404, { error: "Not found" });
        else send(res, 200, v);
      };
      const text = (body: string | null, type: string, filename?: string): void => {
        if (body === null) {
          send(res, 404, { error: "Not found" });
          return;
        }
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store", ...(filename ? { "Content-Disposition": `attachment; filename="${filename}"` } : {}) });
        res.end(body);
      };
      if (parts.length === 3 && what === "run") return json(await store.getRunMeta(id));
      if (parts.length === 3 && what === "index") return json(await store.getRunIndex(id));
      if (parts.length === 3 && what === "site") return json(await store.getSite(id));
      if (parts.length === 3 && what === "site-findings") return json(await store.getSiteFindings(id));
      if (parts.length === 3 && what === "site-audit") return json(await store.getSiteAudit(id));
      if (parts.length === 3 && (what === "audit.csv" || what === "audit-checks.csv")) {
        // the same filters the audit table has; a check id and a page type are names, nothing else
        const pick = (k: string, ok: RegExp): string | undefined => {
          const v = url.searchParams.get(k);
          if (v === null || v === "") return undefined;
          if (!ok.test(v)) throw new ValidationError(`Bad ${k}`);
          return v;
        };
        const filter = { check: pick("check", /^[a-z0-9_]+$/), severity: pick("severity", /^(high|medium|low)$/), layer: pick("layer", /^(seo|geo)$/), profile: pick("profile", /^[a-z0-9_]+$/) };
        const stamp = id.replace(/[^0-9T-]/g, "").slice(0, 16);
        const name = `${what === "audit.csv" ? "site-audit" : "site-audit-checks"}${filter.check ? `-${filter.check}` : ""}-${stamp}.csv`;
        return text(what === "audit.csv" ? await store.auditCsv(id, filter) : await store.auditChecksCsv(id, filter), TYPES[".csv"]!, name);
      }
      if (parts.length === 3 && what === "site-sources") return json(await store.getSiteSources(id));
      if (parts.length === 4 && what === "pages" && !parts[3]!.endsWith(".md")) return json(await store.getPage(id, parts[3]!));
      if (parts.length === 5 && what === "pages" && parts[4] === "site-check") return json(await store.getSiteCheck(id, parts[3]!));
      if (parts.length === 5 && what === "pages" && parts[4] === "shared") return json(await store.getPageShared(id, parts[3]!));
      if (parts.length === 5 && what === "pages" && parts[4] === "findings") return json(await store.getPageFindings(id, parts[3]!));
      if (parts.length === 3 && what === "findings.csv") return text(await store.findingsCsv(id), TYPES[".csv"]!);
      if (parts.length === 3 && what === "summary.csv") return text(await store.summaryCsv(id), TYPES[".csv"]!);
      if (parts.length === 3 && what === "site.md") return text(await store.siteMarkdown(id), TYPES[".md"]!);
      if (parts.length === 4 && what === "pages" && parts[3]!.endsWith(".md")) {
        return text(await store.pageMarkdown(id, parts[3]!.slice(0, -3)), TYPES[".md"]!);
      }
    }
  }

  send(res, 404, { error: "Not found" });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${HOST}:${PORT}`);
  handleRequest(req, res, url).catch((e) => {
    console.error(e);
    if (!res.headersSent) send(res, 500, { error: "Server error" });
  });
});

async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse, url: URL): Promise<void> {
  if (await handleAuth(req, res, url)) return;
  const user = currentUser(req);
  if (!user) {
    if (url.pathname.startsWith("/api/")) send(res, 401, { error: "Sign in required" });
    else {
      res.writeHead(302, { Location: `/auth/login?next=${encodeURIComponent(url.pathname)}`, "Cache-Control": "no-store" });
      res.end();
    }
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    if (req.method !== "GET" && req.method !== "HEAD" && !sameOrigin(req)) {
      send(res, 403, { error: "Request from another site" });
      return;
    }
    if (user.email) await rememberUser(user.email, user.name);
    handleApi(req, res, url, user).catch((e) => {
      if (e instanceof ValidationError) send(res, 400, { error: e.message });
      else {
        console.error(e);
        send(res, 500, { error: e instanceof Error ? e.message : String(e) });
      }
    });
    return;
  }
  const rel = decodeURIComponent(url.pathname === "/" ? "index.html" : url.pathname.slice(1));
  const file = safeJoin(VIEWER_DIST, rel);
  if (file && serveFile(res, file)) return;
  if (!serveFile(res, path.join(VIEWER_DIST, "index.html"))) {
    res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("The viewer is not built. Run: pnpm app");
  }
}

async function start(): Promise<void> {
  checkAuthConfig(HOST);
  const applied = await migrate();
  if (applied.length) console.log(`Database migrations applied: ${applied.join(", ")}`);
  await loadResources();
  await markInterrupted();
  const cleaned = await store.pruneSnapshots();
  if (cleaned) console.log(`Old snapshots cleaned (stored pages removed, reports kept): ${cleaned}`);
  server.listen(PORT, HOST, () => {
    console.log(`Audit app: http://${HOST}:${PORT}  (${RESOURCES.length} editable files, results in the database)`);
  });
}

start().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
