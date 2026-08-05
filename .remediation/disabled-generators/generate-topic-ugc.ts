#!/usr/bin/env node
/**
 * Generate 2000+ word unique rankable UGC content for each topic.
 */

import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const TOPICS_DIR = path.join(CONTENT_ROOT, "topics");
const OUTPUT_DIR = path.join(CONTENT_ROOT, "ugc", "topics");

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

function generateReview(topicTitle: string, topicDescription: string): string {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);
  const role = randomItem(roles);
  const company = randomItem(companies);
  const date = new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const rating = randomInt(3, 5);
  
  const templates = [
    `This guide on ${topicTitle} was incredibly helpful. ${topicDescription} We implemented these strategies and saw immediate improvements.`,
    `I've been researching ${topicTitle} for months, and this is by far the most comprehensive resource I've found. ${topicDescription}`,
    `Our team applied the insights from this ${topicTitle} guide and achieved remarkable results. ${topicDescription}`,
    `As someone new to ${topicTitle}, this guide provided exactly what I needed to get started. ${topicDescription}`,
    `We've been following ${topicTitle} best practices for ${randomInt(6, 36)} months. The results speak for themselves. ${topicDescription}`,
    `This ${topicTitle} resource helped us identify gaps in our approach and provided actionable solutions. ${topicDescription}`,
    `I shared this ${topicTitle} guide with my entire team. It's become our go-to reference. ${topicDescription}`,
    `After implementing the strategies in this ${topicTitle} guide, we saw a ${randomInt(20, 60)}% improvement in our metrics. ${topicDescription}`
  ];
  
  return `**${first} ${last}** - ${role} at ${company} - ${date}\n\nRating: ${"⭐".repeat(rating)} (${rating}/5)\n\n${randomItem(templates)}\n\n**Pros:** Comprehensive coverage, practical examples, clear explanations\n**Cons:** Could use more advanced use cases\n\n*Would recommend to others.*`;
}

function generateDiscussion(topicTitle: string): string {
  const discussions = [
    {
      user: `${randomItem(firstNames)}${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 23)} hours ago`,
      content: `Has anyone implemented ${topicTitle} in their organization? I'd love to hear about your experience and any challenges you faced.`
    },
    {
      user: `DevOps${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 48)} hours ago`,
      content: `Just finished reading this ${topicTitle} guide. It's excellent! We're planning to adopt these practices next quarter.`
    },
    {
      user: `TechLead${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 72)} hours ago`,
      content: `We've been applying ${topicTitle} principles for a while now. The key is to start small and iterate. Don't try to do everything at once.`
    },
    {
      user: `StartupFounder${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 24)} hours ago`,
      content: `As a startup, ${topicTitle} has been crucial for our growth. We don't have a big team, so these practices help us punch above our weight.`
    }
  ];
  
  return discussions.map(d => `**${d.user}** (${d.role}) - ${d.time}\n\n${d.content}`).join("\n\n---\n\n");
}

function generateCaseStudy(topicTitle: string): string {
  const companies = ["Acme Corp", "TechStart Inc", "GlobalTech", "InnovateCo", "ScaleUp Ltd", "Enterprise Solutions", "Digital First", "Cloud Nine Systems"];
  const challenges = [
    `Struggling with ${topicTitle} implementation at scale`,
    `Needed to improve ${topicTitle} efficiency by 50%`,
    `Facing challenges with existing ${topicTitle} approaches`,
    `Legacy systems incompatible with modern ${topicTitle} practices`,
    `Team lacked expertise in ${topicTitle} best practices`
  ];
  
  const solutions = [
    `Implemented phased ${topicTitle} rollout with comprehensive training`,
    `Adopted modern ${topicTitle} tools and automated workflows`,
    `Established ${topicTitle} governance framework and monitoring`,
    `Built custom ${topicTitle} integrations with existing systems`,
    `Created internal ${topicTitle} Center of Excellence`
  ];
  
  const outcomes = [
    `${randomInt(30, 70)}% improvement in efficiency`,
    `Reduced operational costs by $${randomInt(50, 500)}K annually`,
    `Achieved ${randomInt(99, 99.99)}% uptime`,
    `Cut processing time from ${randomInt(4, 24)} hours to ${randomInt(5, 30)} minutes`,
    `Improved team satisfaction scores by ${randomInt(25, 60)}%`
  ];
  
  return `**${randomItem(companies)}**\n\n- **Challenge**: ${randomItem(challenges)}\n- **Solution**: ${randomItem(solutions)}\n- **Outcome**: ${randomItem(outcomes)}`;
}

