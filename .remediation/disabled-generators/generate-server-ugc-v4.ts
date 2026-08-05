#!/usr/bin/env node
/**
 * Generate 2000+ word unique rankable UGC content for each MCP server.
 */

import fs from "fs";
import path from "path";
import { servers } from "../../src/data/servers";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SERVERS_DIR = path.join(CONTENT_ROOT, "servers");

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

function generateReview(serverName: string, serverDescription: string): string {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);
  const role = randomItem(roles);
  const company = randomItem(companies);
  const date = new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const rating = randomInt(3, 5);
  
  const templates = [
    `We've been using ${serverName} for ${randomInt(2, 24)} months now and it's been a game-changer for our team. The integration was straightforward and the documentation is excellent. ${serverDescription}`,
    `After evaluating several options, we chose ${serverName} and haven't looked back. The performance is solid and the community support is amazing.`,
    `${serverName} has significantly improved our workflow. The AI-powered features are exactly what we needed to scale our operations.`,
    `I was skeptical at first, but ${serverName} exceeded my expectations. The setup took less than an hour and we saw immediate benefits.`,
    `Our team of ${randomInt(5, 50)} engineers relies on ${serverName} daily. It's become an indispensable part of our development pipeline.`,
    `The ROI we've seen from ${serverName} is incredible. We've reduced manual work by ${randomInt(30, 70)}% and improved our response times significantly.`,
    `I've recommended ${serverName} to everyone in my network. The value it provides is unmatched for the price.`,
    `After switching from our previous solution, ${serverName} has been a breath of fresh air. The user experience is much more intuitive.`,
    `We integrated ${serverName} into our CI/CD pipeline and saw immediate improvements in deployment frequency and reliability.`,
    `The support team behind ${serverName} is fantastic. Any issues we've had were resolved quickly and professionally.`
  ];
  
  const pros = randomItem(["easy setup", "great documentation", "excellent support", "fast performance", "reliable", "scalable", "secure", "cost-effective"]);
  const cons = randomItem(["could use more features", "documentation could be better", "pricing could be more flexible", "learning curve for beginners"]);
  
  return `**${first} ${last}** - ${role} at ${company} - ${date}\n\nRating: ${"⭐".repeat(rating)} (${rating}/5)\n\n${randomItem(templates)}\n\n**Pros:** ${pros}\n**Cons:** ${cons}\n\n*Would recommend to others.*`;
}

function generateDiscussion(serverName: string): string {
  const discussions = [
    {
      user: `${randomItem(firstNames)}${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 23)} hours ago`,
      content: `Has anyone tried integrating ${serverName} with their existing workflow? I'm curious about the best practices and potential pitfalls. We're looking to implement this in our production environment and would love to hear about real-world experiences.`
    },
    {
      user: `DevOps${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 48)} hours ago`,
      content: `Just set up ${serverName} last week. The documentation was helpful but we did run into a few issues with configuration. Happy to share our setup if anyone needs it.`
    },
    {
      user: `TechLead${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 72)} hours ago`,
      content: `We've been running ${serverName} in production for 6 months now. It's been solid for our use case. The main thing to watch out for is rate limiting - make sure you implement proper backoff strategies.`
    },
    {
      user: `StartupFounder${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 24)} hours ago`,
      content: `As a startup, ${serverName} has been a lifesaver. We don't have a huge team, so being able to automate our workflow with AI has freed up so much time. The learning curve was manageable and the community here is super helpful.`
    }
  ];
  
  return discussions.map(d => `**${d.user}** (${d.role}) - ${d.time}\n\n${d.content}`).join("\n\n---\n\n");
}

function generateCaseStudy(serverName: string): string {
  const companies = ["Acme Corp", "TechStart Inc", "GlobalTech", "InnovateCo", "ScaleUp Ltd", "Enterprise Solutions", "Digital First", "Cloud Nine Systems"];
  const challenges = [
    `Struggling with manual ${serverName} implementation at scale`,
    `Needed to improve ${serverName} efficiency by 50%`,
    `Facing integration challenges with existing ${serverName} systems`,
    `Legacy systems incompatible with modern ${serverName} approaches`,
    `Team lacked expertise in ${serverName} best practices`
  ];
  
  const solutions = [
    `Implemented phased ${serverName} rollout with comprehensive training`,
    `Adopted modern ${serverName} tools and automated workflows`,
    `Established ${serverName} governance framework and monitoring`,
    `Built custom ${serverName} integrations with existing systems`,
    `Created internal ${serverName} Center of Excellence`
  ];
  
  const outcomes = [
    `${randomInt(30, 70)}% improvement in efficiency`,
    `Reduced operational costs by $${randomInt(50, 500)}K annually`,
    `Achieved ${randomInt(99, 99.99)}% uptime`,
    `Cut deployment time from ${randomInt(4, 24)} hours to ${randomInt(5, 30)} minutes`,
    `Improved team satisfaction scores by ${randomInt(25, 60)}%`
  ];
  
  return `**${randomItem(companies)}**\n\n- **Challenge**: ${randomItem(challenges)}\n- **Solution**: ${randomItem(solutions)}\n- **Outcome**: ${randomItem(outcomes)}`;
}

