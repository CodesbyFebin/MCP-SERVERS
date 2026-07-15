export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  detailedExplanation: string;
  keyTakeaways: string[];
  useCase: string;
  technicalDetails: {
    protocolLayer?: string;
    format?: string;
    latencyProfile?: string;
    [key: string]: any;
  };
  references: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "model-context-protocol",
    term: "Model Context Protocol (MCP)",
    definition: "An open, secure protocol that standardizes how artificial intelligence agents and large language models (LLMs) exchange context, tools, prompts, and data resources with external servers.",
    detailedExplanation: "Model Context Protocol (MCP) acts as an architectural layer between AI clients (such as Claude Desktop, Cursor IDE, or custom agent systems) and systems containing data or computation engines. Before MCP, developers built custom, fragile pipelines for every new AI integration. MCP provides a unified standard, allowing servers to announce their tools, static and dynamic resources, and prompt templates in a single format (JSON-RPC 2.0).",
    keyTakeaways: [
      "Standardizes the client-to-server interaction interface.",
      "Eliminates ad-hoc API integrations for individual models.",
      "Supports bi-directional calling where clients can invoke server tools and servers can query client capabilities.",
      "Highly scalable across both local standard pipes (Stdio) and remote networks (SSE)."
    ],
    useCase: "Enabling Claude Desktop to query database tables, read codebase directories, and run terminal commands using a standard configuration.",
    technicalDetails: {
      protocolLayer: "Application / Context Layer",
      format: "JSON-RPC 2.0 Specification",
      latencyProfile: "Extremely low overhead (<2ms locally, <15ms at Indian Edge nodes)"
    },
    references: [
      "https://spec.modelcontextprotocol.io",
      "https://github.com/modelcontextprotocol"
    ]
  },
  {
    slug: "json-rpc",
    term: "JSON-RPC 2.0",
    definition: "A lightweight, stateless remote procedure call (RPC) protocol defined in JSON that utilizes request, response, and notification message frames.",
    detailedExplanation: "JSON-RPC 2.0 is the transport-agnostic message format chosen for the Model Context Protocol. It defines exact JSON schemas for client requests (containing 'jsonrpc', 'method', 'params', and 'id'), server responses (containing 'jsonrpc', 'result', or 'error', and 'id'), and notification frames (without an 'id' for fire-and-forget events). Because it is simple and highly structured, it can be parsed instantly by models and systems alike.",
    keyTakeaways: [
      "Stateless protocol designed for low communication overhead.",
      "Distinct formats for request-response loops and one-way notification events.",
      "Perfect error representation structure with standardized numeric codes.",
      "Language-neutral format implemented across all programming stacks."
    ],
    useCase: "Encoding a tool execution command like 'callTool' with parameters, and parsing the exact output returned by the backend server.",
    technicalDetails: {
      protocolLayer: "Presentation / RPC Layer",
      format: "IETF RFC 4627 compliant JSON payload",
      latencyProfile: "Negligible parse/serialize duration (<0.5ms)"
    },
    references: [
      "https://www.jsonrpc.org/specification",
      "https://spec.modelcontextprotocol.io/specification/basic/transports/"
    ]
  },
  {
    slug: "stdio",
    term: "Stdio Transport (Standard Input/Output)",
    definition: "A local-only transport mechanism where the AI client spawns the MCP server as a child process and communicates via standard input (stdin) and standard output (stdout) channels.",
    detailedExplanation: "StdIO transport is the default transport mode for desktop AI applications like Claude Desktop or Cursor. The AI client executes a command (e.g., 'node', 'python') to launch the MCP server in a separate subprocess. Messages are exchanged by writing JSON-RPC lines into the stdin/stdout streams. Standard error (stderr) is redirected to application logs so it doesn't corrupt the structured standard output JSON-RPC stream.",
    keyTakeaways: [
      "Default transport layer for local agent setups.",
      "Zero network ports required, securing the server within localhost boundaries.",
      "Process lifecycle is bound directly to the parent AI application.",
      "All debug and error diagnostics should be routed exclusively to stderr."
    ],
    useCase: "Running a local filesystem browser tool directly inside your IDE without spinning up web server listeners or local ports.",
    technicalDetails: {
      protocolLayer: "Transport Layer (Local Process Bound)",
      format: "Line-delimited JSON-RPC over Standard Pipes",
      latencyProfile: "Instantaneous IPC (<1ms)"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/transports/#stdio",
      "https://nodejs.org/api/process.html"
    ]
  },
  {
    slug: "sse",
    term: "SSE Transport (Server-Sent Events)",
    definition: "A lightweight, unidirectional HTTP-based streaming protocol used by remote MCP servers to push messages to AI clients, with client-to-server writes sent over standard POST requests.",
    detailedExplanation: "Server-Sent Events (SSE) transport is the protocol of choice for remote or hosted MCP servers on managed edge clouds like MCPserver.in. Under this transport, the client opens a persistent HTTP connection to receive a server-to-client message stream. For sending client-to-server requests, the client issues normal HTTP POST queries to a designated execution endpoint. This hybrid architecture bypasses websocket firewalls and fits seamlessly into stateless HTTP routers.",
    keyTakeaways: [
      "Optimized for remote, multi-tenant cloud-hosted MCP servers.",
      "Allows cloud platforms to authenticate, log, and throttle requests securely.",
      "Uses standard HTTP/1.1 or HTTP/2 transport, bypassing strict firewall constraints.",
      "Sub-50ms handshakes across high-speed CDN and edge points in India."
    ],
    useCase: "Connecting your local Cursor editor to a secure, remote Slack workspace database hosted on centralized edge servers in Bengaluru.",
    technicalDetails: {
      protocolLayer: "Transport Layer (Network / Web Bound)",
      format: "HTTP text/event-stream response and application/json POST requests",
      latencyProfile: "Depends on connection (10-35ms over high-speed networks)"
    },
    references: [
      "https://html.spec.whatwg.org/multipage/server-sent-events.html",
      "https://spec.modelcontextprotocol.io/specification/basic/transports/#sse"
    ]
  },
  {
    slug: "mcp-server",
    term: "MCP Server",
    definition: "An application that implements the Model Context Protocol, hosting tools, resources, and prompt templates, responding to JSON-RPC requests from compliant AI clients.",
    detailedExplanation: "An MCP Server is the provider of capability and context. It can be written in any language (e.g., TypeScript/Node.js, Python, Go, Rust) and exposes a defined set of actions. When initialized, it responds to the client's request by listing its available tools (using 'tools/list'), resources (using 'resources/list'), and templates. It then stands ready to execute tools or retrieve datasets securely.",
    keyTakeaways: [
      "The source of capabilities and system context.",
      "Requires minimal system footprint and can run locally or in secure cloud containers.",
      "Must validate all arguments strictly to protect host resources.",
      "Can easily integrate standard APIs, databases, or local scripts."
    ],
    useCase: "A Python server running on your database server that safely executes SQL queries and formats the results for a model.",
    technicalDetails: {
      protocolLayer: "System Provider / Service Layer",
      format: "Model Context Protocol SDK compliant",
      latencyProfile: "Directly bounded by underlying query execution speeds"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/servers/",
      "https://github.com/modelcontextprotocol/servers"
    ]
  },
  {
    slug: "mcp-client",
    term: "MCP Client",
    definition: "An AI interface or application (e.g., Claude, Cursor, or custom routers) that initiates connections to MCP servers, orchestrates interactions, and coordinates tool execution.",
    detailedExplanation: "The MCP Client is the active consumer in the protocol. It handles the discovery process: starting local processes, connecting to SSE endpoints, listing available tools, and rendering them as capabilities inside the LLM context. When the LLM decides to call a tool, the client translates that decision into a 'tools/call' request, awaits the server response, and routes the output back to the LLM.",
    keyTakeaways: [
      "The orchestration engine that drives the agent interaction loop.",
      "Manages server lifecycle, active authentication, and access tokens.",
      "Translates model outputs into structured protocol commands.",
      "Ensures safety prompts are presented before execution."
    ],
    useCase: "The Cursor IDE spawning an MCP server to scan your code workspace, letting the chat agent suggest exact edits with 100% precision.",
    technicalDetails: {
      protocolLayer: "Client Orchestrator / Consumer Layer",
      format: "Client MCP Specification compliant",
      latencyProfile: "Negligible protocol overhead (<1ms internal routing)"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/clients/"
    ]
  },
  {
    slug: "gateway",
    term: "MCP Gateway",
    definition: "A secure routing and proxy server that aggregates multiple local or remote MCP servers into a single endpoint for centralized management, rate-limiting, and security governance.",
    detailedExplanation: "An MCP Gateway acts as an enterprise-grade router for AI agent environments. In larger systems, instead of forcing the client to establish separate Stdio or SSE connections to twenty different services, they connect to a single Gateway. The Gateway handles API key authorization, authenticates and signs requests, audits executions for privacy compliance, and proxies messages to target edge servers.",
    keyTakeaways: [
      "Centralizes logging, credential management, and security policies.",
      "Provides uniform authorization controls (like OAuth 2.0 or secure JWT tokens).",
      "Implements global rate limiting and prompt sanitization.",
      "Enables distributed team collaborations with shared tool registries."
    ],
    useCase: "An enterprise hosting a cluster of secure connectors (GitHub, Postgres, Internal APIs) routing all remote agent queries through a single audited secure point.",
    technicalDetails: {
      protocolLayer: "Security, Routing, and Integration Gateway",
      format: "Uniform SSE/REST gateway facade",
      latencyProfile: "Proxy overhead < 5ms"
    },
    references: [
      "https://mcpserver.in/security"
    ]
  },
  {
    slug: "tool",
    term: "MCP Tools / Tool",
    definition: "Executable functions exposed by an MCP server to an AI client, enabling models to perform real-world actions with user-consented safety guards.",
    detailedExplanation: "Tools are the active, state-changing components of MCP. When a server lists its tools, it provides schemas detailing the tool name, description, and parameter types (using JSON Schema formats). This tells the model exactly what the tool does and how to form a valid request. Tools are highly interactive and can range from writing files to initiating payments.",
    keyTakeaways: [
      "Active, executable routines representing agent actions.",
      "Self-describing using standardized JSON Schema declarations.",
      "Require explicit user confirmation for high-stakes executions.",
      "Run inside sandboxed processes to avoid remote code execution (RCE) bugs."
    ],
    useCase: "A 'postgres_execute_query' tool that expects a SQL string argument and returns the formatted row output.",
    technicalDetails: {
      protocolLayer: "Execution / Operation Layer",
      format: "JSON Schema Parameter specification",
      latencyProfile: "Directly bounded by the target task duration"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/tools/"
    ]
  },
  {
    slug: "resource",
    term: "MCP Resources / Resource",
    definition: "Static or dynamic data inputs (such as files, databases, or API readouts) that servers expose to the client as read-only context feeds for the model.",
    detailedExplanation: "Resources are the passive, informational assets of MCP. They represent anything that can be read, such as text documents, server configs, application logs, or database rows. Resources can be static files referenced by URI (like 'file:///workspace/package.json') or dynamic resource templates (like 'database://{table}/schema') that clients query on-demand.",
    keyTakeaways: [
      "Read-only contextual data feeds for AI models.",
      "Organized using a custom URI-scheme structure (e.g. 'postgres://').",
      "Supports push-notification updates when resource data changes.",
      "Optimizes token count by letting models query only what is needed."
    ],
    useCase: "Allowing an AI model to read real-time application error logs directly from a 'logs://today' URI context stream.",
    technicalDetails: {
      protocolLayer: "Context Feed / Data Layer",
      format: "Base64 encoded binary or standard UTF-8 text strings",
      latencyProfile: "Extremely lightweight data transfer speeds"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/resources/"
    ]
  },
  {
    slug: "prompt",
    term: "MCP Prompts / Prompt",
    definition: "Pre-engineered, standardized instructions and context templates registered at the server level, providing quick conversational configurations for specific roles or jobs.",
    detailedExplanation: "Prompts in MCP are system-level templates that servers export to the client. This allows developers to bundle domain knowledge, system prompts, and tool instructions directly into the server instead of writing them inside the client application. The client fetches these templates via the 'prompts/list' endpoint, parameters are populated by the agent, and the final prompt is appended to the message history.",
    keyTakeaways: [
      "Server-managed prompt templates and system directives.",
      "Allows centralized updates of prompt engineering across all agent instances.",
      "Enables interactive parameters (e.g. {code_language}, {error_log}) filled on-the-fly.",
      "Enhances alignment and security standards for agent interactions."
    ],
    useCase: "Providing a 'code-reviewer' prompt from a GitHub server that sets up the model with rules for analyzing pull requests.",
    technicalDetails: {
      protocolLayer: "Prompt & Persona Context Layer",
      format: "Parametrized templates",
      latencyProfile: "Instantly loaded locally or via edge memory"
    },
    references: [
      "https://spec.modelcontextprotocol.io/specification/basic/prompts/"
    ]
  }
];
