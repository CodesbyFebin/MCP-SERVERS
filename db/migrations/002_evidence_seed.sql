-- Seed initial data for evidence-backed publishing
-- Run after db/migrations/001_evidence_schema.sql

INSERT INTO sources (id, title, source_type, url, publisher, captured_at, freshness_days, credibility, status)
VALUES
  ('source:mcpserver-seed-registry', 'MCPServer.in curated seed registry', 'internal-editorial-record', 'internal:mcpserver-seed-registry', 'MCPServer.in Editorial', '2026-07-29', 365, 'editorial-seed', 'active'),
  ('source:model-context-protocol-docs', 'Model Context Protocol documentation', 'primary-documentation', 'https://modelcontextprotocol.io', 'Model Context Protocol', '2026-07-29', 90, 'primary', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO evidence_passages (id, source_id, text, locator, content_hash, extracted_at, valid_until, status)
SELECT
  'evidence:server:postgres:seed-record',
  'source:mcpserver-seed-registry',
  'PostgreSQL has a curated MCPServer.in seed record with category "Database", authentication model "API Key", use cases, related servers, and feature notes.',
  'internal:seed:postgres',
  'sha256:' || md5('postgres-seed-record'),
  now(),
  '2027-07-29',
  'active'
WHERE NOT EXISTS (SELECT 1 FROM evidence_passages WHERE id = 'evidence:server:postgres:seed-record');

INSERT INTO evidence_passages (id, source_id, text, locator, content_hash, extracted_at, valid_until, status)
SELECT
  'evidence:server:postgres:protocol-context',
  'source:model-context-protocol-docs',
  'The Model Context Protocol documentation defines the protocol context for exposing tools, resources, prompts, and capabilities to MCP clients.',
  'https://modelcontextprotocol.io',
  'sha256:' || md5('protocol-context-postgres'),
  now(),
  '2026-10-27',
  'active'
WHERE NOT EXISTS (SELECT 1 FROM evidence_passages WHERE id = 'evidence:server:postgres:protocol-context');

INSERT INTO claims (id, entity_id, statement, claim_type, evidence_passage_ids, confidence, status, expires_at)
SELECT
  'claim:server:postgres:directory-record',
  'server:postgres',
  'PostgreSQL MCP Server is listed as a Database MCP server profile in the MCPServer.in seed registry.',
  'directory-field',
  ARRAY['evidence:server:postgres:seed-record'],
  1.0,
  'supported',
  '2027-07-29'
WHERE NOT EXISTS (SELECT 1 FROM claims WHERE id = 'claim:server:postgres:directory-record');

INSERT INTO claims (id, entity_id, statement, claim_type, evidence_passage_ids, confidence, status, expires_at)
SELECT
  'claim:server:postgres:auth-model',
  'server:postgres',
  'PostgreSQL MCP Server requires the credential model recorded as: API Key.',
  'security-note',
  ARRAY['evidence:server:postgres:seed-record'],
  1.0,
  'supported',
  '2027-07-29'
WHERE NOT EXISTS (SELECT 1 FROM claims WHERE id = 'claim:server:postgres:auth-model');

INSERT INTO claims (id, entity_id, statement, claim_type, evidence_passage_ids, confidence, status, expires_at)
SELECT
  'claim:server:postgres:protocol-context',
  'server:postgres',
  'PostgreSQL MCP Server is described in the context of MCP tools, resources, prompts, and client capabilities.',
  'protocol-context',
  ARRAY['evidence:server:postgres:protocol-context'],
  1.0,
  'supported',
  '2026-10-27'
WHERE NOT EXISTS (SELECT 1 FROM claims WHERE id = 'claim:server:postgres:protocol-context');

INSERT INTO relationships (id, from_entity_id, to_entity_id, relationship_type, evidence_ids, status)
SELECT
  'relationship:postgres:category:database',
  'server:postgres',
  'category:database',
  'belongs_to_category',
  ARRAY['evidence:server:postgres:seed-record'],
  'active'
WHERE NOT EXISTS (SELECT 1 FROM relationships WHERE id = 'relationship:postgres:category:database');
