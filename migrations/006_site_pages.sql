-- The site map: the last known free (no LLM) facts about every URL, filled by every run and by the site check.
-- A run of a few pages compares against it (duplicates against pages it did not fetch) and refreshes only its own rows.
CREATE TABLE site_pages (
  url        text PRIMARY KEY,
  final_url  text NOT NULL,
  title      text NOT NULL DEFAULT '',
  meta       text NOT NULL DEFAULT '',
  h1         text NOT NULL DEFAULT '',
  run_id     text,
  checked_at timestamptz NOT NULL
);
