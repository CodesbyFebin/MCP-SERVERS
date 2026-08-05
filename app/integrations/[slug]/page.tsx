import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { integrations } from "../../../src/data/entities";
import IntegrationPageTemplate from "../../../src/components/templates/IntegrationPageTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return integrations.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = integrations.find((e) => e.slug === slug);
  if (!entity) return { title: "Not Found" };
  return {
    title: `${entity.name} MCP Server: Setup, Configuration and Examples`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `${entity.name} MCP Server: Setup, Configuration and Examples`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  "github-mcp-server": [
    { question: "What is the GitHub MCP server?", answer: "The GitHub MCP server is an MCP-compatible connector that exposes GitHub repositories, pull requests, issues, and code search as tools to AI clients such as Claude Desktop and Cursor." },
    { question: "Does the GitHub MCP server support remote connections?", answer: "The official GitHub MCP server uses stdio transport and runs locally as a subprocess. Remote deployment requires wrapping it with a Streamable HTTP proxy." },
    { question: "Which MCP clients support the GitHub MCP server?", answer: "Claude Desktop, Claude Code, Cursor, VS Code, and Cline all support the GitHub MCP server via the stdio transport." },
    { question: "How do I secure the GitHub MCP server?", answer: "Use a Personal Access Token with the minimum required scopes. Store it as an environment variable, never in configuration files. Rotate the token every 90 days." },
  ],
  "postgresql-mcp-server": [
    { question: "What is the PostgreSQL MCP server?", answer: "The PostgreSQL MCP server is an MCP server that exposes a PostgreSQL database as tools and resources to AI clients, enabling schema exploration and safe query execution." },
    { question: "Is it safe to connect an AI to my PostgreSQL database?", answer: "Yes, with the right precautions: use a read-only database user, disable DDL tools in production, and require human confirmation for write operations." },
    { question: "Does the PostgreSQL MCP server support remote connections?", answer: "The server connects to PostgreSQL over the standard Postgres protocol. The MCP connection itself uses stdio and runs locally." },
  ],
};

export default async function IntegrationPage({ params }: Props) {
  const { slug } = await params;
  const entity = integrations.find((e) => e.slug === slug);
  if (!entity) notFound();

  return (
    <IntegrationPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[slug] ?? [
        { question: `What is the ${entity.name} MCP server?`, answer: `The ${entity.name} MCP server connects AI clients to ${entity.platform} using the Model Context Protocol, exposing ${entity.tools.length} tools and ${entity.resources.length} resources.` },
        { question: `Which clients support the ${entity.name} MCP server?`, answer: entity.supportedClients.join(", ") },
        { question: `How do I authenticate the ${entity.name} MCP server?`, answer: `This server uses ${entity.authMethods.join(" or ")} for authentication. Store credentials as environment variables.` },
      ]}
    />
  );
}
