# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Internal audit tool for gogloby.com. It crawls the audited part of the site, splits every page into zones, and runs three separate layers on each page: **Compliance** (LLM, against the company documents in `sources/`), **GEO** (LLM questions plus code checks) and **SEO** (code only). Every finding names its zone, so the report says where to change something. Node 20+, pnpm, ESM TypeScript run directly with `tsx` (no build step, imports use `.js` suffixes). Needs `OPENAI_API_KEY` in `.env`.

The full design, the decisions behind it and the measured results are in `docs/zones.md`. Read it before changing a layer.

The plan for the database, Google sign-in and deploy (stages B and C) and what is already done is in `docs/roadmap.md`.

## Commands

- `pnpm scan --all` — audit every in-scope URL from the sitemap (scope is the allow-list in `config/settings.json`)
- `pnpm scan <url>...` — audit specific pages (a URL outside the scope is audited with a neutral profile)
- `pnpm scan --limit N` — N URLs spread over the subsections
- `pnpm scan --category <name>... | --subsection <name>...` — audit chosen categories (Services, Company, Resources, Solutions) or subsections (`Resources/Insights` or just `Insights`); repeatable, combines with `--limit N` for a sample
- `pnpm scan ... --force` — ignore the per-layer cache
- `pnpm scan ... --no-compliance --no-geo --no-seo` — turn a layer off (at least one must stay on). An off layer is recorded as not checked (`skipped: true`, shown as "off" in the viewer) and its site-pass part is skipped too
- `pnpm scan ... --model <id>` — model from `llm.models` in `config/settings.json` (default `llm.model`); cost is computed from that model's price
- `pnpm scan ... --no-llm` — skip the LLM calls but keep the layers (SEO and GEO code checks, term list, zones and site pass only)
- `pnpm report [run_id|path]` — rebuild per-page `.md`, `site.md`, `summary.csv`, `findings.csv` and the viewer index from the JSON of a run (default `latest`)
- `pnpm app` — build the viewer and start the app server (`src/server.ts`, http://127.0.0.1:8787): run audits, edit documents and settings, browse results. `PORT=...` changes the port
- `pnpm viewer` — Vite dev server for `viewer/` with hot reload (proxies `/api` to the app server on 8787, so start `pnpm server` too)
- `npx tsc --noEmit` and `npx tsc -p viewer/tsconfig.json --noEmit` — type-check (no test runner or linter is configured)
- `scripts/zones-scan.ts`, `seo-scan.ts`, `geo-scan.ts`, `geo-stability.ts`, `compliance-run.ts` — diagnostics over a cache folder of fetched pages; the LLM ones are dry runs unless `--run` is given

## Architecture

`src/cli.ts` calls `runAudit` in `src/audit.ts`:

1. **URLs**: `sitemap.ts` reads the sitemap, `scope.ts` keeps only URLs matching the `scope` allow-list (each rule gives category, subsection and SEO profile). `--limit` samples across subsections.
2. **Fetch and extract**: `fetch.ts` (throttled), `extract.ts` and `html-content.ts` build an `ExtractedPage` (title, meta, canonical, JSON-LD, author, dates, links). Site-wide JSON-LD nodes are found by fingerprint (`schema-fingerprint.ts`, shared by at least `site_wide_schema_share` of pages) and removed from per-page checks.
3. **Zones** (`zones.ts`): the HTML is split into zones (title, meta, og, JSON-LD, H1, blocks `block:<name>#N`, article sections `article:<h2 slug>`, author, shared banner and forms). Every zone has ordered parts (heading, paragraph, list item, table cell, button, link, image with alt state). Header, footer, related content and the job application modal are recorded as skipped.
4. **Shared zones** (banner CTA, forms) differ by template, so each distinct text is a variant (`banner_cta@2`), audited once in the site pass.
5. **SEO** (`seo.ts`, `config/seo.json`): 17 page checks plus regression guards, severity fixed per check in config. `seo-site.ts` adds duplicates, failures collapsed per profile and sitemap hygiene.
6. **GEO**: `geo-code.ts` (`config/geo.json`: home title, trap terms, nearshore in hero, FAQ, em dash, `&`, UK spelling) and `geo-llm.ts` (`prompts/geo-questions.json`, `prompts/geo-llm.md`). The `answer_first` text and the keyword placement come from code. `buyer_ready` answer is derived from its value. `answer_first`, `target_keyword` and `buyer_ready` are `locked` in the file: shown read-only in Settings and refused by the server. Each question has `title`, `severity` (default medium), `needs` (extra data: JSON-LD, og, author and date, links) and `confirm` (a "no" is asked a second time). Answers are cached per question (`qhash` on each answer, taken from the page's report in the latest run), so editing one question asks only that one; a skipped question is asked once more alone. Title, severity and confirm are applied on every run and ask nothing. Code checks carry a severity from `severity` in `config/geo.json`.
7. **Compliance** (`compliance.ts`, `prompts/compliance-zones.md`, `config/compliance.json`): the model returns problems with `locations[{zone_id, quote}]` and a `basis` (contradicts or not in sources); code finds the part, checks the quote and the cited rule, sets severity by category, zone and basis, counts places, adds every occurrence of the banned terms in `config/compliance.json` (`finalizeCompliance`) and derives the page verdict (`deriveAction`). Only the raw model output is cached (`llm_problems`), so editing the term list or severity table does not ask the model again.
8. **Run options** (`AuditOptions`): `layers` (which of the three run), `model`, `subsections` (`Category/Subsection` keys, from `scopeGroups` in `scope.ts`), `limit`, `force`. A run stores `model`, `layers` and the cost (`usageCost` in `config.ts`) in `run.json`; one run uses one model. The layer cache key includes the model, so another model asks again.
9. **Cache**: each LLM layer is keyed by a hash of its payload, prompts, config, sources, model and reasoning (`layerFingerprint` in `config.ts`). SEO and GEO code checks always rerun.
10. **Site pass**: robots and llms.txt (`site.ts`), shared variants, site-wide schema (one Compliance call each), SEO site checks.
11. **Output** under `results/<run_id>/`: per page `pages/<slug>.json` (`PageReport`, `src/report-types.ts`), `.findings.json`, `.md`, `.html` snapshot, `.zones.json`; run-level `site.json`, `site.md`, `site.findings.json`, `summary.csv`, `findings.csv`, `index.json`, `run.json`. `results/runs.json` lists runs and `results/latest` points to the newest. `run-output.ts` builds all derived files, `findings.ts` flattens a report into findings, `render.ts` writes markdown and CSV, `quote-fragments.ts` makes text-fragment links to the live page.

The company documents the LLM compares against live in `sources/` (`decisions.md` wins over the Fact Sheet, which wins over the Glossary). Code never parses them except `verifyRule`, which checks that a cited rule names a real heading. Changing them changes the layer hashes and triggers LLM reruns.

**App server** (`src/server.ts`, Node `http`, no framework, bound to 127.0.0.1): serves `viewer/dist`, `results/` under `/data/`, and a JSON API:
- `resources.ts` is the allow-list of editable files (the three `sources/` documents, `prompts/geo-questions.json`, `config/{seo,geo,compliance,settings}.json`, the two prompts). `writeResource` validates the content per file (JSON shape, regex patterns, placeholders, scope profiles), keeps the previous version in `.history/<id>/` (30 kept) and clears the sources cache. Endpoints: `GET/PUT /api/resources/:id`, `.../history`, `.../restore`.
- `jobs.ts` runs one audit at a time in the server process (`POST /api/jobs` with pasted URLs, a sample, chosen `subsections`, the whole scope, plus `layers` and `model`; `GET /api/scope` returns the subsection groups with page counts; `GET /api/jobs/:id` returns the log; `POST .../stop`). URLs must be on the site host. `DELETE /api/runs/:id` removes a run. `POST /api/geo-try` (`geo-try.ts`) asks one GEO question on one live page (one model call, nothing saved) for the question editor.

The viewer (`viewer/`, React + react-router + Tailwind) has pages Run, Overview, Pages, Site, Documents (sources) and Settings (GEO questions, SEO, compliance severity, GEO code checks, prompts, general and scope). It reads results through `/data/...` and talks to the API through `viewer/src/api.ts`. Its types in `viewer/src/types.ts` mirror `src/run-output.ts`, `src/report-types.ts` and `src/findings.ts`; keep them in sync. Runs made before the zone redesign are not readable by the viewer.

## Config

- `config/settings.json`: site URLs, `scope` allow-list, LLM default model, `llm.models` (id, label and price per million input, cached input and output tokens: the choices in the Run page), reasoning effort and concurrency, fetch settings, hidden-content selectors, legacy `page_types` (only used for `ExtractedPage.page_type`).
- `config/seo.json`, `config/geo.json`, `config/compliance.json`: per-layer thresholds, lists and severities.
- Prompts use placeholders such as `{{report_language}}` and `{{questions}}`.
- Gotcha: when editing JSON with regex patterns, backslashes must stay doubled (`\\b`); a single `\b` in JSON is a backspace character and the pattern silently matches nothing.
