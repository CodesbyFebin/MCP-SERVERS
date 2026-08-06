import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deploymentGuides } from "../../../src/data/entities";
import DeploymentPageTemplate from "../../../src/components/templates/DeploymentPageTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return deploymentGuides.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = deploymentGuides.find((e) => e.slug === slug);
  if (!entity) return { title: "Not Found" };
  return {
    title: `How to Deploy an MCP Server on ${entity.platform}`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `How to Deploy an MCP Server on ${entity.platform}`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

const FAQ_MAP: Record<string, { question: string; answer: string }[]> = {
  docker: [
    { question: "Can I run an MCP server in Docker?", answer: "Yes. MCP servers can run in Docker containers. Use the stdio transport for local containers or Streamable HTTP for remote/orchestrated deployments." },
    { question: "What base image should I use for a TypeScript MCP server in Docker?", answer: "node:20-alpine is a good starting point. It is small, secure, and includes the Node.js runtime required for the TypeScript MCP SDK." },
    { question: "How do I pass credentials to a Dockerised MCP server?", answer: "Use Docker --env-file or Docker secrets. Never bake credentials into the Dockerfile or image layers." },
  ],
  vercel: [
    { question: "Can I host an MCP server on Vercel?", answer: "Yes. Use Vercel Edge Functions or API Routes with the Streamable HTTP transport. Note that Vercel has execution time limits so avoid long-running or stateful MCP servers." },
    { question: "Does Vercel support OAuth for MCP servers?", answer: "Yes. You can implement an OAuth 2.0 flow in Vercel API routes to authenticate remote MCP connections." },
  ],
};

export default async function DeploymentPage({ params }: Props) {
  const { slug } = await params;
  const entity = deploymentGuides.find((e) => e.slug === slug);
  if (!entity) notFound();

  return (
    <DeploymentPageTemplate
      entity={entity}
      faqItems={FAQ_MAP[slug] ?? [
        { question: `Can I deploy an MCP server on ${entity.platform}?`, answer: `Yes. This guide covers deploying with the ${entity.supportedTransports.join(" or ")} transport. Difficulty: ${entity.difficultyLevel}.` },
        { question: `How much does ${entity.platform} deployment cost?`, answer: `Pricing depends on the selected ${entity.platform} plan, region, runtime, and usage. Check the platform's official pricing page before estimating production cost.` },
      ]}
    />
  );
}
