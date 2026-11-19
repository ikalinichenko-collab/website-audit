-- The result of checking a page against its brief: one row per page and source (the checked page, or a page of a snapshot).
-- The same brief version, the same page text and the same model give the same key, so a repeat asks the model nothing.
CREATE TABLE brief_checks (
  slug        text NOT NULL,
  -- '' for the checked page, else the snapshot run id the page was read from
  source      text NOT NULL DEFAULT '',
  brief_id    bigint NOT NULL,
  -- hash of the brief rows, the page zones and facts, the prompt, the model and the language
  hash        text NOT NULL,
  model       text NOT NULL,
  result      jsonb NOT NULL,
  usage       jsonb NOT NULL,
  cost_usd    numeric NOT NULL DEFAULT 0,
  checked_at  timestamptz NOT NULL DEFAULT now(),
  checked_by  text,
  PRIMARY KEY (slug, source)
);

-- the cost of a check against a brief goes to the same log as the other model checks
ALTER TABLE check_log DROP CONSTRAINT check_log_kind_check;
ALTER TABLE check_log ADD CONSTRAINT check_log_kind_check CHECK (kind IN ('page', 'site_llm', 'brief'));
