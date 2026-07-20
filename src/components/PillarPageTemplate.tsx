"use client";

import Link from "next/link";
import { useTheme } from "./ThemeAndAuthProvider";
import { getFaqsForPage } from "../data/faqs";
import { getRelatedLinks } from "../lib/internalLinks";
import { getUnifiedGraphSchema } from "../lib/schema";
import { topics } from "../data/topics";
import { servers } from "../data/servers";
import Breadcrumbs from "./Breadcrumbs";
import FAQ from "./FAQ";
import SchemaJsonLd from "./SchemaJsonLd";
import RelatedPages from "./RelatedPages";
import AnswerBox from "./AnswerBox";
import AuthorBox from "./AuthorBox";
import { 
  BookOpen, Layers, ShieldCheck, Settings, AlertTriangle, 
  HelpCircle, ArrowRight, Zap, CheckCircle, Terminal, Database, Cpu, Globe, MessageSquare, Cloud
} from "lucide-react";

export interface PillarPageTemplateProps {
  title: string;
  subtitle: string;
  shortAnswer: string;
  description: string;
  slug: string;
  faqCluster: string;
}

export default function PillarPageTemplate({
  title,
  subtitle,
  shortAnswer,
  description,
  slug,
  faqCluster
}: PillarPageTemplateProps) {
  const { theme } = useTheme();
  const faqs = getFaqsForPage(slug, title);
  const relatedLinks = getRelatedLinks(slug, "pillar");

  const breadcrumbSteps = [{ name: title, href: `/${slug}` }];
  
  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: `/${slug}`,
    title: `${title} - Model Context Protocol Hub`,
    description: shortAnswer,
    breadcrumbs: breadcrumbSteps.map(step => ({ name: step.name, item: step.href })),
    faq: faqs,
    article: {
      title: title,
      description: shortAnswer,
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: "2025-11-05",
      dateModified: "2026-07-09"
    }
  });

  const isDark = theme === "dark";

  // Filter sub-topics relevant to this pillar
  const relatedTopics = topics.filter(t => t.pillar === slug || t.pillar === slug.replace('mcp-', '')) || topics.filter(t => true);

  // Curate popular server integrations relevant to this pillar's core theme
  const getServersForPillar = (pillarSlug: string) => {
    let matchedSlugs: string[] = [];
    switch (pillarSlug) {
      case "mcp-server-pricing-india":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "stripe-mcp-server", "aws-mcp-server"];
        break;
      case "mcp-server-performance-latency":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "filesystem-mcp-server", "docker-mcp-server"];
        break;
      case "dppd-data-compliance":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "filesystem-mcp-server", "sentry-mcp-server"];
        break;
      case "mcp-vs-rest-graphql":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "slack-mcp-server", "aws-mcp-server"];
        break;
      case "mcp-deployment-hosting":
        matchedSlugs = ["vercel-mcp-server", "aws-mcp-server", "railway-mcp-server", "fly-io-mcp-server"];
        break;
      case "mcp-industry-startups":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "slack-mcp-server", "filesystem-mcp-server"];
        break;
      case "mcp-industry-fintech":
        matchedSlugs = ["razorpay-mcp-server", "stripe-mcp-server", "supabase-mcp-server", "aws-mcp-server"];
        break;
      case "mcp-industry-ecommerce":
        matchedSlugs = ["amazon-in-mcp", "shopify-mcp-server", "postgres-mcp-server", "stripe-mcp-server"];
        break;
      case "mcp-industry-government-education":
        matchedSlugs = ["filesystem-mcp-server", "postgres-mcp-server", "slack-mcp-server", "github-mcp-server"];
        break;
      case "mcp-monitoring-security-observability":
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "filesystem-mcp-server", "sentry-mcp-server"];
        break;
      default:
        matchedSlugs = ["github-mcp-server", "postgres-mcp-server", "slack-mcp-server"];
    }
    return servers.filter(s => matchedSlugs.includes(s.slug));
  };

  const relatedServers = getServersForPillar(slug);

  const getServerIcon = (serverSlug: string) => {
    if (serverSlug.includes("github") || serverSlug.includes("gitlab")) return <Terminal className="w-5 h-5 text-purple-400" />;
    if (serverSlug.includes("postgres") || serverSlug.includes("sql") || serverSlug.includes("db") || serverSlug.includes("mongodb") || serverSlug.includes("cassandra") || serverSlug.includes("redis")) return <Database className="w-5 h-5 text-blue-400" />;
    if (serverSlug.includes("filesystem") || serverSlug.includes("file") || serverSlug.includes("drive") || serverSlug.includes("dropbox")) return <Layers className="w-5 h-5 text-emerald-400" />;
    if (serverSlug.includes("slack") || serverSlug.includes("discord") || serverSlug.includes("teams")) return <MessageSquare className="w-5 h-5 text-pink-400" />;
    if (serverSlug.includes("aws") || serverSlug.includes("cloud") || serverSlug.includes("google-cloud") || serverSlug.includes("azure")) return <Cloud className="w-5 h-5 text-amber-400" />;
    return <Cpu className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      {/* Unified JSON-LD Connected Graph Schema */}
      <SchemaJsonLd schema={unifiedGraphSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Hero Section */}
        <div className={`py-10 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${
            isDark 
              ? "bg-cyan-950/20 text-cyan-400 border-cyan-900/30" 
              : "bg-cyan-50 text-cyan-700 border-cyan-100"
          }`}>
            <BookOpen className="w-3.5 h-3.5" />
            MCP Pillar Resource Hub
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h1>
          <p className={`mt-4 text-sm sm:text-base max-w-3xl leading-relaxed ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Direct Answer (AEO / GEO optimized) */}
            <AnswerBox
              question={`What is the core meaning and value of ${title}?`}
              answer={shortAnswer}
              keyTakeaways={[
                "Standardized JSON-RPC 2.0 communication format",
                "Compatible with Claude Desktop, Cursor, and other MCP-speaking clients",
                "Replaces one-off API integrations with a single client-server interface"
              ]}
            />

            {/* 2. How it works */}
            <section id="how-it-works" className="space-y-3">
              <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                2. How It Works
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                {description}
              </p>
              <div className={`p-5 rounded-2xl border ${
                isDark ? "bg-black/40 border-white/5" : "bg-white border-slate-200"
              }`}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Client Discovery</h4>
                      <p className={`text-xs mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}>Client queries the local/remote MCP server capabilities via standard JSON-RPC handshake.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Schema Mapping</h4>
                      <p className={`text-xs mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}>Exposed resources, tools, and templates are dynamically validated against standardized schemas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. When to use it */}
            <section id="when-to-use" className="space-y-3">
              <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                3. When to Use It
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                This standard protocol should be implemented whenever an application requires:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
                <li>Real-time database queries prompted dynamically by user conversations.</li>
                <li>Secure interaction with private enterprise repositories (GitHub, GitLab).</li>
                <li>Dynamic tool call structures that avoid hardcoded server routes.</li>
              </ul>
            </section>

            {/* 4. Architecture */}
            <section id="architecture" className="space-y-3">
              <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                4. Connection Architecture
              </h2>
              <div className={`p-5 rounded-2xl border ${
                isDark ? "bg-black/30 border-white/5" : "bg-white border-slate-200"
              }`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                  isDark ? "text-cyan-400" : "text-cyan-700"
                }`}>
                  <Layers className="w-4 h-4" />
                  Standard Protocol Stack Flow
                </h3>
                <ol className={`space-y-3 list-decimal pl-5 text-xs ${isDark ? "text-white/65" : "text-slate-600"}`}>
                  <li><strong>Transport Protocol:</strong> Configurable Stdio pipeline or Server-Sent Events (SSE).</li>
                  <li><strong>RPC Layer:</strong> 100% compliant JSON-RPC 2.0 message parsing.</li>
                  <li><strong>Validation Layer:</strong> Strict JSON-Schema constraints check for error-free queries.</li>
                </ol>
              </div>
            </section>

            {/* 5. Setup */}
            <section id="setup" className="space-y-3">
              <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                5. Standard Setup Instructions
              </h2>
              <div className={`p-5 rounded-2xl border ${
                isDark ? "bg-black/40 border-white/5 text-cyan-300" : "bg-slate-100 border-slate-200 text-slate-700"
              } font-mono text-[11px] overflow-x-auto`}>
                <p className="text-emerald-500"># Install the official MCP SDK</p>
                <p className="mb-2">npm install @modelcontextprotocol/sdk</p>
                <p className="text-emerald-500"># Configure server inside Claude Desktop config</p>
                <p>{`{\n  "mcpServers": {\n    "my-server": {\n      "command": "node",\n      "args": ["dist/index.js"]\n    }\n  }\n}`}</p>
              </div>
            </section>

            {/* 6. Security */}
            <section id="security" className={`p-6 rounded-2xl border ${
              isDark ? "bg-red-950/10 border-red-900/20" : "bg-red-50 border-red-100 text-slate-800"
            }`}>
              <h3 className="font-display font-bold text-red-500 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                6. Security & Isolation Controls
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Because MCP servers run locally or inside hosted cloud environments, they have direct code execution abilities. Always constrain environments, rotate keys, use secure SSE paths, and authorize write operations.
              </p>
            </section>

            {/* 7. Best Practices */}
            <section id="best-practices" className="space-y-3">
              <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                7. Engineering Best Practices
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
                  <h4 className={`text-xs font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Keep Schemas Minimal</h4>
                  <p className={`text-[11px] ${isDark ? "text-white/50" : "text-slate-500"}`}>Avoid deeply nested structures so LLMs can map parameters accurately.</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200"}`}>
                  <h4 className={`text-xs font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Stderr Logging</h4>
                  <p className={`text-[11px] ${isDark ? "text-white/50" : "text-slate-500"}`}>Always log debugging outputs to stderr, keeping stdout clean for JSON-RPC messages.</p>
                </div>
              </div>
            </section>

            {/* 8. Common Mistakes */}
            <section id="common-mistakes" className={`p-4 rounded-xl border flex gap-3 ${
              isDark ? "bg-amber-950/10 border-amber-900/20 text-amber-300" : "bg-amber-50 border-amber-100 text-amber-800"
            }`}>
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="block mb-1">Common Configuration Pitfall</strong>
                Hardcoding private API keys inside the server configuration blocks. Instead, pass credentials dynamically via system environment variables.
              </div>
            </section>

            {/* Related Topics Section */}
            {relatedTopics.length > 0 && (
              <section id="related-topics" className="space-y-4 pt-4">
                <h2 id="related-topics-title" className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                  Related Topics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTopics.map((topic) => (
                    <Link 
                      key={topic.slug}
                      href={`/topics/${topic.slug}/`}
                      className={`group block p-5 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                          : "bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isDark ? "bg-cyan-950/40 text-cyan-400" : "bg-cyan-50 text-cyan-700"
                          }`}>
                            {topic.intent}
                          </span>
                          <h3 className={`text-sm font-semibold leading-tight group-hover:text-cyan-400 transition-colors ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}>
                            {topic.title}
                          </h3>
                          <p className={`text-xs line-clamp-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
                            {topic.shortAnswer}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0 mt-1 ml-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Supported Integrations Section */}
            {relatedServers.length > 0 && (
              <section id="supported-integrations" className="space-y-4 pt-4">
                <h2 id="supported-integrations-title" className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                  Supported Integrations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedServers.map((server) => (
                    <Link 
                      key={server.slug}
                      href={`/servers/${server.slug}/`}
                      className={`group block p-5 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                          : "bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl border shrink-0 ${
                          isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                        }`}>
                          {getServerIcon(server.slug)}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-sm font-semibold truncate group-hover:text-cyan-400 transition-colors ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}>
                              {server.name}
                            </h3>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 transition-all shrink-0 ml-1" />
                          </div>
                          <span className={`inline-block text-[10px] font-medium text-gray-400`}>
                            {server.category}
                          </span>
                          <p className={`text-xs line-clamp-2 mt-1 leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                            {server.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Author Attribution & Sources (EEAT) */}
            <AuthorBox
              authorName="MCPserver.in Engineering"
              authorRole="Platform Team"
              publishedDate="2025-11-05"
              updatedDate="2026-07-09"
              citations={[
                { label: "Model Context Protocol Specification v1.0", url: "https://spec.modelcontextprotocol.io" },
                { label: "Anthropic MCP Core Specification GitHub Docs", url: "https://github.com/modelcontextprotocol" }
              ]}
            />

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`font-display font-bold text-sm mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                Deploy Node Globally
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-white/55" : "text-slate-500"}`}>
                Deploy ultra-low latency Model Context Protocol nodes to Mumbai / Bengaluru edge clusters with zero DevOps management.
              </p>
              <Link
                href="/pricing"
                className="block text-center w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black rounded-lg shadow-md transition-all"
              >
                Start Managed Hosting
              </Link>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                Platform Features
              </h4>
              <ul className={`space-y-2 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Standard JSON-RPC handshake
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Secure isolated Sandbox
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual FAQ */}
        <div className={`mt-16 pt-8 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <FAQ items={faqs} title={`${title} - FAQs`} />
        </div>

        {/* Related Pages Section */}
        <RelatedPages links={relatedLinks} />
      </div>
    </div>
  );
}
