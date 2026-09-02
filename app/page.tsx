import type { Metadata } from "next";
import Link from "next/link";
import {
  getIndexableEntries,
  getChildren,
  type RegistryEntry,
} from "@/src/content/content-registry";
import { getIndexableServers } from "@/src/content/server-registry";
import { absoluteUrl, CANONICAL_ORIGIN } from "@/src/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "MCPserver.in — MCP Server Directory, Guides & Evidence",
  description:
    "Explore Model Context Protocol servers, client setup guides, security guidance, troubleshooting and evidence-backed MCP ecosystem research.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "MCPserver.in — MCP Server Directory, Guides & Evidence",
    description:
      "Explore Model Context Protocol servers, client setup guides, security guidance, troubleshooting and evidence-backed MCP ecosystem research.",
    url: absoluteUrl("/"),
    siteName: "MCPserver.in",
    type: "website",
  },
};

interface PillarCard {
  href: string;
  title: string;
  description: string;
}

const FALLBACK_DESCRIPTION =
  "Evidence-backed research, guides, and directory for the Model Context Protocol.";

function buildPillarCards(entries: RegistryEntry[]): PillarCard[] {
  return entries
    .filter((e) => e.indexPath && e.status === "published" && !e.noindex)
    .map((e) => ({
      href: e.indexPath,
      title: e.title,
      description: e.metaDescription ?? FALLBACK_DESCRIPTION,
    }));
}

