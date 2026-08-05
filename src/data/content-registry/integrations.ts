import type { Entity, EntityType, EntityStatus, Relationship, RelationshipType } from "./types"

export const EMPTY_ENTITY: Omit<Entity, "id" | "type" | "slug" | "name"> = {
  aliases: [],
  summary: "",
  description: "",
  status: "candidate",
  metadata: {
    officialStatus: "unknown",
    openSource: null,
    licence: null,
    repositoryUrl: null,
    packageUrl: null,
    documentationUrl: null,
    homepageUrl: null,
    releaseDate: null,
    latestVersion: null,
    lastVerifiedAt: null,
  },
  capabilities: {
    tools: null,
    resources: null,
    prompts: null,
    transports: [],
    languages: [],
    clients: [],
  },
  quality: {
    documentationScore: null,
    maintenanceScore: null,
    securityScore: null,
    communityScore: null,
    completenessScore: null,
  },
  relationships: [],
  sources: [],
  claimIds: [],
}

export function createEntityId(type: EntityType, slug: string): string {
  return `${type}.${slug}`
}

export function createEntity(
  type: EntityType,
  slug: string,
  name: string,
  overrides: Partial<Omit<Entity, "id" | "type" | "slug" | "name">> = {}
): Entity {
  const id = createEntityId(type, slug)
  return {
    id,
    type,
    slug,
    name,
    ...EMPTY_ENTITY,
    ...overrides,
  }
}

export function addRelationship(entity: Entity, relationship: Relationship): Entity {
  return {
    ...entity,
    relationships: [...entity.relationships, relationship],
  }
}

export function addSource(entity: Entity, sourceId: string): Entity {
  if (entity.sources.includes(sourceId)) {
    return entity
  }
  return {
    ...entity,
    sources: [...entity.sources, sourceId],
  }
}

export function addClaim(entity: Entity, claimId: string): Entity {
  if (entity.claimIds.includes(claimId)) {
    return entity
  }
  return {
    ...entity,
    claimIds: [...entity.claimIds, claimId],
  }
}

export function updateEntityStatus(entity: Entity, status: EntityStatus): Entity {
  return {
    ...entity,
    status,
  }
}

export function updateEntityMetadata(
  entity: Entity,
  metadata: Partial<Entity["metadata"]>
): Entity {
  return {
    ...entity,
    metadata: {
      ...entity.metadata,
      ...metadata,
    },
  }
}

export function updateEntityQuality(
  entity: Entity,
  quality: Partial<Entity["quality"]>
): Entity {
  return {
    ...entity,
    quality: {
      ...entity.quality,
      ...quality,
    },
  }
}

export function isVerified(entity: Entity): boolean {
  return entity.status === "verified"
}

export function isCandidate(entity: Entity): boolean {
  return entity.status === "candidate"
}

export function isDeprecated(entity: Entity): boolean {
  return entity.status === "deprecated"
}

export function isArchived(entity: Entity): boolean {
  return entity.status === "archived"
}

export function hasVerifiedMetadata(entity: Entity): boolean {
  const m = entity.metadata
  return (
    m.officialStatus !== "unknown" &&
    m.repositoryUrl !== null &&
    m.documentationUrl !== null &&
    m.lastVerifiedAt !== null
  )
}

export function hasEvidence(entity: Entity): boolean {
  return entity.sources.length > 0 && entity.claimIds.length > 0
}
