import type { Metadata } from "next";
import { servers } from "../../../src/data/servers";
import ServerIntegrationPageTemplate from "../../../src/components/ServerIntegrationPageTemplate";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servers.map((server) => ({
    slug: server.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const server = servers.find((s) => s.slug === slug);
  if (!server) {
    return {
      title: "Server Integration Not Found",
    };
  }
  return {
    title: `${server.name} MCP Server Integration Guide - MCPserver.in`,
    description: `Deploy and configure the ${server.name} Model Context Protocol (MCP) server. Sub-50ms latency from Mumbai/Bengaluru. Expose secure data tools to Claude and Cursor.`,
  };
}

export default async function ServerPage({ params }: PageProps) {
  const { slug } = await params;
  const server = servers.find((s) => s.slug === slug);

  if (!server) {
    notFound();
  }

  return (
    <ServerIntegrationPageTemplate
      name={server.name}
      slug={server.slug}
      category={server.category}
      description={server.description}
      auth={server.auth}
      useCases={server.useCases}
      features={server.features}
    />
  );
}
