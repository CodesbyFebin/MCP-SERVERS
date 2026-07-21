import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { authors } from "../../src/data/authors";

export const metadata: Metadata = {
  title: "Authors - MCPserver.in",
  description: "The teams behind MCPserver.in's documentation, protocol standards, security guidance, and ecosystem research.",
  alternates: {
    canonical: "/authors",
    languages: {
      "en-IN": "/authors",
      "en": "/authors",
    }
  },
};

export default function AuthorsIndexPage() {
  return (
    <div id="authors-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Authors", href: "/authors" }]} />

        <div className="py-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Authors</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            MCPserver.in content is written and maintained by named teams, not anonymous or fabricated bylines.
            Each team owns a specific area of the site.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/30"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
                  {author.role}
                </div>
                <h2 className="mt-3 text-lg font-black text-white">{author.name}</h2>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{author.bio}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
