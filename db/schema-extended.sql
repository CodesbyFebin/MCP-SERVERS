-- MCPServer.in Knowledge Graph and Evidence Persistence Schema
-- Extends the base schema with entity registry, evidence store, claim ledger,
-- relationship graph, route inventory, page contracts, and publication pipeline.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS entities (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  summary TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'candidate',
  metadata JSONB NOT NULL DEFAULT '{}',
  capabilities JSONB NOT NULL DEFAULT '{}',
  quality JSONB NOT NULL DEFAULT '{}',
  sources TEXT[] DEFAULT '{}',
  claim_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS entities_type_idx ON entities (type);
CREATE INDEX IF NOT EXISTS entities_status_idx ON entities (status);
CREATE INDEX IF NOT EXISTS entities_slug_idx ON entities (slug);
CREATE INDEX IF NOT EXISTS entities_metadata_idx ON entities USING GIN (metadata);

CREATE TABLE IF NOT EXISTS relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  target_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  confidence NUMERIC NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS relationships_source_idx ON relationships (source_id);
CREATE INDEX IF NOT EXISTS relationships_target_idx ON relationships (target_id);
CREATE INDEX IF NOT EXISTS relationships_type_idx ON relationships (type);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  publisher TEXT,
  source_type TEXT NOT NULL,
  retrieved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  authority_score NUMERIC NOT NULL DEFAULT 0,
  freshness_score NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX IF NOT EXISTS sources_domain_idx ON sources (domain);
CREATE INDEX IF NOT EXISTS sources_status_idx ON sources (status);
CREATE INDEX IF NOT EXISTS sources_source_type_idx ON sources (source_type);

CREATE TABLE IF NOT EXISTS evidence_passages (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  locator TEXT,
  content_hash TEXT NOT NULL,
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS evidence_passages_source_idx ON evidence_passages (source_id);
CREATE INDEX IF NOT EXISTS evidence_passages_hash_idx ON evidence_passages (content_hash);

CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  statement TEXT NOT NULL,
  claim_type TEXT NOT NULL,
  evidence_passage_ids TEXT[] DEFAULT '{}',
  confidence NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'supported',
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS claims_entity_idx ON claims (entity_id);
CREATE INDEX IF NOT EXISTS claims_status_idx ON claims (status);
CREATE INDEX IF NOT EXISTS claims_claim_type_idx ON claims (claim_type);

CREATE TABLE IF NOT EXISTS route_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL UNIQUE,
  entity_id TEXT REFERENCES entities(id) ON DELETE SET NULL,
  page_type TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'candidate',
  intent_score NUMERIC,
  entity_completeness NUMERIC,
  evidence_sufficiency NUMERIC,
  information_gain NUMERIC,
  duplication_risk NUMERIC,
  maintenance_cost NUMERIC,
  translation_suitability NUMERIC,
  commercial_value NUMERIC,
  editorial_priority NUMERIC,
  overall_score NUMERIC,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS route_candidates_status_idx ON route_candidates (status);
CREATE INDEX IF NOT EXISTS route_candidates_entity_idx ON route_candidates (entity_id);
CREATE INDEX IF NOT EXISTS route_candidates_locale_idx ON route_candidates (locale);
CREATE INDEX IF NOT EXISTS route_candidates_overall_score_idx ON route_candidates (overall_score);

CREATE TABLE IF NOT EXISTS page_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL UNIQUE,
  page_type TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  sections JSONB NOT NULL DEFAULT '[]',
  word_target INTEGER NOT NULL DEFAULT 2000,
  required_elements JSONB NOT NULL DEFAULT '[]',
  schema_types TEXT[] DEFAULT '{}',
  quality_thresholds JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_contracts_route_idx ON page_contracts (route);
CREATE INDEX IF NOT EXISTS page_contracts_page_type_idx ON page_contracts (page_type);

CREATE TABLE IF NOT EXISTS editorial_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id TEXT REFERENCES entities(id) ON DELETE CASCADE,
  route TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewer_id TEXT,
  reviewed_at TIMESTAMPTZ,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS editorial_reviews_status_idx ON editorial_reviews (status);
CREATE INDEX IF NOT EXISTS editorial_reviews_entity_idx ON editorial_reviews (entity_id);

CREATE TABLE IF NOT EXISTS publication_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running',
  pages_published INTEGER NOT NULL DEFAULT 0,
  pages_rejected INTEGER NOT NULL DEFAULT 0,
  evidence_failures INTEGER NOT NULL DEFAULT 0,
  duplicate_matches INTEGER NOT NULL DEFAULT 0,
  translation_failures INTEGER NOT NULL DEFAULT 0,
  build_duration_ms INTEGER,
  metadata JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS build_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  build_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  entity_count INTEGER NOT NULL DEFAULT 0,
  page_count INTEGER NOT NULL DEFAULT 0,
  sitemap_count INTEGER NOT NULL DEFAULT 0,
  index_count INTEGER NOT NULL DEFAULT 0,
  quality_gate_results JSONB NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS marketplace_listings (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  provider_id TEXT NOT NULL,
  listing_type TEXT NOT NULL,
  pricing_model TEXT NOT NULL,
  price NUMERIC,
  currency TEXT,
  trial_available BOOLEAN NOT NULL DEFAULT FALSE,
  regions TEXT[] DEFAULT '{}',
  sla TEXT,
  support_level TEXT,
  security_review_id TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS marketplace_listings_entity_idx ON marketplace_listings (entity_id);
CREATE INDEX IF NOT EXISTS marketplace_listings_status_idx ON marketplace_listings (status);
CREATE INDEX IF NOT EXISTS marketplace_listings_listing_type_idx ON marketplace_listings (listing_type);
