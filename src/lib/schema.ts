import { siteConfig } from "../data/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.brand,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.svg`,
    "email": siteConfig.company.email,
    "foundingDate": siteConfig.company.founded.toString(),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bengaluru",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteConfig.socials.github,
      siteConfig.socials.twitter
    ]
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.brand,
    "url": siteConfig.url,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/mcp-server-directory?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteConfig.url}/#webapplication`,
    "name": siteConfig.brand,
    "url": siteConfig.url,
    "description": "Hosted MCP platform for discovering, building, testing, deploying and managing production-ready Model Context Protocol servers with India-focused compliance controls.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-Platform",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    }
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
    "itemListElement": steps.map((step, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": step.name,
      "item": `${siteConfig.url}${step.item}`
    }))
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
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
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
  const url = `${siteConfig.url}/${pillar.slug}`;
  const faqSchema = generateFAQSchema(pillar.faqs);
  
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    "headline": pillar.title,
    "description": pillar.description,
    "url": url,
    "isPartOf": {
      "@id": `${url}#webpage`
    },
    "inLanguage": "en",
    "mainEntityOfPage": url,
    "author": {
      "@type": "Organization",
      "name": "MCPserver.in Engineering",
      "@id": `${siteConfig.url}/#organization`
    },
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    ...(pillar.sameAs && { sameAs: pillar.sameAs }),
    ...(pillar.mentions && { mentions: pillar.mentions.map(m => ({ "@type": "Thing", ...m })) })
  };

  if (faqSchema) {
    schema["@graph"] = [schema, faqSchema];
  }

  return schema;
}

export function getSoftwareApplicationSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
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
    "name": name,
    "description": description,
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}

export interface UnifiedGraphOptions {
  pageUrl: string; // e.g., "/postgres-mcp-server" or "/mcp-vs-rest"
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbStep[];
  faq?: FAQSchemaItem[];
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
}

/**
 * Builds a unified, fully connected Schema.org @graph.
 * This links Organization, WebSite, WebPage, TechArticle, SoftwareApplication, FAQs and Breadcrumbs together.
 */
export function getUnifiedGraphSchema(options: UnifiedGraphOptions) {
  const fullPageUrl = `${siteConfig.url}${options.pageUrl}`;
  
  // 1. Organization Base Entity
  const organizationEntity = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.company.name,
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}/logo.svg`,
      "caption": siteConfig.brand
    },
    "email": siteConfig.company.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bengaluru",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteConfig.socials.github,
      siteConfig.socials.twitter
    ]
  };

  // 2. WebSite Base Entity
  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.brand,
    "url": siteConfig.url,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/mcp-server-directory?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // 3. WebPage Primary Node
  const webpageEntity: Record<string, any> = {
    "@type": "WebPage",
    "@id": `${fullPageUrl}#webpage`,
    "url": fullPageUrl,
    "name": options.title,
    "description": options.description,
    "isPartOf": {
      "@id": `${siteConfig.url}/#website`
    },
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    }
  };

  const graph: any[] = [organizationEntity, websiteEntity, webpageEntity];

  // 4. Breadcrumbs list mapping
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const breadcrumbListEntity = {
      "@type": "BreadcrumbList",
      "@id": `${fullPageUrl}#breadcrumbs`,
      "itemListElement": options.breadcrumbs.map((step, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": step.name,
        "item": step.item.startsWith("http") ? step.item : `${siteConfig.url}${step.item}`
      }))
    };
    webpageEntity.breadcrumb = { "@id": `${fullPageUrl}#breadcrumbs` };
    graph.push(breadcrumbListEntity);
  }

  // 5. TechArticle or Blog mapping (for topic or pillar pages)
  if (options.article) {
    const articleEntity: Record<string, any> = {
      "@type": "TechArticle",
      "@id": `${fullPageUrl}#article`,
      "isPartOf": {
        "@id": `${fullPageUrl}#webpage`
      },
      "headline": options.article.title,
      "description": options.article.description,
      "inLanguage": "en",
      "mainEntityOfPage": fullPageUrl,
      "datePublished": options.article.datePublished,
      "dateModified": options.article.dateModified,
      "author": {
        "@type": "Person",
        "name": options.article.authorName,
        "jobTitle": options.article.authorRole || "Architect"
      },
      "publisher": {
        "@id": `${siteConfig.url}/#organization`
      },
      ...(options.sameAs && { sameAs: options.sameAs }),
      ...(options.mentions && { mentions: options.mentions.map(m => ({ "@type": "Thing", ...m })) })
    };
    webpageEntity.mainEntity = { "@id": `${fullPageUrl}#article` };
    graph.push(articleEntity);
  }

  // 6. SoftwareApplication (for individual connectors/servers directories)
  if (options.softwareApplication) {
    const softwareEntity = {
      "@type": "SoftwareApplication",
      "@id": `${fullPageUrl}#software`,
      "name": options.softwareApplication.name,
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "description": options.softwareApplication.description,
      "publisher": {
        "@id": `${siteConfig.url}/#organization`
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    };
    
    // Connect Software to WebPage about attribute
    webpageEntity.about = { "@id": `${fullPageUrl}#software` };
    graph.push(softwareEntity);
  }

  // 7. FAQPage nodes
  if (options.faq && options.faq.length > 0) {
    const faqEntity = {
      "@type": "FAQPage",
      "@id": `${fullPageUrl}#faq`,
      "isPartOf": {
        "@id": `${fullPageUrl}#webpage`
      },
      "mainEntity": options.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    graph.push(faqEntity);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
