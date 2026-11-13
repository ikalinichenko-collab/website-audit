-- A listing page (it links to <listing>/page/2/): reached from the menu and linking to its items, never reported as an orphan.
ALTER TABLE site_pages ADD COLUMN listing boolean NOT NULL DEFAULT false;
