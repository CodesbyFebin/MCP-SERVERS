import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Comparisons - Server & Tool Comparisons",
  description: "Compare MCP servers, tools, and technologies. Side-by-side comparisons to help you choose.",
  alternates: { canonical: "/compare/" },
};

export default function ComparePage() {
  const comparisons = [
    { name: "PostgreSQL vs MySQL", href: "/compare/postgres-vs-mysql" },
    { name: "GitHub vs GitLab", href: "/compare/github-vs-gitlab" },
    { name: "Slack vs Discord", href: "/compare/slack-vs-discord" },
    { name: "AWS vs GCP", href: "/compare/aws-vs-gcp" },
    { name: "Claude vs ChatGPT", href: "/compare/claude-vs-chatgpt" },
    { name: "stdio vs SSE", href: "/compare/stdio-vs-sse" },
    { name: "OAuth vs JWT", href: "/compare/oauth-vs-jwt" },
    { name: "REST vs MCP", href: "/compare/rest-vs-mcp" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Comparisons</h1>
        <p className="text-xl text-gray-600 mb-8">
          Side-by-side comparisons of MCP servers, tools, and technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.name}
              href={comp.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{comp.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
