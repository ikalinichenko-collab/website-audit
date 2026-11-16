-- A run is either a snapshot of the whole site ('site': every in-scope page fetched, the site pass made) or a run of some pages
-- ('pages': no site pass of its own, it reads the latest snapshot). site_run_id is the snapshot a page run was read against.
ALTER TABLE runs ADD COLUMN kind text NOT NULL DEFAULT 'pages' CHECK (kind IN ('pages', 'site'));
ALTER TABLE runs ADD COLUMN site_run_id text REFERENCES runs (id) ON DELETE SET NULL;

UPDATE runs SET kind = 'site' WHERE options->>'kind' = 'site_scan' OR options->>'all' = 'true';
