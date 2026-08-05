import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Tutorials",
  description: "Learn Model Context Protocol with tutorials in mr.",
  alternates: { canonical: "/mr/tutorials" },
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Tutorials</h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn Model Context Protocol with tutorials in mr.
        </p>
      </div>
    </div>
  );
}
