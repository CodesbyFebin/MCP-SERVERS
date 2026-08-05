# API Reference

## Versioned API

Base URL: `/api/v1`

## Public Endpoints

### Servers
- `GET /api/v1/servers` - List servers
- `GET /api/v1/servers/{slug}` - Get server details
- `GET /api/v1/entities/{id}` - Get entity by ID
- `GET /api/v1/categories` - List categories
- `GET /api/v1/search` - Search entities
- `GET /api/v1/compare` - Compare entities
- `GET /api/v1/tutorials` - List tutorials
- `GET /api/v1/security/advisories` - List security advisories
- `GET /api/v1/intelligence/benchmarks` - List benchmarks

### Submissions
- `POST /api/v1/submissions` - Submit new server
- `POST /api/v1/corrections` - Submit corrections
- `POST /api/v1/claims` - Submit claims
- `POST /api/v1/reviews` - Submit reviews

## Internal Endpoints

- `POST /api/internal/build` - Trigger content build
- `POST /api/internal/validate` - Validate content
- `POST /api/internal/publish` - Publish content
- `POST /api/internal/reindex` - Rebuild indexes

## API Features

- Pagination
- Rate limits
- Authentication
- API keys
- Audit logging
- Versioning
- OpenAPI documentation
- Error contracts
- Idempotency for writes
