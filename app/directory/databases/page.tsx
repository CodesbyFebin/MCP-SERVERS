import type { Metadata } from "next";
import { P } from "@/src/components/content/BrandMcpArticle";
import { ServerDirectory, directoryMetadata } from "@/src/components/content/ServerDirectory";

export const dynamic = "force-static";

const SLUG = "databases";
const TITLE = "Database MCP Servers: Official Options";
const DESCRIPTION =
  "Official MCP servers for databases: MongoDB, Redis, ClickHouse, Supabase, Firebase and Google's MCP Toolbox for Databases, plus how to connect a database to AI safely.";

export function generateMetadata(): Metadata {
  return directoryMetadata(SLUG, TITLE, DESCRIPTION);
}

export default function Page() {
  return (
    <ServerDirectory
      category="Database"
      slug={SLUG}
      title={TITLE}
      description={DESCRIPTION}
      reviewedAt="2026-09-23"
      directAnswer="Several database vendors publish official MCP servers: MongoDB, Redis, ClickHouse, Supabase (through its community organisation) and Firebase, and Google publishes MCP Toolbox for Databases, which fronts many databases. The PostgreSQL reference server from the MCP project has been archived. Connect with a read-only database user unless the assistant truly needs to write."
      entries={[
        { name: "MongoDB MCP Server", publisher: "MongoDB (mongodb-js)", url: "https://github.com/mongodb-js/mongodb-mcp-server", note: "Connects to MongoDB databases and MongoDB Atlas clusters. Apache-2.0." },
        { name: "Redis MCP Server", publisher: "Redis", url: "https://github.com/redis/mcp-redis", note: "Described by Redis as its official natural-language interface for managing and searching data in Redis. MIT." },
        { name: "ClickHouse MCP Server", publisher: "ClickHouse", url: "https://github.com/ClickHouse/mcp-clickhouse", note: "Connects ClickHouse to AI assistants. Apache-2.0." },
        { name: "Supabase MCP", publisher: "Supabase (supabase-community)", url: "https://github.com/supabase-community/supabase-mcp", note: "Connects Supabase projects to AI assistants. Apache-2.0." },
        { name: "Firebase MCP Server", publisher: "Google (firebase-tools)", url: "https://firebase.google.com/docs/ai-assistance/mcp-server", note: "Built into the Firebase CLI; Firestore, Realtime Database, Auth, Storage and more.", page: "/databases/firebase-mcp-server" },
        { name: "MCP Toolbox for Databases", publisher: "Google (googleapis)", url: "https://github.com/googleapis/genai-toolbox", note: "Open-source MCP server that sits in front of databases. Apache-2.0." },
      ]}
      choosing={
        <>
          <P>
            Use the vendor&apos;s server for your database where one exists. For PostgreSQL, the
            MCP project&apos;s reference server is archived; see our PostgreSQL page for current
            options.
          </P>
          <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
            <li>Create a dedicated database user with read-only rights for analysis tasks.</li>
            <li>Point assistants at a replica or staging copy, not the primary production database.</li>
            <li>Watch for queries that return huge result sets; they fill the model&apos;s context.</li>
            <li>Treat text stored in the database as untrusted input to the model.</li>
          </ul>
        </>
      }
      faqs={[
        { question: "Is there an official PostgreSQL MCP server?", answer: "The MCP project's PostgreSQL reference server is archived. Check our PostgreSQL MCP page for current options." },
        { question: "Does MongoDB have an official MCP server?", answer: "Yes, mongodb-js/mongodb-mcp-server, for MongoDB databases and Atlas clusters." },
        { question: "Can an MCP server write to my database?", answer: "Many can. Use a read-only database user unless writes are required." },
        { question: "What is MCP Toolbox for Databases?", answer: "An open-source MCP server from Google that sits in front of databases." },
        { question: "Is Supabase's server official?", answer: "It is published in the supabase-community GitHub organisation." },
      ]}
      related={[
        { href: "/servers/mcp-server-postgres", label: "PostgreSQL MCP server" },
        { href: "/databases/firebase-mcp-server", label: "Firebase MCP server" },
        { href: "/glossary/semantic-search", label: "Semantic search" },
        { href: "/directory/devops", label: "DevOps MCP servers" },
      ]}
    />
  );
}
