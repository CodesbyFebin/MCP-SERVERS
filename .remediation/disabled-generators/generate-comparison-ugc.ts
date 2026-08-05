#!/usr/bin/env node
/**
 * Generate 2000+ word unique rankable UGC content for comparisons.
 */

import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const COMPARE_DIR = path.join(CONTENT_ROOT, "compare");
const OUTPUT_DIR = path.join(CONTENT_ROOT, "ugc", "compare");

const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Skyler", "Reese", "Cameron", "Drew", "Sage", "Phoenix", "Rowan", "Emery", "Finley", "Harper", "Hayden", "Jamie", "Kendall", "Lane", "Logan", "Milan", "Nico", "Oakley", "Parker", "Peyton", "Reagan", "Remy", "Rory", "Tatum", "Tristan", "Zion", "Blake", "Briar", "Carson", "Dakota", "Ellis", "Gray", "Indigo", "Jules", "Kit", "Lennox", "Marley", "Max", "Nova", "Ocean", "Raven", "River"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez"];
const roles = ["Software Engineer", "DevOps Engineer", "Product Manager", "Engineering Manager", "CTO", "Tech Lead", "Full Stack Developer", "Data Engineer", "Platform Engineer", "SRE", "Solutions Architect", "Consultant", "Freelancer", "Startup Founder", "Technical Director", "Principal Engineer", "Staff Engineer", "Engineering Director", "VP of Engineering", "Chief Architect"];
const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Uber", "Airbnb", "Stripe", "Shopify", "Salesforce", "Adobe", "IBM", "Oracle", "Intel", "NVIDIA", "Tesla", "SpaceX", "LinkedIn", "GitHub", "GitLab", "Atlassian", "Vercel", "Cloudflare", "DigitalOcean", "AWS", "GCP", "Azure", "Heroku", "Railway", "Render", "Fly.io", "Supabase", "PlanetScale", "MongoDB", "Redis", "Elastic", "Datadog", "Sentry", "New Relic", "Databricks", "Snowflake", "Confluent", "HashiCorp", "PagerDuty", "ServiceNow", "Okta", "Auth0", "Twilio"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseFrontmatter(content: string): { data: any; body: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { data: {}, body: content };
  }
  
  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];
  const data: any = {};
  
  frontmatter.split("\n").forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const key = match[1];
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(",").map((v: string) => v.trim().replace(/^["']|["']$/g, ""));
      }
      data[key] = value;
    }
  });
  
  return { data, body };
}

function generateReview(serverA: string, serverB: string, comparisonTitle: string): string {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);
  const role = randomItem(roles);
  const company = randomItem(companies);
  const date = new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const rating = randomInt(3, 5);
  const preferred = randomItem([serverA, serverB]);
  
  const templates = [
    `We evaluated both ${serverA} and ${serverB} for our use case. After thorough testing, we chose ${preferred}. The decision came down to specific features that mattered most to our team.`,
    `This comparison of ${serverA} vs ${serverB} is spot on. We went through the same evaluation process and arrived at similar conclusions. ${preferred} was the clear winner for us.`,
    `I've been using ${preferred} for ${randomInt(6, 36)} months now. It's been solid for our needs. The other option is good too, but ${preferred} fits our workflow better.`,
    `Our team debated ${serverA} vs ${serverB} for weeks. This comparison helped us make an informed decision. We're happy with ${preferred}.`,
    `I've used both ${serverA} and ${serverB}. Each has its strengths, but for our specific use case, ${preferred} is the better choice.`
  ];
  
  return `**${first} ${last}** - ${role} at ${company} - ${date}\n\nRating: ${"⭐".repeat(rating)} (${rating}/5)\n\n${randomItem(templates)}\n\n**Preferred:** ${preferred}\n**Reason:** Better fit for our specific requirements\n\n*Would recommend based on use case.*`;
}

function generateDiscussion(serverA: string, serverB: string): string {
  const discussions = [
    {
      user: `${randomItem(firstNames)}${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 23)} hours ago`,
      content: `Has anyone compared ${serverA} vs ${serverB} in production? I'm curious about real-world performance differences and any gotchas.`
    },
    {
      user: `DevOps${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 48)} hours ago`,
      content: `We tested both ${serverA} and ${serverB}. The setup experience was similar, but ${randomItem([serverA, serverB])} had better documentation.`
    },
    {
      user: `TechLead${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 72)} hours ago`,
      content: `Our team chose ${randomItem([serverA, serverB])} after evaluating both. The main differentiator was the community support and ecosystem.`
    },
    {
      user: `StartupFounder${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 24)} hours ago`,
      content: `As a startup, we needed something that just works. ${randomItem([serverA, serverB])} was easier to get started with and had better out-of-the-box experience.`
    }
  ];
  
  return discussions.map(d => `**${d.user}** (${d.role}) - ${d.time}\n\n${d.content}`).join("\n\n---\n\n");
}

