import { describe, it, expect } from "vitest"
import { createQualityScore, calculateOverallScore, passesQualityGate, PUBLICATION_THRESHOLDS } from "../../src/lib/content/validation/quality-gate"

describe("quality-gate", () => {
  it("should create quality score with defaults", () => {
    const score = createQualityScore()
    expect(score.entityCompleteness).toBe(0)
    expect(score.overall).toBe(0)
  })

  it("should calculate overall score", () => {
    const score = createQualityScore({
      entityCompleteness: 90,
      evidence: 95,
      originality: 90,
      informationGain: 85,
      searchIntent: 80,
      technicalAccuracy: 80,
      seo: 95,
      aeo: 95,
      geo: 90,
      schema: 100,
      internalLinks: 80,
      readability: 75,
      localeQuality: 85,
      freshness: 90,
    })
    const overall = calculateOverallScore(score)
    expect(overall).toBeGreaterThan(80)
  })

  it("should pass quality gate with high scores", () => {
    const base = createQualityScore({
      entityCompleteness: 95,
      evidence: 95,
      originality: 95,
      informationGain: 90,
      searchIntent: 90,
      technicalAccuracy: 90,
      seo: 95,
      aeo: 95,
      geo: 95,
      schema: 100,
      internalLinks: 80,
      readability: 80,
      localeQuality: 90,
      freshness: 90,
    })
    const score = { ...base, overall: calculateOverallScore(base) }
    expect(passesQualityGate(score)).toBe(true)
  })

  it("should fail quality gate with low scores", () => {
    const score = createQualityScore({
      entityCompleteness: 50,
      evidence: 50,
      originality: 50,
      informationGain: 50,
      searchIntent: 50,
      technicalAccuracy: 50,
      seo: 50,
      aeo: 50,
      geo: 50,
      schema: 50,
      internalLinks: 50,
      readability: 50,
      localeQuality: 50,
      freshness: 50,
    })
    expect(passesQualityGate(score)).toBe(false)
  })

  it("should enforce strict evidence threshold", () => {
    const score = createQualityScore({
      entityCompleteness: 95,
      evidence: 90,
      originality: 95,
      informationGain: 90,
      searchIntent: 90,
      technicalAccuracy: 90,
      seo: 95,
      aeo: 95,
      geo: 95,
      schema: 100,
      internalLinks: 80,
      readability: 80,
      localeQuality: 90,
      freshness: 90,
    })
    expect(passesQualityGate(score, true)).toBe(false)
  })
})
