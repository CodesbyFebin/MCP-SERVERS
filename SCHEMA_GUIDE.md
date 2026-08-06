# Schema Guide

## Valid Schema.org Types

Use only valid Schema.org types. Do not invent unsupported types.

## Server Detail Page

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Server Name",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "softwareVersion": "1.0.0",
  "license": "MIT",
  "url": "https://mcpserver.in/servers/server-slug"
}
```

Additional types:
- `TechArticle` - For technical documentation
- `BreadcrumbList` - For navigation
- `FAQPage` - For FAQ sections
- `HowTo` - For step-by-step instructions
- `Organization` - For maintainer/company info
- `Person` - For author info
- `WebPage` - For page-level metadata

## Comparison Page

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Server A"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Server B"
    }
  ]
}
```

## Collection Page

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Best Database MCP Servers",
  "description": "Curated list of best database MCP servers"
}
```

## Glossary Page

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Model Context Protocol",
  "description": "A protocol for connecting AI models to external tools"
}
```

## Rules

- Schema must match visible content exactly
- Use `SoftwareApplication` only when describing actual software
- Use `HowTo` only when page contains genuine step-by-step instructions
- Use `FAQPage` only when page contains the same questions and answers
- Do not invent types like `ComparisonPage`
