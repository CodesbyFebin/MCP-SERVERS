export interface DuplicateMatch {
  routeA: string
  routeB: string
  similarity: number
  overlap: {
    title: boolean
    h1: boolean
    metaDescription: boolean
    outline: boolean
    entities: boolean
    tables: boolean
    faqs: boolean
  }
  recommendation: "merge" | "canonicalise" | "redirect" | "noindex" | "review" | "reject" | "archive"
}

export interface DuplicateDetectionResult {
  hasDuplicates: boolean
  matches: DuplicateMatch[]
}
