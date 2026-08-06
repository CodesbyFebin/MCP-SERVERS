import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Open Source Mcp Servers",
  description: "Best Open Source Mcp Servers - curated list.",
  alternates: { canonical: "/best/open-source-mcp-servers" },
};

export default function BestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Open Source Mcp Servers</h1>
        <p className="text-xl text-gray-600 mb-8">
          Curated list of best Open Source Mcp Servers.
        </p>
      </div>
    </div>
  );
}
