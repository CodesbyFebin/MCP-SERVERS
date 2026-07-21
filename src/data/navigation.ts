export interface NavItem {
  name: string;
  href: string;
}

export const headerNav: NavItem[] = [
  { name: "MCP Servers", href: "/mcp-server-directory" },
  { name: "Integrations", href: "/integrations" },
  { name: "Clients", href: "/clients" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Learn", href: "/learn" },
  { name: "India Hub", href: "/learn/india-services" },
  { name: "Indic NLP", href: "/learn/indic-nlp-guide" }
];

export const footerNav = {
  platform: [
    { name: "MCP Servers", href: "/mcp-server-directory" },
    { name: "Directory", href: "/mcp-server-directory" },
    { name: "Pricing", href: "/pricing" },
    { name: "Status", href: "/status" }
  ],
  resources: [
    { name: "Developer Docs", href: "/docs" },
    { name: "Security", href: "/security" },
    { name: "What Is MCP?", href: "/what-is-mcp" },
    { name: "Production Deployment", href: "/learn/mcp-production-deployment" },
    { name: "Playground", href: "/tools/mcp-playground" },
    { name: "Sitemap", href: "/sitemap" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Security Trust", href: "/security" },
    { name: "Contact Support", href: "/contact" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ]
};
