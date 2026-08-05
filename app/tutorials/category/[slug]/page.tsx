import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "getting-started" },
    { slug: "building-servers" },
    { slug: "authentication" },
    { slug: "deployment" },
    { slug: "testing" },
    { slug: "security" },
    { slug: "performance" },
    { slug: "debugging" },
    { slug: "best-practices" },
    { slug: "advanced-patterns" },
    { slug: "integrations" },
    { slug: "migration" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} Tutorials`,
    description: `Learn ${slug.replace(/-/g, " ")} with comprehensive MCP tutorials.`,
    alternates: { canonical: `/tutorials/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} Tutorials
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Comprehensive tutorials for {slug.replace(/-/g, " ")}.
        </p>
      </div>
    </div>
  );
}
