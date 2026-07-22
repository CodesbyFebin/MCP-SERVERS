import DirectoryClient from "./DirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory - Explore 100+ Integrations - MCPserver.in",
  description: "Browse the curated directory of Model Context Protocol (MCP) servers. Integrate databases, web APIs, developer tools, and SaaS platforms side-by-side.",
  alternates: {
    canonical: "/mcp-server-directory",
    languages: {
      "en-IN": "/mcp-server-directory",
      "en": "/mcp-server-directory",
        }
  },

};

export default function DirectoryPage() {
  return <DirectoryClient />;
}
