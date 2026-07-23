export interface DirectoryCategory {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
}

export const categories: DirectoryCategory[] = [
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Connect code repositories, CI/CD, and hosting dashboards.",
    iconName: "Code",
    count: 34
  },
  {
    slug: "databases",
    name: "Databases",
    description: "Safely expose SQL/NoSQL databases and vector indexes to models.",
    iconName: "Database",
    count: 28
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Let AI organize emails, calendar logs, and project management tickets.",
    iconName: "Briefcase",
    count: 22
  },
  {
    slug: "finance",
    name: "Finance & Billing",
    description: "Manage subscription plans, check invoices, and trigger split billing.",
    iconName: "CreditCard",
    count: 16
  },
  {
    slug: "communication",
    name: "Communication",
    description: "Connect to Slack, Discord, Teams, Email via MCP.",
    iconName: "MessageCircle",
    count: 0
  },
  {
    slug: "devops",
    name: "DevOps",
    description: "CI/CD, Jenkins, Docker, Kubernetes, and pipeline automation.",
    iconName: "Settings",
    count: 0
  },
  {
    slug: "cloud",
    name: "Cloud Services",
    description: "AWS, Azure, GCP, Cloudflare, and multi-cloud MCP servers.",
    iconName: "Cloud",
    count: 0
  },
  {
    slug: "ai-ml",
    name: "AI/ML Services",
    description: "OpenAI, Anthropic, Hugging Face, and model provider servers.",
    iconName: "Brain",
    count: 0
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description: "IaC, monitoring agents, and infrastructure MCP servers.",
    iconName: "Server",
    count: 0
  },
  {
    slug: "payments",
    name: "Payments & Billing",
    description: "Stripe, PayPal, invoicing, and payment gateway servers.",
    iconName: "CreditCard",
    count: 0
  },
  {
    slug: "iot",
    name: "Internet of Things",
    description: "IoT device management, sensor data, and edge MCP servers.",
    iconName: "Zap",
    count: 0
  },
  {
    slug: "analytics",
    name: "Analytics & Data",
    description: "Analytics platforms, BI tools, and data visualization servers.",
    iconName: "BarChart3",
    count: 0
  },
  {
    slug: "security",
    name: "Security & Compliance",
    description: "Identity, compliance, secrets management, and security servers.",
    iconName: "Shield",
    count: 0
  },
  {
    slug: "storage",
    name: "Storage & CDN",
    description: "Object storage, file systems, backups, and CDN servers.",
    iconName: "HardDrive",
    count: 0
  },
  {
    slug: "monitoring",
    name: "Monitoring & Observability",
    description: "APM, logging, tracing, and metrics MCP servers.",
    iconName: "Activity",
    count: 0
  }
];
