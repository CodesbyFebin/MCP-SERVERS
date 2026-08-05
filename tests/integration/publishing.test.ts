import { describe, it, expect } from "vitest"
import { getPublishedServerProfiles, validatePublishingGraph, transitionVerificationState } from "../../src/data/publishing"

describe("publishing-integration", () => {
  it("should return published server profiles", () => {
    const profiles = getPublishedServerProfiles()
    expect(profiles.length).toBeGreaterThan(0)
    expect(profiles[0].entityId).toBeDefined()
    expect(profiles[0].server.slug).toBeDefined()
  })

  it("should validate publishing graph", () => {
    const result = validatePublishingGraph()
    expect(result.ok).toBe(true)
    expect(result.publishedServerCount).toBeGreaterThan(0)
    expect(result.candidateRouteCount).toBe(8)
  })

  it("should transition verification state", () => {
    expect(transitionVerificationState("seeded", 2, 3, true)).toBe("evidence-backed")
    expect(transitionVerificationState("evidence-backed", 2, 3, true)).toBe("verified")
    expect(transitionVerificationState("verified", 0, 0, false)).toBe("unverified")
  })
})
