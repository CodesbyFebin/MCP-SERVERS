import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Clients",
  description: "MCP Clients reference and documentation.",
  alternates: { canonical: "/database/clients" },
};

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Clients</h1>
        <p className="text-xl text-gray-600 mb-8">
          MCP Clients reference and documentation.
        </p>
      </div>
    </div>
  );
}
