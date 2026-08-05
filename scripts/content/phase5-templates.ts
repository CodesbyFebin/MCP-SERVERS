#!/usr/bin/env node
/**
 * Phase 5 — Template System
 * Defines deterministic templates for each page type.
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const TEMPLATES_DIR = path.join(ROOT, "scripts", "content", "templates");

const templates = {
  tutorial: {
    name: "Tutorial",
    sections: [
      "Overview",
      "Prerequisites",
      "Architecture",
      "Installation",
      "Configuration",
      "Examples",
      "Deployment",
      "Security",
      "Performance",
      "Troubleshooting",
      "FAQ",
      "Related",
      "References",
    ],
    generate: (title: string) => `# ${title}\n\n## Overview\n\n${title} provides a comprehensive guide to implementing Model Context Protocol solutions. This tutorial covers everything from initial setup to production deployment.\n\n## Prerequisites\n\n- Node.js 18+\n- npm or yarn\n- Basic understanding of MCP\n- API keys for relevant services\n\n## Architecture\n\nThe MCP architecture consists of clients, servers, and transports. Understanding these components is essential for building robust integrations.\n\n## Installation\n\n\`\`\`bash\nnpm install mcp-server\n\`\`\`\n\n## Configuration\n\n\`\`\`json\n{\n  "mcpServers": {\n    "example": {\n      "command": "npx",\n      "args": ["-y", "mcp-server-example"]\n    }\n  }\n}\n\`\`\`\n\n## Examples\n\nSee the code examples throughout this guide for practical implementations.\n\n## Deployment\n\nDeploy to your preferred platform: Vercel, AWS, GCP, Azure, or self-hosted.\n\n## Security\n\n- Use environment variables for secrets\n- Implement proper authentication\n- Enable HTTPS\n- Regular security audits\n\n## Performance\n\n- Optimize bundle size\n- Implement caching\n- Monitor response times\n- Use connection pooling\n\n## Troubleshooting\n\nCommon issues and solutions are covered in the FAQ section below.\n\n## FAQ\n\nSee the FAQ section below.\n\n## Related\n\n- [MCP Overview](/topics/what-is-mcp)\n- [MCP Security](/topics/mcp-security-best-practices)\n\n## References\n\n- [MCP Specification](https://modelcontextprotocol.io)\n- [MCP SDK Documentation](https://github.com/modelcontextprotocol)\n`,
  },

  comparison: {
    name: "Comparison",
    sections: [
      "Overview",
      "Feature Table",
      "Pros",
      "Cons",
      "Architecture",
      "Performance",
      "Security",
      "Pricing",
      "When to Choose",
      "Alternatives",
      "FAQ",
    ],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nThis comparison examines two popular MCP solutions across features, performance, security, pricing, and real-world suitability.\n\n## Feature Table\n\n| Feature | Option A | Option B |\n|---------|----------|----------|\n| Core Features | ✅ | ✅ |\n| Integration | ✅ | ✅ |\n| Performance | High | Medium |\n| Security | Enterprise | Standard |\n| Pricing | $$ | $ |\n\n## Pros\n\n**Option A:**\n- Comprehensive feature set\n- Enterprise support\n- Strong security\n\n**Option B:**\n- Lower cost\n- Easier to use\n- Faster setup\n\n## Cons\n\n**Option A:**\n- Higher cost\n- Steeper learning curve\n\n**Option B:**\n- Limited features\n- Less support\n\n## Architecture\n\nBoth solutions follow the MCP specification but implement it differently.\n\n## Performance\n\nBenchmarks show comparable performance for most workloads.\n\n## Security\n\nBoth offer strong security, but Option A has more enterprise features.\n\n## Pricing\n\n- Option A: $XX/month\n- Option B: $X/month\n\n## When to Choose\n\nChoose Option A for enterprise, Option B for startups.\n\n## Alternatives\n\n- Option C\n- Option D\n\n## FAQ\n\nSee FAQ section below.\n`,
  },

  glossary: {
    name: "Glossary",
    sections: ["Definition", "Purpose", "Architecture", "Examples", "Related Concepts", "References"],
    generate: (title: string) => `# ${title}\n\n## Definition\n\n${title} is a key concept in the Model Context Protocol ecosystem.\n\n## Purpose\n\nUnderstanding ${title} is essential for building effective MCP integrations.\n\n## Architecture\n\nThe architecture of ${title} involves multiple components working together.\n\n## Examples\n\nPractical examples of ${title} in action.\n\n## Related Concepts\n\n- [MCP Overview](/topics/what-is-mcp)\n- [MCP Architecture](/topics/mcp-architecture)\n\n## References\n\n- [MCP Specification](https://modelcontextprotocol.io)\n`,
  },

  integration: {
    name: "Integration Guide",
    sections: ["Overview", "Prerequisites", "Setup", "Configuration", "Examples", "Testing", "Deployment", "Troubleshooting", "FAQ"],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nThis guide shows how to integrate ${title} with your MCP workflow.\n\n## Prerequisites\n\n- MCP client configured\n- API credentials\n- Network access\n\n## Setup\n\nStep-by-step setup instructions.\n\n## Configuration\n\n\`\`\`json\n{\n  "mcpServers": {\n    "integration": {\n      "command": "npx",\n      "args": ["-y", "mcp-server-integration"]\n    }\n  }\n}\n\`\`\`\n\n## Examples\n\nSee examples below.\n\n## Testing\n\nTest your integration before deploying.\n\n## Deployment\n\nDeploy to production.\n\n## Troubleshooting\n\nCommon issues and solutions.\n\n## FAQ\n\nFrequently asked questions.\n`,
  },

  troubleshooting: {
    name: "Troubleshooting",
    sections: ["Overview", "Common Issues", "Diagnostics", "Solutions", "Prevention", "FAQ"],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nThis troubleshooting guide helps you resolve common issues with ${title}.\n\n## Common Issues\n\n1. Connection failures\n2. Authentication errors\n3. Performance issues\n4. Configuration problems\n\n## Diagnostics\n\nSteps to diagnose the issue.\n\n## Solutions\n\nStep-by-step solutions for each issue.\n\n## Prevention\n\nHow to prevent these issues in the future.\n\n## FAQ\n\nFrequently asked questions.\n`,
  },

  "best-list": {
    name: "Best List",
    sections: ["Overview", "Criteria", "Top Picks", "Honorable Mentions", "How to Choose", "FAQ"],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nCurated list of the best MCP solutions.\n\n## Criteria\n\nHow we evaluated and selected these solutions.\n\n## Top Picks\n\n1. **Best Overall** - Solution A\n2. **Best for Beginners** - Solution B\n3. **Best for Enterprise** - Solution C\n\n## Honorable Mentions\n\nOther notable solutions.\n\n## How to Choose\n\nGuidance on selecting the right solution for your needs.\n\n## FAQ\n\nFrequently asked questions.\n`,
  },

  "case-study": {
    name: "Case Study",
    sections: ["Overview", "Challenge", "Solution", "Implementation", "Results", "Lessons Learned", "FAQ"],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nReal-world case study of MCP implementation.\n\n## Challenge\n\nThe problem that needed solving.\n\n## Solution\n\nHow MCP addressed the challenge.\n\n## Implementation\n\nStep-by-step implementation details.\n\n## Results\n\nQuantifiable outcomes and improvements.\n\n## Lessons Learned\n\nKey takeaways from the experience.\n\n## FAQ\n\nFrequently asked questions.\n`,
  },

  enterprise: {
    name: "Enterprise Guide",
    sections: ["Overview", "Enterprise Requirements", "Architecture", "Security", "Compliance", "Deployment", "Governance", "ROI", "Case Studies", "FAQ"],
    generate: (title: string) => `# ${title}\n\n## Overview\n\nEnterprise guide to ${title}.\n\n## Enterprise Requirements\n\nScalability, security, compliance, and support.\n\n## Architecture\n\nEnterprise-grade architecture patterns.\n\n## Security\n\nSecurity best practices for enterprise.\n\n## Compliance\n\nGDPR, SOC 2, HIPAA, and other compliance requirements.\n\n## Deployment\n\nEnterprise deployment strategies.\n\n## Governance\n\nGovernance and oversight frameworks.\n\n## ROI\n\nReturn on investment analysis.\n\n## Case Studies\n\nEnterprise success stories.\n\n## FAQ\n\nFrequently asked questions.\n`,
  },
};

function saveTemplates() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
  }
  
  const indexPath = path.join(TEMPLATES_DIR, "index.ts");
  const indexContent = `export const PAGE_TEMPLATES = ${JSON.stringify(templates, null, 2)} as const;\n\nexport type TemplateName = keyof typeof PAGE_TEMPLATES;\n`;
  
  fs.writeFileSync(indexPath, indexContent);
  console.log(`[phase5] Templates saved to: ${indexPath}`);
  
  // Save individual templates
  for (const [name, template] of Object.entries(templates)) {
    const templatePath = path.join(TEMPLATES_DIR, `${name}.md`);
    fs.writeFileSync(templatePath, template.generate(name));
    console.log(`[phase5] Template saved: ${templatePath}`);
  }
}

console.log("[phase5] Defining deterministic template system...");
saveTemplates();
console.log(`[phase5] Defined ${Object.keys(templates).length} page templates`);
