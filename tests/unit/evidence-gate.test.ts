import { describe, it, expect } from "vitest"
import { verifyEvidenceGate, hasSufficientEvidence } from "../../src/lib/content/evidence/evidence-gate"
import type { Claim, EvidencePassage, Source } from "../../src/lib/content/evidence/types"

const createSource = (overrides: Partial<Source> = {}): Source => ({
  id: "source-1",
  url: "https://example.com",
  domain: "example.com",
  title: "Test Source",
  publisher: null,
  sourceType: "official-documentation",
  retrievedAt: new Date().toISOString(),
  publishedAt: null,
  updatedAt: null,
  authorityScore: 1,
  freshnessScore: 1,
  status: "active",
  ...overrides,
})

const createPassage = (overrides: Partial<EvidencePassage> = {}): EvidencePassage => ({
  id: "passage-1",
  sourceId: "source-1",
  text: "Test passage",
  locator: null,
  contentHash: "hash-1",
  extractedAt: new Date().toISOString(),
  validUntil: null,
  ...overrides,
})

const createClaim = (overrides: Partial<Claim> = {}): Claim => ({
  id: "claim-1",
  entityId: "entity-1",
  statement: "Test claim",
  claimType: "feature",
  evidencePassageIds: ["passage-1"],
  confidence: 1,
  status: "supported",
  reviewedBy: null,
  reviewedAt: null,
  ...overrides,
})

describe("evidence-gate", () => {
  it("should verify evidence gate with valid evidence", () => {
    const source = createSource()
    const passage = createPassage({ sourceId: "source-1" })
    const claim = createClaim({ evidencePassageIds: ["passage-1"] })
    const result = verifyEvidenceGate([claim], [passage], [source])
    expect(result.verified).toBe(true)
  })

  it("should fail with no claims", () => {
    const source = createSource()
    const passage = createPassage()
    const result = verifyEvidenceGate([], [passage], [source])
    expect(result.verified).toBe(false)
    expect((result as any).reason).toBe("No claims provided")
  })

  it("should fail with no passages", () => {
    const claim = createClaim()
    const result = verifyEvidenceGate([claim], [], [])
    expect(result.verified).toBe(false)
    expect((result as any).reason).toBe("No evidence passages provided")
  })

  it("should fail with unsupported claim", () => {
    const source = createSource()
    const passage = createPassage()
    const claim = createClaim({ status: "unsupported", evidencePassageIds: ["passage-1"] })
    const result = verifyEvidenceGate([claim], [passage], [source])
    expect(result.verified).toBe(false)
  })
})