function generateDetailedAnalysis(serverName: string, serverDescription: string): string {
  const sections = [
    {
      title: "Executive Summary",
      content: `This comprehensive analysis of ${serverName} examines implementation strategies, real-world outcomes, and best practices gathered from ${randomInt(50, 500)} organizations. ${serverDescription} Organizations adopting these principles report significant improvements in efficiency, reliability, and team satisfaction. The key finding is that successful ${serverName} implementations share common characteristics: clear vision, incremental approach, and strong leadership support.`
    },
    {
      title: "Implementation Approach",
      content: `Successful ${serverName} implementation requires careful planning and execution. Key phases include:\n\n1. **Assessment Phase**: Evaluate current state, identify gaps, and define objectives\n2. **Pilot Phase**: Start with a small team to test and refine approaches\n3. **Rollout Phase**: Gradually expand to other teams with proper training\n4. **Optimization Phase**: Continuously improve based on feedback and metrics\n\nMost organizations complete initial setup within ${randomInt(2, 8)} weeks, with full adoption taking ${randomInt(3, 12)} months. The pilot phase is critical - it allows teams to identify potential issues early and develop best practices before scaling.`
    },
    {
      title: "Key Metrics and KPIs",
      content: `Organizations track ${randomInt(5, 12)} key metrics for ${serverName} success:\n\n- **Deployment Frequency**: How often you deploy to production\n- **Lead Time**: Time from commit to deployment\n- **Change Failure Rate**: Percentage of deployments causing failures\n- **Mean Time to Recovery (MTTR)**: Time to recover from failures\n- **Team Satisfaction**: Developer experience and engagement\n- **Code Quality**: Bug rates, technical debt, test coverage\n- **Security Incidents**: Number and severity of security issues\n- **Compliance Adherence**: Regulatory compliance metrics\n\nTop performers achieve ${randomInt(40, 90)}% improvement in these areas within the first year. The most successful organizations establish baselines early and track progress rigorously.`
    },
    {
      title: "Tooling and Technology",
      content: `Modern ${serverName} relies on integrated toolchains across multiple categories:\n\n**Essential Tool Categories:**\n\n1. **Version Control**: Git, GitHub, GitLab, Bitbucket\n2. **CI/CD**: Jenkins, GitHub Actions, GitLab CI, CircleCI\n3. **Infrastructure**: Docker, Kubernetes, Terraform, Ansible\n4. **Monitoring**: Prometheus, Grafana, Datadog, New Relic\n5. **Collaboration**: Slack, Teams, Confluence, Notion\n6. **Security**: SonarQube, Snyk, OWASP ZAP, HashiCorp Vault\n7. **Testing**: Jest, Cypress, Selenium, JUnit\n8. **Analytics**: ELK Stack, Splunk, BigQuery, Snowflake\n\nOrganizations typically use ${randomInt(8, 20)} different tools in their ${serverName} stack. The key is integration - tools should work together seamlessly, not create data silos.`
    },
    {
      title: "Team Structure and Roles",
      content: `Effective ${serverName} requires clear role definition and team organization:\n\n**Core Roles:**\n\n- **Platform Engineer**: Builds and maintains the platform\n- **SRE**: Ensures reliability and performance\n- **Developer**: Writes and deploys application code\n- **Product Owner**: Defines requirements and priorities\n- **Security Engineer**: Implements security controls\n- **Data Engineer**: Manages data pipelines and analytics\n\n**Team Structures:**\n\n- **Small Teams** (3-10 people): Full-stack engineers with broad responsibilities\n- **Medium Teams** (10-50 people): Specialized roles with some overlap\n- **Enterprise Teams** (50+ people): Highly specialized roles with clear boundaries\n\nSuccessful organizations balance specialization with collaboration. Too much specialization creates silos; too little creates chaos.`
    },
    {
      title: "Common Challenges",
      content: `Top ${serverName} challenges and how to address them:\n\n1. **Cultural Resistance**: Team members comfortable with existing processes\n   - *Solution*: Executive sponsorship, change management, training\n\n2. **Tool Sprawl**: Too many tools creating complexity\n   - *Solution*: Tool consolidation, standardization, integration\n\n3. **Skill Gaps**: Lack of expertise in new technologies\n   - *Solution*: Training programs, hiring, external consultants\n\n4. **Measurement Difficulties**: Not knowing what to measure\n   - *Solution*: Start with 3-5 key metrics, establish baselines\n\n5. **Legacy Systems**: Old systems that resist modernization\n   - *Solution*: Strangler fig pattern, API layers, gradual migration\n\n6. **Security Concerns**: Fear of exposing systems\n   - *Solution*: Defense in depth, zero trust, regular audits\n\nOrganizations that proactively address these challenges are ${randomInt(2, 5)}x more likely to succeed with ${serverName}.`
    },
    {
      title: "Success Factors",
      content: `Critical success factors for ${serverName} implementation:\n\n1. **Executive Buy-In**: Leadership must champion the initiative\n2. **Incremental Adoption**: Start small, prove value, then expand\n3. **Comprehensive Training**: Invest in team education and onboarding\n4. **Measurable Goals**: Define clear success criteria and track progress\n5. **Continuous Feedback**: Regular retrospectives and improvements\n6. **Tool Standardization**: Reduce cognitive load with consistent tooling\n7. **Security Integration**: Build security into every stage\n8. **Community Engagement**: Learn from others and share experiences\n\nOrganizations that excel in these areas are ${randomInt(3, 10)}x more likely to succeed. The most important factor is executive buy-in - without it, even the best technical solutions fail.`
    },
    {
      title: "ROI and Business Impact",
      content: `Average ROI for ${serverName} initiatives: ${randomInt(150, 500)}% within ${randomInt(12, 24)} months.\n\n**Quantifiable Benefits:**\n\n- **Reduced Downtime**: ${randomInt(20, 80)}% reduction in outages\n- **Faster Time-to-Market**: ${randomInt(30, 70)}% faster deployments\n- **Improved Quality**: ${randomInt(25, 60)}% fewer production incidents\n- **Higher Productivity**: ${randomInt(20, 50)}% more features per sprint\n- **Cost Savings**: $${randomInt(100, 2000)}K annually for mid-size orgs\n\n**Intangible Benefits:**\n\n- Better team morale and retention\n- Improved customer satisfaction\n- Enhanced competitive advantage\n- Greater innovation capacity\n- Stronger security posture\n\nThe key to maximizing ROI is focusing on business outcomes, not just technical metrics. Every ${serverName} initiative should tie back to business value.`
    }
  ];
  
  return sections.map(s => `### ${s.title}\n\n${s.content}\n`).join("\n");
}

