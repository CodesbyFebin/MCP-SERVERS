import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Braces,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  Github,
  Globe2,
  Grid2X2,
  Layers3,
  LockKeyhole,
  MessageSquare,
  MonitorUp,
  Network,
  PlugZap,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Workflow,
  Zap
} from "lucide-react";

type Accent = "cyan" | "violet" | "pink" | "green" | "amber" | "blue";

const accentText: Record<Accent, string> = {
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  pink: "text-fuchsia-300",
  green: "text-emerald-300",
  amber: "text-amber-300",
  blue: "text-blue-300"
};

const accentBg: Record<Accent, string> = {
  cyan: "bg-cyan-500/10 border-cyan-400/20",
  violet: "bg-violet-500/10 border-violet-400/20",
  pink: "bg-fuchsia-500/10 border-fuchsia-400/20",
  green: "bg-emerald-500/10 border-emerald-400/20",
  amber: "bg-amber-500/10 border-amber-400/20",
  blue: "bg-blue-500/10 border-blue-400/20"
};

export const logos = [
  { name: "Claude", short: "Cl", accent: "amber" as Accent },
  { name: "OpenAI", short: "OA", accent: "green" as Accent },
  { name: "Cursor", short: "Cu", accent: "blue" as Accent },
  { name: "Windsurf", short: "Ws", accent: "cyan" as Accent },
  { name: "Cline", short: "Ci", accent: "violet" as Accent },
  { name: "Replit", short: "Re", accent: "amber" as Accent },
  { name: "Vercel", short: "Ve", accent: "blue" as Accent },
  { name: "AWS", short: "AWS", accent: "amber" as Accent },
  { name: "Google", short: "G", accent: "cyan" as Accent },
  { name: "Microsoft", short: "MS", accent: "green" as Accent }
];

export const integrations = [
  { name: "GitHub", short: "GH", accent: "blue" as Accent, icon: Github },
  { name: "Slack", short: "SL", accent: "pink" as Accent, icon: MessageSquare },
  { name: "Notion", short: "NO", accent: "violet" as Accent, icon: Braces },
  { name: "Google Drive", short: "GD", accent: "green" as Accent, icon: Cloud },
  { name: "Gmail", short: "GM", accent: "amber" as Accent, icon: MessageSquare },
  { name: "PostgreSQL", short: "PG", accent: "blue" as Accent, icon: Database },
  { name: "MongoDB", short: "MO", accent: "green" as Accent, icon: Database },
  { name: "Docker", short: "DK", accent: "cyan" as Accent, icon: Boxes },
  { name: "AWS", short: "AWS", accent: "amber" as Accent, icon: Cloud },
  { name: "Stripe", short: "ST", accent: "violet" as Accent, icon: PlugZap },
  { name: "Shopify", short: "SH", accent: "green" as Accent, icon: Server },
  { name: "Figma", short: "FG", accent: "pink" as Accent, icon: Grid2X2 }
];

export const stats = [
  ["10,000+", "MCP Servers"],
  ["500,000+", "Deployments"],
  ["1M+", "API Requests / Day"],
  ["150+", "Countries"],
  ["99.99%", "Uptime"],
  ["100%", "Free Basic"]
];

export const clientStats = [
  ["2,500+", "Active Clients"],
  ["10,000+", "MCP Servers Deployed"],
  ["1M+", "API Requests / Day"],
  ["150+", "Countries"],
  ["99.99%", "Uptime"],
  ["100%", "Client Satisfaction"]
];

export const features = [
  {
    title: "Largest MCP Registry",
    body: "Access 10,000+ verified MCP servers across every category and use case.",
    icon: Boxes,
    accent: "pink" as Accent
  },
  {
    title: "One API for Everything",
    body: "Unified Model Context Protocol endpoint to connect all your tools.",
    icon: Network,
    accent: "blue" as Accent
  },
  {
    title: "Fully Hosted",
    body: "We host, secure, scale and monitor your MCP servers globally.",
    icon: MonitorUp,
    accent: "green" as Accent
  },
  {
    title: "One-Click Deploy",
    body: "Deploy your own MCP server in a single click. No DevOps needed.",
    icon: Rocket,
    accent: "amber" as Accent
  },
  {
    title: "Built for AI Agents",
    body: "Works seamlessly with Claude, ChatGPT, Cursor and all major clients.",
    icon: Sparkles,
    accent: "pink" as Accent
  },
  {
    title: "Open & Community",
    body: "Open source friendly. Community driven. Built for everyone.",
    icon: Workflow,
    accent: "green" as Accent
  }
];

