import type { Metadata } from "next";
import { Cpu, FileQuestion, KeyRound, Monitor, ShieldQuestion } from "lucide-react";
import { clients } from "../../src/data/entities";

const ORIGIN = "https://www.mcpserver.in";

export const metadata: Metadata = {
  title: "MCP Client Compatibility Evidence | MCPserver.in",
  description: "Track MCP client identities separately from compatibility evidence. Transport, authentication and configuration support remain unverified until primary documentation is attached.",
  alternates: { canonical: `${ORIGIN}/clients/` },
  openGraph: {
    type: "website",
    url: `${ORIGIN}/clients/`,
    title: "MCP Client Compatibility Evidence",
    description: "A compatibility catalog that distinguishes known client inventory from verified MCP support claims.",
    siteName: "MCPserver.in",
  },
};

const CLIENT_TYPE_LABELS: Record<string, string> = {
  "desktop-app": "Desktop app",
  ide: "IDE / editor",
  cli: "CLI tool",
  "web-app": "Web app",
  framework: "AI framework",
};

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_16%_12%,rgba(34,211,238,.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(124,58,237,.18),transparent_31%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-bold text-cyan-100"><Monitor className="h-3.5 w-3.5" /> Compatibility evidence catalog</div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.045em] sm:text-6xl">Known clients are not the same as verified compatibility.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
              MCPserver.in keeps client identity, vendor, transport support, authentication support and configuration evidence as separate facts. The current client seed is retained as inventory only; unsupported compatibility fields are not promoted into public claims.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <Metric value={clients.length} label="Client identities tracked" />
            <Metric value={0} label="Runtime compatibility claims published" />
            <Metric value={0} label="Synthetic compatibility proofs" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <div className="mb-7">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Inventory layer</div>
              <h2 className="mt-2 text-3xl font-black">Client candidates awaiting compatibility evidence</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/54">
                These names come from the editorial client inventory. Until official client documentation is attached, this page deliberately does not state supported transports, auth methods, config syntax, or runtime compatibility.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {clients.map((client) => (
                <article key={client.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Cpu className="h-5 w-5 text-cyan-300" />
                    <span className="rounded-full border border-amber-300/15 bg-amber-400/[0.05] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-200">Evidence pending</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black">{client.name}</h3>
                  <dl className="mt-4 space-y-2 text-xs">
                    <Row label="Vendor" value={client.vendor || "Unknown"} />
                    <Row label="Type" value={CLIENT_TYPE_LABELS[client.clientType] ?? client.clientType ?? "Unknown"} />
                    <Row label="Transport evidence" value="Not yet published" />
                    <Row label="Authentication evidence" value="Not yet published" />
                  </dl>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.025] p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-black">Compatibility evidence contract</h2>
            <div className="mt-5 space-y-4">
              <Rule icon={<FileQuestion className="h-4 w-4" />} title="Documentation" body="Attach first-party documentation that explicitly describes MCP support." />
              <Rule icon={<Monitor className="h-4 w-4" />} title="Transport" body="Record stdio or Streamable HTTP only when the client documentation supports it." />
              <Rule icon={<KeyRound className="h-4 w-4" />} title="Authentication" body="Do not infer an auth model from the server side or from another client." />
              <Rule icon={<ShieldQuestion className="h-4 w-4" />} title="Runtime state" body="Documented support must not be labelled runtime-verified without a reproducible observation." />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-3xl font-black">{value}</div><div className="mt-2 text-xs font-bold text-white/55">{label}</div></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-white/6 pb-2 last:border-0 last:pb-0"><dt className="text-white/35">{label}</dt><dd className="text-right font-semibold text-white/65">{value}</dd></div>;
}

function Rule({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return <div className="rounded-xl border border-white/8 bg-black/20 p-4"><div className="flex items-center gap-2 text-violet-300">{icon}<h3 className="text-sm font-bold text-white">{title}</h3></div><p className="mt-2 text-xs leading-5 text-white/48">{body}</p></div>;
}
