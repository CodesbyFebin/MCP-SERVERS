export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Great for testing MCP servers locally and running simple personal automated workflows.",
    features: [
      "Up to 3 Active Servers",
      "Stdio local transport execution",
      "Local MCP Playground access",
      "Standard schema validator tools",
      "Community forum support"
    ],
    cta: "Start Free"
  },
  {
    name: "Developer",
    price: "₹999",
    period: "month",
    description: "Ideal for individual developers building custom private integrations and hosting secure remotes.",
    features: [
      "Up to 10 Hosted SSE Servers",
      "Secure API credentials isolation",
      "100,000 tool executions / day",
      "Basic logs and monitoring stream",
      "Mumbai/Bengaluru low-latency edge",
      "Email support (24h response)"
    ],
    cta: "Deploy Now",
    badge: "Popular"
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "month",
    description: "Designed for power users, agency builders, and growing startup development teams.",
    features: [
      "Up to 30 Hosted SSE Servers",
      "Centralized MCP Gateway proxies",
      "1,000,000 tool executions / day",
      "Detailed request trace logs",
      "Advanced latency metrics dashboards",
      "Chat support (under 4h)"
    ],
    cta: "Upgrade to Pro"
  },
  {
    name: "Team",
    price: "₹8,999",
    period: "month",
    description: "Perfect for tech departments deploying collaborative AI agents on shared files and systems.",
    features: [
      "Unlimited Hosted Servers",
      "Up to 15 Dedicated Team Gateways",
      "10,000,000 tool executions / day",
      "Shared database connection pools",
      "Granular tool permission settings",
      "Dedicated Slack channel support"
    ],
    cta: "Start Team Trial"
  },
  {
    name: "Business",
    price: "₹24,999",
    period: "month",
    description: "Built for mid-sized organizations with strict compliance, audit, and security standards.",
    features: [
      "Fully Isolated cloud container pods",
      "Strict OAuth token verification hooks",
      "50,000,000 tool executions / day",
      "Tamper-proof audit logs (SOC2 path)",
      "VPC Peering database connections",
      "Dedicated Account Manager"
    ],
    cta: "Contact Sales"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "negotiated",
    description: "Custom infrastructure clusters, complete on-premise gateways, and premium SLA commitments.",
    features: [
      "On-premise / Private Cloud deployments",
      "Unlimited tool executions SLA",
      "Complete Single-Sign-On (SSO / SAML)",
      "24/7 dedicated telephone hotline",
      "Custom security audits & certification support",
      "Negotiated uptime SLA"
    ],
    cta: "Request Demo",
    badge: "Enterprise Ready"
  }
];
