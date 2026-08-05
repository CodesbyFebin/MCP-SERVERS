import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best MCP Servers & Tools - Curated Lists",
  description: "Curated lists of the best MCP servers, tools, and integrations for every use case.",
  alternates: { canonical: "/best/" },
};

export default function BestPage() {
  const collections = [
    { name: "Database MCP Servers", href: "/best/database-mcp-servers" },
    { name: "AI/ML MCP Servers", href: "/best/ai-mcp-servers" },
    { name: "DevOps MCP Servers", href: "/best/devops-mcp-servers" },
    { name: "Free MCP Servers", href: "/best/free-mcp-servers" },
    { name: "Open Source MCP Servers", href: "/best/open-source-mcp-servers" },
    { name: "Enterprise MCP Servers", href: "/best/enterprise-mcp-servers" },
    { name: "For Developers", href: "/best/mcp-servers-for-developers" },
    { name: "For Data Scientists", href: "/best/mcp-servers-for-data-scientists" },
    { name: "For DevOps", href: "/best/mcp-servers-for-devops" },
    { name: "For Startups", href: "/best/mcp-servers-for-startups" },
    { name: "Python MCP Servers", href: "/best/python-mcp-servers" },
    { name: "TypeScript MCP Servers", href: "/best/typescript-mcp-servers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Best MCP Servers & Tools</h1>
        <p className="text-xl text-gray-600 mb-8">
          Curated lists of the best MCP servers, tools, and integrations for every use case.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{collection.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
