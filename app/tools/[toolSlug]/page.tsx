import type { Metadata } from "next";
import DeveloperToolsClient from "../../../src/components/DeveloperToolsClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    toolSlug: string;
  }>;
}

const VALID_TOOLS = new Set([
  "mcp-playground",
  "mcp-server-checker",
  "mcp-schema-viewer",
  "mcp-config-validator",
  "mcp-endpoint-tester",
]);

export async function generateStaticParams() {
  return Array.from(VALID_TOOLS).map((toolSlug) => ({
    toolSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  if (!VALID_TOOLS.has(toolSlug)) {
    return {
      title: "Tool Not Found - MCPserver.in",
    };
  }

  const normalized = toolSlug.startsWith("mcp-") ? toolSlug.substring(4) : toolSlug;
  const titleMap: Record<string, string> = {
    playground: "MCP Interactive Playground & Client Simulator",
    "server-checker": "MCP Port & Gateway Connection Checker",
    "schema-viewer": "MCP JSON-RPC Schema Visualizer & Validator",
    "config-validator": "Claude Desktop & Cursor Config Auditor",
    "endpoint-tester": "MCP SSE Endpoint & Handshake Tester",
  };

  const toolTitle = titleMap[normalized] || "MCP Developer Suite";

  return {
    title: `${toolTitle} - MCPserver.in`,
    description: `Diagnose, test, analyze, and package Model Context Protocol (MCP) capabilities inside your browser with the ${toolTitle}.`,
  };
}

export default async function ToolsPage({ params }: PageProps) {
  const { toolSlug } = await params;

  if (!VALID_TOOLS.has(toolSlug)) {
    notFound();
  }

  return <DeveloperToolsClient toolSlug={toolSlug} />;
}