export const useCases = [
  ["AI Assistants", "Give AI access to real-time data, tools and context.", Sparkles, "pink" as Accent],
  ["Data & Analytics", "Query databases, APIs and datasets using natural language.", Database, "amber" as Accent],
  ["DevOps & Automation", "Automate deployments, infra management and monitoring.", GitBranch, "green" as Accent],
  ["Business Workflows", "Connect SaaS apps and automate repetitive tasks.", BriefcaseIcon, "amber" as Accent],
  ["Custom Integrations", "Build your own MCP servers and share with the world.", PlugZap, "pink" as Accent]
];

function BriefcaseIcon(props: React.ComponentProps<typeof Server>) {
  return <Server {...props} />;
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/15 via-violet-500/20 to-fuchsia-500/15 shadow-[0_0_28px_rgba(124,58,237,0.28)]">
        <div className="absolute h-5 w-5 rotate-45 rounded-[5px] border border-cyan-300/80" />
        <div className="h-3 w-3 rotate-45 rounded-[4px] border border-fuchsia-300/90" />
      </div>
      {!compact && (
        <div className="leading-none">
          <div className="text-base font-black tracking-tight text-white">MCP SERVER</div>
          <div className="text-[10px] font-medium text-white/50">Connect Everything to AI</div>
        </div>
      )}
    </Link>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-bold text-violet-200 shadow-[0_0_24px_rgba(124,58,237,0.18)]">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-violet-600 px-6 text-sm font-bold text-white shadow-[0_0_28px_rgba(124,58,237,0.32)] transition hover:scale-[1.02]"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] px-6 text-sm font-bold text-white transition hover:border-violet-300/40 hover:bg-white/[0.06]"
    >
      {children}
    </Link>
  );
}

export function IconTile({
  icon: Icon,
  accent,
  className = ""
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
  className?: string;
}) {
  return (
    <div className={`grid h-11 w-11 place-items-center rounded-xl border ${accentBg[accent]} ${className}`}>
      <Icon className={`h-5 w-5 ${accentText[accent]}`} />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center"
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-8 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/80">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-white/55">{subtitle}</p>}
    </div>
  );
}

export function EcosystemVisual({ variant = "home" }: { variant?: "home" | "clients" | "integrations" | "compact" }) {
  const leftLabels =
    variant === "clients"
      ? ["Databases", "Tools", "AI Agents"]
      : variant === "integrations"
        ? ["Slack", "Microsoft", "GitHub"]
        : ["Databases", "APIs", "Files & Storage", "SaaS Apps"];
  const rightLabels =
    variant === "clients"
      ? ["Applications", "APIs", "Services"]
      : variant === "integrations"
        ? ["Notion", "Shopify", "AWS", "Stripe"]
        : ["10,000+ Servers", "Unlimited Use Cases", "Global Edge Hosting", "Open Community"];

  return (
    <div className="relative mx-auto min-h-[320px] w-full max-w-[620px] rounded-2xl border border-violet-300/20 bg-[#0b1020]/70 p-4 shadow-[0_0_70px_rgba(88,28,135,0.24)] sm:p-6">
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.28),transparent_46%),radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_28%)]" />
      <div className="absolute left-[12%] top-[22%] hidden w-28 space-y-2 md:block">
        {leftLabels.map((label, index) => (
          <NodePill key={label} label={label} accent={index % 2 ? "blue" : "cyan"} />
        ))}
      </div>
      <div className="absolute right-[8%] top-[20%] hidden w-32 space-y-2 md:block">
        {rightLabels.map((label, index) => (
          <NodePill key={label} label={label} accent={index % 2 ? "green" : "violet"} />
        ))}
      </div>

      <div className="absolute left-1/2 top-[49%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 sm:h-[220px] sm:w-[220px]" />
      <div className="absolute left-1/2 top-[49%] h-[140px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-violet-400/20 sm:h-[170px] sm:w-[320px]" />
      <div className="absolute left-[18%] top-[31%] h-px w-[26%] rotate-12 bg-gradient-to-r from-transparent to-cyan-400/70" />
      <div className="absolute right-[18%] top-[31%] h-px w-[26%] -rotate-12 bg-gradient-to-l from-transparent to-violet-400/70" />
      <div className="absolute left-[18%] bottom-[31%] h-px w-[26%] -rotate-12 bg-gradient-to-r from-transparent to-blue-400/70" />
      <div className="absolute right-[18%] bottom-[31%] h-px w-[26%] rotate-12 bg-gradient-to-l from-transparent to-fuchsia-400/70" />

      <div className="relative z-10 flex min-h-[270px] items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="relative grid h-32 w-32 place-items-center rounded-[1.75rem] border border-violet-300/50 bg-gradient-to-br from-[#1f3c88] via-[#5520b4] to-[#11051f] shadow-[0_0_42px_rgba(168,85,247,0.55)] sm:h-36 sm:w-36 sm:rounded-[2rem]">
            <div className="absolute -bottom-5 h-10 w-36 rounded-[50%] border border-violet-300/50 bg-violet-500/20 blur-[1px] sm:w-44" />
            <div className="text-center">
              <div className="text-3xl font-black leading-none text-white">MCP</div>
              <div className="text-lg font-black text-violet-100">SERVER</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-1 flex w-fit max-w-full items-center gap-2 rounded-lg border border-violet-300/20 bg-black/35 px-3 py-2 text-[10px] font-semibold text-violet-100 sm:px-4 sm:text-[11px]">
        <LockKeyhole className="h-3.5 w-3.5 text-violet-300" />
        https://api.mcpserver.in/v1
      </div>
    </div>
  );
}

