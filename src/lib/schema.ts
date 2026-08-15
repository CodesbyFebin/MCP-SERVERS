import { siteConfig } from "../data/site";
import { SITE_ORIGIN } from "./canonical-urls";

function absoluteUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_ORIGIN}${path}`;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: siteConfig.brand,
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/logo.svg`,
    sameAs: ["https://github.com/CodesbyFebin/MCP-SERVERS"],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: siteConfig.brand,
    url: `${SITE_ORIGIN}/`,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

export function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_ORIGIN}/#webapplication`,
    name: siteConfig.brand,
    url: `${SITE_ORIGIN}/`,
    description: "Evidence-led MCP discovery and knowledge platform with provenance-aware publication controls.",
    applicationCategory: "DeveloperApplication",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

export interface BreadcrumbStep {
  name: string;
  item: string;
}

export function getBreadcrumbSchema(steps: BreadcrumbStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: step.name,
      item: absoluteUrl(step.item),
    })),
  };
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function getFAQSchema(items: FAQSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[] | undefined) {
  if (!faqs || faqs.length === 0) return null;
  return getFAQSchema(faqs);
}

export interface PillarSchemaOptions {
  slug: string;
  title: string;
  description: string;
  faqs?: { question: string; answer: string }[];
  sameAs?: string[];
  mentions?: { name: string; url?: string }[];
}

export function generatePillarSchema(pillar: PillarSchemaOptions) {
  const url = `${SITE_ORIGIN}/${pillar.slug}/`;
  const faqSchema = generateFAQSchema(pillar.faqs);

  const article = {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: pillar.title,
    description: pillar.description,
    url,
    isPartOf: { "@id": `${url}#webpage` },
    inLanguage: "en",
    mainEntityOfPage: url,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    ...(pillar.sameAs && { sameAs: pillar.sameAs }),
    ...(pillar.mentions && { mentions: pillar.mentions.map((mention) => ({ "@type": "Thing", ...mention })) }),
  };

  if (!faqSchema) {
    return { "@context": "https://schema.org", ...article };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [article, faqSchema],
  };
}

export function getSoftwareApplicationSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "DeveloperApplication",
    description,
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export function getHowToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export interface UnifiedGraphOptions {
  pageUrl: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbStep[];
  faq?: FAQSchemaItem[];
  speakable?: string[];
  article?: {
    title: string;
    description: string;
    authorName: string;
    authorRole?: string;
    datePublished: string;
    dateModified: string;
  };
  softwareApplication?: {
    name: string;
    description: string;
  };
  mentions?: { name: string; url?: string }[];
  sameAs?: string[];
  itemList?: { name: string; url: string; description?: string }[];
}

/**
 * Build a connected graph from claims already supplied by the page.
 * The helper intentionally keeps the shared Organization/WebSite nodes minimal:
 * optional addresses, certifications, ratings, pricing, compatibility, and search
 * behavior must be added only by a page that has evidence for them.
 */
export function getUnifiedGraphSchema(options: UnifiedGraphOptions) {
  const fullPageUrl = absoluteUrl(options.pageUrl);

  const organizationEntity = {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: siteConfig.brand,
    url: `${SITE_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/logo.svg`,
      caption: siteConfig.brand,
    },
    sameAs: ["https://github.com/CodesbyFebin/MCP-SERVERS"],
  };

  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: siteConfig.brand,
    url: `${SITE_ORIGIN}/`,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };

  const webpageEntity: Record<string, any> = {
    "@type": "WebPage",
    "@id": `${fullPageUrl}#webpage`,
    url: fullPageUrl,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };

  if (options.speakable && options.speakable.length > 0) {
    webpageEntity.speakable = options.speakable;
  }

  const graph: any[] = [organizationEntity, websiteEntity, webpageEntity];

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const breadcrumbId = `${fullPageUrl}#breadcrumbs`;
    const breadcrumbListEntity = {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: options.breadcrumbs.map((step, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: step.name,
        item: absoluteUrl(step.item),
      })),
    };
    webpageEntity.breadcrumb = { "@id": breadcrumbId };
    graph.push(breadcrumbListEntity);
  }

  if (options.article) {
    const articleEntity: Record<string, any> = {
      "@type": "TechArticle",
      "@id": `${fullPageUrl}#article`,
      isPartOf: { "@id": `${fullPageUrl}#webpage` },
      headline: options.article.title,
      description: options.article.description,
      inLanguage: "en",
      mainEntityOfPage: fullPageUrl,
      datePublished: options.article.datePublished,
      dateModified: options.article.dateModified,
      author: {
        "@type": "Person",
        name: options.article.authorName,
        ...(options.article.authorRole ? { jobTitle: options.article.authorRole } : {}),
      },
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      ...(options.sameAs && { sameAs: options.sameAs }),
      ...(options.mentions && { mentions: options.mentions.map((mention) => ({ "@type": "Thing", ...mention })) }),
    };
    webpageEntity.mainEntity = { "@id": `${fullPageUrl}#article` };
    graph.push(articleEntity);
  }

  if (options.softwareApplication) {
    const softwareEntity = {
      "@type": "SoftwareApplication",
      "@id": `${fullPageUrl}#software`,
      name: options.softwareApplication.name,
      applicationCategory: "DeveloperApplication",
      description: options.softwareApplication.description,
    };
    webpageEntity.about = { "@id": `${fullPageUrl}#software` };
    graph.push(softwareEntity);
  }

  if (options.faq && options.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${fullPageUrl}#faq`,
      isPartOf: { "@id": `${fullPageUrl}#webpage` },
      mainEntity: options.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (options.itemList && options.itemList.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${fullPageUrl}#itemlist`,
      isPartOf: { "@id": `${fullPageUrl}#webpage` },
      numberOfItems: options.itemList.length,
      itemListElement: options.itemList.map((entry, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: entry.name,
        url: absoluteUrl(entry.url),
        ...(entry.description && { description: entry.description }),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
