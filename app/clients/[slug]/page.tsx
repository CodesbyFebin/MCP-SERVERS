import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clients } from "../../../src/data/entities";
import ClientPageTemplate from "../../../src/components/templates/ClientPageTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clients.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = clients.find((e) => e.slug === slug);
  if (!entity) return { title: "Not Found" };
  return {
    title: `How to Configure MCP Servers in ${entity.name}`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `How to Configure MCP Servers in ${entity.name}`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  "claude-desktop": [
    { question: "Where is the Claude Desktop MCP config file?", answer: "On macOS: ~/Library/Application Support/Claude/claude_desktop_config.json. On Windows: %APPDATA%/Claude/claude_desktop_config.json." },
    { question: "Why are my MCP tools not showing in Claude Desktop?", answer: "Restart Claude Desktop fully after adding a server to the config file. Check that the command path is correct and the server starts without errors." },
    { question: "Does Claude Desktop support Streamable HTTP MCP servers?", answer: "Yes. Use the type: 'http' field in the server configuration with the remote server URL." },
    { question: "How many MCP servers can I add to Claude Desktop?", answer: "There is no documented hard limit. In practice, keep active servers to a manageable number to avoid startup latency." },
  ],
  "cursor": [
    { question: "Where is the Cursor MCP config file?", answer: "Global config: ~/.cursor/mcp.json. Project-specific: .cursor/mcp.json in the project root." },
    { question: "Why are MCP tools not appearing in Cursor?", answer: "Check that the server command is correct, the package is installed, and that you have restarted Cursor after saving the config." },
    { question: "Does Cursor support remote MCP servers?", answer: "Yes. Cursor supports Streamable HTTP transport for remote MCP servers." },
  ],
  "vscode": [
    { question: "Where is the VS Code MCP config file?", answer: "Project-level: .vscode/mcp.json. User-level: in VS Code settings under mcp.servers." },
    { question: "Does VS Code support OAuth for MCP servers?", answer: "Yes. VS Code is one of the most capable MCP clients, supporting OAuth 2.0, tools, resources, prompts, and sampling." },
    { question: "Do I need an extension to use MCP in VS Code?", answer: "MCP support is built into VS Code's GitHub Copilot Chat. No separate extension is required for basic MCP functionality." },
  ],
};

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const entity = clients.find((e) => e.slug === slug);
  if (!entity) notFound();

  return (
    <ClientPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[slug] ?? [
        { question: `Does ${entity.name} support MCP?`, answer: `Yes. ${entity.name} supports the Model Context Protocol with ${entity.mcpFeatures.join(", ")} via ${entity.supportedTransports.join(" and ")} transport.` },
        { question: `Where is the ${entity.name} MCP config file?`, answer: entity.configPath ? `At ${entity.configPath}` : "See the official documentation for config file location." },
        { question: `What transports does ${entity.name} support?`, answer: entity.supportedTransports.join(", ") },
      ]}
    />
  );
}
