// Crawls every URL in the sitemap index and confirms it returns 200.
// Companion to verify-production.mjs (which spot-checks a handful of known-good
// URLs/content markers); this instead checks every URL the sitemap actually lists.
const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://www.mcpserver.in").replace(/\/$/, "");
const CONCURRENCY = Number(process.env.SITEMAP_CHECK_CONCURRENCY || 25);

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

async function fetchXml(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "manual" });
    if (response.status >= 200 && response.status < 300) return { url, status: response.status, ok: true };
    return { url, status: response.status, ok: false };
  } catch (error) {
    return { url, status: null, ok: false, error: error.message };
  }
}

async function main() {
  console.log(`Fetching sitemap index from ${baseUrl}/sitemap-index.xml ...`);

  let sitemaps;
  try {
    sitemaps = extractLocs(await fetchXml(`${baseUrl}/sitemap-index.xml`));
  } catch (error) {
    console.error(`FAIL: could not load sitemap-index.xml (${error.message})`);
    process.exit(1);
  }

  if (sitemaps.length === 0) {
    console.error("FAIL: sitemap-index.xml listed zero sub-sitemaps.");
    process.exit(1);
  }

  let allUrls = [];
  let sitemapFailures = 0;
  for (const sitemapUrl of sitemaps) {
    try {
      const urls = extractLocs(await fetchXml(sitemapUrl));
      console.log(`  OK   ${sitemapUrl} (${urls.length} urls)`);
      allUrls = allUrls.concat(urls);
    } catch (error) {
      sitemapFailures += 1;
      console.error(`  FAIL ${sitemapUrl} (${error.message})`);
    }
  }

  const uniqueUrls = [...new Set(allUrls)];
  console.log(`\nTotal URL entries: ${allUrls.length}, unique: ${uniqueUrls.length}`);
  console.log(`Checking HTTP status for every unique URL (concurrency ${CONCURRENCY})...`);

  const results = [];
  for (let i = 0; i < uniqueUrls.length; i += CONCURRENCY) {
    const batch = uniqueUrls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  const failures = results.filter((r) => !r.ok);
  const okCount = results.length - failures.length;

  console.log("\n" + "=".repeat(50));
  console.log("SITEMAP HEALTH REPORT");
  console.log("=".repeat(50));
  console.log(`Total unique URLs: ${uniqueUrls.length}`);
  console.log(`200 OK:            ${okCount}`);
  console.log(`Failing:           ${failures.length}`);

  if (failures.length > 0) {
    console.log("\nFailing URLs:");
    failures.forEach((f) => console.log(`  - ${f.url} -> ${f.status ?? f.error}`));
  }

  if (failures.length > 0 || sitemapFailures > 0) {
    console.error(`\nSitemap health check failed: ${failures.length} broken URL(s), ${sitemapFailures} unreachable sub-sitemap(s).`);
    process.exit(1);
  }

  console.log("\nAll sitemap URLs returned 200 OK.");
}

main().catch((error) => {
  console.error("Sitemap health check crashed:", error);
  process.exit(1);
});
