import type { Metadata } from "next";
import { servers } from "../../src/data/servers";
import { categories } from "../../src/data/categories";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Server Directory - 1,000+ Servers",
  description: "Browse the complete directory of Model Context Protocol servers. Find servers by category, language, transport, and more.",
  alternates: { canonical: "/servers/" },
};

export default function ServersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Server Directory</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore {servers.length}+ Model Context Protocol servers organized by category, language, and transport.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/servers/category/${category.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600">
                {category.count} servers
              </p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.slice(0, 12).map((server) => (
            <Link
              key={server.slug}
              href={`/servers/${server.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{server.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{server.category}</p>
              <p className="text-gray-500 text-sm line-clamp-2">{server.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
