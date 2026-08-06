import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Authentication",
  description: "MCP Authentication reference and documentation.",
  alternates: { canonical: "/database/authentication" },
};

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-xl text-gray-600 mb-8">
          MCP Authentication reference and documentation.
        </p>
      </div>
    </div>
  );
}
