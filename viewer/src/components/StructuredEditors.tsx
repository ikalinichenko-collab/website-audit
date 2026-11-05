import { useEffect, useState } from "react";
import { api, type GeoTryResult } from "../api.js";
import { Notice, HistoryList, buttonClass, primaryClass, useResource } from "./ResourceEditor.js";

const field = "rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900";
const SEVERITIES = ["high", "medium", "low"];

function parse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function SaveBar({ r, onSave, dirty }: { r: ReturnType<typeof useResource>; onSave: () => void; dirty: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button type="button" className={primaryClass} disabled={!dirty || r.saving} onClick={onSave}>
          {r.saving ? "Saving..." : "Save"}
        </button>
        {dirty && <span className="text-xs text-amber-700 dark:text-amber-300">Unsaved changes.</span>}
      </div>
      {r.msg && <Notice kind={r.msg.kind}>{r.msg.text}</Notice>}
    </div>
  );
}

// ---- GEO questions -------------------------------------------------------------

interface GeoQuestion {
  id: string;
  title?: string;
  question: string;
  applies_to: string[];
  requires?: string;
  severity?: "high" | "medium" | "low";
  needs?: string[];
  confirm?: boolean;
}

const GEO_TYPES = [
  ["home", "Home"],
  ["service", "Service"],
  ["article", "Article"],
  ["company", "Company"],
  ["legal", "Legal"],
  ["podcast", "Podcast"],
] as const;

const GEO_NEEDS = [
  ["json_ld", "Structured data (JSON-LD)"],
  ["og", "Social tags (og)"],
  ["author", "Author and date"],
  ["links", "Links"],
] as const;

const GEO_HELP: Record<string, string> = {
  answer_first: "Gets the first two sentences of the first content zone from code.",
  target_keyword: "Its value (the chosen search term) is used by the keyword placement check.",
  buyer_ready: "Its value must be buyer_ready, informational or not_targeted: the yes/no answer is derived from it.",
};

/** Drops empty and default fields, so the file stays short and "unsaved changes" compares like with like. */
function cleanQuestion(q: GeoQuestion): GeoQuestion {
  return {
    id: q.id,
    ...(q.title?.trim() ? { title: q.title.trim() } : {}),
    question: q.question,
    applies_to: q.applies_to,
    ...(q.requires ? { requires: q.requires } : {}),
    ...(q.severity && q.severity !== "medium" ? { severity: q.severity } : {}),
    ...(q.needs?.length ? { needs: q.needs } : {}),
    ...(q.confirm ? { confirm: true } : {}),
  };
}

type Tried = { state: "loading" } | { state: "error"; text: string } | { state: "done"; result: GeoTryResult };

function TryResult({ t }: { t: Tried }) {
  if (t.state === "loading") return <p className="text-sm text-slate-500">Asking the model on the live page...</p>;
  if (t.state === "error") return <Notice kind="error">{t.text}</Notice>;
  const { answer: a, cost_usd, model, url } = t.result;
  const chip =
    a.answer === "yes"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
      : a.answer === "no"
        ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
        : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  return (
    <div className="space-y-1.5 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${chip}`}>{a.answer === "na" ? "n/a" : a.answer}</span>
        {a.value && <span className="font-mono text-xs">{a.value}</span>}
        <span className="ml-auto text-xs text-slate-500">
          {model}, ${cost_usd.toFixed(4)}, {url.replace(/^https?:\/\/[^/]+/, "") || "/"}
        </span>
      </div>
      <p>
        <span className="font-medium">Why:</span> {a.note}
      </p>
      {a.fix && (
        <p>
          <span className="font-medium">What to do:</span> {a.fix}
        </p>
      )}
      {a.evidence && (
        <p className="border-l-2 border-slate-300 pl-2 italic text-slate-700 dark:border-slate-600 dark:text-slate-300">
          &ldquo;{a.evidence}&rdquo;
          {a.zone_id && <span className="ml-2 not-italic text-xs text-slate-500">in {a.zone_id}</span>}
          {a.evidence_verified === false && <span className="ml-2 not-italic text-xs text-amber-600">not found in this zone</span>}
        </p>
      )}
    </div>
  );
}

