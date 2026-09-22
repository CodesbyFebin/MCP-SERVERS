import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { NoMcpFound, noMcpMetadata } from "@/src/components/content/NoMcpFound";

export const dynamic = "force-static";

const SLUG = "canara-bank-mcp-india";
const BRAND = "Canara Bank";

export function generateMetadata(): Metadata {
  return noMcpMetadata(SLUG, BRAND);
}

export default function Page() {
  return (
    <NoMcpFound
      slug={SLUG}
      brand={BRAND}
      kind="a bank"
      reviewedAt="2026-09-23"
      context={
        <P>
          An MCP server for Canara Bank would need an official API for customer accounts. We found no Canara Bank announcement of such an API or of an MCP server.
        </P>
      }
      alternatives={[
        { href: "/blog/sbi-mcp-server-india-banking", label: "SBI MCP status" },
        { href: "/blog/hdfc-bank-mcp-india", label: "HDFC MCP: HDFC SKY vs HDFC Bank" },
        { href: "/blog/phonepe-mcp-server-india", label: "PhonePe's official MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
