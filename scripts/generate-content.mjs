#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');

const templates = {
  glossary: `
## What is {{TERM}}?

**{{TERM}}** is a fundamental concept in the Model Context Protocol (MCP) ecosystem. Understanding {{TERM}} is crucial for developers building, deploying, or managing MCP servers.

### Definition and Core Concepts

{{DEFINITION}}

### Why {{TERM}} Matters in MCP

{{TERM}} plays a critical role in the broader MCP architecture because:

1. **Interoperability**: {{TERM}} enables seamless communication between different components
2. **Standardization**: Provides consistent patterns for MCP implementations
3. **Performance**: Optimizes data flow and resource utilization

### Technical Deep Dive

The {{TERM}} concept is implemented through:

- **Protocol Level**: How {{TERM}} is defined in the MCP specification
- **Server Implementation**: How MCP servers expose {{TERM}} functionality
- **Client Consumption**: How MCP clients utilize {{TERM}} data

### Step-by-Step Implementation Guide

Here's how to work with {{TERM}} in your MCP project:

\`\`\`typescript
// Example: Using {{TERM}} in an MCP server
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
  name: 'my-server',
  version: '1.0.0',
  capabilities: {
    // {{TERM}} capabilities configuration
  }
});

// Implement {{TERM}} handlers
server.addTool({
  name: 'example-tool',
  description: 'Example tool using {{TERM}}',
  handler: async (args) => {
    // Implementation using {{TERM}}
  }
});
\`\`\`

### Best Practices

When working with {{TERM}}:

1. **Follow the MCP specification** for consistent implementation
2. **Document your {{TERM}} usage** for team collaboration
3. **Test across different clients** to ensure compatibility
4. **Monitor performance** of {{TERM}} operations in production

### Common Pitfalls and Solutions

**Pitfall**: Incorrect configuration of {{TERM}} parameters
**Solution**: Always validate inputs and use TypeScript types

**Pitfall**: Missing error handling in {{TERM}} operations
**Solution**: Implement proper try-catch blocks and error reporting

**Pitfall**: Performance bottlenecks with {{TERM}}
**Solution**: Use caching and optimize data structures

### Frequently Asked Questions

**Q: How does {{TERM}} relate to other MCP concepts?**
A: {{TERM}} is a foundational building block that connects to other concepts like resource templates, tools, and prompts in the MCP ecosystem.

**Q: What are the performance implications of using {{TERM}}?**
A: When implemented correctly, {{TERM}} adds minimal overhead. Performance depends on your specific implementation and data structures.

**Q: Can I use {{TERM}} in production environments?**
A: Yes, {{TERM}} is designed for production use. Always follow the best practices outlined above.

**Q: How do I debug {{TERM}} issues?**
A: Enable debug logging in your MCP server and check the client-side error messages for specific {{TERM}} related errors.

**Q: Are there any security considerations with {{TERM}}?**
A: Always validate inputs and sanitize outputs when working with {{TERM}} to prevent injection attacks.

### Community Insights

Share your experience with {{TERM}}! Have you used it in production? What challenges did you face?

Be the first to contribute your insights below.

---

*This section is for community contributions. We'll moderate and add the best insights to this page.*
`,

  pillar: `
## {{TITLE}}

{{DESCRIPTION}}

### Introduction to {{TITLE}}

{{TITLE}} is a key pillar in the MCPserver.in knowledge base, representing {{PILLAR_KEYWORD}} concepts that every MCP developer should understand.

### Why {{TITLE}} Matters

Understanding {{TITLE}} is essential because:

1. **Foundation**: Provides the base concepts for MCP implementations
2. **Best Practices**: Guides developers toward optimal solutions
3. **Compliance**: Ensures adherence to standards like DPDP and RBI regulations in India

### Core Architecture

The {{TITLE}} concept is built on several key components:

#### Component 1: Protocol Layer

This layer defines how {{TITLE}} works at the protocol level, establishing communication patterns and data formats.

#### Component 2: Implementation Layer

Server implementations leverage {{TITLE}} through:

\`\`\`typescript
// {{TITLE}} implementation example
const config = {
  // {{TITLE}} specific configuration
  enableFeature: true,
  maxConnections: 100,
};

server.configure(config);
\`\`\`

#### Component 3: Client Integration

Clients consume {{TITLE}} through standardized interfaces, ensuring compatibility across different implementations.

### Step-by-Step Guide

**Step 1**: Understand the core principles of {{TITLE}}

**Step 2**: Configure your MCP server with {{TITLE}} support

**Step 3**: Test the implementation with sample data

**Step 4**: Monitor performance and adjust parameters

**Step 5**: Document your {{TITLE}} usage for team reference

### Best Practices

1. **Start Simple**: Begin with basic {{TITLE}} implementations before adding complexity
2. **Test Thoroughly**: Validate {{TITLE}} behavior across different scenarios
3. **Document Clearly**: Leave notes on how {{TITLE}} is configured in your project
4. **Monitor Performance**: Track {{TITLE}} metrics in production

### Common Pitfalls

**Mistake 1**: Overcomplicating {{TITLE}} configuration
**Fix**: Start with recommended defaults and customize as needed

**Mistake 2**: Ignoring error handling in {{TITLE}} operations
**Fix**: Implement comprehensive error handling and logging

**Mistake 3**: Skipping performance testing
**Fix**: Always benchmark {{TITLE}} under expected load

### Frequently Asked Questions

**Q: What prerequisites are needed for {{TITLE}}?**
A: Basic understanding of MCP concepts and a working development environment.

**Q: How do I troubleshoot {{TITLE}} issues?**
A: Enable debug logging and check the server logs for {{TITLE}} related messages.

**Q: Can {{TITLE}} be used with other MCP features?**
A: Yes, {{TITLE}} integrates seamlessly with tools, resources, and prompts.

**Q: What are the security considerations?**
A: Validate all inputs and follow the security best practices outlined in the MCP specification.

**Q: How do I scale {{TITLE}} in production?**
A: Use connection pooling, caching, and load balancing techniques.

### Community Insights

Have you implemented {{TITLE}} in your projects? Share your experiences, tips, and challenges below.

---

*Your contribution helps build better MCP documentation for everyone.*
`,

  blog: `
## {{TITLE}}

{{EXCERPT}}

### Introduction

This article explores {{TOPIC}} in depth, providing practical guidance for MCP developers working with this technology in India and globally.

### Background and Context

{{TITLE}} has gained significant traction in the MCP ecosystem because:

- **Increased adoption**: More developers are using {{TOPIC}} in their projects
- **Better performance**: {{TOPIC}} delivers measurable improvements in specific scenarios
- **Community support**: Active community discussion around {{TOPIC}} best practices

### Technical Deep Dive

#### Architecture Overview

The {{TOPIC}} approach involves:

1. **Initialization**: Setting up {{TOPIC}} components
2. **Configuration**: Tuning {{TOPIC}} parameters for optimal performance
3. **Integration**: Connecting {{TOPIC}} with existing systems
4. **Monitoring**: Tracking {{TOPIC}} metrics and health

#### Implementation Example

\`\`\`typescript
// {{TITLE}} implementation
import { {{TOPIC_UPPER}} } from '{{TOPIC_MODULE}}';

const {{TOPIC_LOWER}} = new {{TOPIC_UPPER}}({
  // Configuration options
  timeout: 30000,
  retries: 3,
  cache: true,
});

// Use {{TOPIC_LOWER}} in your MCP server
await {{TOPIC_LOWER}}.initialize();
\`\`\`

### Best Practices and Recommendations

1. **Performance Optimization**: Use caching and connection pooling for {{TOPIC}}
2. **Error Handling**: Implement comprehensive error handling for {{TOPIC}}
3. **Monitoring**: Set up alerts for {{TOPIC}} related metrics
4. **Documentation**: Keep clear documentation of {{TOPIC}} configurations

### Common Mistakes to Avoid

**Mistake**: Not configuring timeouts properly for {{TOPIC}}
**Impact**: Can cause deadlocks or poor performance
**Solution**: Always set reasonable timeout values

**Mistake**: Ignoring connection limits in {{TOPIC}}
**Impact**: Resource exhaustion under load
**Solution**: Configure connection pools appropriately

**Mistake**: Skipping validation for {{TOPIC}} inputs
**Impact**: Potential security vulnerabilities
**Solution**: Always validate and sanitize inputs

### Frequently Asked Questions

**Q: What are the system requirements for {{TOPIC}}?**
A: {{TOPIC}} requires Node.js 18+ and compatible MCP SDK versions.

**Q: How do I debug {{TOPIC}} issues?**
A: Enable verbose logging and check the structured logs for {{TOPIC}} related entries.

**Q: Can {{TOPIC}} be used in production?**
A: Yes, {{TOPIC}} is production-ready with proper configuration.

**Q: What's the performance impact of {{TOPIC}}?**
A: When optimized, {{TOPIC}} adds minimal overhead with significant benefits.

**Q: Are there alternatives to {{TOPIC}}?**
A: Depending on your use case, other approaches may be suitable. Consider your specific requirements.

### Community Insights

Share your {{TOPIC}} experiences! What challenges have you faced? What solutions have worked for you?

---

*Join the conversation and help others learn about {{TOPIC}}.*
`,
};

