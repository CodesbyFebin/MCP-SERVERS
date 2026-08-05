import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { frameworks } from "../../../src/data/entities";
import ContentFamilyPageTemplate from "../../../src/components/ContentFamilyPageTemplate";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return frameworks.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = frameworks.find((e) => e.slug === slug);
  if (!entity) return { title: "Not Found" };
  return {
    title: `${entity.frameworkName}: MCP Framework Guide`,
    description: entity.metaDescription,
    alternates: { canonical: `https://www.mcpserver.in${entity.route}` },
  };
}

export default async function FrameworkPage({ params }: Props) {
  const { slug } = await params;
  const entity = frameworks.find((e) => e.slug === slug);
  if (!entity) notFound();

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `${entity.frameworkName}: MCP Framework Guide`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "Frameworks", item: "/frameworks" },
      { name: entity.frameworkName, item: entity.route },
    ],
    article: {
      title: `${entity.frameworkName}: MCP Framework Guide`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  return (
    <ContentFamilyPageTemplate
      h1={`${entity.frameworkName}: Build MCP Servers with ${entity.languages.join(", ")}`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "Frameworks", href: "/frameworks" },
        { name: entity.frameworkName, href: entity.route },
      ]}
      badge="Framework Guide"
      sidebarItems={[
        { label: "Languages", value: entity.languages.join(", ") },
        { label: "Install", value: <code className="font-mono text-[10px]">{entity.installCommand}</code> },
        { label: "Built on", value: entity.builtOnSdk ? entity.builtOnSdk.replace("sdk:", "").toUpperCase() + " SDK" : "Custom" },
        ...(entity.officialRepo ? [{ label: "Repository", value: <Link href={entity.officialRepo} className="text-cyan-500 text-[10px] hover:underline">GitHub</Link> }] : []),
      ]}
      relatedLinks={[
        ...entity.relatedFrameworks.map((f) => ({ label: f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: `/frameworks/${f}/` })),
        { label: "Python MCP SDK", href: "/sdk/python/" },
        { label: "TypeScript MCP SDK", href: "/sdk/typescript/" },
      ]}
      faqs={[
        { question: `What is ${entity.frameworkName}?`, answer: entity.metaDescription },
        { question: `What languages does ${entity.frameworkName} support?`, answer: entity.languages.join(", ") },
        { question: `How do I install ${entity.frameworkName}?`, answer: entity.installCommand },
      ]}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={entity.officialDocs ? [{ label: `${entity.frameworkName} Official Documentation`, url: entity.officialDocs }] : []}
      schema={schema}
    >
      <section id="overview" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">What Is {entity.frameworkName}?</h2>
        <p className="text-sm leading-relaxed text-white/70">
          {entity.frameworkName} is a{" "}
          {entity.builtOnSdk && <><Link href={`/sdk/${entity.builtOnSdk.replace("sdk:", "")}/`} className="text-cyan-500 hover:underline">{entity.builtOnSdk.replace("sdk:", "").toUpperCase()} MCP SDK</Link>-based </>}
          framework for building <Link href="/glossary/mcp-server/" className="text-cyan-500 hover:underline">MCP servers</Link>{" "}
          in {entity.languages.join(", ")}. Its key features include: {entity.keyFeatures.join(", ")}.
        </p>
      </section>

      <section id="installation" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Installation</h2>
        <pre className="p-4 rounded-xl border bg-black text-cyan-300 border-white/5 font-mono text-[11px] overflow-x-auto">
          <code>{entity.installCommand}</code>
        </pre>
      </section>

      <section id="features" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Key Features</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
          {entity.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </section>

      <section id="next-steps" className="space-y-3">
        <h2 className="text-xl font-display font-bold text-white">Next Steps</h2>
        <ul className="space-y-2 text-sm text-white/70">
          <li>→ <Link href="/tutorials/" className="text-cyan-500 hover:underline">Browse MCP server tutorials</Link></li>
          <li>→ <Link href="/deployment/docker/" className="text-cyan-500 hover:underline">Deploy your server with Docker</Link></li>
          <li>→ <Link href="/security/authentication/" className="text-cyan-500 hover:underline">Secure your server</Link></li>
        </ul>
      </section>
    </ContentFamilyPageTemplate>
  );
}
