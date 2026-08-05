import type { Metadata } from "next";
import GeneratedContent from "../../../src/components/GeneratedContent";
import { notFound } from "next/navigation";
import { loadPageContent } from "../../../src/lib/content/content-loader";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const fs = require("fs");
  const path = require("path");
  const pagesDir = path.join(process.cwd(), "content", "pages");
  
  if (!fs.existsSync(pagesDir)) {
    return [];
  }

  const files = fs.readdirSync(pagesDir).filter((file: string) => file.endsWith(".md"));
  const params: { slug: string[] }[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    params.push({ slug: [slug] });
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const content = loadPageContent(slugPath);
  
  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/${slugPath}/`,
      languages: {
        "en-IN": `/${slugPath}/`,
        "en": `/${slugPath}/`,
      }
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const content = loadPageContent(slugPath);

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GeneratedContent content={content} />
      </div>
    </div>
  );
}
