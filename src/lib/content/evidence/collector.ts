import crypto from "node:crypto"
import type { EvidencePassage, Source } from "./types"

export interface CollectorResult {
  passages: EvidencePassage[]
  sources: Source[]
}

export function hashText(text: string): string {
  return crypto.createHash("sha256").update(text.trim()).digest("hex")
}

export function extractPassages(
  source: Source,
  texts: Array<{ text: string; locator?: string | null }>
): EvidencePassage[] {
  return texts.map((item, index) => ({
    id: `${source.id}-passage-${index + 1}`,
    sourceId: source.id,
    text: item.text,
    locator: item.locator ?? null,
    contentHash: hashText(item.text),
    extractedAt: new Date().toISOString(),
    validUntil: null,
  }))
}

export function deduplicatePassages(passages: EvidencePassage[]): EvidencePassage[] {
  const seen = new Set<string>()
  return passages.filter((passage) => {
    if (seen.has(passage.contentHash)) {
      return false
    }
    seen.add(passage.contentHash)
    return true
  })
}

export function createSource(
  overrides: Partial<Source> & { id: string; url: string; title: string }
): Source {
  const domain = new URL(overrides.url).hostname
  return {
    sourceType: "community-source",
    retrievedAt: new Date().toISOString(),
    publishedAt: null,
    updatedAt: null,
    authorityScore: 0,
    freshnessScore: 0,
    status: "active",
    domain,
    publisher: null,
    ...overrides,
  }
}
