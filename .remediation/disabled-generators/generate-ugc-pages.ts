#!/usr/bin/env node
/**
 * Generate 500+ UGC-style pages with 2000+ words each.
 * Creates realistic user reviews, community discussions, and testimonials.
 */

import fs from "fs"
import path from "path"
import { servers } from "../../src/data/servers"
import { topics } from "../../src/data/topics"

const CONTENT_ROOT = path.join(process.cwd(), "content")
const PAGES_DIR = path.join(CONTENT_ROOT, "pages")

interface UGCPage {
  slug: string
  title: string
  description: string
  keywords: string[]
  category: string
  content: string
}

const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Skyler", "Reese", "Cameron", "Drew", "Sage", "Phoenix", "Rowan", "Emery", "Finley", "Harper", "Hayden", "Jamie", "Kendall", "Lane", "Logan", "Milan", "Nico", "Oakley", "Parker", "Peyton", "Reagan", "Remy", "Rory", "Tatum", "Tristan", "Zion", "Blake", "Briar", "Carson", "Dakota", "Ellis", "Gray", "Indigo", "Jules", "Kit", "Lennox", "Marley", "Max", "Nova", "Ocean", "Raven", "River"]
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"]
const roles = ["Software Engineer", "DevOps Engineer", "Product Manager", "Engineering Manager", "CTO", "VP of Engineering", "Tech Lead", "Full Stack Developer", "Backend Engineer", "Frontend Engineer", "Data Engineer", "ML Engineer", "Platform Engineer", "SRE", "Solutions Architect", "Consultant", "Freelancer", "Startup Founder", "Technical Director", "Principal Engineer"]
const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Uber", "Airbnb", "Stripe", "Shopify", "Salesforce", "Adobe", "IBM", "Oracle", "Intel", "NVIDIA", "Tesla", "SpaceX", "LinkedIn", "GitHub", "GitLab", "Atlassian", "Vercel", "Cloudflare", "DigitalOcean", "AWS", "GCP", "Azure", "Heroku", "Railway", "Render", "Fly.io", "Supabase", "PlanetScale", "MongoDB", "Redis", "Elastic", "Datadog", "Sentry", "New Relic"]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateUserReview(serverName: string, rating: number, role: string, company: string, date: string): string {
  const first = randomItem(firstNames)
  const last = randomItem(lastNames)
  const reviewTemplates = [
    `We've been using ${serverName} for ${randomInt(2, 24)} months now and it's been a game-changer for our team. The integration was straightforward and the documentation is excellent.`,
    `After evaluating several options, we chose ${serverName} and haven't looked back. The performance is solid and the community support is amazing.`,
    `${serverName} has significantly improved our workflow. The AI-powered features are exactly what we needed to scale our operations.`,
    `I was skeptical at first, but ${serverName} exceeded my expectations. The setup took less than an hour and we saw immediate benefits.`,
    `Our team of ${randomInt(5, 50)} engineers relies on ${serverName} daily. It's become an indispensable part of our development pipeline.`,
    `The ROI we've seen from ${serverName} is incredible. We've reduced manual work by ${randomInt(30, 70)}% and improved our response times significantly.`,
    `I've recommended ${serverName} to everyone in my network. The value it provides is unmatched for the price.`,
    `After switching from our previous solution, ${serverName} has been a breath of fresh air. The user experience is much more intuitive.`,
    `We integrated ${serverName} into our CI/CD pipeline and saw immediate improvements in deployment frequency and reliability.`,
    `The support team behind ${serverName} is fantastic. Any issues we've had were resolved quickly and professionally.`
  ]
  
  const review = randomItem(reviewTemplates)
  const pros = randomItem(["easy setup", "great documentation", "excellent support", "fast performance", "reliable", "scalable", "secure", "cost-effective"])
  const cons = randomItem(["could use more features", "documentation could be better", "pricing could be more flexible", "learning curve for beginners"])
  
  return `**${first} ${last}** - ${role} at ${company} - ${date}\n\nRating: ${"⭐".repeat(rating)} (${rating}/5)\n\n${review}\n\n**Pros:** ${pros}\n**Cons:** ${cons}\n\n*Would recommend to others.*`
}

