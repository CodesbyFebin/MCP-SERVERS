import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-uri-scheme";
const PATH = `/glossary/${SLUG}`;
const TITLE = "MCP Resource URI Schemes Explained";
const DESCRIPTION =
  "How MCP resources are identified by URIs: the https://, file:// and git:// schemes, custom schemes under RFC 3986, URI templates, not-found errors, and security rules.";
const REVIEWED = "2026-09-23";
const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/server/resources";

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
      h1="URI Scheme (MCP Resources)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Every MCP resource is identified by a URI. The specification describes https:// for resources a client can fetch from the web itself, file:// for filesystem-like resources, and git:// for Git integration, and allows custom schemes as long as they follow RFC 3986. Servers can also publish URI templates (RFC 6570) for parameterised resources."
      sections={[
        {
          id: "schemes",
          heading: "The standard schemes",
          body: (
            <ul className={UL}>
              <li>
                <code>https://</code>: servers SHOULD use it only when the client can fetch the
                resource directly from the web without going through the server. Otherwise, prefer
                another or a custom scheme, even if the server itself downloads the content.
              </li>
              <li>
                <code>file://</code>: resources that behave like a filesystem, which need not be a
                real disk. Directories can use a MIME type such as <code>inode/directory</code>.
              </li>
              <li><code>git://</code>: Git version-control integration.</li>
              <li>
                <strong>Custom schemes</strong> (for example <code>postgres://</code> or{" "}
                <code>crm://</code>) MUST follow RFC 3986.
              </li>
            </ul>
          ),
        },
        {
          id: "templates",
          heading: "URI templates",
          body: (
            <>
              <P>Servers list parameterised resources with <code>resources/templates/list</code>:</P>
              <Code>{`{
  "uriTemplate": "file:///{path}",
  "name": "Project Files",
  "description": "Access files in the project directory",
  "mimeType": "application/octet-stream"
}`}</Code>
              <P>Template arguments can be auto-completed through the completion API.</P>
            </>
          ),
        },
        {
          id: "errors",
          heading: "Errors",
          body: (
            <ul className={UL}>
              <li>Not found: return JSON-RPC error <code>-32602</code>. Clients SHOULD also accept the older <code>-32002</code>.</li>
              <li>Never return an empty <code>contents</code> array for a missing resource; it is ambiguous.</li>
              <li>Internal errors SHOULD use <code>-32603</code>.</li>
            </ul>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <P>
              Servers MUST validate every resource URI and MUST sanitise file paths to prevent
              directory traversal when serving <code>file://</code> resources (a request for{" "}
              <code>file:///../../etc/passwd</code> must not escape the allowed root). Access
              controls SHOULD apply to sensitive resources. See the{" "}
              <Ext href={SPEC}>resources specification</Ext>.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP specification 2026-07-28: Resources",
          url: SPEC,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Resources identified by RFC 3986 URIs; https://, file://, git:// schemes and custom-scheme rule; resource templates per RFC 6570; -32602 not found (accept -32002), -32603 internal; no empty contents for missing resources; validate URIs and prevent directory traversal.",
        },
      ]}
      faqs={[
        {
          question: "Can I invent my own URI scheme for MCP resources?",
          answer: "Yes. Custom schemes are allowed if they follow RFC 3986.",
        },
        {
          question: "When should I use https:// for a resource?",
          answer: "Only when the client can fetch it directly from the web without your server.",
        },
        {
          question: "Does file:// mean a real file on disk?",
          answer: "Not necessarily. It identifies filesystem-like resources that need not map to a physical filesystem.",
        },
        {
          question: "What error should I return for a missing resource?",
          answer: "JSON-RPC error -32602 (Invalid Params). Clients should also accept -32002 from older servers.",
        },
        {
          question: "What is a resource template?",
          answer: "A parameterised URI pattern, such as file:///{path}, following RFC 6570.",
        },
      ]}
      related={[
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary/mcp-tool-output-schema", label: "Tool outputSchema" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
