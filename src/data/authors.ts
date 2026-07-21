export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  expertise: string[];
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  avatar?: string;
}

export const authors: Author[] = [
  {
    name: "MCPserver.in Engineering",
    slug: "mcpserver-engineering",
    role: "Platform Team",
    bio: "Core engineering team responsible for MCPserver.in infrastructure, protocol implementation, and India-first compliance controls. Maintains the curated server directory, hosting runtimes, and developer tooling.",
    expertise: ["Model Context Protocol", "Distributed Systems", "India Data Localization", "DPDP Compliance", "Edge Infrastructure"],
    social: {
      github: "https://github.com/CodesbyFebin/MCP-SERVERS",
      twitter: "https://twitter.com/mcpserver_in"
    }
  },
  {
    name: "Protocol Team",
    slug: "protocol-team",
    role: "Documentation & Standards",
    bio: "Technical writing and protocol standards team. Authors the MCPserver.in documentation clusters, glossary entries, and integration guides. Maintains schema validation and SEO optimization for AI-first retrieval.",
    expertise: ["Technical Writing", "Schema.org", "SEO/AEO", "JSON-RPC", "MCP Specification"],
    social: {
      github: "https://github.com/CodesbyFebin/MCP-SERVERS"
    }
  },
  {
    name: "Security & Compliance Team",
    slug: "security-compliance-team",
    role: "Infrastructure Security",
    bio: "Security engineering team focused on MCP server sandboxing, credential isolation, audit logging, and India regulatory compliance. Designs the zero-trust gateway and data residency controls.",
    expertise: ["Zero-Trust Architecture", "DPDP Act 2023", "RBI Guidelines", "Container Security", "Audit Logging"],
    social: {
      github: "https://github.com/CodesbyFebin/MCP-SERVERS"
    }
  },
  {
    name: "Community Research Team",
    slug: "community-research-team",
    role: "Ecosystem Intelligence",
    bio: "Tracks MCP ecosystem growth, server quality signals, and India adoption trends. Publishes the quarterly State of MCP in India report and maintains the community benchmarks dataset.",
    expertise: ["Market Research", "Ecosystem Analysis", "Benchmarking", "Community Growth", "India AI Landscape"],
    social: {
      twitter: "https://twitter.com/mcpserver_in"
    }
  }
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find(a => a.slug === slug);
}
