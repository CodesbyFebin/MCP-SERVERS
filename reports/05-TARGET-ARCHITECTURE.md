# Target Architecture Report

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** COMPLETE  

## Overview

This report defines the target architecture for the MCP Server platform, integrating the canonical public-site repository (`CodesbyFebin/MCP-SERVERS`), the migration/reference sources (`CodesbyFebin/MCP-SERVER` and `CodesbyFebin/mcp-servers-master`), and the live production site (`www.mcpserver.in`).

## Core Architecture Principles

1. **Single Publication Predicate:** All pages, search, sitemaps, registries, APIs, and LLM surfaces (`llms.txt`, `llms-full.txt`) must derive from one publication projection. No fragmented or competing predicates.

2. **Claim-Specific Evidence:** Unknown claims remain unknown. Verification does not imply safety, compliance, approval, or regulatory status.

3. **Canonical Host Policy:** `https://www.mcpserver.in/` with trailing slash is the canonical host. One-hop apex/HTTP normalization to this canonical form.

4. **Machine-Readable Surfaces:** `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `registry.json` must all derive from the same canonical publication projection as visible pages.

5. **Discovery-First Public Site:** `www.mcpserver.in` focused on discovery, evidence, knowledge, SEO/AEO/GEO, and public registries.

6. **Approval-Focused App Site:** `app.mcpserver.in` (currently returns 404, reserved for future use) focused on approvals, deployment, governance, runtime, observability, audit, and recovery.

## System Architecture

```mermaid
graph TD
    A[Source Repositories] -->|MCP-SERVERS (master)| B[Canonical Public Site]
    A -->|MCP-SERVER (main/production)| C[Migration Reference]
    A -->|mcp-servers-master (production)| D[Reference Architecture]
    B -->|SSG/ISR| E[Live www.mcpserver.in]
    C -->|Future| |E|
    D -->|Future| |E|
    E -->|robots.txt| F[Crawler Policy]
    E -->|sitemap.xml| G[Sitemap Index]
    E -->|llms.txt| H[LLM Core Surface]
    E -->|llms-full.txt| I[LLM Full Surface]
    E -->|registry.json| J[Server Registry]
    F -->|Crawl Control| K[Search Engines & AI Crawlers]
    G -->|Discovery| K
    H -->|LLM Ingestion| L[LLM Providers]
    I -->|Full Context| L
    J -->|Server Data| M[External Consumers]
