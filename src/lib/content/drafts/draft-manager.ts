export interface SectionDraft {
  sectionId: string
  title: string
  content: string
  wordCount: number
  claims: string[]
  links: string[]
  status: "draft" | "reviewed" | "approved" | "rejected"
  evidencePassageIds: string[]
}

export interface Draft {
  id: string
  entityId: string
  route: string
  pageType: string
  locale: string
  sections: SectionDraft[]
  metadata: {
    title: string
    description: string
    canonical: string
    alternates: Array<{ hreflang: string; url: string }>
  }
  schema: Record<string, unknown>
  qualityScore: number | null
  status: "draft" | "review" | "published" | "rejected"
  contentHash: string
  createdAt: string
  updatedAt: string
}

export function createDraft(overrides: Partial<Draft> = {}): Draft {
  return {
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    entityId: "",
    route: "",
    pageType: "",
    locale: "en",
    sections: [],
    metadata: {
      title: "",
      description: "",
      canonical: "",
      alternates: [],
    },
    schema: {},
    qualityScore: null,
    status: "draft",
    contentHash: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

export function createSectionDraft(overrides: Partial<SectionDraft> = {}): SectionDraft {
  return {
    sectionId: "",
    title: "",
    content: "",
    wordCount: 0,
    claims: [],
    links: [],
    status: "draft",
    evidencePassageIds: [],
    ...overrides,
  }
}

export function computeDraftWordCount(draft: Draft): number {
  return draft.sections.reduce((sum, section) => sum + section.wordCount, 0)
}

export function computeDraftContentHash(draft: Draft): string {
  const content = draft.sections.map((s) => s.content).join("||")
  return simpleHash(content)
}

function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return `sha256:${Math.abs(hash).toString(16)}`
}
