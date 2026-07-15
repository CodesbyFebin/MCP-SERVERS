"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { servers } from "../../src/data/servers";
import { categories } from "../../src/data/categories";
import ServerCard from "../../src/components/ServerCard";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { Search, Database, Cpu, BookOpen, Shield } from "lucide-react";

export default function DirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredServers = useMemo(() => {
    return servers.filter((server) => {
      const matchesSearch =
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCat === "all") {
        return matchesSearch;
      }
      const categorySlug = selectedCat.replace("-", " ").toLowerCase();
      return matchesSearch && server.category.toLowerCase() === categorySlug;
    });
  }, [searchQuery, selectedCat]);

  const breadcrumbSteps = [{ name: "Directory", href: "/mcp-server-directory/" }];

  return (
    <div id="directory-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Directory Header */}
        <div className="text-center py-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tighter leading-tight">
            MCP Server Directory
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            Explore our curated catalog of 100+ verified Model Context Protocol integrations for databases, web APIs, developers tools, and enterprise productivity SaaS.
          </p>
        </div>

        {/* Search and Category Tabs */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md max-w-4xl mx-auto shadow-xl">
          
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
            <input
              id="directory-search-input"
              type="text"
              placeholder="Search 100+ integrations (e.g., Postgres, GitHub, Playwright)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 focus:border-cyan-500 rounded-xl text-xs sm:text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-white/30"
            />
          </div>

          {/* Category Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedCat === "all"
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/5"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCat === cat.slug
                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/5"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Server List Results Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-xs text-white/45">
            <div>
              Showing <strong className="text-white">{filteredServers.length}</strong> integrations
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-500" /> Stdio & SSE Transport</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-cyan-500" /> Encrypted Credentials</span>
            </div>
          </div>

          {filteredServers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServers.map((server) => (
                <ServerCard key={server.slug} server={server} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-white/[0.01] border border-white/5 max-w-lg mx-auto backdrop-blur-sm">
              <Database className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/50 font-medium">No integrations found matching your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCat("all");
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Directory FAQ/Help guide promotion */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/5 via-white/[0.01] to-purple-950/5 border border-white/5 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <BookOpen className="w-6 h-6 text-cyan-500 mx-auto mb-3 animate-pulse" />
          <h3 className="text-sm sm:text-base font-display font-bold text-white">Can't find the integration you need?</h3>
          <p className="text-xs text-white/50 mt-1 max-w-md mx-auto leading-relaxed">
            Suggest a new API connector or database protocol. Our open-source team builds and certifies high-demand custom servers in under 48 hours.
          </p>
          <div className="mt-4">
            <Link
              href="/pricing/"
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
