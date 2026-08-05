import type { Source, SourceStatus, SourceType } from "./types"

export interface ValidationResult {
  valid: boolean
  source: Source | null
  errors: string[]
}

export function validateSourceUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

export function validateSource(input: Partial<Source> & { id: string; url: string }): ValidationResult {
  const errors: string[] = []

  if (!input.id) {
    errors.push("Source id is required")
  }

  if (!input.url) {
    errors.push("Source url is required")
  } else if (!validateSourceUrl(input.url)) {
    errors.push(`Invalid source url: ${input.url}`)
  }

  if (!input.title) {
    errors.push("Source title is required")
  }

  if (input.sourceType && ! isValidSourceType(input.sourceType)) {
    errors.push(`Invalid sourceType: ${input.sourceType}`)
  }

  if (input.status && ! isValidSourceStatus(input.status)) {
    errors.push(`Invalid source status: ${input.status}`)
  }

  if (input.authorityScore !== undefined && (input.authorityScore < 0 || input.authorityScore > 1)) {
    errors.push("authorityScore must be between 0 and 1")
  }

  if (input.freshnessScore !== undefined && (input.freshnessScore < 0 || input.freshnessScore > 1)) {
    errors.push("freshnessScore must be between 0 and 1")
  }

  if (errors.length > 0) {
    return { valid: false, source: null, errors }
  }

  if (!input.title) {
    errors.push("Source title is required")
  }

  const domain = new URL(input.url).hostname
  const source: Source = {
    id: input.id,
    url: input.url,
    title: input.title,
    sourceType: input.sourceType ?? "community-source",
    retrievedAt: new Date().toISOString(),
    publishedAt: null,
    updatedAt: null,
    authorityScore: input.authorityScore ?? 0,
    freshnessScore: input.freshnessScore ?? 0,
    status: input.status ?? "active",
    domain,
    publisher: null,
  }

  return { valid: true, source, errors: [] }
}

export function isValidSourceType(value: string): value is SourceType {
  return [
    "official-documentation",
    "official-repository",
    "official-package",
    "vendor-page",
    "research-paper",
    "security-advisory",
    "community-source",
  ].includes(value)
}

export function isValidSourceStatus(value: string): value is SourceStatus {
  return ["active", "stale", "unavailable", "rejected"].includes(value)
}

export function computeFreshnessScore(updatedAt: string | null): number {
  if (!updatedAt) return 0
  const updated = new Date(updatedAt).getTime()
  const now = Date.now()
  const ageMs = now - updated
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  if (ageDays <= 30) return 1
  if (ageDays <= 90) return 0.8
  if (ageDays <= 180) return 0.5
  if (ageDays <= 365) return 0.3
  return 0.1
}

export function computeAuthorityScore(sourceType: SourceType): number {
  switch (sourceType) {
    case "official-documentation":
      return 1
    case "official-repository":
      return 0.95
    case "official-package":
      return 0.95
    case "security-advisory":
      return 0.9
    case "vendor-page":
      return 0.8
    case "research-paper":
      return 0.85
    case "community-source":
    default:
      return 0.5
  }
}
