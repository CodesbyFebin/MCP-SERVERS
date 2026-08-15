import { getEvidenceLedgerStats, getPublicServerFeed } from "../../src/data/publishing";

export const dynamic = "force-static";

export async function GET() {
  const stats = getEvidenceLedgerStats();
  const servers = getPublicServerFeed();

  return Response.json(
    {
      name: "MCPserver.in Evidence Ledger",
      canonical: "https://www.mcpserver.in/servers/",
      methodology: {
        rule: "published + verified review state + verified evidence passage",
        unknownPolicy: "Unknown fields remain null or empty and are not inferred from editorial seed copy.",
        pendingPolicy: "Needs-evidence entities are excluded from this public registry until review is complete.",
      },
      ledger: {
        trackedEntities: stats.totalEntities,
        evidenceReviewedProfiles: stats.publishedProfiles,
        awaitingEvidence: stats.needsEvidence,
        syntheticProfilesPublished: stats.syntheticProfilesPublished,
      },
      servers,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
