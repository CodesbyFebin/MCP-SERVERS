import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { NoMcpFound, noMcpMetadata } from "@/src/components/content/NoMcpFound";

export const dynamic = "force-static";

const SLUG = "vi-mcp-india";
const BRAND = "Vi";

export function generateMetadata(): Metadata {
  return noMcpMetadata(SLUG, BRAND);
}

export default function Page() {
  return (
    <NoMcpFound
      slug={SLUG}
      brand={BRAND}
      kind="a telecom operator (Vodafone Idea)"
      reviewedAt="2026-09-23"
      context={
        <P>
          We found no MCP server from Vi (Vodafone Idea) for checking usage, recharging or managing a plan from an AI assistant.
        </P>
      }
      alternatives={[
        { href: "/blog/jio-mcp-india", label: "Jio MCP status" },
        { href: "/blog/zomato-mcp-india", label: "Zomato's official MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
