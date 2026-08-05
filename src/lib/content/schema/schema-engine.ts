export interface SchemaOrg {
  "@context"?: string
  "@type": string
  [key: string]: unknown
}

export interface BreadcrumbListSchema extends SchemaOrg {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item?: string
  }>
}

export interface SoftwareApplicationSchema extends SchemaOrg {
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  name: string
  applicationCategory?: string
  operatingSystem?: string
  softwareVersion?: string
  license?: string
  url?: string
}

export interface TechArticleSchema extends SchemaOrg {
  "@context": "https://schema.org"
  "@type": "TechArticle"
  headline: string
  description?: string
  author?: { "@type": "Person"; name: string }
  datePublished?: string
  dateModified?: string
}

export interface FAQPageSchema extends SchemaOrg {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

export interface HowToSchema extends SchemaOrg {
  "@context": "https://schema.org"
  "@type": "HowTo"
  name: string
  description?: string
  step: Array<{
    "@type": "HowToStep"
    name: string
    text: string
  }>
}

export function createBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

export function createSoftwareApplicationSchema(overrides: Partial<SoftwareApplicationSchema> = {}): SoftwareApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "",
    ...overrides,
  }
}

export function createTechArticleSchema(overrides: Partial<TechArticleSchema> = {}): TechArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "",
    ...overrides,
  }
}

export function createFAQPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function createHowToSchema(
  name: string,
  steps: Array<{ name: string; text: string }>
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  }
}
