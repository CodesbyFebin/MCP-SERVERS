import { describe, expect, it } from "vitest";
import {
  getEvidenceLedgerStats,
  getPublicServerFeed,
  getPublishedServerProfiles,
  getServerPublicationProfile,
  getTrackedServers,
  isServerIndexable,
  retiredInventorySlugs,
  validatePublishingGraph,
} from "../../src/data/publishing";

describe("evidence-ledger-v2", () => {
  it("derives the 75/3/72 ledger from production data", () => {
    const stats = getEvidenceLedgerStats();
    expect(stats).toEqual({
      totalEntities: 75,
      publishedProfiles: 3,
      needsEvidence: 72,
      retiredSeeds: 1,
      syntheticProfilesPublished: 0,
    });
    expect(getTrackedServers()).toHaveLength(75);
    expect(retiredInventorySlugs.has("vector-database-mcp-server")).toBe(true);
  });

  it("publishes only the primary-source-reviewed initial cohort", () => {
    const slugs = getPublishedServerProfiles().map((profile) => profile.server.slug).sort();
    expect(slugs).toEqual([
      "github-mcp-server",
      "postgres-mcp-server",
      "stripe-mcp-server",
    ]);
  });

  it("uses one indexability predicate for published and pending profiles", () => {
    const github = getServerPublicationProfile("github-mcp-server");
    const slack = getServerPublicationProfile("slack-mcp-server");
    expect(isServerIndexable(github)).toBe(true);
    expect(github?.status).toBe("published");
    expect(github?.verificationState).toBe("verified");
    expect(github?.evidence.every((item) => item.status === "verified")).toBe(true);

    expect(isServerIndexable(slack)).toBe(false);
    expect(slack?.status).toBe("needs-evidence");
    expect(slack?.verificationState).toBe("unverified");
    expect(slack?.evidence).toEqual([]);
    expect(slack?.claims).toEqual([]);
  });

  it("exports only publication-qualified profiles to the public feed", () => {
    const feed = getPublicServerFeed();
    expect(feed).toHaveLength(3);
    expect(feed.map((item) => item.slug).sort()).toEqual([
      "github-mcp-server",
      "postgres-mcp-server",
      "stripe-mcp-server",
    ]);
    for (const item of feed) {
      expect(item.publicationStatus).toBe("published");
      expect(item.verificationStatus).toBe("verified");
      expect(item.evidence.length).toBeGreaterThan(0);
      expect(item.evidence.every((evidence) => Boolean(evidence.sourceUrl))).toBe(true);
    }
  });

  it("rejects circular or missing publication evidence", () => {
    const result = validatePublishingGraph();
    expect(result.ok).toBe(true);
    expect(result.publishedServerCount).toBe(3);
    expect(result.candidateRouteCount).toBe(8);
  });
});
