import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "zoho-desk-mcp-india";
const TITLE = "Zoho Desk MCP: Setup with Zoho MCP";
const DESCRIPTION =
  "Zoho Desk connects to Claude, ChatGPT, Gemini and VS Code through Zoho's official MCP platform. How to create a server at mcp.zoho.com, add Desk tools, authorise and connect.";
const REVIEWED = "2026-09-23";
const ZOHO_MCP = "https://www.zoho.com/mcp/";
const SERVICES = "https://www.zoho.com/mcp/services/zoho-services.html";
const STEPS = "https://www.zoho.com/mail/help/mcp/multiple-services-single-server.html";
const BLOG = "https://www.zoho.com/blog/mail/email-mcp-server.html";

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
      h1="Zoho Desk MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Zoho Desk is supported by Zoho MCP, Zoho's official platform for building MCP servers over Zoho apps. You sign in at mcp.zoho.com, create a server, add Zoho Desk tools, approve the OAuth scopes, and paste the server URL into Claude, ChatGPT, Gemini, VS Code or another MCP client. The assistant then acts with your own Zoho Desk permissions."
      sections={[
        {
          id: "how",
          heading: "How Zoho MCP works",
          body: (
            <P>
              <Ext href={ZOHO_MCP}>Zoho MCP</Ext> is one hosted platform rather than a separate
              server per product. You build a server, pick tools from the Zoho apps you use (Desk,
              CRM, Mail, Inventory and others on Zoho&apos;s{" "}
              <Ext href={SERVICES}>supported services list</Ext>), and get one MCP URL. Zoho says
              agents &ldquo;operate under user-level permissions, so they can only perform actions
              that the user is authorized to do,&rdquo; with OAuth for authorisation.
            </P>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <P>From Zoho&apos;s <Ext href={STEPS}>guide to adding services to a server</Ext>:</P>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>Sign in at <code>mcp.zoho.com</code> with your Zoho account.</li>
                <li>Click <strong>Create New MCP server</strong>, or open an existing one.</li>
                <li>Click <strong>Add More Tools</strong> and select <strong>Zoho Desk</strong>.</li>
                <li>Tick the Desk tools you want, then <strong>Add Now</strong>.</li>
                <li>Review and accept the OAuth scopes on the authorisation screen.</li>
                <li>
                  Copy the server&apos;s MCP URL into your client, for example Claude&apos;s
                  Settings → Connectors → Add custom connector.
                </li>
              </ol>
              <P>
                If you add Desk to a server you already use, the URL stays the same but you must
                re-authenticate it in your client; Zoho notes clients do not pick up new tools
                automatically.
              </P>
            </>
          ),
        },
        {
          id: "use",
          heading: "What you can do",
          body: (
            <P>
              The exact actions depend on which Desk tools you enable. Zoho&apos;s own{" "}
              <Ext href={BLOG}>Zoho Mail MCP post</Ext> gives creating a Zoho Desk ticket as an
              example of an action an agent can perform through Zoho MCP. Enable only the tools your
              workflow needs, especially ones that reply to customers or change ticket status.
            </P>
          ),
        },
        {
          id: "care",
          heading: "Things to watch",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Ticket text comes from customers. A malicious message could contain instructions
                aimed at the model; review any reply or action it proposes.
              </li>
              <li>Customer data flows to the AI provider you connect; check that fits your privacy commitments.</li>
              <li>
                Zoho did not publish pricing for Zoho MCP on the pages we reviewed; check your
                account.
              </li>
            </ul>
          ),
        },
        {
          id: "related",
          heading: "Also on Zoho MCP",
          body: (
            <P>
              The same server can include{" "}
              <Link href="/blog/zoho-inventory-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                Zoho Inventory
              </Link>{" "}
              and other Zoho apps, so one assistant can, for example, look up an order while
              answering a ticket.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Zoho MCP: Supported Zoho services",
          url: SERVICES,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Zoho Desk and Zoho Inventory are listed among supported services; user-level permissions; OAuth.",
        },
        {
          source: "Zoho Mail help: Use multiple services in one MCP server",
          url: STEPS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Sign in at mcp.zoho.com; Create New MCP server; Add More Tools; select products such as Zoho Desk and tools; accept OAuth scopes; re-authenticate existing servers in clients such as ChatGPT, Claude, Gemini and VS Code.",
        },
        {
          source: "Zoho MCP product page",
          url: ZOHO_MCP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Model-agnostic; OAuth-based authorisation; sign-up available; no pricing shown.",
        },
        {
          source: "Zoho blog: Zoho Mail MCP",
          url: BLOG,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Uses creating a Zoho Desk ticket as an example Zoho MCP action.",
          limitations: "Seen in search summary; not read in full.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Zoho Desk MCP server?",
          answer: "Yes, through Zoho MCP, Zoho's official platform. Zoho Desk is on its supported services list.",
        },
        {
          question: "Where do I set it up?",
          answer: "At mcp.zoho.com: create a server, add Zoho Desk tools, accept the OAuth scopes and copy the MCP URL.",
        },
        {
          question: "Which AI clients work with it?",
          answer: "Zoho mentions ChatGPT, Claude, Gemini and VS Code, and describes the platform as model-agnostic.",
        },
        {
          question: "Can the AI see tickets I can't?",
          answer: "No. Zoho says agents operate under the signing-in user's permissions.",
        },
        {
          question: "I added Desk tools but my client doesn't show them. Why?",
          answer: "Re-authenticate the server in your MCP client. Zoho notes clients don't detect newly added tools automatically.",
        },
      ]}
      related={[
        { href: "/blog/zoho-inventory-mcp-india", label: "Zoho Inventory MCP" },
        { href: "/glossary/mcp-freshdesk", label: "Freshdesk and MCP" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
