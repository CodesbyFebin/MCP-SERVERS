# Internal Linking Strategy — MCPserver.in

## 1. Strategy Overview

The internal linking strategy follows a **hub-and-spoke topical cluster model** where new pages are linked from already-indexed, topically relevant existing pages. This ensures AI crawlers and traditional search engines discover new content fastest through the most authoritative paths.

## 2. Linking Architecture

### Hub Pages (High Authority — Link From These)
These pages are already indexed, have high crawl frequency, and serve as the primary distribution points for new content:

| Hub Page | URL | Authority Level | Crawl Frequency |
|---|---|---|---|
| Homepage | `/` | Critical | Daily |
| Server Directory | `/mcp-server-directory` | High | Daily |
| What is MCP | `/what-is-mcp` | High | Daily |
| MCP Server | `/mcp-server` | High | Daily |
| MCP Protocol | `/mcp-protocol` | High | Daily |
| MCP Security | `/mcp-security` | High | Daily |
| MCP Hosting | `/mcp-hosting` | High | Daily |
| Glossary | `/glossary` | Medium-High | Daily |
| FAQ | `/faq` | Medium-High | Daily |
| State of MCP | `/state-of-mcp` | Medium-High | Weekly |
| Blog | `/blog` | Medium | Weekly |
| Docs | `/docs` | Medium | Weekly |
| Pricing | `/pricing` | Medium | Weekly |
| Compare | `/compare` | Medium | Weekly |
| Learn Hub | `/learn` | Medium | Weekly |

### Spoke Pages (New Content — Link To These From Hubs)
New pages should be linked from at least 2 hub pages and 1 spoke page within the same topical cluster.

## 3. Methods for Identifying Relevant Pages

### A. Topic Cluster Matching
1. **Map new page to a pillar**: Every new page belongs to one of the 10 pillar hubs (Protocol, Server Dev, Gateway/Security, Integration, Observability, AI Client, Enterprise, Pricing, Compliance, Ecosystem).
2. **Find existing pages in the same pillar**: Use the `src/data/pillars.ts` and `src/data/topics.ts` registries to identify pages within the same cluster.
3. **Cross-link within cluster**: Link new page to 2-3 existing pages in the same cluster and vice versa.

### B. Keyword Co-Occurrence Analysis
1. Run `scripts/extract-content-gaps.mjs` to identify keyword gaps.
2. Use the `keywords-tracking-sheet.md` in `docs/` to find existing pages targeting similar keywords.
3. Link new page from any page that shares 2+ target keywords.

### C. Entity Graph Traversal
1. Use the Knowledge Graph (`src/data/site.ts` → `knowledgeGraph.domains`) to find related entities.
2. For a new server integration page, link from the server's category page and the pillar page for that category.
3. For a new glossary term, link from the glossary index page and any pillar page that references that concept.

### D. Content Gap Discovery
1. Run `node scripts/extract-content-gaps.mjs --pillar=<name> --query="<topic>"` monthly.
2. Review `research/content-gaps/` for link opportunities from existing content to new pages.
3. Prioritize links from pages that already rank in top 20 for the target keyword.

## 4. Anchor Text Best Practices

### Rules
- **Descriptive**: Anchor text must describe the destination page's content (e.g., "MCP server hosting in India" not "click here").
- **Keyword-rich but natural**: Include the target keyword if it fits naturally; avoid keyword stuffing.
- **Unique per link**: Avoid using the same anchor text for multiple links to different pages.
- **Contextually relevant**: The anchor text must make sense in the surrounding paragraph's context.
- **No exact-match over-optimization**: Use partial matches, variations, and natural language.

### Examples

| Bad Anchor | Good Anchor | Reason |
|---|---|---|
| "click here" | "MCP server hosting India" | Descriptive, keyword-rich |
| "MCP" (vague) | "Model Context Protocol servers" | Specific, contextual |
| "MCPserver.in" (brand only) | "India-first MCP hosting platform" | Descriptive, topical |
| "learn more" | "DPDP compliance for MCP servers" | Specific, actionable |
| "MCP server" (repeated) | "hosted MCP server directory" | Varied, natural |