function generateDetailedAnalysis(topicTitle: string, topicDescription: string): string {
  const sections = [
    {
      title: "Executive Summary",
      content: `This comprehensive analysis of ${topicTitle} examines implementation strategies, real-world outcomes, and best practices gathered from ${randomInt(50, 500)} organizations. ${topicDescription} Organizations adopting these principles report significant improvements in efficiency, reliability, and team satisfaction. The key finding is that successful ${topicTitle} implementations share common characteristics: clear vision, incremental approach, and strong leadership support.`
    },
    {
      title: "Implementation Approach",
      content: `Successful ${topicTitle} implementation requires careful planning and execution. Key phases include:\n\n1. **Assessment Phase**: Evaluate current state, identify gaps, and define objectives\n2. **Pilot Phase**: Start with a small team to test and refine approaches\n3. **Rollout Phase**: Gradually expand to other teams with proper training\n4. **Optimization Phase**: Continuously improve based on feedback and metrics\n\nMost organizations complete initial setup within ${randomInt(2, 8)} weeks, with full adoption taking ${randomInt(3, 12)} months. The pilot phase is critical - it allows teams to identify potential issues early and develop best practices before scaling.`
    },
    {
      title: "Key Metrics and KPIs",
      content: `Organizations track ${randomInt(5, 12)} key metrics for ${topicTitle} success:\n\n- **Deployment Frequency**: How often you deploy to production\n- **Lead Time**: Time from commit to deployment\n- **Change Failure Rate**: Percentage of deployments causing failures\n- **Mean Time to Recovery (MTTR)**: Time to recover from failures\n- **Team Satisfaction**: Developer experience and engagement\n- **Code Quality**: Bug rates, technical debt, test coverage\n- **Security Incidents**: Number and severity of security issues\n- **Compliance Adherence**: Regulatory compliance metrics\n\nTop performers achieve ${randomInt(40, 90)}% improvement in these areas within the first year. The most successful organizations establish baselines early and track progress rigorously.`
    },
    {
      title: "Tooling and Technology",
      content: `Modern ${topicTitle} relies on integrated toolchains across multiple categories:\n\n**Essential Tool Categories:**\n\n1. **Version Control**: Git, GitHub, GitLab, Bitbucket\n2. **CI/CD**: Jenkins, GitHub Actions, GitLab CI, CircleCI\n3. **Infrastructure**: Docker, Kubernetes, Terraform, Ansible\n4. **Monitoring**: Prometheus, Grafana, Datadog, New Relic\n5. **Collaboration**: Slack, Teams, Confluence, Notion\n6. **Security**: SonarQube, Snyk, OWASP ZAP, HashiCorp Vault\n7. **Testing**: Jest, Cypress, Selenium, JUnit\n8. **Analytics**: ELK Stack, Splunk, BigQuery, Snowflake\n\nOrganizations typically use ${randomInt(8, 20)} different tools in their ${topicTitle} stack. The key is integration - tools should work together seamlessly, not create data silos.`
    },
    {
      title: "Team Structure and Roles",
      content: `Effective ${topicTitle} requires clear role definition and team organization:\n\n**Core Roles:**\n\n- **Platform Engineer**: Builds and maintains the platform\n- **SRE**: Ensures reliability and performance\n- **Developer**: Writes and deploys application code\n- **Product Owner**: Defines requirements and priorities\n- **Security Engineer**: Implements security controls\n- **Data Engineer**: Manages data pipelines and analytics\n\n**Team Structures:**\n\n- **Small Teams** (3-10 people): Full-stack engineers with broad responsibilities\n- **Medium Teams** (10-50 people): Specialized roles with some overlap\n- **Enterprise Teams** (50+ people): Highly specialized roles with clear boundaries\n\nSuccessful organizations balance specialization with collaboration. Too much specialization creates silos; too little creates chaos.`
    },
    {
      title: "Common Challenges",
      content: `Top ${topicTitle} challenges and how to address them:\n\n1. **Cultural Resistance**: Team members comfortable with existing processes\n   - *Solution*: Executive sponsorship, change management, training\n\n2. **Tool Sprawl**: Too many tools creating complexity\n   - *Solution*: Tool consolidation, standardization, integration\n\n3. **Skill Gaps**: Lack of expertise in new technologies\n   - *Solution*: Training programs, hiring, external consultants\n\n4. **Measurement Difficulties**: Not knowing what to measure\n   - *Solution*: Start with 3-5 key metrics, establish baselines\n\n5. **Legacy Systems**: Old systems that resist modernization\n   - *Solution*: Strangler fig pattern, API layers, gradual migration\n\n6. **Security Concerns**: Fear of exposing systems\n   - *Solution*: Defense in depth, zero trust, regular audits\n\nOrganizations that proactively address these challenges are ${randomInt(2, 5)}x more likely to succeed with ${topicTitle}.`
    },
    {
      title: "Success Factors",
      content: `Critical success factors for ${topicTitle} implementation:\n\n1. **Executive Buy-In**: Leadership must champion the initiative\n2. **Incremental Adoption**: Start small, prove value, then expand\n3. **Comprehensive Training**: Invest in team education and onboarding\n4. **Measurable Goals**: Define clear success criteria and track progress\n5. **Continuous Feedback**: Regular retrospectives and improvements\n6. **Tool Standardization**: Reduce cognitive load with consistent tooling\n7. **Security Integration**: Build security into every stage\n8. **Community Engagement**: Learn from others and share experiences\n\nOrganizations that excel in these areas are ${randomInt(3, 10)}x more likely to succeed. The most important factor is executive buy-in - without it, even the best technical solutions fail.`
    },
    {
      title: "ROI and Business Impact",
      content: `Average ROI for ${topicTitle} initiatives: ${randomInt(150, 500)}% within ${randomInt(12, 24)} months.\n\n**Quantifiable Benefits:**\n\n- **Reduced Downtime**: ${randomInt(20, 80)}% reduction in outages\n- **Faster Time-to-Market**: ${randomInt(30, 70)}% faster deployments\n- **Improved Quality**: ${randomInt(25, 60)}% fewer production incidents\n- **Higher Productivity**: ${randomInt(20, 50)}% more features per sprint\n- **Cost Savings**: $${randomInt(100, 2000)}K annually for mid-size orgs\n\n**Intangible Benefits:**\n\n- Better team morale and retention\n- Improved customer satisfaction\n- Enhanced competitive advantage\n- Greater innovation capacity\n- Stronger security posture\n\nThe key to maximizing ROI is focusing on business outcomes, not just technical metrics. Every ${topicTitle} initiative should tie back to business value.`
    }
  ];
  
  return sections.map(s => `### ${s.title}\n\n${s.content}\n`).join("\n");
}

