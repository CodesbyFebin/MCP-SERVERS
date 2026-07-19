const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");
const apexUrl = process.env.PRODUCTION_APEX_URL || "https://mcpserver.in";
const legacyHttpUrl = process.env.PRODUCTION_HTTP_URL || "http://mcpserver.in";

const checks = [
  {
    path: "/robots.txt",
    type: "text",
    includes: ["User-Agent: *", "Allow: /", "GPTBot", "ClaudeBot", "PerplexityBot", "Sitemap:"],
  },
  {
    path: "/",
    type: "text",
    includes: [
      '<meta name="robots" content="index, follow"',
      '<meta name="googlebot" content="index, follow',
      '<link rel="canonical" href="https://www.mcpserver.in/"',
    ],
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

const redirectChecks = [
  {
    url: `${apexUrl}/`,
    destination: `${baseUrl}/`,
  },
];

const finalUrlChecks = [
  {
    url: `${legacyHttpUrl}/`,
    destination: `${baseUrl}/`,
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

for (const check of redirectChecks) {
  try {
    const response = await fetch(check.url, { redirect: "manual" });
    const location = response.headers.get("location");

    if (![301, 308].includes(response.status) || location !== check.destination) {
      failures += 1;
      console.error(`FAIL ${check.url}`);
      console.error(`  status: ${response.status}`);
      console.error(`  location: ${location || "(none)"}`);
      console.error(`  expected: ${check.destination}`);
      continue;
    }

    console.log(`OK   ${check.url} -> ${location}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.url}`);
    console.error(`  ${(error && error.message) || error}`);
  }
}

for (const check of finalUrlChecks) {
  try {
    const response = await fetch(check.url, { redirect: "follow" });

    if (!response.ok || response.url !== check.destination) {
      failures += 1;
      console.error(`FAIL ${check.url}`);
      console.error(`  status: ${response.status}`);
      console.error(`  final url: ${response.url}`);
      console.error(`  expected: ${check.destination}`);
      continue;
    }

    console.log(`OK   ${check.url} => ${response.url}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.url}`);
    console.error(`  ${(error && error.message) || error}`);
  }
}

if (failures > 0) {
  console.error(`Production verification failed: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log("Production verification passed.");
