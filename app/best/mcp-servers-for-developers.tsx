import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Mcp Servers For Developers",
  description: "Best Mcp Servers For Developers - curated list.",
  alternates: { canonical: "/best/mcp-servers-for-developers" },
};

export default function BestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Mcp Servers For Developers</h1>
        <p className="text-xl text-gray-600 mb-8">
          Curated list of best Mcp Servers For Developers.
        </p>
      </div>
    </div>
  );
}
