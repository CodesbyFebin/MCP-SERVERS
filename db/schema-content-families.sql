-- MCPServer.in Content Families Schema Extension
-- Adds tables to track all 15+ content family types defined in the SEO content template.
-- Run after schema.sql and schema-extended.sql.
--
-- Usage:
--   psql "$POSTGRES_URL" -f db/schema-content-families.sql

-- ─────────────────────────────────────────
-- 1. Content families catalogue
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_families (
  id            TEXT PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  url_prefix    TEXT NOT NULL,
  schema_types  TEXT[]  DEFAULT '{}',
  word_target   INTEGER NOT NULL DEFAULT 2000,
  refresh_days  INTEGER NOT NULL DEFAULT 90,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO content_families (id, slug, name, description, url_prefix, schema_types, word_target, refresh_days)
VALUES
  ('cf:servers',        'servers',        'MCP Server Profiles',       'Directory profiles for individual MCP servers',                       '/servers',        ARRAY['WebPage','SoftwareApplication','BreadcrumbList'],     2000, 90),
  ('cf:integrations',   'integrations',   'Integration Guides',        'How-to guides connecting a platform to an MCP client',                '/integrations',   ARRAY['TechArticle','BreadcrumbList'],                        2500, 90),
  ('cf:tutorials',      'tutorials',      'Tutorials',                 'Step-by-step build guides for MCP servers',                           '/tutorials',      ARRAY['TechArticle','BreadcrumbList'],                        2500, 90),
  ('cf:compare',        'compare',        'Comparison Pages',          'Side-by-side comparisons of two MCP-related entities',                '/compare',        ARRAY['Article','BreadcrumbList'],                            2000, 90),
  ('cf:best',           'best',           'Best-of Lists',             'Curated ranked lists of MCP servers by use case',                     '/best',           ARRAY['ItemList','Article','BreadcrumbList'],                 1500, 60),
  ('cf:glossary',       'glossary',       'Glossary',                  'Canonical definitions for every MCP protocol term',                   '/glossary',       ARRAY['DefinedTerm','WebPage','BreadcrumbList'],              800,  180),
  ('cf:troubleshoot',   'troubleshoot',   'Troubleshooting Guides',    'Diagnostic guides for common MCP errors and failure modes',           '/troubleshooting',ARRAY['TechArticle','BreadcrumbList'],                        1500, 60),
  ('cf:security',       'security',       'Security Guides',           'MCP server security, authentication, and threat model guides',        '/security',       ARRAY['TechArticle','BreadcrumbList'],                        2000, 60),
  ('cf:sdk',            'sdk',            'SDK Guides',                'Developer guides for every MCP SDK language',                         '/sdk',            ARRAY['TechArticle','SoftwareSourceCode','BreadcrumbList'],   3000, 90),
  ('cf:frameworks',     'frameworks',     'Framework Guides',          'Guides for MCP frameworks (FastMCP, LangChain, Spring AI, etc.)',      '/frameworks',     ARRAY['TechArticle','SoftwareSourceCode','BreadcrumbList'],   2500, 90),
  ('cf:clients',        'clients',        'AI Client Guides',          'Setup and configuration guides for each MCP-compatible AI client',    '/clients',        ARRAY['TechArticle','BreadcrumbList'],                        2000, 90),
  ('cf:deployment',     'deployment',     'Deployment Guides',         'Platform-specific deployment guides (Docker, AWS, Vercel, etc.)',      '/deployment',     ARRAY['TechArticle','BreadcrumbList'],                        2500, 90),
  ('cf:enterprise',     'enterprise',     'Enterprise Guides',         'Enterprise architecture, governance, and compliance guides',          '/enterprise',     ARRAY['TechArticle','BreadcrumbList'],                        3000, 180),
  ('cf:examples',       'examples',       'Example Projects',          'Complete, runnable MCP example projects with source code',            '/examples',       ARRAY['SoftwareSourceCode','CreativeWork','BreadcrumbList'],  2000, 90),
  ('cf:templates',      'templates',      'Boilerplate Templates',     'Reusable MCP server starter templates',                              '/templates',      ARRAY['SoftwareSourceCode','CreativeWork','BreadcrumbList'],  1500, 180),
  ('cf:news',           'news',           'News and Release Coverage', 'MCP ecosystem news, SDK releases, and protocol updates',             '/news',           ARRAY['NewsArticle','BreadcrumbList'],                        800,  30)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- 2. Extended content records
--    One row per publishable page across all families.
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_records (
  id                    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id             TEXT    NOT NULL REFERENCES content_families(id) ON DELETE RESTRICT,
  entity_id             TEXT    REFERENCES entities(id) ON DELETE SET NULL,
  slug                  TEXT    NOT NULL,
  route                 TEXT    NOT NULL UNIQUE,
  canonical_url         TEXT    NOT NULL,

  -- Metadata (from the universal page metadata spec)
  title                 TEXT    NOT NULL DEFAULT '',
  seo_title             TEXT    NOT NULL DEFAULT '',
  meta_description      TEXT    NOT NULL DEFAULT '',
  primary_keyword       TEXT    NOT NULL DEFAULT '',
  secondary_keywords    TEXT[]  DEFAULT '{}',
  search_intent         TEXT    NOT NULL DEFAULT 'informational',
  breadcrumb_path       JSONB   NOT NULL DEFAULT '[]',

  -- Entity relationships
  primary_entity        TEXT    NOT NULL DEFAULT '',
  secondary_entities    TEXT[]  DEFAULT '{}',
  protocol_version      TEXT,
  sdk_version           TEXT,

  -- Content spec
  difficulty            TEXT,   -- beginner | intermediate | advanced
  estimated_time        TEXT,
  prerequisites         TEXT[]  DEFAULT '{}',
  related_pages         TEXT[]  DEFAULT '{}',
  faq_questions         TEXT[]  DEFAULT '{}',

  -- Publication workflow
  publication_status    TEXT    NOT NULL DEFAULT 'candidate',
  -- candidate → intent_validated → evidence_complete → blueprint_approved
  -- → generated_draft → automated_validation → human_review → publish_approved → published → indexed
  workflow_stage        TEXT    NOT NULL DEFAULT 'candidate',
  content_hash          TEXT    NOT NULL DEFAULT '',
  word_count            INTEGER NOT NULL DEFAULT 0,
  quality_score         NUMERIC,
  quality_details       JSONB   NOT NULL DEFAULT '{}',

  -- Evidence
  evidence_source_ids   TEXT[]  DEFAULT '{}',
  evidence_last_checked TIMESTAMPTZ,

  -- Schema
  schema_profile        JSONB   NOT NULL DEFAULT '{}',
  schema_types          TEXT[]  DEFAULT '{}',

  -- Attribution
  author                TEXT    NOT NULL DEFAULT 'MCPServer.in Editorial',
  reviewer              TEXT,
  blueprint             JSONB   NOT NULL DEFAULT '{}',

  -- Refresh policy
  refresh_days          INTEGER NOT NULL DEFAULT 90,
  next_refresh_at       TIMESTAMPTZ,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at          TIMESTAMPTZ,
  indexed_at            TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS content_records_family_idx    ON content_records (family_id);
CREATE INDEX IF NOT EXISTS content_records_entity_idx    ON content_records (entity_id);
CREATE INDEX IF NOT EXISTS content_records_slug_idx      ON content_records (slug);
CREATE INDEX IF NOT EXISTS content_records_status_idx    ON content_records (publication_status);
CREATE INDEX IF NOT EXISTS content_records_stage_idx     ON content_records (workflow_stage);
CREATE INDEX IF NOT EXISTS content_records_keyword_idx   ON content_records (primary_keyword);
CREATE INDEX IF NOT EXISTS content_records_intent_idx    ON content_records (search_intent);
CREATE INDEX IF NOT EXISTS content_records_refresh_idx   ON content_records (next_refresh_at);

-- ─────────────────────────────────────────
-- 3. Workflow transition log
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workflow_transitions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID NOT NULL REFERENCES content_records(id) ON DELETE CASCADE,
  from_stage      TEXT NOT NULL,
  to_stage        TEXT NOT NULL,
  actor           TEXT NOT NULL DEFAULT 'system',
  notes           TEXT NOT NULL DEFAULT '',
  metadata        JSONB NOT NULL DEFAULT '{}',
  transitioned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workflow_transitions_content_idx ON workflow_transitions (content_id);
CREATE INDEX IF NOT EXISTS workflow_transitions_stage_idx   ON workflow_transitions (to_stage);

-- ─────────────────────────────────────────
-- 4. Blueprint approvals
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blueprint_approvals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID NOT NULL REFERENCES content_records(id) ON DELETE CASCADE,
  blueprint       JSONB NOT NULL DEFAULT '{}',
  approved_by     TEXT NOT NULL,
  approved_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes           TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS blueprint_approvals_content_idx ON blueprint_approvals (content_id);

-- ─────────────────────────────────────────
-- 5. Generation jobs
--    Tracks AI-assisted draft generation attempts.
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS generation_jobs (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID    NOT NULL REFERENCES content_records(id) ON DELETE CASCADE,
  model           TEXT    NOT NULL DEFAULT 'gemini',
  prompt_hash     TEXT    NOT NULL DEFAULT '',
  status          TEXT    NOT NULL DEFAULT 'queued',
  -- queued | running | completed | failed | skipped
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  output_path     TEXT,
  word_count      INTEGER,
  quality_score   NUMERIC,
  error_message   TEXT,
  cost_tokens     INTEGER NOT NULL DEFAULT 0,
  metadata        JSONB   NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS generation_jobs_content_idx  ON generation_jobs (content_id);
CREATE INDEX IF NOT EXISTS generation_jobs_status_idx   ON generation_jobs (status);

-- ─────────────────────────────────────────
-- 6. Automated validation results
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS validation_results (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID    NOT NULL REFERENCES content_records(id) ON DELETE CASCADE,
  validator       TEXT    NOT NULL,
  -- seo | aeo | geo | schema | duplicate | links | freshness | editorial_safety | quality_gate
  passed          BOOLEAN NOT NULL,
  score           NUMERIC,
  details         JSONB   NOT NULL DEFAULT '{}',
  run_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS validation_results_content_idx   ON validation_results (content_id);
CREATE INDEX IF NOT EXISTS validation_results_validator_idx ON validation_results (validator);
CREATE INDEX IF NOT EXISTS validation_results_passed_idx    ON validation_results (passed);

-- ─────────────────────────────────────────
-- 7. Internal link map
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS internal_link_map (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  source_route    TEXT    NOT NULL,
  target_route    TEXT    NOT NULL,
  anchor_text     TEXT    NOT NULL DEFAULT '',
  link_type       TEXT    NOT NULL DEFAULT 'contextual',
  -- contextual | pillar | category | sibling | glossary | troubleshoot | security | commercial
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_route, target_route, anchor_text)
);

CREATE INDEX IF NOT EXISTS link_map_source_idx ON internal_link_map (source_route);
CREATE INDEX IF NOT EXISTS link_map_target_idx ON internal_link_map (target_route);

-- ─────────────────────────────────────────
-- 8. Refresh queue
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refresh_queue (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID    NOT NULL REFERENCES content_records(id) ON DELETE CASCADE,
  trigger_reason  TEXT    NOT NULL,
  -- schedule | protocol_revision | sdk_release | security_advisory | performance_decline | manual
  priority        INTEGER NOT NULL DEFAULT 5,
  due_at          TIMESTAMPTZ NOT NULL,
  claimed_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  status          TEXT    NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS refresh_queue_due_idx    ON refresh_queue (due_at);
CREATE INDEX IF NOT EXISTS refresh_queue_status_idx ON refresh_queue (status);
