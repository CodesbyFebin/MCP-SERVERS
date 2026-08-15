import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Tutorials - Learn Model Context Protocol",
  description: "Browse MCP learning paths for server development, authentication, deployment, testing, security, performance, debugging, integrations, and migration.",
  alternates: { canonical: "/tutorials/" },
};

const tutorialCategories = [
  { name: "Getting Started", href: "/tutorials/category/getting-started/" },
  { name: "Building Servers", href: "/tutorials/category/building-servers/" },
  { name: "Authentication", href: "/tutorials/category/authentication/" },
  { name: "Deployment", href: "/tutorials/category/deployment/" },
  { name: "Testing", href: "/tutorials/category/testing/" },
  { name: "Security", href: "/tutorials/category/security/" },
  { name: "Performance", href: "/tutorials/category/performance/" },
  { name: "Debugging", href: "/tutorials/category/debugging/" },
  { name: "Best Practices", href: "/tutorials/category/best-practices/" },
  { name: "Advanced Patterns", href: "/tutorials/category/advanced-patterns/" },
  { name: "Integrations", href: "/tutorials/category/integrations/" },
  { name: "Migration", href: "/tutorials/category/migration/" },
];

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">MCP Tutorials</h1>
        <p className="mb-8 text-xl text-gray-600">
          Explore learning paths for Model Context Protocol without synthetic page-count claims.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorialCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="block rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
              <p className="mt-2 text-sm text-gray-600">Browse published resources in this learning path.</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
