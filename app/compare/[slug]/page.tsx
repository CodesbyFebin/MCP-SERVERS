import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "../../../src/data/comparisons";
import { servers } from "../../../src/data/servers";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import { 
  Scale, Check, X, ShieldAlert, Award, ArrowRight, Database, 
  Terminal, Layers, MessageSquare, Cloud, Cpu, Globe 
} from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Static params for predefined comparisons
  const predefined = comparisons.map((c) => ({
    slug: c.slug,
  }));

  // Popular server-to-server comparisons to pre-compile during static export
  const popularPairings = [
    { slug: "github-mcp-server-vs-gitlab-mcp-server" },
    { slug: "postgres-mcp-server-vs-sqlite-mcp-server" },
    { slug: "slack-mcp-server-vs-discord-mcp-server" },
    { slug: "github-mcp-server-vs-postgres-mcp-server" },
  ];

  return [...predefined, ...popularPairings];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Predefined comparisons
  const comparison = comparisons.find((c) => c.slug === slug);
  if (comparison) {
    return {
      title: `${comparison.title} - MCPserver.in`,
      description: comparison.shortAnswer,
    };
  }

  // 2. Dynamic server-to-server comparisons
  if (slug.includes("-vs-")) {
    const parts = slug.split("-vs-");
    if (parts.length === 2) {
      const serverA = servers.find(s => s.slug === parts[0] || s.slug === `${parts[0]}-mcp-server`);
      const serverB = servers.find(s => s.slug === parts[1] || s.slug === `${parts[1]}-mcp-server`);
      if (serverA && serverB) {
        return {
          title: `Compare ${serverA.name} vs ${serverB.name} MCP Server Integration - MCPserver.in`,
          description: `Analyze and compare ${serverA.name} vs ${serverB.name} Model Context Protocol (MCP) integrations. View features, use cases, security controls, and authentication side-by-side.`,
        };
      }
    }
  }

  return {
    title: "Comparison Not Found",
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Check predefined conceptual comparisons
  const comparison = comparisons.find((c) => c.slug === slug);

  // 2. Check dynamic server-to-server comparisons
  let serverA = null;
  let serverB = null;

  if (!comparison && slug.includes("-vs-")) {
    const parts = slug.split("-vs-");
    if (parts.length === 2) {
      serverA = servers.find(s => s.slug === parts[0] || s.slug === `${parts[0]}-mcp-server`);
      serverB = servers.find(s => s.slug === parts[1] || s.slug === `${parts[1]}-mcp-server`);
    }
  }

  // If neither found, 404
  if (!comparison && (!serverA || !serverB)) {
    notFound();
  }

  const getServerIcon = (serverSlug: string) => {
    if (serverSlug.includes("github") || serverSlug.includes("gitlab")) return <Terminal className="w-5 h-5 text-purple-400" />;
    if (serverSlug.includes("postgres") || serverSlug.includes("sql") || serverSlug.includes("db") || serverSlug.includes("mongodb") || serverSlug.includes("cassandra") || serverSlug.includes("redis") || serverSlug.includes("sqlite")) return <Database className="w-5 h-5 text-blue-400" />;
    if (serverSlug.includes("filesystem") || serverSlug.includes("file") || serverSlug.includes("drive") || serverSlug.includes("dropbox")) return <Layers className="w-5 h-5 text-emerald-400" />;
    if (serverSlug.includes("slack") || serverSlug.includes("discord") || serverSlug.includes("teams")) return <MessageSquare className="w-5 h-5 text-pink-400" />;
    if (serverSlug.includes("aws") || serverSlug.includes("cloud") || serverSlug.includes("google-cloud") || serverSlug.includes("azure")) return <Cloud className="w-5 h-5 text-amber-400" />;
    return <Cpu className="w-5 h-5 text-cyan-400" />;
  };

  // Predefined conceptual comparison view
  if (comparison) {
    const breadcrumbSteps = [
      { name: "Compare Tools", href: "/compare/" },
      { name: `${comparison.vs} Comparison`, href: `/compare/${comparison.slug}/` }
    ];

    return (
      <div id={`compare-page-${comparison.slug}`} className="min-h-screen bg-[#050508] text-white pt-6 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={breadcrumbSteps} />

          <div className="py-10 border-b border-gray-900/40 text-center">
            <Scale className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
              {comparison.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              Examine structural trade-offs, architecture limits, and standard compliance ratings before choosing your AI integration model.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <div className="p-5 rounded-xl bg-gray-950/60 border border-cyan-500/10 text-gray-200 text-xs sm:text-sm leading-relaxed">
              <h3 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wider text-cyan-400">Architectural Summary</h3>
              <p>{comparison.shortAnswer}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              
              <div className="p-5 rounded-xl bg-gray-900/20 border border-gray-800">
                <h3 className="font-sans font-bold text-sm text-cyan-400 mb-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Model Context Protocol (MCP)
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Advantages</h4>
                    <ul className="space-y-2 text-xs">
                      {comparison.prosA.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-900">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Trade-offs</h4>
                    <ul className="space-y-2 text-xs">
                      {comparison.consA.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gray-900/10 border border-gray-900/80">
                <h3 className="font-sans font-bold text-sm text-gray-300 mb-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gray-400" />
                  {comparison.vs}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Advantages</h4>
                    <ul className="space-y-2 text-xs">
                      {comparison.prosB.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-900">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Trade-offs</h4>
                    <ul className="space-y-2 text-xs">
                      {comparison.consB.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <X className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-gray-950 via-cyan-950/5 to-gray-950 border border-cyan-900/30">
              <h3 className="font-sans font-bold text-sm text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4.5 h-4.5 text-cyan-400" />
                Architectural Verdict
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {comparison.verdict}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-950/40 border border-gray-900 text-xs flex flex-wrap gap-4 items-center justify-between">
              <span className="text-gray-500 font-medium">Other Technical Evaluations:</span>
              <div className="flex gap-4">
                {comparisons
                  .filter((c) => c.slug !== comparison.slug)
                  .map((c) => (
                    <Link key={c.slug} href={`/compare/${c.slug}/`} className="text-cyan-400 hover:underline">
                      {c.slug.replace("mcp-vs-", "").toUpperCase()} Analysis →
                    </Link>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // Dynamic Server-vs-Server comparison view
  if (serverA && serverB) {
    const breadcrumbSteps = [
      { name: "Compare Tools", href: "/compare/" },
      { name: `${serverA.name} vs ${serverB.name}`, href: `/compare/${serverA.slug}-vs-${serverB.slug}/` }
    ];

    return (
      <div className="min-h-screen bg-[#050508] text-white pt-6 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={breadcrumbSteps} />

          <div className="py-10 border-b border-gray-900/40 text-center">
            <Scale className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
              Compare {serverA.name} vs {serverB.name} MCP Server Integration
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Examine authentication schemas, features, capabilities, and concrete use cases to choose the best Model Context Protocol connector.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            
            {/* Side-by-side comparative grid */}
            <div className="overflow-x-auto rounded-2xl border border-white/5 shadow-2xl bg-black/20">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider w-[180px]">Feature Matrix</th>
                    <th className="p-5 w-[250px]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl border border-white/5 bg-white/[0.02]">
                          {getServerIcon(serverA.slug)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{serverA.name}</h3>
                          <span className="text-[10px] text-gray-400 font-mono">{serverA.category}</span>
                        </div>
                      </div>
                    </th>
                    <th className="p-5 w-[250px]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl border border-white/5 bg-white/[0.02]">
                          {getServerIcon(serverB.slug)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{serverB.name}</h3>
                          <span className="text-[10px] text-gray-400 font-mono">{serverB.category}</span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {/* Category */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Category</td>
                    <td className="p-5 text-xs text-gray-300">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-white">
                        {serverA.category}
                      </span>
                    </td>
                    <td className="p-5 text-xs text-gray-300">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-white">
                        {serverB.category}
                      </span>
                    </td>
                  </tr>

                  {/* Description */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Description</td>
                    <td className="p-5 text-xs leading-relaxed text-gray-300">{serverA.description}</td>
                    <td className="p-5 text-xs leading-relaxed text-gray-300">{serverB.description}</td>
                  </tr>

                  {/* Auth Methods */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Authentication</td>
                    <td className="p-5 text-xs font-mono text-cyan-400">{serverA.auth}</td>
                    <td className="p-5 text-xs font-mono text-cyan-400">{serverB.auth}</td>
                  </tr>

                  {/* Key Use Cases */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Key Use Cases</td>
                    <td className="p-5 text-xs text-gray-300">
                      <ul className="space-y-1.5 list-disc pl-4">
                        {serverA.useCases.map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-5 text-xs text-gray-300">
                      <ul className="space-y-1.5 list-disc pl-4">
                        {serverB.useCases.map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>

                  {/* Supported Features */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Supported Features</td>
                    <td className="p-5 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {serverA.features.map((feat, index) => (
                          <span key={index} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-gray-300 border border-white/5">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {serverB.features.map((feat, index) => (
                          <span key={index} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-gray-300 border border-white/5">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Related Connectors */}
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Related Pages</td>
                    <td className="p-5 text-xs text-cyan-400">
                      <div className="flex flex-col gap-1.5">
                        {serverA.related.map((relSlug) => {
                          const relatedServer = servers.find(s => s.slug === relSlug);
                          return (
                            <Link key={relSlug} href={`/servers/${relSlug}/`} className="hover:underline flex items-center gap-1">
                              {relatedServer ? relatedServer.name : relSlug.replace("-mcp-server", "")} Connector
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-5 text-xs text-cyan-400">
                      <div className="flex flex-col gap-1.5">
                        {serverB.related.map((relSlug) => {
                          const relatedServer = servers.find(s => s.slug === relSlug);
                          return (
                            <Link key={relSlug} href={`/servers/${relSlug}/`} className="hover:underline flex items-center gap-1">
                              {relatedServer ? relatedServer.name : relSlug.replace("-mcp-server", "")} Connector
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          );
                        })}
                      </div>
                    </td>
                  </tr>

                  {/* Action row */}
                  <tr className="bg-white/[0.01]">
                    <td className="p-5 text-xs font-semibold text-gray-400">Actions</td>
                    <td className="p-5 text-xs">
                      <Link
                        href={`/servers/${serverA.slug}/`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                      >
                        Explore {serverA.name}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                    <td className="p-5 text-xs">
                      <Link
                        href={`/servers/${serverB.slug}/`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                      >
                        Explore {serverB.name}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Direct Back link to Comparison Engine */}
            <div className="text-center">
              <Link
                href="/compare/"
                className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                ← Back to MCP Server Comparison Engine
              </Link>
            </div>

            {/* Premium CTA to Main MCPserver.in Product */}
            <div className="p-8 rounded-2xl border border-cyan-500/20 shadow-2xl bg-gradient-to-r from-cyan-950/20 via-black to-cyan-950/20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Scale className="w-32 h-32 text-cyan-400" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 mb-2">
                  <Cloud className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Deploy {serverA.name} or {serverB.name} to the Cloud in 1-Click
                </h3>
                <p className="text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed text-gray-400">
                  Deploy ultra-low latency Model Context Protocol nodes to Mumbai / Bengaluru edge regions with zero DevOps management. Securely store environment variables, configure WebSockets, and run continuous uptime health checks.
                </p>
                <div className="pt-2">
                  <Link
                    href="/pricing/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    Start Managed Hosting Trial
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return notFound();
}
