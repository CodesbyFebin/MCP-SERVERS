# MCPServer.in

The global knowledge, discovery, deployment and intelligence platform for the Model Context Protocol ecosystem.

## Positioning

Discover, evaluate, build, secure and deploy MCP servers from one trusted platform.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run content pipeline
npm run content:build

# Validate publishing
npm run seo:audit
```

## Documentation

- `ARCHITECTURE.md` - System architecture and data flow
- `ENTITY_MODEL.md` - Entity types and schemas
- `CONTENT_PIPELINE.md` - 32-step content pipeline
- `docs/AUDIT_REPORT.md` - Comprehensive codebase audit

## Tech Stack

- **Frontend**: Next.js App Router, TypeScript, Tailwind CSS
- **Backend**: Fastify / Next.js API routes
- **Database**: PostgreSQL with Vercel Postgres
- **ORM**: Drizzle ORM / Prisma
- **Cache**: Redis
- **Queue**: BullMQ
- **Search**: pgvector for similarity detection
- **Infrastructure**: Vercel, Docker, GitHub Actions

## License

Proprietary - All rights reserved
