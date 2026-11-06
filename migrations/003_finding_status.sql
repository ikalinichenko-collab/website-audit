-- People's decisions about findings. Keyed by the stable finding id (see fidOf in src/findings.ts), not by run,
-- so a decision stays when the page is audited again. No row means the finding is open.

CREATE TABLE finding_status (
  fid       text PRIMARY KEY,
  status    text NOT NULL CHECK (status IN ('accepted', 'false_positive', 'fixed')),
  note      text,
  -- who decided; the email once sign-in exists
  set_by    text,
  set_at    timestamptz NOT NULL DEFAULT now(),
  -- what the finding was, so a decision can be read without the run
  url       text NOT NULL,
  layer     text NOT NULL,
  kind      text NOT NULL,
  title     text NOT NULL,
  zone_id   text NOT NULL DEFAULT '',
  quote     text NOT NULL DEFAULT ''
);
CREATE INDEX finding_status_url_idx ON finding_status (url);
