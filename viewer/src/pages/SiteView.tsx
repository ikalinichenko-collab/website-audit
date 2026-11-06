import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRunContext } from "../context/RunContext.js";
import { getSite, getSiteFindings, getSiteSources } from "../data.js";
import type { Finding, SiteReport, SiteSources } from "../types.js";
import { FindingList } from "../components/FindingList.js";
import { FindingActionsContext } from "../components/FindingActions.js";
import { SchemaNodeCard, VariantCard, findingsInNode } from "../components/SourceCards.js";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const short = (u: string) => u.replace(/^https:\/\/[^/]+/, "") || "/";

export function SiteView() {
  const { runId } = useRunContext();
  const [site, setSite] = useState<SiteReport | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [sources, setSources] = useState<SiteSources | null>(null);

  const reload = () => {
    if (runId) getSiteFindings(runId).then(setFindings).catch(() => setFindings([]));
  };

  useEffect(() => {
    if (!runId) return;
    getSite(runId)
      .then(setSite)
      .catch(() => setSite(null));
    getSiteSources(runId)
      .then(setSources)
      .catch(() => setSources(null));
    getSiteFindings(runId)
      .then(setFindings)
      .catch(() => setFindings([]));
  }, [runId]);

  if (!site) return <p className="text-slate-500">Loading...</p>;
  const origin = Object.keys(site.basics.sitemaps)[0]?.match(/^https?:\/\/[^/]+/)?.[0] ?? "";
  const sub = (s: string) => findings.filter((f) => f.subsection === s);

  return (
    <FindingActionsContext.Provider value={{ runId, slug: null, reload }}>
    <div className="space-y-8">
      <Section title="Site checks">
        <ul className="text-sm">
          <li>
            robots.txt AI bots: <b>{site.basics.robots.value}</b>{origin && <> <a href={`${origin}/robots.txt`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline dark:text-blue-400">open</a></>}
          </li>
          <li>
            llms.txt: <b>{site.basics.llms_txt.value}</b>{origin && <> <a href={`${origin}/llms.txt`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline dark:text-blue-400">open</a></>}
          </li>
        </ul>
        <details className="text-sm">
          <summary className="cursor-pointer text-slate-500">Sitemaps</summary>
          <ul>
            {Object.entries(site.basics.sitemaps).map(([u, n]) => (
              <li key={u}>
                {u}: {n} URLs
              </li>
            ))}
          </ul>
        </details>
        <ul className="text-sm text-slate-600 dark:text-slate-400">
          {Object.entries(site.scope_counts)
            .sort()
            .map(([k, n]) => (
              <li key={k}>
                {k}: {n} pages
              </li>
            ))}
        </ul>
      </Section>

      <Section title="Shared zones (banner CTA, forms)">
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
      </Section>

      <Section title="Site-wide structured data (JSON-LD)">
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
      </Section>

      <Section title="SEO across pages">
        <h3 className="text-sm font-semibold">Failing on nearly every page of a type</h3>
        <ul className="text-sm">
          {site.seo.collapsed.length === 0 && <li className="text-slate-500">none</li>}
          {site.seo.collapsed.map((c) => (
            <li key={`${c.id}-${c.profile}`}>
              {c.id} on {c.pages_failing} of {c.pages_total} {c.profile} pages: <span className="text-slate-500">{c.value}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-sm font-semibold">Duplicates</h3>
        <ul className="text-sm">
          {site.seo.duplicates.length === 0 && <li className="text-slate-500">none</li>}
          {site.seo.duplicates.map((d, i) => (
            <li key={i}>
              {d.id}: <i>&ldquo;{d.value.slice(0, 90)}&rdquo;</i>{" "}
              {d.urls.map((u) => (
                <span key={u} className="mr-1 text-slate-500">
                  {short(u)}
                </span>
              ))}
            </li>
          ))}
        </ul>
        <h3 className="text-sm font-semibold">Sitemap hygiene</h3>
        <ul className="text-sm">
          {site.seo.sitemap_hygiene.length === 0 && <li className="text-slate-500">none</li>}
          {site.seo.sitemap_hygiene.map((h) => (
            <li key={h.url}>
              {short(h.url)}: {h.problem}
            </li>
          ))}
        </ul>
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
