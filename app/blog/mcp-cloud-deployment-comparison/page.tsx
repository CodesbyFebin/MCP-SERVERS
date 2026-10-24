import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-cloud-deployment-comparison";
const TITLE = "Hosting MCP Servers: AWS vs Google vs Azure";
const DESCRIPTION =
  "Where to host a remote MCP server: AWS Bedrock AgentCore and others, Google Cloud Run, Azure API Management and Cloudflare Workers compared on transport, auth and deploy steps, from official docs.";
const REVIEWED = "2026-09-23";
const AWS = "https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/introduction.html";
const RUN = "https://docs.cloud.google.com/run/docs/host-mcp-servers";
const APIM = "https://learn.microsoft.com/en-us/azure/api-management/mcp-server-overview";
const CF = "https://developers.cloudflare.com/agents/guides/remote-mcp-server/";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";
const L = "text-blue-600 hover:underline dark:text-blue-400";

const ROWS: [string, string, string, string][] = [
  ["AWS", "Bedrock AgentCore Runtime, Lambda + API Gateway, ECS, EKS, EC2", "OAuth (e.g. Cognito, Auth0) or IAM on AgentCore", "agentcore deploy"],
  ["Google Cloud", "Cloud Run (Streamable HTTP only, no stdio)", "IAM: roles/run.invoker, gcloud run services proxy, or OIDC ID tokens", "gcloud run deploy --source ."],
  ["Azure", "API Management in front of REST APIs or existing MCP servers", "JWT validation (Entra ID or others), keys, OAuth", "Portal, REST API, Bicep, Terraform"],
  ["Cloudflare", "Workers, stateless createMcpHandler", "Cloudflare Access OAuth or third-party OAuth", "npm create cloudflare@latest"],
];

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
      h1="MCP Cloud Deployment Comparison"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="All major clouds now document hosting remote MCP servers over Streamable HTTP. AWS offers five patterns led by Bedrock AgentCore Runtime; Google Cloud Run hosts HTTP servers behind IAM; Azure API Management turns REST APIs into MCP tools and governs existing servers; Cloudflare Workers runs stateless servers with OAuth. Pick the one where your data and identity system already live."
      sections={[
        {
          id: "table",
          heading: "At a glance",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Cloud</th>
                    <th className={TH}>Where the server runs</th>
                    <th className={TH}>Client auth</th>
                    <th className={TH}>Deploy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {ROWS.map(([c, w, a, d]) => (
                    <tr key={c}>
                      <td className="px-4 py-2 font-medium">{c}</td>
                      <td className="px-4 py-2">{w}</td>
                      <td className="px-4 py-2">{a}</td>
                      <td className="px-4 py-2 font-mono text-xs">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "aws",
          heading: "AWS",
          body: (
            <P>
              <Ext href={AWS}>AWS Prescriptive Guidance</Ext> compares AgentCore, Lambda with API
              Gateway, ECS, EKS and EC2. AgentCore expects the server at{" "}
              <code>0.0.0.0:8000/mcp</code> and handles auth in front of it. Full walkthrough:{" "}
              <Link href="/deployment/aws" className={L}>deploying MCP on AWS</Link>.
            </P>
          ),
        },
        {
          id: "gcp",
          heading: "Google Cloud Run",
          body: (
            <>
              <P>
                <Ext href={RUN}>Cloud Run</Ext> hosts MCP servers with Streamable HTTP but not
                stdio. Deploy from source or an image, keep it private with IAM, and let local
                clients reach it through an authenticated proxy:
              </P>
              <Code>{`gcloud run deploy --source .
gcloud run services proxy MCP_SERVER_NAME --region REGION --port=3000`}</Code>
            </>
          ),
        },
        {
          id: "azure",
          heading: "Azure API Management",
          body: (
            <P>
              <Ext href={APIM}>API Management</Ext> can expose a managed REST API as an MCP server
              (operations become tools) or front an existing one, adding rate limits, JWT
              validation, IP filtering and caching. It supports tools but not MCP resources or
              prompts. For running the server itself, use your usual Azure compute.
            </P>
          ),
        },
        {
          id: "cloudflare",
          heading: "Cloudflare Workers",
          body: (
            <>
              <P>
                Cloudflare&apos;s <Ext href={CF}>guide</Ext> recommends <code>createMcpHandler</code>{" "}
                for new stateless servers (the older Durable Object-based <code>McpAgent</code> is
                deprecated). A no-auth starter:
              </P>
              <Code>{`npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless`}</Code>
              <P>Add Cloudflare Access or a third-party OAuth provider before exposing real data.</P>
            </>
          ),
        },
        {
          id: "common",
          heading: "Whichever you choose",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Never leave an MCP endpoint unauthenticated in production.</li>
              <li>Validate the Origin header, as the MCP spec requires for Streamable HTTP.</li>
              <li>Prefer stateless servers; the 2026-07-28 spec has no protocol sessions, which suits autoscaling.</li>
              <li>Disable proxy buffering for SSE responses and watch per-tool latency.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        { source: "AWS Prescriptive Guidance: MCP deployment patterns", url: AWS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Five patterns: AgentCore, Lambda + API Gateway, ECS, EKS, EC2." },
        { source: "Google Cloud: Host MCP servers on Cloud Run", url: RUN, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Streamable HTTP only, not stdio; run.invoker IAM role; gcloud run services proxy; OIDC ID tokens; gcloud run deploy commands." },
        { source: "Microsoft Learn: MCP servers in Azure API Management", url: APIM, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "REST API as MCP server; existing MCP servers; policies; tools only, no resources or prompts." },
        { source: "Cloudflare: Build a remote MCP server", url: CF, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Workers; createMcpHandler for stateless servers; McpAgent deprecated; Streamable HTTP; Cloudflare Access or third-party OAuth; npm create cloudflare template." },
      ]}
      faqs={[
        { question: "Can I host a stdio MCP server on Cloud Run?", answer: "No. Google's docs say Cloud Run supports Streamable HTTP but not stdio." },
        { question: "Which cloud is best for MCP?", answer: "The one that already holds your data and identity provider. All four document remote MCP hosting." },
        { question: "Can Azure turn my REST API into an MCP server?", answer: "Yes. API Management can expose REST API operations as MCP tools." },
        { question: "Should my MCP server be stateless?", answer: "Generally yes. The 2026-07-28 spec removed sessions, and Cloudflare recommends stateless handlers for new servers." },
        { question: "How do local clients reach a private Cloud Run MCP server?", answer: "Through gcloud run services proxy with the Cloud Run Invoker role, or with an OIDC ID token." },
      ]}
      related={[
        { href: "/deployment/aws", label: "Deploying MCP servers on AWS" },
        { href: "/glossary/gateway", label: "MCP gateway" },
        { href: "/servers/azure-mcp-server", label: "Azure MCP Server" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
      ]}
    />
  );
}
