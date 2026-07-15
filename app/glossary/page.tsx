"use client";

import { useState } from "react";
import Link from "next/link";
import { glossaryTerms, GlossaryTerm } from "../../src/data/glossary";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { 
  BookOpen, Search, Cpu, HelpCircle
} from "lucide-react";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group terms alphabetically for professional catalog presentation
  const groupedTerms: Record<string, GlossaryTerm[]> = {};
  filteredTerms.forEach((t) => {
    const firstLetter = t.term.charAt(0).toUpperCase();
    if (!groupedTerms[firstLetter]) {
      groupedTerms[firstLetter] = [];
    }
    groupedTerms[firstLetter].push(t);
  });

  const alphabetIndex = Object.keys(groupedTerms).sort();

  // Glossary Index set schema definition
  const indexSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://mcpserver.in/glossary/#termset",
    "name": "Model Context Protocol Industry Glossary",
    "description": "The definitive glossary of technical terms for the Model Context Protocol (MCP) ecosystem, including transport methods, communication frameworks, and integration tools.",
    "url": "https://mcpserver.in/glossary",
    "hasDefinedTerm": glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
      "url": `https://mcpserver.in/glossary/${t.slug}`
    }))
  };

  const indexBreadcrumbs = [{ name: "Glossary Index", href: "/glossary" }];

  return (
    <div id="glossary-root" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={indexSchema} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={indexBreadcrumbs} />

        <div>
          {/* Hero Section of Glossary */}
          <div className="text-center max-w-3xl mx-auto py-8 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/50 border border-cyan-800 text-cyan-400">
              AI & LLM Integration Standards
            </span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight text-white">
              Model Context Protocol <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Glossary</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Understand key communication formats, transport mechanisms, systems design patterns, and protocol primitives that govern the modern Model Context Protocol (MCP) ecosystem.
            </p>

            {/* Real-time search */}
            <div className="relative max-w-lg mx-auto mt-6">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search technical terms (e.g. JSON-RPC, SSE, Stdio)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 backdrop-blur-sm transition-all"
              />
            </div>
          </div>

          {/* Alpha Quick Jumper */}
          {alphabetIndex.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 py-4 border-y border-gray-900 my-8">
              <span className="text-xs text-gray-500 mr-2 uppercase tracking-wider font-semibold">Jump to:</span>
              {alphabetIndex.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-7 h-7 flex items-center justify-center rounded bg-gray-900/50 border border-gray-900 hover:border-cyan-500/40 hover:text-cyan-400 text-xs text-gray-400 font-sans font-bold transition-all"
                >
                  {letter}
                </a>
              ))}
            </div>
          )}

          {/* Glossary Catalog */}
          <div className="mt-8 space-y-12">
            {alphabetIndex.length === 0 ? (
              <div className="text-center py-12 bg-gray-900/10 rounded-2xl border border-gray-900">
                <HelpCircle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-xs sm:text-sm">No technical terms match your active search filter.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs text-cyan-400 font-semibold hover:underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              alphabetIndex.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                      {letter}
                    </h2>
                    <div className="h-[1px] flex-grow bg-gray-900"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedTerms[letter].map((termItem) => (
                      <Link
                        key={termItem.slug}
                        href={`/glossary/${termItem.slug}`}
                        className="p-5 rounded-2xl bg-gray-900/10 border border-gray-900 hover:border-cyan-500/30 backdrop-blur-sm shadow-sm transition-all hover:shadow-cyan-950/10 group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {termItem.term}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {termItem.definition}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-cyan-400/80 mt-4 font-bold group-hover:text-cyan-300">
                          Learn more <Cpu className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
