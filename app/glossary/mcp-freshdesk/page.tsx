import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-freshdesk";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Freshdesk MCP: Official Integration and Limits";
const DESCRIPTION =
  "Freshdesk's official MCP integration went GA on 10 September 2026: 38 tools for tickets, contacts, companies and knowledge base, API-key auth, per-plan action limits, and setup.";
const REVIEWED = "2026-09-23";
const DOCS = "https://support.freshdesk.com/support/solutions/articles/50000012670-model-context-protocol-mcp-integration-in-freshdesk-eap-";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";
const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="Freshdesk MCP"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Freshworks' official Freshdesk MCP integration became generally available on 10 September 2026. Each account has an endpoint at https://<subdomain>.freshdesk.com/mcp with 38 tools for tickets, conversations, contacts, agents, groups, companies and knowledge-base articles. It authenticates with a Freshdesk API key only, and monthly action limits depend on your plan."
      sections={[
        {
          id: "limits",
          heading: "Plan limits",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Plan</th>
                    <th className={TH}>Actions per minute</th>
                    <th className={TH}>Actions per month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  <tr><td className="px-4 py-2">Growth</td><td className="px-4 py-2">25</td><td className="px-4 py-2">100</td></tr>
                  <tr><td className="px-4 py-2">Pro</td><td className="px-4 py-2">50</td><td className="px-4 py-2">500</td></tr>
                  <tr><td className="px-4 py-2">Enterprise</td><td className="px-4 py-2">100</td><td className="px-4 py-2">1,000</td></tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>The endpoint for your helpdesk:</P>
              <Code>{`https://<subdomain>.freshdesk.com/mcp`}</Code>
              <ul className={UL}>
                <li>Authenticate with a Freshdesk API key; OAuth is not offered.</li>
                <li>Custom domains are not supported for the MCP endpoint; use your freshdesk.com subdomain.</li>
                <li>If your network restricts traffic, you may need IP allowlisting.</li>
                <li>
                  Freshdesk documents setup for Claude Code, Claude Desktop, Cursor, Microsoft
                  Copilot Studio and VS Code in its <Ext href={DOCS}>support article</Ext>.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "tools",
          heading: "What the 38 tools cover",
          body: (
            <ul className={UL}>
              <li><strong>Tickets:</strong> create, fetch, update, bulk update, search, get conversations</li>
              <li><strong>Conversations:</strong> reply, add notes, update</li>
              <li><strong>Contacts, companies:</strong> create, fetch, search, update</li>
              <li><strong>Agents, groups:</strong> create, fetch, update</li>
              <li><strong>Knowledge base:</strong> create and fetch categories; create, fetch and update folders and articles</li>
            </ul>
          ),
        },
        {
          id: "care",
          heading: "Things to watch",
          body: (
            <ul className={UL}>
              <li>An API key carries the permissions of the agent who owns it. Use one tied to a role with only what the assistant needs.</li>
              <li>Replies go to real customers; review before sending.</li>
              <li>Monthly limits are low on Growth (100 actions); a busy assistant can hit them quickly.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Freshdesk Support: Model Context Protocol (MCP) integration in Freshdesk",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "GA from 10 September 2026; per-plan limits (Growth 25/min and 100/month, Pro 50/500, Enterprise 100/1,000); API key auth only; endpoint https://<subdomain>.freshdesk.com/mcp; no custom domains; clients Claude Code, Claude Desktop, Cursor, Copilot Studio, VS Code; 38 tools across 8 resource types.",
        },
      ]}
      faqs={[
        {
          question: "Does Freshdesk have an official MCP server?",
          answer: "Yes. Freshworks' MCP integration for Freshdesk became generally available on 10 September 2026.",
        },
        {
          question: "What is the Freshdesk MCP endpoint?",
          answer: "https://<your-subdomain>.freshdesk.com/mcp. Custom domains are not supported.",
        },
        {
          question: "How does it authenticate?",
          answer: "With a Freshdesk API key only.",
        },
        {
          question: "How many actions can I run?",
          answer: "Growth: 100 a month; Pro: 500; Enterprise: 1,000, with per-minute caps of 25, 50 and 100.",
        },
        {
          question: "Can it reply to customers?",
          answer: "Yes. Conversation tools include replying to tickets and adding notes.",
        },
      ]}
      related={[
        { href: "/blog/zoho-desk-mcp-india", label: "Zoho Desk MCP" },
        { href: "/blog/mcp-server-for-hubspot", label: "HubSpot MCP server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