export default function Home() {
  const allIndexable = getIndexableEntries();
  const learnHub = getEntry(allIndexable, "/learn");
  const guidesHub = getEntry(allIndexable, "/guides");
  const securityHub = getEntry(allIndexable, "/security");
  const clientsHub = getEntry(allIndexable, "/clients");
  const buildHub = getEntry(allIndexable, "/build");
  const glossaryHub = getEntry(allIndexable, "/glossary");
  const evidenceEntry = getEntry(allIndexable, "/evidence");
  const methodologyEntry = getEntry(allIndexable, "/methodology");
  const troubleshootingEntry = getEntry(allIndexable, "/troubleshooting");

  const learnEntries = getChildren("learn");
  const securityEntries = getChildren("security");
  const clientEntries = getChildren("clients");
  const guideEntries = getChildren("guides");
  const buildEntries = getChildren("build");
  const glossaryEntries = getChildren("glossary");

  const indexableServers = getIndexableServers();

  const learnCards = buildPillarCards(learnEntries);
  const securityCards = buildPillarCards(securityEntries);
  const clientCards = buildPillarCards(clientEntries);
  const guideCards = buildPillarCards(guideEntries);
  const buildCards = buildPillarCards(buildEntries);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: "MCPserver.in",
      url: CANONICAL_ORIGIN,
      description:
        "Public authority for MCP server discovery with evidence-backed verification.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${CANONICAL_ORIGIN}/#website`,
      url: CANONICAL_ORIGIN,
      name: "MCPserver.in",
      publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL_ORIGIN}/#webpage`,
      url: CANONICAL_ORIGIN,
      name: "MCPserver.in — MCP Server Directory, Guides & Evidence",
      description:
        "Explore Model Context Protocol servers, client setup guides, security guidance, troubleshooting and evidence-backed MCP ecosystem research.",
      isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
      about: { "@id": `${CANONICAL_ORIGIN}/#organization` },
      inLanguage: "en",
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
          MCPserver.in — MCP Server Directory, Guides &amp; Evidence
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Public authority for Model Context Protocol discovery. Every server
          and every claim is backed by a primary-source evidence record.
        </p>
      </section>

      {/* Evidence Ledger */}
      <section aria-labelledby="evidence-heading" className="mb-12">
        <h2
          id="evidence-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Evidence Ledger
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400 max-w-3xl">
          Every entry on this site references a primary source — a registry
          query, a package listing, a specification clause, or a verified
          repository. No marketing claims, no hosting, no pricing.
        </p>
        {evidenceEntry && (
          <Link
            href={evidenceEntry.indexPath}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Browse the Evidence Ledger →
          </Link>
        )}
      </section>

      {/* 60-pillar knowledge graph summary */}
      <section aria-labelledby="graph-heading" className="mb-12">
        <h2
          id="graph-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Knowledge Graph
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400 max-w-3xl">
          {allIndexable.length} published, indexable editorial nodes across
          protocol fundamentals, guides, security, glossary, and reference
          pillars.
        </p>
        {learnHub && (
          <Link
            href={learnHub.indexPath}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Start with Learn MCP →
          </Link>
        )}
      </section>

      {/* MCP Protocol / Transport cards */}
      <section aria-labelledby="protocol-heading" className="mb-12">
        <h2
          id="protocol-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          MCP Protocol &amp; Transport
        </h2>
        <p className="mb-6 text-slate-600 dark:text-slate-400 max-w-3xl">
          The Model Context Protocol defines how clients and servers exchange
          tools, resources, and prompts over JSON-RPC. Explore the protocol
          primitives and transport choices below.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learnCards.slice(0, 3).map((card) => (
            <article
              key={card.href}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-5"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                <Link href={card.href} className="hover:underline">
                  {card.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Verified server directory preview */}
      <section aria-labelledby="servers-heading" className="mb-12">
        <h2
          id="servers-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Server Directory
        </h2>
        {indexableServers.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            Verified server entities are currently under evidence review.{" "}
            <Link
              href="/servers"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              See the directory
            </Link>{" "}
            for the latest review status.
          </p>
        ) : (
          <ul className="space-y-2">
            {indexableServers.map((server) => (
              <li key={server.slug}>
                <Link
                  href={server.indexPath}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {server.name}
                </Link>
                <span className="ml-2 text-sm text-slate-500">
                  {server.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Client guides */}
      <section aria-labelledby="clients-heading" className="mb-12">
        <h2
          id="clients-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Client Guides
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clientCards.map((card) => (
            <article
              key={card.href}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-5"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                <Link href={card.href} className="hover:underline">
                  {card.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        {clientsHub && (
          <Link
            href={clientsHub.indexPath}
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            All clients →
          </Link>
        )}
      </section>

      {/* Build guides */}
      <section aria-labelledby="build-heading" className="mb-12">
        <h2
          id="build-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Build Guides
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card) => (
            <article
              key={card.href}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-5"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                <Link href={card.href} className="hover:underline">
                  {card.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        {buildHub && (
          <Link
            href={buildHub.indexPath}
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            All build guides →
          </Link>
        )}
      </section>

      {/* Operational guides */}
      <section aria-labelledby="guides-heading" className="mb-12">
        <h2
          id="guides-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Operational Guides
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guideCards.map((card) => (
            <article
              key={card.href}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-5"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                <Link href={card.href} className="hover:underline">
                  {card.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        {guidesHub && (
          <Link
            href={guidesHub.indexPath}
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            All guides →
          </Link>
        )}
      </section>

      {/* Security */}
      <section aria-labelledby="security-heading" className="mb-12">
        <h2
          id="security-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Security
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {securityCards.map((card) => (
            <article
              key={card.href}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-5"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                <Link href={card.href} className="hover:underline">
                  {card.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        {securityHub && (
          <Link
            href={securityHub.indexPath}
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            All security research →
          </Link>
        )}
      </section>

      {/* Troubleshooting */}
      {troubleshootingEntry && (
        <section aria-labelledby="troubleshooting-heading" className="mb-12">
          <h2
            id="troubleshooting-heading"
            className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Troubleshooting
          </h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400 max-w-3xl">
            Common MCP integration failures and the verified evidence behind
            each diagnosis.
          </p>
          <Link
            href={troubleshootingEntry.indexPath}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Browse troubleshooting →
          </Link>
        </section>
      )}

      {/* Glossary */}
      {glossaryHub && (
        <section aria-labelledby="glossary-heading" className="mb-12">
          <h2
            id="glossary-heading"
            className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Glossary
          </h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400 max-w-3xl">
            Canonical definitions for MCP primitives, transports, and
            operational terminology.
          </p>
          <Link
            href={glossaryHub.indexPath}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Browse the glossary →
          </Link>
        </section>
      )}

      {/* Evidence / methodology */}
      <section aria-labelledby="methodology-heading" className="mb-12">
        <h2
          id="methodology-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Methodology
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400 max-w-3xl">
          How evidence is gathered, verified, and weighted. Every claim on
          this site is traceable to a primary source.
        </p>
        {methodologyEntry && (
          <Link
            href={methodologyEntry.indexPath}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read the methodology →
          </Link>
        )}
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mb-12">
        <h2
          id="faq-heading"
          className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4 max-w-3xl">
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">
              What is MCP?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The Model Context Protocol is an open standard for connecting
              LLM clients to data sources, tools, and prompts. See the{" "}
              {learnHub && (
                <Link
                  href={learnHub.indexPath}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn hub
                </Link>
              )}{" "}
              for the full primer.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">
              How is a server verified?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400">
              A server must have a published package, a public repository, and
              at least one verified evidence record. See{" "}
              {methodologyEntry && (
                <Link
                  href={methodologyEntry.indexPath}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Methodology
                </Link>
              )}
              .
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">
              Is this site free?
            </dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes. MCPserver.in is a public evidence authority. There is no
              hosting, no pricing, and no paid placement.
            </dd>
          </div>
        </dl>
      </section>

      {/* Authority footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-6 text-sm text-slate-500 dark:text-slate-400">
        <p>
          {allIndexable.length} published editorial nodes ·{" "}
          {indexableServers.length} verified servers · authority:{" "}
          <code>isContentIndexable()</code> &amp; <code>isServerIndexable()</code>
        </p>
      </footer>
    </>
  );
}

function getEntry(
  entries: RegistryEntry[],
  path: string,
): RegistryEntry | undefined {
  return entries.find((e) => e.indexPath === path);
}
