-- A page check is the current deep check of one page, with no run around it: one row per page, overwritten by a recheck.
-- Snapshots stay runs (kind = 'site'); runs of pages ('pages') are gone, their pages are moved here.
CREATE TABLE page_checks (
  slug         text PRIMARY KEY,
  -- the address the page was asked for
  url          text NOT NULL UNIQUE,
  report       jsonb NOT NULL,
  -- PageIndexEntry for the list, worked out against the snapshot the page was read against
  entry        jsonb NOT NULL,
  html         text NOT NULL,
  zones        jsonb NOT NULL,
  checked_at   timestamptz NOT NULL,
  checked_by   text,
  model        text,
  layers       jsonb,
  -- the latest snapshot when the page was checked: its shared blocks and its report of this page are read against it
  site_run_id  text REFERENCES runs (id) ON DELETE SET NULL,
  -- what the checks looked at (the page's own zones): the same text gives the same hash, so a snapshot can tell the page changed
  content_hash text,
  -- the findings of the check before the last change of the page: { checked_at, layers, findings }
  prev         jsonb
);
CREATE INDEX page_checks_checked_at_idx ON page_checks (checked_at DESC);

-- What each check cost: one row per page checked (all zero when every answer was reused) and one per model check of a snapshot's shared blocks.
CREATE TABLE check_log (
  id            bigserial PRIMARY KEY,
  at            timestamptz NOT NULL DEFAULT now(),
  kind          text NOT NULL DEFAULT 'page' CHECK (kind IN ('page', 'site_llm')),
  by            text,
  url           text NOT NULL DEFAULT '',
  model         text,
  layers        jsonb,
  tokens        jsonb,
  cost_usd      numeric NOT NULL DEFAULT 0,
  llm_calls     integer NOT NULL DEFAULT 0,
  from_snapshot boolean NOT NULL DEFAULT false
);
CREATE INDEX check_log_at_idx ON check_log (at DESC);

-- the pages of the runs of pages become page checks (the latest check of each address), then those runs are removed
INSERT INTO page_checks (slug, url, report, entry, html, zones, checked_at, checked_by, model, layers, site_run_id)
SELECT DISTINCT ON (p.url) p.slug, p.url, p.report, p.entry, p.html, p.zones, p.checked_at, r.started_by, r.model, r.layers, r.site_run_id
FROM pages p JOIN runs r ON r.id = p.run_id
WHERE r.kind = 'pages'
ORDER BY p.url, p.checked_at DESC;

INSERT INTO check_log (at, kind, by, url, model, layers, tokens, cost_usd, llm_calls)
SELECT p.checked_at, 'page', r.started_by, p.url, r.model, r.layers,
       COALESCE(r.meta->'tokens', '{"input":0,"cached_input":0,"output":0}'::jsonb),
       COALESCE((r.meta->>'cost_usd')::numeric, 0) / GREATEST((SELECT count(*) FROM pages x WHERE x.run_id = r.id), 1),
       COALESCE((r.meta->>'llm_calls')::int, 0)
FROM pages p JOIN runs r ON r.id = p.run_id
WHERE r.kind = 'pages';

DELETE FROM runs WHERE kind = 'pages';
