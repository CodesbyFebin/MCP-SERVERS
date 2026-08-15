import { getEvidenceLedgerStats, getPublicServerFeed } from "../../../src/data/publishing";

export const dynamic = "force-static";

export async function GET() {
  const stats = getEvidenceLedgerStats();
  const servers = getPublicServerFeed();

  return Response.json(
    {
      name: "MCPserver.in public server feed",
      methodology: "Only publication-qualified, evidence-reviewed MCP server profiles are included.",
      trackedEntities: stats.totalEntities,
      publishedProfiles: servers.length,
      servers,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