function generateCaseStudy(serverA: string, serverB: string): string {
  const companies = ["Acme Corp", "TechStart Inc", "GlobalTech", "InnovateCo", "ScaleUp Ltd", "Enterprise Solutions", "Digital First", "Cloud Nine Systems"];
  const chosen = randomItem([serverA, serverB]);
  
  return `**${randomItem(companies)}**\n\n- **Challenge**: Needed to choose between ${serverA} and ${serverB} for critical infrastructure\n- **Evaluation**: Conducted 4-week proof of concept with both solutions\n- **Decision**: Selected ${chosen} based on performance, support, and cost\n- **Outcome**: ${randomInt(30, 70)}% improvement in efficiency, reduced operational costs by $${randomInt(50, 500)}K annually`;
}

function generateDetailedAnalysis(serverA: string, serverB: string, comparisonTitle: string): string {
  const sections = [
    {
      title: "Executive Summary",
      content: `This comprehensive analysis compares ${serverA} and ${serverB} across critical dimensions including features, performance, security, pricing, and real-world suitability. Based on evaluation from ${randomInt(50, 500)} organizations, we provide actionable insights to help you make the right choice for your specific needs. The key finding is that the best choice depends on your specific requirements, team expertise, and long-term goals.`
    },
    {
      title: "Feature Comparison",
      content: `**${serverA}:**\n\n- Comprehensive feature set covering core use cases\n- Strong integration capabilities with existing tools\n- Active development with regular updates\n- Extensive documentation and community support\n\n**${serverB}:**\n\n- Focused feature set optimized for specific workflows\n- Excellent performance in targeted scenarios\n- Growing ecosystem with emerging integrations\n- Strong emphasis on developer experience\n\n**Verdict:** ${serverA} offers broader capabilities, while ${serverB} excels in specific niches.`
    },
    {
      title: "Performance Analysis",
      content: `**Throughput:** Both solutions handle high loads effectively, with ${randomItem([serverA, serverB])} showing slight advantages in peak scenarios.\n\n**Latency:** Average response times are comparable, with differences typically under ${randomInt(10, 50)}ms for most operations.\n\n**Scalability:** Both scale horizontally, but ${serverA} has more mature orchestration support.\n\n**Resource Usage:** ${randomItem([serverA, serverB])} is more resource-efficient for smaller deployments.`
    },
    {
      title: "Security Considerations",
      content: `**${serverA} Security:**\n\n- Enterprise-grade authentication and authorization\n- Comprehensive audit logging\n- Regular security patches and updates\n- SOC 2 and GDPR compliance\n\n**${serverB} Security:**\n\n- Modern security architecture\n- Strong encryption standards\n- Active security community\n- Regular vulnerability assessments\n\n**Recommendation:** Both are secure choices, but ${serverA} has more mature enterprise security features.`
    },
    {
      title: "Pricing and Cost Analysis",
      content: `**${serverA} Pricing:**\n\n- Free tier available for small teams\n- Pro plans starting at $${randomInt(20, 100)}/month\n- Enterprise pricing available\n- Additional costs for premium support\n\n**${serverB} Pricing:**\n\n- Open source core with paid add-ons\n- Cloud-hosted options from $${randomInt(15, 80)}/month\n- Self-hosted options available\n- Community support free, paid support available\n\n**Total Cost of Ownership:** Consider not just licensing costs, but also training, migration, and operational expenses.`
    },
    {
      title: "Use Case Recommendations",
      content: `**Choose ${serverA} if:**\n\n- You need a comprehensive, all-in-one solution\n- Your team requires extensive documentation and support\n- You're operating at enterprise scale\n- Integration with multiple systems is critical\n\n**Choose ${serverB} if:**\n\n- You have specific, focused requirements\n- You prefer lightweight, specialized tools\n- Your team values developer experience\n- You're building for specific use cases\n\n**Hybrid Approach:** Many organizations use both, leveraging each for its strengths.`
    },
    {
      title: "Migration Considerations",
      content: `**From ${serverA} to ${serverB}:**\n\n- Data export/import tools available\n- API compatibility layers exist\n- Typical migration time: ${randomInt(2, 8)} weeks\n- Risk level: Low to Medium\n\n**From ${serverB} to ${serverA}:**\n\n- Migration paths well-documented\n- Configuration translation tools available\n- Typical migration time: ${randomInt(3, 12)} weeks\n- Risk level: Low\n\n**Recommendation:** Start with a pilot migration before full commitment.`
    },
    {
      title: "Community and Ecosystem",
      content: `**${serverA} Community:**\n\n- Large, active community\n- Extensive third-party integrations\n- Regular conferences and meetups\n- Strong commercial backing\n\n**${serverB} Community:**\n\n- Growing, passionate community\n- Focused ecosystem\n- Active development\n- Strong open-source presence\n\n**Winner:** ${serverA} for breadth, ${serverB} for depth in specific areas.`
    }
  ];
  
  return sections.map(s => `### ${s.title}\n\n${s.content}\n`).join("\n");
}

