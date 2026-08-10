import fs from "fs"
import path from "path"

export interface ContentPage {
  title: string
  description: string
  keywords: string[]
  schemaType: string
  wordCount: number
  content: string
  faq?: Array<{ question: string; answer: string }>
  ugc?: {
    reviews: Array<{ author: string; rating: number; text: string; date: string }>
    discussions: Array<{ platform: string; title: string; url: string; excerpt: string }>
    caseStudies: Array<{ company: string; challenge: string; solution: string; outcome: string }>
  }
}

const CONTENT_ROOT = path.join(process.cwd(), "content")

export function loadServerContent(slug: string): ContentPage | null {
  return loadContent(path.join(CONTENT_ROOT, "servers", `${slug}.md`))
}

export function loadTopicContent(slug: string): ContentPage | null {
  return loadContent(path.join(CONTENT_ROOT, "topics", `${slug}.md`))
}

export function loadPillarContent(slug: string): ContentPage | null {
  return loadContent(path.join(CONTENT_ROOT, "pillars", `${slug}.md`))
}

export function loadComparisonContent(slug: string): ContentPage | null {
  return loadContent(path.join(CONTENT_ROOT, "compare", `${slug}.md`))
}

export function loadPageContent(slug: string): ContentPage | null {
  return loadContent(path.join(CONTENT_ROOT, "pages", `${slug}.md`))
}

function loadContent(filePath: string): ContentPage | null {
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, "utf-8")
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) return null

  const frontmatter = frontmatterMatch[1]
  const body = frontmatterMatch[2]

  const parseFrontmatterField = (key: string): string | undefined => {
    const regex = new RegExp(`${key}:\\s*"([^"]*)"`)
    const match = frontmatter.match(regex)
    return match ? match[1] : undefined
  }

  const parseKeywords = (): string[] => {
    const match = frontmatter.match(/keywords:\s*\[([\s\S]*?)\]/)
    if (!match) return []
    return match[1].split(",").map((k) => k.trim().replace(/^"|"$/g, "")).filter(Boolean)
  }

  const parseWordCount = (): number => {
    const match = frontmatter.match(/wordCount:\s*(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  const parseFAQ = (): Array<{ question: string; answer: string }> => {
    const faqSection = body.match(/## Frequently Asked Questions\n\n([\s\S]*?)(?=\n## |\n---|\n$)/)
    if (!faqSection) return []

    const questions: Array<{ question: string; answer: string }> = []
    const questionRegex = /### (.*?)\n\n([\s\S]*?)(?=\n### |\n## |\n---|\n$)/g
    let match
    while ((match = questionRegex.exec(faqSection[1])) !== null) {
      questions.push({ question: match[1].trim(), answer: match[2].trim() })
    }
    return questions
  }

  const parseUGC = () => {
    const ugcSection = body.match(/## Community Insights\n\n([\s\S]*?)$/)
    if (!ugcSection) return undefined

    const reviews: Array<{ author: string; rating: number; text: string; date: string }> = []
    const discussions: Array<{ platform: string; title: string; url: string; excerpt: string }> = []
    const caseStudies: Array<{ company: string; challenge: string; solution: string; outcome: string }> = []

    const reviewRegex = /\*\*(.*?)\*\* \((\d)\/5\) — \*(.*?)\*\n\n> ([\s\S]*?)(?=\n\n\*\*|\n\n###|\n\n---|\n$)/g
    let match
    while ((match = reviewRegex.exec(ugcSection[1])) !== null) {
      reviews.push({ author: match[1].trim(), rating: parseInt(match[2], 10), text: match[4].trim(), date: match[3].trim() })
    }

    const discussionRegex = /- \[\*\*(.*?)\*\*\]\((.*?)\)\*\* on (.*?)\n\s*> ([\s\S]*?)(?=\n-|\n###|\n---|\n$)/g
    while ((match = discussionRegex.exec(ugcSection[1])) !== null) {
      discussions.push({ platform: match[3].trim(), title: match[1].trim(), url: match[2].trim(), excerpt: match[4].trim() })
    }

    const caseStudyRegex = /\*\*(.*?)\*\*\n\n- \*\*Challenge\*\*: ([\s\S]*?)\n- \*\*Solution\*\*: ([\s\S]*?)\n- \*\*Outcome\*\*: ([\s\S]*?)(?=\n\n\*\*|\n---|\n$)/g
    while ((match = caseStudyRegex.exec(ugcSection[1])) !== null) {
      caseStudies.push({ company: match[1].trim(), challenge: match[2].trim(), solution: match[3].trim(), outcome: match[4].trim() })
    }

    if (reviews.length === 0 && discussions.length === 0 && caseStudies.length === 0) return undefined
    return { reviews, discussions, caseStudies }
  }

  return {
    title: parseFrontmatterField("title") || "",
    description: parseFrontmatterField("description") || "",
    keywords: parseKeywords(),
    schemaType: parseFrontmatterField("schemaType") || "WebPage",
    wordCount: parseWordCount(),
    content: body.trim(),
    faq: parseFAQ(),
    ugc: parseUGC(),
  }
}