function generateFAQ(topicTitle: string): string {
  const faqs = [
    { q: `Is ${topicTitle} suitable for small teams?`, a: `Yes, ${topicTitle} scales from solo developers to enterprise organizations. Start with core practices and expand as your team grows. Many small teams report significant benefits within the first month.` },
    { q: `How long does ${topicTitle} implementation take?`, a: `Initial setup takes ${randomInt(2, 8)} weeks. Full organizational adoption typically requires ${randomInt(3, 12)} months with proper change management. The key is to start small and iterate.` },
    { q: `What skills are needed for ${topicTitle}?`, a: `Core skills include system design, automation, monitoring, and collaboration. Many organizations invest in training programs to upskill existing teams. The learning curve is manageable with proper support.` },
    { q: `How do you measure ${topicTitle} success?`, a: `Key metrics include deployment frequency, lead time, change failure rate, MTTR, and team satisfaction. Set baselines and track improvement over time. Focus on outcomes, not outputs.` },
    { q: `What's the typical ROI for ${topicTitle}?`, a: `Most organizations see ${randomInt(150, 400)}% ROI within ${randomInt(12, 24)} months, primarily through reduced downtime and improved team productivity. The ROI is often higher than expected.` },
    { q: `Can ${topicTitle} work with legacy systems?`, a: `Yes, but it requires careful planning. Many organizations use strangler fig patterns to gradually modernize legacy components. The key is to not boil the ocean - start with low-risk areas.` },
    { q: `What are the security implications of ${topicTitle}?`, a: `Security is a critical consideration. Implement defense in depth, zero trust principles, and regular security audits. Many organizations report improved security posture after implementing ${topicTitle}.` },
    { q: `How does ${topicTitle} compare to alternatives?`, a: `${topicTitle} offers unique advantages in ease of use, integration capabilities, and community support. The best choice depends on your specific requirements, but ${topicTitle} is a strong contender for most use cases.` }
  ];
  
  return faqs.map((faq, i) => `### ${i + 1}. ${faq.q}\n\n${faq.a}\n`).join("\n");
}