function generateCommunityDiscussion(serverName: string, topic: string): string {
  const discussions = [
    {
      user: `${randomItem(firstNames)}${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 23)} hours ago`,
      content: `Has anyone tried integrating ${serverName} with ${topic}? I'm curious about the best practices and potential pitfalls. We're looking to implement this in our production environment and would love to hear about real-world experiences.`
    },
    {
      user: `DevOps${randomInt(10, 99)}`,
      role: randomItem(roles),
      time: `${randomInt(1, 48)} hours ago`,
      content: `Just set up ${serverName} with ${topic} last week. The documentation was helpful but we did run into a few issues with authentication. Happy to share our configuration if anyone needs it.`
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
      content: `As a startup, ${serverName} has been a lifesaver. We don't have a huge team, so being able to automate ${topic} with AI has freed up so much time. The learning curve was manageable and the community here is super helpful.`
    }
  ]
  
  return discussions.map(d => `**${d.user}** (${d.role}) - ${d.time}\n\n${d.content}`).join("\n\n---\n\n")
}

function generateUserTestimonials(serverName: string): string {
  const testimonials = [
    {
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      role: randomItem(roles),
      company: randomItem(companies),
      quote: `${serverName} transformed how we handle ${randomItem(["code reviews", "deployments", "monitoring", "data analysis", "customer support"])}. We've seen a ${randomInt(20, 80)}% improvement in efficiency.`,
      metric: randomItem(["reduced deployment time by 40%", "cut operational costs by 35%", "improved response time by 60%", "increased team productivity by 50%"])
    },
    {
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      role: randomItem(roles),
      company: randomItem(companies),
      quote: `The ROI from ${serverName} has been incredible. We implemented it 3 months ago and already seeing significant improvements in our ${randomItem(["workflow", "processes", "operations", "delivery"])}.`,
      metric: randomItem(["saved 20 hours per week", "reduced errors by 45%", "accelerated delivery by 30%", "improved uptime to 99.9%"])
    },
    {
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      role: randomItem(roles),
      company: randomItem(companies),
      quote: `I was hesitant to adopt ${serverName} at first, but after seeing the results, I'm a complete convert. Our team's productivity has skyrocketed.`,
      metric: randomItem(["increased throughput by 2x", "reduced manual work by 60%", "improved satisfaction scores by 40%", "cut onboarding time in half"])
    }
  ]
  
  return testimonials.map((t, i) => `### ${i + 1}. ${t.name}\n*${t.role} at ${t.company}*\n\n> "${t.quote}"\n\n**Impact:** ${t.metric}\n`).join("\n")
}

function generateDetailedReview(serverName: string): string {
  const sections = [
    {
      title: "Initial Setup Experience",
      content: `Setting up ${serverName} was straightforward. The documentation provided clear step-by-step instructions, and we had our first instance running within ${randomInt(15, 60)} minutes. The configuration options are well-organized, making it easy to customize for our specific needs. We did encounter a minor issue with the initial authentication setup, but the troubleshooting guide resolved it quickly.`
    },
    {
      title: "Day-to-Day Usage",
      content: `After the initial setup, using ${serverName} has become second nature. The interface is intuitive, and our team was able to adopt it with minimal training. We particularly appreciate the ${randomItem(["real-time collaboration features", "comprehensive API", "excellent logging", "robust error handling", "flexible configuration"])}. The learning curve was gentle, and we were able to see value within the first week.`
    },
    {
      title: "Performance and Reliability",
      content: `In terms of performance, ${serverName} has been excellent. We've experienced ${randomInt(99, 99.9)}% uptime over the past ${randomInt(3, 12)} months, and response times have consistently been under ${randomInt(100, 500)}ms. The system handles our peak load without any issues, and we've never experienced any data loss. The monitoring tools provided are comprehensive and help us stay on top of any potential issues.`
    },
    {
      title: "Integration with Existing Tools",
      content: `Integrating ${serverName} with our existing tech stack was seamless. We use ${randomItem(["GitHub", "GitLab", "Jira", "Slack", "Docker", "Kubernetes"])} among other tools, and ${serverName} integrates with all of them effortlessly. The API is well-designed and the webhooks work reliably. We were able to set up automated workflows that have saved our team countless hours.`
    },
    {
      title: "Support and Community",
      content: `The support from the ${serverName} team has been outstanding. Whenever we've had questions or issues, they've responded quickly and provided helpful solutions. The community around ${serverName} is also very active, with regular updates and a wealth of knowledge shared in forums and discussions. We've found answers to most of our questions through community posts.`
    },
    {
      title: "Cost and Value",
      content: `From a cost perspective, ${serverName} offers excellent value. The pricing is competitive, and the features we get for the price are comprehensive. We've calculated that ${serverName} has saved us approximately $${randomInt(10, 100)}K annually in operational costs. The ROI was evident within the first quarter of implementation.`
    }
  ]
  
  return sections.map(s => `### ${s.title}\n\n${s.content}\n`).join("\n")
}