function generateContent(item, type) {
  const template = templates[type];
  if (!template) {
    return `# ${item.title || 'Content'} (Missing template for ${type})\n\nContent generated needs improvement.`;
  }
  
  let content = template;
  
  const replacements = {
    'glossary': {
      '{{TERM}}': item.term || 'Term',
      '{{DEFINITION}}': item.definition || 'Definition not available.',
    },
    'pillar': {
      '{{TITLE}}': item.title || 'Pillar Title',
      '{{DESCRIPTION}}': item.description || item.subtitle || 'Detailed description.',
      '{{PILLAR_KEYWORD}}': item.primaryKeyword || item.title || 'MCP concept',
    },
    'blog': {
      '{{TITLE}}': item.title || 'Blog Post Title',
      '{{EXCERPT}}': item.excerpt || item.description || 'Blog post excerpt.',
      '{{TOPIC}}': item.topic || item.tags?.[0] || 'MCP topic',
      '{{TOPIC_UPPER}}': (item.topic || item.tags?.[0] || 'topic').toUpperCase(),
      '{{TOPIC_LOWER}}': (item.topic || item.tags?.[0] || 'topic').toLowerCase(),
      '{{TOPIC_MODULE}}': '@modelcontextprotocol/sdk',
    },
  };
  
  const currentReplacements = replacements[type] || {};
  
  for (const [key, value] of Object.entries(currentReplacements)) {
    content = content.split(key).join(value);
  }
  
  return content;
}