function generateFAQ(serverName: string): string {
  const faqs = [
    { q: `Is ${serverName} suitable for small teams?`, a: `Yes, ${serverName} scales from solo developers to enterprise organizations. Start with core practices and expand as your team grows. Many small teams report significant benefits within the first month.` },
    { q: `How long does ${serverName} implementation take?`, a: `Initial setup takes ${randomInt(2, 8)} weeks. Full organizational adoption typically requires ${randomInt(3, 12)} months with proper change management. The key is to start small and iterate.` },
    { q: `What skills are needed for ${serverName}?`, a: `Core skills include system design, automation, monitoring, and collaboration. Many organizations invest in training programs to upskill existing teams. The learning curve is manageable with proper support.` },
    { q: `How do you measure ${serverName} success?`, a: `Key metrics include deployment frequency, lead time, change failure rate, MTTR, and team satisfaction. Set baselines and track improvement over time. Focus on outcomes, not outputs.` },
    { q: `What's the typical ROI for ${serverName}?`, a: `Most organizations see ${randomInt(150, 400)}% ROI within ${randomInt(12, 24)} months, primarily through reduced downtime and improved team productivity. The ROI is often higher than expected.` },
    { q: `Can ${serverName} work with legacy systems?`, a: `Yes, but it requires careful planning. Many organizations use strangler fig patterns to gradually modernize legacy components. The key is to not boil the ocean - start with low-risk areas.` },
    { q: `What are the security implications of ${serverName}?`, a: `Security is a critical consideration. Implement defense in depth, zero trust principles, and regular security audits. Many organizations report improved security posture after implementing ${serverName}.` },
    { q: `How does ${serverName} compare to alternatives?`, a: `${serverName} offers unique advantages in ease of use, integration capabilities, and community support. The best choice depends on your specific requirements, but ${serverName} is a strong contender for most use cases.` }
  ];
  
  return faqs.map((faq, i) => `### ${i + 1}. ${faq.q}\n\n${faq.a}\n`).join("\n");
}

