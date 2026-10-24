import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { ServerDirectory, directoryMetadata } from "@/src/components/content/ServerDirectory";

export const dynamic = "force-static";

const SLUG = "iot";
const TITLE = "IoT MCP Servers: Home Assistant, Azure IoT";
const DESCRIPTION =
  "Official MCP options for IoT and smart home: Home Assistant's built-in MCP Server integration and Azure IoT Hub in the Azure MCP Server. Setup notes and safety for physical devices.";

export function generateMetadata(): Metadata {
  return directoryMetadata(SLUG, TITLE, DESCRIPTION);
}

export default function Page() {
  return (
    <ServerDirectory
      category="IoT"
      slug={SLUG}
      title={TITLE}
      description={DESCRIPTION}
      reviewedAt="2026-09-23"
      directAnswer="For smart homes, Home Assistant has an official Model Context Protocol Server integration that exposes the devices and entities you choose, at /api/mcp with token authentication. For industrial and cloud IoT, Microsoft's Azure MCP Server includes Azure IoT Hub and Azure Device Registry. Because these tools act on physical devices, limit what is exposed and confirm actions."
      entries={[
        { name: "Home Assistant MCP Server integration", publisher: "Home Assistant", url: "https://www.home-assistant.io/integrations/mcp_server/", note: "Exposes Home Assistant's Assist API to MCP clients at /api/mcp; requires an authentication token; you choose which entities are exposed." },
        { name: "Azure MCP Server (IoT Hub, Device Registry)", publisher: "Microsoft", url: "https://github.com/microsoft/mcp/blob/main/servers/Azure.Mcp.Server/README.md", note: "Azure IoT Hub and Azure Device Registry are among the services the Azure MCP Server lists.", page: "/servers/azure-mcp-server" },
      ]}
      choosing={
        <>
          <P>Physical devices raise the stakes of a wrong tool call:</P>
          <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
            <li>Expose only the entities the assistant needs; keep locks, alarms and garage doors out unless you really want voice or chat control of them.</li>
            <li>Require confirmation for anything that unlocks, disarms or switches off safety equipment.</li>
            <li>Keep the Home Assistant token private; it grants control of whatever is exposed.</li>
            <li>If your MCP client doesn&apos;t support remote servers, Home Assistant notes you need an extra local gateway that bridges to remote servers.</li>
          </ul>
        </>
      }
      faqs={[
        { question: "Does Home Assistant support MCP?", answer: "Yes. Its Model Context Protocol Server integration exposes selected entities to MCP clients such as Claude Desktop." },
        { question: "What URL does Home Assistant use for MCP?", answer: "/api/mcp on your Home Assistant instance, with an authentication token." },
        { question: "Can I control my lights from Claude?", answer: "Yes, if you expose them through the Home Assistant MCP Server integration." },
        { question: "Is there an MCP server for Azure IoT Hub?", answer: "Azure IoT Hub is one of the services covered by Microsoft's Azure MCP Server." },
        { question: "Should I expose door locks to an AI assistant?", answer: "Only with confirmation for every action, if at all." },
      ]}
      related={[
        { href: "/servers/azure-mcp-server", label: "Azure MCP Server" },
        { href: "/glossary/guardrails", label: "Guardrails" },
        { href: "/directory/monitoring", label: "Monitoring MCP servers" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
