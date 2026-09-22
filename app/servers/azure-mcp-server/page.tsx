import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "azure-mcp-server";
const PATH = "/servers/azure-mcp-server";
const TITLE = "Azure MCP Server: Official Microsoft Setup";
const DESCRIPTION =
  "Microsoft's official Azure MCP Server lets AI tools query and manage Azure services such as Storage, Cosmos DB, AI Search and App Service. npx and Docker setup, auth, and safety.";
const REVIEWED = "2026-09-23";
const DOCS = "https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started";
const README = "https://github.com/microsoft/mcp/blob/main/servers/Azure.Mcp.Server/README.md";

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
      h1="Azure MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Microsoft publishes the official Azure MCP Server in the microsoft/mcp repository. It runs locally (npx -y @azure/mcp@latest server start, or Docker) and uses your Azure sign-in through the Azure Identity SDK to query and manage Azure services such as Cosmos DB, AI Search, App Service, Container Apps, Event Hubs and Functions. It is MIT-licensed."
      sections={[
        {
          id: "run",
          heading: "Run it",
          body: (
            <>
              <P>Sign in to Azure first (for example with the Azure CLI), then add:</P>
              <Code>{`{
  "mcpServers": {
    "azure-mcp-server": {
      "command": "npx",
      "args": ["-y", "@azure/mcp@latest", "server", "start"]
    }
  }
}`}</Code>
              <P>Or run it as a container:</P>
              <Code>{`docker run -i --rm --env-file /full/path/to/.env mcr.microsoft.com/azure-sdk/azure-mcp:latest`}</Code>
              <P>
                It is also published on NuGet (<code>Azure.Mcp</code>) and PyPI (
                <code>msmcp-azure</code>). Microsoft&apos;s <Ext href={DOCS}>get-started page</Ext>{" "}
                has guides for VS Code, Visual Studio, Cursor, Cline, Windsurf, IntelliJ,
                Antigravity and GitHub Copilot.
              </P>
            </>
          ),
        },
        {
          id: "services",
          heading: "Services covered",
          body: (
            <P>
              The <Ext href={README}>README</Ext> lists many Azure services, including Microsoft
              Foundry, Azure Advisor, AI Search, App Configuration, App Service, Backup, Compute,
              Container Apps, Container Registry, Cosmos DB, Data Explorer, Database for MySQL and
              PostgreSQL, Event Grid, Event Hubs, File Shares, Functions and IoT Hub.
            </P>
          ),
        },
        {
          id: "care",
          heading: "Safety",
          body: (
            <ul className={UL}>
              <li>
                The README warns that &ldquo;autonomous or misconfigured clients may perform
                destructive actions.&rdquo; Keep tool approval on.
              </li>
              <li>Sign in with an identity that has only the Azure roles the assistant needs.</li>
              <li>Point it at a non-production subscription while you learn how it behaves.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Microsoft Learn: Get started with the Azure MCP Server",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Packages on NuGet (Azure.Mcp), npm (@azure/mcp) and PyPI (msmcp-azure); client guides; Docker option; Python and .NET guidance.",
        },
        {
          source: "microsoft/mcp: Azure.Mcp.Server README",
          url: README,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "npx -y @azure/mcp@latest server start config; Docker image mcr.microsoft.com/azure-sdk/azure-mcp; authenticate to Azure first via Azure Identity; service list; warning about destructive actions; MIT.",
          limitations: "No read-only flag was documented in the section reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Is the Azure MCP Server official?",
          answer: "Yes. Microsoft publishes it in the microsoft/mcp repository and documents it on Microsoft Learn.",
        },
        {
          question: "How do I run it?",
          answer: "npx -y @azure/mcp@latest server start, or the Docker image mcr.microsoft.com/azure-sdk/azure-mcp.",
        },
        {
          question: "How does it authenticate?",
          answer: "Through the Azure Identity SDK, using your Azure sign-in such as the Azure CLI.",
        },
        {
          question: "Can it change resources?",
          answer: "It can manage resources, and Microsoft warns that misconfigured clients may take destructive actions.",
        },
        {
          question: "Which editors are supported?",
          answer: "Microsoft has guides for VS Code, Visual Studio, Cursor, Cline, Windsurf, IntelliJ, Antigravity and GitHub Copilot.",
        },
      ]}
      related={[
        { href: "/deployment/aws", label: "Deploying MCP servers on AWS" },
        { href: "/blog/mcp-server-for-onedrive", label: "OneDrive MCP server" },
        { href: "/blog/mcp-cloud-deployment-comparison", label: "MCP cloud deployment comparison" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