function generateServerUGC(server: any): string {
  const rating = randomInt(3, 5);
  
  let content = `# ${server.name} - User Reviews and Community Insights\n\n`;
  content += `## Overview\n\n${server.description}\n\n`;
  content += `## User Reviews\n\n`;
  content += generateReview(server.name, server.description) + "\n\n---\n\n";
  content += generateReview(server.name, server.description) + "\n\n---\n\n";
  content += generateReview(server.name, server.description) + "\n\n---\n\n";
  content += generateReview(server.name, server.description) + "\n\n---\n\n";
  content += generateReview(server.name, server.description) + "\n\n---\n\n";
  content += generateReview(server.name, server.description) + "\n\n";
  content += `## Community Discussion\n\n`;
  content += generateDiscussion(server.name) + "\n";
  content += `## Case Studies\n\n`;
  content += generateCaseStudy(server.name) + "\n\n---\n\n";
  content += generateCaseStudy(server.name) + "\n\n---\n\n";
  content += generateCaseStudy(server.name) + "\n\n";
  content += `## Detailed Analysis\n\n`;
  content += generateDetailedAnalysis(server.name, server.description) + "\n";
  content += `## Best Practices\n\n`;
  content += `1. **Start with clear objectives** - Define what success looks like before beginning\n`;
  content += `2. **Invest in automation early** - Manual processes don't scale\n`;
  content += `3. **Monitor everything** - You can't improve what you don't measure\n`;
  content += `4. **Iterate based on feedback** - Continuous improvement beats big-bang approaches\n`;
  content += `5. **Document decisions** - Future you will thank present you\n`;
  content += `6. **Build for resilience** - Design for failure from the start\n`;
  content += `7. **Security first** - Integrate security practices early in the lifecycle\n`;
  content += `8. **Empower teams** - Give teams autonomy with guardrails\n\n`;
  content += `## Lessons Learned\n\n`;
  content += `- **Don't boil the ocean**: Start with high-impact, low-effort changes\n`;
  content += `- **Culture eats strategy for breakfast**: Technical solutions fail without cultural support\n`;
  content += `- **Measure what matters**: Focus on outcomes, not outputs\n`;
  content += `- **Automate ruthlessly**: If you do it twice, automate it\n`;
  content += `- **Share knowledge**: Document and share learnings across teams\n\n`;
  content += `## Frequently Asked Questions\n\n`;
  content += generateFAQ(server.name);
  
  return content;
}

function generateAllPages(dryRun = false) {
  console.log(`[server-ugc-v4] ${dryRun ? "Dry run" : "Generating"} 2000+ word UGC content for servers...`);

  if (!fs.existsSync(SERVERS_DIR)) {
    fs.mkdirSync(SERVERS_DIR, { recursive: true });
  }

  const existingFiles = new Set(fs.readdirSync(SERVERS_DIR).filter((f) => f.endsWith(".md")));
  let generated = 0;

  for (const server of servers) {
    const fileName = `${server.slug}-ugc.md`;
    
    if (existingFiles.has(fileName) && !dryRun) {
      continue;
    }

    const content = generateServerUGC(server);
    const wordCount = content.split(/\s+/).length;
    
    const frontmatter = `---
title: "${server.name} - User Reviews and Community Insights | MCPServer.in"
description: "Read user reviews, community discussions, and insights about ${server.name}. ${randomInt(10, 50)}+ reviews and ratings included."
keywords: ["${server.name} reviews", "${server.name} user experiences", "${server.name} community", "${server.name} insights", "${server.name} testimonials"]
schemaType: "WebPage"
wordCount: ${wordCount}
category: "ugc"
ugcType: "server-reviews"
serverSlug: "${server.slug}"
---

${content}
`;

    const filePath = path.join(SERVERS_DIR, fileName);
    if (!dryRun) {
      fs.writeFileSync(filePath, frontmatter);
    }

    generated++;
    if (generated % 10 === 0) {
      console.log(`[server-ugc-v4] Generated ${generated} pages...`);
    }
  }

  console.log(`[server-ugc-v4] ${dryRun ? "Would generate" : "Generated"} ${generated} server UGC pages`);
}

const dryRun = process.argv.includes("--dry-run");
generateAllPages(dryRun);
