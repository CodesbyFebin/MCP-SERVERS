import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Json-Rpc",
  description: "Json-Rpc reference for Model Context Protocol.",
  alternates: { canonical: "/technology/json-rpc" },
};

export default function JsonRpcPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Json-Rpc</h1>
        <p className="text-xl text-gray-600 mb-8">
          Json-Rpc reference for Model Context Protocol.
        </p>
      </div>
    </div>
  );
}
