import type { Claim, ClaimStatus } from "./types"

export interface ClaimLedger {
  claims: Map<string, Claim>
}

export function createClaimLedger(): ClaimLedger {
  return {
    claims: new Map(),
  }
}

export function addClaim(ledger: ClaimLedger, claim: Claim): ClaimLedger {
  const next = new Map(ledger.claims)
  next.set(claim.id, claim)
  return { claims: next }
}

export function updateClaimStatus(
  ledger: ClaimLedger,
  claimId: string,
  status: ClaimStatus,
  reviewedBy: string | null = null
): ClaimLedger {
  const existing = ledger.claims.get(claimId)
  if (!existing) {
    return ledger
  }

  const updated: Claim = {
    ...existing,
    status,
    reviewedBy,
    reviewedAt: status !== existing.status ? new Date().toISOString() : existing.reviewedAt,
  }

  const next = new Map(ledger.claims)
  next.set(claimId, updated)
  return { claims: next }
}

export function getClaimsByEntity(ledger: ClaimLedger, entityId: string): Claim[] {
  return Array.from(ledger.claims.values()).filter((c) => c.entityId === entityId)
}

export function getClaimsByType(ledger: ClaimLedger, claimType: string): Claim[] {
  return Array.from(ledger.claims.values()).filter((c) => c.claimType === claimType)
}

export function getClaimsByStatus(ledger: ClaimLedger, status: ClaimStatus): Claim[] {
  return Array.from(ledger.claims.values()).filter((c) => c.status === status)
}

export function countSupportedClaims(ledger: ClaimLedger, entityId?: string): number {
  const claims = entityId
    ? getClaimsByEntity(ledger, entityId)
    : Array.from(ledger.claims.values())
  return claims.filter((c) => c.status === "supported" || c.status === "partially-supported").length
}

export function countUnsupportedClaims(ledger: ClaimLedger, entityId?: string): number {
  const claims = entityId
    ? getClaimsByEntity(ledger, entityId)
    : Array.from(ledger.claims.values())
  return claims.filter((c) => c.status === "unsupported" || c.status === "contradicted").length
}

export function getExpiredClaims(ledger: ClaimLedger, maxAgeDays: number): Claim[] {
  const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000
  return Array.from(ledger.claims.values()).filter((c) => {
    const reviewedAt = c.reviewedAt ? new Date(c.reviewedAt).getTime() : 0
    return reviewedAt < cutoff && c.status !== "expired"
  })
}

export function markExpiredClaims(ledger: ClaimLedger, maxAgeDays: number): ClaimLedger {
  const expired = getExpiredClaims(ledger, maxAgeDays)
  let next = ledger
  for (const claim of expired) {
    next = updateClaimStatus(next, claim.id, "expired")
  }
  return next
}
