import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "gateway";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Gateway: What It Is and When to Use One";
const DESCRIPTION =
  "An MCP gateway sits between AI clients and MCP servers to add authentication, rate limits, routing and monitoring. How the spec supports gateways, and examples from Azure and AWS.";
const REVIEWED = "2026-09-23";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";
const APIM = "https://learn.microsoft.com/en-us/azure/api-management/mcp-server-overview";
const SEC = "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices";

const L = "text-blue-600 hover:underline dark:text-blue-400";
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
      h1="Gateway (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="An MCP gateway is an HTTP intermediary between MCP clients and one or more remote MCP servers. It centralises authentication, rate limiting, IP filtering, routing, caching and monitoring so each server doesn't have to. The 2026-07-28 Streamable HTTP transport helps by mirroring the method and tool name into headers that gateways can read without parsing the body."
      sections={[
        {
          id: "spec",
          heading: "What the spec does for gateways",
          body: (
            <ul className={UL}>
              <li>
                Every POST carries <code>MCP-Protocol-Version</code>, <code>Mcp-Method</code> and,
                for tool calls and reads, <code>Mcp-Name</code>, so intermediaries can route and
                inspect requests.
              </li>
              <li>Servers MUST reject requests whose headers don&apos;t match the body (error <code>-32020</code>), so a gateway routing on headers can&apos;t be tricked by a mismatched body.</li>
              <li>
                Intermediaries that enforce policy on mirrored headers SHOULD reject requests from
                protocol versions that don&apos;t require header-body validation.
              </li>
              <li>Tools can mark parameters with <code>x-mcp-header</code> to expose them as <code>Mcp-Param-*</code> headers for routing.</li>
            </ul>
          ),
        },
        {
          id: "examples",
          heading: "Examples",
          body: (
            <>
              <P>
                <Ext href={APIM}>Azure API Management</Ext> can expose any managed REST API as an
                MCP server (operations become tools) or front an existing MCP server, and apply
                policies for rate limits and quotas, JWT validation, IP filtering and caching. It
                currently supports MCP tools but not resources or prompts.
              </P>
              <P>
                On AWS, Bedrock AgentCore places authentication in front of hosted MCP servers; see{" "}
                <Link href="/deployment/aws" className={L}>deploying MCP on AWS</Link>.
              </P>
            </>
          ),
        },
        {
          id: "careful",
          heading: "Don't turn a gateway into a confused deputy",
          body: (
            <P>
              The MCP <Ext href={SEC}>security best practices</Ext> forbid token passthrough: a
              server MUST NOT accept tokens that were not issued for it. A gateway that forwards a
              client&apos;s token to downstream APIs unchanged, or proxies OAuth with a static
              client ID without per-client consent, recreates the confused-deputy and passthrough
              problems the guide describes.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Header mirroring for intermediaries; HeaderMismatch -32020; intermediary guidance on protocol versions; x-mcp-header.",
        },
        {
          source: "Microsoft Learn: MCP servers in Azure API Management",
          url: APIM,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "REST API as MCP server and existing MCP server exposure; policies for rate limiting, JWT auth, IP filtering, caching; tools only, no resources or prompts; tiers listed.",
        },
        {
          source: "MCP docs: Security best practices",
          url: SEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Token passthrough forbidden; confused deputy risks for proxy servers with static client IDs.",
        },
      ]}
      faqs={[
        {
          question: "What is an MCP gateway?",
          answer: "An intermediary in front of remote MCP servers that centralises auth, rate limits, routing and monitoring.",
        },
        {
          question: "Do I need a gateway?",
          answer: "Not for one server. It helps when many teams or many servers need the same policies and logging.",
        },
        {
          question: "How does a gateway know which tool is called?",
          answer: "From the Mcp-Method and Mcp-Name headers that Streamable HTTP clients must send in the 2026-07-28 revision.",
        },
        {
          question: "Can Azure API Management turn my REST API into an MCP server?",
          answer: "Yes. It can expose API operations as MCP tools.",
        },
        {
          question: "Can a gateway just forward the user's token?",
          answer: "Not safely. The MCP guidance forbids token passthrough; tokens must be issued for the server that receives them.",
        },
      ]}
      related={[
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/blog/mcp-role-based-access-control", label: "Access control for MCP" },
        { href: "/deployment/aws", label: "Deploying MCP servers on AWS" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
