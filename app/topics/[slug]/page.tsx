import type { Metadata } from "next";
import { topics } from "../../../src/data/topics";
import TopicPageTemplate from "../../../src/components/TopicPageTemplate";
import GeneratedContent from "../../../src/components/GeneratedContent";
import { notFound } from "next/navigation";
import { loadTopicContent } from "../../../src/lib/content/content-loader";

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
    alternates: {
      canonical: `/topics/${slug}`,
      languages: {
        "en-IN": `/topics/${slug}`,
        "en": `/topics/${slug}`,
      }
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const generatedContent = loadTopicContent(slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicPageTemplate
          slug={topic.slug}
          title={topic.title}
          pillar={topic.pillar}
          shortAnswer={topic.shortAnswer}
          explanation={topic.explanation}
          bestPractices={topic.bestPractices}
          primaryKeyword={topic.primaryKeyword}
        />

        <div className="mt-12">
          <GeneratedContent content={generatedContent} />
        </div>
      </div>
    </div>
  );
}
