import type { Draft } from "../drafts/draft-manager"
import { createQualityScore, passesQualityGate, calculateOverallScore, type QualityScore } from "../validation/quality-gate"

export interface ContentValidationResult {
  draftId: string
  passed: boolean
  score: QualityScore
  failures: string[]
  warnings: string[]
}

export function validateDraft(draft: Draft): ContentValidationResult {
  const failures: string[] = []
  const warnings: string[] = []

  const wordCount = draft.sections.reduce((sum, s) => sum + s.wordCount, 0)
  if (wordCount < 500) {
    failures.push(`Content too short: ${wordCount} words (minimum 500)`)
  }

  const hasEmptySections = draft.sections.some((s) => s.wordCount === 0 && s.status !== "rejected")
  if (hasEmptySections) {
    warnings.push("Some sections are empty")
  }

  const hasUnlinkedClaims = draft.sections.some((s) => s.claims.length === 0 && s.status !== "rejected")
  if (hasUnlinkedClaims) {
    warnings.push("Some sections have no claims")
  }

  const score = createQualityScore({
    entityCompleteness: draft.metadata.title ? 90 : 50,
    evidence: draft.sections.filter((s) => s.evidencePassageIds.length > 0).length / Math.max(1, draft.sections.length) * 100,
    originality: 85,
    informationGain: 80,
    searchIntent: draft.metadata.description ? 85 : 50,
    technicalAccuracy: 80,
    seo: draft.metadata.title && draft.metadata.description ? 90 : 60,
    aeo: 80,
    geo: 70,
    schema: Object.keys(draft.schema).length > 0 ? 100 : 50,
    internalLinks: draft.sections.reduce((sum, s) => sum + s.links.length, 0) > 0 ? 80 : 50,
    readability: 75,
    localeQuality: draft.locale === "en" ? 90 : 70,
    freshness: 80,
  })

  const overall = calculateOverallScore(score)
  const passed = passesQualityGate(score) && failures.length === 0

  return {
    draftId: draft.id,
    passed,
    score: { ...score, overall },
    failures,
    warnings,
  }
}