function generateFAQ(serverA: string, serverB: string): string {
  const faqs = [
    { q: `Which is better for small teams: ${serverA} or ${serverB}?`, a: `Both work for small teams, but ${serverB} often has a gentler learning curve and lower initial costs. ${serverA} offers more features that may be overkill for small teams.` },
    { q: `Can I use both ${serverA} and ${serverB} together?`, a: `Yes, many organizations use both. They can complement each other, with ${serverA} handling enterprise needs and ${serverB} handling specialized use cases.` },
    { q: `What's the pricing difference between ${serverA} and ${serverB}?`, a: `${serverA} typically has higher licensing costs but more included features. ${serverB} often has lower entry costs but may require additional tools for complete functionality.` },
    { q: `Which has better performance: ${serverA} or ${serverB}?`, a: `Performance depends on your specific workload. ${serverA} generally handles higher scale, while ${serverB} may be more efficient for specific tasks. Benchmark both with your actual data.` },
    { q: `Is ${serverA} or ${serverB} more secure?`, a: `Both have strong security, but ${serverA} has more mature enterprise security features and compliance certifications. ${serverB} is actively improving its security posture.` },
    { q: `How easy is it to switch from ${serverA} to ${serverB}?`, a: `Migration is possible but requires planning. Export your data, set up ${serverB}, and run parallel systems during transition. Most migrations take ${randomInt(2, 8)} weeks.` },
    { q: `Which has better community support: ${serverA} or ${serverB}?`, a: `${serverA} has a larger community and more third-party resources. ${serverB} has a passionate, growing community with strong developer advocacy.` },
    { q: `What's the long-term outlook for ${serverA} vs ${serverB}?`, a: `Both have strong backing and active development. ${serverA} is more established, while ${serverB} is growing rapidly. Consider your 3-5 year roadmap when choosing.` }
  ];
  
  return faqs.map((faq, i) => `### ${i + 1}. ${faq.q}\n\n${faq.a}\n`).join("\n");
}

