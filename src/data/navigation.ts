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
  { name: "Resources", href: "/what-is-mcp" }
];

export const footerNav = {
  platform: [
    { name: "MCP Servers Hub", href: "/mcp-server" },
    { name: "Directory", href: "/mcp-server-directory" },
    { name: "Hosting Platform", href: "/mcp-server-hosting" },
    { name: "Gateway Proxy", href: "/mcp-gateway" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "Uptime Status", href: "/security" }
  ],
  resources: [
    { name: "Developer Docs", href: "/docs" },
    { name: "MCP Security Guide", href: "/mcp-security" },
    { name: "What Is MCP?", href: "/what-is-mcp" },
    { name: "How to Build MCP", href: "/topics/how-to-build-mcp-server" },
    { name: "Playground", href: "/tools/mcp-playground" },
    { name: "Sitemap", href: "/sitemap.xml" }
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
