import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "flipkart-mcp-india";
const TITLE = "Flipkart MCP Server: Seller and Shopper Options";
const DESCRIPTION =
  "Flipkart has no official MCP server. Community servers wrap the Flipkart Seller APIs for shipments and reports, and scrapers return product data. What each does and the risks.";
const REVIEWED = "2026-09-23";
const SELLER = "https://github.com/vishnu27597/flipkart-mcp-server";
const SELLER2 = "https://github.com/ron2111/flipkart-seller-mcp";
const APIFY = "https://apify.com/easyapi/flipkart-product-scraper/api/mcp";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in/blog/${SLUG}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      title={TITLE}
      h1="Flipkart MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="Flipkart has not published an official MCP server. Sellers can use community MCP servers built on the Flipkart Seller APIs to search shipments, generate labels and invoices, update self-ship orders and request reports. For product and price data, hosted scrapers such as Apify's Flipkart scraper expose search results over MCP. None of these is affiliated with Flipkart."
      sections={[
        {
          id: "sellers",
          heading: "For Flipkart sellers",
          body: (
            <>
              <P>
                <Ext href={SELLER}>vishnu27597/flipkart-mcp-server</Ext> (JavaScript, MIT) wraps
                the Flipkart Seller APIs for listings, shipments and reports. Its tools include:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
                <li><code>get_order_details</code></li>
                <li><code>cancel_order_items</code></li>
                <li><code>mark_self_ship_dispatched</code>, <code>update_self_ship_delivery_date</code>, <code>update_self_ship_tracking_id</code>, <code>update_self_ship_delivery_attempt</code></li>
                <li><code>trigger_report</code> (for example settlement or order reports)</li>
              </ul>
              <P>
                Its README also describes Shipment V3 features such as generating labels and
                invoices and marking orders ready for dispatch. After <code>npm install</code> and a
                build, it runs over stdio; the README shows bridging it to HTTP with:
              </P>
              <Code>{`npx supergateway --stdio "node /absolute/path/to/flipkart-mcp-server/dist/index.js"`}</Code>
              <P>
                Another project, <Ext href={SELLER2}>ron2111/flipkart-seller-mcp</Ext>, describes
                coverage of Seller Hub v3 APIs including listings, inventory, returns, ads and
                financials.
              </P>
            </>
          ),
        },
        {
          id: "shoppers",
          heading: "For product and price research",
          body: (
            <P>
              <Ext href={APIFY}>Apify&apos;s Flipkart Product Scraper</Ext> can be called as an MCP
              server to return product listings and prices. It is a paid, hosted scraping service,
              not a shopping assistant: it does not log in, add to cart or order.
            </P>
          ),
        },
        {
          id: "risks",
          heading: "Risks",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Seller credentials.</strong> Seller API servers hold your app credentials
                and can cancel order items or change dispatch status. Read the code, and restrict
                who can use the client it is connected to.
              </li>
              <li>
                <strong>Real consequences.</strong> A wrong <code>cancel_order_items</code> call
                affects a customer and your seller metrics. Confirm IDs before approving.
              </li>
              <li>
                <strong>Scraping terms.</strong> Scraping Flipkart may conflict with its terms of
                use; the responsibility sits with the user.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "vishnu27597/flipkart-mcp-server README",
          url: SELLER,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Community MCP server for Flipkart Seller APIs (listings, shipments, reports); tools including get_order_details, cancel_order_items, self-ship updates and trigger_report; Shipment V3 labels/invoices; supergateway HTTP bridge; JavaScript; MIT.",
          limitations: "Not affiliated with Flipkart; not tested.",
        },
        {
          source: "ron2111/flipkart-seller-mcp",
          url: SELLER2,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Described as an MCP server for Flipkart Seller Hub v3 APIs (shipments, listings, inventory, returns, ads, financials).",
          limitations: "Based on repository description only.",
        },
        {
          source: "Apify Flipkart Product Scraper (MCP)",
          url: APIFY,
          type: "registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Hosted scraper usable as an MCP server for Flipkart product data.",
          limitations: "Based on the listing; pricing and output not tested.",
        },
      ]}
      faqs={[
        {
          question: "Does Flipkart have an official MCP server?",
          answer: "No official Flipkart MCP server was found as of the review date.",
        },
        {
          question: "Can an AI assistant shop on Flipkart for me?",
          answer: "Not through any official server. The options we found are seller API wrappers and product-data scrapers.",
        },
        {
          question: "Can a seller manage shipments from Claude?",
          answer: "With a community server such as vishnu27597/flipkart-mcp-server, yes: it wraps Seller API shipment and report endpoints.",
        },
        {
          question: "Is it safe to connect my seller account?",
          answer: "Only after reviewing the code. These servers can cancel order items and update dispatch status with your credentials.",
        },
        {
          question: "How can I track Flipkart prices with AI?",
          answer: "A scraping service with an MCP interface, such as Apify's Flipkart Product Scraper, can return product and price data. Check its pricing and Flipkart's terms.",
        },
      ]}
      related={[
        { href: "/blog/amazon-india-mcp", label: "Amazon India MCP (SP-API)" },
        { href: "/glossary/mcp-india-ecommerce", label: "MCP for Indian e-commerce" },
        { href: "/blog/blinkit-mcp-india", label: "Blinkit MCP status" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
