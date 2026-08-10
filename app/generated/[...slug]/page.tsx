import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import GeneratedContent from "../../../src/components/GeneratedContent";
import {
  getPublishedGeneratedPages,
  getGeneratedPageByRoute,
} from "../../../src/lib/content/publication-registry";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const GENERATED_ROOT = path.join(process.cwd(), "content", "generated");

function parseFrontmatter(content: string): Record<string, string> {
  const m = content.match(/^---\n([\s\S]*?)\n---\n/);
  const fm: Record<string, string> = {};
  if (!m) return fm;
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^(\w+):\s*(.+)$/);
    if (mm) fm[mm[1]] = mm[2].trim().replace(/^"|"$/g, "");
  }
  return fm;
}

function loadGeneratedByRoute(route: string): string | null {
  const r = route.replace(/^\/+|\/+$/g, "");
  const fp = path.join(GENERATED_ROOT, r, "index.md");
  return fs.existsSync(fp) ? fs.readFileSync(fp, "utf-8") : null;
}

export async function generateStaticParams() {
  return getPublishedGeneratedPages().map((p) => ({
    slug: p.route.replace(/^\/+|\/+$/g, "").split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = `/${slug.join("/").replace(/^\/+|\/+$/g, "")}/`;
  const page = getGeneratedPageByRoute(route);
  if (!page) return { title: "Not Found", robots: { index: false, follow: false } };

  const canonical = page.canonical_url.endsWith("/") ? page.canonical_url : `${page.canonical_url}/`;
  return {
    title: page.primary_entity,
    description: `MCP guide for ${page.primary_entity}. ${page.primary_keyword}.`,
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

export default async function GeneratedPage({ params }: PageProps) {
  const { slug } = await params;
  const route = `/${slug.join("/").replace(/^\/+|\/+$/g, "")}/`;
  const page = getGeneratedPageByRoute(route);
  if (!page) notFound();

  const raw = loadGeneratedByRoute(route);
  if (!raw) notFound();

  const fm = parseFrontmatter(raw);
  const body = raw
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .trim();

  const content = {
    title: fm.title || page.primary_entity,
    description: fm.description || "",
    keywords: (fm.keywords || "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((k) => k.trim().replace(/^"|"$/g, ""))
      .filter(Boolean),
    schemaType: fm.schema_types?.split(",")[0] || "WebPage",
    wordCount: parseInt(fm.word_count || "0", 10),
    content: body,
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <GeneratedContent content={content} />
    </main>
  );
}