```

## Technology Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Framework** | Next.js 16 App Router | `distDir: "dist"`, `output: "standalone"`, trailing slashes enforced |
| **Language** | TypeScript | End-to-end type safety |
| **Styling** | Tailwind CSS | v3.x / v4.x compatible |
| **Database** | PostgreSQL (Vercel Postgres) | `db/schema.sql` base, `db/schema-extended.sql` extended |
| **Cache** | Redis | Pipeline metrics and build evidence |
| **Queue** | BullMQ | Background job processing |
| **Search** | pgvector | Vector similarity search |
| **Deployment** | Vercel | Production deployments |
| **CI/CD** | GitHub Actions | Branch-protected, PR-required for master |

## Data Flow Architecture

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

## Route Architecture

### Canonical Routes (KEEP_INDEXED)

| Route Family | Example | Status |
|-------------|---------|--------|
| `/` | `https://www.mcpserver.in/` | KEEP_INDEXED |
| `/mcp-server/` | `https://www.mcpserver.in/mcp-server/` | KEEP_INDEXED |
| `/mcp-architecture/` | `https://www.mcpserver.in/mcp-architecture/` | KEEP_INDEXED |
| `/mcp-client/` | `https://www.mcpserver.in/mcp-client/` | KEEP_INDEXED |
| `/mcp-server-directory/` | `https://www.mcpserver.in/mcp-server-directory/` | KEEP_INDEXED |
| `/how-to-build-mcp-server/` | `https://www.mcpserver.in/how-to-build-mcp-server/` | KEEP_INDEXED |
| `/categories/` | `https://www.mcpserver.in/categories/` | KEEP_INDEXED |
| `/guides/` | `https://www.mcpserver.in/guides/` | KEEP_INDEXED |
| `/servers/` | `https://www.mcpserver.in/servers/` | KEEP (no indexable servers) |
| `/glossary/` | `https://www.mcpserver.in/glossary/` | KEEP_INDEXED |
| `/evidence/` | `https://www.mcpserver.in/evidence/` | KEEP_INDEXED |
| `/methodology/` | `https://www.mcpserver.in/methodology/` | KEEP_INDEXED |
| `/capabilities/` | `https://www.mcpserver.in/capabilities/` | KEEP_INDEXED |
| `/pillars/` | `https://www.mcpserver.in/pillars/` | KEEP_INDEXED |
| `/clients/` | `https://www.mcpserver.in/clients/` | KEEP_INDEXED |
| `/integrations/` | `https://www.mcpserver.in/integrations/` | KEEP_INDEXED |
| `/templates/` | `https://www.mcpserver.in/templates/` | KEEP_INDEXED |
| `/compare/` | `https://www.mcpserver.in/compare/` | KEEP_INDEXED |
| `/learn/` | `https://www.mcpserver.in/learn/` | KEEP_INDEXED |
| `/troubleshooting/` | `https://www.mcpserver.in/troubleshooting/` | KEEP_INDEXED |
| `/best/` | `https://www.mcpserver.in/best/` | KEEP_INDEXED |
| `/benchmarks/` | `https://www.mcpserver.in/benchmarks/` | KEEP_INDEXED |
| `/deployment/` | `https://www.mcpserver.in/deployment/` | KEEP_INDEXED |
| `/security/` | `https://www.mcpserver.in/security/` | KEEP_INDEXED |
| `/about/` | `https://www.mcpserver.in/about/` | KEEP_INDEXED |
| `/contact/` | `https://www.mcpserver.in/contact/` | KEEP (low priority) |

### Noindex Routes

| Route | Disposition | Notes |
|-------|-------------|-------|
| `/admin/` | NOINDEX | Internal administration |
| `/api/` | NOINDEX (partial) | Health endpoint exempt; other API routes noindex |
| `/drafts/` | NOINDEX | Draft content |
| `/internal/` | NOINDEX | Internal tooling |
| `/profile/` | NOINDEX | User profiles |
| `/register/` | NOINDEX | Registration flows |
| `/login/` | NOINDEX | Authentication flows |
| `/checkout/` | NOINDEX | Checkout processes |

### 404 / Not Found Routes (Live Probes)

| Route | Live Status | Notes |
|-------|-------------|-------|
| `/server/model-context-protocol` | 404 | Legacy, not in current architecture |
| `/docs/mcp-server` | 404 | Docs section removed/restructured |
| `/docs/getting-started` | 404 | Relocated to `/learn/model-context-protocol` |
| `/blog/getting-started` | 404 | Relocated to `/learn/model-context-protocol` |
| `/servers/github-mcp-server` | 404 | No indexable servers listed |
| `/blog/getting-started` | 404 | Moved to `/learn/model-context-protocol` |

## Publication Workflow

1. **Candidate Generation:** 5000 MCP server profile candidates + additional content candidates generated from source repositories
2. **Intent Validation:** Each candidate undergoes intent validation against primary entity and keyword
3. **Evidence Completion:** Evidence passages, claim ledger, and entity graph connections required
4. **Schema Validation:** Schema.org JSON-LD generation and validation
5. **Internal Linking Validation:** Graph-driven internal linking structure verification
6. **Code Verification:** MCP server code signatures and deployment records verified
7. **Claim Integrity:** Similarity and integrity checks against existing content
8. **Publish Approval:** `publish_approved: true` required for sitemap inclusion and indexability
9. **Indexable Status:** `indexable: true` required after publish approval and quality gate passage
10. **Publication Engine:** Generates sitemaps, registry JSONs, and LLM surfaces

## Sitemap Architecture

- **Sitemap Index:** `https://www.mcpserver.in/sitemap-index.xml`
- **Partitioned Sitemaps:** By content family (mcp-server-profile, integration-guide, client-integration-guide, tutorial, troubleshooting, comparison, best-list, category-hub, glossary, enterprise-guide, sdk-framework-guide, client-guide, deployment-guide, database-guide, security-guide, template, example-project, registry-guide, india-guide, news-release)
- **Sitemap Enablement Condition:** `publish_approved && published && indexable`
- **Current Status:** All 5000 candidates start with `indexable=false`; sitemaps populated as candidates pass quality gates

