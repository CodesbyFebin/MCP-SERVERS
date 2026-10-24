import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "amazon-india-mcp";
const TITLE = "Amazon India MCP: Seller SP-API Server";
const DESCRIPTION =
  "Amazon has no MCP server for shopping on Amazon.in, but it publishes an official SP-API MCP server for sellers and developers. What it does, how to run it, and the credentials it needs.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/amzn/selling-partner-api-samples/tree/main/use-cases/sp-api-dev-mcp";

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
      h1="Amazon India MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="For shoppers, no: we found no official Amazon MCP server for browsing or ordering on Amazon.in. For sellers and developers, yes: Amazon publishes @amazon-sp-api-release/sp-api-dev-mcp, a local MCP server for the Selling Partner API (SP-API), which Amazon.in sellers use. It helps you explore and call SP-API and build multi-step workflows from an AI coding assistant."
      sections={[
        {
          id: "what",
          heading: "What Amazon's SP-API MCP is",
          body: (
            <>
              <P>
                The package lives in Amazon&apos;s{" "}
                <Ext href={REPO}>selling-partner-api-samples repository</Ext> and ships two servers:
              </P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Developer assistant</strong> (6 tools): <code>sp_api_reference</code>,{" "}
                  <code>sp_api_explore_catalog</code>, <code>sp_api_execute</code>,{" "}
                  <code>sp_api_generate_code_sample</code>, <code>sp_api_migration_assistant</code>,{" "}
                  <code>sp_api_optimize</code>
                </li>
                <li>
                  <strong>Workflow server</strong>: tools such as <code>create_workflow</code>,{" "}
                  <code>add_task_state</code>, <code>validate_workflow</code>,{" "}
                  <code>execute_workflow</code> and <code>get_execution_status</code> for building
                  and running multi-step SP-API automations
                </li>
              </ul>
              <P>
                Most tools work locally with no credentials. Only <code>sp_api_execute</code>{" "}
                calls SP-API with your account.
              </P>
            </>
          ),
        },
        {
          id: "run",
          heading: "Install and run",
          body: (
            <>
              <P>It needs Node.js 20 or later. Run it with npx, naming the server you want:</P>
              <Code>npx -y @amazon-sp-api-release/sp-api-dev-mcp [server-name]</Code>
              <P>Or install it globally:</P>
              <Code>npm install -g @amazon-sp-api-release/sp-api-dev-mcp</Code>
              <P>
                To let <code>sp_api_execute</code> make live calls, set <code>SP_API_CLIENT_ID</code>,{" "}
                <code>SP_API_CLIENT_SECRET</code> and <code>SP_API_REFRESH_TOKEN</code> from your
                SP-API app registration. Check the README for the exact server names and client
                configuration.
              </P>
            </>
          ),
        },
        {
          id: "india",
          heading: "Using it for an Amazon.in store",
          body: (
            <P>
              SP-API covers Amazon marketplaces including India. The MCP server is a developer tool
              around that API: use it to look up the right endpoints, generate code, and test calls
              against your seller account. It is not a replacement for Seller Central, and actions
              made through <code>sp_api_execute</code> or workflows affect your live listings and
              orders, so start in a sandbox where possible.
            </P>
          ),
        },
        {
          id: "community",
          heading: "Community SP-API servers",
          body: (
            <P>
              Several community MCP servers wrap SP-API for day-to-day seller tasks such as
              orders, listings, inventory and reports, for example{" "}
              <Ext href="https://github.com/bhavykhatri/amazon-seller-mcp">bhavykhatri/amazon-seller-mcp</Ext>{" "}
              and <Ext href="https://github.com/jay-trivedi/amazon_sp_mcp">jay-trivedi/amazon_sp_mcp</Ext>.
              They are not Amazon projects; they hold your SP-API refresh token, so review their
              code before connecting a live seller account.
            </P>
          ),
        },
        {
          id: "shoppers",
          heading: "For shoppers",
          body: (
            <P>
              We found no official way to let an AI assistant search, add to cart or order on
              Amazon.in through MCP. Browser-automation projects that log in as you would act with
              your full account and payment methods; treat them with the same caution as any
              unofficial tool handling your password.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "amzn/selling-partner-api-samples: sp-api-dev-mcp",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Package @amazon-sp-api-release/sp-api-dev-mcp; developer assistant with 6 tools and a workflow server; npx and global install; SP_API_CLIENT_ID, SP_API_CLIENT_SECRET, SP_API_REFRESH_TOKEN needed for sp_api_execute; Node.js >= 20; Apache-2.0.",
          limitations: "The README does not state which tools can modify seller data.",
        },
        {
          source: "bhavykhatri/amazon-seller-mcp",
          url: "https://github.com/bhavykhatri/amazon-seller-mcp",
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community SP-API MCP server for listings, orders, reports, feeds and pricing across marketplaces.",
          limitations: "Based on the repository description; not reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Amazon India MCP server?",
          answer:
            "Not for shoppers. For sellers and developers, Amazon publishes the SP-API MCP server @amazon-sp-api-release/sp-api-dev-mcp.",
        },
        {
          question: "Can an AI assistant order from Amazon.in for me?",
          answer: "Not through any official Amazon MCP server we found as of the review date.",
        },
        {
          question: "Does the SP-API MCP server need my seller credentials?",
          answer:
            "Only for sp_api_execute, which uses SP_API_CLIENT_ID, SP_API_CLIENT_SECRET and SP_API_REFRESH_TOKEN. Most tools work locally without them.",
        },
        {
          question: "What Node.js version does it need?",
          answer: "Node.js 20 or later.",
        },
        {
          question: "Is it open source?",
          answer: "Yes, under Apache-2.0, in Amazon's selling-partner-api-samples repository.",
        },
      ]}
      related={[
        { href: "/blog/flipkart-mcp-india", label: "Flipkart MCP status" },
        { href: "/glossary/mcp-india-ecommerce", label: "MCP for Indian e-commerce" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
