export interface DeepDiveSection {
  heading: string;
  body: string[];
}

export const pillarDeepContent: Record<string, DeepDiveSection[]> = {
  "what-is-mcp": [
    {
      heading: "The Message Lifecycle",
      body: [
        "An MCP session opens with an initialize handshake: the client sends its protocol version and capabilities, the server responds with its own capabilities (which tools, resources, and prompts it supports), and the client confirms with an initialized notification before any real work begins.",
        "After that, three message types cover everything: requests (expect a response, like tools/call), notifications (fire-and-forget, like a progress update), and responses (success results or structured errors). All of it rides on JSON-RPC 2.0, so any client or server that implements the spec correctly can talk to any other.",
      ],
    },
    {
      heading: "Tools, Resources, and Prompts — What Each One Is For",
      body: [
        "Tools are functions the model can invoke — each with a name, a description written for the model, and a JSON Schema defining its inputs. Resources are read-only data the server exposes by URI, which a client can pull into context without it needing to be a tool call. Prompts are reusable, parameterized templates the client can surface to the user before an interaction even starts.",
        "Getting this distinction right matters for design: if something is just data to read, model it as a resource, not a tool — it avoids wasting a tool-call round trip on something that didn't need one.",
      ],
    },
  ],
  "official-mcp-servers": [
    {
      heading: "What 'Official' Actually Means Here",
      body: [
        "The modelcontextprotocol/servers repository splits entries into two tiers: reference implementations maintained directly by the steering group (filesystem, git, fetch, memory — used mainly to demonstrate spec compliance) and third-party servers submitted by companies or maintainers, which are listed but not maintained by the core team.",
        "Being listed in the official repo is a discoverability signal, not a security guarantee — the maintenance quality of a third-party listing varies as much as anything on a package registry. Check the commit history and issue responsiveness before depending on one in production.",
      ],
    },
  ],
  "mcp-marketplaces": [
    {
      heading: "What to Check Before Installing From a Marketplace",
      body: [
        "Marketplaces differ mainly in how they vet listings: some (Smithery) apply editorial review before a server is featured; others index anything published to a public registry with minimal curation. A listing existing on a marketplace is not the same as it being reviewed for security.",
        "Before installing a third-party server, check: does it declare the exact permissions/scopes it needs, is the source repository public and matches what's published, and has it had a commit or release in the last several months. A server with broad filesystem or network access and no recent activity is a bigger risk than one that's narrowly scoped, even if the latter has fewer stars.",
      ],
    },
  ],
  "mcp-categories": [
    {
      heading: "Picking a Category Isn't Just Organizational",
      body: [
        "The category a server falls into often predicts its risk profile as much as its function. Developer-tool servers (GitHub, GitLab) typically need write access to repos — scope tokens narrowly. Database servers should default to read-only unless a task genuinely requires writes. Browser-automation servers can execute arbitrary page interactions, which is a materially larger attack surface than a static knowledge-base server.",
        "When evaluating a new category of server for the first time, start by asking what the worst single tool call could do if the model called it with unexpected arguments — that's a more useful filter than the category label itself.",
      ],
    },
  ],
  "mcp-vs-api": [
    {
      heading: "A Concrete Comparison",
      body: [
        "A REST endpoint is designed for a developer who reads documentation once and writes code against a fixed contract. An MCP tool is designed for a model that reads the tool's schema on every session and decides, at runtime, whether and how to call it — the 'documentation' and the interface are the same artifact.",
        "This changes how you design the interface. A REST API can afford ambiguous parameter names because a human developer will read the docs. An MCP tool schema can't — every field needs a description clear enough that a model calls it correctly without ever having seen a usage example.",
      ],
    },
  ],
  "mcp-clients": [
    {
      heading: "How Configuration Differs Across Clients",
      body: [
        "Claude Desktop reads server definitions from a JSON config file (claude_desktop_config.json), keyed by server name, each entry specifying the launch command and arguments — it spawns the server as a local child process over stdio.",
        "VS Code and Cursor both support the same general pattern but read from their own settings files, and both additionally support remote servers over Streamable HTTP, which Claude Desktop's stdio-first design doesn't handle as its default path.",
        "The practical implication: a server that only ever gets tested against one client's config format can fail silently in another — differences show up in how environment variables get passed through and how working directories resolve for relative paths.",
      ],
    },
  ],
  "enterprise-mcp": [
    {
      heading: "The Auth Pattern That Actually Matters Here",
      body: [
        "Enterprise MCP deployments almost always need OAuth-based auth rather than a static API key, specifically because the server is acting on behalf of a specific signed-in user, not a shared service account. That means the server needs to validate a bearer token per request and scope every tool call to whatever that token is actually authorized for — not to whatever the server's own service credentials could technically do.",
        "The most common mistake here is a server that authenticates the connection once at startup, then treats every subsequent tool call as fully trusted — which breaks the moment more than one user's requests flow through the same server instance.",
      ],
    },
  ],
  "mcp-hosting": [
    {
      heading: "Stdio vs Remote Isn't a Preference, It's an Architecture Decision",
      body: [
        "A stdio server is a local process — it lives and dies with the client session, which is fine for a single desktop user but doesn't work for anything that needs to serve multiple users or stay running independently. A remote server over SSE or Streamable HTTP is a persistent service you deploy and operate like any other backend: it needs its own uptime, logging, and scaling story.",
        "The switch from stdio to remote is also the point where auth stops being optional. A local stdio server implicitly trusts whoever is running the client; a remote server is reachable by anyone who can hit the endpoint unless you put real authentication in front of it.",
      ],
    },
  ],
  "mcp-security": [
    {
      heading: "The Failure Modes That Actually Show Up in Practice",
      body: [
        "The most common real-world MCP security issue isn't an exotic exploit — it's a server exposed without authentication because it was only ever tested locally, then deployed remotely without anyone adding an auth layer. The second most common is a tool scoped far more broadly than the task needs (a 'delete file' tool with no path restriction, callable with any argument the model produces).",
        "A useful discipline: treat every tool description as untrusted input from the model's perspective, and every model-supplied argument as untrusted input from the tool's perspective. Validate arguments before they touch a real system, and require an explicit confirmation step before anything irreversible executes.",
        "For anything handling personal data, that's also where data-protection obligations attach — see the DPDP compliance guide for how this plays out for servers operating in India.",
      ],
    },
  ],
  "mcp-development": [
    {
      heading: "What the SDKs Actually Handle for You",
      body: [
        "The official Python and TypeScript SDKs handle the JSON-RPC framing, the initialize handshake, and request/response routing — what's left to the developer is defining tool schemas and writing the handler logic. Getting the schema right is most of the real work; a vague or overly permissive schema is the most common source of a model misusing a tool.",
        "A practical development loop: write the tool, test it manually against the schema with a minimal script before wiring it into a real client, then verify the client actually surfaces the tool correctly — client-side rendering of tool descriptions has historically been where subtle bugs hide.",
      ],
    },
  ],
  "mcp-installation": [
    {
      heading: "Choosing an Install Method",
      body: [
        "A CLI installer (like Smithery's) handles config file editing automatically, which is the fastest path for a single well-known server but obscures what's actually being written to your client config — worth checking the resulting config file once, especially for a server you haven't used before.",
        "Manual configuration is slower but gives full visibility into exactly what command, arguments, and environment variables get passed to the server — the right choice when installing a server whose behavior you want to fully understand before trusting it with real credentials.",
      ],
    },
  ],
  "mcp-trends": [
    {
      heading: "What's Actually Shifted in How Servers Get Built",
      body: [
        "The clearest structural shift has been from stdio-only, single-user servers toward remote, multi-tenant servers with real auth — driven by enterprises wanting centrally managed servers rather than one running on each developer's laptop.",
        "Alongside that, tooling has matured: schema validation, testing harnesses, and inspector-style debugging clients that didn't exist in the protocol's early days are now a normal part of the development loop, which has made it easier to catch a broken tool schema before it reaches a real client.",
      ],
    },
  ],
};
