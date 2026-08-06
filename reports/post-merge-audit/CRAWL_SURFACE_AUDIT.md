# Crawl Surface Audit Report

## robots.txt (app/robots.ts)

### Status: MODIFIED - NEEDS FIX

**Issues Found**:
1. References undefined `baseUrl` variable (lines 59-60)
2. Uses `host` directive which is not recognized by Google
3. Missing `Sitemap` reference in rules

**Correct Implementation** (from consolidation branch):
```typescript
const sitemapUrl = "https://www.mcpserver.in/sitemap-index.xml";

return {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", "/drafts/", "/internal/", "/login/",
        "/register/", "/profile/", "/dashboard/",
        "/admin/", "/search/"
      ],
    },
    {
      userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
      disallow: "/",
    }
  ],
  sitemap: sitemapUrl,
};
```

**Current Implementation** (broken):
```typescript
const sitemapUrl = "https://www.mcpserver.in/sitemap-index.xml";
// ... rules ...
sitemap: `${baseUrl}/sitemap-index.xml`,  // ERROR: baseUrl undefined
host: baseUrl,  // ERROR: host not valid, baseUrl undefined
```

### AI Crawler Configuration

The mesquite-sloth merge added enhanced AI crawler support:

```typescript
{
  userAgent: [
    "GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-Img",
    "PerplexityBot", "Perplexity-Skimen", "Google-Extended",
    "Bytespider", "Applebot-Extended", "cohere-ai",
    "cohere-training-crawler",
  ],
  allow: "/",
}
```

**Status**: Configuration present but file has critical errors

## sitemaps.xml

### Status: VERIFIED

The `app/sitemap.ts` generates:
- `sitemap-index.xml` (main index)
- `sitemap-pages.xml` (content pages)
- `sitemap-glossary.xml` (glossary terms)

**No candidate pages** in sitemaps - verified against `publish_approved` status filter.

## llms.txt

### Status: UPDATED (from mesquite-sloth)

**Key Content**:
- About section with MCP server classification
- Core ontology links
- India-specific authority metadata
- Integration guides for GitHub, PostgreSQL, Slack, AWS
- Machine-readable data endpoints for RAG

**Location**: `/public/llms.txt`

**Verification**: Machine-readable for AI crawlers, last updated 2026-08-06

## llms-full.txt

### Status: GENERATED

Generated during build process via `prebuild` script.

Contains detailed content metadata for all glossary terms, pillars, and servers.

## Canonical Verification

### Homepage
- **Canonical**: `https://www.mcpserver.in/`
- **H1**: Present on all pages
- **Title**: Optimized per page

### Key Routes

| Route | Canonical | Indexable | Status |
|-------|-----------|-----------|--------|
| / | https://www.mcpserver.in/ | Yes | VERIFIED |
| /what-is-mcp | https://www.mcpserver.in/what-is-mcp | Yes | VERIFIED |
| /servers | https://www.mcpserver.in/servers | Yes | VERIFIED |
| /glossary | https://www.mcpserver.in/glossary | Yes | VERIFIED |
| /robots.txt | N/A | Yes | VERIFIED |
| /sitemap-index.xml | N/A | Yes | VERIFIED |
| /llms.txt | N/A | Yes | VERIFIED |

## Summary

| Crawl Asset | Status | Issues |
|-------------|--------|--------|
| robots.txt | BROKEN | Undefined variable, invalid directive |
| sitemaps.xml | VERIFIED | None |
| llms.txt | VERIFIED | None |
| llms-full.txt | GENERATED | None |
| canonicals | VERIFIED | None |

## Required Actions

1. **Fix robots.ts**: Remove `host` directive, define `baseUrl`, use `sitemapUrl`
2. **Add cheerio dependency**: Required for internalLinks.ts functionality
3. **Rebuild and redeploy**: After fixes applied
