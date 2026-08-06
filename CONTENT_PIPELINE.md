# Content Pipeline

## Purpose

Transform raw MCP ecosystem data into published, evidence-backed, quality-verified pages.

## Pipeline Stages

### 1. Ingestion and Entity Building
1. `ingest-sources.ts` - Ingest sources from registry
2. `extract-passages.ts` - Extract evidence passages
3. `normalise-entities.ts` - Normalise entity records
4. `validate-entities.ts` - Validate entity schemas
5. `build-relationships.ts` - Build relationship graph
6. `resolve-identities.ts` - Resolve duplicate identities
7. `detect-candidate-routes.ts` - Detect candidate routes

### 2. Scoring and Content Planning
8. `score-candidates.ts` - Score candidate routes
9. `generate-page-contracts.ts` - Generate page contracts
10. `generate-content-briefs.ts` - Generate content briefs
11. `build-section-plan.ts` - Build section plans
12. `generate-section-drafts.ts` - Generate section drafts
13. `attach-claims.ts` - Attach claims to sections
14. `validate-evidence.ts` - Validate evidence
15. `generate-tables.ts` - Generate comparison tables
16. `generate-faqs.ts` - Generate FAQs

### 3. Metadata, Schema, and Validation
17. `generate-metadata.ts` - Generate metadata
18. `generate-canonicals.ts` - Generate canonical URLs
19. `generate-schema.ts` - Generate Schema.org
20. `build-interlinks.ts` - Build internal links
21. `check-duplicates.ts` - Check duplicates
22. `check-information-gain.ts` - Check information gain
23. `check-language-quality.ts` - Check language quality
24. `score-content.ts` - Calculate quality scores
25. `run-quality-gates.ts` - Run quality gates

### 4. Editorial, Publication, and Indexing
26. `route-editorial-review.ts` - Route to editorial review
27. `publish-approved.ts` - Publish approved pages
28. `update-sitemaps.ts` - Update sitemaps
29. `build-search-index.ts` - Build search index
30. `build-llm-index.ts` - Build LLM index
31. `refresh-dependencies.ts` - Refresh dependencies
32. `generate-build-evidence.ts` - Generate build evidence

## Usage

```bash
# Full pipeline
npm run content:build

# Scoped runs
npm run content:build -- --entity server.postgres
npm run content:build -- --route /servers/postgres
npm run content:build -- --locale hi
npm run content:build -- --status needs-evidence
```

## Quality Thresholds

- Entity completeness ≥ 85
- Evidence ≥ 90 for factual profiles
- Evidence = 100 for pricing/security/benchmark
- Originality ≥ 85
- Information gain ≥ 80
- SEO ≥ 90
- AEO ≥ 90
- GEO ≥ 90
- Schema = 100
- Overall ≥ 90
