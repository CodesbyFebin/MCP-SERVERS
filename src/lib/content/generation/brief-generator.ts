export interface ContentBrief {
  entityId: string
  route: string
  pageType: string
  sections: ContentSection[]
  wordTarget: number
  allowedClaims: string[]
  prohibitedClaims: string[]
  requiredLinks: string[]
  terminology: Record<string, string>
  locale: string
}

export interface ContentSection {
  id: string
  title: string
  goal: string
  wordTarget: number
  allowedClaims: string[]
  requiredLinks: string[]
  prohibitedClaims: string[]
}

export function createContentBrief(overrides: Partial<ContentBrief> = {}): ContentBrief {
  return {
    entityId: "",
    route: "",
    pageType: "",
    sections: [],
    wordTarget: 0,
    allowedClaims: [],
    prohibitedClaims: [],
    requiredLinks: [],
    terminology: {},
    locale: "en",
    ...overrides,
  }
}
