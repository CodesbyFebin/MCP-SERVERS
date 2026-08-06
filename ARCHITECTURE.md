# Architecture

## System Overview

MCPServer.in is built as a structured, evidence-backed, graph-driven MCP intelligence and publishing platform.

## Data Flow

```
Source Registry
      ↓
Evidence Store
      ↓
Entity Registry
      ↓
Relationship Graph
      ↓
Route Candidate Engine
      ↓
Intent Validator
      ↓
Page Contract Builder
      ↓
Content Brief Generator
      ↓
Section Compiler
      ↓
Metadata Compiler
      ↓
Schema Compiler
      ↓
Internal Linking Engine
      ↓
Quality Scoring
      ↓
Editorial Review
      ↓
Publication Engine
      ↓
Sitemaps
      ↓
Search Index
      ↓
LLM Index
      ↓
Freshness Monitor
```

## Core Modules

- `src/data/content-registry/` - Entity types, relationships, integrations
- `src/lib/content/evidence/` - Source validation, evidence passages, claim ledger, evidence gate
- `src/lib/content/generation/` - Content briefs, section compiler
- `src/lib/content/validation/` - Quality gates, duplicate detection
- `src/lib/content/sitemap/` - Sitemap generation and segmentation
- `src/lib/content/schema/` - Schema.org JSON-LD generation
- `src/lib/content/interlink/` - Graph-driven internal linking
- `src/lib/editorial/` - Editorial review workflow
- `src/lib/search/` - Search index structures
- `src/lib/multilingual/` - Locale registry and translation workflow
- `src/lib/marketplace/` - Marketplace listings and models
- `src/lib/observability/` - Pipeline metrics and build evidence

## Database Schema

Base schema: `db/schema.sql`
Extended schema: `db/schema-extended.sql`

Key tables:
- `entities` - Core entity records
- `relationships` - Typed directed relationships
- `sources` - Source registry
- `evidence_passages` - Passage-level evidence
- `claims` - Traceable claims
- `route_candidates` - Candidate URL inventory
- `page_contracts` - Page type contracts
- `editorial_reviews` - Editorial approval tracking
- `publication_runs` - Pipeline run tracking
- `build_evidence` - Build evidence records
- `marketplace_listings` - Marketplace data

## Technology

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Vercel Postgres)
- **Cache**: Redis
- **Queue**: BullMQ
- **Search**: pgvector
- **Deployment**: Vercel
