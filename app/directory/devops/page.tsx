import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { ServerDirectory, directoryMetadata } from "@/src/components/content/ServerDirectory";

export const dynamic = "force-static";

const SLUG = "devops";
const TITLE = "DevOps MCP Servers: Official Options";
const DESCRIPTION =
  "Official MCP servers for DevOps: GitHub, GitLab, Azure DevOps, Atlassian (Jira, Bitbucket), Terraform, Azure and Docker's MCP Gateway, with guidance on safe use.";

export function generateMetadata(): Metadata {
  return directoryMetadata(SLUG, TITLE, DESCRIPTION);
}

export default function Page() {
  return (
    <ServerDirectory
      category="DevOps"
      slug={SLUG}
      title={TITLE}
      description={DESCRIPTION}
      reviewedAt="2026-09-23"
      directAnswer="The main DevOps platforms now publish official MCP servers: GitHub, GitLab, Azure DevOps, Atlassian (Jira, Confluence, Bitbucket), HashiCorp Terraform and Microsoft Azure. Docker publishes an MCP Gateway for running MCP servers in containers. Give them tokens scoped to the repositories and projects the assistant needs, and review anything that merges, deploys or changes infrastructure."
      entries={[
        { name: "GitHub MCP Server", publisher: "GitHub", url: "https://github.com/github/github-mcp-server", note: "GitHub's official MCP server. MIT." },
        { name: "GitLab MCP server", publisher: "GitLab", url: "https://docs.gitlab.com/user/model_context_protocol/mcp_server/", note: "Built into GitLab at /api/v4/mcp (beta); merge requests, work items, repository, CI.", page: "/blog/mcp-server-for-gitlab-devops" },
        { name: "Azure DevOps MCP", publisher: "Microsoft", url: "https://github.com/microsoft/azure-devops-mcp", note: "Brings Azure DevOps to agents. MIT." },
        { name: "Atlassian remote MCP server", publisher: "Atlassian", url: "https://github.com/atlassian/atlassian-mcp-server", note: "Jira, Confluence, Jira Service Management, Bitbucket Cloud, Compass and more.", page: "/blog/mcp-server-for-jira" },
        { name: "Terraform MCP Server", publisher: "HashiCorp", url: "https://github.com/hashicorp/terraform-mcp-server", note: "Integration with the Terraform ecosystem. MPL-2.0." },
        { name: "Azure MCP Server", publisher: "Microsoft", url: "https://github.com/microsoft/mcp/blob/main/servers/Azure.Mcp.Server/README.md", note: "Query and manage Azure services.", page: "/servers/azure-mcp-server" },
        { name: "Docker MCP Gateway", publisher: "Docker", url: "https://github.com/docker/mcp-gateway", note: "docker mcp CLI plugin and MCP Gateway. MIT." },
      ]}
      choosing={
        <>
          <P>Match the server to where your code and pipelines live, then limit what it can do:</P>
          <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
            <li>Use fine-grained tokens limited to specific repositories or projects.</li>
            <li>Keep merges, deployments, pipeline runs and <code>terraform apply</code> behind human approval.</li>
            <li>Issue text, commit messages and PR comments are written by others; treat them as untrusted input.</li>
            <li>Pin versions of locally run servers and keep them patched.</li>
          </ul>
        </>
      }
      faqs={[
        { question: "Does GitHub have an official MCP server?", answer: "Yes, github/github-mcp-server." },
        { question: "Is the GitLab MCP server generally available?", answer: "It was in beta on the review date, on Free, Premium and Ultimate tiers." },
        { question: "Can an AI apply Terraform changes through MCP?", answer: "Don't let it do so unattended. Review plans and keep apply behind human approval." },
        { question: "What is Docker's MCP Gateway?", answer: "A docker mcp CLI plugin and gateway for running MCP servers, published by Docker." },
        { question: "Is there an official Azure DevOps MCP server?", answer: "Yes, microsoft/azure-devops-mcp." },
      ]}
      related={[
        { href: "/blog/mcp-server-for-gitlab-devops", label: "GitLab MCP server" },
        { href: "/blog/mcp-server-for-jira", label: "Jira MCP server" },
        { href: "/glossary/cve-management", label: "CVE management for MCP" },
        { href: "/directory/monitoring", label: "Monitoring MCP servers" },
      ]}
    />
  );
}
