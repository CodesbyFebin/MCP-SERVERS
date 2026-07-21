import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { ArrowRight } from "lucide-react";
import { getAuthorBySlug, authors } from "../../../src/data/authors";
import { siteConfig } from "../../../src/data/site";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return authors.map((author) => ({
    name: author.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const author = getAuthorBySlug(name);
  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} - ${author.role} | MCPserver.in`,
    description: author.bio,
    alternates: {
      canonical: `/authors/${name}`,
      languages: {
        "en-IN": `/authors/${name}`,
        "en": `/authors/${name}`,
      }
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { name } = await params;
  const author = getAuthorBySlug(name);

  if (!author) {
    notFound();
  }

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/authors/${author.slug}#person`,
    "name": author.name,
    "jobTitle": author.role,
    "description": author.bio,
    "url": `${siteConfig.url}/authors/${author.slug}`,
    "knowsAbout": author.expertise,
    ...(author.social.github ? { "sameAs": [author.social.github, author.social.twitter, author.social.linkedin].filter(Boolean) } : {}),
    "worksFor": {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      "name": siteConfig.brand
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Authors",
        "item": `${siteConfig.url}/authors`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": author.name,
        "item": `${siteConfig.url}/authors/${author.slug}`
      }
    ]
  };

  return (
    <div id={`author-page-${author.slug}`} className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={authorSchema} />
      <SchemaJsonLd schema={breadcrumbSchema} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: "Authors", href: "/authors" },
          { name: author.name, href: `/authors/${author.slug}` }
        ]} />

        <div className="py-10 border-b border-white/6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200 mb-4">
                {author.role}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {author.name}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/58 max-w-2xl">
                {author.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {author.expertise.map((skill) => (
                  <span key={skill} className="text-xs rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 text-white/55">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {author.social.github && (
                  <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 hover:text-cyan-200">
                    GitHub
                  </a>
                )}
                {author.social.twitter && (
                  <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 hover:text-cyan-200">
                    Twitter
                  </a>
                )}
                {author.social.linkedin && (
                  <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 hover:text-cyan-200">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <h2 className="text-xl font-black text-white mb-4">Published Works</h2>
          <p className="text-xs text-white/45">
            Content authored or maintained by {author.name} is available across the MCPserver.in documentation, blog, and knowledge base.
          </p>
          <div className="mt-4">
            <a href="/docs" className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200">
              Browse Documentation <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
