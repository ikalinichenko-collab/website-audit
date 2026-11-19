-- The content brief of a page: one CSV file per page, uploaded on the Brief tab of the page.
-- The rows are kept as parsed (a list of cells per CSV row), the original text as uploaded.
-- A new upload is a new version; the newest row of a page is its current brief. Keyed by the page slug, not tied
-- to page_checks, so the brief stays when the checked page is removed.
CREATE TABLE page_briefs (
  id          bigserial PRIMARY KEY,
  slug        text NOT NULL,
  -- the address of the page when the brief was uploaded
  url         text NOT NULL,
  filename    text NOT NULL,
  content     text NOT NULL,
  -- string[][]: one array of cells per CSV row, row number = index + 1
  rows        jsonb NOT NULL,
  uploaded_by text,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_briefs_slug_idx ON page_briefs (slug, id DESC);
