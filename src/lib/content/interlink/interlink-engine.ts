import type { Entity } from "../../../data/content-registry/types"

export interface InternalLink {
  href: string
  text: string
  entityId?: string
  locale: string
  status: "published" | "draft" | "rejected"
}

export interface InterlinkResult {
  links: InternalLink[]
  score: number
}

const LINK_RANKING_FACTORS = [
  "graphDistance",
  "relationshipConfidence",
  "pageQuality",
  "intentRelevance",
  "localeAvailability",
  "publicationStatus",
  "freshness",
  "anchorDiversity",
] as const

export function buildInterlinksForEntity(
  entity: Entity,
  availablePages: Array<{ route: string; entityId: string; locale: string; status: string }>
): InterlinkResult {
  const relationshipTargets = entity.relationships
    .filter((rel) => rel.confidence >= 0.5)
    .map((rel) => rel.targetId)

  const links: InternalLink[] = []

  for (const targetId of relationshipTargets) {
    const target = availablePages.find((p) => p.entityId === targetId && p.status === "published")
    if (!target) continue
    links.push({
      href: target.route,
      text: target.entityId.split(".").pop() ?? target.entityId,
      entityId: target.entityId,
      locale: target.locale,
      status: target.status as "published" | "draft" | "rejected",
    })
  }

  const score = calculateInterlinkScore(links)

  return { links, score }
}

export function calculateInterlinkScore(links: InternalLink[]): number {
  if (links.length === 0) return 0
  return Math.min(100, links.length * 10 + links.filter((l) => l.status === "published").length * 5)
}
