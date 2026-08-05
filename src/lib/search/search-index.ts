export interface SearchIndex {
  entities: Array<{
    id: string
    type: string
    slug: string
    name: string
    aliases: string[]
    summary: string
    status: string
  }>
  relationships: Array<{
    sourceId: string
    targetId: string
    type: string
    confidence: number
  }>
  pages: Array<{
    route: string
    entityId: string
    title: string
    description: string
    locale: string
    status: string
  }>
}

export function createEmptySearchIndex(): SearchIndex {
  return {
    entities: [],
    relationships: [],
    pages: [],
  }
}
