import type { Metadata } from "next";
import ServerIntegrationPageTemplate from "../../../src/components/ServerIntegrationPageTemplate";
import GeneratedContent from "../../../src/components/GeneratedContent";
import { notFound } from "next/navigation";
import {
  getEvidenceSources,
  getServerPublicationProfile,
  publishedServers,
} from "../../../src/data/publishing";
import { loadServerContent } from "../../../src/lib/content/content-loader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publishedServers.map((server) => ({ slug: server.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getServerPublicationProfile(slug);
  if (!profile || profile.status !== "published") {
    return { title: "Server Integration Not Found", robots: { index: false, follow: false } };
  }
  const { server } = profile;
  const canonical = `/servers/${slug}/`;
  return {
    title: `${server.name} MCP Server Integration Guide`,
    description: `Review the ${server.name} Model Context Protocol (MCP) server profile, recorded auth model, use cases, evidence state, and setup considerations.`,
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
        "en": canonical,
        "x-default": canonical,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServerPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getServerPublicationProfile(slug);
  if (!profile || profile.status !== "published") notFound();

  const server = profile.server;
  const sources = getEvidenceSources(profile.evidence);
  const generatedContent = loadServerContent(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServerIntegrationPageTemplate
          name={server.name}
          slug={server.slug}
          category={server.category}
          description={server.description}
          auth={server.auth}
          useCases={server.useCases}
          features={server.features}
          publicationStatus={profile.status}
          verificationState={profile.verificationState}
          contentHash={profile.contract.contentHash}
          qualityScore={profile.quality.total}
          qualityNotes={profile.quality.notes}
          claims={profile.claims.map((claim) => ({ id: claim.id, text: claim.text, expiresAt: claim.expiresAt }))}
          evidence={profile.evidence.map((evidence) => ({ id: evidence.id, text: evidence.text, sourceId: evidence.sourceId, expiresAt: evidence.expiresAt }))}
          sources={sources.map((source) => ({ id: source.id, title: source.title, url: source.url, publisher: source.publisher, credibility: source.credibility }))}
        />

        <div className="mt-12">
          <GeneratedContent content={generatedContent} />
        </div>
      </div>
    </div>
  );
}
