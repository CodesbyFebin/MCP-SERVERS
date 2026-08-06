import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Scaling",
  description: "Scaling reference for Model Context Protocol.",
  alternates: { canonical: "/guides/scaling" },
};

export default function ScalingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Scaling</h1>
        <p className="text-xl text-gray-600 mb-8">
          Scaling reference for Model Context Protocol.
        </p>
      </div>
    </div>
  );
}
