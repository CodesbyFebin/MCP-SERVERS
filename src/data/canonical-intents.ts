export interface CanonicalIntent {
  id: string;
  canonicalPath: string;
  primaryQuery: string;
  supportingQueries: string[];
  contentType: string;
  status: "active" | "merged" | "retired";
  conflictsWith?: string[];
}

export const canonicalIntents = {
  brand: {
    id: "brand",
    canonicalPath: "/",
    primaryQuery: "mcpserver",
    supportingQueries: ["MCPserver.in", "mcpserver org"],
    contentType: "homepage",
    status: "active",
  },
  whatIsMcp: {
    id: "whatIsMcp",
    canonicalPath: "/what-is-mcp/",
    primaryQuery: "what is mcp",
    supportingQueries: ["model context protocol meaning", "mcp explained"],
    contentType: "definition",
    status: "active",
  },
  whatIsMcpServer: {
    id: "whatIsMcpServer",
    canonicalPath: "/mcp-server/",
    primaryQuery: "what is an mcp server",
    supportingQueries: ["what is mcp server", "mcp server meaning"],
    contentType: "definition",
    status: "active",
  },
  serverDirectory: {
    id: "serverDirectory",
    canonicalPath: "/servers/",
    primaryQuery: "mcp server directory",
    supportingQueries: ["mcp server directory India", "mcp servers list"],
    contentType: "directory",
    status: "active",
    conflictsWith: ["/mcp-server-directory/"],
  },
  buildServer: {
    id: "buildServer",
    canonicalPath: "/how-to-build-mcp-server/",
    primaryQuery: "how to build an mcp server",
    supportingQueries: ["build mcp server", "create mcp server"],
    contentType: "tutorial",
    status: "active",
    conflictsWith: ["/mcp-tutorial/", "/blog/how-to-build-mcp-server-from-scratch/"],
  },
  serverHosting: {
    id: "serverHosting",
    canonicalPath: "/mcp-server-hosting/",
    primaryQuery: "mcp server hosting",
    supportingQueries: ["mcp hosting", "host mcp server", "mcp server hosting India"],
    contentType: "hosting-guide",
    status: "active",
    conflictsWith: ["/mcp-hosting/"],
  },
  serverSecurity: {
    id: "serverSecurity",
    canonicalPath: "/mcp-security/",
    primaryQuery: "mcp server security",
    supportingQueries: ["mcp security checklist", "secure mcp server"],
    contentType: "security-guide",
    status: "active",
  },
} satisfies Record<string, CanonicalIntent>;

export const canonicalIntentList = Object.values(canonicalIntents);
