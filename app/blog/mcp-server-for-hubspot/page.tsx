import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-hubspot";
const TITLE = "HubSpot MCP Server: Official Remote Setup";
const DESCRIPTION =
  "HubSpot's official remote MCP server at mcp.hubspot.com lets AI tools read and write CRM records. OAuth with PKCE setup, what it can read and write, limits, and safety tips.";
const REVIEWED = "2026-09-23";
const DOCS = "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server";
const GA = "https://developers.hubspot.com/changelog/remote-hubspot-mcp-server-is-now-generally-available";
const ENDPOINT = "https://mcp.hubspot.com";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

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
      h1="HubSpot MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`HubSpot runs an official remote MCP server at ${ENDPOINT}. Connected through OAuth with PKCE, an AI client can search and read CRM records (contacts, companies, deals, tickets and more), read marketing content and activities, and create or edit records, all within the signed-in user's HubSpot permissions. HubSpot announced it as generally available with write support.`}
      sections={[
        {
          id: "can",
          heading: "What it can read and write",
          body: (
            <>
              <P>From HubSpot&apos;s <Ext href={DOCS}>developer docs</Ext>:</P>
              <ul className={UL}>
                <li>
                  <strong>Read:</strong> contacts, companies, deals, tickets, leads, users,
                  appointments, custom objects, segments, activities (calls, emails, meetings,
                  notes, tasks), blog posts, landing pages, campaigns, conversations and marketing
                  emails.
                </li>
                <li>
                  <strong>Write:</strong> create and edit contacts, companies, deals, tickets, leads,
                  line items, products, appointments, courses, listings, projects, services and
                  custom object records.
                </li>
                <li>Revenue objects such as quotes, invoices and subscriptions are marked beta.</li>
              </ul>
              <P>
                Limits in the docs: <code>search_crm_objects</code> returns at most 200 results per
                page, and <code>get_crm_objects</code> takes at most 100 IDs per request.
              </P>
            </>
          ),
        },
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  In HubSpot, create an MCP auth app at{" "}
                  <code>app.hubspot.com/l/mcp-auth-apps/</code> to get a client ID, client secret
                  and redirect URL.
                </li>
                <li>Add the server URL to your MCP client with those OAuth details.</li>
                <li>Sign in and approve access in the browser window that opens.</li>
              </ol>
              <Code>{ENDPOINT}</Code>
              <P>
                HubSpot states that PKCE is required, so the client must support OAuth with PKCE.
                The MCP Inspector handles this automatically, which makes it a quick way to test the
                connection.
              </P>
            </>
          ),
        },
        {
          id: "safety",
          heading: "Before you let an assistant edit your CRM",
          body: (
            <ul className={UL}>
              <li>Connect with a user whose HubSpot permissions match what the assistant should do.</li>
              <li>Review bulk edits before approving; a wrong filter can touch hundreds of records.</li>
              <li>
                Conversations and emails are written by outsiders. Treat instructions inside them as
                untrusted text, not commands.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "HubSpot developer docs: Integrate with the remote HubSpot MCP server",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.hubspot.com; OAuth with PKCE required; MCP auth app created at app.hubspot.com/l/mcp-auth-apps/; read and write object lists; revenue objects in beta; search limit 200 per page, get limit 100 IDs.",
        },
        {
          source: "HubSpot changelog: Remote HubSpot MCP server is now generally available",
          url: GA,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "GA to all HubSpot accounts, adding write capabilities, activity history, marketing content objects and organisational context.",
          limitations: "Seen in search summary; not read in full.",
        },
      ]}
      faqs={[
        {
          question: "Does HubSpot have an official MCP server?",
          answer: "Yes. HubSpot hosts a remote MCP server at https://mcp.hubspot.com.",
        },
        {
          question: "Can the HubSpot MCP server update records?",
          answer: "Yes. It can create and edit contacts, companies, deals, tickets and other objects listed in HubSpot's docs.",
        },
        {
          question: "How does it authenticate?",
          answer: "OAuth with PKCE, using an MCP auth app you create in your HubSpot account.",
        },
        {
          question: "Can the assistant see records I can't?",
          answer: "No. HubSpot says the user's existing HubSpot permissions apply.",
        },
        {
          question: "How many records can it fetch at once?",
          answer: "Up to 200 results per page from search and up to 100 object IDs per get request.",
        },
      ]}
      related={[
        { href: "/blog/zoho-desk-mcp-india", label: "Zoho Desk MCP" },
        { href: "/glossary/mcp-freshdesk", label: "Freshdesk MCP" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