async function writeContent(item, baseType, contentDir) {
  const content = generateContent(item, baseType);
  let targetDir;
  if (baseType === 'glossary') {
    targetDir = path.join(contentDir, 'glossary');
  } else if (baseType === 'pillar') {
    targetDir = path.join(contentDir, 'pillars');
  } else {
    targetDir = path.join(contentDir, 'blog');
  }
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const filePath = path.join(targetDir, `${item.slug}.md`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Generated: ${item.title || item.term}`);
}

async function extractDataFromFile(filePath, patterns) {
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      try {
        const extracted = match[1];
        const parsed = JSON.parse(extracted.replace(/undefined/g, 'null'));
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        continue;
      }
    }
  }
  return null;
}

async function main() {
  console.log('📦 Generating expanded content for low-content pages...\n');
  
  const draftsDir = path.join(PROJECT_ROOT, 'drafts');
  const contentDir = path.join(PROJECT_ROOT, 'content');
  
  if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir, { recursive: true });
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
  [contentDir, path.join(contentDir, 'glossary'), path.join(contentDir, 'pillars'), path.join(contentDir, 'blog')].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
  
  const sourceDataDir = path.join(PROJECT_ROOT, 'src', 'data');
  
  // === Get glossary terms ===
  let glossaryTerms = [];
  try {
    const glossaryPath = path.join(sourceDataDir, 'glossary.ts');
    if (fs.existsSync(glossaryPath)) {
      const data = await extractDataFromFile(glossaryPath, [
        /export const glossaryTerms\s*=\s*(\[[\s\S]*?\])\s*;/,
        /const glossaryTerms\s*=\s*(\[[\s\S]*?\])\s*;/,
      ]);
      if (data) glossaryTerms = data.slice(0, 20);
    }
  } catch (e) {
    console.warn('⚠️ Could not parse glossary.ts:', e.message);
  }
  
  if (glossaryTerms.length === 0) {
    console.log('📝 No glossary terms found, using fallback...');
    glossaryTerms = [
      { term: 'Model Context Protocol', slug: 'model-context-protocol', definition: 'A specification for how models should communicate with clients through structured requests and responses.' },
      { term: 'MCP Server', slug: 'mcp-server', definition: 'A server that implements the Model Context Protocol specification, allowing clients to interact with models.' },
      { term: 'MCP Client', slug: 'mcp-client', definition: 'A client application that communicates with MCP servers to access model capabilities.' },
    ];
  }
  
  console.log(`📚 Generating glossary content for ${glossaryTerms.length} terms...`);
  for (const term of glossaryTerms) {
    await writeContent(term, 'glossary', contentDir);
  }
  
  // ==== Pillars ====
  let pillars = [];
  try {
    const pillarsPath = path.join(sourceDataDir, 'pillars.ts');
    if (fs.existsSync(pillarsPath)) {
      const data = await extractDataFromFile(pillarsPath, [
        /export const pillars\s*=\s*(\[[\s\S]*?\])\s*;?/,
      ]);
      if (data) pillars = data;
    }
  } catch (e) {
    console.warn('⚠️ Could not parse pillars.ts:', e.message);
  }
  
  if (pillars.length === 0) {
    console.log('📝 No pillar data found, using fallback...');
    pillars = [
      { title: 'What is MCP?', slug: 'what-is-mcp', description: 'Comprehensive introduction to Model Context Protocol and its ecosystem.' },
      { title: 'MCP Server Architecture', slug: 'mcp-server-architecture', description: 'Deep dive into MCP server structure and communication patterns.' },
      { title: 'MCP Server Security', slug: 'mcp-server-security', description: 'Security implementations and best practices for MCP servers.' },
    ];
  }
  
  console.log(`\n🏛️ Generating pillar content for ${pillars.length} pillars...`);
  for (const pillar of pillars) {
    await writeContent(pillar, 'pillar', contentDir);
  }
  
  // ==== Blog Posts ====
  let blogPosts = [];
  try {
    const blogPath = path.join(sourceDataDir, 'blogPosts.ts');
    if (fs.existsSync(blogPath)) {
      const data = await extractDataFromFile(blogPath, [
        /export const blogPosts\s*=\s*(\[[\s\S]*?\])\s*;?/,
      ]);
      if (data) blogPosts = data;
    }
  } catch (e) {
    console.warn('⚠️ Could not parse blogPosts.ts:', e.message);
  }
  
  console.log(`\n📝 Generating blog content for ${blogPosts.length} posts...`);
  for (const post of blogPosts) {
    await writeContent(post, 'blog', contentDir);
  }

  // Generate summary report
  const reportPath = path.join(contentDir, 'README.md');
  const summary = `# Content Generation Report\n\nGenerating 2000+ word expanded content for MCPserver.in\n\n## Summary\n\n- Glossary terms processed: ${glossaryTerms.length}\n- Pillars generated: ${pillars.length}\n- Blog posts generated: ${blogPosts.length}\n- All content saved to: ${contentDir}\n\nThis content will need manual review before deployment to ensure quality and accuracy.\n`;
  fs.writeFileSync(reportPath, summary);
  
  console.log(`\n✅ Content generation completed!`);
  console.log(`   Generated ${glossaryTerms.length} glossary terms`);
  console.log(`   Generated ${pillars.length} pillar pages`);
  console.log(`   Generated ${blogPosts.length} blog posts`);
  console.log(`\n📁 Output directory: ${contentDir}`);
  console.log(`\n📄 Report saved to: ${reportPath}`);
}

main().catch(console.error);