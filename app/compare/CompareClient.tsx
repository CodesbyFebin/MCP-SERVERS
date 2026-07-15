"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { servers, ServerIntegration } from "../../src/data/servers";
import { useTheme } from "../../src/components/ThemeAndAuthProvider";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scale, Plus, Trash2, Check, ArrowRight, Database, Terminal, 
  Layers, MessageSquare, Cloud, Cpu, Globe, Search, Sparkles, HelpCircle 
} from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";

export default function CompareClient() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDark = theme === "dark";

  // Parse initial selection from query params ?servers=slug1,slug2 or default to github and gitlab
  const initialSelection = useMemo(() => {
    const serversParam = searchParams.get("servers");
    if (serversParam) {
      const parsed = serversParam.split(",").filter(s => servers.some(srv => srv.slug === s));
      if (parsed.length >= 2) return parsed;
    }
    return ["github-mcp-server", "gitlab-mcp-server"];
  }, [searchParams]);

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(initialSelection);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state with URL search params when selection changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("servers", selectedSlugs.join(","));
    // Use replace to avoid polluting the browser history on every single toggle
    router.replace(`/compare/?${params.toString()}`, { scroll: false });
  }, [selectedSlugs, router]);

  // Get Server objects from slugs
  const selectedServers = useMemo(() => {
    return selectedSlugs
      .map(slug => servers.find(s => s.slug === slug))
      .filter((s): s is ServerIntegration => !!s);
  }, [selectedSlugs]);

  // Available servers to add
  const availableServers = useMemo(() => {
    return servers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const toggleServer = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      // Keep at least 2 servers for comparison
      if (selectedSlugs.length <= 2) {
        return;
      }
      setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
    } else {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const removeServer = (slug: string) => {
    if (selectedSlugs.length > 2) {
      setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
    }
  };

  const getServerIcon = (serverSlug: string) => {
    if (serverSlug.includes("github") || serverSlug.includes("gitlab")) return <Terminal className="w-5 h-5 text-purple-400" />;
    if (serverSlug.includes("postgres") || serverSlug.includes("sql") || serverSlug.includes("db") || serverSlug.includes("mongodb") || serverSlug.includes("cassandra") || serverSlug.includes("redis") || serverSlug.includes("sqlite") || serverSlug.includes("pinecone")) return <Database className="w-5 h-5 text-blue-400" />;
    if (serverSlug.includes("filesystem") || serverSlug.includes("file") || serverSlug.includes("drive") || serverSlug.includes("dropbox")) return <Layers className="w-5 h-5 text-emerald-400" />;
    if (serverSlug.includes("slack") || serverSlug.includes("discord") || serverSlug.includes("teams")) return <MessageSquare className="w-5 h-5 text-pink-400" />;
    if (serverSlug.includes("aws") || serverSlug.includes("cloud") || serverSlug.includes("google-cloud") || serverSlug.includes("azure")) return <Cloud className="w-5 h-5 text-amber-400" />;
    return <Cpu className="w-5 h-5 text-cyan-400" />;
  };

  const breadcrumbs = [
    { name: "Directory", href: "/mcp-server-directory/" },
    { name: "Compare Integrations", href: "/compare/" }
  ];

  return (
    <div className={`min-h-screen py-6 pb-20 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className={`text-center py-10 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${
            isDark 
              ? "bg-cyan-950/20 text-cyan-400 border-cyan-900/30" 
              : "bg-cyan-50 text-cyan-700 border-cyan-100"
          }`}>
            <Scale className="w-3.5 h-3.5" />
            Comparison Engine
          </div>
          <h1 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Compare MCP Server Integrations
          </h1>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            Evaluate auth methods, capabilities, use cases, and deployment limits side-by-side to choose the perfect integration for your AI agents.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left panel: selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Select Servers ({selectedSlugs.length})
              </h3>
              
              <p className="text-xs text-gray-400 mb-4">
                Choose two or more servers to view their technical parameters.
              </p>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search connectors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border transition-colors outline-none ${
                    isDark 
                      ? "bg-black/40 border-white/5 text-white focus:border-cyan-500/50" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-cyan-500/50"
                  }`}
                />
              </div>

              {/* Server List */}
              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
                {availableServers.map((server) => {
                  const isSelected = selectedSlugs.includes(server.slug);
                  return (
                    <button
                      key={server.slug}
                      onClick={() => toggleServer(server.slug)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                        isSelected 
                          ? isDark 
                            ? "bg-cyan-950/20 border border-cyan-500/30 text-cyan-400" 
                            : "bg-cyan-50 border border-cyan-100 text-cyan-700 font-medium"
                          : isDark
                            ? "border border-transparent hover:bg-white/[0.02] text-gray-300"
                            : "border border-transparent hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getServerIcon(server.slug)}
                        <span className="truncate">{server.name}</span>
                      </div>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 shrink-0 text-gray-500 hover:text-cyan-400" />
                      )}
                    </button>
                  );
                })}
                {availableServers.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-4">No servers match your search.</p>
                )}
              </div>
            </div>

            {/* Quick tips */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                Comparison Tips
              </h4>
              <ul className="space-y-2 text-xs text-gray-500 list-disc pl-4 leading-relaxed">
                <li>Examine auth methods closely to verify firewall and network compatibility.</li>
                <li>Compare features side-by-side to evaluate read vs write capabilities.</li>
                <li>Check related servers to locate potential alternative adapters.</li>
              </ul>
            </div>
          </div>

          {/* Right panel: Comparison matrix */}
          <div className="lg:col-span-3 space-y-8">
            <div className="overflow-x-auto rounded-2xl border border-white/5 shadow-2xl bg-black/20">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className={isDark ? "border-b border-white/5 bg-white/[0.02]" : "border-b border-slate-200 bg-white"}>
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider w-[180px]">Feature Matrix</th>
                    {selectedServers.map((server) => (
                      <th key={server.slug} className="p-5 w-[250px]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl border shrink-0 ${
                              isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                            }`}>
                              {getServerIcon(server.slug)}
                            </div>
                            <div>
                              <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                {server.name}
                              </h3>
                              <span className="text-[10px] text-gray-400 font-mono">{server.category}</span>
                            </div>
                          </div>
                          {selectedServers.length > 2 && (
                            <button
                              onClick={() => removeServer(server.slug)}
                              title="Remove comparison"
                              className="p-1 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200"}`}>
                  {/* Category */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Category</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs text-gray-300">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          isDark ? "bg-white/5 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {server.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Description</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs leading-relaxed text-gray-300">
                        {server.description}
                      </td>
                    ))}
                  </tr>

                  {/* Auth Methods */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Authentication</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs font-mono text-cyan-400">
                        {server.auth}
                      </td>
                    ))}
                  </tr>

                  {/* Key Use Cases */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Key Use Cases</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs text-gray-300">
                        <ul className="space-y-1.5 list-disc pl-4">
                          {server.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Supported Features */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Supported Features</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {server.features.map((feat, index) => (
                            <span 
                              key={index} 
                              className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                                isDark ? "bg-white/[0.03] text-gray-300 border border-white/5" : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Related Connectors */}
                  <tr className={isDark ? "hover:bg-white/[0.01]" : "hover:bg-slate-50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Related Pages</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs text-cyan-400">
                        <div className="flex flex-col gap-1.5">
                          {server.related.map((relSlug) => {
                            const relatedServer = servers.find(s => s.slug === relSlug);
                            return (
                              <Link 
                                key={relSlug} 
                                href={`/servers/${relSlug}/`}
                                className="hover:underline flex items-center gap-1 shrink-0"
                              >
                                {relatedServer ? relatedServer.name : relSlug.replace("-mcp-server", "")} Connector
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action row */}
                  <tr className={isDark ? "bg-white/[0.01]" : "bg-slate-100/50"}>
                    <td className="p-5 text-xs font-semibold text-gray-400">Actions</td>
                    {selectedServers.map((server) => (
                      <td key={server.slug} className="p-5 text-xs">
                        <Link
                          href={`/servers/${server.slug}/`}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-center transition-all ${
                            isDark 
                              ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" 
                              : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                        >
                          Explore Individual Connector
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Premium CTA to Main MCPserver.in Product */}
            <div className={`p-8 rounded-2xl border text-center relative overflow-hidden ${
              isDark 
                ? "bg-gradient-to-r from-cyan-950/20 via-black to-cyan-950/20 border-cyan-500/20 shadow-2xl" 
                : "bg-gradient-to-r from-cyan-50 via-white to-cyan-50 border-cyan-200 shadow-md"
            }`}>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Scale className="w-32 h-32 text-cyan-400" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 mb-2">
                  <Cloud className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Deploy any MCP Server to the Cloud in 1-Click
                </h3>
                <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Tired of running MCP servers locally? Deploy secure, isolated, enterprise-grade Model Context Protocol runtimes with permanent HTTPS endpoints on our edge server networks in India and Europe.
                </p>
                <div className="pt-2">
                  <Link
                    href="/pricing/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    Start Hosted MCP Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
