import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentFamilyPageTemplate from "../../../src/components/ContentFamilyPageTemplate";
import { phaseADatabaseGuides } from "../../../src/data/phase-a-authority.generated";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return phaseADatabaseGuides.map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = phaseADatabaseGuides.find((item) => item.slug === slug);
  if (!entity) return { title: "Not Found" };

  return {
    title: `${entity.primaryEntity} MCP Server: Database Guide`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `${entity.primaryEntity} MCP Server: Database Guide`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

export default async function DatabaseGuidePage({ params }: Props) {
  const { slug } = await params;
  const entity = phaseADatabaseGuides.find((item) => item.slug === slug);
  if (!entity) notFound();

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `${entity.primaryEntity} MCP Server: Database Guide`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Databases", item: "/directory/databases/" },
      { name: entity.primaryEntity, item: entity.route },
    ],
    article: {
      title: `${entity.primaryEntity} MCP Server: Database Guide`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const relatedLinks = [
    ...entity.relatedDatabases.map((related) => ({
      label: `${related.replace(/-mcp-server$/, "").replace(/-/g, " ")} MCP server`,
      href: `/databases/${related}/`,
    })),
    { label: "Database category", href: "/directory/databases/" },
    { label: "MCP tools", href: "/mcp-tools/" },
    { label: "Authentication", href: "/security/authentication/" },
    { label: "Secrets management", href: "/security/secrets-management/" },
    { label: "Docker deployment", href: "/deployment/docker/" },
  ];

  return (
    <ContentFamilyPageTemplate
      h1={`${entity.primaryEntity} MCP Server: Database Guide`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Databases", href: "/directory/databases/" },
        { name: entity.primaryEntity, href: entity.route },
      ]}
      badge="Database Guide"
      sidebarItems={[
        { label: "Entity type", value: "Database MCP server" },
        { label: "Database", value: entity.primaryEntity },
        { label: "Transport", value: entity.supportedTransports.join(", ") },
        { label: "Authentication", value: entity.authMethods.join(", ") },
        { label: "Last verified", value: entity.updatedAt },
      ]}
      relatedLinks={relatedLinks}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={[
        { label: `${entity.primaryEntity} documentation`, url: entity.officialDocs },
        { label: "Model Context Protocol specification", url: "https://modelcontextprotocol.io/specification" },
      ]}
      schema={schema}
    >
      <section id="what-is" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">What Is the {entity.primaryEntity} MCP Server?</h2>
        <p className="text-sm leading-relaxed text-white/70">
          A {entity.primaryEntity} MCP server exposes carefully scoped database operations to an MCP client. Typical tools include schema discovery,
          read-only query execution, and metadata lookup. Keep production access least-privileged and avoid giving an AI-facing server broad write access
          unless a human approval step and audit logging are in place.
        </p>
      </section>

      <section id="how-it-works" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">How It Works</h2>
        <p className="text-sm leading-relaxed text-white/70">
          The host creates an MCP client connection, the database server announces its available tools, and tool calls are translated into database-driver
          operations. For local development, stdio keeps the database connector beside the client. For shared production access, use Streamable HTTP with
          authentication, TLS, and origin validation.
        </p>
      </section>

      <section id="configuration" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Configuration</h2>
        <pre className="p-4 rounded-xl border bg-black text-cyan-300 border-white/5 font-mono text-[11px] overflow-x-auto">
          <code>{`{
  "mcpServers": {
    "${entity.slug.replace(/-mcp-server$/, "")}": {
      "command": "node",
      "args": ["/absolute/path/to/${entity.slug}/server.js"],
      "env": {
        "DATABASE_URL": "read-only-connection-string"
      }
    }
  }
}`}</code>
        </pre>
        <p className="text-xs text-white/55">
          Replace the command and path with the actual server package or repository entry point documented by the maintainer.
        </p>
      </section>

      <section id="security" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Security Considerations</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
          <li>Use a read-only user for exploratory query tools.</li>
          <li>Store credentials in environment variables or a secret manager, not in the client config file.</li>
          <li>Limit query timeouts, row counts, and accessible schemas.</li>
          <li>Require human approval before any write, migration, or destructive command.</li>
          <li>Log tool calls, database user, query scope, and result size for review.</li>
        </ul>
      </section>

      <section id="testing" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Testing and Verification</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-white/70">
          <li>Start the server manually and verify it can connect using the read-only credential.</li>
          <li>Use MCP Inspector to confirm the advertised tools and resources.</li>
          <li>Run a harmless schema-listing tool before attempting any query tool.</li>
          <li>Check logs for rejected writes, timeout behavior, and authentication failures.</li>
        </ol>
      </section>

      <section id="references" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">References</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
          <li><Link className="text-cyan-400 hover:underline" href={entity.officialDocs}>{entity.primaryEntity} documentation</Link></li>
          <li><Link className="text-cyan-400 hover:underline" href="https://modelcontextprotocol.io/specification">Model Context Protocol specification</Link></li>
          <li><Link className="text-cyan-400 hover:underline" href="/security/authentication/">MCP authentication guide</Link></li>
        </ul>
      </section>
    </ContentFamilyPageTemplate>
  );
}
