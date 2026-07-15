import { Suspense } from "react";
import DirectoryClient from "./DirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory - Explore 100+ Integrations - MCPserver.in",
  description: "Browse the curated directory of Model Context Protocol (MCP) servers. Integrate databases, web APIs, developer tools, and SaaS platforms side-by-side.",
};

export default function DirectoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-gray-500">Loading directory...</p>
        </div>
      </div>
    }>
      <DirectoryClient />
    </Suspense>
  );
}

