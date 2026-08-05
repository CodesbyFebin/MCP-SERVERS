import DirectoryClient from "./DirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory: Browse Verified Integrations",
  description: "Browse the curated directory of Model Context Protocol (MCP) servers. Databases, web APIs, developer tools, and SaaS platforms.",
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
