import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sdks } from "../../../src/data/entities";
import SdkPageTemplate from "../../../src/components/templates/SdkPageTemplate";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return sdks.map((e) => ({ lang: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const entity = sdks.find((e) => e.slug === lang);
  if (!entity) return { title: "Not Found" };
  return {
    title: `${entity.language} MCP SDK: Complete Developer Guide`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `${entity.language} MCP SDK: Complete Developer Guide`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  typescript: [
    { question: "What is the TypeScript MCP SDK?", answer: "The TypeScript MCP SDK (@modelcontextprotocol/sdk) is the official library for building MCP servers in TypeScript and Node.js. It provides server, client, and transport classes." },
    { question: "Is the TypeScript MCP SDK compatible with Next.js?", answer: "Yes. You can use the TypeScript SDK in Next.js API routes with the Streamable HTTP transport for remote server deployments." },
    { question: "What Node.js version does the TypeScript MCP SDK require?", answer: "Node.js 18 or later is required for the TypeScript MCP SDK." },
    { question: "Can I use Zod with the TypeScript MCP SDK?", answer: "Yes. The SDK integrates with Zod for tool input schema validation and TypeScript type inference." },
  ],
  python: [
    { question: "What is the Python MCP SDK?", answer: "The Python MCP SDK (pip install mcp) is the official library for building MCP servers in Python. It includes the FastMCP high-level decorator API and a low-level server class." },
    { question: "What is FastMCP?", answer: "FastMCP is a high-level wrapper in the Python MCP SDK that uses Python decorators (@mcp.tool, @mcp.resource) to register tools and resources with minimal boilerplate." },
    { question: "What Python version is required?", answer: "Python 3.10 or later is required. Python 3.12 is recommended for best compatibility." },
    { question: "Can I deploy a Python MCP server remotely?", answer: "Yes. Use the streamable-http transport for remote deployments. Local tools typically use stdio." },
  ],
};

export default async function SdkPage({ params }: Props) {
  const { lang } = await params;
  const entity = sdks.find((e) => e.slug === lang);
  if (!entity) notFound();

  return (
    <SdkPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[lang] ?? [
        { question: `What is the ${entity.language} MCP SDK?`, answer: `The ${entity.name} is the official library for building MCP servers in ${entity.language}. Install with: ${entity.installCommand}` },
        { question: `What transports does the ${entity.language} SDK support?`, answer: entity.supportedTransports.join(", ") },
        { question: `Where is the official repository?`, answer: entity.officialRepo },
      ]}
    />
  );
}
