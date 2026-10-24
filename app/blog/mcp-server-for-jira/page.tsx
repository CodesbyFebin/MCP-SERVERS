import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-jira";
const TITLE = "Jira MCP Server: Atlassian's Official Setup";
const DESCRIPTION =
  "Atlassian's official remote MCP server connects Jira, Confluence and other Atlassian Cloud apps to Claude, Cursor and VS Code. Endpoint, OAuth and API-token setup, admin controls.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/atlassian/atlassian-mcp-server";
const ENDPOINT = "https://mcp.atlassian.com/v2/mcp";
const COMMUNITY = "https://github.com/sooperset/mcp-atlassian";

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
      h1="Jira MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer={`Atlassian runs an official remote MCP server at ${ENDPOINT} covering Jira, Confluence, Jira Service Management, Bitbucket Cloud, Compass, Loom and more. An AI assistant can search issues, create stories and bulk-create issues from notes, with every action limited by your Atlassian permissions. It is Cloud-only; there is no Data Center version.`}
      sections={[
        {
          id: "setup",
          heading: "Setup",
          body: (
            <>
              <ul className={UL}>
                <li><strong>Claude Desktop:</strong> Settings → Extensions → Browse extensions → Plugins, search &ldquo;Atlassian&rdquo;.</li>
                <li><strong>Cursor:</strong> the Add to Cursor button or the Cursor Marketplace plugin.</li>
                <li><strong>VS Code with Copilot:</strong> Extensions view, search <code>@mcp Atlassian</code>, Install.</li>
                <li><strong>Claude Code:</strong></li>
              </ul>
              <Code>{`claude mcp add --transport http atlassian ${ENDPOINT}`}</Code>
              <P>
                The <Ext href={REPO}>repository</Ext> notes the older v1 endpoints are to be
                deprecated after 30 June 2026; use v2.
              </P>
            </>
          ),
        },
        {
          id: "auth",
          heading: "Authentication and admin controls",
          body: (
            <ul className={UL}>
              <li>OAuth 2.1 in the browser for interactive clients.</li>
              <li>API tokens for headless setups, once an organisation admin enables API-token authentication.</li>
              <li>Admins manage access under Atlassian Administration → Rovo settings, with domain and IP allowlisting and an audit log.</li>
              <li>Users can revoke authorisations from their profile settings.</li>
            </ul>
          ),
        },
        {
          id: "examples",
          heading: "Example Jira requests",
          body: (
            <ul className={UL}>
              <li>&ldquo;Find all open bugs in Project Alpha.&rdquo;</li>
              <li>&ldquo;Create a story titled &lsquo;Redesign onboarding&rsquo;.&rdquo;</li>
              <li>&ldquo;Make five Jira issues from these notes.&rdquo;</li>
            </ul>
          ),
        },
        {
          id: "dc",
          heading: "Jira Data Center or Server",
          body: (
            <P>
              The official server does not support Data Center. Community projects such as{" "}
              <Ext href={COMMUNITY}>sooperset/mcp-atlassian</Ext> are used for self-hosted Jira and
              Confluence. They are not Atlassian products and hold your tokens locally; review them
              before use.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "atlassian/atlassian-mcp-server (GitHub)",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Endpoint https://mcp.atlassian.com/v2/mcp; v1 deprecated after 30 June 2026; products covered; OAuth 2.1 and admin-enabled API tokens; setup for Claude Desktop, Cursor, VS Code and Claude Code; admin controls and audit log; Cloud-only; example Jira prompts.",
          limitations: "Rate limits not documented.",
        },
        {
          source: "sooperset/mcp-atlassian",
          url: COMMUNITY,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community MCP server for Confluence and Jira.",
          limitations: "Data Center support not verified here.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official Jira MCP server?",
          answer: "Yes. Atlassian's remote MCP server covers Jira and other Atlassian Cloud products.",
        },
        {
          question: "What is the Atlassian MCP endpoint?",
          answer: "https://mcp.atlassian.com/v2/mcp. The v1 endpoints are being deprecated after 30 June 2026.",
        },
        {
          question: "Does it work with Jira Data Center?",
          answer: "No. It is hosted on Atlassian Cloud only.",
        },
        {
          question: "Can I use an API token instead of OAuth?",
          answer: "Yes, for headless setups, once an organisation admin enables API-token authentication.",
        },
        {
          question: "Can admins see what the AI did?",
          answer: "Atlassian provides audit logging under Insights → Audit log in Atlassian Administration.",
        },
      ]}
      related={[
        { href: "/blog/mcp-server-for-gitlab-devops", label: "GitLab MCP server" },
        { href: "/blog/mcp-server-for-slack", label: "Slack MCP server" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
