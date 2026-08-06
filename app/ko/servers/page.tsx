import type { Metadata } from "next";
import { servers } from "../../../src/data/servers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Server Directory",
  description: "Browse MCP servers in ko.",
  alternates: { canonical: "/ko/servers" },
};

export default function ServersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Servers</h1>
        <p className="text-xl text-gray-600 mb-8">
          Browse {servers.length}+ MCP servers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.slice(0, 12).map((server) => (
            <Link key={server.slug} href={`/servers/${server.slug}`} className="block p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{server.name}</h3>
              <p className="text-gray-500 text-sm">{server.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
