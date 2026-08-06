import { describe, it, expect } from "vitest"
import { createClaimLedger, addClaim, updateClaimStatus, getClaimsByEntity, countSupportedClaims, countUnsupportedClaims, getExpiredClaims, markExpiredClaims } from "../../src/lib/content/evidence/claim-ledger"
import type { Claim } from "../../src/lib/content/evidence/types"

const baseClaim = (overrides: Partial<Claim> = {}): Claim => ({
  id: "claim-1",
  entityId: "entity-1",
  statement: "Test claim",
  claimType: "feature",
  evidencePassageIds: [],
  confidence: 1,
  status: "supported",
  reviewedBy: null,
  reviewedAt: new Date().toISOString(),
  ...overrides,
})

describe("claim-ledger", () => {
  it("should create empty ledger", () => {
    const ledger = createClaimLedger()
    expect(ledger.claims.size).toBe(0)
  })

  it("should add claim", () => {
    const ledger = createClaimLedger()
    const claim = baseClaim()
    const next = addClaim(ledger, claim)
    expect(next.claims.size).toBe(1)
    expect(next.claims.get("claim-1")).toBe(claim)
  })

  it("should update claim status", () => {
    const ledger = createClaimLedger()
    const claim = baseClaim()
    const withClaim = addClaim(ledger, claim)
    const updated = updateClaimStatus(withClaim, "claim-1", "contradicted", "reviewer-1")
    expect(updated.claims.get("claim-1")?.status).toBe("contradicted")
    expect(updated.claims.get("claim-1")?.reviewedBy).toBe("reviewer-1")
  })

  it("should get claims by entity", () => {
    const ledger = createClaimLedger()
    const c1 = baseClaim({ id: "c1", entityId: "e1" })
    const c2 = baseClaim({ id: "c2", entityId: "e2" })
    const next = addClaim(addClaim(ledger, c1), c2)
    const e1Claims = getClaimsByEntity(next, "e1")
    expect(e1Claims).toHaveLength(1)
    expect(e1Claims[0].id).toBe("c1")
  })

  it("should count supported claims", () => {
    const ledger = createClaimLedger()
    const c1 = baseClaim({ id: "c1", status: "supported" })
    const c2 = baseClaim({ id: "c2", status: "unsupported" })
    const next = addClaim(addClaim(ledger, c1), c2)
    expect(countSupportedClaims(next)).toBe(1)
    expect(countUnsupportedClaims(next)).toBe(1)
  })

  it("should mark expired claims", () => {
    const ledger = createClaimLedger()
    const oldClaim = baseClaim({ id: "c1", reviewedAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() })
    const next = addClaim(ledger, oldClaim)
    const expired = markExpiredClaims(next, 365)
    expect(expired.claims.get("c1")?.status).toBe("expired")
  })
})
