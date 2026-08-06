export interface QualityScore {
  entityCompleteness: number
  evidence: number
  originality: number
  informationGain: number
  searchIntent: number
  technicalAccuracy: number
  seo: number
  aeo: number
  geo: number
  schema: number
  internalLinks: number
  readability: number
  localeQuality: number
  freshness: number
  overall: number
}

export const PUBLICATION_THRESHOLDS = {
  entityCompleteness: 85,
  evidence: 90,
  evidenceStrict: 100,
  originality: 85,
  informationGain: 80,
  searchIntent: 80,
  technicalAccuracy: 80,
  seo: 90,
  aeo: 90,
  geo: 90,
  schema: 100,
  internalLinks: 70,
  readability: 70,
  localeQuality: 80,
  freshness: 80,
  overall: 90,
} as const

export function calculateOverallScore(score: QualityScore): number {
  const weights = {
    entityCompleteness: 0.1,
    evidence: 0.15,
    originality: 0.1,
    informationGain: 0.1,
    searchIntent: 0.05,
    technicalAccuracy: 0.05,
    seo: 0.1,
    aeo: 0.1,
    geo: 0.05,
    schema: 0.1,
    internalLinks: 0.05,
    readability: 0.05,
    localeQuality: 0.05,
    freshness: 0.05,
  }

  const overall =
    Object.entries(weights).reduce((sum, [key, weight]) => {
      const value = score[key as keyof QualityScore] as number
      return sum + value * weight
    }, 0) /
    Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  return Math.round(overall)
}

export function passesQualityGate(score: QualityScore, strictEvidence = false): boolean {
  const evidenceThreshold = strictEvidence ? PUBLICATION_THRESHOLDS.evidenceStrict : PUBLICATION_THRESHOLDS.evidence

  return (
    score.entityCompleteness >= PUBLICATION_THRESHOLDS.entityCompleteness &&
    score.evidence >= evidenceThreshold &&
    score.originality >= PUBLICATION_THRESHOLDS.originality &&
    score.informationGain >= PUBLICATION_THRESHOLDS.informationGain &&
    score.seo >= PUBLICATION_THRESHOLDS.seo &&
    score.aeo >= PUBLICATION_THRESHOLDS.aeo &&
    score.geo >= PUBLICATION_THRESHOLDS.geo &&
    score.schema >= PUBLICATION_THRESHOLDS.schema &&
    score.internalLinks >= PUBLICATION_THRESHOLDS.internalLinks &&
    score.readability >= PUBLICATION_THRESHOLDS.readability &&
    score.localeQuality >= PUBLICATION_THRESHOLDS.localeQuality &&
    score.freshness >= PUBLICATION_THRESHOLDS.freshness &&
    score.overall >= PUBLICATION_THRESHOLDS.overall
  )
}

export function createQualityScore(overrides: Partial<QualityScore> = {}): QualityScore {
  return {
    entityCompleteness: 0,
    evidence: 0,
    originality: 0,
    informationGain: 0,
    searchIntent: 0,
    technicalAccuracy: 0,
    seo: 0,
    aeo: 0,
    geo: 0,
    schema: 0,
    internalLinks: 0,
    readability: 0,
    localeQuality: 0,
    freshness: 0,
    overall: 0,
    ...overrides,
  }
}
