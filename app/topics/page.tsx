import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { topics } from "../../src/data/topics";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Topics - Model Context Protocol Guides and Tutorials",
  description:
    "Explore MCP topics including architecture, clients, security, deployment, and best practices. Comprehensive guides for Model Context Protocol development.",
  alternates: {
    canonical: "/topics",
    languages: {
      "en-IN": "/topics",
      "en": "/topics",
    },
  },
};

export default function TopicsPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/topics",
    title: "MCP Topics",
    description: "Explore MCP topics including architecture, clients, security, deployment, and best practices.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Topics", item: "/topics" }
    ],
    softwareApplication: {
      name: "MCPserver.in Topics",
      description: "Comprehensive guides and tutorials for Model Context Protocol development."
    },
    itemList: topics.map((topic) => ({
      name: topic.title,
      url: `/topics/${topic.slug}`,
      description: topic.shortAnswer
    }))
  });

  const groupedTopics = topics.reduce((acc, topic) => {
    if (!acc[topic.pillar]) {
      acc[topic.pillar] = []
    }
    acc[topic.pillar].push(topic)
    return acc
  }, {} as Record<string, typeof topics>)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SchemaJsonLd schema={schema} />
        
        <Breadcrumbs items={[{ name: "Topics", href: "/topics" }]} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Topics</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive guides and tutorials on Model Context Protocol development, 
            from basics to advanced topics.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedTopics).map(([pillar, pillarTopics]) => (
            <div key={pillar}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {pillar.charAt(0).toUpperCase() + pillar.slice(1).replace(/-/g, ' ')}
                </h2>
                <p className="text-gray-600">
                  {pillarTopics.length} topics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillarTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {topic.shortAnswer}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-50 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-700 mb-6">
            Use the search to find specific MCP servers, topics, and resources across our entire knowledge base.
          </p>
          <Link
            href="/search/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Search className="w-5 h-5 mr-2" />
            Search MCPServer.in
          </Link>
        </div>
      </div>
    </div>
  );
}
