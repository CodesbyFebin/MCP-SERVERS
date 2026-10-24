import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-gitlab-devops";
const TITLE = "GitLab MCP Server: Official Setup for DevOps";
const DESCRIPTION =
  "GitLab's built-in MCP server (beta) at /api/v4/mcp connects Claude, Cursor, Copilot and more to merge requests, work items, CI and repositories. Tiers, config, OAuth and toolsets.";
const REVIEWED = "2026-09-23";
const DOCS = "https://docs.gitlab.com/user/model_context_protocol/mcp_server/";
const TOOLS = "https://docs.gitlab.com/user/model_context_protocol/mcp_server_tools/";

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
      h1="GitLab MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="GitLab ships an official MCP server, in beta, at https://<your-gitlab-host>/api/v4/mcp. It is available on Free, Premium and Ultimate across GitLab.com, Self-Managed and Dedicated, once an admin or top-level group owner allows MCP access. Clients authenticate with OAuth 2.0 Dynamic Client Registration and get toolsets for merge requests, work items, repositories and CI."
      sections={[
        {
          id: "prereq",
          heading: "Before you start",
          body: (
            <ul className={UL}>
              <li>Status: beta (it moved from experiment to beta in GitLab 18.6).</li>
              <li>Allow MCP server access at the top-level group (GitLab.com) or instance level (Self-Managed and Dedicated).</li>
              <li>Node.js 20 or later only if you use the stdio route.</li>
            </ul>
          ),
        },
        {
          id: "config",
          heading: "Configure your client",
          body: (
            <>
              <P>HTTP transport, which GitLab recommends:</P>
              <Code>{`{
  "mcpServers": {
    "GitLab": {
      "type": "http",
      "url": "https://<gitlab.example.com>/api/v4/mcp"
    }
  }
}`}</Code>
              <P>For clients that only speak stdio, bridge with mcp-remote:</P>
              <Code>{`{
  "mcpServers": {
    "GitLab": {
      "command": "npx",
      "args": ["mcp-remote", "https://<gitlab.example.com>/api/v4/mcp"]
    }
  }
}`}</Code>
              <P>
                On GitLab.com use <code>gitlab.com</code> as the host. On first connect the client
                registers itself and you approve access in the browser.
              </P>
            </>
          ),
        },
        {
          id: "clients",
          heading: "Supported clients",
          body: (
            <P>
              GitLab lists Claude Desktop, Claude Code, Cursor, Amazon Q Developer, Gemini Code
              Assist, GitHub Copilot in VS Code, Kiro, OpenCode, OpenAI Codex and Zed.
            </P>
          ),
        },
        {
          id: "toolsets",
          heading: "Toolsets",
          body: (
            <>
              <P>
                Tools are grouped into toolsets: core, merge_requests, work_items, repository, ci
                and meta, plus opt-in duo_agent_platform, wikis and code_security. See the{" "}
                <Ext href={TOOLS}>tool reference</Ext> for each tool.
              </P>
              <P>
                Keep opt-in toolsets off unless you need them, and remember that CI and merge
                request tools act on real pipelines and branches.
              </P>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "GitLab Docs: GitLab MCP server",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Tiers Free, Premium, Ultimate; GitLab.com, Self-Managed, Dedicated; beta since 18.6; allow access at group or instance level; endpoint /api/v4/mcp; HTTP and stdio (mcp-remote, Node 20+) configs; OAuth 2.0 Dynamic Client Registration; supported clients; toolsets.",
        },
        {
          source: "GitLab Docs: GitLab MCP server tools",
          url: TOOLS,
          type: "official",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Reference for individual tools.",
          limitations: "Individual tool names not reproduced here.",
        },
      ]}
      faqs={[
        {
          question: "Does GitLab have an official MCP server?",
          answer: "Yes, built into GitLab at /api/v4/mcp, currently in beta.",
        },
        {
          question: "Is it available on the Free tier?",
          answer: "Yes. GitLab lists Free, Premium and Ultimate.",
        },
        {
          question: "Does it work on self-managed GitLab?",
          answer: "Yes, on Self-Managed and Dedicated as well as GitLab.com, once enabled at instance level.",
        },
        {
          question: "How do clients authenticate?",
          answer: "With OAuth 2.0 Dynamic Client Registration: the client registers itself on first connect.",
        },
        {
          question: "Do I need Node.js?",
          answer: "Only for the stdio route through mcp-remote (Node.js 20+). The HTTP route needs nothing extra.",
        },
      ]}
      related={[
        { href: "/blog/mcp-server-for-jira", label: "Jira MCP server" },
        { href: "/directory/devops", label: "DevOps MCP servers" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
      ]}
    />
  );
}
