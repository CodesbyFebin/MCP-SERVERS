import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu, Shield } from "lucide-react";
import { categories } from "../../../src/data/categories";
import { servers } from "../../../src/data/servers";
import { getPublishedCategorySlugs } from "../../../src/data/publishing";
import ServerCard from "../../../src/components/ServerCard";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { SITE_ORIGIN } from "../../../src/lib/canonical-urls";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const published = new Set(getPublishedCategorySlugs());
  return categories.filter((category) => published.has(category.slug)).map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  const matchedServers = category
    ? servers.filter((server) => server.category.toLowerCase() === category.name.toLowerCase())
    : [];

  if (!category || matchedServers.length === 0) {
    return {
      title: "MCP Server Category | MCPserver.in",
      robots: { index: false, follow: true },
    };
  }

  const canonical = `${SITE_ORIGIN}/directory/${category.slug}/`;
  const description = `Browse ${matchedServers.length} evidence-reviewed ${category.name} MCP server ${matchedServers.length === 1 ? "profile" : "profiles"}, with publication state and source provenance.`;

  return {
    title: `${category.name} MCP Servers — Evidence-Reviewed Directory | MCPserver.in`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "MCPserver.in",
      title: `${category.name} MCP Servers — Evidence-Reviewed Directory`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) notFound();

  const matchedServers = servers.filter(
    (server) => server.category.toLowerCase() === category.name.toLowerCase(),
  );

  if (matchedServers.length === 0) notFound();

  const canonical = `${SITE_ORIGIN}/directory/${category.slug}/`;
  const breadcrumbSteps = [
    { name: "MCP Servers", href: "/servers/" },
    { name: "Categories", href: "/categories/" },
    { name: category.name, href: `/directory/${category.slug}/` },
  ];

  const categorySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${canonical}#webpage`,
        "@type": "CollectionPage",
        url: canonical,
        name: `${category.name} MCP Servers — Evidence-Reviewed Directory`,
        description: category.description,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        mainEntity: { "@id": `${canonical}#itemlist` },
      },
      {
        "@id": `${canonical}#itemlist`,
        "@type": "ItemList",
        name: `${category.name} evidence-reviewed MCP server profiles`,
        numberOfItems: matchedServers.length,
        itemListElement: matchedServers.map((server, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_ORIGIN}/servers/${server.slug}/`,
          name: `${server.name} MCP Server`,
        })),
      },
    ],
  };

  return (
    <main id={`category-page-${category.slug}`} className="min-h-screen bg-transparent pb-16 pt-6 text-[#e0e0e0]">
      <SchemaJsonLd schema={categorySchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="mt-4">
          <Link href="/servers/" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to evidence-backed registry
          </Link>
        </div>

        <header className="relative py-10 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[80px]" />
          <h1 className="text-3xl font-bold leading-tight tracking-tighter text-white sm:text-4xl lg:text-5xl">
            {category.name} MCP Servers
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
            {category.description} Only profiles that pass the shared Evidence Ledger publication policy appear here.
          </p>
        </header>

        <section className="mt-8" aria-labelledby="category-results-heading">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4 text-xs text-white/45">
            <h2 id="category-results-heading" className="font-normal">
              <strong className="text-white">{matchedServers.length}</strong> evidence-reviewed {matchedServers.length === 1 ? "profile" : "profiles"}
            </h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-cyan-500" /> MCP profile</span>
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-emerald-400" /> Evidence reviewed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matchedServers.map((server) => <ServerCard key={server.slug} server={server} />)}
          </div>
        </section>

        <aside className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/8 bg-white/[0.02] p-7 text-center">
          <h2 className="text-base font-bold text-white">Why are some tracked entities absent?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-white/50">
            Inventory records remain outside public category listings until primary evidence supports publication. Unknown capabilities, authentication methods, versions, and compatibility are not filled with generated substitutes.
          </p>
          <Link href="/editorial-policy/" className="mt-4 inline-flex text-xs font-bold text-cyan-300 hover:text-cyan-200">
            Read the publication methodology →
          </Link>
        </aside>
      </div>
    </main>
  );
}
