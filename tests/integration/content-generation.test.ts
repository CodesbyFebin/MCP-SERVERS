import { describe, it, expect } from "vitest"
import { compileSections } from "../../src/lib/content/generation/section-compiler"
import { SERVER_PROFILE_TEMPLATE } from "../../src/lib/content/templates/page-templates"
import { createDraft, computeDraftWordCount, computeDraftContentHash } from "../../src/lib/content/drafts/draft-manager"
import { validateDraft } from "../../src/lib/content/validation/content-validator"

describe("content-generation", () => {
  it("should compile sections from template", () => {
    const result = compileSections({
      entityId: "server.postgres",
      route: "/servers/postgres",
      pageType: "server-detail",
      locale: "en",
      template: SERVER_PROFILE_TEMPLATE,
      claims: [
        { id: "claim-1", statement: "PostgreSQL is a relational database", evidencePassageIds: ["passage-1"] },
      ],
      passages: [
        { id: "passage-1", text: "PostgreSQL is a powerful relational database system." },
      ],
      relationships: [
        { targetId: "category.database", type: "belongs_to" },
      ],
      terminology: {},
    })

    expect(result.sections.length).toBeGreaterThan(0)
    expect(result.totalWordCount).toBeGreaterThan(0)
    expect(result.status).toBe("draft")
  })

  it("should create draft with sections", () => {
    const draft = createDraft({
      entityId: "server.postgres",
      route: "/servers/postgres",
      pageType: "server-detail",
      sections: [
        { sectionId: "hero", title: "Hero", content: "Test content", wordCount: 2, claims: [], links: [], status: "draft", evidencePassageIds: [] },
      ],
    })

    expect(draft.id).toBeDefined()
    expect(draft.sections).toHaveLength(1)
    expect(draft.status).toBe("draft")
  })

  it("should compute draft word count", () => {
    const draft = createDraft({
      sections: [
        { sectionId: "s1", title: "S1", content: "word1 word2", wordCount: 2, claims: [], links: [], status: "draft", evidencePassageIds: [] },
        { sectionId: "s2", title: "S2", content: "word3 word4 word5", wordCount: 3, claims: [], links: [], status: "draft", evidencePassageIds: [] },
      ],
    })

    expect(computeDraftWordCount(draft)).toBe(5)
  })

  it("should compute stable content hash", () => {
    const draft1 = createDraft({
      sections: [
        { sectionId: "s1", title: "S1", content: "hello world", wordCount: 2, claims: [], links: [], status: "draft", evidencePassageIds: [] },
      ],
    })
    const draft2 = createDraft({
      sections: [
        { sectionId: "s1", title: "S1", content: "hello world", wordCount: 2, claims: [], links: [], status: "draft", evidencePassageIds: [] },
      ],
    })

    expect(computeDraftContentHash(draft1)).toBe(computeDraftContentHash(draft2))
  })

  it("should validate draft with quality checks", () => {
    const longContent = Array(600).fill("word").join(" ")
    const draft = createDraft({
      metadata: {
        title: "Test Draft With Enough Words To Pass Quality Gates And Validation",
        description: "Test description with enough detail to pass all quality gates and validation requirements for publication.",
        canonical: "/servers/postgres",
        alternates: [],
      },
      sections: [
        { sectionId: "s1", title: "S1", content: longContent, wordCount: 600, claims: ["claim-1"], links: ["server.postgres", "server.mysql", "server.mongodb"], status: "draft", evidencePassageIds: ["passage-1", "passage-2"] },
      ],
      schema: { "@type": "SoftwareApplication" },
    })

    const result = validateDraft(draft)
    expect(result.failures).toHaveLength(0)
    expect(result.score).toBeDefined()
    expect(result.score.overall).toBeGreaterThanOrEqual(0)
    expect(result.score.aeo).toBeGreaterThanOrEqual(0)
    expect(result.score.geo).toBeGreaterThanOrEqual(0)
    expect(result.score.internalLinks).toBeGreaterThanOrEqual(0)
  })

  it("should fail validation for short draft", () => {
    const draft = createDraft({
      metadata: {
        title: "Short",
        description: "Short",
        canonical: "/servers/postgres",
        alternates: [],
      },
      sections: [
        { sectionId: "s1", title: "S1", content: "Short", wordCount: 1, claims: [], links: [], status: "draft", evidencePassageIds: [] },
      ],
      schema: {},
    })

    const result = validateDraft(draft)
    expect(result.failures.length).toBeGreaterThan(0)
    expect(result.passed).toBe(false)
  })
})
