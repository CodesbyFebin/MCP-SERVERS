import { notFound } from "next/navigation";
import { pillars } from "../../src/data/pillars";
import PillarPageTemplate from "../../src/components/PillarPageTemplate";

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
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);

  if (!pillar) {
    notFound();
  }

  return (
    <PillarPageTemplate
      title={pillar.title}
      subtitle={pillar.subtitle}
      shortAnswer={pillar.shortAnswer}
      description={pillar.description}
      slug={pillar.slug}
      faqCluster={pillar.faqCluster}
    />
  );
}
