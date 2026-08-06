import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Technology - Protocol, Transport & SDK Reference",
  description: "Technical reference for MCP protocol, transport layer, JSON-RPC, streaming, SDKs, and CLI tools.",
  alternates: { canonical: "/technology/" },
};

export default function TechnologyPage() {
  const sections = [
    { name: "Protocol", href: "/technology/protocol", count: 500 },
    { name: "Transport", href: "/technology/transport", count: 500 },
    { name: "JSON-RPC", href: "/technology/json-rpc", count: 300 },
    { name: "Streaming", href: "/technology/streaming", count: 300 },
    { name: "SDK", href: "/technology/sdk", count: 500 },
    { name: "CLI", href: "/technology/cli", count: 200 },
    { name: "Lifecycle", href: "/technology/lifecycle", count: 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Technology</h1>
        <p className="text-xl text-gray-600 mb-8">
          Technical reference for protocol, transport, JSON-RPC, streaming, SDKs, and CLI tools.
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
