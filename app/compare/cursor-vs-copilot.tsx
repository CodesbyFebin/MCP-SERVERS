import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursor Vs Copilot - Comparison",
  description: "Compare cursor vs copilot.",
  alternates: { canonical: "/compare/cursor-vs-copilot" },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cursor Vs Copilot</h1>
        <p className="text-xl text-gray-600 mb-8">
          Compare cursor vs copilot.
        </p>
      </div>
    </div>
  );
}
