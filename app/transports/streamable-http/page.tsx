import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Streamable HTTP vs Other MCP Transports",
  description: "Compare Streamable HTTP with SSE, stdio, and other MCP transport protocols. Understand performance, compatibility, and use cases.",
  alternates: {
    canonical: "/transports/streamable-http",
    languages: {
      "en-IN": "/transports/streamable-http",
      "en": "/transports/streamable-http",
    }
  },
}

export default function StreamableHTTPComparison() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-6">Streamable HTTP vs Other MCP Transports</h1>
        <p className="text-gray-400">Comparison content will be implemented</p>
      </div>
    </div>
  )
}
