import { describe, it, expect } from "vitest"
import { createEntity, addRelationship, addSource, addClaim, updateEntityStatus, isVerified, hasEvidence } from "../../src/data/content-registry/integrations"
import type { Entity } from "../../src/data/content-registry/types"

describe("content-registry", () => {
  it("should create entity", () => {
    const entity = createEntity("server", "postgres", "PostgreSQL")
    expect(entity.id).toBe("server.postgres")
    expect(entity.type).toBe("server")
    expect(entity.slug).toBe("postgres")
    expect(entity.name).toBe("PostgreSQL")
    expect(entity.status).toBe("candidate")
  })

  it("should add relationship", () => {
    const entity = createEntity("server", "postgres", "PostgreSQL")
    const withRel = addRelationship(entity, { type: "belongs_to", targetId: "category.database", confidence: 1 })
    expect(withRel.relationships).toHaveLength(1)
    expect(withRel.relationships[0].type).toBe("belongs_to")
  })

  it("should add source and claim", () => {
    const entity = createEntity("server", "postgres", "PostgreSQL")
    const withSource = addSource(entity, "source-1")
    const withClaim = addClaim(withSource, "claim-1")
    expect(withClaim.sources).toContain("source-1")
    expect(withClaim.claimIds).toContain("claim-1")
  })

  it("should update status and check helpers", () => {
    const entity = createEntity("server", "postgres", "PostgreSQL")
    expect(isVerified(entity)).toBe(false)
    const verified = updateEntityStatus(entity, "verified")
    expect(isVerified(verified)).toBe(true)
    expect(hasEvidence(verified)).toBe(false)
    const withEvidence = addSource(addClaim(verified, "claim-1"), "source-1")
    expect(hasEvidence(withEvidence)).toBe(true)
  })
})