## robots.txt Architecture

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /drafts/
Disallow: /internal/
Disallow: /admin/
Disallow: /profile/
Disallow: /register/
Disallow: /login/
Disallow: /*?

GPTBot: /
ClaudeBot: /
PerplexityBot: /

Sitemap: https://www.mcpserver.in/sitemap.xml
```

## LLM Surface Architecture

### llms.txt (Core Pages)

Lists essential authority pages for LLM ingestion:
- `/servers`, `/pillars`, `/categories`, `/capabilities`
- `/clients`, `/clients/claude-code`
- `/evidence`, `/methodology`
- `/editorial-policy`, `/about`
- `/learn/model-context-protocol`, `/learn/mcp-server`, `/learn/mcp-client`, `/learn/mcp-architecture`

### llms-full.txt (Full Content)

- **Generated:** `2026-09-09T00:03:13.648Z`
- **Editorial Entries:** 82
- **Verified Servers:** 0
- **Content:** Full editorial nodes and server directory entries

## Quality Gates & Thresholds

| Gate | Threshold | Status |
|------|-----------|--------|
| Intent Validated | true | Required |
| Evidence Complete | true | Required |
| Schema Validated | true | Required |
| Internal Links Validated | true | Required |
| Code Verified | true | Required |
| Claim Integrity Passed | true | Required |
| Similarity Passed | variable | Per-content review |
| Publish Approved | false → true (after review) | Gate to indexability |
| Indexable | false → true (after publish approval) | Sitemap inclusion |

## Critical Context

- **Canonical Host:** `https://www.mcpserver.in/` (one-hop redirect from apex, HTTP, and non-www variants)
- **Trailing Slash Policy:** Enforced (`true`) across all canonical routes
- **Branch Structure:** `MCP-SERVERS` (master), `MCP-SERVER` (main/production), `mcp-servers-master` (production/main/qa/master)
- **Live Health SHA:** `d80c461505304679b12c1ce225b6d1d0dc501ff9` (does not match any GitHub HEAD)
- **Indexation Status:** `ROUTE_REGISTRY.json` has `indexed_candidates: 0`; live site has 82 editorial nodes and 0 verified servers
- **GSC Status:** No GSC API token available; IndexNow used for submissions (1181 URLs)
- **Quality Score:** Overall 86/100; Content Quality: 5/10 (below threshold - remediation needed)

## Recommendations

1. **Enforce Single Publication Predicate:** Ensure all surfaces (HTML, sitemap, registry, LLM) derive from one projection
2. **Complete GSC Setup:** Add property, submit sitemap, collect indexing data
3. **Map Live Deployment SHA:** Reconcile health SHA `d80c461505304679b12c1ce225b6d1d0dc501ff9` to source repository
4. **Raise Content Quality:** Target content quality average >90 (currently 54)
5. **Internal Linking Optimization:** Address 1,360 broken links identified
6. **AEO/GEO Maturity:** Advance from "Improving" to "Passing" status
7. **Phase Gate Implementation:** Ensure `publish_approved && published && indexable` before sitemap inclusion
8. **Audit robots.txt Discrepancy:** Live robots allows GPTBot/ClaudeBot/PerplexityBot; local robots blocks these crawlers
9. **App Site Preparation:** `app.mcpserver.in` currently returns 404; prepare for future deployment when migration completes
10. **Duplicate Route Monitoring:** No current duplicates; implement periodic audits as corpus grows

## Next Steps (Blocked Gates)

- ❌ GSC export import and validation
- ❌ Local git remote/branch/HEAD conclusively recorded
- ❌ Live deployment SHA provenance mapping
- ❌ Content quality improvement (avg 54 → 90+)
- ❌ Internal linking optimization (1,360 broken links)
- ❌ AEO/GEO maturity advancement
- ✅ Repository forensics (complete)
- ✅ Duplicate route audit (complete)
- ✅ Target architecture definition (complete)