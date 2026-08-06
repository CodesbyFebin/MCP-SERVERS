# Deployment

## Infrastructure

- Docker
- GitHub Actions
- Vercel
- CDN caching
- Object storage
- Managed PostgreSQL
- Managed Redis
- Scheduled workers
- Background job processing

## Environment Variables

Required environment variables:
- `POSTGRES_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `INDEXNOW_KEY` - IndexNow API key

Optional:
- `SENTRY_DSN` - Sentry error tracking
- `GA4_MEASUREMENT_ID` - Google Analytics
- `GTM_ID` - Google Tag Manager
- `OPENAI_API_KEY` - OpenAI API for content generation
- `ANTHROPIC_API_KEY` - Anthropic API for content generation

## CI/CD

### Pull Request
- lint
- typecheck
- unit tests
- schema validation
- entity validation
- relationship validation
- route collision check
- content contract validation
- metadata validation
- JSON-LD validation
- canonical validation
- internal-link validation
- duplicate check
- security scan
- build

### Merge
- incremental content build
- publish approved pages
- generate sitemaps
- generate indexes
- deploy
- run smoke tests
- record build evidence

## Performance Budgets

- LCP < 2.5 seconds
- CLS < 0.1
- INP < 200 ms
- HTML response < 200 KB for normal pages
- Critical JS < 150 KB where feasible
