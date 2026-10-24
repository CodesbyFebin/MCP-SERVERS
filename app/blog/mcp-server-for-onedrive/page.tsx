import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-server-for-onedrive";
const TITLE = "OneDrive MCP Server: Microsoft Work IQ Guide";
const DESCRIPTION =
  "Microsoft's official OneDrive MCP server (Work IQ OneDrive, preview) gives agents 17 file and folder tools with a 5 MB limit. Where it runs, licensing, tools, and alternatives.";
const REVIEWED = "2026-09-23";
const REF = "https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/onedrive";
const WORKIQ = "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview";

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
      h1="OneDrive MCP Server"
      description={DESCRIPTION}
      status="official"
      reviewedAt={REVIEWED}
      directAnswer="Microsoft publishes an official OneDrive MCP server, mcp_OneDriveRemoteServer (Work IQ OneDrive), in preview. It gives agents 17 tools to browse, search, read, create, move, share and label files in the signed-in user's personal OneDrive, with every file operation capped at 5 MB. It is documented for Microsoft Copilot Studio and Agent 365, part of Microsoft's Work IQ MCP servers."
      sections={[
        {
          id: "tools",
          heading: "Tools",
          body: (
            <ul className={UL}>
              <li><strong>Drive and browsing:</strong> <code>getOnedrive</code>, <code>getFolderChildrenInMyOnedrive</code> (top 20 items), <code>findFileOrFolderInMyOnedrive</code></li>
              <li><strong>Metadata:</strong> <code>getFileOrFolderMetadataInMyOnedrive</code>, <code>getFileOrFolderMetadataByUrl</code></li>
              <li><strong>Read and write:</strong> <code>readSmallTextFileFromMyOnedrive</code>, <code>createSmallTextFileInMyOnedrive</code>, <code>readSmallBinaryFileFromMyOnedrive</code>, <code>createSmallBinaryFileInMyOnedrive</code></li>
              <li><strong>Organise:</strong> <code>createFolderInMyOnedrive</code>, <code>renameFileOrFolderInMyOnedrive</code>, <code>deleteFileOrFolderInMyOnedrive</code>, <code>copyFileOrFolderInMyOnedrive</code>, <code>moveFileOrFolderInMyOnedrive</code>, <code>checkOperationStatusInMyOnedrive</code></li>
              <li><strong>Share and protect:</strong> <code>shareFileOrFolderInMyOnedrive</code>, <code>setSensitivityLabelOnFileInMyOnedrive</code></li>
            </ul>
          ),
        },
        {
          id: "where",
          heading: "Where it runs",
          body: (
            <>
              <P>
                The <Ext href={REF}>OneDrive reference</Ext> gives a tenant-level URL under{" "}
                <code>agent365.svc.cloud.microsoft</code> and documents use from Copilot Studio
                agents. It is a preview feature: Microsoft says tool names and parameters may change
                and it is not meant for production.
              </P>
              <P>
                Microsoft also offers a general <Ext href={WORKIQ}>Work IQ MCP server</Ext> with 10
                generic tools (<code>fetch</code>, <code>create_entity</code>,{" "}
                <code>do_action</code> and others) that act on Microsoft 365 resource paths,
                authenticated through Microsoft Entra ID.
              </P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Things to watch",
          body: (
            <ul className={UL}>
              <li><code>shareFileOrFolderInMyOnedrive</code> sends real invitations; check recipients before approving.</li>
              <li><code>deleteFileOrFolderInMyOnedrive</code> removes files; use the eTag option to avoid deleting a changed file.</li>
              <li>Files over 5 MB cannot be read or written through these tools.</li>
            </ul>
          ),
        },
        {
          id: "alt",
          heading: "Community alternatives",
          body: (
            <P>
              Community servers built on Microsoft Graph, such as{" "}
              <Ext href="https://github.com/ftaricano/mcp-onedrive-sharepoint">ftaricano/mcp-onedrive-sharepoint</Ext>,
              work with ordinary MCP clients but need your own Entra app registration and are not
              Microsoft products.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Microsoft Learn: OneDrive reference (preview)",
          url: REF,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Server ID mcp_OneDriveRemoteServer; tenant-level URL on agent365.svc.cloud.microsoft; 17 tools listed; 5 MB limit; folder listing up to 20 items; preview, names may change; Copilot Studio documentation.",
        },
        {
          source: "Microsoft Learn: Work IQ MCP overview",
          url: WORKIQ,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "10 generic tools on Microsoft 365 resource paths; Microsoft Entra ID authentication via protected-resource metadata.",
        },
        {
          source: "ftaricano/mcp-onedrive-sharepoint",
          url: "https://github.com/ftaricano/mcp-onedrive-sharepoint",
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Community MCP server and CLI for OneDrive and SharePoint via Microsoft Graph.",
          limitations: "Not reviewed.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official OneDrive MCP server?",
          answer: "Yes. Microsoft documents Work IQ OneDrive (mcp_OneDriveRemoteServer), currently in preview.",
        },
        {
          question: "What is the file size limit?",
          answer: "5 MB for every upload and download operation.",
        },
        {
          question: "Can it share files?",
          answer: "Yes. shareFileOrFolderInMyOnedrive sends sharing invitations with read or write roles.",
        },
        {
          question: "Does it cover SharePoint?",
          answer: "This server targets the user's personal OneDrive. Microsoft documents SharePoint separately among its Work IQ servers.",
        },
        {
          question: "Is it production-ready?",
          answer: "Microsoft labels it preview and says it is not meant for production use.",
        },
      ]}
      related={[
        { href: "/blog/mcp-server-for-slack", label: "Slack MCP server" },
        { href: "/servers/google-calendar-mcp-server", label: "Google Calendar MCP server" },
        { href: "/servers/azure-mcp-server", label: "Azure MCP Server" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
