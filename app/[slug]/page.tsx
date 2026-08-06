import { notFound } from "next/navigation";
import { pillars } from "../../src/data/pillars";
import PillarPageTemplate from "../../src/components/PillarPageTemplate";
import GeneratedContent from "../../src/components/GeneratedContent";
import { loadPillarContent } from "../../src/lib/content/content-loader";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return pillars
    .filter((p) => p.slug !== "what-is-mcp")
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) return {};

  return {
    title: `${pillar.title} - Model Context Protocol Hub`,
    description: pillar.shortAnswer,
    alternates: {
      canonical: `/${slug}`,
      languages: {
        "en-IN": `/${slug}`,
        "en": `/${slug}`,
      }
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);

  if (!pillar) {
    notFound();
  }

  const generatedContent = loadPillarContent(slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PillarPageTemplate
          title={pillar.title}
          subtitle={pillar.subtitle}
          shortAnswer={pillar.shortAnswer}
          description={pillar.description}
          slug={pillar.slug}
          faqCluster={pillar.faqCluster}
        />

        <div className="mt-12">
          <GeneratedContent content={generatedContent} />
        </div>
      </div>
    </div>
  );
}
