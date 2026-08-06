import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Marketplace - Hosted Servers, Templates & Plugins",
  description: "Explore the MCP marketplace for hosted servers, premium templates, plugins, and enterprise solutions.",
  alternates: { canonical: "/marketplace/" },
};

export default function MarketplacePage() {
  const sections = [
    { name: "Hosted Servers", href: "/marketplace/hosted", count: 3000 },
    { name: "Premium Servers", href: "/marketplace/premium", count: 2000 },
    { name: "Templates", href: "/marketplace/templates", count: 2000 },
    { name: "Plugins", href: "/marketplace/plugins", count: 2000 },
    { name: "Extensions", href: "/marketplace/extensions", count: 1000 },
    { name: "Integrations", href: "/marketplace/integrations", count: 1000 },
    { name: "Enterprise", href: "/marketplace/enterprise", count: 500 },
    { name: "Free Tier", href: "/marketplace/free", count: 500 },
    { name: "Pricing", href: "/marketplace/pricing", count: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Marketplace</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover hosted servers, premium templates, plugins, and enterprise solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
              <p className="text-cyan-600 font-medium">{section.count.toLocaleString()} items</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
