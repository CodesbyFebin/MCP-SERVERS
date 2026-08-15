export interface DirectoryCategory {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
}

// `count` is retained as editorial inventory metadata for compatibility only.
// Public counts must be derived from the publication-approved server projection.
export const categories: DirectoryCategory[] = [
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Connect code repositories, CI/CD, and development tooling.",
    iconName: "Code",
    count: 34
  },
  {
    slug: "databases",
    name: "Databases",
    description: "Connect SQL, NoSQL, and data systems through MCP server implementations.",
    iconName: "Database",
    count: 28
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Connect productivity and work-management systems through MCP.",
    iconName: "Briefcase",
    count: 22
  },
  {
    slug: "finance",
    name: "Finance",
    description: "Connect payment, billing, and finance systems where MCP support is evidenced.",
    iconName: "CreditCard",
    count: 16
  },
  {
    slug: "communication",
    name: "Communication",
    description: "Communication and messaging integrations with evidence-backed MCP support.",
    iconName: "MessageCircle",
    count: 0
  },
  {
    slug: "devops",
    name: "DevOps",
    description: "CI/CD, container, orchestration, and automation integrations.",
    iconName: "Settings",
    count: 0
  },
  {
    slug: "cloud",
    name: "Cloud Services",
    description: "Cloud-provider and infrastructure integrations with documented MCP support.",
    iconName: "Cloud",
    count: 0
  },
  {
    slug: "ai-ml",
    name: "AI/ML Services",
    description: "Model-provider and machine-learning integrations with documented MCP support.",
    iconName: "Brain",
    count: 0
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description: "Infrastructure and operations integrations tracked by the Evidence Ledger.",
    iconName: "Server",
    count: 0
  },
  {
    slug: "payments",
    name: "Payments & Billing",
    description: "Payment and billing integrations tracked separately when supported by evidence.",
    iconName: "CreditCard",
    count: 0
  },
  {
    slug: "iot",
    name: "Internet of Things",
    description: "IoT and edge integrations tracked by the Evidence Ledger.",
    iconName: "Zap",
    count: 0
  },
  {
    slug: "analytics",
    name: "Analytics & Data",
    description: "Analytics, BI, and data-visualization integrations with documented MCP support.",
    iconName: "BarChart3",
    count: 0
  },
  {
    slug: "security",
    name: "Security & Compliance",
    description: "Identity and security integrations tracked with claim-specific evidence.",
    iconName: "Shield",
    count: 0
  },
  {
    slug: "storage",
    name: "Storage & CDN",
    description: "Storage, file-system, and delivery integrations tracked by the Evidence Ledger.",
    iconName: "HardDrive",
    count: 0
  },
  {
    slug: "monitoring",
    name: "Monitoring & Observability",
    description: "Monitoring, tracing, and observability integrations with documented MCP support.",
    iconName: "Activity",
    count: 0
  }
];
