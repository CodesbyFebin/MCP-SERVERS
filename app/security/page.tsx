import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Security & Compliance",
  description: "Security guides, compliance checklists, and best practices for Model Context Protocol.",
  alternates: { canonical: "/security/" },
};

export default function SecurityPage() {
  const sections = [
    { name: "Authentication", href: "/security/authentication", count: 1000 },
    { name: "Authorization", href: "/security/authorization", count: 1000 },
    { name: "Encryption", href: "/security/encryption", count: 1000 },
    { name: "Audit", href: "/security/audit", count: 500 },
    { name: "Compliance", href: "/security/compliance", count: 1000 },
    { name: "Best Practices", href: "/security/best-practices", count: 500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Security & Compliance</h1>
        <p className="text-xl text-gray-600 mb-8">
          Security guides, compliance checklists, and best practices for Model Context Protocol.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
              <p className="text-cyan-600 font-medium">{section.count.toLocaleString()} pages</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
