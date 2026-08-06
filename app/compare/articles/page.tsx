import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "../../../src/data/comparisons";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Comparisons - Model Context Protocol Comparisons",
  description: "Compare MCP servers, protocols, and approaches. Side-by-side analysis of features, security, performance, and use cases.",
  alternates: {
    canonical: "/compare/",
    languages: {
      "en-IN": "/compare/",
      "en": "/compare/",
    }
  },
};

export default function ComparisonArticlesPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/compare/",
    title: "MCP Comparisons",
    description: "Compare MCP servers, protocols, and approaches. Side-by-side analysis of features, security, performance, and use cases.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Comparisons", item: "/compare/" }
    ],
    softwareApplication: {
      name: "MCPserver.in Comparisons",
      description: "Side-by-side comparisons of MCP servers, protocols, and approaches."
    },
    itemList: comparisons.map((comparison) => ({
      name: comparison.title,
      url: `/compare/${comparison.slug}/`,
      description: comparison.shortAnswer
    }))
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SchemaJsonLd schema={schema} />
        
        <Breadcrumbs items={[{ name: "Comparisons", href: "/compare/" }]} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Comparisons</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Side-by-side comparisons of MCP servers, protocols, and approaches. 
            Make informed decisions with our detailed analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}/`}
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Comparison
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {comparison.title}
              </h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {comparison.shortAnswer}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  MCP vs {comparison.vs}
                </span>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-50 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Server Comparisons</h2>
          <p className="text-gray-700 mb-6">
            Explore detailed comparisons between popular MCP servers to find the best fit for your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/compare/github-mcp-server-vs-gitlab-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">GitHub vs GitLab</h3>
              <p className="text-sm text-gray-600">Version control MCP servers</p>
            </Link>
            <Link href="/compare/postgres-mcp-server-vs-mysql-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">PostgreSQL vs MySQL</h3>
              <p className="text-sm text-gray-600">Database MCP servers</p>
            </Link>
            <Link href="/compare/slack-mcp-server-vs-discord-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">Slack vs Discord</h3>
              <p className="text-sm text-gray-600">Communication MCP servers</p>
            </Link>
            <Link href="/compare/docker-mcp-server-vs-kubernetes-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">Docker vs Kubernetes</h3>
              <p className="text-sm text-gray-600">Container orchestration MCP servers</p>
            </Link>
            <Link href="/compare/vercel-mcp-server-vs-cloudflare-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">Vercel vs Cloudflare</h3>
              <p className="text-sm text-gray-600">Deployment platform MCP servers</p>
            </Link>
            <Link href="/compare/jira-mcp-server-vs-linear-mcp-server/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
              <h3 className="font-semibold text-gray-900">Jira vs Linear</h3>
              <p className="text-sm text-gray-600">Project management MCP servers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