### Anchor Text Distribution Target
- 40% Branded (MCPserver.in, MCPserver)
- 30% Generic (learn more, read more, see also)
- 20% Keyword-rich (MCP server hosting, DPDP compliance)
- 10% Exact match (target keyword phrase)

## 5. New Page Linking Protocol

When publishing a new page, execute this checklist:

1. **Add 2+ internal links FROM hub pages**: Edit the homepage, directory, or pillar page to include a link to the new page.
2. **Add 2+ internal links FROM spoke pages**: Link from 2 existing pages in the same topical cluster.
3. **Add 1+ contextual link in body content**: Within the new page itself, link to 3-5 related existing pages using descriptive anchor text.
4. **Add to XML sitemap**: The new page URL must be included in the appropriate segmented sitemap.
5. **Submit to IndexNow**: Run `npm run submit-indexnow` to notify Bing/Yandex/etc.
6. **Request indexing in GSC**: Use the "Request Indexing" tool for the first 5 key pages.
7. **Update llms.txt**: Add the new page URL to the llms.txt and llms-full.txt entries.
8. **Update ai-index.json**: Add the new page to the machine-readable AI index.

## 6. Existing Link Audit Methodology

### Automated Audit (Weekly)
1. Run `npm run seo:audit` to check for broken internal links and non-canonical paths.
2. Parse `validate-seo.ts` output for link errors.
3. Review the `scripts/verify-production.mjs` output for link validation.

### Manual Audit (Monthly)
1. **Crawl the site** with a tool like Screaming Frog or Sitebulb.
2. **Export all internal links** and cross-reference against the valid paths list in `validate-seo.ts`.
3. **Identify orphan pages**: Any page with zero internal links pointing to it.
4. **Check anchor text quality**: Flag "click here", "read more", and brand-only anchors on important pages.
5. **Verify 3-click rule**: All important pages should be reachable within 3 clicks from the homepage.
6. **Check link depth**: Pages in the same cluster should be linked within 2-3 hops.

### Link Opportunity Identification
1. **Compare existing links vs. content clusters**: For each pillar, list all pages in that cluster and verify they link to each other.
2. **Find unlinked mentions**: Search for brand names, server names, and topic terms in body content that aren't linked.
3. **Prioritize high-authority pages**: Focus link-building efforts on pages that already have strong crawl frequency.
4. **Use the `internalLinks.ts` utility**: The `getRelatedLinks()` function provides automated related-page suggestions based on type (pillar/topic/server).

## 7. Link Equity Distribution

### Priority Order for Link Placement
1. **Homepage → New page**: Highest equity, fastest discovery
2. **Pillar page → New page**: Strong topical signal
3. **Category/Directory page → New page**: Contextual relevance
4. **Related spoke page → New page**: Deep topical signal
5. **Blog post → New page**: Freshness signal
6. **Footer → New page**: Persistent but low equity

### Avoid
- Linking new pages from orphan pages (pages with no incoming links)
- Using footer links as the primary discovery path for important pages
- Linking from pages that are themselves orphaned or noindexed
- Over-linking (more than 10 internal links per page dilutes equity)

## 8. Monitoring & Metrics

### KPIs to Track
- **Orphan page count**: Should be 0
- **Average link depth**: Should be ≤ 3 clicks from homepage
- **Internal link ratio**: Each page should have 3-8 internal outbound links
- **Anchor text diversity**: No single anchor text should exceed 15% of all internal links
- **Crawl frequency of new pages**: Should be indexed within 24-72 hours of publishing
- **Cross-cluster links**: At least 10% of internal links should cross between different pillars

### Tools
- `npm run seo:audit` — automated link and schema validation
- `scripts/verify-production.mjs` — production link verification
- `scripts/generate-url-inventory.mjs` — URL inventory for link gap analysis
- Screaming Frog / Sitebulb — manual crawl analysis
- Google Search Console → Links — internal link discovery
