import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMcpArticle, Ext } from "@/src/components/content/BrandMcpArticle";
import type { EvidenceItem } from "@/src/components/content/EvidencePanel";
import type { ContentFaq } from "@/src/content/content-registry";

/**
 * A category directory of MCP servers. Every entry must point at a source the
 * reviewer actually checked (vendor repository or docs); `note` is limited to
 * what that source says.
 */
export interface DirectoryEntry {
  name: string;
  publisher: string;
  url: string;
  note: string;
  /** Optional internal page with more detail. */
  page?: string;
}

export interface ServerDirectoryProps {
  category: string;
  slug: string;
  title: string;
  description: string;
  reviewedAt: string;
  directAnswer: string;
  entries: DirectoryEntry[];
  choosing: ReactNode;
  faqs: ContentFaq[];
  related: { href: string; label: string }[];
}

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

export function directoryMetadata(slug: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `https://www.mcpserver.in/directory/${slug}` },
    robots: { index: true, follow: true },
    openGraph: { title, description, type: "article" },
  };
}

export function ServerDirectory(props: ServerDirectoryProps) {
  const evidence: EvidenceItem[] = props.entries.map((e) => ({
    source: `${e.name} (${e.publisher})`,
    url: e.url,
    type: "official",
    status: "verified",
    reviewedAt: props.reviewedAt,
    finding: e.note,
    limitations: "Listing checked for publisher and description; servers not tested.",
  }));

  return (
    <BrandMcpArticle
      slug={props.slug}
      path={`/directory/${props.slug}`}
      section={{ label: "Servers", href: "/servers" }}
      title={props.title}
      h1={`${props.category} MCP Servers`}
      description={props.description}
      reviewedAt={props.reviewedAt}
      directAnswer={props.directAnswer}
      sections={[
        {
          id: "list",
          heading: `Official ${props.category.toLowerCase()} MCP servers`,
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Server</th>
                    <th className={TH}>Published by</th>
                    <th className={TH}>What it covers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  {props.entries.map((e) => (
                    <tr key={e.url}>
                      <td className="px-4 py-2 font-medium">
                        {e.page ? (
                          <Link href={e.page} className="text-blue-600 hover:underline dark:text-blue-400">
                            {e.name}
                          </Link>
                        ) : (
                          <Ext href={e.url}>{e.name}</Ext>
                        )}
                      </td>
                      <td className="px-4 py-2">{e.publisher}</td>
                      <td className="px-4 py-2">{e.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        { id: "choosing", heading: "How to choose", body: props.choosing },
        {
          id: "method",
          heading: "How this list is built",
          body: (
            <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
              Only servers published by the vendor (or its official organisation) are listed, each
              linked to the source we checked. This is not a ranking, and we have not benchmarked
              them.
            </p>
          ),
        },
      ]}
      evidence={evidence}
      faqs={props.faqs}
      related={props.related}
    />
  );
}
