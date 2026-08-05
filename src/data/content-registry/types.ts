export type EntityType =
  | "server"
  | "client"
  | "sdk"
  | "tool"
  | "resource"
  | "prompt"
  | "schema"
  | "transport"
  | "authentication_method"
  | "company"
  | "maintainer"
  | "repository"
  | "package"
  | "release"
  | "language"
  | "framework"
  | "database"
  | "cloud_platform"
  | "integration"
  | "category"
  | "subcategory"
  | "tutorial"
  | "guide"
  | "comparison"
  | "collection"
  | "benchmark"
  | "security_advisory"
  | "vulnerability"
  | "compliance_framework"
  | "deployment_pattern"
  | "architecture_pattern"
  | "glossary_term"
  | "author"
  | "source"
  | "claim"
  | "evidence_passage"
  | "locale"
  | "marketplace_listing"
  | "hosting_provider"

export type EntityStatus = "candidate" | "verified" | "deprecated" | "archived"

export type OfficialStatus = "official" | "community" | "vendor" | "unknown"

export interface EntityMetadata {
  officialStatus: OfficialStatus
  openSource: boolean | null
  licence: string | null
  repositoryUrl: string | null
  packageUrl: string | null
  documentationUrl: string | null
  homepageUrl: string | null
  releaseDate: string | null
  latestVersion: string | null
  lastVerifiedAt: string | null
}

export interface EntityCapabilities {
  tools: number | null
  resources: number | null
  prompts: number | null
  transports: string[]
  languages: string[]
  clients: string[]
}

export interface EntityQuality {
  documentationScore: number | null
  maintenanceScore: number | null
  securityScore: number | null
  communityScore: number | null
  completenessScore: number | null
}

export interface Relationship {
  type: string
  targetId: string
  confidence: number
  sourceId?: string
}

export interface Entity {
  id: string
  type: EntityType
  slug: string
  name: string
  aliases: string[]
  summary: string
  description: string
  status: EntityStatus
  metadata: EntityMetadata
  capabilities: EntityCapabilities
  quality: EntityQuality
  relationships: Relationship[]
  sources: string[]
  claimIds: string[]
}

export type RelationshipType =
  | "belongs_to"
  | "maintained_by"
  | "developed_by"
  | "implemented_in"
  | "supports"
  | "requires"
  | "compatible_with"
  | "integrates_with"
  | "alternative_to"
  | "compared_with"
  | "uses"
  | "deployed_on"
  | "secured_by"
  | "authenticated_by"
  | "documented_by"
  | "explained_by"
  | "referenced_by"
  | "has_release"
  | "has_vulnerability"
  | "has_benchmark"
  | "listed_in"
  | "recommended_for"
  | "related_to"
  | "deprecated_by"
  | "replaced_by"

export const VALID_RELATIONSHIP_TYPES: readonly RelationshipType[] = [
  "belongs_to",
  "maintained_by",
  "developed_by",
  "implemented_in",
  "supports",
  "requires",
  "compatible_with",
  "integrates_with",
  "alternative_to",
  "compared_with",
  "uses",
  "deployed_on",
  "secured_by",
  "authenticated_by",
  "documented_by",
  "explained_by",
  "referenced_by",
  "has_release",
  "has_vulnerability",
  "has_benchmark",
  "listed_in",
  "recommended_for",
  "related_to",
  "deprecated_by",
  "replaced_by",
] as const
