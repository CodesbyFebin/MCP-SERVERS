-- Evidence persistence schema
-- Run after db/schema.sql

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  url TEXT NOT NULL,
  publisher TEXT NOT NULL,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  freshness_days INTEGER NOT NULL DEFAULT 365,
  credibility TEXT NOT NULL DEFAULT 'community',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence_passages (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES sources(id),
  text TEXT NOT NULL,
  locator TEXT,
  content_hash TEXT NOT NULL,
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  statement TEXT NOT NULL,
  claim_type TEXT NOT NULL,
  evidence_passage_ids TEXT[] NOT NULL DEFAULT '{}',
  confidence NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'supported',
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS relationships (
  id TEXT PRIMARY KEY,
  from_entity_id TEXT NOT NULL,
  to_entity_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  evidence_ids TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  route TEXT NOT NULL,
  page_type TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  sections JSONB NOT NULL DEFAULT '[]',
  metadata JSONB NOT NULL DEFAULT '{}',
  schema JSONB NOT NULL DEFAULT '{}',
  quality_score NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  content_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_validation_results (
  id TEXT PRIMARY KEY,
  draft_id TEXT NOT NULL REFERENCES drafts(id),
  passed BOOLEAN NOT NULL,
  score NUMERIC NOT NULL,
  failures TEXT[] NOT NULL DEFAULT '{}',
  warnings TEXT[] NOT NULL DEFAULT '{}',
  validated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_evidence_passages_source_id ON evidence_passages (source_id);
CREATE INDEX IF NOT EXISTS idx_claims_entity_id ON claims (entity_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims (status);
CREATE INDEX IF NOT EXISTS idx_relationships_from_entity ON relationships (from_entity_id);
CREATE INDEX IF NOT EXISTS idx_relationships_to_entity ON relationships (to_entity_id);
CREATE INDEX IF NOT EXISTS idx_drafts_entity_id ON drafts (entity_id);
CREATE INDEX IF NOT EXISTS idx_drafts_locale ON drafts (locale);
CREATE INDEX IF NOT EXISTS idx_drafts_status ON drafts (status);