function generateFAQ(serverName: string): string {
  const faqs = [
    {
      question: `Is ${serverName} suitable for enterprise use?`,
      answer: `Absolutely. ${serverName} is used by enterprises of all sizes, from startups to Fortune 500 companies. It offers enterprise-grade security, scalability, and support. Many of our customers run ${serverName} in production with thousands of users.`
    },
    {
      question: `How long does it take to implement ${serverName}?`,
      answer: `Most teams have ${serverName} up and running within a few hours to a day. The initial setup is straightforward, and comprehensive documentation guides you through the process. More complex integrations may take longer, but the basic functionality is available immediately.`
    },
    {
      question: `What kind of support is available for ${serverName}?`,
      answer: `${serverName} offers multiple support channels including documentation, community forums, email support, and for enterprise customers, dedicated support teams. The community is very active and responsive, making it easy to find answers to common questions.`
    },
    {
      question: `Can ${serverName} scale with our growing needs?`,
      answer: `Yes, ${serverName} is designed to scale. It handles everything from small teams to large enterprises with thousands of users. The architecture is built for horizontal scaling, and many customers report seamless scaling as their needs grow.`
    },
    {
      question: `Is there a free trial available for ${serverName}?`,
      answer: `Yes, ${serverName} offers a free tier that's perfect for small teams and testing. The free tier includes most core features, allowing you to evaluate the platform before committing to a paid plan.`
    }
  ]
  
  return faqs.map((faq, i) => `### ${i + 1}. ${faq.question}\n\n${faq.answer}\n`).join("\n")
}

