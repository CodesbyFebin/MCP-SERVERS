import { NextResponse } from "next/server";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../../src/data/publishing";
import { SITE_ORIGIN } from "../../src/lib/canonical-urls";

export const dynamic = "force-static";

export async function GET() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();

  const serverLines = profiles.map((profile) => {
    const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
    const primarySource = sources[0]?.url ?? "source unavailable";
    return `- [${profile.server.name}](${SITE_ORIGIN}/servers/${profile.server.slug}/) — ${profile.server.description} Primary evidence: ${primarySource}`;
  });

  const content = `# MCPserver.in

MCPserver.in is an evidence-led MCP discovery and knowledge platform. Tracked inventory is kept separate from publication-qualified profiles. Unsupported server fields remain unknown rather than being generated as facts.

## Evidence Ledger
- Known entities: ${stats.totalEntities}
- Evidence-reviewed public profiles: ${stats.publishedProfiles}
- Awaiting evidence: ${stats.needsEvidence}
- Synthetic profiles published: ${stats.syntheticProfilesPublished}

## Publication policy
A server appears in curated public discovery surfaces only after it passes the shared Evidence Ledger publication policy. Evidence is claim-specific: one source does not imply that every field is verified.

## Published MCP server profiles
${serverLines.length ? serverLines.join("\n") : "- No server profiles currently meet the publication gate."}

## Primary site surfaces
- [Evidence-backed server registry](${SITE_ORIGIN}/servers/)
- [Categories](${SITE_ORIGIN}/categories/)
- [Integrations](${SITE_ORIGIN}/integrations/)
- [Clients](${SITE_ORIGIN}/clients/)
- [Documentation](${SITE_ORIGIN}/docs/)
- [Learn](${SITE_ORIGIN}/learn/)
- [State of MCP](${SITE_ORIGIN}/state-of-mcp/)
- [Editorial policy](${SITE_ORIGIN}/editorial-policy/)
- [Security](${SITE_ORIGIN}/security/)

## Machine-readable surfaces
- [Sitemap](${SITE_ORIGIN}/sitemap.xml)
- [Published server JSON](${SITE_ORIGIN}/api/servers.json)
- [MCP registry JSON](${SITE_ORIGIN}/mcp-registry.json)
- [Full LLM index](${SITE_ORIGIN}/llms-full.txt)

## Canonical origin
${SITE_ORIGIN}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
