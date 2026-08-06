import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bestLists } from "../../../src/data/entities";
import { servers } from "../../../src/data/servers";
import BestListPageTemplate from "../../../src/components/templates/BestListPageTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bestLists.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = bestLists.find((e) => e.slug === slug);
  if (!entity) return { title: "Not Found" };
  return {
    title: `${entity.name} in ${entity.year}`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
    openGraph: {
      title: `${entity.name} in ${entity.year}`,
      description: entity.metaDescription,
      url: `https://www.mcpserver.in${entity.route}`,
      type: "article",
    },
  };
}

export default async function BestListPage({ params }: Props) {
  const { slug } = await params;
  const entity = bestLists.find((e) => e.slug === slug);
  if (!entity) notFound();

  // Resolve server slugs to data, falling back gracefully for missing entries
  const items = entity.serverSlugs
    .map((serverSlug) => servers.find((s) => s.slug === serverSlug))
    .filter(Boolean)
    .map((s) => ({
      slug: s!.slug,
      name: s!.name,
      description: s!.description,
      category: s!.category,
      auth: s!.auth,
      features: s!.features,
    }));

  return (
    <BestListPageTemplate
      entity={entity}
      items={items}
      faqItems={[
        { question: `What are the best MCP servers for ${entity.useCase.toLowerCase()}?`, answer: `Our top picks are: ${items.slice(0, 3).map((s) => s.name).join(", ")}. See the full ranked list above.` },
        { question: "How are these MCP servers selected?", answer: entity.methodology },
        { question: "When was this list last updated?", answer: `Last updated: ${entity.updatedAt}. We refresh best-of lists every 60 days or when a significant SDK or protocol release occurs.` },
      ]}
    />
  );
}
