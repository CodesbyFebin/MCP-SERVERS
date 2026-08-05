import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise MCP Guides",
  description: "Enterprise-grade guides for MCP architecture, security, compliance, deployment, and scaling.",
  alternates: { canonical: "/guides/" },
};

export default function GuidesPage() {
  const sections = [
    { name: "Architecture", href: "/guides/architecture", count: 2000 },
    { name: "Security", href: "/guides/security", count: 2000 },
    { name: "Compliance", href: "/guides/compliance", count: 2000 },
    { name: "Deployment", href: "/guides/deployment", count: 2000 },
    { name: "Scaling", href: "/guides/scaling", count: 1000 },
    { name: "Observability", href: "/guides/observability", count: 1000 },
    { name: "Governance", href: "/guides/governance", count: 500 },
    { name: "Best Practices", href: "/guides/best-practices", count: 500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Enterprise MCP Guides</h1>
        <p className="text-xl text-gray-600 mb-8">
          Enterprise-grade guides for architecture, security, compliance, and deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
              <p className="text-cyan-600 font-medium">{section.count.toLocaleString()} guides</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
