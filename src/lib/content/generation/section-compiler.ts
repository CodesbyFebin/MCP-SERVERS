import type { ContentTemplate, TemplateSection } from "../templates/page-templates"
import type { Draft } from "../drafts/draft-manager"

export interface CompileOptions {
  entityId: string
  route: string
  pageType: string
  locale: string
  template: ContentTemplate
  claims: Array<{ id: string; statement: string; evidencePassageIds: string[] }>
  passages: Array<{ id: string; text: string }>
  relationships: Array<{ targetId: string; type: string }>
  terminology: Record<string, string>
}

export interface SectionCompileResult {
  sectionId: string
  title: string
  content: string
  wordCount: number
  claims: string[]
  links: string[]
  evidencePassageIds: string[]
  status: "compiled" | "needs-review" | "rejected"
}

export interface PageCompileResult {
  entityId: string
  route: string
  sections: SectionCompileResult[]
  metadata: {
    title: string
    description: string
    canonical: string
    alternates: Array<{ hreflang: string; url: string }>
  }
  schema: Record<string, unknown>
  totalWordCount: number
  status: "draft" | "review" | "published" | "rejected"
}

export function compileSections(options: CompileOptions): PageCompileResult {
  const sections: SectionCompileResult[] = []

  for (const templateSection of options.template.sections) {
    const allowedClaims = options.claims.filter((claim) =>
      templateSection.allowedClaimTypes.includes(claim.id.split(":").pop() || "")
    )

    const sectionContent = compileSectionContent(templateSection, allowedClaims, options.passages)
    const links = extractLinksFromContent(sectionContent, options.relationships)

    sections.push({
      sectionId: templateSection.id,
      title: templateSection.title,
      content: sectionContent,
      wordCount: sectionContent.split(/\s+/).filter(Boolean).length,
      claims: allowedClaims.map((c) => c.id),
      links,
      evidencePassageIds: allowedClaims.flatMap((c) => c.evidencePassageIds),
      status: "compiled",
    })
  }

  const totalWordCount = sections.reduce((sum, s) => sum + s.wordCount, 0)

  return {
    entityId: options.entityId,
    route: options.route,
    sections,
    metadata: {
      title: `${options.entityId.split(":").pop() || "Entity"} ${options.pageType}`,
      description: `${options.pageType} page for ${options.entityId}`,
      canonical: options.route,
      alternates: [],
    },
    schema: {},
    totalWordCount,
    status: "draft",
  }
}

function compileSectionContent(
  templateSection: TemplateSection,
  claims: Array<{ id: string; statement: string; evidencePassageIds: string[] }>,
  passages: Array<{ id: string; text: string }>
): string {
  const passageMap = new Map(passages.map((p) => [p.id, p.text]))
  const claimTexts = claims.map((claim) => {
    const evidenceTexts = claim.evidencePassageIds.map((pid) => passageMap.get(pid)).filter(Boolean)
    return `${claim.statement}${evidenceTexts.length > 0 ? ` Supported by: ${evidenceTexts.join("; ")}` : ""}`
  })

  return `# ${templateSection.title}\n\n${templateSection.goal}\n\n${claimTexts.join("\n\n")}`
}

function extractLinksFromContent(
  content: string,
  relationships: Array<{ targetId: string; type: string }>
): string[] {
  const links: string[] = []
  for (const rel of relationships) {
    if (rel.targetId) {
      links.push(rel.targetId)
    }
  }
  return links
}
