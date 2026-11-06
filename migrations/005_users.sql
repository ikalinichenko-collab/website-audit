-- People who signed in: the short name shown in the app ("Igor K."). The email stays the identity stored on runs,
-- versions and decisions; names are looked up when those are read, so a new name applies to old records too.
CREATE TABLE users (
  email     text PRIMARY KEY,
  display   text NOT NULL,
  last_seen timestamptz NOT NULL DEFAULT now()
);
