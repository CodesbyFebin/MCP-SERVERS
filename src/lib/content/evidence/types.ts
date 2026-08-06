export type SourceType =
  | "official-documentation"
  | "official-repository"
  | "official-package"
  | "vendor-page"
  | "research-paper"
  | "security-advisory"
  | "community-source"

export type SourceStatus = "active" | "stale" | "unavailable" | "rejected"

export interface Source {
  id: string
  url: string
  domain: string
  title: string
  publisher: string | null
  sourceType: SourceType
  retrievedAt: string
  publishedAt: string | null
  updatedAt: string | null
  authorityScore: number
  freshnessScore: number
  status: SourceStatus
}

export type ClaimType =
  | "identity"
  | "feature"
  | "compatibility"
  | "installation"
  | "security"
  | "pricing"
  | "benchmark"
  | "release"
  | "official-status"

export type ClaimStatus =
  | "supported"
  | "partially-supported"
  | "unsupported"
  | "contradicted"
  | "expired"

export interface EvidencePassage {
  id: string
  sourceId: string
  text: string
  locator: string | null
  contentHash: string
  extractedAt: string
  validUntil: string | null
}

export interface Claim {
  id: string
  entityId: string
  statement: string
  claimType: ClaimType
  evidencePassageIds: string[]
  confidence: number
  status: ClaimStatus
  reviewedBy: string | null
  reviewedAt: string | null
}

export type EvidenceVerificationResult =
  | { verified: true; confidence: number }
  | { verified: false; reason: string }
