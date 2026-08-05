# MCP Content Pipeline

## Purpose
The content pipeline transforms raw MCP ecosystem data into published, evidence-backed, quality-verified pages.

## 32-Step Pipeline

### Steps 1-7: Ingestion and Entity Building
001. `ingest-sources.ts` - Ingest sources from registry
002. `extract-passages.ts` - Extract evidence passages from sources
003. `normalise-entities.ts` - Normalise entity records
004. `validate-entities.ts` - Validate entity schemas
005. `build-relationships.ts` - Build relationship graph
006. `resolve-identities.ts` - Resolve duplicate identities
007. `detect-candidate-routes.ts` - Detect candidate routes from entities

### Steps 8-16: Scoring and Content Planning
008. `score-candidates.ts` - Score candidate routes
009. `generate-page-contracts.ts` - Generate page contracts
010. `generate-content-briefs.ts` - Generate content briefs
011. `build-section-plan.ts` - Build section plans
012. `generate-section-drafts.ts` - Generate section drafts
013. `attach-claims.ts` - Attach claims to sections
014. `validate-evidence.ts` - Validate evidence for claims
015. `generate-tables.ts` - Generate comparison tables
016. `generate-faqs.ts` - Generate FAQs from claims

### Steps 17-25: Metadata, Schema, and Validation
017. `generate-metadata.ts` - Generate page metadata
018. `generate-canonicals.ts` - Generate canonical URLs
019. `generate-schema.ts` - Generate Schema.org JSON-LD
020. `build-interlinks.ts` - Build internal links
021. `check-duplicates.ts` - Check for duplicate content
022. `check-information-gain.ts` - Check information gain
023. `check-language-quality.ts` - Check language quality
024. `score-content.ts` - Calculate quality scores
025. `run-quality-gates.ts` - Run quality gates

### Steps 26-32: Editorial, Publication, and Indexing
026. `route-editorial-review.ts` - Route to editorial review
027. `publish-approved.ts` - Publish approved pages
028. `update-sitemaps.ts` - Update sitemaps
029. `build-search-index.ts` - Build search index
030. `build-llm-index.ts` - Build LLM index
031. `refresh-dependencies.ts` - Refresh dependent routes
032. `generate-build-evidence.ts` - Generate build evidence

## Usage

```bash
# Run full pipeline
npx tsx scripts/content/content-pipeline.ts

# Run for specific entity
npx tsx scripts/content/content-pipeline.ts --entity server.postgres

# Run for specific route
npx tsx scripts/content/content-pipeline.ts --route /servers/postgres

# Run for specific locale
npx tsx scripts/content/content-pipeline.ts --locale hi

# Run for pages needing evidence
npx tsx scripts/content/content-pipeline.ts --status needs-evidence
```

## Integration

This pipeline is invoked via `npm run content:build` which wraps the 32-step execution.
