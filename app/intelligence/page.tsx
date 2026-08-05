import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Intelligence Hub - Benchmarks, Trends & Analytics",
  description: "Performance benchmarks, popularity trends, adoption metrics, and compatibility matrices for MCP.",
  alternates: { canonical: "/intelligence/" },
};

export default function IntelligencePage() {
  const sections = [
    { name: "Benchmarks", href: "/intelligence/benchmarks", count: 1000 },
    { name: "Popularity", href: "/intelligence/popularity", count: 1000 },
    { name: "Adoption", href: "/intelligence/adoption", count: 1000 },
    { name: "Trends", href: "/intelligence/trends", count: 1000 },
    { name: "Compatibility", href: "/intelligence/compatibility", count: 500 },
    { name: "Releases", href: "/intelligence/releases", count: 500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Intelligence Hub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Performance benchmarks, popularity trends, adoption metrics, and compatibility matrices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
              <p className="text-cyan-600 font-medium">{section.count.toLocaleString()} pages</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
