import { servers } from '../data/pilot-servers';
import { siteConfig } from '../data/site';

export function generateServerSchema(server) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `MCP ${server.primary_entity} ${server.content_family}`,
    "description": server.description,
    "applicationCategory": "DevelopmentTool",
    "operatingSystem": "CrossPlatform",
    "url": server.url,
    "sameAs": [server.url],
    "author": {
      "@type": "Organization",
      "name": siteConfig.brand
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.brand,
      "url": siteConfig.url
    },
    "datePublished": "2026-07-26",
    "keywords": server.primary_keyword,
    "featureList": [
      "Model Context Protocol Integration",
      "AI Assistant Tools",
      "Developer Workflow Optimization"
    ],
    "softwareRequirements": "Node.js 18+, MCP Client",
    "downloadUrl": server.url,
    "offerCount": 1
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MCP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Model Context Protocol (MCP) is an open standard for connecting AI assistants to external data sources and tools through a standardized protocol."
        }
      },
      {
        "@type": "Question",
        "name": "How do I deploy an MCP server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deploy MCP servers on India-focused edge infrastructure for compliance with DPDP regulations. Use the provided templates and connect via stdio or SSE transports."
        }
      },
      {
        "@type": "Question",
        "name": "What MCP servers are production-ready?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our pilot cohort includes ${servers.length} verified MCP servers including Claude, ChatGPT, Cursor, Copilot, and Gemini integrations.`
        }
      }
    ]
  };
}

export const pilotServersSchema = servers.map(generateServerSchema);