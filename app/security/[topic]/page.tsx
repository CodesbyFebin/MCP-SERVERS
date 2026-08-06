import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { securityGuides } from "../../../src/data/entities";
import SecurityPageTemplate from "../../../src/components/templates/SecurityPageTemplate";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return securityGuides.map((e) => ({ topic: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const entity = securityGuides.find((e) => e.slug === topic);
  if (!entity) return { title: "Not Found" };
  return {
    title: `MCP Server Security: ${entity.topic} Guide`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `MCP Server Security: ${entity.topic} Guide`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  "prompt-injection": [
    { question: "What is MCP prompt injection?", answer: "MCP prompt injection is an attack where malicious content in tool arguments or resource responses manipulates the LLM into executing unintended actions or leaking sensitive data." },
    { question: "What is MCP tool poisoning?", answer: "Tool poisoning occurs when a malicious MCP server registers tools with misleading names or descriptions designed to deceive the model into misusing them." },
    { question: "How do I prevent prompt injection in MCP servers?", answer: "Validate all tool inputs against strict schemas, sanitise external data before including it in model context, and require human confirmation for privileged actions." },
  ],
  "authentication": [
    { question: "What authentication methods do MCP servers support?", answer: "MCP servers support API keys, Personal Access Tokens, OAuth 2.0, and service accounts. The method depends on the underlying platform and whether the server is local or remote." },
    { question: "Should I use OAuth or API keys for MCP authentication?", answer: "For remote MCP servers, OAuth 2.0 is preferred because it supports token refresh, scoped permissions, and user consent. API keys are simpler for local servers." },
    { question: "How do I rotate credentials for an MCP server?", answer: "Store credentials as environment variables, not in config files. Rotate them in your secrets management system and update the environment variables without redeploying." },
  ],
};

export default async function SecurityTopicPage({ params }: Props) {
  const { topic } = await params;
  const entity = securityGuides.find((e) => e.slug === topic);
  if (!entity) notFound();

  return (
    <SecurityPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[topic] ?? [
        { question: `What is the MCP ${entity.topic} risk?`, answer: `This is a ${entity.severity} severity ${entity.threatCategory} class issue in MCP servers.` },
        { question: "How do I mitigate this risk?", answer: "Review the mitigations section above and apply all applicable controls before deploying to production." },
      ]}
    />
  );
}
