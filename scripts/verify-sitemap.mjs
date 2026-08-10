// Verifies the canonical Next sitemap endpoint and every URL it lists.
const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://mcpserver.in").replace(/\/$/, "");
const sitemapUrl = `${baseUrl}/sitemap.xml`;
const CONCURRENCY = Number(process.env.SITEMAP_CHECK_CONCURRENCY || 25);

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

async function fetchXml(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "manual" });
    return { url, status: response.status, ok: response.status >= 200 && response.status < 300 };
  } catch (error) {
    return { url, status: null, ok: false, error: error.message };
  }
}

async function main() {
  console.log(`Fetching canonical sitemap from ${sitemapUrl} ...`);
  let xml;
  try {
    xml = await fetchXml(sitemapUrl);
  } catch (error) {
    console.error(`FAIL: could not load ${sitemapUrl} (${error.message})`);
    process.exit(1);
  }

  const urls = extractLocs(xml);
  if (urls.length === 0) {
    console.error("FAIL: sitemap.xml listed zero URLs.");
    process.exit(1);
  }

  const uniqueUrls = [...new Set(urls)];
  const invalidOrigin = uniqueUrls.filter((url) => !url.startsWith(`${baseUrl}/`) && url !== `${baseUrl}/`);
  const invalidShape = uniqueUrls.filter((url) => new URL(url).pathname !== "/" && !new URL(url).pathname.endsWith("/"));

  if (invalidOrigin.length || invalidShape.length) {
    console.error(`FAIL: sitemap contains ${invalidOrigin.length} non-canonical origin URL(s) and ${invalidShape.length} non-canonical path URL(s).`);
    process.exit(1);
  }

  console.log(`Canonical sitemap entries: ${uniqueUrls.length}`);
  console.log(`Checking HTTP status for every unique URL (concurrency ${CONCURRENCY})...`);

  const results = [];
  for (let i = 0; i < uniqueUrls.length; i += CONCURRENCY) {
    const batch = uniqueUrls.slice(i, i + CONCURRENCY);
    results.push(...(await Promise.all(batch.map(checkUrl))));
  }

  const failures = results.filter((r) => !r.ok);
  const okCount = results.length - failures.length;

  console.log("\n" + "=".repeat(50));
  console.log("SITEMAP HEALTH REPORT");
  console.log("=".repeat(50));
  console.log(`Total unique URLs: ${uniqueUrls.length}`);
  console.log(`200 OK:            ${okCount}`);
  console.log(`Failing:           ${failures.length}`);

  if (failures.length) {
    console.log("\nFailing URLs:");
    failures.forEach((failure) => console.log(`  - ${failure.url} -> ${failure.status ?? failure.error}`));
    process.exit(1);
  }

  console.log("\nCanonical sitemap health check passed.");
}

main().catch((error) => {
  console.error("Sitemap health check crashed:", error);
  process.exit(1);
});
