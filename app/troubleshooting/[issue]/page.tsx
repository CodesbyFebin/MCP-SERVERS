import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { troubleshootingGuides } from "../../../src/data/entities";
import TroubleshootPageTemplate from "../../../src/components/templates/TroubleshootPageTemplate";

interface Props {
  params: Promise<{ issue: string }>;
}

export async function generateStaticParams() {
  return troubleshootingGuides.map((e) => ({ issue: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issue } = await params;
  const entity = troubleshootingGuides.find((e) => e.slug === issue);
  if (!entity) return { title: "Not Found" };
  return {
    title: `How to Fix "${entity.errorTitle}" in an MCP Server`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `How to Fix "${entity.errorTitle}" in an MCP Server`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  "mcp-server-not-connecting": [
    { question: "Why is my MCP server not connecting?", answer: "The most common causes are: incorrect executable path, missing environment variables, wrong transport type, or Node/Python not found in PATH. Check the client logs first." },
    { question: "How do I check MCP server logs in Claude Desktop?", answer: "On macOS, check ~/Library/Logs/Claude/. Look for mcp-server-*.log files. These contain the server startup output and any errors." },
    { question: "Does restarting fix MCP connection issues?", answer: "Often yes. Config changes only take effect after a full application restart, not a reload or refresh." },
  ],
  // Canonical owner of the "MCP tools not appearing" intent. The former
  // /troubleshooting/tools-not-appearing/ duplicate now 301s here, so its FAQ
  // content was migrated onto this slug rather than discarded.
  "mcp-tools-not-appearing": [
    { question: "Why are my MCP tools not showing up?", answer: "The most common cause is that the server failed to start, or the capabilities negotiation failed. Use MCP Inspector to check what tools the server is exposing." },
    { question: "What is MCP Inspector?", answer: "MCP Inspector is an official debugging tool. Run `npx @modelcontextprotocol/inspector` to connect to your server over stdio and inspect its tools, resources, and prompts." },
  ],
  "claude-desktop-mcp-not-working": [
    { question: "Why is my MCP server not working in Claude Desktop?", answer: "Check: (1) claude_desktop_config.json is valid JSON, (2) the command path is correct, (3) environment variables are set, (4) you have fully restarted Claude Desktop." },
    { question: "Where is claude_desktop_config.json on macOS?", answer: "~/Library/Application Support/Claude/claude_desktop_config.json" },
    { question: "How do I validate my Claude Desktop MCP config?", answer: "Paste the config content into a JSON validator. Common issues: trailing commas, missing quotes, or incorrect nesting." },
  ],
};

export default async function TroubleshootPage({ params }: Props) {
  const { issue } = await params;
  const entity = troubleshootingGuides.find((e) => e.slug === issue);
  if (!entity) notFound();

  return (
    <TroubleshootPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[issue] ?? [
        { question: `How do I fix ${entity.errorTitle}?`, answer: `Start by checking: ${entity.commonCauses[0]}. See the step-by-step diagnosis above.` },
        { question: `Which MCP clients are affected?`, answer: entity.affectedClients.join(", ") },
      ]}
    />
  );
}
