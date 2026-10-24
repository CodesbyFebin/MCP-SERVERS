import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCPServer Ecosystem | Registry, Evidence and Control Plane",
  description: "Explore MCPServer.in discovery, documentation, evidence workflows and the separately operated MCP infrastructure control plane.",
  alternates: { canonical: "/ecosystem/" },
};

const pillars = [
  { title: "Discover", description: "Browse MCP integration profiles and categories. Listings are not security certifications.", href: "/directory/", action: "Explore directory" },
  { title: "Learn", description: "Read guides for MCP transports, clients, servers and configuration.", href: "/docs/", action: "Read documentation" },
  { title: "Compare", description: "Evaluate permissions, source provenance and integration tradeoffs before connecting agents.", href: "/compare/", action: "Compare integrations" },
  { title: "Govern", description: "MCPServer OS is a separate control-plane development track. Runtime and tenant security require live qualification.", href: "https://github.com/CodesbyFebin/MCP-SERVERS", action: "Engineering source" },
];

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link href="/" className="text-sm text-emerald-400 hover:underline">← MCPServer.in</Link>
        <header className="mt-12 max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-emerald-400">One ecosystem · Evidence first</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Discover, evaluate and govern MCP integrations.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">A public knowledge and discovery layer, provenance-aware registry workflows and a separately operated infrastructure control-plane project.</p>
        </header>
        <section aria-label="MCP ecosystem capabilities" className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7">
              <h2 className="text-2xl font-medium">{item.title}</h2>
              <p className="mt-3 min-h-24 leading-7 text-slate-300">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex font-medium text-emerald-400 hover:underline">{item.action} →</Link>
            </article>
          ))}
        </section>
        <aside className="mt-12 rounded-xl border border-amber-700/40 bg-amber-950/20 p-6 text-sm leading-7 text-amber-100">
          <strong>Evidence policy:</strong> A listing, source reference or source archive does not prove a server safe to deploy. Production authorization, isolation and live verification remain separate gates.
        </aside>
      </div>
    </main>
  );
}
