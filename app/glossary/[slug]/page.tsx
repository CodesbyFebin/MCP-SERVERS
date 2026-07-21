import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "../../../src/data/glossary";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import AnswerBox from "../../../src/components/AnswerBox";
import AuthorBox from "../../../src/components/AuthorBox";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getFAQSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, Tag, Info, Cpu, FileText, Quote
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) {
    return {
      title: "Term Not Found",
    };
  }
  return {
    title: `${term.term} - MCP Glossary Definition - MCPserver.in`,
    description: term.definition,
    alternates: {
      canonical: `/glossary/${slug}`,
      languages: {
        "en-IN": `/glossary/${slug}`,
        "en": `/glossary/${slug}`,
      }
    },
  };
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  const detailBreadcrumbs = [
    { name: "Glossary", href: "/glossary" },
    { name: term.term, href: `/glossary/${term.slug}` }
  ];

  const { datePublished, dateModified } = getContentDates(`glossary:${term.slug}`);

  const termSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `https://mcpserver.in/glossary/${term.slug}#definedterm`,
        "@type": "DefinedTerm",
        "name": term.term,
        "description": term.definition,
        "url": `https://mcpserver.in/glossary/${term.slug}`,
        ...(term.references && term.references.length > 0 ? { sameAs: term.references } : {}),
        "mentions": (term.keyTakeaways || []).slice(0, 5).map(kt => ({
          "@type": "Thing",
          "name": kt.replace(/^[^a-zA-Z]+/, '').slice(0, 60)
        })),
        "inDefinedTermSet": {
          "@id": "https://mcpserver.in/glossary/#termset",
          "@type": "DefinedTermSet",
          "name": "Model Context Protocol Industry Glossary",
          "url": "https://mcpserver.in/glossary"
        }
      },
      {
        "@id": `https://mcpserver.in/glossary/${term.slug}#webpage`,
        "@type": "WebPage",
        "url": `https://mcpserver.in/glossary/${term.slug}`,
        "name": `${term.term} - MCP Glossary Definition`,
        "description": term.definition,
        "isPartOf": {
          "@id": "https://mcpserver.in/#website",
          "@type": "WebSite",
          "url": "https://mcpserver.in"
        },
        "about": {
          "@id": `https://mcpserver.in/glossary/${term.slug}#definedterm`
        }
      }
    ]
  };

  const faqSchema =
    term.faqs && term.faqs.length > 0
      ? getFAQSchema(term.faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  const citeThisPage = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${term.term} - MCP Glossary Definition`,
    "author": {
      "@type": "Organization",
      "name": "MCPserver.in Engineering",
      "url": "https://mcpserver.in"
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "citation": [
      ...term.references.map(ref => ({
        "@type": "CreativeWork",
        "url": ref,
        "name": ref.replace(/^https?:\/\//, "")
      }))
    ]
  };

  return (
    <div id="glossary-detail" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <SchemaJsonLd schema={termSchema} />
      {faqSchema && <SchemaJsonLd schema={faqSchema} />}
      <SchemaJsonLd schema={citeThisPage} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={detailBreadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Title with Badges */}
            <div className="space-y-3">
              <Link href="/glossary" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline mb-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Glossary Index
              </Link>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950/40 border border-cyan-800 text-cyan-400 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Core Concept
                </span>
                {term.technicalDetails.protocolLayer && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-gray-400">
                    {term.technicalDetails.protocolLayer}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                {term.term}
              </h1>
              <p className="text-xs text-gray-500 font-mono">
                Industry Definition Set &bull; Entity Resolution Path: /glossary/{term.slug}
              </p>
            </div>

             {/* AEO/GEO Answer Box */}
             <AnswerBox 
               question={`What is the definition of ${term.term} in Model Context Protocol?`}
               answer={term.definition}
               keyTakeaways={term.keyTakeaways || [
                 `Core Function: ${term.technicalDetails.protocolLayer || "Ecosystem integration standard"}`
               ]}
             />

             {/* GEO Definitive Statement */}
             <blockquote className="geo-definitive-statement">
               <strong>Definitive Statement:</strong> {term.definition}
             </blockquote>

            {/* Comprehensive Technical Details */}
            <div className="p-6 rounded-2xl bg-gray-900/10 border border-gray-900 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Technical Context & Protocol Usage
              </h2>
              <dl className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 space-y-4 leading-relaxed">
                <div>
                  <dt className="text-xs font-semibold text-cyan-400">Detailed Explanation</dt>
                  <dd className="mt-1 text-gray-300">{term.detailedExplanation}</dd>
                </div>
                
                {term.technicalDetails.format && (
                  <div className="mt-4 p-4 rounded-xl bg-black/40 border border-gray-800 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Format & Payload Metadata</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5">
                        Format: <span className="text-cyan-400 font-mono font-semibold">{term.technicalDetails.format}</span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Latency: <span className="text-cyan-400 font-mono font-semibold">{term.technicalDetails.latencyProfile || "N/A"}</span>
                      </p>
                    </div>
                  </div>
                )}
              </dl>
            </div>

            {/* Real-World Use Case */}
            {term.useCase && (
              <blockquote className="p-6 rounded-2xl bg-indigo-950/10 border border-indigo-900/30 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Quote className="w-4 h-4" /> Real-World Implementation Use Case
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {term.useCase}
                </p>
              </blockquote>
            )}

            {/* FAQ (visible content matching the FAQPage schema above) */}
            {term.faqs && term.faqs.length > 0 && (
              <div className="p-6 rounded-2xl bg-gray-900/10 border border-gray-900 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {term.faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-xl border border-gray-900 bg-black/20 p-4">
                      <summary className="cursor-pointer list-none text-xs sm:text-sm font-bold text-white">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Author and Trust Box (EEAT) */}
            <AuthorBox
              authorName="MCPserver.in Engineering"
              authorRole="Platform Team"
              publishedDate={datePublished}
              updatedDate={dateModified}
              citations={term.references.map(ref => ({ label: ref.replace(/^https?:\/\//, ""), url: ref }))}
            />

            {/* Cite This Page */}
            <div className="p-4 rounded-xl bg-gray-900/10 border border-gray-900">
              <h3 className="text-xs font-bold text-cyan-400 mb-2">Cite This Page</h3>
              <p className="text-xs text-gray-400 mb-2">MLA Style:</p>
              <blockquote className="text-xs text-gray-300 bg-black/20 p-3 rounded border border-gray-800">
                <span className="text-cyan-400">MCPserver.in Engineering</span>. &quot;<span className="text-white">{term.term}</span>.&quot; <span className="text-cyan-400">MCPserver.in Knowledge Hub</span>, {new Date(dateModified).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}, <span className="text-cyan-400">mcpserver.in/glossary/{term.slug}</span>.
              </blockquote>
            </div>

          </div>

          {/* Sidebar with related terms */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl bg-gray-900/20 border border-gray-900/80 space-y-4">
              <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2 border-b border-gray-800 pb-2">
                <FileText className="w-4.5 h-4.5 text-cyan-400" /> Related Terms
              </h3>
              <div className="space-y-3">
                {glossaryTerms.filter((t) => t.slug !== term.slug).slice(0, 4).map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/glossary/${rt.slug}`}
                    className="block p-3 rounded-xl bg-gray-900/40 border border-gray-900 hover:border-cyan-500/30 transition-all group"
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {rt.term}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {rt.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Platform Call-To-Action */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-indigo-900/40 space-y-4">
              <h3 className="font-sans font-extrabold text-sm text-indigo-300">
                Deploy Secure MCP Clusters
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Run remote SSE Model Context Protocol servers in highly secure, fully-managed environment located inside India (Mumbai/Bengaluru).
              </p>
              <Link
                href="/profile"
                className="block text-center text-xs bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
              >
                Deploy Node Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
