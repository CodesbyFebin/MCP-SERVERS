const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");

const checks = [
  {
    path: "/robots.txt",
    type: "text",
    includes: ["GPTBot", "ClaudeBot", "PerplexityBot", "Sitemap:"],
  },
  {
    path: "/sitemap.xml",
    type: "text",
    includes: ["https://www.mcpserver.in/", "/servers/", "/p99/", "/faq/"],
  },
  {
    path: "/sitemap-index.xml",
    type: "text",
    includes: ["sitemap-pages.xml", "sitemap-integrations.xml", "sitemap-docs.xml"],
  },
  {
    path: "/faq/",
    type: "text",
    includes: ["application/ld+json", "FAQPage"],
  },
  {
    path: "/p99/",
    type: "text",
    includes: ["Real-time p99 latency dashboard", "mcp-india-stats-2026.csv", "application/ld+json"],
  },
  {
    path: "/data/mcp-stats-2026.json",
    type: "json",
    includes: ["series", "regions"],
  },
  {
    path: "/data/mcp-stats-2026.csv",
    type: "text",
    includes: ["time,p50_ms,p90_ms,p99_ms"],
  },
  {
    path: "/data/mcp-india-stats-2026.csv",
    type: "text",
    includes: ["Metric,Value,Region,Timestamp", "p99_latency_ms"],
  },
];

async function readBody(response, type) {
  if (type === "json") {
    return JSON.stringify(await response.json());
  }
  return response.text();
}

let failures = 0;

for (const check of checks) {
  const url = `${baseUrl}${check.path}`;
  try {
    const response = await fetch(url, { redirect: "follow" });
    const body = await readBody(response, check.type);
    const missing = check.includes.filter((needle) => !body.includes(needle));

    if (!response.ok || missing.length > 0) {
      failures += 1;
      console.error(`FAIL ${url}`);
      console.error(`  status: ${response.status}`);
      if (missing.length > 0) console.error(`  missing: ${missing.join(", ")}`);
      continue;
    }

    console.log(`OK   ${url}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${url}`);
    console.error(`  ${(error && error.message) || error}`);
  }
}

if (failures > 0) {
  console.error(`Production verification failed: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log("Production verification passed.");
