# Source Policy

## Overview

All factual statements must be backed by verifiable sources. The source registry tracks the origin of every claim.

## Source Types

- official-documentation
- official-repository
- official-package
- vendor-page
- research-paper
- security-advisory
- community-source

## Source Credibility

- primary: Official documentation, official repositories
- editorial-seed: Curated internal records
- vendor: Vendor-provided information
- community: Community-reported data

## Source Lifecycle

1. Source ingested
2. Evidence passages extracted
3. Claims attached to passages
4. Source status tracked (active/stale/unavailable/rejected)
5. Freshness monitored
6. Stale sources flagged for re-ingestion

## Evidence Requirements

No factual statement may be promoted to verified content without supporting evidence passages from active sources.

## Source Registry

See `src/data/publishing.ts` for the source registry implementation.
