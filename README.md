# MCPServer.in - Model Context Protocol Knowledge Hub for AI Agents

**India's first MCP-focused knowledge platform.** Discover, evaluate, build, secure and deploy production-ready MCP servers with AI-native documentation, verification workflows, and compliance controls.

## 🎯 Mission Statement

**The definitive, verifiable knowledge base for the Model Context Protocol (MCP)** — optimized for AI citations, developer productivity, and enterprise deployment with India-focused compliance controls.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server  
npm run dev

# Build for production
npm run build

# Run SEO/AIO verification
npm run verify:p99

# Deploy
npm run deploy
```

## 📚 Documentation Hub

### Core Systems
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and data flow
- **[ENTITY_MODEL.md](./ENTITY_MODEL.md)** - Entity types and schemas
- **[SEO_AEO_GEO.md](./SEO_AEO_GEO.md)** - SEO/GEO/AIO requirements
- **[QUALITY_GATES.md](./QUALITY_GATES.md)** - Publication verification gates
- **[CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md)** - 32-step content pipeline

### Implementation Guides
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Server deployment patterns
- **[SCHEMA_GUIDE.md](./SCHEMA_GUIDE.md)** - JSON-LD schema implementation
- **[SECURITY_MODEL.md](./SECURITY_MODEL.md)** - Credential isolation security
- **[AI_INTEGRATION.md](./docs/ai-integration.md)** - AI model integration patterns

### SEO Reports
- **[FINAL_SEO_AEO_GEO_READINESS_REPORT.md](./FINAL_SEO_AEO_GEO_READINESS_REPORT.md)** - Complete SEO/GEO verification report

## 🔍 Search Engine Visibility

### Core SEO Optimizations
- **XML Sitemaps** - All content discoverable via `sitemap.xml`
- **Structured Data** - JSON-LD for Articles, Servers, FAQs, Breadcrumbs
- **Internal Linking** - Contextual links between related MCP concepts
- **AI Crawler Support** - OAI-SearchBot, PerplexityBot, ClaudeBot indexed

### AI Knowledge Base Files
- **`public/llms.txt`** - AI models can find content here first
- **`public/llms-full.txt`** - Complete knowledge base index
- **Schema validation** - All schemas pass Google Rich Results Test

### Content Distribution
- **5,000+ candidate pages** with controlled rollout
- **50 approved pilot pages** ready for production
- **1,179 indexed URLs** verified 100% healthy

## 🏗️ Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16.3, TypeScript, Tailwind CSS | App Router, SSR, SSG |
| **Backend** | Fastify, API Routes | REST endpoints, authentication |
| **Database** | PostgreSQL + Vercel Postgres | Structured MCP registry |
| **Search** | pgvector for similarity | MCP server similarity detection |
| **Deployment** | Vercel, Docker, GitHub Actions | CI/CD, edge caching |

## 📊 MCP Server Directory

**76+ verified MCP server integrations:**

| Category | Servers | Use Case |
|----------|---------|----------|
| **Developer Tools** | Claude, ChatGPT, Cursor, Copilot | AI assistant integrations |
| **Databases** | PostgreSQL, MySQL, MongoDB | Data access via MCP |
| **Cloud** | AWS, Azure, GCP | Infrastructure management |
| **Security** | Okta, Auth0, Vault | Identity and secrets |
| **Analytics** | Mixpanel, Amplitude | Event tracking |

## 🛡️ Publication Verification Flow

```
Content Generation → Quality Gates → Similarity Check → Peer Review → Publish
```

**Quality Gates (All must pass):**
- ✅ Intent validated
- ✅ Evidence complete  
- ✅ Schema validated
- ✅ Code verified
- ✅ Claims verified
- ✅ Similarity passed (< 0.95)
- ✅ Publish approved

## 🧭 Indexing & Discovery

### Sitemap Endpoints
```
/sitemap.xml              - All content sitemap index
/sitemap-pages.xml        - Regular pages
/sitemap-glossary.xml     - MCP terminology
/sitemap-docs.xml         - Technical documentation
```

### AI Search Configuration
```bash
# Key files AI crawlers use:
public/llms.txt            # AI knowledge base index
public/robots.txt          # Crawler allow/block rules
public/schema.json         # Structured data definitions
```

## 📈 Analytics & Tracking

- **Publish intent**: High (developer tools, MCP ecosystem)
- **Competitive advantage**: First MCP knowledge hub
- **Content quality**: Evidence-backed, original analysis
- **Scaling strategy**: 5,000-page controlled publication

## 🔐 Compliance & Security

- **DPDP India compliance** - Data localization controls
- **OAuth security** - Token isolation per request
- **Audit logging** - All actions traceable
- **Sitemap governance** - Controlled URL expansion

## 📞 Contact & Support

- **GitHub**: [Issues](https://github.com/CodesbyFebin/MCP-SERVERS/issues)
- **Documentation**: `/docs/` directory
- **Community**: Integrated discussion system
- **Security**: security@mcpserver.in

## 📜 License & Attribution

**Proprietary - All rights reserved**  
© 2025 MCPServer.in. Model Context Protocol is an open standard by Anthropic.

---

**SEO Meta Description:**  
MCPServer.in - The definitive knowledge hub for Model Context Protocol. Discover, evaluate, and deploy 76+ MCP servers. AI-optimized documentation, verification workflows, and India compliance controls.