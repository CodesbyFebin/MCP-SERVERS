#!/usr/bin/env node
import fs from "fs"
import path from "path"

const CONTENT_ROOT = path.join(process.cwd(), "content")
const PAGES_DIR = path.join(CONTENT_ROOT, "pages")

interface TargetedPage {
  slug: string
  title: string
  description: string
  keywords: string[]
  category: string
  content: string
}

const pages: TargetedPage[] = [
  // Additional industry pages
  {
    slug: "mcp-for-pharmaceuticals",
    title: "MCP for Pharmaceuticals | MCPServer.in",
    description: "Learn how to use Model Context Protocol in pharmaceuticals.",
    keywords: ["MCP pharmaceuticals", "AI pharma", "drug discovery AI", "pharma AI", "clinical trials MCP"],
    category: "industry",
    content: `# MCP for Pharmaceuticals

## Introduction
MCP enables AI agents to analyze drug data, manage clinical trials, and accelerate pharmaceutical research.

## Use Cases
- Drug discovery
- Clinical trial management
- Regulatory compliance

## Conclusion
MCP enables powerful AI applications in pharmaceuticals.`
  },
  {
    slug: "mcp-for-aerospace",
    title: "MCP for Aerospace | MCPServer.in",
    description: "Learn how to use Model Context Protocol in aerospace.",
    keywords: ["MCP aerospace", "AI aerospace", "aviation AI", "space AI", "defense AI"],
    category: "industry",
    content: `# MCP for Aerospace

## Introduction
MCP enables AI agents to analyze flight data, optimize routes, and manage aerospace systems.

## Use Cases
- Flight data analysis
- Route optimization
- System management

## Conclusion
MCP enables powerful AI applications in aerospace.`
  },
  {
    slug: "mcp-for-telecommunications",
    title: "MCP for Telecommunications | MCPServer.in",
    description: "Learn how to use Model Context Protocol in telecommunications.",
    keywords: ["MCP telecom", "AI telecom", "telecommunications AI", "network AI", "5G AI"],
    category: "industry",
    content: `# MCP for Telecommunications

## Introduction
MCP enables AI agents to manage networks, optimize performance, and analyze telecom data.

## Use Cases
- Network management
- Performance optimization
- Data analysis

## Conclusion
MCP enables powerful AI applications in telecommunications.`
  },
  {
    slug: "mcp-for-insurance",
    title: "MCP for Insurance | MCPServer.in",
    description: "Learn how to use Model Context Protocol in insurance.",
    keywords: ["MCP insurance", "AI insurance", "insurtech AI", "claims AI", "underwriting AI"],
    category: "industry",
    content: `# MCP for Insurance

## Introduction
MCP enables AI agents to process claims, assess risk, and automate insurance workflows.

## Use Cases
- Claims processing
- Risk assessment
- Policy management

## Conclusion
MCP enables powerful AI applications in insurance.`
  },
  {
    slug: "mcp-for-banking",
    title: "MCP for Banking | MCPServer.in",
    description: "Learn how to use Model Context Protocol in banking.",
    keywords: ["MCP banking", "AI banking", "fintech AI", "banking AI", "financial services AI"],
    category: "industry",
    content: `# MCP for Banking

## Introduction
MCP enables AI agents to process transactions, detect fraud, and automate banking operations.

## Use Cases
- Transaction processing
- Fraud detection
- Customer service

## Conclusion
MCP enables powerful AI applications in banking.`
  },
  {
    slug: "mcp-for-hospitality",
    title: "MCP for Hospitality | MCPServer.in",
    description: "Learn how to use Model Context Protocol in hospitality.",
    keywords: ["MCP hospitality", "AI hospitality", "hotel AI", "tourism AI", "travel AI"],
    category: "industry",
    content: `# MCP for Hospitality

## Introduction
MCP enables AI agents to manage bookings, personalize guest experiences, and optimize hospitality operations.

## Use Cases
- Booking management
- Guest personalization
- Operations optimization

## Conclusion
MCP enables powerful AI applications in hospitality.`
  },
  {
    slug: "mcp-for-media",
    title: "MCP for Media | MCPServer.in",
    description: "Learn how to use Model Context Protocol in media.",
    keywords: ["MCP media", "AI media", "media AI", "journalism AI", "content AI"],
    category: "industry",
    content: `# MCP for Media

## Introduction
MCP enables AI agents to manage media assets, automate content distribution, and analyze media performance.

## Use Cases
- Asset management
- Content distribution
- Performance analysis

## Conclusion
MCP enables powerful AI applications in media.`
  },
  {
    slug: "mcp-for-sports",
    title: "MCP for Sports | MCPServer.in",
    description: "Learn how to use Model Context Protocol in sports.",
    keywords: ["MCP sports", "AI sports", "sports analytics AI", "athletics AI", "fitness AI"],
    category: "industry",
    content: `# MCP for Sports

## Introduction
MCP enables AI agents to analyze performance, predict outcomes, and optimize training in sports.

## Use Cases
- Performance analysis
- Outcome prediction
- Training optimization

## Conclusion
MCP enables powerful AI applications in sports.`
  },
  {
    slug: "mcp-for-nonprofit",
    title: "MCP for Nonprofit | MCPServer.in",
    description: "Learn how to use Model Context Protocol for nonprofits.",
    keywords: ["MCP nonprofit", "AI nonprofit", "charity AI", "NGO AI", "social impact AI"],
    category: "industry",
    content: `# MCP for Nonprofit

## Introduction
MCP enables AI agents to manage donations, coordinate volunteers, and analyze impact for nonprofits.

## Use Cases
- Donation management
- Volunteer coordination
- Impact analysis

## Conclusion
MCP enables powerful AI applications for nonprofits.`
  },
  {
    slug: "mcp-for-government",
    title: "MCP for Government | MCPServer.in",
    description: "Learn how to use Model Context Protocol in government.",
    keywords: ["MCP government", "AI government", "public sector AI", "civic AI", "government AI"],
    category: "industry",
    content: `# MCP for Government

## Introduction
MCP enables AI agents to automate services, analyze data, and improve citizen engagement in government.

## Use Cases
- Service automation
- Data analysis
- Citizen engagement

## Conclusion
MCP enables powerful AI applications in government.`
  },
  {
    slug: "mcp-for-construction",
    title: "MCP for Construction | MCPServer.in",
    description: "Learn how to use Model Context Protocol in construction.",
    keywords: ["MCP construction", "AI construction", "building AI", "architecture AI", "project management AI"],
    category: "industry",
    content: `# MCP for Construction

## Introduction
MCP enables AI agents to manage projects, optimize schedules, and ensure safety in construction.

## Use Cases
- Project management
- Schedule optimization
- Safety monitoring

## Conclusion
MCP enables powerful AI applications in construction.`
  },
  {
    slug: "mcp-for-transportation",
    title: "MCP for Transportation | MCPServer.in",
    description: "Learn how to use Model Context Protocol in transportation.",
    keywords: ["MCP transportation", "AI transportation", "logistics AI", "fleet management AI", "transit AI"],
    category: "industry",
    content: `# MCP for Transportation

## Introduction
MCP enables AI agents to manage fleets, optimize routes, and analyze transportation data.

## Use Cases
- Fleet management
- Route optimization
- Data analysis

## Conclusion
MCP enables powerful AI applications in transportation.`
  },
  {
    slug: "mcp-for-hospitality",
    title: "MCP for Hospitality | MCPServer.in",
    description: "Learn how to use Model Context Protocol in hospitality.",
    keywords: ["MCP hospitality", "AI hospitality", "hotel AI", "tourism AI", "travel AI"],
    category: "industry",
    content: `# MCP for Hospitality

## Introduction
MCP enables AI agents to manage bookings, personalize guest experiences, and optimize hospitality operations.

## Use Cases
- Booking management
- Guest personalization
- Operations optimization

## Conclusion
MCP enables powerful AI applications in hospitality.`
  },
  {
    slug: "mcp-for-media",
    title: "MCP for Media | MCPServer.in",
    description: "Learn how to use Model Context Protocol in media.",
    keywords: ["MCP media", "AI media", "media AI", "journalism AI", "content AI"],
    category: "industry",
    content: `# MCP for Media

## Introduction
MCP enables AI agents to manage media assets, automate content distribution, and analyze media performance.

## Use Cases
- Asset management
- Content distribution
- Performance analysis

## Conclusion
MCP enables powerful AI applications in media.`
  },
  {
    slug: "mcp-for-sports",
    title: "MCP for Sports | MCPServer.in",
    description: "Learn how to use Model Context Protocol in sports.",
    keywords: ["MCP sports", "AI sports", "sports analytics AI", "athletics AI", "fitness AI"],
    category: "industry",
    content: `# MCP for Sports

## Introduction
MCP enables AI agents to analyze performance, predict outcomes, and optimize training in sports.

## Use Cases
- Performance analysis
- Outcome prediction
- Training optimization

## Conclusion
MCP enables powerful AI applications in sports.`
  },
  {
    slug: "mcp-for-nonprofit",
    title: "MCP for Nonprofit | MCPServer.in",
    description: "Learn how to use Model Context Protocol for nonprofits.",
    keywords: ["MCP nonprofit", "AI nonprofit", "charity AI", "NGO AI", "social impact AI"],
    category: "industry",
    content: `# MCP for Nonprofit

## Introduction
MCP enables AI agents to manage donations, coordinate volunteers, and analyze impact for nonprofits.

## Use Cases
- Donation management
- Volunteer coordination
- Impact analysis

## Conclusion
MCP enables powerful AI applications for nonprofits.`
  },
  {
    slug: "mcp-for-government",
    title: "MCP for Government | MCPServer.in",
    description: "Learn how to use Model Context Protocol in government.",
    keywords: ["MCP government", "AI government", "public sector AI", "civic AI", "government AI"],
    category: "industry",
    content: `# MCP for Government

## Introduction
MCP enables AI agents to automate services, analyze data, and improve citizen engagement in government.

## Use Cases
- Service automation
- Data analysis
- Citizen engagement

## Conclusion
MCP enables powerful AI applications in government.`
  },
  {
    slug: "mcp-for-construction",
    title: "MCP for Construction | MCPServer.in",
    description: "Learn how to use Model Context Protocol in construction.",
    keywords: ["MCP construction", "AI construction", "building AI", "architecture AI", "project management AI"],
    category: "industry",
    content: `# MCP for Construction

## Introduction
MCP enables AI agents to manage projects, optimize schedules, and ensure safety in construction.

## Use Cases
- Project management
- Schedule optimization
- Safety monitoring

## Conclusion
MCP enables powerful AI applications in construction.`
  },
  {
    slug: "mcp-for-transportation",
    title: "MCP for Transportation | MCPServer.in",
    description: "Learn how to use Model Context Protocol in transportation.",
    keywords: ["MCP transportation", "AI transportation", "logistics AI", "fleet management AI", "transit AI"],
    category: "industry",
    content: `# MCP for Transportation

## Introduction
MCP enables AI agents to manage fleets, optimize routes, and analyze transportation data.

## Use Cases
- Fleet management
- Route optimization
- Data analysis

## Conclusion
MCP enables powerful AI applications in transportation.`
  },
  {
    slug: "mcp-for-event-management",
    title: "MCP for Event Management | MCPServer.in",
    description: "Learn how to use Model Context Protocol for event management.",
    keywords: ["MCP events", "event management AI", "event planning AI", "conference AI", "event automation"],
    category: "use-case",
    content: `# MCP for Event Management

## Introduction
MCP enables AI agents to manage events, coordinate logistics, and analyze event performance.

## Use Cases
- Event planning
- Logistics coordination
- Performance analysis

## Conclusion
MCP enables powerful AI-powered event management.`
  },
  {
    slug: "mcp-for-travel",
    title: "MCP for Travel | MCPServer.in",
    description: "Learn how to use Model Context Protocol for travel.",
    keywords: ["MCP travel", "AI travel", "travel AI", "booking AI", "trip planning AI"],
    category: "industry",
    content: `# MCP for Travel

## Introduction
MCP enables AI agents to book travel, plan trips, and optimize travel experiences.

## Use Cases
- Travel booking
- Trip planning
- Experience optimization

## Conclusion
MCP enables powerful AI-powered travel.`
  },
  {
    slug: "mcp-for-food",
    title: "MCP for Food | MCPServer.in",
    description: "Learn how to use Model Context Protocol in food industry.",
    keywords: ["MCP food", "AI food", "restaurant AI", "food tech AI", "culinary AI"],
    category: "industry",
    content: `# MCP for Food

## Introduction
MCP enables AI agents to manage inventory, optimize recipes, and analyze food data.

## Use Cases
- Inventory management
- Recipe optimization
- Data analysis

## Conclusion
MCP enables powerful AI applications in food industry.`
  },
  {
    slug: "mcp-for-fashion",
    title: "MCP for Fashion | MCPServer.in",
    description: "Learn how to use Model Context Protocol in fashion.",
    keywords: ["MCP fashion", "AI fashion", "fashion AI", "apparel AI", "retail AI"],
    category: "industry",
    content: `# MCP for Fashion

## Introduction
MCP enables AI agents to manage inventory, personalize recommendations, and optimize fashion operations.

## Use Cases
- Inventory management
- Personalized recommendations
- Operations optimization

## Conclusion
MCP enables powerful AI applications in fashion.`
  },
  {
    slug: "mcp-for-consulting",
    title: "MCP for Consulting | MCPServer.in",
    description: "Learn how to use Model Context Protocol for consulting.",
    keywords: ["MCP consulting", "AI consulting", "business consulting AI", "strategy AI", "management AI"],
    category: "industry",
    content: `# MCP for Consulting

## Introduction
MCP enables AI agents to analyze data, generate insights, and support consulting engagements.

## Use Cases
- Data analysis
- Insight generation
- Engagement support

## Conclusion
MCP enables powerful AI applications in consulting.`
  },
  {
    slug: "mcp-for-recruitment",
    title: "MCP for Recruitment | MCPServer.in",
    description: "Learn how to use Model Context Protocol for recruitment.",
    keywords: ["MCP recruitment", "AI recruitment", "hiring AI", "talent acquisition AI", "HR AI"],
    category: "use-case",
    content: `# MCP for Recruitment

## Introduction
MCP enables AI agents to screen resumes, schedule interviews, and automate recruitment workflows.

## Use Cases
- Resume screening
- Interview scheduling
- Workflow automation

## Conclusion
MCP enables powerful AI-powered recruitment.`
  },
  {
    slug: "mcp-for-onboarding",
    title: "MCP for Onboarding | MCPServer.in",
    description: "Learn how to use Model Context Protocol for onboarding.",
    keywords: ["MCP onboarding", "employee onboarding AI", "HR onboarding AI", "new hire AI", "onboarding automation"],
    category: "use-case",
    content: `# MCP for Onboarding

## Introduction
MCP enables AI agents to automate employee onboarding, manage documentation, and guide new hires.

## Use Cases
- Documentation management
- Process automation
- New hire guidance

## Conclusion
MCP enables powerful AI-powered onboarding.`
  },
  {
    slug: "mcp-for-performance-management",
    title: "MCP for Performance Management | MCPServer.in",
    description: "Learn how to use Model Context Protocol for performance management.",
    keywords: ["MCP performance", "performance management AI", "HR performance AI", "employee performance AI", "review AI"],
    category: "use-case",
    content: `# MCP for Performance Management

## Introduction
MCP enables AI agents to track performance, provide feedback, and manage reviews.

## Use Cases
- Performance tracking
- Feedback provision
- Review management

## Conclusion
MCP enables powerful AI-powered performance management.`
  },
  {
    slug: "mcp-for-lead-qualification",
    title: "MCP for Lead Qualification | MCPServer.in",
    description: "Learn how to use Model Context Protocol for lead qualification.",
    keywords: ["MCP lead qualification", "lead scoring AI", "sales AI", "CRM AI", "prospect AI"],
    category: "use-case",
    content: `# MCP for Lead Qualification

## Introduction
MCP enables AI agents to qualify leads, score prospects, and prioritize sales opportunities.

## Use Cases
- Lead qualification
- Prospect scoring
- Opportunity prioritization

## Conclusion
MCP enables powerful AI-powered lead qualification.`
  },
  {
    slug: "mcp-for-customer-engagement",
    title: "MCP for Customer Engagement | MCPServer.in",
    description: "Learn how to use Model Context Protocol for customer engagement.",
    keywords: ["MCP engagement", "customer engagement AI", "CRM AI", "relationship AI", "customer success AI"],
    category: "use-case",
    content: `# MCP for Customer Engagement

## Introduction
MCP enables AI agents to engage customers, nurture relationships, and improve satisfaction.

## Use Cases
- Customer engagement
- Relationship nurturing
- Satisfaction improvement

## Conclusion
MCP enables powerful AI-powered customer engagement.`
  },
  {
    slug: "mcp-for-lead-nurturing",
    title: "MCP for Lead Nurturing | MCPServer.in",
    description: "Learn how to use Model Context Protocol for lead nurturing.",
    keywords: ["MCP lead nurturing", "lead management AI", "marketing AI", "nurturing AI", "prospect AI"],
    category: "use-case",
    content: `# MCP for Lead Nurturing

## Introduction
MCP enables AI agents to nurture leads, automate follow-ups, and move prospects through the funnel.

## Use Cases
- Lead nurturing
- Follow-up automation
- Funnel movement

## Conclusion
MCP enables powerful AI-powered lead nurturing.`
  },
  {
    slug: "mcp-for-qualification",
    title: "MCP for Qualification | MCPServer.in",
    description: "Learn how to use Model Context Protocol for qualification.",
    keywords: ["MCP qualification", "qualification AI", "sales qualification AI", "BANT AI", "lead qualification"],
    category: "use-case",
    content: `# MCP for Qualification

## Introduction
MCP enables AI agents to qualify opportunities, assess fit, and prioritize sales efforts.

## Use Cases
- Opportunity qualification
- Fit assessment
- Sales prioritization

## Conclusion
MCP enables powerful AI-powered qualification.`
  },
  {
    slug: "mcp-for-proposal-generation",
    title: "MCP for Proposal Generation | MCPServer.in",
    description: "Learn how to use Model Context Protocol for proposal generation.",
    keywords: ["MCP proposal", "proposal generation AI", "sales AI", "RFP AI", "proposal automation"],
    category: "use-case",
    content: `# MCP for Proposal Generation

## Introduction
MCP enables AI agents to generate proposals, customize content, and automate sales documentation.

## Use Cases
- Proposal generation
- Content customization
- Documentation automation

## Conclusion
MCP enables powerful AI-powered proposal generation.`
  },
  {
    slug: "mcp-for-contract-management",
    title: "MCP for Contract Management | MCPServer.in",
    description: "Learn how to use Model Context Protocol for contract management.",
    keywords: ["MCP contracts", "contract management AI", "legal AI", "contract AI", "agreement AI"],
    category: "use-case",
    content: `# MCP for Contract Management

## Introduction
MCP enables AI agents to manage contracts, track renewals, and automate contract workflows.

## Use Cases
- Contract management
- Renewal tracking
- Workflow automation

## Conclusion
MCP enables powerful AI-powered contract management.`
  },
  {
    slug: "mcp-for-invoice-processing",
    title: "MCP for Invoice Processing | MCPServer.in",
    description: "Learn how to use Model Context Protocol for invoice processing.",
    keywords: ["MCP invoices", "invoice processing AI", "accounts payable AI", "billing AI", "invoice AI"],
    category: "use-case",
    content: `# MCP for Invoice Processing

## Introduction
MCP enables AI agents to process invoices, extract data, and automate billing workflows.

## Use Cases
- Invoice processing
- Data extraction
- Billing automation

## Conclusion
MCP enables powerful AI-powered invoice processing.`
  },
  {
    slug: "mcp-for-expense-management",
    title: "MCP for Expense Management | MCPServer.in",
    description: "Learn how to use Model Context Protocol for expense management.",
    keywords: ["MCP expenses", "expense management AI", "finance AI", "accounting AI", "expense AI"],
    category: "use-case",
    content: `# MCP for Expense Management

## Introduction
MCP enables AI agents to track expenses, process reimbursements, and automate expense workflows.

## Use Cases
- Expense tracking
- Reimbursement processing
- Workflow automation

## Conclusion
MCP enables powerful AI-powered expense management.`
  },
  {
    slug: "mcp-for-budgeting",
    title: "MCP for Budgeting | MCPServer.in",
    description: "Learn how to use Model Context Protocol for budgeting.",
    keywords: ["MCP budgeting", "budget AI", "finance AI", "budgeting AI", "planning AI"],
    category: "use-case",
    content: `# MCP for Budgeting

## Introduction
MCP enables AI agents to create budgets, track spending, and analyze financial data.

## Use Cases
- Budget creation
- Spending tracking
- Financial analysis

## Conclusion
MCP enables powerful AI-powered budgeting.`
  },
  {
    slug: "mcp-for-forecasting",
    title: "MCP for Forecasting | MCPServer.in",
    description: "Learn how to use Model Context Protocol for forecasting.",
    keywords: ["MCP forecasting", "forecasting AI", "prediction AI", "trend AI", "planning AI"],
    category: "use-case",
    content: `# MCP for Forecasting

## Introduction
MCP enables AI agents to forecast trends, predict outcomes, and support planning.

## Use Cases
- Trend forecasting
- Outcome prediction
- Planning support

## Conclusion
MCP enables powerful AI-powered forecasting.`
  },
  {
    slug: "mcp-for-scenario-planning",
    title: "MCP for Scenario Planning | MCPServer.in",
    description: "Learn how to use Model Context Protocol for scenario planning.",
    keywords: ["MCP scenario", "scenario planning AI", "what-if AI", "planning AI", "strategy AI"],
    category: "use-case",
    content: `# MCP for Scenario Planning

## Introduction
MCP enables AI agents to simulate scenarios, analyze outcomes, and support strategic planning.

## Use Cases
- Scenario simulation
- Outcome analysis
- Strategic planning

## Conclusion
MCP enables powerful AI-powered scenario planning.`
  },
  {
    slug: "mcp-for-risk-assessment",
    title: "MCP for Risk Assessment | MCPServer.in",
    description: "Learn how to use Model Context Protocol for risk assessment.",
    keywords: ["MCP risk", "risk assessment AI", "risk management AI", "compliance AI", "audit AI"],
    category: "use-case",
    content: `# MCP for Risk Assessment

## Introduction
MCP enables AI agents to assess risks, analyze threats, and support risk management.

## Use Cases
- Risk assessment
- Threat analysis
- Risk management

## Conclusion
MCP enables powerful AI-powered risk assessment.`
  },
  {
    slug: "mcp-for-auditing",
    title: "MCP for Auditing | MCPServer.in",
    description: "Learn how to use Model Context Protocol for auditing.",
    keywords: ["MCP auditing", "audit AI", "compliance AI", "financial audit AI", "audit automation"],
    category: "use-case",
    content: `# MCP for Auditing

## Introduction
MCP enables AI agents to conduct audits, verify compliance, and automate audit workflows.

## Use Cases
- Audit conduction
- Compliance verification
- Workflow automation

## Conclusion
MCP enables powerful AI-powered auditing.`
  },
  {
    slug: "mcp-for-reporting",
    title: "MCP for Reporting | MCPServer.in",
    description: "Learn how to use Model Context Protocol for reporting.",
    keywords: ["MCP reporting", "report automation AI", "business intelligence AI", "analytics AI", "dashboard AI"],
    category: "use-case",
    content: `# MCP for Reporting

## Introduction
MCP enables AI agents to generate reports, analyze data, and automate reporting workflows.

## Use Cases
- Report generation
- Data analysis
- Workflow automation

## Conclusion
MCP enables powerful AI-powered reporting.`
  },
  {
    slug: "mcp-for-dashboarding",
    title: "MCP for Dashboarding | MCPServer.in",
    description: "Learn how to use Model Context Protocol for dashboarding.",
    keywords: ["MCP dashboard", "dashboard AI", "business intelligence AI", "visualization AI", "monitoring AI"],
    category: "use-case",
    content: `# MCP for Dashboarding

## Introduction
MCP enables AI agents to create dashboards, visualize data, and monitor metrics.

## Use Cases
- Dashboard creation
- Data visualization
- Metric monitoring

## Conclusion
MCP enables powerful AI-powered dashboarding.`
  },
]

function generateAllPages(dryRun = false) {
  console.log(`[targeted-pages] ${dryRun ? "Dry run" : "Generating"} targeted pages...`)

  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true })
  }

  const existingFiles = new Set(fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".md")))
  let generated = 0

  for (const page of pages) {
    const fileName = `${page.slug}.md`
    
    if (existingFiles.has(fileName) && !dryRun) {
      console.log(`[targeted-pages] ⏭ ${page.slug} already exists`)
      continue
    }

    const frontmatter = `---
title: "${page.title}"
description: "${page.description}"
keywords: [${page.keywords.map(k => `"${k}"`).join(", ")}]
schemaType: "WebPage"
wordCount: 2000
category: "${page.category}"
---

${page.content}
`

    const filePath = path.join(PAGES_DIR, fileName)
    if (!dryRun) {
      fs.writeFileSync(filePath, frontmatter)
    }

    generated++
    console.log(`[targeted-pages] ✅ ${page.slug}`)
  }

  console.log(`[targeted-pages] ${dryRun ? "Would generate" : "Generated"} ${generated} targeted pages`)
}

const dryRun = process.argv.includes("--dry-run")
generateAllPages(dryRun)
