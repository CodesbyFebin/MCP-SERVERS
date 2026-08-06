import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";

const root = process.cwd();
const evidenceDir = path.join(root, ".safe-deep", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const PORT = Number(process.env.REDIRECT_VERIFY_PORT || 3130);
const ORIGIN = process.env.REDIRECT_TEST_ORIGIN || `http://127.0.0.1:${PORT}`;
const shouldSpawn = !process.env.REDIRECT_TEST_ORIGIN;

const tests = [
  { source: "http://mcpserver.in/", expected: "https://www.mcpserver.in/", status: 308, maxHops: 1 },
  { source: "https://mcpserver.in/", expected: "https://www.mcpserver.in/", status: 308, maxHops: 1 },
  { source: "http://www.mcpserver.in/", expected: "https://www.mcpserver.in/", status: 308, maxHops: 1 },
  { source: "http://mcpserver.in/how-to-build-mcp-server?utm_source=test", expected: "https://www.mcpserver.in/how-to-build-mcp-server/", status: 308, maxHops: 1 },
  { source: "http://mcpserver.in/mcp-hosting?utm_source=test", expected: "https://www.mcpserver.in/mcp-server-hosting/", status: 308, maxHops: 1 },
  { source: "https://www.mcpserver.in/glossary/streamable-http?ref=duplicate", expected: "https://www.mcpserver.in/glossary/streamable-http/", status: 308, maxHops: 1 },
  { source: "http://mcpserver.in//glossary//streamable-http?utm_medium=x", expected: "https://www.mcpserver.in/glossary/streamable-http/", status: 308, maxHops: 1 },
  { source: "https://www.mcpserver.in/how-to-build-mcp-server/", expected: "https://www.mcpserver.in/how-to-build-mcp-server/", status: 200, maxHops: 0 },
  { source: "https://www.mcpserver.in/mcp-server-hosting/", expected: "https://www.mcpserver.in/mcp-server-hosting/", status: 200, maxHops: 0 },
];

function requestUrl(sourceUrl) {
  const parsed = new URL(sourceUrl);
  return {
    url: `${ORIGIN}${parsed.pathname}${parsed.search}`,
    headers: {
      Host: parsed.host,
      "x-forwarded-proto": parsed.protocol.replace(":", ""),
    },
  };
}

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      await fetch(`${ORIGIN}/`, { headers: { Host: "www.mcpserver.in", "x-forwarded-proto": "https" } });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error(`Timed out waiting for ${ORIGIN}`);
}

function requestManual(url, headers) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "https:" ? https : http;
    const req = client.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port,
        path: `${parsed.pathname}${parsed.search}`,
        method: "GET",
        headers,
      },
      (res) => {
        res.resume();
        res.on("end", () => {
          const location = Array.isArray(res.headers.location) ? res.headers.location[0] : res.headers.location || null;
          resolve({ status: res.statusCode || 0, location });
        });
      },
    );

    req.on("error", reject);
    req.setTimeout(15_000, () => req.destroy(new Error(`Timed out requesting ${url}`)));
    req.end();
  });
}

async function follow(test) {
  const seen = new Set();
  let current = test.source;
  const hops = [];

  for (let i = 0; i <= 5; i += 1) {
    if (seen.has(current)) {
      return { ...test, ok: false, error: `Redirect loop at ${current}`, hops };
    }
    seen.add(current);
    const request = requestUrl(current);
    const response = await requestManual(request.url, request.headers);
    const location = response.location;
    hops.push({ source: current, status: response.status, location });

    if (response.status >= 300 && response.status < 400 && location) {
      current = new URL(location, current).toString();
      continue;
    }

    return { ...test, finalUrl: current, finalStatus: response.status, hops };
  }

  return { ...test, ok: false, error: "Exceeded redirect loop guard", hops };
}

function validate(result) {
  if (result.error) return result.error;
  if (result.hops.length - 1 > result.maxHops) {
    const frameworkRepeatedSlashHop =
      /[\\/]\/+/.test(new URL(result.source).pathname) &&
      result.hops.length === 3 &&
      result.hops[0].status === 308 &&
      result.hops[0].location?.startsWith("/") &&
      result.hops[1].status === result.status &&
      result.hops[1].location === result.expected &&
      result.finalUrl === result.expected &&
      result.finalStatus === 200;

    if (!frameworkRepeatedSlashHop) {
      return `Too many redirects: ${result.hops.length - 1}`;
    }
  }
  const first = result.hops[0];
  if (result.maxHops > 0) {
    const frameworkRepeatedSlashHop = result.hops.length === 3 && first.location?.startsWith("/") && result.hops[1].location === result.expected;
    if (first.status !== result.status) return `Expected first status ${result.status}, got ${first.status}`;
    if (!frameworkRepeatedSlashHop && first.location !== result.expected) return `Expected location ${result.expected}, got ${first.location}`;
  } else {
    if (result.finalStatus !== result.status) return `Expected final status ${result.status}, got ${result.finalStatus}`;
    if (result.finalUrl !== result.expected) return `Expected final URL ${result.expected}, got ${result.finalUrl}`;
  }
  if (result.expected.includes("?utm_") || result.expected.includes("?ref=")) return "Expected URL retained tracking query";
  if (new URL(result.expected).hostname !== "www.mcpserver.in") return "Expected URL host is not canonical";
  if (new URL(result.expected).protocol !== "https:") return "Expected URL protocol is not HTTPS";
  if (new URL(result.expected).pathname !== "/" && !new URL(result.expected).pathname.endsWith("/")) return "Expected URL missing trailing slash";
  return null;
}

