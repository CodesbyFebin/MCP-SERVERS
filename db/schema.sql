-- Run this once against the Vercel Postgres database attached to this project.
-- Vercel dashboard -> Project -> Storage -> Create Database -> Postgres,
-- then open its Query tab and paste this in (or run via `psql "$POSTGRES_URL" -f db/schema.sql`).

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (lower(email));

CREATE TABLE IF NOT EXISTS community_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id TEXT NOT NULL,
  submission_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  submitter_ip_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending_moderation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS community_submissions_post_id_idx ON community_submissions (post_id);
CREATE INDEX IF NOT EXISTS community_submissions_status_idx ON community_submissions (status);
