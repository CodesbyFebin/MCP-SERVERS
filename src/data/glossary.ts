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
  },
  {
    slug: "oauth",
    term: "OAuth",
    definition: "An authorization framework that lets MCP clients or servers request scoped access to third-party services without directly handling a user's password.",
    detailedExplanation: "OAuth is commonly used when MCP servers connect to SaaS systems such as GitHub, Google, Slack, Notion, or payment platforms. Instead of placing a full account password inside an MCP configuration, the system exchanges grants and tokens with defined scopes. For production MCP deployments, OAuth tokens should be encrypted, rotated, scoped narrowly, and never exposed in tool outputs or logs.",
    keyTakeaways: [
      "OAuth delegates access using scoped tokens.",
      "MCP servers should store tokens outside source code.",
      "Scopes should match the smallest set of tools a server exposes.",
      "Logs and model responses must never reveal raw OAuth tokens."
    ],
    useCase: "Connecting a support MCP server to a SaaS helpdesk with read-only ticket scopes for Indian customer support teams.",
    technicalDetails: {
      protocolLayer: "Authorization Layer",
      format: "Bearer tokens, grants, scopes, refresh tokens",
      latencyProfile: "Token validation adds minimal overhead when cached safely"
    },
    references: [
      "https://oauth.net/2/",
      "https://mcpserver.in/docs/compliance/security-best-practices"
    ]
  },
  {
    slug: "dpdp",
    term: "DPDP",
    definition: "The Digital Personal Data Protection framework for India, relevant to MCP servers that access or process personal data.",
    detailedExplanation: "DPDP matters for MCP because agent tools can dynamically retrieve customer, employee, student, health, or financial data. A DPDP-aware MCP design maps data flows, limits purpose, redacts sensitive fields, logs access, and reviews retention and breach workflows. This glossary definition is technical guidance for builders, not legal advice.",
    keyTakeaways: [
      "Map every tool and resource that can expose personal data.",
      "Use redaction and minimum necessary fields before model exposure.",
      "Keep audit logs for sensitive tool calls.",
      "Review official materials and counsel before launch."
    ],
    useCase: "Masking Aadhaar, PAN, phone, and card fields before an AI agent summarizes support tickets for a fintech team in Mumbai.",
    technicalDetails: {
      protocolLayer: "Privacy and Governance Layer",
      format: "Policy metadata, redaction rules, consent and purpose records",
      latencyProfile: "PII scanning adds processing time but reduces compliance risk"
    },
    references: [
      "https://www.meity.gov.in/",
      "https://mcpserver.in/docs/compliance/dpdp-compliance-guide"
    ]
  },
  {
    slug: "ros",
    term: "ROS (Robot Operating System)",
    definition: "A robotics middleware ecosystem used to build robot applications with nodes, topics, services, messages, and simulation tools.",
    detailedExplanation: "ROS is relevant to MCP robotics because AI agents may need a controlled bridge into robot state, simulation data, telemetry, or high-level commands. MCP should not expose unsafe low-level robot controls directly. Instead, an MCP robotics server should wrap carefully approved operations such as status inspection, simulation queries, mission planning drafts, and operator-reviewed commands.",
    keyTakeaways: [
      "ROS organizes robot software into nodes and messages.",
      "MCP can expose robot context to AI agents through safe tools and resources.",
      "High-risk physical actions need human approval and safety interlocks.",
      "Simulation should be tested before hardware execution."
    ],
    useCase: "Allowing an agent to inspect ROS topic summaries from a warehouse robot simulation before an operator approves a route change.",
    technicalDetails: {
      protocolLayer: "Robotics Middleware Layer",
      format: "ROS topics, services, actions, messages",
      latencyProfile: "Depends on robot network, simulator, and safety checks"
    },
    references: [
      "https://www.ros.org/",
      "https://mcpserver.in/llm-robotics"
    ]
  },
  {
    slug: "mcp-robot-control",
    term: "MCP Robot Control",
    definition: "A guarded MCP pattern for exposing robot status, simulation, planning, and approved control actions to AI agents.",
    detailedExplanation: "MCP robot control should be designed as a safety boundary, not a direct remote-control pipe. The server should expose read-only telemetry first, then limited planning tools, and only then operator-approved commands. For physical systems, tool schemas must include bounded parameters, emergency-stop assumptions, and audit logs.",
    keyTakeaways: [
      "Expose telemetry before control.",
      "Use bounded schemas and safety limits.",
      "Require human approval for physical actions.",
      "Log commands with operator and robot context."
    ],
    useCase: "A factory agent drafts a route update for an autonomous mobile robot, but the final command requires supervisor approval.",
    technicalDetails: {
      protocolLayer: "Safety-Critical Tool Layer",
      format: "MCP tools over robotics middleware adapters",
      latencyProfile: "Latency budget must include safety and operator approval"
    },
    references: [
      "https://mcpserver.in/llm-robotics",
      "https://mcpserver.in/docs/compliance/security-best-practices"
    ]
  },
  {
    slug: "ros2-mcp-bridge",
    term: "ROS2 MCP Bridge",
    definition: "A bridge pattern that translates selected ROS2 topics, services, and actions into MCP resources and tools for AI clients.",
    detailedExplanation: "A ROS2 MCP bridge lets AI clients inspect robot state and request high-level operations through the MCP interface. It should filter noisy topics, normalize message payloads, and prevent unsafe command execution. In production, the bridge should run close to the robot network and publish only the minimal context the agent needs.",
    keyTakeaways: [
      "Translate ROS2 state into MCP resources.",
      "Expose only approved high-level actions as tools.",
      "Filter high-frequency telemetry before model context.",
      "Keep bridge logs and safety decisions auditable."
    ],
    useCase: "Exposing battery, location, and current task state from ROS2 robots to a planning agent in a warehouse dashboard.",
    technicalDetails: {
      protocolLayer: "Bridge / Adapter Layer",
      format: "ROS2 messages mapped to MCP resources and tools",
      latencyProfile: "Best kept on the same LAN or edge network as robot systems"
    },
    references: [
      "https://docs.ros.org/",
      "https://mcpserver.in/llm-robotics"
    ]
  },
  {
    slug: "simulation-mcp",
    term: "Simulation MCP",
    definition: "An MCP server pattern that connects AI agents to robotics, infrastructure, or workflow simulators before real-world execution.",
    detailedExplanation: "Simulation MCP is useful when an agent should test a plan against a digital environment before any high-risk action. The server can expose simulator state as resources and actions such as run_scenario, compare_paths, or summarize_failures as tools. This pattern is valuable for robotics, logistics, finance stress tests, and infrastructure change planning.",
    keyTakeaways: [
      "Use simulation to reduce risk before production actions.",
      "Expose simulator state as resources.",
      "Keep scenario tools deterministic and reproducible.",
      "Record inputs and outputs for review."
    ],
    useCase: "Testing a warehouse robot route in simulation before generating an operator approval request.",
    technicalDetails: {
      protocolLayer: "Simulation and Planning Layer",
      format: "Scenario tools, simulator resources, structured run reports",
      latencyProfile: "Bounded by simulator run time rather than MCP overhead"
    },
    references: [
      "https://mcpserver.in/llm-robotics",
      "https://mcpserver.in/docs/monitoring/observability-best-practices"
    ]
  },
  {
    slug: "hardware-abstraction-mcp",
    term: "Hardware Abstraction MCP",
    definition: "A design pattern that exposes stable, safe MCP tools over changing hardware drivers, devices, and robot subsystems.",
    detailedExplanation: "Hardware abstraction MCP keeps AI agents away from vendor-specific device commands. The MCP server exposes high-level, validated operations such as get_status, request_scan, or prepare_mission while internal adapters handle the device details. This reduces model confusion and makes hardware changes less disruptive.",
    keyTakeaways: [
      "Hide device-specific commands behind stable tools.",
      "Use high-level actions instead of raw motor or driver calls.",
      "Validate parameters with strict ranges.",
      "Keep hardware changes invisible to the AI client when possible."
    ],
    useCase: "A robotics platform changes lidar vendors while the MCP tool schema for scan summaries remains stable for the agent.",
    technicalDetails: {
      protocolLayer: "Hardware Adapter Layer",
      format: "Stable MCP schemas over device-specific drivers",
      latencyProfile: "Depends on device polling, driver performance, and safety gates"
    },
    references: [
      "https://mcpserver.in/llm-robotics",
      "https://mcpserver.in/docs/protocol/tools"
    ]
  }
];
