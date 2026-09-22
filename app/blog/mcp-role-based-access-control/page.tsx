import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-role-based-access-control";
const TITLE = "Role-Based Access Control for MCP Servers";
const DESCRIPTION =
  "How to implement RBAC on an MCP server with the spec's OAuth model: scopes as roles, filtering tools/list by authorization, 403 insufficient_scope step-up, and least-privilege scopes.";
const REVIEWED = "2026-09-23";
const AUTH = "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const SEC = "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices";

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
      h1="Role-Based Access Control for MCP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="MCP has no built-in role system, but its authorization model gives you the pieces for RBAC on remote servers. Map roles to OAuth scopes, validate that every token was issued for your server, show each caller only the tools its scopes allow (the spec lets tools/list vary by authorization), and answer an under-privileged call with 403 insufficient_scope so the client can step up."
      sections={[
        {
          id: "model",
          heading: "The building blocks in the spec",
          body: (
            <ul className={UL}>
              <li>A remote MCP server is an OAuth 2.1 resource server. It MUST validate that tokens were issued specifically for it, and MUST NOT accept or pass through other tokens.</li>
              <li>The set returned by <code>tools/list</code> MAY vary by the authorization on the request, for example only the tools the caller&apos;s scopes permit. It MUST NOT vary per connection.</li>
              <li>For an insufficient token, servers SHOULD return 403 with <code>error=&quot;insufficient_scope&quot;</code> and the required scopes.</li>
              <li>Servers MUST account for scope hierarchies, where a broad scope implies narrower ones.</li>
              <li>stdio servers don&apos;t use this flow; they take credentials from the environment.</li>
            </ul>
          ),
        },
        {
          id: "design",
          heading: "A practical design",
          body: (
            <>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
                <li>Define roles in your identity provider, for example <code>viewer</code>, <code>editor</code>, <code>admin</code>.</li>
                <li>Map them to scopes such as <code>tickets:read</code>, <code>tickets:write</code>, <code>tickets:admin</code>.</li>
                <li>Tag each tool with the scope it needs, and filter <code>tools/list</code> to what the token carries.</li>
                <li>Check the scope again inside every <code>tools/call</code>; hiding a tool is not enforcement.</li>
                <li>Apply row-level rules from the token&apos;s subject, not from arguments the model supplies.</li>
              </ol>
              <P>An insufficient-scope response the client can act on:</P>
              <Code>{`HTTP/1.1 403 Forbidden
WWW-Authenticate: Bearer error="insufficient_scope",
                         scope="tickets:write",
                         resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"`}</Code>
              <P>
                The client then re-authorises with the union of its current scopes and the new one
                (step-up), and retries a limited number of times.
              </P>
            </>
          ),
        },
        {
          id: "least",
          heading: "Least privilege",
          body: (
            <>
              <P>The <Ext href={SEC}>security best practices</Ext> list common mistakes to avoid:</P>
              <ul className={UL}>
                <li>Publishing every possible scope in <code>scopes_supported</code></li>
                <li>Wildcard or omnibus scopes such as <code>*</code> or <code>full-access</code></li>
                <li>Returning the whole scope catalogue in every challenge</li>
                <li>Treating scopes in a token as sufficient without server-side authorization logic</li>
              </ul>
              <P>
                Start with a minimal read scope and elevate through targeted challenges when a
                privileged tool is first used.
              </P>
            </>
          ),
        },
        {
          id: "handles",
          heading: "Don't forget state handles",
          body: (
            <P>
              If tools return handles such as a cart or workflow ID, bind them to the authenticated
              user. The guidance says servers MUST NOT treat possession of a handle as
              authentication and SHOULD key stored state by the user ID from the verified token.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Authorization",
          url: AUTH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "MCP server as OAuth 2.1 resource server; audience validation; no token passthrough; 403 insufficient_scope with scope and resource_metadata; step-up with scope union; scope hierarchies; stdio uses environment credentials.",
        },
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "tools/list MAY vary by the authorization presented on the request, MUST NOT vary per connection; servers MUST implement access controls.",
        },
        {
          source: "MCP docs: Security best practices",
          url: SEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Scope minimization guidance and common mistakes; state handle binding requirements.",
        },
      ]}
      faqs={[
        {
          question: "Does MCP have built-in roles?",
          answer: "No. It defines OAuth-based authorization; you express roles as scopes and enforce them in your server.",
        },
        {
          question: "Can different users see different tools?",
          answer: "Yes. The spec allows tools/list to vary by the authorization on the request.",
        },
        {
          question: "What should a server return when a user lacks permission?",
          answer: "HTTP 403 with WWW-Authenticate error=\"insufficient_scope\" and the scopes required.",
        },
        {
          question: "Is hiding a tool enough?",
          answer: "No. Check authorization on every tools/call as well.",
        },
        {
          question: "How does RBAC work for local stdio servers?",
          answer: "The OAuth flow doesn't apply; the server uses credentials from its environment, so access is whatever those credentials allow.",
        },
      ]}
      related={[
        { href: "/blog/mcp-policy-as-code", label: "Policy as code for MCP" },
        { href: "/glossary/gateway", label: "MCP gateway" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
