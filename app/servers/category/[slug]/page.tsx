import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servers } from "../../../../src/data/servers";
import { categories } from "../../../../src/data/categories";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  
  return {
    title: `${category.name} MCP Servers`,
    description: `Browse ${category.name} MCP servers. Find the best Model Context Protocol servers for ${category.name.toLowerCase()}.`,
    alternates: { canonical: `/servers/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const categoryServers = servers.filter(s => s.category.toLowerCase().replace(/\s+/g, "-") === slug || s.category === category.name);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name} MCP Servers</h1>
        <p className="text-xl text-gray-600 mb-8">
          Browse {categoryServers.length} {category.name} MCP servers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryServers.map((server) => (
            <Link
              key={server.slug}
              href={`/servers/${server.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{server.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{server.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
