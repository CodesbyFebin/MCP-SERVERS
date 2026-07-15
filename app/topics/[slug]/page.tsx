import type { Metadata } from "next";
import { topics } from "../../../src/data/topics";
import TopicPageTemplate from "../../../src/components/TopicPageTemplate";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) {
    return {
      title: "Topic Not Found",
    };
  }
  return {
    title: `${topic.title} - Model Context Protocol Guide`,
    description: topic.shortAnswer,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <TopicPageTemplate
      slug={topic.slug}
      title={topic.title}
      pillar={topic.pillar}
      shortAnswer={topic.shortAnswer}
      explanation={topic.explanation}
      bestPractices={topic.bestPractices}
      primaryKeyword={topic.primaryKeyword}
    />
  );
}
