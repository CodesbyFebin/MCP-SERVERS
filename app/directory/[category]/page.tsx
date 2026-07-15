import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "../../../src/data/categories";
import { servers } from "../../../src/data/servers";
import ServerCard from "../../../src/components/ServerCard";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import { BookOpen, Database, ArrowLeft, Cpu, Shield } from "lucide-react";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `${category.name} MCP Servers Directory - MCPserver.in`,
    description: `Discover top ${category.name} Model Context Protocol (MCP) servers. ${category.description} Ready to deploy with sub-50ms latency.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Filter servers that belong to this category
  const matchedServers = servers.filter(
    (s) => s.category.toLowerCase() === category.name.toLowerCase()
  );

  const breadcrumbSteps = [
    { name: "Directory", href: "/mcp-server-directory" },
    { name: category.name, href: `/directory/${category.slug}` }
  ];

  const categorySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `https://mcpserver.in/directory/${category.slug}#itemlist`,
        "@type": "ItemList",
        "name": `${category.name} MCP Servers`,
        "description": category.description,
        "itemListElement": matchedServers.map((s, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `https://mcpserver.in/servers/${s.slug}`
        }))
      },
      {
        "@id": `https://mcpserver.in/directory/${category.slug}#webpage`,
        "@type": "WebPage",
        "url": `https://mcpserver.in/directory/${category.slug}`,
        "name": `${category.name} MCP Servers Directory`,
        "description": category.description,
        "isPartOf": {
          "@id": "https://mcpserver.in/#website",
          "@type": "WebSite",
          "url": "https://mcpserver.in"
        }
      }
    ]
  };

  return (
    <div id={`category-page-${category.slug}`} className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <SchemaJsonLd schema={categorySchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Back navigation */}
        <div className="mt-4">
          <Link href="/mcp-server-directory" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Server Directory
          </Link>
        </div>

        {/* Header */}
        <div className="text-center py-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tighter leading-tight">
            {category.name} MCP Servers
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            {category.description} Explore our curated catalog of production-ready Model Context Protocol integrations.
          </p>
        </div>

        {/* Results Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-xs text-white/45">
            <div>
              Showing <strong className="text-white">{matchedServers.length}</strong> integrations under {category.name}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-500" /> Stdio & SSE Transport</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-cyan-500" /> Encrypted Credentials</span>
            </div>
          </div>

          {matchedServers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {matchedServers.map((server) => (
                <ServerCard key={server.slug} server={server} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-white/[0.01] border border-white/5 max-w-lg mx-auto backdrop-blur-sm">
              <Database className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/50 font-medium">No integrations found for this category yet.</p>
            </div>
          )}
        </div>

        {/* Request Block */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/5 via-white/[0.01] to-purple-950/5 border border-white/5 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <BookOpen className="w-6 h-6 text-cyan-500 mx-auto mb-3" />
          <h3 className="text-sm sm:text-base font-display font-bold text-white">Need a custom {category.name} integration?</h3>
          <p className="text-xs text-white/50 mt-1 max-w-md mx-auto leading-relaxed">
            Suggest a new API connector or database protocol. Our team builds and certifies high-demand custom servers in under 48 hours.
          </p>
          <div className="mt-4">
            <Link
              href="/pricing"
              className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white rounded-full inline-flex items-center gap-1 transition-all"
            >
              Request Custom Server Integration
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