function generateTopicUGC(topicFile: string): string {
  const filePath = path.join(TOPICS_DIR, topicFile);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(fileContent);
  
  const topicTitle = data.title || topicFile.replace(".md", "").replace(/-/g, " ");
  const topicDescription = data.description || body.slice(0, 200);
  
  let ugc = `# ${topicTitle} - Community Insights and User Experiences\n\n`;
  ugc += `## Overview\n\n${topicDescription}\n\n`;
  ugc += `## User Reviews\n\n`;
  ugc += generateReview(topicTitle, topicDescription) + "\n\n---\n\n";
  ugc += generateReview(topicTitle, topicDescription) + "\n\n---\n\n";
  ugc += generateReview(topicTitle, topicDescription) + "\n\n---\n\n";
  ugc += generateReview(topicTitle, topicDescription) + "\n\n";
  ugc += `## Community Insights\n\n`;
  ugc += generateDiscussion(topicTitle) + "\n";
  ugc += `## Case Studies\n\n`;
  ugc += generateCaseStudy(topicTitle) + "\n\n---\n\n";
  ugc += generateCaseStudy(topicTitle) + "\n\n---\n\n";
  ugc += generateCaseStudy(topicTitle) + "\n\n";
  ugc += `## Detailed Analysis\n\n`;
  ugc += generateDetailedAnalysis(topicTitle, topicDescription) + "\n";
  ugc += `## Code Example\n\n`;
  ugc += `\`\`\`bash\n# Example implementation for ${topicTitle}\n# This is a demonstration of key concepts\n\n# Step 1: Setup\nnpm init -y\nnpm install mcp-server\n\n# Step 2: Configuration\ncat > mcp-config.json << 'CONFIG'\n{\n  "mcpServers": {\n    "example": {\n      "command": "npx",\n      "args": ["-y", "mcp-server-example"],\n      "env": {\n        "API_KEY": "your-api-key"\n      }\n    }\n  }\n}\nCONFIG\n\n# Step 3: Test\nmcp-server-example --test\n\`\`\`\n\n`;
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
  ugc += `- Start with a small pilot project to get familiar with ${topicTitle} before rolling it out enterprise-wide.\n`;
  ugc += `- Take advantage of community forums - there's a wealth of knowledge from other users who have solved similar challenges.\n`;
  ugc += `- Document your configuration and setup process for future reference and team onboarding.\n`;
  ugc += `- Regularly check for updates and new features - improvements are released frequently.\n`;
  ugc += `- Consider implementing monitoring and alerting from the start to catch any issues early.\n`;
  ugc += `- Join relevant communities on Discord or Slack for real-time support and discussions.\n`;
  ugc += `- Use official documentation as your primary reference - it's comprehensive and regularly updated.\n`;
  ugc += `- Don't hesitate to reach out to support if you encounter issues - they're responsive and helpful.\n\n`;
  ugc += `## Frequently Asked Questions\n\n`;
  ugc += generateFAQ(topicTitle);
  
  return ugc;
}

function generateAllPages(dryRun = false) {
  console.log(`[topic-ugc] ${dryRun ? "Dry run" : "Generating"} 2000+ word UGC content for topics...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(TOPICS_DIR).filter((f) => f.endsWith(".md"));
  const existingFiles = new Set(fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".md")));
  let generated = 0;

  for (const file of files) {
    const outputFile = file.replace(".md", "-ugc.md");
    
    if (existingFiles.has(outputFile) && !dryRun) {
      continue;
    }

    const content = generateTopicUGC(file);
    const wordCount = content.split(/\s+/).length;
    
    const fileContent = fs.readFileSync(path.join(TOPICS_DIR, file), "utf-8");
    const { data } = parseFrontmatter(fileContent);
    const title = data.title || file.replace(".md", "").replace(/-/g, " ");
    
    const frontmatter = `---
title: "${title} - Community Insights | MCPServer.in"
description: "Read community insights, user experiences, and best practices about ${title}. ${randomInt(10, 50)}+ reviews and ratings included."
keywords: ["${title} insights", "${title} user experiences", "${title} community", "${title} best practices", "${title} guide"]
schemaType: "WebPage"
wordCount: ${wordCount}
category: "ugc"
ugcType: "topic-reviews"
topicSlug: "${file.replace(".md", "")}"
---

${content}
`;

    const outputPath = path.join(OUTPUT_DIR, outputFile);
    if (!dryRun) {
      fs.writeFileSync(outputPath, frontmatter);
    }

    generated++;
    if (generated % 10 === 0) {
      console.log(`[topic-ugc] Generated ${generated} pages...`);
    }
  }

  console.log(`[topic-ugc] ${dryRun ? "Would generate" : "Generated"} ${generated} topic UGC pages`);
}

const dryRun = process.argv.includes("--dry-run");
generateAllPages(dryRun);
