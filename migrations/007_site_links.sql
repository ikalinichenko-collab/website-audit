-- Internal links found in the main content of each page (header, footer and shared template zones left out),
-- as absolute URLs without the hash and the trailing slash: the site map's link graph for inbound counts and orphan pages.
-- NULL means the page was fetched before links were stored.
ALTER TABLE site_pages ADD COLUMN links_out jsonb;
