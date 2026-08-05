# Quality Gates

## Overview

Quality gates enforce publication thresholds before any page can be published.

## Thresholds

| Metric | Threshold |
|--------|-----------|
| Entity completeness | ≥ 85 |
| Evidence (factual profiles) | ≥ 90 |
| Evidence (pricing/security/benchmark) | = 100 |
| Originality | ≥ 85 |
| Information gain | ≥ 80 |
| Search intent | ≥ 80 |
| Technical accuracy | ≥ 80 |
| SEO | ≥ 90 |
| AEO | ≥ 90 |
| GEO | ≥ 90 |
| Schema | = 100 |
| Internal links | ≥ 70 |
| Readability | ≥ 70 |
| Locale quality | ≥ 80 |
| Freshness | ≥ 80 |
| **Overall** | **≥ 90** |

## Quality Score Calculation

The overall score is a weighted average of all component scores.

Weights:
- Entity completeness: 10%
- Evidence: 15%
- Originality: 10%
- Information gain: 10%
- Search intent: 5%
- Technical accuracy: 5%
- SEO: 10%
- AEO: 10%
- GEO: 5%
- Schema: 10%
- Internal links: 5%
- Readability: 5%
- Locale quality: 5%
- Freshness: 5%

## Page State Machine

```
candidate
→ intent-approved
→ evidence-ready
→ brief-approved
→ draft-generated
→ automated-validation
→ editorial-review
→ approved
→ published
```

Pages that fail any gate remain in their current state or move to:
- `needs-evidence`
- `needs-translation-review`
- `rejected`
- `archived`
