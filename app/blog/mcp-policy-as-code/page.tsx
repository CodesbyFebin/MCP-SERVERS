import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-policy-as-code";
const TITLE = "Policy as Code for MCP Tool Calls";
const DESCRIPTION =
  "Using a policy engine such as Open Policy Agent to decide which MCP tool calls are allowed: where to enforce, what input to send, an example Rego policy, and pitfalls.";
const REVIEWED = "2026-09-23";
const OPA = "https://www.openpolicyagent.org/docs";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

const L = "text-blue-600 hover:underline dark:text-blue-400";
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
      h1="Policy as Code for MCP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Policy as code means writing access rules as versioned, testable code evaluated by a policy engine, instead of scattering if-statements through your tools. For MCP, the server (or a gateway in front of it) asks the engine before each tools/call, sending the caller's identity, the tool name and the arguments, and enforces the allow or deny decision. Open Policy Agent is a common choice."
      sections={[
        {
          id: "why",
          heading: "Why it suits MCP",
          body: (
            <P>
              The <Ext href={TOOLS}>tools specification</Ext> requires servers to validate inputs
              and implement access controls. Tool calls arrive in a uniform shape (a name plus JSON
              arguments), which makes them easy to pass to a policy engine. Rules like &ldquo;only
              finance can issue refunds over ₹10,000&rdquo; then live in one reviewed place.
            </P>
          ),
        },
        {
          id: "opa",
          heading: "Open Policy Agent in one paragraph",
          body: (
            <P>
              <Ext href={OPA}>OPA</Ext> is &ldquo;an open source, general-purpose policy engine
              that unifies policy enforcement across the stack&rdquo; and a graduated CNCF project.
              It &ldquo;decouples policy decision-making from policy enforcement&rdquo;: your code
              sends structured input, OPA evaluates policies written in Rego, and returns a
              decision.
            </P>
          ),
        },
        {
          id: "example",
          heading: "An example policy",
          body: (
            <>
              <P>Input your server might send for each call:</P>
              <Code>{`{
  "user": { "sub": "u_123", "roles": ["support"] },
  "tool": "initiate_refund",
  "arguments": { "order_id": "ORD1", "amount": 25000 }
}`}</Code>
              <P>A Rego policy (illustrative):</P>
              <Code>{`package mcp.tools

default allow := false

# Read-only tools are open to any authenticated user
allow if {
    input.tool in {"fetch_order_status", "fetch_refund_status"}
}

# Refunds up to 10,000 for support; any amount for finance
allow if {
    input.tool == "initiate_refund"
    "support" in input.user.roles
    input.arguments.amount <= 10000
}

allow if {
    input.tool == "initiate_refund"
    "finance" in input.user.roles
}`}</Code>
            </>
          ),
        },
        {
          id: "where",
          heading: "Where to enforce",
          body: (
            <ul className={UL}>
              <li><strong>In the server</strong>, just before a tool runs: sees the full arguments and the verified identity.</li>
              <li>
                <strong>In a <Link href="/glossary/gateway" className={L}>gateway</Link></strong>:
                one place for many servers. On Streamable HTTP it can read{" "}
                <code>Mcp-Name</code> and any <code>Mcp-Param-*</code> headers without parsing the
                body, and the <Ext href={HTTP}>spec</Ext> requires servers to reject header-body
                mismatches.
              </li>
              <li>Also filter <code>tools/list</code> with the same policy so the model isn&apos;t offered tools it can&apos;t use.</li>
            </ul>
          ),
        },
        {
          id: "pitfalls",
          heading: "Pitfalls",
          body: (
            <ul className={UL}>
              <li>Take identity from the verified token, never from arguments the model wrote.</li>
              <li>Default to deny, and log every decision with the tool name and caller.</li>
              <li>Write tests for policies like any other code, including the deny cases.</li>
              <li>Return a clear tool error on deny so the model can explain it to the user rather than retrying blindly.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Open Policy Agent documentation",
          url: OPA,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "General-purpose policy engine; Rego; decouples decision from enforcement; graduated CNCF project.",
        },
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Servers MUST validate tool inputs and implement access controls; tool execution errors via isError.",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Mcp-Name and Mcp-Param-* headers for intermediaries; servers reject header-body mismatches.",
        },
        {
          source: "Example Rego policy on this page",
          url: `https://www.mcpserver.in/blog/${SLUG}`,
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Illustrative policy; tool names borrowed from Paytm's MCP server for realism.",
          limitations: "Not tested against a specific OPA version.",
        },
      ]}
      faqs={[
        {
          question: "What is policy as code?",
          answer: "Writing authorization rules as versioned, testable code evaluated by a policy engine.",
        },
        {
          question: "Does MCP include a policy engine?",
          answer: "No. The spec requires access controls but leaves the mechanism to you.",
        },
        {
          question: "Should the policy run in the server or a gateway?",
          answer: "The server sees full arguments and identity; a gateway centralises rules for many servers. Many teams use both.",
        },
        {
          question: "Can policies check tool arguments?",
          answer: "Yes. Send the arguments in the policy input, as in the refund example.",
        },
        {
          question: "Is OPA the only option?",
          answer: "No. Any policy engine or a well-tested authorization module works; OPA is one widely used choice.",
        },
      ]}
      related={[
        { href: "/blog/mcp-role-based-access-control", label: "Role-based access control for MCP" },
        { href: "/glossary/guardrails", label: "Guardrails" },
        { href: "/glossary/gateway", label: "MCP gateway" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
