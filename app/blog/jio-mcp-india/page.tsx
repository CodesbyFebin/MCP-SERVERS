import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { NoMcpFound, noMcpMetadata } from "@/src/components/content/NoMcpFound";

export const dynamic = "force-static";

const SLUG = "jio-mcp-india";
const BRAND = "Jio";

export function generateMetadata(): Metadata {
  return noMcpMetadata(SLUG, BRAND);
}

export default function Page() {
  return (
    <NoMcpFound
      slug={SLUG}
      brand={BRAND}
      kind="a telecom operator"
      reviewedAt="2026-09-23"
      context={
        <P>
          We found no MCP server from Jio, or from Reliance Jio group apps such as JioMart, for managing a mobile plan, recharges or orders from an AI assistant.
        </P>
      }
      alternatives={[
        { href: "/blog/vi-mcp-india", label: "Vi MCP status" },
        { href: "/blog/swiggy-mcp-india", label: "Swiggy's official MCP servers" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
