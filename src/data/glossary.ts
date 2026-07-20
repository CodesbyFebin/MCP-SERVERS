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
  faqs?: { question: string; answer: string }[];
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
      latencyProfile: "Low overhead relative to REST — no per-request schema negotiation once a session is established"
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
      "Low-latency handshakes across high-speed CDN and edge points in India."
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
  },
  {
    slug: "ollama-mcp",
    term: "Ollama MCP Integration",
    definition: "Ollama is an open-source runtime for downloading and running open-weight language models (Llama, Mistral, Qwen, and others) locally, exposing them through a local HTTP API that MCP clients and servers can use as a self-hosted alternative to cloud LLM providers.",
    detailedExplanation: "Ollama packages model weights, a GGUF-based inference engine, and a REST API into a single CLI-installable binary that listens on localhost (port 11434 by default). In an MCP context, Ollama typically fills one of two roles: as the model backend for an MCP-compatible client that needs to run entirely offline or on-premise, or as the target of an MCP server that exposes tools for managing local models — pulling new weights, listing installed models, or routing a tool call to a specific local model instead of a hosted one. Because everything runs on the caller's own hardware, no prompt or context data leaves the machine, which is the main reason teams reach for it in regulated or air-gapped environments.",
    keyTakeaways: [
      "Runs entirely on local hardware — no API key, no data leaving the machine.",
      "Exposes an OpenAI-compatible-ish REST API on localhost:11434 by default.",
      "Commonly paired with MCP servers that need an offline or self-hosted LLM backend.",
      "Model quality and speed depend on local GPU/RAM, unlike hosted providers with fixed SLAs."
    ],
    useCase: "A financial services team runs Ollama with a locally hosted model on an air-gapped server, with an MCP server layered on top so an internal agent can query transaction data without any request ever leaving the private network.",
    technicalDetails: {
      protocolLayer: "Model Backend / Inference Layer",
      format: "REST over HTTP (localhost by default)",
      latencyProfile: "Depends entirely on local hardware — GPU inference is fast, CPU-only inference is significantly slower than hosted APIs"
    },
    references: [
      "https://github.com/ollama/ollama",
      "https://github.com/modelcontextprotocol/servers"
    ],
    faqs: [
      { question: "Does Ollama require a GPU?", answer: "No — it runs on CPU too, but inference is noticeably slower without one. GPU acceleration is supported on NVIDIA, and on Apple Silicon via Metal." },
      { question: "Can an MCP server call an Ollama model instead of a hosted LLM?", answer: "Yes — an MCP server is transport-agnostic about which LLM sits behind the client; pointing a client at a locally-run Ollama endpoint instead of a hosted API doesn't require any MCP-side changes." },
      { question: "Is data sent to Ollama's own servers?", answer: "No. Ollama runs entirely on the local machine; nothing is sent externally unless you explicitly configure a remote endpoint." }
    ]
  },
  {
    slug: "lm-studio-mcp",
    term: "LM Studio MCP Integration",
    definition: "LM Studio is a desktop application for discovering, downloading, and running open-weight LLMs locally through a graphical interface, which also starts a local OpenAI-compatible API server that MCP-aware tools can connect to instead of a cloud provider.",
    detailedExplanation: "Unlike Ollama's CLI-first workflow, LM Studio targets users who want a GUI for browsing Hugging Face model files, tuning context length and GPU offload settings, and chatting with a model directly in the app. Its 'Local Server' tab spins up an HTTP endpoint matching OpenAI's chat completions API shape, so any MCP client or server built against that interface can point at LM Studio instead of a hosted model with no code changes beyond the base URL. This makes it a common choice for developers prototyping MCP servers who want to iterate against a local model before wiring up a production LLM.",
    keyTakeaways: [
      "GUI-first alternative to Ollama for running local models.",
      "Local server mode exposes an OpenAI-compatible chat completions endpoint.",
      "Useful for prototyping MCP servers against a local model before switching to a hosted one.",
      "Model performance is bound by local hardware, same as any local-inference tool."
    ],
    useCase: "A developer builds and tests a new MCP server's tool-calling logic entirely against a model running in LM Studio, then repoints the same client config at a hosted model for production.",
    technicalDetails: {
      protocolLayer: "Model Backend / Inference Layer",
      format: "OpenAI-compatible REST API (local)",
      latencyProfile: "Local hardware-bound, similar profile to Ollama"
    },
    references: [
      "https://lmstudio.ai/docs",
      "https://spec.modelcontextprotocol.io"
    ]
  },
  {
    slug: "gpt4all-mcp",
    term: "GPT4All",
    definition: "GPT4All is an open-source ecosystem from Nomic AI for running compact, quantized language models locally on consumer-grade CPUs without requiring a dedicated GPU, distributed as a desktop chat app and a set of language bindings (Python, Node.js) that can back an MCP server.",
    detailedExplanation: "GPT4All's focus is accessibility: its supported models are quantized to run acceptably on ordinary laptops, and its bindings let a developer embed a local model directly inside a Node.js or Python MCP server process rather than calling out to a separate local server like Ollama or LM Studio. This trades some model capability for simpler deployment — a single process handles both the MCP protocol layer and the inference, with no separate server to keep running. It's a reasonable fit for lightweight, fully offline MCP tools where GPU hardware isn't a given.",
    keyTakeaways: [
      "Designed to run on CPU-only consumer hardware, not just GPU rigs.",
      "Ships as a desktop app plus Python/Node.js bindings for embedding in your own process.",
      "Can be embedded directly inside an MCP server rather than run as a separate local API.",
      "Model capability is generally more limited than larger hosted or GPU-run models."
    ],
    useCase: "A CLI tool ships with an embedded MCP server that uses GPT4All's Node.js bindings to summarize local log files completely offline, with no separate inference server to install.",
    technicalDetails: {
      protocolLayer: "Model Backend / Inference Layer",
      format: "Embedded library bindings (Python, Node.js) rather than a network API",
      latencyProfile: "CPU-bound; slower than GPU-backed local or hosted inference"
    },
    references: [
      "https://github.com/nomic-ai/gpt4all",
      "https://docs.gpt4all.io"
    ]
  },
  {
    slug: "llamaindex-mcp",
    term: "LlamaIndex MCP Integration",
    definition: "LlamaIndex is a data framework for connecting LLM applications to private or domain-specific data sources — documents, databases, APIs — through indexing and retrieval abstractions, and it ships official MCP support for exposing a LlamaIndex index as MCP tools and resources.",
    detailedExplanation: "LlamaIndex's core job is turning unstructured or semi-structured data into a queryable index (vector-based, keyword-based, or a hybrid) that an LLM application can retrieve from at query time — the standard building block for retrieval-augmented generation (RAG). Its MCP integration wraps that retrieval layer as a server: a `query` tool that lets an MCP client ask natural-language questions against the underlying index, and resource endpoints for browsing the indexed documents directly. This means a RAG pipeline built in LlamaIndex can be exposed to any MCP client — Claude Desktop, Cursor, or a custom agent — without re-implementing the retrieval logic as a bespoke API.",
    keyTakeaways: [
      "A data framework for RAG (retrieval-augmented generation), not an agent framework itself.",
      "Official MCP support exposes a LlamaIndex index as MCP tools and resources.",
      "Lets any MCP client query a RAG pipeline without a custom API layer.",
      "Distinct from vector databases (Qdrant, Pinecone) — LlamaIndex sits above them as an orchestration layer."
    ],
    useCase: "A company indexes its internal engineering wiki with LlamaIndex, exposes it as an MCP server, and lets Claude Desktop answer engineering questions by querying the index directly instead of relying on the model's training data.",
    technicalDetails: {
      protocolLayer: "Retrieval / Data Orchestration Layer",
      format: "MCP tools + resources over stdio or SSE, per the official LlamaIndex MCP integration",
      latencyProfile: "Depends on index size and the underlying vector store's query latency"
    },
    references: [
      "https://docs.llamaindex.ai",
      "https://github.com/run-llama/llama_index"
    ]
  },
  {
    slug: "crewai-mcp",
    term: "CrewAI MCP Integration",
    definition: "CrewAI is a Python framework for orchestrating multiple LLM-driven agents with distinct roles, goals, and tools that collaborate on a task, and it supports connecting to MCP servers so any agent in a crew can call MCP-exposed tools alongside its own native ones.",
    detailedExplanation: "Where a single-agent setup calls tools directly, CrewAI structures a workflow as a 'crew' of agents — for example a researcher, a writer, and a reviewer — each with its own system prompt, tool access, and delegation rules, coordinated by a process (sequential or hierarchical) that passes work between them. Its MCP client support means any of those agents can be given access to an external MCP server's tools (a database, a ticketing system, a search index) the same way it would use a tool defined natively in CrewAI, without CrewAI needing custom integration code for every external system.",
    keyTakeaways: [
      "A multi-agent orchestration framework, not a single-agent tool-calling library.",
      "Agents have distinct roles, goals, and tool access within a coordinated 'crew'.",
      "MCP client support lets any agent in the crew use MCP server tools alongside native ones.",
      "Distinct from LangChain/LlamaIndex, which focus more on single-chain or retrieval workflows."
    ],
    useCase: "A CrewAI 'crew' with a researcher agent and a writer agent uses an MCP-connected search server for the researcher's fact-finding step, then hands structured findings to the writer agent to draft a report.",
    technicalDetails: {
      protocolLayer: "Agent Orchestration Layer",
      format: "MCP client integration within CrewAI's tool-calling interface",
      latencyProfile: "Additive across agent hops — total latency depends on how many agents/tool calls the crew's process chains together"
    },
    references: [
      "https://docs.crewai.com",
      "https://github.com/crewAIInc/crewAI"
    ]
  },
  {
    slug: "qdrant-mcp",
    term: "Qdrant MCP Integration",
    definition: "Qdrant is an open-source vector similarity search engine written in Rust, used to store and query embedding vectors for semantic search and RAG, with an official MCP server that exposes stored collections as tools an MCP client can search and write to.",
    detailedExplanation: "Qdrant stores high-dimensional vectors (typically embeddings produced by an LLM or embedding model) alongside metadata payloads, and answers approximate nearest-neighbor queries efficiently at scale. The official `mcp-server-qdrant` exposes two primary tools to an MCP client: one to store a piece of information as a vector plus metadata, and one to search for semantically similar entries given a natural-language query — effectively turning Qdrant into a persistent 'memory' an agent can write to and recall from across sessions, rather than just a backend for a one-off RAG pipeline.",
    keyTakeaways: [
      "An open-source, Rust-based vector database, comparable to Pinecone or Weaviate.",
      "The official MCP server exposes store/search tools rather than raw database access.",
      "Commonly used to give an agent persistent 'memory' across separate conversations.",
      "Self-hostable, which matters for teams with data residency or cost constraints around managed vector DBs."
    ],
    useCase: "An agent stores summaries of every completed task in a Qdrant collection via the MCP server's store tool, then searches that collection at the start of a new conversation to recall relevant past work.",
    technicalDetails: {
      protocolLayer: "Data / Storage Layer",
      format: "MCP tools (store, find) over the official Qdrant MCP server",
      latencyProfile: "Sub-second for typical collection sizes; scales with vector count and index configuration"
    },
    references: [
      "https://github.com/qdrant/mcp-server-qdrant",
      "https://qdrant.tech/documentation"
    ]
  },
  {
    slug: "mcp-systemd-service",
    term: "MCP Server as a systemd Service",
    definition: "Running an MCP server as a systemd unit means registering it with Linux's systemd init system so it starts automatically on boot, restarts if it crashes, and has its logs captured by journald — the standard way to keep a remote MCP server (SSE or Streamable HTTP) alive in production on a Linux host.",
    detailedExplanation: "A locally-run stdio MCP server is launched and supervised by its client (Claude Desktop starts and stops it as needed), but a remote server has no client process to keep it running — it needs to survive reboots, crashes, and deploys on its own. systemd solves this with a unit file that declares the command to run, the user to run it as, a restart policy (e.g. `Restart=on-failure`), and resource limits. Once enabled with `systemctl enable`, the server starts on boot and systemd's supervisor restarts it automatically if the process exits unexpectedly, with all stdout/stderr output queryable through `journalctl -u <service-name>`.",
    keyTakeaways: [
      "Only relevant to remote MCP servers (SSE/Streamable HTTP) — local stdio servers are supervised by the client instead.",
      "Provides auto-restart on crash and auto-start on boot, without a separate process manager.",
      "Centralizes logs through journald, queryable with journalctl.",
      "The standard choice on most production Linux distributions; PM2 is the equivalent convention in Node-centric deployments."
    ],
    useCase: "A team deploys a remote MCP server on a bare Ubuntu VM, wrapping it in a systemd unit with `Restart=on-failure` so a transient database connection error doesn't take the server down permanently.",
    technicalDetails: {
      protocolLayer: "Process Supervision / Deployment Layer",
      format: "systemd unit file (.service)",
      latencyProfile: "No inherent latency impact — purely a process-lifecycle concern"
    },
    references: [
      "https://www.freedesktop.org/software/systemd/man/systemd.service.html",
      "https://spec.modelcontextprotocol.io/specification/basic/transports/"
    ]
  },
  {
    slug: "mcp-pm2-process-manager",
    term: "MCP Server with PM2",
    definition: "PM2 is a Node.js process manager commonly used to keep a Node/TypeScript-based remote MCP server running in production, providing automatic restarts, log management, and zero-downtime reloads without needing to write a systemd unit by hand.",
    detailedExplanation: "For teams whose MCP server is written in Node.js or TypeScript, PM2 offers a lighter-weight alternative to systemd that lives entirely inside the Node ecosystem — installed via npm, configured through a simple `ecosystem.config.js` file, and managed with commands like `pm2 start`, `pm2 restart`, and `pm2 logs`. It handles the same core job as systemd (restart on crash, start on boot via `pm2 startup`), plus Node-specific conveniences like cluster mode for running multiple instances behind PM2's built-in load balancer, and `pm2 reload` for restarting a server without dropping in-flight connections.",
    keyTakeaways: [
      "A Node-ecosystem alternative to systemd for keeping a remote MCP server alive.",
      "Configured via ecosystem.config.js rather than a systemd unit file.",
      "Supports cluster mode for running multiple server instances with built-in load balancing.",
      "pm2 startup + pm2 save replicates systemd's 'start on boot' behavior for Node processes."
    ],
    useCase: "A TypeScript MCP server is deployed to a VPS and managed with PM2 in cluster mode, running four instances behind PM2's load balancer to handle concurrent client connections.",
    technicalDetails: {
      protocolLayer: "Process Supervision / Deployment Layer",
      format: "PM2 ecosystem.config.js + PM2 daemon",
      latencyProfile: "No inherent latency impact — cluster mode can improve throughput under concurrent load"
    },
    references: [
      "https://pm2.keymetrics.io/docs/usage/quick-start/",
      "https://spec.modelcontextprotocol.io/specification/basic/transports/"
    ]
  },
  {
    slug: "indic-language-mcp-server",
    term: "Indic Language MCP Server (Local, Offline)",
    definition: "A local MCP server backed by an open-weight model with genuine Hindi, Tamil, or other Indic-language capability, run entirely on local hardware via Ollama so no text ever leaves the machine — distinct from routing Indic-language requests through a general-purpose hosted model.",
    detailedExplanation: "Two separate tool categories get conflated here and shouldn't be: encoder models like AI4Bharat's IndicBERT and IndicTrans2 (published on Hugging Face) are built for classification, embeddings, and translation — they are not chat/generation models and are not run through Ollama, which serves decoder-only generative models in GGUF format. For a local, offline, generative Indic-language MCP server, the practical path today is a genuinely multilingual generative model available in Ollama's own library — for example the Sarvam model family ('Multilingual Indian LLM, converted and packaged for Ollama'), pulled and run the same way as any other local Ollama model, with an MCP server layered on top the same way it would be for an English-only local model. For translation or classification tasks specifically, AI4Bharat's IndicTrans2/IndicBERT are better fits, but they run through Hugging Face's transformers library inside a Python MCP server, not through Ollama.",
    keyTakeaways: [
      "AI4Bharat's IndicBERT/IndicTrans2 are encoder/translation models on Hugging Face, not Ollama-compatible chat models.",
      "For local generative Hindi/Indic chat, Ollama's own library includes real multilingual Indian models (e.g. the Sarvam family).",
      "Running locally means no request text leaves the machine — relevant for DPDP-sensitive workloads.",
      "Translation/classification tasks and generative chat tasks call for different models and different serving stacks; don't assume one tool runs both."
    ],
    useCase: "A support tool needs to summarize Hindi-language customer messages without sending any of that text to a third-party API. It runs a Sarvam model locally via Ollama, with a minimal MCP server exposing a single summarize tool over stdio.",
    technicalDetails: {
      protocolLayer: "Model Backend / Inference Layer",
      format: "Local Ollama REST API (for generation) or Hugging Face transformers (for AI4Bharat's translation/classification models)",
      latencyProfile: "Local hardware-bound, same profile as any other Ollama-served model"
    },
    references: [
      "https://ollama.com/search?q=indic",
      "https://ai4bharat.iitm.ac.in"
    ]
  }
];
