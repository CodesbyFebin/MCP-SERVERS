import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { NoMcpFound, noMcpMetadata } from "@/src/components/content/NoMcpFound";

export const dynamic = "force-static";

const SLUG = "sbi-mcp-server-india-banking";
const BRAND = "SBI";

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
          An MCP server for SBI would need an official API for customer accounts. We found no SBI announcement of such an API or of an MCP server.
        </P>
      }
      alternatives={[
        { href: "/blog/hdfc-bank-mcp-india", label: "HDFC MCP: HDFC SKY vs HDFC Bank" },
        { href: "/blog/icici-bank-mcp-india", label: "ICICI MCP: bank vs ICICI Direct" },
        { href: "/blog/zerodha-mcp-server-trading-ai", label: "Zerodha Kite MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
