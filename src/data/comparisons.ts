export interface Comparison {
  slug: string;
  title: string;
  vs: string;
  shortAnswer: string;
  prosA: string[];
  prosB: string[];
  consA: string[];
  consB: string[];
  verdict: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "mcp-vs-api",
    title: "Model Context Protocol (MCP) vs Traditional REST APIs",
    vs: "REST APIs",
    shortAnswer: "While traditional REST APIs provide unstructured data meant for custom software apps, MCP wraps APIs in semantic descriptors (prompts, resources, and tools) optimized specifically for Large Language Models, eliminating custom client integration code.",
    prosA: [
      "No custom glue-code required for each LLM",
      "Unified JSON-RPC protocol schema",
      "Dynamic contextual resource maps"
    ],
    prosB: [
      "Industry standard with billions of endpoints",
      "High-throughput binary files transfer",
      "Decades of robust debugging tools"
    ],
    consA: [
      "Slight protocol abstraction layer latency",
      "Younger ecosystem of conformant tools"
    ],
    consB: [
      "Requires manual SDK/wrapping logic for every model",
      "High probability of AI hallucinations on raw paths"
    ],
    verdict: "Use REST APIs for server-to-server bulk data transfers, but leverage MCP to expose those endpoints safely and directly to interactive AI agents."
  },
  {
    slug: "mcp-vs-function-calling",
    title: "Model Context Protocol vs Proprietary Function Calling",
    vs: "Function Calling",
    shortAnswer: "Function calling is a model-specific, closed-source API capability provided by individual LLM vendors. MCP is an open-source, client-server standard that abstractly exposes tools to any AI model, offering complete code reusability across providers.",
    prosA: [
      "Write once, run on Claude, Cursor, ChatGPT, etc.",
      "Clear separation of tools server and orchestration client",
      "Includes resource stream models out-of-the-box"
    ],
    prosB: [
      "Slightly smaller payload footprint on native models",
      "Longer historical optimization on single platforms",
      "Direct integration inside provider dashboards"
    ],
    consA: [
      "Requires client implementation of MCP protocol hooks",
      "Requires basic understanding of JSON-RPC transport layers"
    ],
    consB: [
      "Hard vendor lock-in to specific provider APIs",
      "No built-in schema standard for resources and passive data"
    ],
    verdict: "MCP is the clear evolution of function calling, taking a proprietary API feature and turning it into an open-industry protocol standard."
  },
  {
    slug: "mcp-vs-plugins",
    title: "Model Context Protocol vs Deprecated ChatGPT Plugins",
    vs: "ChatGPT Plugins",
    shortAnswer: "ChatGPT plugins were restricted webhooks hosted in a proprietary store, whereas MCP is a lightweight, bidirectional, open transport standard allowing both local command executions and secure remote SSE connections.",
    prosA: [
      "Works with local files, terminals, and private databases",
      "Standard open specification not owned by single vendor",
      "Bidirectional: supports both client-pull and server-push"
    ],
    prosB: [
      "Very simple HTTP JSON configurations in 2023",
      "Direct exposure inside ChatGPT consumer market"
    ],
    consA: [
      "Requires launching servers on standard Stdio or SSE",
      "No centralized consumer app store currently"
    ],
    consB: [
      "Fully deprecated and retired by OpenAI",
      "SaaS providers had to host and manage heavy web APIs"
    ],
    verdict: "ChatGPT plugins pioneered web tools for LLMs, but MCP perfected the architecture by creating a robust, distributed, multi-transport standard."
  }
];
