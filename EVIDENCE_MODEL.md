# Evidence Model

## Overview

The evidence model stores passage-level evidence separately from claims and entities. Every claim must trace back to one or more evidence passages.

## Evidence Passage

- id
- sourceId
- text
- locator
- contentHash
- extractedAt
- validUntil

## Claim

- id
- entityId
- statement
- claimType
- evidencePassageIds
- confidence
- status
- reviewedBy
- reviewedAt

## Claim Status

- supported
- partially-supported
- unsupported
- contradicted
- expired

## Evidence Gate

The evidence gate enforces minimum evidence requirements before publication:

- Minimum evidence ratio: 1.0
- Minimum claim count: 1
- Minimum source authority: 0.5
- Maximum claim age: 365 days

## Expiration

Time-sensitive claims expire after a defined period. The `markExpiredClaims` function automatically marks expired claims.

## Traceability

All claims are traceable to evidence passages, and all passages trace back to sources. This creates a complete audit trail.
