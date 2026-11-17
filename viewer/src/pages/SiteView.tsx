import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { buttonClass } from "../components/ResourceEditor.js";
import { useRunContext } from "../context/RunContext.js";
import { getRun, getSite, getSiteAudit, getSiteFindings, getSiteSources } from "../data.js";
import type { Finding, RunListEntry, RunMeta, SiteAudit, SiteReport, SiteSources, SitemapRow } from "../types.js";
import { runLabel } from "../utils.js";
import { FindingList } from "../components/FindingList.js";
import { FindingActionsContext } from "../components/FindingActions.js";
import { SchemaNodeCard, VariantCard, findingsInNode } from "../components/SourceCards.js";
import { AuditGroups, AuditSummary, Hint, TemplateIssues } from "../components/SiteAuditPanel.js";

function Section({ id, title, hint, children }: { id: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Hint text={hint} />
      {children}
    </section>
  );
}

const short = (u: string) => u.replace(/^https:\/\/[^/]+/, "") || "/";

/** A snapshot older than this gets a warning: the site has probably changed since. */
const STALE_DAYS = 14;

/**
 * The snapshot of the whole site this page shows, and the two actions on it: make a new one (free, no model) and ask the model
 * about its shared blocks (banner and form variants, site-wide JSON-LD).
 */
function SnapshotBar({
  snapshots,
  snapshot,
  meta,
  onPick,
  onChanged,
}: {
  snapshots: RunListEntry[];
  snapshot: RunListEntry | undefined;
  meta: RunMeta | null;
  onPick: (id: string) => void;
  onChanged: (runId: string) => void;
}) {
  const { reload } = useRunContext();
  const [jobId, setJobId] = useState<string | null>(null);
  const [what, setWhat] = useState<"scan" | "llm">("scan");
  const [line, setLine] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    api
      .state()
      .then((s) => {
        if (s.running_job) setBusy(true);
        setHasKey(s.has_api_key);
      })
      .catch(() => undefined);
  }, []);

  const start = useCallback(async (kind: "scan" | "llm", body: Parameters<typeof api.startJob>[0]) => {
    setError(null);
    try {
      const r = await api.startJob(body);
      setWhat(kind);
      setJobId(r.id);
      setBusy(true);
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  }, []);

  useEffect(() => {
    if (!jobId) return;
    const t = setInterval(async () => {
      try {
        const j = await api.job(jobId, 0);
        setLine(j.log[j.log.length - 1] ?? "");
        if (j.status !== "running") {
          clearInterval(t);
          setJobId(null);
          setBusy(false);
          if (j.run_id) {
            await reload();
            onChanged(j.run_id);
          }
          if (j.error) setError(j.error);
        }
      } catch {
        /* server restarted */
      }
    }, 1500);
    return () => clearInterval(t);
  }, [jobId, reload, onChanged]);

  const ageDays = snapshot ? (Date.now() - new Date(snapshot.started_at).getTime()) / 86_400_000 : 0;
  const stop = jobId ? (
    <button type="button" className={buttonClass} onClick={() => void api.stopJob(jobId)}>
      Stop
    </button>
  ) : null;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={buttonClass} disabled={busy} onClick={() => void start("scan", { siteScan: true })}>
          {jobId && what === "scan" ? "Checking the site..." : "Check the whole site (no LLM)"}
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={busy || !snapshot || !hasKey}
          title={hasKey ? "One or two model calls on the banner and form texts and the site-wide JSON-LD. An unchanged text is not asked again." : "OPENAI_API_KEY is not set in .env"}
          onClick={() => snapshot && void start("llm", { siteLlm: { run_id: snapshot.id } })}
        >
          {jobId && what === "llm" ? "Asking the model..." : "Check shared blocks with the model"}
        </button>
        {stop}
        <span className="text-slate-500">{line || "The whole-site check fetches every page in scope and checks SEO and GEO code rules. It is free: no model calls."}</span>
        {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      </div>
      {snapshot ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-400">
          <span>
            Snapshot of the site:{" "}
            {snapshots.length > 1 ? (
              <select
                className="rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
                value={snapshot.id}
                onChange={(e) => onPick(e.target.value)}
              >
                {snapshots.map((s) => (
                  <option key={s.id} value={s.id}>
                    {runLabel(s).replace(" (site snapshot)", "")} ({s.pages_checked} pages)
                  </option>
                ))}
              </select>
            ) : (
              <b>
                {runLabel(snapshot).replace(" (site snapshot)", "")} ({snapshot.pages_checked} pages)
              </b>
            )}
            . Page runs read the latest one.
          </span>
          {snapshot.id === snapshots[0]?.id && ageDays > STALE_DAYS && (
            <span className="text-amber-600 dark:text-amber-400">{Math.floor(ageDays)} days old: the site has probably changed, check it again.</span>
          )}
          <span>
            {meta?.site_llm
              ? `Shared blocks checked by the model (${meta.site_llm.model}, ${new Date(meta.site_llm.at).toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" })}).`
              : "Shared blocks are not checked by the model yet."}
          </span>
        </div>
      ) : (
        <p className="text-slate-600 dark:text-slate-400">There is no snapshot of the site yet. Run the whole-site check: page runs and this page read it.</p>
      )}
    </div>
  );
}

