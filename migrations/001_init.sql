-- Audit results. A page row is written as soon as the page is done, so a running audit can be read.

CREATE TABLE runs (
  id          text PRIMARY KEY,
  status      text NOT NULL CHECK (status IN ('running', 'done', 'stopped', 'error', 'interrupted')),
  started_at  timestamptz NOT NULL,
  ended_at    timestamptz,
  model       text,
  layers      jsonb,
  options     jsonb,
  -- RunMeta (counts, tokens, cost), written when the run ends
  meta        jsonb,
  site        jsonb,
  site_sources jsonb,
  -- site-wide JSON-LD fingerprints of this run (multi-page runs only)
  fingerprints jsonb
);

CREATE TABLE pages (
  run_id  text NOT NULL REFERENCES runs (id) ON DELETE CASCADE,
  slug    text NOT NULL,
  url     text NOT NULL,
  report  jsonb NOT NULL,
  -- PageIndexEntry: counts for the page list, recomputed when the run ends (site checks can change them)
  entry   jsonb NOT NULL,
  html    text NOT NULL,
  zones   jsonb NOT NULL,
  checked_at timestamptz NOT NULL,
  PRIMARY KEY (run_id, slug)
);
CREATE INDEX pages_url_idx ON pages (url, checked_at DESC);

CREATE TABLE jobs (
  id          bigserial PRIMARY KEY,
  status      text NOT NULL CHECK (status IN ('running', 'done', 'error', 'stopped', 'interrupted')),
  started_at  timestamptz NOT NULL,
  ended_at    timestamptz,
  options     jsonb NOT NULL,
  log         jsonb NOT NULL DEFAULT '[]',
  run_id      text,
  error       text,
  stop_requested boolean NOT NULL DEFAULT false
);

-- small key-value state: site-wide fingerprints of the last multi-page run, reused by single-page runs
CREATE TABLE kv (
  key   text PRIMARY KEY,
  value jsonb NOT NULL
);