/**
 * Every redirect destination we declare must actually resolve.
 *
 * A permanent redirect pointing at a 404 is worse than no redirect at all:
 * it permanently discards the source URL and hands the crawler a dead end.
 * This check exists because a previous revision declared 115 glossary
 * redirects whose destinations did not exist, and the suite passed anyway
 * because it only exercised 9 hand-written scenarios.
 */
async function verifyRedirectDestinations() {
  const declared = [];

  const nextConfig = await import(`${new URL("../next.config.js", import.meta.url).href}`);
  for (const rule of (await nextConfig.default.redirects?.()) ?? []) {
    declared.push({ owner: "next.config.js", ...rule });
  }

  const vercelPath = path.join(root, "vercel.json");
  if (fs.existsSync(vercelPath)) {
    const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
    for (const rule of vercel.redirects ?? []) {
      declared.push({ owner: "vercel.json", ...rule });
    }
  }

  // Skip parameterised/pattern destinations — they cannot be fetched literally.
  const literal = declared.filter(
    (rule) =>
      typeof rule.destination === "string" &&
      rule.destination.startsWith("/") &&
      !/[:*()?]/.test(rule.destination),
  );

  const unique = [...new Set(literal.map((rule) => rule.destination))];
  const ownerFor = new Map(literal.map((rule) => [rule.destination, rule]));
  const broken = [];

  for (const destination of unique) {
    const response = await requestManual(`${ORIGIN}${destination}`, {
      Host: "www.mcpserver.in",
      "x-forwarded-proto": "https",
    });

    // Follow at most one hop so we catch redirect -> redirect -> 404.
    let status = response.status;
    let finalPath = destination;
    if (status >= 300 && status < 400 && response.location) {
      finalPath = response.location;
      const next = await requestManual(new URL(response.location, `${ORIGIN}/`).toString(), {
        Host: "www.mcpserver.in",
        "x-forwarded-proto": "https",
      });
      status = next.status;
    }

    if (status !== 200) {
      const rule = ownerFor.get(destination);
      broken.push({
        owner: rule.owner,
        source: rule.source,
        destination,
        resolvedTo: finalPath,
        status,
      });
    }
  }

  return { checked: unique.length, declared: declared.length, broken };
}

let server;
try {
  if (shouldSpawn) {
    if (!fs.existsSync(path.join(root, ".next"))) {
      throw new Error("Missing .next build. Run npm run build before npm run verify:redirects.");
    }
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(PORT) },
    });
    server.stdout.on("data", (chunk) => process.stdout.write(chunk));
    server.stderr.on("data", (chunk) => process.stderr.write(chunk));
    await waitForServer();
  }

  const results = [];
  for (const test of tests) {
    const result = await follow(test);
    const error = validate(result);
    const frameworkPreProxyHop =
      !error &&
      result.hops.length === 3 &&
      result.hops[0].location?.startsWith("/") &&
      result.hops[1].location === test.expected;
    results.push({ ...result, ok: !error, error, frameworkPreProxyHop });
  }

  const destinations = await verifyRedirectDestinations();

  fs.writeFileSync(
    path.join(evidenceDir, "redirect-verification.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), origin: ORIGIN, results, destinations }, null, 2)}\n`,
  );

  const failures = results.filter((result) => !result.ok);
  if (failures.length > 0 || destinations.broken.length > 0) {
    for (const failure of failures) {
      console.error(`FAIL ${failure.source}: ${failure.error}`);
    }
    for (const broken of destinations.broken) {
      console.error(
        `FAIL [${broken.owner}] ${broken.source} -> ${broken.destination} resolves to HTTP ${broken.status}. ` +
          "A permanent redirect must not point at a non-200 destination.",
      );
    }
    process.exit(1);
  }
  console.log(
    `Redirect verification passed (${results.length} scenario tests, ${destinations.checked} declared destinations resolve).`,
  );
} finally {
  if (server) server.kill("SIGTERM");
}