type MapFilter = "all" | "in_scope" | "out_of_scope" | "not_fetched" | "problems";

/** Every sitemap URL: what the scope covers, what this run fetched and what is not known yet. */
function SitemapTable({ site }: { site: SiteReport }) {
  const rows = site.sitemap ?? [];
  const [filter, setFilter] = useState<MapFilter>("in_scope");
  if (!rows.length) return <p className="text-sm text-slate-500">This run has no sitemap list. Run the site check to get it.</p>;

  const problems = new Map(site.seo.sitemap_hygiene.map((h) => [h.url.replace(/\/$/, ""), h.problem]));
  const problemOf = (r: SitemapRow) => problems.get(r.url.replace(/\/$/, "")) ?? (r.in_run && r.status != null && r.status >= 400 ? `HTTP ${r.status}` : "");
  const inScope = rows.filter((r) => r.scope && !r.excluded);
  const fetched = inScope.filter((r) => r.in_run).length;
  const neverFetched = inScope.filter((r) => !r.in_run && !r.last_fetched).length;
  const shown = rows.filter((r) => {
    if (filter === "in_scope") return r.scope && !r.excluded;
    if (filter === "out_of_scope") return !r.scope || r.excluded;
    if (filter === "not_fetched") return r.scope && !r.excluded && !r.in_run;
    if (filter === "problems") return !!problemOf(r);
    return true;
  });
  const when = (t: string | null) => (t ? new Date(t).toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) : "never");
  const th = "px-2 py-1 text-left font-medium";

  return (
    <div className="space-y-2 text-sm">
      <p>
        <b>{rows.length}</b> URLs in the sitemap, <b>{inScope.length}</b> in scope. This run fetched{" "}
        <b>
          {fetched} of {inScope.length}
        </b>{" "}
        in-scope URLs
        {fetched < inScope.length ? ` (${neverFetched} never fetched; site checks such as duplicates are only as complete as the fetched pages and the site map)` : ""}.{" "}
        {rows.length - inScope.length} are outside the scope or excluded by URL patterns and are not audited.
      </p>
      <label className="flex items-center gap-2">
        Show
        <select className="rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900" value={filter} onChange={(e) => setFilter(e.target.value as MapFilter)}>
          <option value="in_scope">in scope</option>
          <option value="not_fetched">in scope, not fetched in this run</option>
          <option value="problems">with a problem</option>
          <option value="out_of_scope">outside the scope</option>
          <option value="all">all</option>
        </select>
        <span className="text-slate-500">{shown.length} rows</span>
      </label>
      <div className="max-h-96 overflow-auto rounded border border-slate-200 dark:border-slate-700">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className={th}>URL</th>
              <th className={th}>Sitemap file</th>
              <th className={th}>Scope</th>
              <th className={th}>This run</th>
              <th className={th} title="Other in-scope pages that link to it from their content">Inbound</th>
              <th className={th}>Last fetched</th>
              <th className={th}>Problem</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.url} className="border-t border-slate-200 dark:border-slate-700">
                <td className="px-2 py-1">
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                    {short(r.url)}
                  </a>
                </td>
                <td className="px-2 py-1 text-slate-500">{r.sitemap.replace(/^\//, "")}</td>
                <td className="px-2 py-1">{r.excluded ? "excluded by pattern" : (r.scope ?? "outside scope")}</td>
                <td className="px-2 py-1">{r.in_run ? `fetched${r.status ? ` (${r.status})` : ""}` : "-"}</td>
                <td className="px-2 py-1 tabular-nums">{r.scope && !r.excluded && r.inbound != null ? r.inbound : "-"}</td>
                <td className="px-2 py-1 tabular-nums">{when(r.last_fetched)}</td>
                <td className="px-2 py-1 text-red-600 dark:text-red-400">{problemOf(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** The Site page shows a snapshot of the whole site, whichever run is open elsewhere: the latest one unless another is picked. */
export function SiteView() {
  const { runs, loading } = useRunContext();
  const snapshots = runs.filter((r) => r.kind === "site" && r.status === "done");
  const [picked, setPicked] = useState<string | null>(null);
  const snapshot = snapshots.find((r) => r.id === picked) ?? snapshots[0];
  const runId = snapshot?.id ?? "";
  // bumped when the snapshot was changed under the same id (the model checked its shared blocks)
  const [version, setVersion] = useState(0);
  const [site, setSite] = useState<SiteReport | null>(null);
  const [meta, setMeta] = useState<RunMeta | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [sources, setSources] = useState<SiteSources | null>(null);
  const [audit, setAudit] = useState<SiteAudit | null>(null);

  const reload = () => {
    if (runId) getSiteFindings(runId).then(setFindings).catch(() => setFindings([]));
  };

  useEffect(() => {
    if (!runId) {
      setSite(null);
      return;
    }
    getSite(runId)
      .then(setSite)
      .catch(() => setSite(null));
    getRun(runId)
      .then(setMeta)
      .catch(() => setMeta(null));
    getSiteAudit(runId)
      .then(setAudit)
      .catch(() => setAudit(null));
    getSiteSources(runId)
      .then(setSources)
      .catch(() => setSources(null));
    getSiteFindings(runId)
      .then(setFindings)
      .catch(() => setFindings([]));
  }, [runId, version]);

  const bar = (
    <SnapshotBar
      snapshots={snapshots}
      snapshot={snapshot}
      meta={meta}
      onPick={setPicked}
      onChanged={(id) => {
        setPicked(id);
        setVersion((v) => v + 1);
      }}
    />
  );
  if (!snapshot) return loading ? <p className="text-slate-500">Loading...</p> : bar;
  if (!site) return <p className="text-slate-500">Loading...</p>;
  const origin = Object.keys(site.basics.sitemaps)[0]?.match(/^https?:\/\/[^/]+/)?.[0] ?? "";
  const sub = (s: string) => findings.filter((f) => f.subsection === s);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <FindingActionsContext.Provider value={{ runId, slug: null, reload }}>
    <div className="space-y-8">
      <div className="space-y-2">
        {bar}
        <Hint text={audit?.blocks.snapshot} />
      </div>
      <nav className="sticky top-[57px] z-[5] -mx-4 flex flex-wrap gap-1 border-b border-slate-200 bg-white/95 px-4 py-1.5 text-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95" aria-label="On this page">
        {[
          ["summary", "Summary"],
          ["checks", "All checks"],
          ["template", "Template text"],
          ["coverage", "Coverage and sitemap"],
        ].map(([id, label]) => (
          <button key={id} type="button" className="rounded px-2.5 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white" onClick={() => jump(id!)}>
            {label}
          </button>
        ))}
      </nav>

      {audit ? (
        <>
          <Section id="summary" title="Summary" hint={audit.blocks.summary}>
            <AuditSummary audit={audit} />
          </Section>
          <Section id="checks" title="All checks" hint={audit.blocks.all_checks}>
            <AuditGroups audit={audit} />
          </Section>
        </>
      ) : (
        <p className="text-sm text-slate-500">Loading the checks...</p>
      )}

      <Section id="template" title="Template text (checked by the model)" hint={audit?.blocks.template_text}>
        {audit && <TemplateIssues audit={audit} />}
        <details className="rounded border border-slate-200 dark:border-slate-700">
          <summary className="cursor-pointer px-3 py-2 font-medium">Banner by banner and node by node, with decisions</summary>
          <div className="space-y-6 border-t border-slate-200 p-3 dark:border-slate-700">
            <div className="space-y-2">
              <h3 className="font-semibold">Shared zones (banner CTA, forms)</h3>
              <p className="text-sm text-slate-500">
                Blocks that come from the site template. Each distinct text is checked once, and one edit in the template fixes every page listed.
              </p>
              {sources ? (
                <div className="space-y-3">
                  {sources.variants.map((v) => (
                    <VariantCard key={v.id} variant={v} findings={sub("shared").filter((f) => f.zone_id === v.id)} />
                  ))}
                </div>
              ) : (
                <>
                  <ul className="text-sm">
                    {site.shared.variants.map((v) => (
                      <li key={v.id}>
                        <b>{v.id}</b>: {v.pages.length} pages{" "}
                        <span className="text-slate-500">{v.pages.slice(0, 6).map(short).join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                  <FindingList findings={sub("shared")} empty="No problems." />
                </>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Site-wide structured data (JSON-LD)</h3>
              <p className="text-sm text-slate-500">
                Nodes that repeat on nearly every page, so they are checked once here and left out of the page reports. Edit them in the SEO plugin or the
                theme, not page by page.
              </p>
              {sources ? (
                (() => {
                  const schema = sub("schema");
                  const placed = new Set<Finding>();
                  const cards = sources.schema_nodes.map((n, i) => {
                    const own = findingsInNode(n, schema).filter((f) => !placed.has(f));
                    own.forEach((f) => placed.add(f));
                    return <SchemaNodeCard key={i} node={n} findings={own} />;
                  });
                  const rest = schema.filter((f) => !placed.has(f));
                  return (
                    <div className="space-y-3">
                      {cards.length === 0 && <p className="text-sm text-slate-500">No site-wide nodes saved for this run.</p>}
                      {cards}
                      {rest.length > 0 && (
                        <>
                          <h3 className="text-sm font-semibold">Not matched to a node</h3>
                          <FindingList findings={rest} empty="" />
                        </>
                      )}
                    </div>
                  );
                })()
              ) : (
                <FindingList findings={sub("schema")} empty="No problems or not checked." />
              )}
            </div>
          </div>
        </details>
      </Section>

      <Section id="coverage" title="Coverage and sitemap" hint={audit?.blocks.coverage}>
        {origin && (
          <p className="text-sm">
            Open on the site:{" "}
            {["robots.txt", "llms.txt", "sitemap_index.xml"].map((f) => (
              <a key={f} href={`${origin}/${f}`} target="_blank" rel="noreferrer" className="mr-3 text-blue-600 hover:underline dark:text-blue-400">
                {f}
              </a>
            ))}
          </p>
        )}
        <details className="text-sm">
          <summary className="cursor-pointer text-slate-500">Sitemap files</summary>
          <ul>
            {Object.entries(site.basics.sitemaps).map(([u, n]) => (
              <li key={u}>
                {u}: {n} URLs
              </li>
            ))}
          </ul>
        </details>
        <h3 className="text-sm font-semibold">Pages by section</h3>
        <ul className="text-sm text-slate-600 dark:text-slate-400">
          {Object.entries(site.scope_counts)
            .sort()
            .map(([k, n]) => (
              <li key={k}>
                {k}: {n} pages
              </li>
            ))}
        </ul>
        <details className="rounded border border-slate-200 dark:border-slate-700">
          <summary className="cursor-pointer px-3 py-2 font-medium">Every sitemap URL: scope, status, inbound links ({site.sitemap?.length ?? 0})</summary>
          <div className="border-t border-slate-200 p-3 dark:border-slate-700">
            <SitemapTable site={site} />
          </div>
        </details>
      </Section>

      <p className="text-sm">
        <Link to="/pages" className="text-blue-600 hover:underline dark:text-blue-400">
          Back to pages
        </Link>
      </p>
    </div>
    </FindingActionsContext.Provider>
  );
}
