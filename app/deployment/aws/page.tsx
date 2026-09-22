import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "aws";
const PATH = "/deployment/aws";
const TITLE = "Deploy an MCP Server on AWS: 5 Patterns";
const DESCRIPTION =
  "How to host a remote MCP server on AWS: the five patterns in AWS Prescriptive Guidance, and a step-by-step Bedrock AgentCore Runtime deployment with its container contract and auth.";
const REVIEWED = "2026-09-23";
const GUIDE = "https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/introduction.html";
const SAMPLES = "https://github.com/aws-samples/sample-mcp-deployment-patterns";
const AGENTCORE = "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-mcp.html";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

const PATTERNS: [string, string][] = [
  ["Amazon Bedrock AgentCore Runtime", "Managed runtime built for agents and MCP servers; you supply the code or container"],
  ["AWS Lambda + Amazon API Gateway", "Serverless; pay per request; suits stateless servers"],
  ["Amazon ECS (e.g. on Fargate)", "Long-running containers without managing Kubernetes"],
  ["Amazon EKS", "Kubernetes, for teams already running it"],
  ["Amazon EC2", "Full control of the host"],
];

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
      section={{ label: "Guides", href: "/guides" }}
      title={TITLE}
      h1="Deploying an MCP Server on AWS"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="AWS Prescriptive Guidance describes five ways to host a remote MCP server: Amazon Bedrock AgentCore Runtime, Lambda with API Gateway, ECS, EKS and EC2. For the least setup, AgentCore Runtime runs a Streamable HTTP MCP server that listens on 0.0.0.0:8000/mcp, handles OAuth or IAM auth in front of it, and deploys with the agentcore CLI."
      sections={[
        {
          id: "patterns",
          heading: "The five patterns",
          body: (
            <>
              <P>
                AWS&apos;s <Ext href={GUIDE}>MCP deployment patterns guide</Ext> compares these for
                scaling, security, cost and operations. Deployment scripts are in{" "}
                <Ext href={SAMPLES}>aws-samples/sample-mcp-deployment-patterns</Ext>.
              </P>
              <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left dark:bg-slate-900">
                      <th className={TH}>Pattern</th>
                      <th className={TH}>When it fits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                    {PATTERNS.map(([n, w]) => (
                      <tr key={n}>
                        <td className="px-4 py-2 font-medium">{n}</td>
                        <td className="px-4 py-2">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                The &ldquo;when it fits&rdquo; notes are our summary of each service&apos;s general
                trade-offs; read the guide&apos;s own comparison before choosing.
              </P>
            </>
          ),
        },
        {
          id: "agentcore",
          heading: "Step by step: Bedrock AgentCore Runtime",
          body: (
            <>
              <P>
                Per the <Ext href={AGENTCORE}>AgentCore MCP guide</Ext>, the runtime expects your
                server at <code>0.0.0.0:8000/mcp</code> over Streamable HTTP. You need Python 3.10+
                and AWS credentials. AWS&apos;s example server uses the Python SDK&apos;s FastMCP
                class:
              </P>
              <Code>{`# my_mcp_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP(host="0.0.0.0", stateless_http=True)

@mcp.tool()
def add_numbers(a: int, b: int) -> int:
    """Add two numbers together"""
    return a + b

if __name__ == "__main__":
    mcp.run(transport="streamable-http")`}</Code>
              <P>
                Run it with <code>python my_mcp_server.py</code> and test locally against{" "}
                <code>http://localhost:8000/mcp</code> using the MCP Inspector (
                <code>npx @modelcontextprotocol/inspector</code>). Then install the CLI and scaffold
                a project. AWS&apos;s walkthrough sets up a Cognito user pool first to issue the
                OAuth tokens:
              </P>
              <Code>{`npm install -g @aws/agentcore

agentcore create --project-name MCPServerProject --no-agent
cd MCPServerProject
agentcore add agent \\
  --name MCPServer \\
  --language Python \\
  --protocol MCP \\
  --authorizer-type CUSTOM_JWT \\
  --discovery-url "https://cognito-idp.$REGION.amazonaws.com/$POOL_ID/.well-known/openid-configuration" \\
  --allowed-clients "$CLIENT_ID" \\
  --request-header-allowlist Authorization
cp ../my_mcp_server.py app/MCPServer/main.py
(cd app/MCPServer && uv add mcp)

agentcore deploy`}</Code>
              <P>
                <code>agentcore deploy</code> packages the code, uploads it to Amazon S3, creates
                the runtime and returns a runtime ARN. Clients connect to:
              </P>
              <Code>{`https://bedrock-agentcore.<region>.amazonaws.com/runtimes/<url-encoded-ARN>/invocations?qualifier=DEFAULT`}</Code>
              <P>
                with an <code>Authorization: Bearer &lt;token&gt;</code> header. Without a token,
                the service returns 401 with a <code>WWW-Authenticate</code> header pointing to its
                OAuth protected-resource metadata, so MCP clients that support OAuth discovery can
                find the authorisation server.
              </P>
            </>
          ),
        },
        {
          id: "stateful",
          heading: "Stateless or stateful",
          body: (
            <P>
              AWS recommends stateless mode (<code>stateless_http=True</code>) for basic servers.
              Use stateful mode (<code>stateless_http=False</code>) when you need elicitation,
              sampling or progress notifications. AgentCore&apos;s guide is written against the
              session-based Streamable HTTP of earlier MCP revisions: it adds an{" "}
              <code>Mcp-Session-Id</code> header to requests without one. The{" "}
              <Ext href={SPEC}>2026-07-28 specification</Ext> removed protocol sessions, so check
              AgentCore&apos;s docs for its current protocol-version support before relying on
              newer features.
            </P>
          ),
        },
        {
          id: "checklist",
          heading: "Production checklist (any pattern)",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Require authentication on every request; never expose an unauthenticated MCP endpoint.</li>
              <li>Validate the <code>Origin</code> header, as the MCP spec requires for Streamable HTTP.</li>
              <li>Keep secrets in AWS Secrets Manager or Parameter Store, not in the image.</li>
              <li>Log per tool call, and track latency per tool (see p95 latency).</li>
              <li>For SSE responses behind a proxy, disable buffering so events are not held back.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "AWS Prescriptive Guidance: MCP deployment patterns on AWS",
          url: GUIDE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Five patterns: Amazon Bedrock AgentCore, Lambda + API Gateway, Amazon ECS, Amazon EKS, Amazon EC2; selection by scaling, security, cost and operational requirements; samples in aws-samples/sample-mcp-deployment-patterns.",
          limitations: "The per-pattern 'when it fits' notes on this page are our summary, not quotes from the guide.",
        },
        {
          source: "Amazon Bedrock AgentCore: Deploy MCP servers in AgentCore Runtime",
          url: AGENTCORE,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Container at 0.0.0.0:8000/mcp; stateless_http=True recommended, stateful for elicitation, sampling, progress; runtime adds Mcp-Session-Id; Python 3.10+; FastMCP example; npm install -g @aws/agentcore; agentcore create/add agent/deploy with CUSTOM_JWT and Cognito; invocation URL format; 401 with WWW-Authenticate resource_metadata.",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Protocol-level sessions removed in 2026-07-28; Origin validation required; X-Accel-Buffering: no recommended for SSE.",
        },
      ]}
      faqs={[
        {
          question: "What is the easiest way to host an MCP server on AWS?",
          answer:
            "Amazon Bedrock AgentCore Runtime needs the least infrastructure: you provide a Streamable HTTP server on port 8000 at /mcp and deploy with the agentcore CLI.",
        },
        {
          question: "Can I run an MCP server on AWS Lambda?",
          answer:
            "Yes. Lambda with API Gateway is one of the five patterns in AWS Prescriptive Guidance, and suits stateless servers.",
        },
        {
          question: "What port and path does AgentCore expect?",
          answer: "0.0.0.0:8000/mcp, which AWS notes is the default for most official MCP server SDKs.",
        },
        {
          question: "How do clients authenticate to an AgentCore MCP server?",
          answer:
            "With a bearer token from the configured identity provider (AWS's example uses Amazon Cognito; Auth0 is also documented) in the Authorization header.",
        },
        {
          question: "Should my server be stateless?",
          answer:
            "AWS recommends stateless for basic servers. Use stateful mode only if you need elicitation, sampling or progress notifications.",
        },
      ]}
      related={[
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/security/mcp-oauth", label: "MCP OAuth" },
        { href: "/frameworks/spring-ai-mcp", label: "Spring AI MCP" },
      ]}
    />
  );
}
