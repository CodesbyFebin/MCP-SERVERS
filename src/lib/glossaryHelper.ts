import { glossaryTerms } from "../data/glossary";

/**
 * Automatically parses HTML content and injects links to the glossary terms.
 * It ignores text inside <pre>, <code>, <a>, and other interactive tags.
 * It only replaces the first occurrence of each glossary term to prevent visual clutter and maintain clean SEO linking ratios.
 */
export function injectGlossaryLinks(htmlContent: string): string {
  if (!htmlContent) return "";

  // Set up matches for terms. Order is important (match longer phrases first)
  const termMatches = [
    { pattern: /\bModel Context Protocol\b/i, slug: "model-context-protocol" },
    { pattern: /\bJSON-RPC 2\.0\b/i, slug: "json-rpc" },
    { pattern: /\bJSON-RPC\b/i, slug: "json-rpc" },
    { pattern: /\bStdIO transport\b/i, slug: "stdio" },
    { pattern: /\bStdIO\b/i, slug: "stdio" },
    { pattern: /\bstdio\b/i, slug: "stdio" },
    { pattern: /\bSSE transport\b/i, slug: "sse" },
    { pattern: /\bSSE\b/i, slug: "sse" },
    { pattern: /\bsse\b/i, slug: "sse" },
    { pattern: /\bMCP Server\b/i, slug: "mcp-server" },
    { pattern: /\bMCP Client\b/i, slug: "mcp-client" },
    { pattern: /\bMCP Gateway\b/i, slug: "gateway" },
    { pattern: /\bMCP Tools\b/i, slug: "tool" },
    { pattern: /\bMCP Tool\b/i, slug: "tool" },
    { pattern: /\bMCP Resources\b/i, slug: "resource" },
    { pattern: /\bMCP Resource\b/i, slug: "resource" },
    { pattern: /\bMCP Prompts\b/i, slug: "prompt" },
    { pattern: /\bMCP Prompt\b/i, slug: "prompt" }
  ];

  // We want to keep track of which terms we've already linked so we only link them once.
  const linkedSlugs = new Set<string>();

  // Regex to split string by HTML tags.
  // This matches <tagName ...> or </tagName> and captures them
  const tagRegex = /(<\/?[a-zA-Z0-9]+(?:\s+[^>]*?)?>)/g;
  const parts = htmlContent.split(tagRegex);

  let inIgnoredTag = false;
  let ignoredTagStack: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // If it's an HTML tag
    if (part.startsWith("<") && part.endsWith(">")) {
      const lowerPart = part.toLowerCase();
      const tagNameMatch = lowerPart.match(/^<\/?([a-z0-9]+)/);
      if (tagNameMatch) {
        const tagName = tagNameMatch[1];
        const isClosing = lowerPart.startsWith("</");

        // We want to ignore code blocks, header blocks, and anchor tags
        if (["pre", "code", "a", "h1", "h2", "h3", "h4", "button", "script", "style"].includes(tagName)) {
          if (isClosing) {
            const index = ignoredTagStack.lastIndexOf(tagName);
            if (index !== -1) {
              ignoredTagStack.splice(index, 1);
            }
          } else {
            ignoredTagStack.push(tagName);
          }
          inIgnoredTag = ignoredTagStack.length > 0;
        }
      }
      continue;
    }

    // It is a text node. Only process if we are not inside an ignored tag
    if (!inIgnoredTag && part.trim().length > 0) {
      let processedText = part;

      for (const { pattern, slug } of termMatches) {
        if (linkedSlugs.has(slug)) continue;

        // Perform find
        const match = processedText.match(pattern);
        if (match && match.index !== undefined) {
          const matchedTerm = match[0];
          // Replace only the first occurrence of this term in this text node
          const replacement = `<a href="/glossary/${slug}" class="text-cyan-400 hover:underline hover:text-cyan-300 font-semibold border-b border-cyan-500/30 pb-0.5 transition-colors" title="View glossary definition of ${matchedTerm}">${matchedTerm}</a>`;
          
          processedText = 
            processedText.substring(0, match.index) + 
            replacement + 
            processedText.substring(match.index + matchedTerm.length);
          
          // Mark as linked so we don't link it again anywhere else in the document
          linkedSlugs.add(slug);
        }
      }

      parts[i] = processedText;
    }
  }

  return parts.join("");
}