export function GeoQuestionsEditor() {
  const r = useResource("geo-questions");
  const [qs, setQs] = useState<GeoQuestion[]>([]);
  const [raw, setRaw] = useState(false);
  const [tryUrl, setTryUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://gogloby.com");
  const [tried, setTried] = useState<Record<number, Tried>>({});

  useEffect(() => {
    if (r.info) setQs(parse<GeoQuestion[]>(r.info.content) ?? []);
  }, [r.info]);

  useEffect(() => {
    api
      .state()
      .then((s) => setBaseUrl(s.base_url.replace(/\/$/, "")))
      .catch(() => undefined);
  }, []);

  if (!r.info) return r.msg ? <Notice kind="error">{r.msg.text}</Notice> : <p className="text-slate-500">Loading...</p>;
  const serialized = JSON.stringify(qs.map(cleanQuestion), null, 2) + "\n";
  const saved = (parse<GeoQuestion[]>(r.info.content) ?? []).map(cleanQuestion);
  const dirty = raw ? r.dirty : serialized.trim() !== JSON.stringify(saved, null, 2).trim();

  const update = (i: number, patch: Partial<GeoQuestion>) => setQs(qs.map((q, k) => (k === i ? { ...q, ...patch } : q)));

  const tryQuestion = async (i: number) => {
    const q = qs[i]!;
    setTried((t) => ({ ...t, [i]: { state: "loading" } }));
    try {
      const result = await api.geoTry({ url: tryUrl.trim() || `${baseUrl}/`, question: q.question, id: q.id || undefined, needs: q.needs });
      setTried((t) => ({ ...t, [i]: { state: "done", result } }));
    } catch (e) {
      setTried((t) => ({ ...t, [i]: { state: "error", text: e instanceof Error ? e.message : String(e) } }));
    }
  };

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
        Questions the LLM answers about each page (GEO layer). Each question applies to the page types you tick. A question with
        a condition is asked only when that code check passed (for example the FAQ question only when the page has an FAQ). Write
        every question so that <b>yes means the page is fine</b>: a &ldquo;no&rdquo; becomes a finding with the title and severity
        you set. Editing one question asks only that question again on the next run.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={raw} onChange={(e) => setRaw(e.target.checked)} /> Edit as JSON
      </label>
      {raw ? (
        <div className="space-y-2">
          <textarea
            className="w-full rounded border border-slate-300 bg-white p-2 font-mono text-xs dark:border-slate-600 dark:bg-slate-900"
            rows={24}
            value={r.text}
            onChange={(e) => r.setText(e.target.value)}
          />
          <SaveBar r={r} dirty={dirty} onSave={() => r.save()} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Try a question on this page:</span>
            <input className={`${field} w-96 max-w-full`} value={tryUrl} placeholder={`${baseUrl}/services/hire-ai-engineers/`} onChange={(e) => setTryUrl(e.target.value)} />
            <span className="text-xs text-slate-500">One model call with the default model, about a cent. Nothing is saved.</span>
          </div>
          <div className="space-y-3">
            {qs.map((q, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    className={`${field} w-56 font-mono`}
                    value={q.id}
                    placeholder="question_id"
                    onChange={(e) => update(i, { id: e.target.value })}
                  />
                  <input
                    className={`${field} min-w-64 flex-1`}
                    value={q.title ?? ""}
                    placeholder="Finding title when the answer is no"
                    onChange={(e) => update(i, { title: e.target.value })}
                  />
                  <select className={field} value={q.severity ?? "medium"} onChange={(e) => update(i, { severity: e.target.value as GeoQuestion["severity"] })}>
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {s[0]!.toUpperCase() + s.slice(1)} severity
                      </option>
                    ))}
                  </select>
                  <select className={field} value={q.requires ?? ""} onChange={(e) => update(i, { requires: e.target.value || undefined })}>
                    <option value="">Always asked</option>
                    <option value="faq_present">Only if the page has an FAQ</option>
                  </select>
                  <button
                    type="button"
                    className={buttonClass}
                    onClick={() => {
                      setQs(qs.filter((_, k) => k !== i));
                      setTried({});
                    }}
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  className={`${field} w-full`}
                  rows={4}
                  value={q.question}
                  placeholder='Write it so that "yes" means the page is fine.'
                  onChange={(e) => update(i, { question: e.target.value })}
                />
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-slate-500">Applies to:</span>
                  {GEO_TYPES.map(([key, label]) => (
                    <label key={key} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={q.applies_to.includes(key)}
                        onChange={(e) =>
                          update(i, { applies_to: e.target.checked ? [...q.applies_to, key] : q.applies_to.filter((t) => t !== key) })
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-slate-500" title="By default the model sees the page text only: title, meta description, H1, blocks and article sections.">
                    Also show the model:
                  </span>
                  {GEO_NEEDS.map(([key, label]) => (
                    <label key={key} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={(q.needs ?? []).includes(key)}
                        onChange={(e) =>
                          update(i, { needs: e.target.checked ? [...(q.needs ?? []), key] : (q.needs ?? []).filter((n) => n !== key) })
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <label className="flex items-center gap-1" title="Asks the question a second time when the answer is no. The finding stands only if the second answer is no too. One extra model call on every page where the first answer is no.">
                    <input type="checkbox" checked={Boolean(q.confirm)} onChange={(e) => update(i, { confirm: e.target.checked })} />
                    Confirm a &ldquo;no&rdquo; with a second answer
                  </label>
                  <button type="button" className={`${buttonClass} ml-auto`} disabled={tried[i]?.state === "loading" || q.question.trim().length < 10} onClick={() => tryQuestion(i)}>
                    Try on the page
                  </button>
                </div>
                {GEO_HELP[q.id] && <p className="text-xs text-slate-500">{GEO_HELP[q.id]}</p>}
                {tried[i] && <TryResult t={tried[i]!} />}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={buttonClass}
              onClick={() => setQs([...qs, { id: "", question: "", applies_to: ["article"] }])}
            >
              Add question
            </button>
          </div>
          <SaveBar r={r} dirty={dirty} onSave={() => r.save(serialized)} />
        </>
      )}
      <HistoryList id="geo-questions" history={r.history} onRestore={r.restore} />
    </div>
  );
}

// ---- SEO ---------------------------------------------------------------------------

interface SeoProfile {
  schema_required: string[];
  schema_recommended: string[];
  author: boolean;
  dates: boolean;
  link_to_services: boolean;
}

interface SeoConfig {
  severity: Record<string, string>;
  title: { min: number; max: number };
  meta: { min: number; max: number };
  article_schema_fields: string[];
  skip_link_patterns: string[];
  service_path_prefix: string;
  profiles: Record<string, SeoProfile>;
  [k: string]: unknown;
}

const SEO_LABELS: Record<string, string> = {
  http_status: "Page does not return a clean 200",
  title_missing: "Title missing",
  title_too_long: "Title too long",
  title_too_short: "Title too short",
  meta_present: "Meta description missing",
  meta_length: "Meta description length",
  h1_count: "H1 count is not one",
  title_h1_match: "Title and H1 say different things",
  canonical: "Canonical",
  indexable: "Page is noindex",
  schema_required: "Required structured data missing",
  schema_recommended: "Recommended structured data missing",
  author: "Author missing",
  dates: "Dates missing in structured data",
  date_mismatch: "Visible date differs from dateModified",
  broken_internal_links: "Broken internal link",
  redirecting_internal_links: "Internal link through a redirect",
  link_to_services: "No link to a service page",
  alt_missing: "Image without alt attribute",
  alt_empty: "Image with empty alt",
  image_dimensions: "Image without width and height",
  heading_order: "Heading level skipped",
  og_present: "Open Graph tags missing",
  og_url_canonical: "og:url differs from canonical",
  twitter_card: "twitter:card missing",
  html_lang: "html lang missing",
  viewport: "Viewport meta missing",
  jsonld_valid: "JSON-LD does not parse",
  article_fields: "Article schema fields missing",
  anchors_resolve: "Anchor link has no target",
  faq_schema_matches_dom: "FAQ markup and schema disagree",
  duplicate_meta: "Duplicate meta description",
  duplicate_title: "Duplicate title",
  duplicate_h1: "Duplicate H1",
};

const list = (s: string): string[] => s.split(",").map((x) => x.trim()).filter(Boolean);

export function SeoEditor() {
  const r = useResource("seo");
  const [cfg, setCfg] = useState<SeoConfig | null>(null);
  const [raw, setRaw] = useState(false);

  useEffect(() => {
    if (r.info) setCfg(parse<SeoConfig>(r.info.content));
  }, [r.info]);

  if (!r.info) return r.msg ? <Notice kind="error">{r.msg.text}</Notice> : <p className="text-slate-500">Loading...</p>;
  if (!cfg) return <Notice kind="error">config/seo.json is not valid JSON. Fix it in the raw editor.</Notice>;

  const serialized = JSON.stringify(cfg, null, 2) + "\n";
  const dirty = raw ? r.dirty : serialized.trim() !== JSON.stringify(parse(r.info.content), null, 2).trim();
  const num = (v: string) => Number(v) || 0;
  const setProfile = (name: string, patch: Partial<SeoProfile>) =>
    setCfg({ ...cfg, profiles: { ...cfg.profiles, [name]: { ...cfg.profiles[name]!, ...patch } } });

  return (
    <div className="space-y-5">
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
        Technical checks that run without the LLM. Severity of each check is fixed here, not decided per page.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={raw} onChange={(e) => setRaw(e.target.checked)} /> Edit as JSON
      </label>
      {raw ? (
        <div className="space-y-2">
          <textarea
            className="w-full rounded border border-slate-300 bg-white p-2 font-mono text-xs dark:border-slate-600 dark:bg-slate-900"
            rows={28}
            value={r.text}
            onChange={(e) => r.setText(e.target.value)}
          />
          <SaveBar r={r} dirty={dirty} onSave={() => r.save()} />
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">Title length (characters)</h3>
              <div className="flex items-center gap-2 text-sm">
                Shorter than
                <input type="number" className={`${field} w-20`} value={cfg.title.min} onChange={(e) => setCfg({ ...cfg, title: { ...cfg.title, min: num(e.target.value) } })} />
                or longer than
                <input type="number" className={`${field} w-20`} value={cfg.title.max} onChange={(e) => setCfg({ ...cfg, title: { ...cfg.title, max: num(e.target.value) } })} />
              </div>
            </div>
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">Meta description length (characters)</h3>
              <div className="flex items-center gap-2 text-sm">
                From
                <input type="number" className={`${field} w-20`} value={cfg.meta.min} onChange={(e) => setCfg({ ...cfg, meta: { ...cfg.meta, min: num(e.target.value) } })} />
                to
                <input type="number" className={`${field} w-20`} value={cfg.meta.max} onChange={(e) => setCfg({ ...cfg, meta: { ...cfg.meta, max: num(e.target.value) } })} />
              </div>
            </div>
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">A link to a service page</h3>
              <div className="flex items-center gap-2 text-sm">
                Path starts with
                <input className={`${field} w-48 font-mono`} value={cfg.service_path_prefix} onChange={(e) => setCfg({ ...cfg, service_path_prefix: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">Article schema must have</h3>
              <input
                className={`${field} w-full`}
                value={cfg.article_schema_fields.join(", ")}
                onChange={(e) => setCfg({ ...cfg, article_schema_fields: list(e.target.value) })}
              />
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold">Required structured data by page profile</h3>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800">
                  <tr>
                    <th className="px-3 py-2">Profile</th>
                    <th className="px-3 py-2">Required (comma separated)</th>
                    <th className="px-3 py-2">Recommended</th>
                    <th className="px-3 py-2">Author</th>
                    <th className="px-3 py-2">Dates</th>
                    <th className="px-3 py-2">Link to service</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cfg.profiles).map(([name, p]) => (
                    <tr key={name} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-3 py-2 font-mono">{name}</td>
                      <td className="px-3 py-2">
                        <input className={`${field} w-44`} value={p.schema_required.join(", ")} onChange={(e) => setProfile(name, { schema_required: list(e.target.value) })} />
                      </td>
                      <td className="px-3 py-2">
                        <input className={`${field} w-44`} value={p.schema_recommended.join(", ")} onChange={(e) => setProfile(name, { schema_recommended: list(e.target.value) })} />
                      </td>
                      {(["author", "dates", "link_to_services"] as const).map((k) => (
                        <td key={k} className="px-3 py-2">
                          <input type="checkbox" checked={p[k]} onChange={(e) => setProfile(name, { [k]: e.target.checked })} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold">Severity of each check</h3>
            <div className="grid gap-x-6 gap-y-1 md:grid-cols-2">
              {Object.entries(cfg.severity).map(([id, sev]) => (
                <label key={id} className="flex items-center justify-between gap-2 border-b border-slate-100 py-1 text-sm dark:border-slate-800">
                  <span>
                    {SEO_LABELS[id] ?? id} <span className="text-xs text-slate-400">{id}</span>
                  </span>
                  <select className={field} value={sev} onChange={(e) => setCfg({ ...cfg, severity: { ...cfg.severity, [id]: e.target.value } })}>
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </section>
          <SaveBar r={r} dirty={dirty} onSave={() => r.save(serialized)} />
        </>
      )}
      <HistoryList id="seo" history={r.history} onRestore={r.restore} />
    </div>
  );
}

// ---- Compliance severity -------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  positioning: "Positioning",
  company_facts: "Company facts",
  contacts: "Contacts",
  unknown_client: "Client not in Fact Sheet",
  discontinued_offer: "Discontinued offer",
  client_figures: "Client figures",
  cta: "CTA",
  wrong_audience: "Wrong audience",
  old_terms: "Old terms",
  other: "Other",
};

interface ComplianceConfig {
  severity: Record<string, string>;
  old_terms_high_kinds: string[];
  old_terms_high_zone_prefixes: string[];
  max_locations: number;
}

export function ComplianceEditor() {
  const r = useResource("compliance");
  const [cfg, setCfg] = useState<ComplianceConfig | null>(null);

  useEffect(() => {
    if (r.info) setCfg(parse<ComplianceConfig>(r.info.content));
  }, [r.info]);

  if (!r.info) return r.msg ? <Notice kind="error">{r.msg.text}</Notice> : <p className="text-slate-500">Loading...</p>;
  if (!cfg) return <Notice kind="error">config/compliance.json is not valid JSON.</Notice>;
  const serialized = JSON.stringify(cfg, null, 2) + "\n";
  const dirty = serialized.trim() !== JSON.stringify(parse(r.info.content), null, 2).trim();

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
        The model does not rate severity. It is set here by the problem category. Old terms count as high in the title, meta
        description, og tags, H1 and the hero block, and as the category value elsewhere.
      </p>
      <div className="grid gap-x-6 gap-y-1 md:grid-cols-2">
        {Object.entries(cfg.severity).map(([id, sev]) => (
          <label key={id} className="flex items-center justify-between gap-2 border-b border-slate-100 py-1 text-sm dark:border-slate-800">
            <span>{CATEGORY_LABELS[id] ?? id}</span>
            <select className={field} value={sev} onChange={(e) => setCfg({ ...cfg, severity: { ...cfg.severity, [id]: e.target.value } })}>
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm">
        Most places listed per problem
        <input type="number" className={`${field} w-20`} value={cfg.max_locations} onChange={(e) => setCfg({ ...cfg, max_locations: Number(e.target.value) || 1 })} />
      </label>
      <SaveBar r={r} dirty={dirty} onSave={() => r.save(serialized)} />
      <HistoryList id="compliance" history={r.history} onRestore={r.restore} />
    </div>
  );
}
