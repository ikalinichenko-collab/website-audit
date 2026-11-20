import { Fragment, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type JobDetail } from "../api.js";
import { JobPanel, useJob } from "../components/JobPanel.js";
import { buttonClass } from "../components/ResourceEditor.js";
import { useRunContext } from "../context/RunContext.js";
import { getRun, getSite, getSiteAudit, getSiteFindings, getSiteSources } from "../data.js";
import type { Finding, RunListEntry, RunMeta, SiteAudit, SiteReport, SiteSources, SitemapRow } from "../types.js";
import { runLabel } from "../utils.js";
import { FindingList } from "../components/FindingList.js";
import { FindingActionsContext } from "../components/FindingActions.js";
import { SchemaNodeCard, VariantCard, findingsInNode } from "../components/SourceCards.js";
import { AuditGroups, AuditSummary, Hint, TemplateIssues } from "../components/SiteAuditPanel.js";
import { PagesTable } from "./PagesTable.js";
import { Loading } from "../components/Loading.js";
import { Help } from "../components/Help.js";
import { SiteTrends } from "../components/SiteTrends.js";

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
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    api
      .state()
      .then(async (s) => {
        setHasKey(s.has_api_key);
        if (!s.running_job) return;
        setBusy(true);
        // a check of the whole site that is already running is followed again (the page was left and opened again); a page check of Add pages is not shown here
        try {
          const j = await api.job(s.running_job, 1_000_000);
          if (j.options.all || (j.options as { kind?: string }).kind === "site_llm") {
            setWhat((j.options as { kind?: string }).kind === "site_llm" ? "llm" : "scan");
            setJobId(j.id);
          }
        } catch {
          /* the job ended in between */
        }
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

  const onDone = useCallback(
    (j: JobDetail) => {
      setBusy(false);
      if (j.error) setError(j.error);
      if (j.run_id) {
        void reload().then(() => onChanged(j.run_id!));
      }
    },
    [reload, onChanged],
  );
  const view = useJob(jobId, onDone);
  const running = busy && !!jobId;

  const ageDays = snapshot ? (Date.now() - new Date(snapshot.started_at).getTime()) / 86_400_000 : 0;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={buttonClass} disabled={busy} onClick={() => void start("scan", { siteScan: true })}>
          {running && what === "scan" ? "Checking the site..." : "Check the whole site (no LLM)"}
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={busy || !snapshot || !hasKey || !!snapshot?.details_removed}
          title={
            snapshot?.details_removed
              ? "The stored pages of this snapshot were removed to save space. Ask the model on a newer snapshot."
              : hasKey
                ? "One or two model calls on the banner and form texts and the site-wide JSON-LD. An unchanged text is not asked again."
                : "OPENAI_API_KEY is not set in .env"
          }
          onClick={() => snapshot && void start("llm", { siteLlm: { run_id: snapshot.id } })}
        >
          {running && what === "llm" ? "Asking the model..." : "Check shared blocks with the model"}
        </button>
        {!jobId && <span className="text-slate-500">The whole-site check fetches every page in scope and checks SEO and GEO code rules. It is free: no model calls.</span>}
        {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      </div>
      {jobId && <JobPanel view={view} label={what === "scan" ? "Checking the whole site" : "Asking the model"} stop open={false} />}
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

/** One row of tabs: the four parts of the audit, then the pages and the snapshots themselves. */
type Tab = "summary" | "checks" | "trends" | "template" | "coverage" | "pages" | "snapshots";
const TABS: { key: Tab; label: string }[] = [
  { key: "summary", label: "Summary" },
  { key: "checks", label: "All checks" },
  { key: "trends", label: "Trends" },
  { key: "template", label: "Template text" },
  { key: "coverage", label: "Coverage and sitemap" },
  { key: "pages", label: "Pages in the snapshot" },
  { key: "snapshots", label: "Snapshots" },
];

/** Every snapshot: when, who, how big, whether its stored pages were cleaned; open it, download it or delete it. */
function SnapshotList({ snapshots, currentId, onOpen, onPages }: { snapshots: RunListEntry[]; currentId: string; onOpen: (id: string) => void; onPages: (id: string) => void }) {
  const { reload } = useRunContext();
  const [err, setErr] = useState<string | null>(null);
  const link = "text-blue-600 hover:underline dark:text-blue-400";
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Snapshots</h2>
      <Help id="snapshots">
        <p>Every whole-site check is kept here. The newest few keep the stored pages; of older ones only the results stay. They still open, and the Audit compares each snapshot with the one before it.</p>
        <p>Page checks read the newest snapshot.</p>
      </Help>
      {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}
      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white text-sm dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
        {snapshots.map((s, i) => (
          <li key={s.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
            <span className="tabular-nums font-medium">{runLabel(s).replace(" (site snapshot)", "")}</span>
            {i === 0 && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">latest</span>}
            {s.id === currentId && <span className="text-xs text-slate-500">shown on the Audit</span>}
            <span className="text-slate-500">{s.pages_checked} pages</span>
            {s.details_removed && <span className="text-xs text-slate-500">stored pages removed</span>}
            <button type="button" className={link} onClick={() => onOpen(s.id)}>
              open audit
            </button>
            <button type="button" className={link} onClick={() => onPages(s.id)}>
              pages
            </button>
            <a className={link} href={`/api/runs/${s.id}/findings.csv`} download>
              findings.csv
            </a>
            <a className={link} href={`/api/runs/${s.id}/site.md`} target="_blank" rel="noreferrer">
              site.md
            </a>
            <button
              type="button"
              className="ml-auto text-red-600 hover:underline"
              onClick={async () => {
                if (!window.confirm(`Delete the snapshot of ${runLabel(s).replace(" (site snapshot)", "")}? This cannot be undone.`)) return;
                try {
                  await api.deleteRun(s.id);
                  await reload();
                } catch (e) {
                  setErr(String(e instanceof Error ? e.message : e));
                }
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Site Checks: the snapshot of the whole site, whichever page check is open elsewhere: the latest one unless another is picked. */
export function SiteView() {
  const { snapshots: allSnapshots, loading } = useRunContext();
  const snapshots = allSnapshots.filter((r) => r.status === "done");
  const [params, setParams] = useSearchParams();
  // "audit" was the old name of the first tab
  const asked = params.get("tab") === "audit" ? "summary" : params.get("tab");
  const tab: Tab = (TABS.find((t) => t.key === asked)?.key ?? "summary") as Tab;
  const setTab = (t: Tab) => {
    const next = new URLSearchParams(params);
    if (t === "summary") next.delete("tab");
    else next.set("tab", t);
    setParams(next, { replace: true });
  };
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
  if (!snapshot) return loading ? <Loading /> : bar;
  if (!site) return <Loading />;
  const origin = Object.keys(site.basics.sitemaps)[0]?.match(/^https?:\/\/[^/]+/)?.[0] ?? "";
  const sub = (s: string) => findings.filter((f) => f.subsection === s);

  return (
    <FindingActionsContext.Provider value={{ runId, slug: null, reload }}>
    <div className="space-y-8">
      <div className="space-y-2">
        {bar}
        {audit?.blocks.snapshot && (
          <Help id="site-snapshot" title="What is a snapshot?">
            <p>{audit.blocks.snapshot}</p>
          </Help>
        )}
      </div>
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700" role="tablist">
        {TABS.map((t) => (
          <Fragment key={t.key}>
            {t.key === "pages" && <span aria-hidden className="mx-2 my-2 border-l border-slate-300 dark:border-slate-600" />}
            <button
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm ${tab === t.key ? "border-blue-600 font-semibold" : "border-transparent text-slate-500"}`}
            >
              {t.label}
            </button>
          </Fragment>
        ))}
      </div>
      {tab === "pages" ? (
        <PagesTable runId={runId} />
      ) : tab === "snapshots" ? (
        <SnapshotList
          snapshots={snapshots}
          currentId={runId}
          onOpen={(id) => {
            setPicked(id);
            setTab("summary");
          }}
          onPages={(id) => {
            setPicked(id);
            setTab("pages");
          }}
        />
      ) : (
      <>
      {(tab === "summary" || tab === "checks") &&
        (audit ? (
          tab === "summary" ? (
            <Section id="summary" title="Summary" hint={audit.blocks.summary}>
              <AuditSummary audit={audit} />
            </Section>
          ) : (
            <Section id="checks" title="All checks" hint={audit.blocks.all_checks}>
              <AuditGroups audit={audit} />
            </Section>
          )
        ) : (
          <Loading />
        ))}

      {tab === "trends" && <SiteTrends />}

      {tab === "template" && (
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
      )}

      {tab === "coverage" && (
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
      )}

      </>
      )}
    </div>
    </FindingActionsContext.Provider>
  );
}
