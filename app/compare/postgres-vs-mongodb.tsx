import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postgres Vs Mongodb - Comparison",
  description: "Compare postgres vs mongodb.",
  alternates: { canonical: "/compare/postgres-vs-mongodb" },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Postgres Vs Mongodb</h1>
        <p className="text-xl text-gray-600 mb-8">
          Compare postgres vs mongodb.
        </p>
      </div>
    </div>
  );
}