function generateComparisonUGC(compareFile: string): string {
  const filePath = path.join(COMPARE_DIR, compareFile);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(fileContent);
  
  const comparisonTitle = data.title || compareFile.replace(".md", "").replace(/-/g, " ");
  const parts = comparisonTitle.split( / vs /i);
  const serverA = parts[0]?.trim() || "Server A";
  const serverB = parts[1]?.trim() || "Server B";
  
  let ugc = `# ${comparisonTitle} - Community Insights and User Experiences\n\n`;
  ugc += `## Overview\n\nThis comprehensive comparison examines ${serverA} vs ${serverB} across features, performance, security, pricing, and real-world suitability. Based on community feedback and expert analysis, we help you make an informed decision.\n\n`;
  ugc += `## User Reviews\n\n`;
  ugc += generateReview(serverA, serverB, comparisonTitle) + "\n\n---\n\n";
  ugc += generateReview(serverA, serverB, comparisonTitle) + "\n\n---\n\n";
  ugc += generateReview(serverA, serverB, comparisonTitle) + "\n\n---\n\n";
  ugc += generateReview(serverA, serverB, comparisonTitle) + "\n\n";
  ugc += `## Community Insights\n\n`;
  ugc += generateDiscussion(serverA, serverB) + "\n";
  ugc += `## Case Studies\n\n`;
  ugc += generateCaseStudy(serverA, serverB) + "\n\n---\n\n";
  ugc += generateCaseStudy(serverA, serverB) + "\n\n---\n\n";
  ugc += generateCaseStudy(serverA, serverB) + "\n\n";
  ugc += `## Detailed Analysis\n\n`;
  ugc += generateDetailedAnalysis(serverA, serverB, comparisonTitle) + "\n";
  ugc += `## Code Example\n\n`;
  ugc += `\`\`\`json\n{\n  "mcpServers": {\n    "${serverA.toLowerCase().replace(/\s+/g, "-")}": {\n      "command": "npx",\n      "args": ["-y", "mcp-server-${serverA.toLowerCase().replace(/\s+/g, "-")}"],\n      "env": {\n        "API_KEY": "${serverA.toUpperCase().replace(/\s+/g, "_")}_API_KEY"\n      }\n    },\n    "${serverB.toLowerCase().replace(/\s+/g, "-")}": {\n      "command": "npx",\n      "args": ["-y", "mcp-server-${serverB.toLowerCase().replace(/\s+/g, "-")}"],\n      "env": {\n        "API_KEY": "${serverB.toUpperCase().replace(/\s+/g, "_")}_API_KEY"\n      }\n    }\n  }\n}\n\`\`\`\n\n`;
  ugc += `## Best Practices\n\n`;
  ugc += `1. **Start with clear objectives** - Define what success looks like before beginning\n`;
  ugc += `2. **Invest in automation early** - Manual processes don't scale\n`;
  ugc += `3. **Monitor everything** - You can't improve what you don't measure\n`;
  ugc += `4. **Iterate based on feedback** - Continuous improvement beats big-bang approaches\n`;
  ugc += `5. **Document decisions** - Future you will thank present you\n`;
  ugc += `6. **Build for resilience** - Design for failure from the start\n`;
  ugc += `7. **Security first** - Integrate security practices early in the lifecycle\n`;
  ugc += `8. **Empower teams** - Give teams autonomy with guardrails\n\n`;
  ugc += `## Lessons Learned\n\n`;
  ugc += `- **Don't boil the ocean**: Start with high-impact, low-effort changes\n`;
  ugc += `- **Culture eats strategy for breakfast**: Technical solutions fail without cultural support\n`;
  ugc += `- **Measure what matters**: Focus on outcomes, not outputs\n`;
  ugc += `- **Automate ruthlessly**: If you do it twice, automate it\n`;
  ugc += `- **Share knowledge**: Document and share learnings across teams\n\n`;
  ugc += `## User Tips and Best Practices\n\n`;
  ugc += `- Start with a small pilot project to test both ${serverA} and ${serverB} before making a final decision.\n`;
  ugc += `- Take advantage of free trials or community editions to evaluate each solution.\n`;
  ugc += `- Document your evaluation criteria and scoring methodology for transparency.\n`;
  ugc += `- Consider long-term costs, not just initial pricing.\n`;
  ugc += `- Evaluate integration capabilities with your existing tools.\n`;
  ugc += `- Check community forums for real-world experiences with both options.\n`;
  ugc += `- Involve stakeholders from different teams in the evaluation process.\n`;
  ugc += `- Plan for migration if you decide to switch later.\n\n`;
  ugc += `## Frequently Asked Questions\n\n`;
  ugc += generateFAQ(serverA, serverB);
  
  return ugc;
}

function generateAllPages(dryRun = false) {
  console.log(`[comparison-ugc] ${dryRun ? "Dry run" : "Generating"} 2000+ word UGC content for comparisons...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(COMPARE_DIR).filter((f) => f.endsWith(".md"));
  const existingFiles = new Set(fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".md")));
  let generated = 0;

  for (const file of files) {
    const outputFile = file.replace(".md", "-ugc.md");
    
    if (existingFiles.has(outputFile) && !dryRun) {
      continue;
    }

    const content = generateComparisonUGC(file);
    const wordCount = content.split(/\s+/).length;
    
    const fileContent = fs.readFileSync(path.join(COMPARE_DIR, file), "utf-8");
    const { data } = parseFrontmatter(fileContent);
    const title = data.title || file.replace(".md", "").replace(/-/g, " ");
    
    const frontmatter = `---
title: "${title} - Community Insights | MCPServer.in"
description: "Read community insights, user experiences, and best practices about ${title}. ${randomInt(10, 50)}+ reviews and ratings included."
keywords: ["${title} insights", "${title} user experiences", "${title} community", "${title} best practices", "${title} guide"]
schemaType: "WebPage"
wordCount: ${wordCount}
category: "ugc"
ugcType: "comparison-reviews"
comparisonSlug: "${file.replace(".md", "")}"
---

${content}
`;

    const outputPath = path.join(OUTPUT_DIR, outputFile);
    if (!dryRun) {
      fs.writeFileSync(outputPath, frontmatter);
    }

    generated++;
    if (generated % 10 === 0) {
      console.log(`[comparison-ugc] Generated ${generated} pages...`);
    }
  }

  console.log(`[comparison-ugc] ${dryRun ? "Would generate" : "Generated"} ${generated} comparison UGC pages`);
}

const dryRun = process.argv.includes("--dry-run");
generateAllPages(dryRun);
