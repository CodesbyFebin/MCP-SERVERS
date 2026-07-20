#!/usr/bin/env node

const DEFAULT_KEY = "5492b551b0d847d08720007935e6d011";
const DEFAULT_HOST = "www.mcpserver.in";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10000;

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
const host = process.env.INDEXNOW_HOST || DEFAULT_HOST;
const protocol = process.env.INDEXNOW_PROTOCOL || "https";
const origin = `${protocol}://${host}`;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `${origin}/${key}.txt`;
const sitemapUrl = process.env.INDEXNOW_SITEMAP_URL || `${origin}/sitemap-index.xml`;

const corePaths = [
  "/",
  "/servers/",
  "/categories/",
  "/p99/",
  "/state-of-mcp/",
  "/learn/",
  "/features/",
  "/enterprise/",
  "/faq/",
  "/blog/",
  "/sitemap-index.xml",
];

const coreUrls = corePaths.map((path) => new URL(path, origin).toString());

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`.trim());
  }
  return response.text();
}

async function collectSitemapUrls() {
  const urls = new Set(coreUrls);
  const queue = [sitemapUrl];
  const visited = new Set();

  while (queue.length > 0 && urls.size < MAX_URLS_PER_REQUEST) {
    const currentUrl = queue.shift();
    if (!currentUrl || visited.has(currentUrl)) {
      continue;
    }

    visited.add(currentUrl);

    try {
      const xml = await fetchText(currentUrl);
      for (const loc of extractLocs(xml)) {
        if (loc.endsWith(".xml")) {
          queue.push(loc);
        } else if (loc.startsWith(origin)) {
          urls.add(loc);
        }

        if (urls.size >= MAX_URLS_PER_REQUEST) {
          break;
        }
      }
    } catch (error) {
      console.warn(`WARN Could not read sitemap ${currentUrl}: ${error.message}`);
    }
  }

  return [...urls].slice(0, MAX_URLS_PER_REQUEST);
}

async function verifyKeyLocation() {
  const response = await fetch(keyLocation);
  if (!response.ok) {
    throw new Error(`IndexNow key file returned ${response.status} at ${keyLocation}`);
  }

  const text = (await response.text()).trim();
  if (text !== key) {
    throw new Error(`IndexNow key file content does not match ${keyLocation}`);
  }
}

async function submitToIndexNow(urlList) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList,
  };

  if (dryRun) {
    console.log(`DRY RUN IndexNow payload for ${urlList.length} URLs`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  await verifyKeyLocation();

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`IndexNow submission failed with ${response.status}: ${text}`);
  }

  console.log(`IndexNow submission accepted with ${response.status}.`);
  if (text.trim()) {
    console.log(text.trim());
  }
}

async function main() {
  const urls = await collectSitemapUrls();
  console.log(`Submitting ${urls.length} URLs to IndexNow for ${host}.`);
  await submitToIndexNow(urls);
}

main().catch((error) => {
  console.warn(`WARN IndexNow submission skipped: ${error.message}`);
});
