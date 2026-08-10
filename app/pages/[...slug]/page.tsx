import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import GeneratedContent from "../../../src/components/GeneratedContent";
import { notFound } from "next/navigation";
import { loadPageContent } from "../../../src/lib/content/content-loader";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

const PAGES_ROOT = path.join(process.cwd(), "content", "pages");

function isApprovedFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  const source = fs.readFileSync(filePath, "utf8");
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) return false;
  const fm = frontmatter[1];

  // Candidate/UGC pages are never public by default. Publication must be explicit.
  if (/^redirectTo:\s*/m.test(fm) || /^category:\s*["']?ugc["']?/im.test(fm)) return false;
  return /^(?:publicationState|publication_state):\s*["']?publish_approved["']?\s*$/m.test(fm)
    || /^(?:indexable|published):\s*true\s*$/im.test(fm);
}

function approvedSlugs(): string[] {
  if (!fs.existsSync(PAGES_ROOT)) return [];
  return fs.readdirSync(PAGES_ROOT)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => isApprovedFile(path.join(PAGES_ROOT, file)))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function generateStaticParams() {
  return approvedSlugs().map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const filePath = path.join(PAGES_ROOT, `${slugPath}.md`);
  const content = isApprovedFile(filePath) ? loadPageContent(slugPath) : null;

  if (!content) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const canonical = `https://mcpserver.in/pages/${slugPath.replace(/^\/+|\/+$/g, "")}/`;
  return {
    title: content.title,
    description: content.description,
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const filePath = path.join(PAGES_ROOT, `${slugPath}.md`);
  const content = isApprovedFile(filePath) ? loadPageContent(slugPath) : null;

  if (!content) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GeneratedContent content={content} />
      </div>
    </div>
  );
}
