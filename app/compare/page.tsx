import { Suspense } from "react";
import CompareClient from "./CompareClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare MCP Server Integrations - Side-by-Side - MCPserver.in",
  description: "Select and compare two or more Model Context Protocol (MCP) server integrations side-by-side. Analyze auth methods, features, key use cases, and deployment options.",
  alternates: {
    canonical: "/compare",
    languages: {
      "en-IN": "/compare",
      "en": "/compare",
    }
  },

};

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-gray-500">Loading comparison engine...</p>
        </div>
      </div>
    }>
      <CompareClient />
    </Suspense>
  );
}
