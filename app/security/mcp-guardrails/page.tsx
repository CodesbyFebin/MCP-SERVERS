import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Guardrails - Security Controls & Compliance",
  description: "Learn about MCP Guardrails - configurable security policies, access controls, audit logging, and compliance verification for MCP server deployments.",
  alternates: {
    canonical: "/security/mcp-guardrails",
    languages: {
      "en-IN": "/security/mcp-guardrails",
      "en": "/security/mcp-guardrails",
    }
  },
}

export default function MpcGuardrails() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-6">MCP Guardrails</h1>
        <p className="text-gray-400">Security guardrails content will be implemented</p>
      </div>
    </div>
  )
}
