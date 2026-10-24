import { describe, expect, it } from "vitest";
import { isServerIndexable, registryPublicationCounts } from "../../src/lib/registry/publication";

const evidence = [{ source: "https://github.com/modelcontextprotocol/servers", capturedAt: "2026-10-24" }];

describe("MCP registry publication gate", () => {
  it("only indexes explicitly published evidence-reviewed records", () => {
    expect(isServerIndexable({ publicationStatus: "published", verificationStatus: "verified", evidence })).toBe(true);
    expect(isServerIndexable({ publicationStatus: "published", verificationStatus: "evidence-reviewed", evidence })).toBe(true);
  });
  it.each([undefined, "pending", "revoked", "unverified", "unknown"])("rejects verification status %s", (status) => {
    expect(isServerIndexable({ publicationStatus: "published", verificationStatus: status, evidence })).toBe(false);
  });
  it("rejects missing evidence or empty provenance URLs", () => {
    expect(isServerIndexable({ publicationStatus: "published", verificationStatus: "verified", evidence: [] })).toBe(false);
    expect(isServerIndexable({ publicationStatus: "published", verificationStatus: "verified", evidence: [{ source: " " }] })).toBe(false);
  });
  it("derives totals from actual records", () => {
    expect(registryPublicationCounts([
      { publicationStatus: "published", verificationStatus: "verified", evidence },
      { publicationStatus: "draft", verificationStatus: "pending", evidence: [] },
    ])).toEqual({ tracked: 2, indexable: 1, pending: 1 });
  });
});
