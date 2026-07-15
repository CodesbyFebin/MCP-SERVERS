export interface FAQItem {
  question: string;
  answer: string;
}

export const coreFaqs: Record<string, FAQItem[]> = {
  "what-is-mcp": [
    {
      question: "What is Model Context Protocol (MCP)?",
      answer: "The Model Context Protocol (MCP) is an open-source standard designed by Anthropic to bridge the gap between Large Language Models (LLMs) and local or remote data sources. It allows AI clients like Claude Desktop, Cursor, or custom tools to safely connect with resources, tools, and prompts provided by independent servers."
    },
    {
      question: "Is Model Context Protocol open-source?",
      answer: "Yes, MCP is entirely open-source. The specification, client SDKs (for TypeScript, Python, Go, and more), and a large range of reference servers are licensed under permissive open-source licenses and hosted on GitHub for public contributions."
    },
    {
      question: "Why do we need MCP when we have REST APIs?",
      answer: "REST APIs are designed for humans and custom programmatic clients, requiring distinct orchestration code. MCP translates these services into standard schemas (prompts, resources, and tools) that LLMs can understand directly, enabling dynamic function calling without custom glue-code."
    },
    {
      question: "Which LLM clients support MCP today?",
      answer: "MCP is natively supported by Anthropic's Claude Desktop, Cursor IDE, Windsurf IDE, Zed Editor, Cline, and several custom command-line interfaces. Support is rapidly expanding to other platforms like ChatGPT, LibreChat, and LangChain."
    },
    {
      question: "How does MCP secure private server connections?",
      answer: "MCP utilizes secure local transports like standard input/output (Stdio) which never expose ports to the web, or encrypted remote transport protocols like Server-Sent Events (SSE) with standard token auth and custom proxy layers."
    }
  ],
  "mcp-server": [
    {
      question: "What is an MCP Server?",
      answer: "An MCP Server is an executable background process or microservice that registers with an MCP client and exposes capabilities (tools, prompts, resources) via JSON-RPC 2.0 messages."
    },
    {
      question: "Can I run an MCP server locally?",
      answer: "Yes! Most developers run MCP servers locally on their laptops via standard Stdio to let IDE extensions (like Cursor or Windsurf) inspect files, write scripts, or query local database folders instantly."
    },
    {
      question: "What languages can I use to write an MCP server?",
      answer: "The most popular languages for MCP development are TypeScript (Node.js) and Python, which have official SDKs. However, you can write an MCP server in Go, Rust, Java, or C++ using community-contributed libraries."
    }
  ],
  "mcp-server-hosting": [
    {
      question: "How does managed MCP hosting work?",
      answer: "Our managed platform automates container building from your Git repos, configures secure Server-Sent Events (SSE) gateways, provisions permanent HTTPS SSL certificates, and handles auto-scaling."
    },
    {
      question: "Is there a free tier for hosting MCP servers?",
      answer: "Yes, MCPserver.in offers a free-forever Developer tier that supports up to 3 active local/SSE connections with standard cold-boot latency — perfect for testing custom integrations."
    }
  ]
};

// Programmatic contextual generator for 500+ contextually embedded FAQs
export function getFaqsForPage(slug: string, title: string, category?: string): FAQItem[] {
  // If we have manual FAQs, return them
  if (coreFaqs[slug]) {
    return coreFaqs[slug];
  }

  // Generate high-fidelity contextual FAQs programmatically
  const isServer = slug.endsWith("-mcp-server");
  const entityName = title.replace(" MCP Server", "").replace("Understanding ", "").replace("Guide", "").trim();

  if (isServer) {
    return [
      {
        question: `How do I connect the ${entityName} MCP Server to my AI client?`,
        answer: `To connect ${entityName} to your client (like Claude Desktop or Cursor), add the server command to your configuration file (e.g., 'claude_desktop_config.json'). You can run it locally using npx or deploy it to our secure managed cloud at MCPserver.in with one-click.`
      },
      {
        question: `What security controls are available on the ${entityName} integration?`,
        answer: `The ${entityName} MCP server keeps your API credentials secured in environment variables on your host or deployed cluster. It executes tools in a sandboxed runtime, requiring user confirmation for write, delete, or external publishing actions.`
      },
      {
        question: `Does the ${entityName} MCP Server support real-time data lookups?`,
        answer: `Yes! By utilizing Model Context Protocol Resources, the ${entityName} server queries active API endpoints on-demand, returning live context directly to the LLM context window without relying on outdated web caches.`
      },
      {
        question: `What are the typical use cases for the ${entityName} AI connector?`,
        answer: `Common use cases include automating ${entityName} data lookups, pulling active report profiles, updating statuses directly from chat inputs, and synchronizing project files with development environments.`
      },
      {
        question: `What is the cost of running the ${entityName} MCP integration?`,
        answer: `Running the server locally on your machine is 100% free. If you deploy it to our fully-managed hosting in India for team access, it is covered under the Developer tier (₹999/mo) or our Pro plan with low-latency edge scaling.`
      }
    ];
  }

  // Default topic FAQs
  return [
    {
      question: `What is the primary objective of ${title}?`,
      answer: `The goal of ${title} is to streamline how developers construct, deploy, or secure Model Context Protocol endpoints, ensuring autonomous AI models have safe, structured access to essential tools.`
    },
    {
      question: `What are the industry best practices for ${title}?`,
      answer: `Best practices include keeping schemas simple and explicit, handling transport errors gracefully, validating inputs using schemas like Zod, and securing environment secrets inside isolated secure layers.`
    },
    {
      question: `Can I implement ${title} inside an enterprise network?`,
      answer: `Absolutely. You can implement ${title} inside private networks or coordinate access through a central Gateway (like our enterprise server at MCPserver.in) to guarantee compliance with SOC2, GDPR, and Indian data security directives.`
    },
    {
      question: `What are the common mistakes when configuring ${title}?`,
      answer: `Common mistakes include hardcoding credentials, polluting standard output (which breaks Stdio protocol execution), exposing unfiltered database ports to the public internet, and using vague tool descriptors that confuse LLM models.`
    },
    {
      question: `Where can I find sample boilerplates for ${title}?`,
      answer: `You can access free starters and templates directly in our official Docs tab, or leverage our interactive MCP Playground tool to test and validate your live schemas in seconds.`
    }
  ];
}
