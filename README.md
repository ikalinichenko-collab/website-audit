# GoGloby website audit

Internal content and SEO audit for [gogloby.com](https://gogloby.com). Checks are defined in `docs/checklist.md`; configuration lives in `config/audit.json`. Company source documents for the LLM are under `sources/` (not parsed by code).

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io/)
- OpenAI API key in `.env`:

```env
OPENAI_API_KEY=sk-...
```

## Setup

```bash
pnpm install
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm scan --all` | Full sitemap audit (fetch, code + LLM checks, site checks S1–S5, reports) |
| `pnpm scan <url> [<url>...]` | Single or multi-page audit; merges into `results/latest/` |
| `pnpm scan --limit N` | First N sitemap URLs (pilot full run) |
| `pnpm scan --force` | Re-run the LLM even when hashes are unchanged |
| `pnpm scan:test` | Run `tests/expectations.json` against the live site |
| `pnpm report` | Rebuild markdown/CSV/README from an existing run (`pnpm report [run_id]`, default `latest`) |

CLI flags work in Windows Git Bash. A literal `--` argument is ignored.

## Folder structure

```
config/audit.json       Settings, phrase lists, sitemap URL, LLM model
docs/checklist.md       Check specification (IDs, owners, severities)
sources/*.md            Company facts for the LLM (priority: decisions → Fact Sheet → Glossary)
tests/expectations.json Regression expectations (do not edit to make tests pass)

data/pages/             Cached page extractions (HTML-derived JSON per URL)
results/<run_id>/       One audit run (timestamp id)
  pages/<slug>.json     Full page results (all checks A1–H3)
  site.json             Site-level checks S1–S5 (full run only)
  report/<slug>.md      Per-page English report
  summary.csv           One row per page
  README.md             Run summary and diff vs previous run
results/latest/         Copy of the most recent full run, updated by single-page scans
```

## Updating source documents

1. Edit files in `sources/` (keep `decisions.md` for overrides not yet in the Fact Sheet).
2. Order is fixed in `config/audit.json` → `sources.files`; earlier files override later ones.
3. After changes, run `pnpm scan --force` (or a normal scan) so `sources_hash` changes and the LLM re-runs.

## Pipeline overview

1. Collect URLs from the sitemap (unless URLs are passed on the command line).
2. Fetch each page and save structured data under `data/pages/`.
3. Run code-owned checks from the checklist.
4. One OpenAI call per page (cached by content and config hashes unless `--force`).
5. Site checks on full runs only.
6. Write JSON results and English reports.

See `docs/checklist.md` for check IDs, JSON shape, and report sections A–H.
