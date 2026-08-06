import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Knowledge Hub - Glossary, Concepts & Learning Paths",
  description: "Knowledge base for Model Context Protocol: glossary, concepts, architecture patterns, history, and learning paths.",
  alternates: { canonical: "/knowledge/" },
};

export default function KnowledgePage() {
  const sections = [
    { name: "Glossary", href: "/knowledge/glossary", count: 1000 },
    { name: "Concepts", href: "/knowledge/concepts", count: 500 },
    { name: "Architecture", href: "/knowledge/architecture", count: 500 },
    { name: "History", href: "/knowledge/history", count: 100 },
    { name: "Patterns", href: "/knowledge/patterns", count: 500 },
    { name: "FAQ", href: "/knowledge/faq", count: 500 },
    { name: "Learning Paths", href: "/knowledge/learning-paths", count: 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Knowledge Hub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Glossary, concepts, architecture patterns, history, and learning paths for Model Context Protocol.
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
