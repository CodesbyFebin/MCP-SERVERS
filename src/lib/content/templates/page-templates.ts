export interface ContentTemplate {
  id: string
  name: string
  pageType: string
  description: string
  sections: TemplateSection[]
  wordTarget: number
  requiredEvidenceCount: number
  requiredClaimCount: number
}

export interface TemplateSection {
  id: string
  title: string
  goal: string
  wordTarget: number
  required: boolean
  allowedClaimTypes: string[]
  prohibitedClaims: string[]
  requiredLinks: string[]
  terminologyRules: Record<string, string>
}

export const SERVER_PROFILE_TEMPLATE: ContentTemplate = {
  id: "template-server-profile",
  name: "Server Profile",
  pageType: "server-detail",
  description: "Complete server profile with evidence-backed sections",
  sections: [
    { id: "hero", title: "Hero", goal: "Introduce the server", wordTarget: 50, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "summary", title: "Summary", goal: "Provide a concise summary", wordTarget: 150, required: true, allowedClaimTypes: ["identity", "feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "verified-identity", title: "Verified Identity", goal: "Show verified identity information", wordTarget: 200, required: true, allowedClaimTypes: ["identity", "official-status"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "capabilities", title: "Capabilities", goal: "List server capabilities", wordTarget: 200, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "installation", title: "Installation", goal: "Provide installation instructions", wordTarget: 300, required: true, allowedClaimTypes: ["installation"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "configuration", title: "Configuration", goal: "Explain configuration options", wordTarget: 300, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "authentication", title: "Authentication", goal: "Describe authentication methods", wordTarget: 200, required: false, allowedClaimTypes: ["compatibility", "security"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "transports", title: "Supported Transports", goal: "List supported transports", wordTarget: 150, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "clients", title: "Supported Clients", goal: "List supported clients", wordTarget: 150, required: true, allowedClaimTypes: ["compatibility"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "tools", title: "Tools", goal: "List available tools", wordTarget: 200, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "resources", title: "Resources", goal: "List available resources", wordTarget: 150, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "prompts", title: "Prompts", goal: "List available prompts", wordTarget: 150, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "security", title: "Security Considerations", goal: "Describe security considerations", wordTarget: 250, required: true, allowedClaimTypes: ["security"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "limitations", title: "Limitations", goal: "List known limitations", wordTarget: 200, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "alternatives", title: "Alternatives", goal: "List alternative servers", wordTarget: 200, required: false, allowedClaimTypes: ["compatibility"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "faq", title: "FAQ", goal: "Answer common questions", wordTarget: 300, required: false, allowedClaimTypes: ["feature", "installation"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "sources", title: "Sources", goal: "List sources and evidence", wordTarget: 100, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
  ],
  wordTarget: 2000,
  requiredEvidenceCount: 2,
  requiredClaimCount: 3,
}

export const TUTORIAL_TEMPLATE: ContentTemplate = {
  id: "template-tutorial",
  name: "Tutorial",
  pageType: "tutorial",
  description: "Step-by-step tutorial with code examples",
  sections: [
    { id: "hero", title: "Hero", goal: "Introduce the tutorial", wordTarget: 50, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "overview", title: "Overview", goal: "Provide learning objective and overview", wordTarget: 150, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "prerequisites", title: "Prerequisites", goal: "List prerequisites", wordTarget: 150, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "setup", title: "Setup", goal: "Setup environment", wordTarget: 300, required: true, allowedClaimTypes: ["installation"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "implementation", title: "Implementation", goal: "Step-by-step implementation", wordTarget: 1000, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "testing", title: "Testing", goal: "Test the implementation", wordTarget: 250, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "debugging", title: "Debugging", goal: "Debug common issues", wordTarget: 200, required: false, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "security", title: "Security Considerations", goal: "Security considerations", wordTarget: 200, required: false, allowedClaimTypes: ["security"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "next-steps", title: "Next Steps", goal: "Next steps and further reading", wordTarget: 150, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "sources", title: "Sources", goal: "List sources", wordTarget: 100, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
  ],
  wordTarget: 2500,
  requiredEvidenceCount: 2,
  requiredClaimCount: 3,
}

export const COMPARISON_TEMPLATE: ContentTemplate = {
  id: "template-comparison",
  name: "Comparison",
  pageType: "comparison",
  description: "Side-by-side comparison of two entities",
  sections: [
    { id: "hero", title: "Hero", goal: "Introduce the comparison", wordTarget: 50, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "summary", title: "Summary", goal: "Comparison summary", wordTarget: 200, required: true, allowedClaimTypes: ["compatibility"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "entities", title: "Entities", goal: "Define both entities", wordTarget: 300, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "comparison-table", title: "Comparison Table", goal: "Side-by-side comparison table", wordTarget: 400, required: true, allowedClaimTypes: ["feature", "compatibility"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "capabilities", title: "Capabilities", goal: "Compare capabilities", wordTarget: 300, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "security", title: "Security", goal: "Compare security", wordTarget: 250, required: true, allowedClaimTypes: ["security"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "verdict", title: "Verdict", goal: "Verdict by user type", wordTarget: 300, required: true, allowedClaimTypes: ["compatibility"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "sources", title: "Sources", goal: "List sources", wordTarget: 100, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
  ],
  wordTarget: 2000,
  requiredEvidenceCount: 2,
  requiredClaimCount: 3,
}

export const COLLECTION_TEMPLATE: ContentTemplate = {
  id: "template-collection",
  name: "Collection",
  pageType: "collection",
  description: "Curated list with methodology",
  sections: [
    { id: "hero", title: "Hero", goal: "Introduce the collection", wordTarget: 50, required: true, allowedClaimTypes: ["identity"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "methodology", title: "Methodology", goal: "Explain selection methodology", wordTarget: 300, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "eligibility", title: "Eligibility Criteria", goal: "List eligibility criteria", wordTarget: 200, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "list", title: "List", goal: "Curated list with summaries", wordTarget: 1000, required: true, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "comparison-table", title: "Comparison Table", goal: "Comparison table", wordTarget: 300, required: false, allowedClaimTypes: ["feature"], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "how-to-choose", title: "How to Choose", goal: "Guidance on choosing", wordTarget: 250, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
    { id: "sources", title: "Sources", goal: "List sources", wordTarget: 100, required: true, allowedClaimTypes: [], prohibitedClaims: [], requiredLinks: [], terminologyRules: {} },
  ],
  wordTarget: 1500,
  requiredEvidenceCount: 2,
  requiredClaimCount: 3,
}

export const TEMPLATES: ContentTemplate[] = [
  SERVER_PROFILE_TEMPLATE,
  TUTORIAL_TEMPLATE,
  COMPARISON_TEMPLATE,
  COLLECTION_TEMPLATE,
]

export function getTemplateByPageType(pageType: string): ContentTemplate | undefined {
  return TEMPLATES.find((t) => t.pageType === pageType)
}
