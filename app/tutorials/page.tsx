import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Tutorials - Learn Model Context Protocol",
  description: "Comprehensive tutorials for learning Model Context Protocol. From beginner guides to advanced patterns.",
  alternates: { canonical: "/tutorials/" },
};

export default function TutorialsPage() {
  const categories = [
    { name: "Getting Started", href: "/tutorials/category/getting-started", count: 500 },
    { name: "Building Servers", href: "/tutorials/category/building-servers", count: 1000 },
    { name: "Authentication", href: "/tutorials/category/authentication", count: 500 },
    { name: "Deployment", href: "/tutorials/category/deployment", count: 800 },
    { name: "Testing", href: "/tutorials/category/testing", count: 400 },
    { name: "Security", href: "/tutorials/category/security", count: 600 },
    { name: "Performance", href: "/tutorials/category/performance", count: 500 },
    { name: "Debugging", href: "/tutorials/category/debugging", count: 400 },
    { name: "Best Practices", href: "/tutorials/category/best-practices", count: 300 },
    { name: "Advanced Patterns", href: "/tutorials/category/advanced-patterns", count: 500 },
    { name: "Integrations", href: "/tutorials/category/integrations", count: 700 },
    { name: "Migration", href: "/tutorials/category/migration", count: 300 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Tutorials</h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn Model Context Protocol with our comprehensive tutorials. From beginner to advanced.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.count} tutorials</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