function NodePill({ label, accent }: { label: string; accent: Accent }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-white/75">
      <span className={`h-2 w-2 rounded-full ${accentText[accent].replace("text-", "bg-")}`} />
      {label}
    </div>
  );
}

export function StatStrip({ items = stats }: { items?: string[][] }) {
  return (
    <div
      className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] md:grid-cols-3 lg:[grid-template-columns:repeat(var(--stat-count),minmax(0,1fr))]"
      style={{ "--stat-count": items.length } as React.CSSProperties}
    >
      {items.map(([value, label], index) => (
        <div key={`${value}-${label}`} className={`px-4 py-5 text-center sm:px-5 sm:py-6 ${index > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
          <div className="text-2xl font-black tracking-tight text-violet-300 md:text-3xl">{value}</div>
          <div className="mt-1 text-xs text-white/65">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function LogoCloud({ client = false }: { client?: boolean }) {
  const items = client
    ? ["zomato", "BYJU'S", "Razorpay", "CRED", "WinZO", "zepto", "Pine Labs", "Swiggy", "Flipkart", "freshworks", "Chargebee", "PayU", "innovaccer", "JUSPAY", "Practo", "druva"]
    : logos.map((logo) => logo.name);

  return (
    <div className="border-y border-white/5 py-6">
      <div className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
        {client ? "Trusted by Leading Companies" : "Trusted by AI agents, developers and companies"}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
        {items.map((item, index) => {
          const accent = logos[index % logos.length]?.accent ?? "violet";
          return (
            <span
              key={item}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/7 bg-white/[0.025] px-4 text-sm font-black text-white/85"
            >
              <span className={`h-2.5 w-2.5 rounded-sm ${accentText[accent].replace("text-", "bg-")}`} />
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FeatureGrid({ items = features }: { items?: typeof features }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-violet-300/40 hover:bg-white/[0.055]">
            <IconTile icon={Icon} accent={feature.accent} />
            <h3 className="mt-5 text-sm font-black text-white">{feature.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/58">{feature.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export function IntegrationRail() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-center gap-2">
        {["Popular", "Productivity", "Developer Tools", "Databases", "Cloud", "Communication", "Finance", "All Categories"].map((tab, index) => (
          <button
            key={tab}
            className={`rounded-md px-6 py-2 text-xs font-bold transition ${
              index === 0 ? "bg-violet-600 text-white" : "bg-white/[0.04] text-white/65 hover:bg-white/[0.07]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center">
              <Icon className={`mx-auto h-7 w-7 ${accentText[item.accent]}`} />
              <div className="mt-3 text-xs font-semibold text-white/80">{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Link href="/integrations" className="inline-flex items-center gap-1 text-xs font-bold text-violet-300 hover:text-violet-200">
          View all Integrations <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function CodeDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">How It Works</h2>
        <p className="mt-1 text-sm text-white/50">Get started in 3 simple steps</p>
        <div className="mt-5 space-y-3">
          {[
            ["Discover", "Browse or search 10,000+ MCP servers across categories and integrations."],
            ["Connect", "Choose a server and connect via our unified MCP API."],
            ["Automate", "Use in your AI agent, app or workflow and start automating instantly."]
          ].map(([title, body], index) => (
            <div key={title} className="flex gap-3 rounded-lg border border-white/8 bg-white/[0.035] p-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-600 text-sm font-black text-white">{index + 1}</div>
              <div>
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <PrimaryButton href="/mcp-server-directory">Start Exploring</PrimaryButton>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07101f] shadow-2xl">
        <div className="flex flex-wrap gap-4 border-b border-white/10 px-5 py-3 text-xs text-white/45 sm:gap-6">
          <span className="font-bold text-white">cURL</span>
          <span>Python</span>
          <span>Node.js</span>
          <span>Example Response</span>
        </div>
        <div className="grid gap-0 md:grid-cols-2">
          <pre className="overflow-x-auto border-white/10 p-5 text-xs leading-6 text-cyan-100 md:border-r">
            <code>{`curl -X POST https://api.mcpserver.in/v1/mcp \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "server": "github",
    "action": "list_repositories",
    "params": { "owner": "octocat" }
  }'`}</code>
          </pre>
          <pre className="overflow-x-auto p-5 text-xs leading-6 text-emerald-200">
            <code>{`{
  "status": "success",
  "server": "github",
  "data": {
    "repositories": [
      { "name": "hello-world", "stars": 1820 },
      { "name": "mcp-server", "stars": 542 }
    ]
  }
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function ApiConsole() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07101f] shadow-2xl">
      <div className="flex flex-wrap gap-4 border-b border-white/10 px-5 py-3 text-xs text-white/45 sm:gap-6">
        <span className="font-bold text-white">cURL</span>
        <span>Python</span>
        <span>Node.js</span>
        <span>Go</span>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-6 text-cyan-100">
        <code>{`curl -X POST https://api.mcpserver.in/v1/integrations/slack/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "general",
    "text": "Hello from MCP SERVER",
    "agent_id": "agent_123"
  }'`}</code>
      </pre>
    </div>
  );
}

export function UseCaseGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {useCases.map(([title, body, Icon, accent]) => (
        <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
          <IconTile icon={Icon as React.ComponentType<{ className?: string }>} accent={accent as Accent} />
          <h3 className="mt-4 text-sm font-black text-white">{title as string}</h3>
          <p className="mt-2 text-xs leading-relaxed text-white/55">{body as string}</p>
        </div>
      ))}
    </div>
  );
}

export function SecurityBand() {
  return (
    <div className="overflow-hidden rounded-xl border border-violet-300/20 bg-gradient-to-r from-violet-950/80 via-[#112040] to-[#07111e] p-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div>
          <h3 className="text-xl font-black text-white">Open. Secure. Scalable.</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">Enterprise grade infrastructure with developer friendly experience.</p>
        </div>
        {[
          ["Enterprise Security", ShieldCheck, "SOC 2, GDPR ready."],
          ["Global Infrastructure", Globe2, "Edge hosting in 20+ regions."],
          ["Developer First", Code2, "RESTful API, SDKs, CLI."],
          ["Observability", MonitorUp, "Logs, metrics and alerts."],
          ["Community Driven", Network, "Open source and transparent."]
        ].map(([title, Icon, body]) => (
          <div key={title as string}>
            <IconTile icon={Icon as React.ComponentType<{ className?: string }>} accent="violet" />
            <h4 className="mt-3 text-xs font-black text-white">{title as string}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-white/55">{body as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ client = false }: { client?: boolean }) {
  const items = client
    ? [
        ["MCP SERVER is the missing piece for our AI platform. Integration used to take weeks, now it takes minutes.", "Harshil Mathur", "Co-founder and CTO, Razorpay"],
        ["The simplicity, reliability and ecosystem around MCP SERVER is unmatched. It just works.", "Divya Gokulnath", "Engineering Manager, BYJU'S"],
        ["We connected 20+ services in a week. MCP SERVER unlocked speed and scale for our AI agents.", "Saurabh Kochhar", "Engineering Head, Swiggy"],
        ["Security, performance and developer experience deliver on all fronts.", "Ankur Nandwani", "Tech Lead, CRED"]
      ]
    : [
        ["MCP SERVER is the missing piece for AI agent integrations. The ease of use is insane.", "Rohit Sharma", "AI Engineer"],
        ["We deployed our MCP in 30 seconds and our AI agent is now connected to 100+ tools.", "Priya Patel", "Developer"],
        ["Finally, a platform that makes MCP hosting simple, secure and free for everyone.", "Arjun Verma", "Founder"]
      ];

  return (
    <div className={`grid gap-4 ${client ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map(([quote, name, role]) => (
        <div key={name} className="rounded-xl border border-white/10 bg-white/[0.035] p-6">
          <div className="text-4xl font-black leading-none text-violet-400/70">"</div>
          <p className="mt-2 min-h-20 text-sm leading-relaxed text-white/80">{quote}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-black text-white">{name}</div>
              <div className="text-xs text-white/45">{role}</div>
            </div>
            <div className="flex gap-0.5 text-amber-400">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CtaBanner({
  title = "Ready to Supercharge Your AI Agents?",
  subtitle = "Join builders using MCP SERVER to build the future.",
  primaryHref = "/mcp-server-directory",
  primaryLabel = "Explore MCP Servers"
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-violet-300/25 bg-gradient-to-r from-violet-950 via-[#241266] to-[#07152d] p-6 sm:p-8">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(34,211,238,0.25),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.35),transparent_36%)] md:block" />
      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_260px] md:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-white/70">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
            <SecondaryButton href="/pricing">Deploy Your MCP Server</SecondaryButton>
          </div>
        </div>
        <div className="hidden justify-end md:flex">
          <div className="relative grid h-44 w-44 place-items-center rounded-full border border-cyan-300/20 bg-white/[0.04]">
            <div className="absolute inset-5 rounded-full bg-violet-500/25 blur-2xl" />
            <div className="relative rounded-2xl border border-cyan-300/30 bg-[#081426] p-5 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
              <Sparkles className="mx-auto h-9 w-9 text-cyan-300" />
              <div className="mt-2 text-sm font-black text-white">AI READY</div>
              <div className="text-[11px] text-white/50">MCP Network</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchPanel({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl">
      {showTitle && (
        <h2 className="mb-5 text-center text-2xl font-black text-white">
          Search <span className="text-violet-300">10,000+</span> MCP Servers
        </h2>
      )}
      <div className="flex items-center overflow-hidden rounded-lg border border-white/15 bg-white shadow-lg shadow-violet-950/20">
        <Search className="ml-4 h-4 w-4 shrink-0 text-slate-500" />
        <input
          className="min-h-12 min-w-0 flex-1 px-3 text-sm text-slate-800 outline-none"
          placeholder="Search for MCP servers, tools, apps..."
        />
        <button className="m-1 rounded-md bg-violet-600 px-4 text-xs font-black text-white">Search</button>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
        {["GitHub", "Slack", "Notion", "Google Drive", "Postgres", "AWS", "Stripe", "Figma", "Jira"].map((tag) => (
          <span key={tag} className="rounded-md bg-violet-500/15 px-3 py-1 font-semibold text-violet-200">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export function DeployShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.34fr_0.42fr_0.24fr]">
      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-7">
        <Badge>Deploy in seconds</Badge>
        <h2 className="mt-4 text-3xl font-black text-white">One Click Deploy</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/58">Deploy any MCP server to the cloud in less than 60 seconds.</p>
        <ul className="mt-5 space-y-3 text-sm text-white/70">
          {["No infrastructure required", "Automatic HTTPS & scaling", "Built-in authentication", "Real-time logs & monitoring"].map((item) => (
            <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-300" />{item}</li>
          ))}
        </ul>
        <div className="mt-7"><PrimaryButton href="/pricing">Deploy Now</PrimaryButton></div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 text-lg font-black text-emerald-200">D</div>
          <div>
            <h3 className="font-black text-white">Deploying Internal Database MCP</h3>
            <p className="text-xs text-white/45">internal/database-search</p>
          </div>
          <span className="ml-auto rounded-full bg-blue-500/25 px-3 py-1 text-xs font-bold text-blue-100">AK</span>
        </div>
        {["Deployed to cloud", "Set up authentication", "Applying access controls", "Setting up monitoring and logs", "Finalizing deployment"].map((step, index) => (
          <div key={step} className="flex items-center gap-3 border-t border-white/8 py-3 text-sm text-white/70">
            <CheckCircle2 className={`h-4 w-4 ${index < 4 ? "text-emerald-300" : "text-white/30"}`} />
            {step}
          </div>
        ))}
        <div className="mt-3 rounded-lg border border-emerald-300/20 bg-emerald-500/15 py-4 text-center text-lg font-black text-emerald-200">
          Your server is live
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-7 text-center">
        <Globe2 className="mx-auto h-16 w-16 text-blue-300" />
        <h3 className="mt-6 text-lg font-black text-white">Your MCP Server is Live!</h3>
        <div className="mt-5 rounded-md border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-100">
          https://server.mcpserver.com
        </div>
        <div className="mt-5">
          <SecondaryButton href="/profile">View Server</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export function IntegrationCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {integrations.slice(1, 7).map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between">
              <Icon className={`h-10 w-10 ${accentText[item.accent]}`} />
              <span className="rounded bg-violet-600 px-2 py-1 text-[10px] font-black text-white">{index === 3 ? "Trending" : "Popular"}</span>
            </div>
            <h3 className="mt-5 text-lg font-black text-white">{item.name}</h3>
            <p className="mt-2 min-h-16 text-xs leading-relaxed text-white/55">Connect, automate and manage {item.name} workflows with AI.</p>
            <div className="mt-4 flex justify-between text-[11px] text-white/50">
              <span className="text-amber-300">4.8</span>
              <span>{index % 2 ? "45K+" : "50K+"} uses</span>
            </div>
            <button className="mt-4 w-full rounded-md bg-violet-600 py-2 text-xs font-black text-white">Connect</button>
          </div>
        );
      })}
    </div>
  );
}

export function ClientCaseStudies() {
  const cases = [
    ["Razorpay", "Fintech", "Integrated 23+ tools and APIs using MCP SERVER to automate KYC, payments and reconciliation workflows.", ["23+", "80%", "99.99%"]],
    ["BYJU'S", "EdTech", "Connected AI tutors with content, analytics and assessment systems seamlessly via MCP.", ["35+", "60%", "1M+"]],
    ["Swiggy", "FoodTech", "Built AI agents for demand forecasting, route optimization and restaurant operations.", ["28+", "70%", "50M+"]],
    ["CRED", "Fintech", "Unified multiple data sources and internal tools to power intelligent credit insights and automation.", ["40+", "90%", "100%"]]
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Client Success Stories</h2>
          <p className="text-sm text-white/50">See how our clients are building amazing AI solutions with MCP SERVER.</p>
        </div>
        <Link href="/clients" className="hidden text-xs font-bold text-violet-300 md:inline-flex">View all case studies {"->"}</Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {cases.map(([name, industry, body, metrics]) => (
          <div key={name as string} className="rounded-xl border border-white/10 bg-[#0c1424] p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{name as string}</h3>
              <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-semibold text-white/60">{industry as string}</span>
            </div>
            <p className="mt-5 min-h-20 text-xs leading-relaxed text-white/62">{body as string}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
              {(metrics as string[]).map((metric) => (
                <div key={metric}>
                  <div className="text-lg font-black text-violet-300">{metric}</div>
                  <div className="text-[10px] text-white/45">Metric</div>
                </div>
              ))}
            </div>
            <Link href="/clients" className="mt-5 inline-flex text-sm font-bold text-violet-300">Read Case Study {"->"}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroTrustBadges() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ["100% Free to Use", "Basic Access", ShieldCheck, "green" as Accent],
        ["1-Click Deployment", "Go Live in Seconds", Rocket, "green" as Accent],
        ["Enterprise Ready", "Secure & Scalable", LockKeyhole, "green" as Accent]
      ].map(([title, body, Icon, accent]) => (
        <div key={title as string} className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.035] p-3">
          <IconTile icon={Icon as React.ComponentType<{ className?: string }>} accent={accent as Accent} className="h-8 w-8 rounded-lg" />
          <div>
            <div className="text-xs font-black text-white">{title as string}</div>
            <div className="text-[11px] text-white/45">{body as string}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageShell({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,#02040b_0%,#051020_46%,#02040b_100%)]" />
      {children}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function DividerSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`border-t border-white/6 py-12 ${className}`}>{children}</section>;
}
