import type { Claim, EvidencePassage, Source, EvidenceVerificationResult } from "./types"

export interface EvidenceGateConfig {
  minEvidenceRatio: number
  minClaimCount: number
  minSourceAuthority: number
  maxClaimAgeDays: number
  requiredClaimTypes: string[]
}

export const DEFAULT_EVIDENCE_GATE_CONFIG: EvidenceGateConfig = {
  minEvidenceRatio: 1,
  minClaimCount: 1,
  minSourceAuthority: 0.5,
  maxClaimAgeDays: 365,
  requiredClaimTypes: ["identity", "feature"],
}

export function verifyEvidenceGate(
  claims: Claim[],
  passages: EvidencePassage[],
  sources: Source[],
  config: EvidenceGateConfig = DEFAULT_EVIDENCE_GATE_CONFIG
): EvidenceVerificationResult {
  if (claims.length === 0) {
    return { verified: false, reason: "No claims provided" }
  }

  if (passages.length === 0) {
    return { verified: false, reason: "No evidence passages provided" }
  }

  const sourceMap = new Map(sources.map((s) => [s.id, s]))
  const passageMap = new Map(passages.map((p) => [p.id, p]))

  let supportedClaims = 0
  let totalClaims = claims.length

  for (const claim of claims) {
    if (claim.status !== "supported" && claim.status !== "partially-supported") {
      continue
    }

    const hasValidPassages = claim.evidencePassageIds.every((pid) => {
      const passage = passageMap.get(pid)
      if (!passage) return false
      const source = sourceMap.get(passage.sourceId)
      if (!source) return false
      if (source.status !== "active") return false
      if (source.authorityScore < config.minSourceAuthority) return false
      return true
    })

    if (hasValidPassages) {
      supportedClaims++
    }
  }

  const evidenceRatio = supportedClaims / totalClaims

  if (evidenceRatio < config.minEvidenceRatio) {
    return {
      verified: false,
      reason: `Evidence ratio ${evidenceRatio.toFixed(2)} below minimum ${config.minEvidenceRatio}`,
    }
  }

  if (supportedClaims < config.minClaimCount) {
    return {
      verified: false,
      reason: `Supported claims ${supportedClaims} below minimum ${config.minClaimCount}`,
    }
  }

  return { verified: true, confidence: evidenceRatio }
}

export function hasSufficientEvidence(
  claims: Claim[],
  passages: EvidencePassage[],
  sources: Source[]
): boolean {
  const result = verifyEvidenceGate(claims, passages, sources)
  return result.verified
}
