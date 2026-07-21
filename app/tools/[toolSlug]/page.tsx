import type { Metadata } from "next";
import DeveloperToolsClient from "../../../src/components/DeveloperToolsClient";
import DpdpScannerClient from "../../../src/components/DpdpScannerClient";
import DpdpComplianceChecklist from "../../../src/components/DpdpComplianceChecklist";
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
  "dpdp-compliance-scanner",
  "dpdp-compliance-checklist",
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
      alternates: {
        canonical: `/tools/${toolSlug}`,
        languages: {
          "en-IN": `/tools/${toolSlug}`,
          "en": `/tools/${toolSlug}`,
        }
      },
    };
  }

  if (toolSlug === "dpdp-compliance-scanner") {
    return {
      title: "DPDP Compliance Scanner - MCPserver.in",
      description:
        "Run live technical compliance checks against a GitHub repository or a live MCP server endpoint: license, security policy, data-handling disclosure, HTTPS, and access control.",
      alternates: {
        canonical: `/tools/${toolSlug}`,
        languages: {
          "en-IN": `/tools/${toolSlug}`,
          "en": `/tools/${toolSlug}`,
        }
      },
    };
  }

  if (toolSlug === "dpdp-compliance-checklist") {
    return {
      title: "DPDP & RBI Compliance Checklist - MCPserver.in",
      description:
        "Educational compliance checklist for MCP deployments in India. Covers DPDP Act 2023, RBI guidelines, data localization, consent management, and breach notification requirements.",
      alternates: {
        canonical: `/tools/${toolSlug}`,
        languages: {
          "en-IN": `/tools/${toolSlug}`,
          "en": `/tools/${toolSlug}`,
        }
      },
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
    alternates: {
      canonical: `/tools/${toolSlug}`,
      languages: {
        "en-IN": `/tools/${toolSlug}`,
        "en": `/tools/${toolSlug}`,
      }
    },
  };
}

export default async function ToolsPage({ params }: PageProps) {
  const { toolSlug } = await params;

  if (!VALID_TOOLS.has(toolSlug)) {
    notFound();
  }

  if (toolSlug === "dpdp-compliance-scanner") {
    return <DpdpScannerClient />;
  }

  if (toolSlug === "dpdp-compliance-checklist") {
    return <DpdpComplianceChecklist />;
  }

  return <DeveloperToolsClient toolSlug={toolSlug} />;
}
