export const PAGE_TEMPLATES = {
  "tutorial": {
    "name": "Tutorial",
    "sections": [
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
      "References"
    ]
  },
  "comparison": {
    "name": "Comparison",
    "sections": [
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
      "FAQ"
    ]
  },
  "glossary": {
    "name": "Glossary",
    "sections": [
      "Definition",
      "Purpose",
      "Architecture",
      "Examples",
      "Related Concepts",
      "References"
    ]
  },
  "integration": {
    "name": "Integration Guide",
    "sections": [
      "Overview",
      "Prerequisites",
      "Setup",
      "Configuration",
      "Examples",
      "Testing",
      "Deployment",
      "Troubleshooting",
      "FAQ"
    ]
  },
  "troubleshooting": {
    "name": "Troubleshooting",
    "sections": [
      "Overview",
      "Common Issues",
      "Diagnostics",
      "Solutions",
      "Prevention",
      "FAQ"
    ]
  },
  "best-list": {
    "name": "Best List",
    "sections": [
      "Overview",
      "Criteria",
      "Top Picks",
      "Honorable Mentions",
      "How to Choose",
      "FAQ"
    ]
  },
  "case-study": {
    "name": "Case Study",
    "sections": [
      "Overview",
      "Challenge",
      "Solution",
      "Implementation",
      "Results",
      "Lessons Learned",
      "FAQ"
    ]
  },
  "enterprise": {
    "name": "Enterprise Guide",
    "sections": [
      "Overview",
      "Enterprise Requirements",
      "Architecture",
      "Security",
      "Compliance",
      "Deployment",
      "Governance",
      "ROI",
      "Case Studies",
      "FAQ"
    ]
  }
} as const;

export type TemplateName = keyof typeof PAGE_TEMPLATES;