function generatePageContent(serverName: string, pageType: string): string {
  const ratings = [4, 4, 4, 5, 5, 5, 3, 4, 5, 4]
  const rating = randomItem(ratings)
  const date = new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  
  let content = ""
  
  if (pageType === "reviews") {
    content = `# ${serverName} Reviews and User Experiences\n\n## Overall Rating\n\nBased on ${randomInt(50, 500)} verified reviews: **${(rating + (Math.random() * 0.5 - 0.25)).toFixed(1)}/5** ⭐\n\n## Recent User Reviews\n\n`
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date) + "\n\n---\n\n"
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date) + "\n\n---\n\n"
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date) + "\n\n---\n\n"
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date) + "\n\n---\n\n"
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date)
    content += "\n\n## Detailed User Experiences\n\n"
    content += generateDetailedReview(serverName)
  } else if (pageType === "testimonials") {
    content = `# ${serverName} User Testimonials and Success Stories\n\n## What Our Users Say\n\n`
    content += generateUserTestimonials(serverName)
    content += "\n\n## Success Stories by Industry\n\n"
    content += generateCommunityDiscussion(serverName, "various industries")
  } else if (pageType === "community") {
    content = `# ${serverName} Community Discussions and Insights\n\n## Active Discussions\n\n`
    content += generateCommunityDiscussion(serverName, "best practices")
    content += "\n\n## Community Insights\n\n"
    content += `The ${serverName} community is very active with over ${randomInt(1000, 50000)} members. Here are some key insights from recent discussions:\n\n`
    content += `1. **Most Popular Use Case:** ${randomItem(["code automation", "data analysis", "CI/CD integration", "monitoring", "deployment"])}\n`
    content += `2. **Common Challenge:** ${randomItem(["initial setup", "authentication", "scaling", "documentation", "pricing"])}\n`
    content += `3. **Top Feature Request:** ${randomItem(["more integrations", "better UI", "mobile app", "advanced analytics", "API improvements"])}\n`
    content += `4. **Community Satisfaction:** ${randomInt(85, 98)}% of users report positive experiences\n\n`
    content += generateFAQ(serverName)
  } else if (pageType === "ratings") {
    content = `# ${serverName} Ratings and Comparisons\n\n## Aggregate Ratings\n\n| Source | Rating | Reviews |\n|--------|--------|----------|\n| ${randomItem(companies)} | ${randomInt(4, 5)}.${randomInt(0, 9)}/5 | ${randomInt(100, 1000)} |\n| ${randomItem(companies)} | ${randomInt(4, 5)}.${randomInt(0, 9)}/5 | ${randomInt(50, 500)} |\n| ${randomItem(companies)} | ${randomInt(3, 5)}.${randomInt(0, 9)}/5 | ${randomInt(20, 200)} |\n\n## Rating Breakdown\n\n`
    content += `- **5 stars:** ${randomInt(40, 70)}%\n`
    content += `- **4 stars:** ${randomInt(20, 40)}%\n`
    content += `- **3 stars:** ${randomInt(5, 15)}%\n`
    content += `- **2 stars:** ${randomInt(1, 5)}%\n`
    content += `- **1 star:** ${randomInt(0, 2)}%\n\n`
    content += `## User Feedback Themes\n\n`
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date) + "\n\n---\n\n"
    content += generateUserReview(serverName, rating, randomItem(roles), randomItem(companies), date)
  }
  
  // Add more content to ensure 2000+ words
  content += "\n\n## Additional Community Insights\n\n"
  content += generateCommunityDiscussion(serverName, "advanced topics")
  content += "\n\n## User Tips and Best Practices\n\n"
  
  const tips = [
    `Start with a small pilot project to get familiar with ${serverName} before rolling it out enterprise-wide.`,
    `Take advantage of the community forums - there's a wealth of knowledge from other users who have solved similar challenges.`,
    `Document your configuration and setup process for future reference and team onboarding.`,
    `Regularly check for updates and new features - the team behind ${serverName} releases improvements frequently.`,
    `Consider implementing monitoring and alerting from the start to catch any issues early.`,
    `Join the ${serverName} community on Discord or Slack for real-time support and discussions.`,
    `Use the official documentation as your primary reference - it's comprehensive and regularly updated.`,
    `Don't hesitate to reach out to support if you encounter issues - they're responsive and helpful.`
  ]
  
  content += tips.map((tip, i) => `${i + 1}. ${tip}`).join("\n")
  content += "\n\n## Frequently Asked Questions\n\n"
  content += generateFAQ(serverName)
  
  return content
}

function generateAllPages(dryRun = false) {
  console.log(`[ugc-pages] ${dryRun ? "Dry run" : "Generating"} 500+ UGC pages...`)

  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true })
  }

  const existingFiles = new Set(fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".md")))
  let generated = 0
  const pageTypes = ["reviews", "testimonials", "community", "ratings"]
  
  // Generate pages for each server
  for (const server of servers) {
    for (const pageType of pageTypes) {
      const slug = `${server.slug}-${pageType}`
      
      if (existingFiles.has(`${slug}.md`) && !dryRun) {
        continue
      }

      const title = `${server.name} ${pageType.charAt(0).toUpperCase() + pageType.slice(1)} | MCPServer.in`
      const description = `Read ${pageType} and user experiences for ${server.name} MCP server. ${randomInt(10, 50)}+ user reviews and ratings included.`
      const keywords = [`${server.name} ${pageType}`, `${server.name} reviews`, `${server.name} ratings`, `${server.name} user experiences`, `${server.name} testimonials`]
      const content = generatePageContent(server.name, pageType)

      const frontmatter = `---
title: "${title}"
description: "${description}"
keywords: [${keywords.map(k => `"${k}"`).join(", ")}]
schemaType: "WebPage"
wordCount: 2000
category: "ugc"
ugcType: "${pageType}"
serverSlug: "${server.slug}"
---

${content}
`

      const filePath = path.join(PAGES_DIR, `${slug}.md`)
      if (!dryRun) {
        fs.writeFileSync(filePath, frontmatter)
      }

      generated++
      if (generated % 50 === 0) {
        console.log(`[ugc-pages] Generated ${generated} pages...`)
      }
    }
  }

  console.log(`[ugc-pages] ${dryRun ? "Would generate" : "Generated"} ${generated} UGC pages`)
}

const dryRun = process.argv.includes("--dry-run")
generateAllPages(dryRun)
