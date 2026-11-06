-- Editable files (company sources, prompts, config/*.json). The newest row of a resource is its current text,
-- older rows are its history. Files in the repo only seed an empty table.

CREATE TABLE resource_versions (
  resource_id text NOT NULL,
  -- sortable text id, same format the app showed for the old .history files (2026-11-05T09-12-33-123Z)
  ts          text NOT NULL,
  content     text NOT NULL,
  -- who saved it ('seed' for the first copy of a repo file); the email once sign-in exists
  author      text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (resource_id, ts)
);
