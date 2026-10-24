import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "complete-guide-mcp-servers";
const PATH = "/complete-guide-mcp-servers";
const TITLE = "MCP Servers: The Complete Guide (2026)";
const DESCRIPTION =
  "A complete, sourced guide to MCP servers: hosts, clients and servers, tools, resources and prompts, stdio vs Streamable HTTP, the 2026-07-28 stateless protocol, auth, and security.";
const REVIEWED = "2026-09-23";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28";
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
      section={{ label: "Learn", href: "/learn" }}
      title={TITLE}
      h1="The Complete Guide to MCP Servers"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="An MCP server is a program that gives AI applications tools, data and prompt templates through the Model Context Protocol, an open JSON-RPC 2.0 standard. An AI application (the host) creates one client per server; servers run locally over stdio or remotely over Streamable HTTP. Since the 2026-07-28 revision, the protocol is stateless: every request carries its own version and capabilities."
      sections={[
        {
          id: "participants",
          heading: "Hosts, clients and servers",
          body: (
            <>
              <P>From the <Ext href={ARCH}>official architecture overview</Ext>:</P>
              <ul className={UL}>
                <li><strong>Host:</strong> the AI application, such as Claude Desktop, Claude Code or VS Code.</li>
                <li><strong>Client:</strong> a component in the host that keeps a dedicated connection to one server. The host creates one client per server.</li>
                <li><strong>Server:</strong> the program that provides context. It can run locally (stdio) or remotely (Streamable HTTP).</li>
              </ul>
              <P>
                MCP only defines how context is exchanged; it does not dictate how the host uses the
                model or manages that context.
              </P>
            </>
          ),
        },
        {
          id: "primitives",
          heading: "What a server can offer",
          body: (
            <>
              <ul className={UL}>
                <li>
                  <strong>Tools:</strong> functions the model can call, such as querying a database
                  or calling an API. See{" "}
                  <Link href="/glossary/tool-calling" className={L}>tool calling</Link>.
                </li>
                <li>
                  <strong>Resources:</strong> read-only context identified by URIs, such as files or
                  schemas. See <Link href="/glossary/mcp-uri-scheme" className={L}>URI schemes</Link>.
                </li>
                <li><strong>Prompts:</strong> reusable templates for interacting with the model.</li>
              </ul>
              <P>
                Clients can offer <Link href="/glossary/mcp-elicitation" className={L}>elicitation</Link>,
                letting a server ask the user for input mid-task. Sampling and protocol-level
                logging are deprecated as of 2026-07-28.
              </P>
            </>
          ),
        },
        {
          id: "stateless",
          heading: "How a request works (2026-07-28)",
          body: (
            <>
              <P>
                There is no <code>initialize</code> handshake or session any more. Each request
                carries the protocol version and client capabilities in <code>_meta</code>. Clients
                may call <code>server/discover</code> first to learn supported versions and
                capabilities:
              </P>
              <Code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": { "elicitation": {} }
    }
  }
}`}</Code>
              <P>
                Then <code>tools/list</code> to discover tools and <code>tools/call</code> to run
                one. Change notifications are opt-in through a <code>subscriptions/listen</code>{" "}
                request. Full details are in the <Ext href={SPEC}>specification</Ext>.
              </P>
            </>
          ),
        },
        {
          id: "transports",
          heading: "Local vs remote",
          body: (
            <P>
              A local server is started by the host and talks over stdin and stdout. A remote
              server exposes one HTTP endpoint and answers each POST with JSON or a request-scoped
              event stream. Read{" "}
              <Link href="/blog/mcp-transport-methods" className={L}>MCP transports</Link> for the
              rules on each.
            </P>
          ),
        },
        {
          id: "auth",
          heading: "Authentication",
          body: (
            <P>
              Remote servers use OAuth 2.1: the server is a resource server, publishes protected
              resource metadata, and must accept only tokens issued for it. Local stdio servers
              take credentials from their environment instead. See{" "}
              <Link href="/blog/mcp-role-based-access-control" className={L}>
                access control for MCP
              </Link>
              .
            </P>
          ),
        },
        {
          id: "choose",
          heading: "Finding and choosing servers",
          body: (
            <P>
              Prefer servers published by the company that owns the data; many Indian companies now
              publish official ones. Start with our{" "}
              <Link href="/best/mcp-servers" className={L}>where-to-start list</Link> and check who
              publishes a server, what it can change and how it signs in.
            </P>
          ),
        },
        {
          id: "build",
          heading: "Building your own",
          body: (
            <P>
              Official SDKs exist for{" "}
              <Link href="/sdk/typescript" className={L}>TypeScript</Link>,{" "}
              <Link href="/sdk/java" className={L}>Java</Link> and Python, among others. Test with
              the MCP Inspector, log to stderr, and follow the{" "}
              <Ext href={SEC}>security best practices</Ext>.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP docs: Architecture overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Host creates one client per server; local stdio and remote Streamable HTTP servers; data and transport layers; tools, resources and prompts; elicitation; sampling and logging deprecated in 2026-07-28; stateless requests with _meta; server/discover; subscriptions/listen.",
        },
        {
          source: "MCP specification 2026-07-28",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Normative protocol definition, including transports and authorization.",
        },
        {
          source: "MCP docs: Security best practices",
          url: SEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Attacks and mitigations: confused deputy, token passthrough, SSRF, state handle hijacking, local server compromise, scope minimization.",
        },
      ]}
      faqs={[
        {
          question: "What is an MCP server?",
          answer: "A program that provides tools, resources and prompts to AI applications over the Model Context Protocol.",
        },
        {
          question: "What is the difference between an MCP host and client?",
          answer: "The host is the AI application. It creates one client per server, and each client keeps a dedicated connection to its server.",
        },
        {
          question: "Does MCP still use an initialize handshake?",
          answer: "Not in the 2026-07-28 revision, which is stateless. Older revisions did, and clients can fall back for older servers.",
        },
        {
          question: "What language should I build a server in?",
          answer: "Whichever your team knows. Official SDKs cover TypeScript, Python, Java and more.",
        },
        {
          question: "Are MCP servers safe?",
          answer: "They run with real access to your data and accounts. Check who publishes them, what they can change and how they authenticate.",
        },
      ]}
      related={[
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/compare/python-vs-typescript-mcp", label: "Python vs TypeScript for MCP" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
