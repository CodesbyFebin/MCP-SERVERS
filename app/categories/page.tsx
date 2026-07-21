import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Code2, CreditCard, Database, Grid2X2 } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { categories } from "../../src/data/categories";
import { servers } from "../../src/data/servers";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "MCP Server Categories - Browse by Use Case",
  description:
    "Explore MCP server categories for developer tools, databases, productivity workflows, finance systems, and enterprise AI agent infrastructure.",
  alternates: {
    canonical: "/categories",
    languages: {
    "en-IN": "/categories",
    "en": "/categories",
  },
  },
};

const icons = {
  Code: Code2,
  Database,
  Briefcase,
  CreditCard,
};

export default function CategoriesPage() {
  const schema = getUnifiedGraphSchema({
    pageUrl: "/categories",
    title: "MCP Server Categories",
    description: "Explore MCP server categories for developer tools, databases, productivity workflows, finance systems, and enterprise AI agent infrastructure.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Categories", item: "/categories" }
    ]
  });

  return (
    <div id="categories-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Categories", href: "/categories" }]} />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-violet-300/20 bg-violet-500/10">
            <Grid2X2 className="h-6 w-6 text-violet-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Browse MCP categories</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            Start from a workload category, then drill into server-level guides with auth, deployment, and security notes.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = icons[category.iconName as keyof typeof icons] ?? Grid2X2;
            const matchedServers = servers.filter((server) => server.category.toLowerCase() === category.name.toLowerCase());
            return (
              <Link
                key={category.slug}
                href={`/directory/${category.slug}`}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-300/35 hover:bg-white/[0.055]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
                    <Icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </div>
                <h2 className="mt-5 text-lg font-black text-white">{category.name}</h2>
                <p className="mt-2 min-h-14 text-xs leading-relaxed text-white/55">{category.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
                  <span className="font-bold text-violet-200">{category.count}+ indexed</span>
                  <span className="text-white/45">{matchedServers.length} guides live</span>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}
