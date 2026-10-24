import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "google-calendar-mcp-server";
const PATH = "/servers/google-calendar-mcp-server";
const TITLE = "Google Calendar MCP Server: Official Setup";
const DESCRIPTION =
  "Google's official remote Calendar MCP server (Developer Preview) lets AI agents list, create, update and delete events and suggest meeting times. Endpoint, prerequisites, OAuth and tools.";
const REVIEWED = "2026-09-23";
const CONFIG = "https://developers.google.com/workspace/calendar/api/guides/configure-mcp-server";
const REF = "https://developers.google.com/workspace/calendar/api/v3/reference/mcp";
const ENDPOINT = "https://calendarmcp.googleapis.com/mcp/v1";

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
      section={{ label: "Servers", href: "/servers" }}
      title={TITLE}
      h1="Google Calendar MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Google runs an official remote Google Calendar MCP server at ${ENDPOINT}, available through the Google Workspace Developer Preview Program. Over Streamable HTTP with OAuth, an AI agent can list calendars, search and read events, suggest meeting times, and create, update, delete or respond to events.`}
      sections={[
        {
          id: "tools",
          heading: "Tools",
          body: (
            <P>
              From the <Ext href={REF}>MCP reference</Ext>: <code>list_calendars</code>,{" "}
              <code>list_events</code>, <code>search_events</code>, <code>get_event</code>,{" "}
              <code>suggest_time</code>, <code>create_event</code>, <code>update_event</code>,{" "}
              <code>delete_event</code> and <code>respond_to_event</code>.
            </P>
          ),
        },
        {
          id: "prereq",
          heading: "Prerequisites",
          body: (
            <ul className={UL}>
              <li>Membership of the Google Workspace Developer Preview Program</li>
              <li>A Google Cloud project with the gcloud CLI configured</li>
              <li>
                The Google Calendar API (<code>calendar-json.googleapis.com</code>) and Google
                Calendar MCP API (<code>calendarmcp.googleapis.com</code>) enabled
              </li>
              <li>An OAuth client ID and secret</li>
            </ul>
          ),
        },
        {
          id: "claude",
          heading: "Connecting Claude",
          body: (
            <>
              <P>
                Register a custom connector with the endpoint and your OAuth client credentials,
                using this redirect URI in the Google Cloud OAuth client:
              </P>
              <Code>https://claude.ai/api/mcp/auth_callback</Code>
              <P>
                The <Ext href={CONFIG}>configuration guide</Ext> lists read scopes such as{" "}
                <code>calendar.calendarlist.readonly</code>, <code>calendar.events.readonly</code>{" "}
                and <code>calendar.events.freebusy</code>; check it for the scopes needed to create
                or change events.
              </P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Before an agent books meetings",
          body: (
            <ul className={UL}>
              <li>Creating an event with guests sends invitations; check attendees first.</li>
              <li><code>delete_event</code> on a shared meeting affects everyone invited.</li>
              <li>Event descriptions come from other people; treat instructions in them as untrusted.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Google for Developers: Configure the Calendar MCP server",
          url: CONFIG,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://calendarmcp.googleapis.com/mcp/v1; Developer Preview Program; Google Cloud project and gcloud; APIs to enable; OAuth scopes; Claude custom connector with redirect https://claude.ai/api/mcp/auth_callback; Streamable HTTP.",
        },
        {
          source: "Google for Developers: MCP reference (calendarmcp.googleapis.com)",
          url: REF,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Nine tools: list_events, get_event, list_calendars, suggest_time, create_event, update_event, delete_event, respond_to_event, search_events.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Google Calendar MCP server?",
          answer: "Yes, a remote server from Google at calendarmcp.googleapis.com, in Developer Preview.",
        },
        {
          question: "Can it create events?",
          answer: "Yes, with create_event, and it can update, delete and respond to events.",
        },
        {
          question: "Do I need an API key?",
          answer: "No. It uses OAuth with your own OAuth client in a Google Cloud project.",
        },
        {
          question: "Can anyone use it now?",
          answer: "It requires membership of the Google Workspace Developer Preview Program.",
        },
        {
          question: "Can it find a free slot for a meeting?",
          answer: "Yes. suggest_time proposes meeting times.",
        },
      ]}
      related={[
        { href: "/blog/mcp-server-for-onedrive", label: "OneDrive MCP server" },
        { href: "/blog/mcp-server-for-slack", label: "Slack MCP server" },
        { href: "/databases/firebase-mcp-server", label: "Firebase MCP server" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
      ]}
    />
  );
}
