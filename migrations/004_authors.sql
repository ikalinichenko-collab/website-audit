-- Who started a run or a job: the signed-in email, null for runs from the command line and for older runs.
ALTER TABLE runs ADD COLUMN started_by text;
ALTER TABLE jobs ADD COLUMN started_by text;
