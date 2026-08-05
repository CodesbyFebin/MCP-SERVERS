import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Database - Protocol Reference",
  description: "Complete reference for Model Context Protocol objects: tools, resources, prompts, schemas, and SDKs.",
  alternates: { canonical: "/database/" },
};

export default function DatabasePage() {
  const sections = [
    { name: "Tools", href: "/database/tools", count: 5000, description: "MCP tools reference and documentation" },
    { name: "Resources", href: "/database/resources", count: 3000, description: "MCP resources reference" },
    { name: "Prompts", href: "/database/prompts", count: 2000, description: "MCP prompts library" },
    { name: "Schemas", href: "/database/schemas", count: 2000, description: "JSON schemas for MCP objects" },
    { name: "SDKs", href: "/database/sdks", count: 2000, description: "MCP SDK documentation" },
    { name: "Clients", href: "/database/clients", count: 2000, description: "MCP client implementations" },
    { name: "Hosts", href: "/database/hosts", count: 1000, description: "MCP host applications" },
    { name: "Transports", href: "/database/transports", count: 1000, description: "Transport protocols" },
    { name: "Authentication", href: "/database/authentication", count: 2000, description: "Authentication methods" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Database</h1>
        <p className="text-xl text-gray-600 mb-8">
          Complete reference for Model Context Protocol objects, tools, resources, and SDKs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{section.description}</p>
              <p className="text-cyan-600 font-medium">{section.count.toLocaleString()} entries</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
