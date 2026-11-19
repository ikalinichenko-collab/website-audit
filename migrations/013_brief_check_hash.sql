-- The hash of the page's own text (page_checks.content_hash) the brief check was made from: the list of checked pages tells that
-- a brief check is out of date when the page text changed since, without working out all the facts of every page.
ALTER TABLE brief_checks ADD COLUMN content_hash text;
