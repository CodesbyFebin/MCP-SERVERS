import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface CheckResult {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail: string;
}

const FETCH_TIMEOUT_MS = 8000;

function jsonResponse(status: number, body: unknown) {
  return NextResponse.json(body, { status });
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function parseGithubRepo(input: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(input);
    if (!/(^|\.)github\.com$/.test(url.hostname)) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

async function scanGithubRepo(owner: string, repo: string): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];
  const headers = { "User-Agent": "mcpserver.in-dpdp-scanner", Accept: "application/vnd.github+json" };

  const repoRes = await fetchWithTimeout(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (repoRes.status === 404) {
    throw Object.assign(new Error(`Repository ${owner}/${repo} not found on GitHub`), { status: 404 });
  }
  if (repoRes.status === 403) {
    throw Object.assign(new Error("GitHub API rate limit exceeded for this server. Try again in a few minutes."), { status: 429 });
  }
  if (!repoRes.ok) {
    throw Object.assign(new Error(`GitHub API returned ${repoRes.status} for ${owner}/${repo}`), { status: 502 });
  }
  const repoData = await repoRes.json();

  checks.push({
    id: "public-repo",
    label: "Publicly auditable source code",
    weight: 10,
    passed: repoData.visibility === "public" || repoData.private === false,
    detail: repoData.visibility === "public" || repoData.private === false
      ? "Repository is public and can be independently audited."
      : "Repository is private — cannot be independently audited.",
  });

  checks.push({
    id: "license",
    label: "Declared open source license",
    weight: 15,
    passed: Boolean(repoData.license?.spdx_id && repoData.license.spdx_id !== "NOASSERTION"),
    detail: repoData.license?.spdx_id && repoData.license.spdx_id !== "NOASSERTION"
      ? `Licensed under ${repoData.license.spdx_id}.`
      : "No SPDX-recognized license detected via the GitHub API.",
  });

  const pushedAt = repoData.pushed_at ? new Date(repoData.pushed_at) : null;
  const monthsSincePush = pushedAt ? (Date.now() - pushedAt.getTime()) / (1000 * 60 * 60 * 24 * 30) : Infinity;
  checks.push({
    id: "maintenance",
    label: "Actively maintained (pushed within 12 months)",
    weight: 10,
    passed: monthsSincePush <= 12,
    detail: pushedAt
      ? `Last push was ${pushedAt.toISOString().slice(0, 10)} (${Math.round(monthsSincePush)} months ago).`
      : "No push history available.",
  });

  let rootFiles: { name: string }[] = [];
  const contentsRes = await fetchWithTimeout(`https://api.github.com/repos/${owner}/${repo}/contents/`, { headers });
  if (contentsRes.ok) {
    const contents = await contentsRes.json();
    if (Array.isArray(contents)) rootFiles = contents;
  }
  const fileNames = new Set(rootFiles.map((f) => f.name.toLowerCase()));

  const hasSecurityMd = fileNames.has("security.md");
  checks.push({
    id: "security-policy",
    label: "SECURITY.md vulnerability disclosure policy",
    weight: 15,
    passed: hasSecurityMd,
    detail: hasSecurityMd
      ? "SECURITY.md found in repository root."
      : "No SECURITY.md found in repository root — no documented vulnerability disclosure process.",
  });

  const hasPrivacyDoc = [...fileNames].some((n) => n.includes("privacy"));
  let readmeText = "";
  const readmeFile = rootFiles.find((f) => f.name.toLowerCase().startsWith("readme"));
  if (readmeFile) {
    const defaultBranch = repoData.default_branch || "main";
    const rawRes = await fetchWithTimeout(
      `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${readmeFile.name}`
    );
    if (rawRes.ok) readmeText = (await rawRes.text()).toLowerCase();
  }

  const dataHandlingKeywords = ["privacy policy", "data retention", "gdpr", "dpdp", "personal data", "encrypt"];
  const mentionsDataHandling = hasPrivacyDoc || dataHandlingKeywords.some((k) => readmeText.includes(k));
  checks.push({
    id: "data-handling-disclosure",
    label: "Documented data handling / privacy practices",
    weight: 20,
    passed: mentionsDataHandling,
    detail: hasPrivacyDoc
      ? "Dedicated privacy documentation found in repository root."
      : mentionsDataHandling
        ? "README references data handling, privacy, or encryption practices."
        : "No privacy documentation or data-handling disclosure found in README or repo root.",
  });

  const authKeywords = ["oauth", "api key", "api_key", "authentication", "access token", "bearer token"];
  const mentionsAuth = authKeywords.some((k) => readmeText.includes(k));
  checks.push({
    id: "auth-documented",
    label: "Documented authentication / access control",
    weight: 15,
    passed: mentionsAuth,
    detail: mentionsAuth
      ? "README documents an authentication or access-control mechanism."
      : "No authentication mechanism documented in README — verify manually before production use.",
  });

  const openIssues = typeof repoData.open_issues_count === "number" ? repoData.open_issues_count : null;
  checks.push({
    id: "issue-transparency",
    label: "Issue tracker open for public scrutiny",
    weight: 15,
    passed: repoData.has_issues === true,
    detail: repoData.has_issues
      ? `Issue tracker is enabled (${openIssues ?? "unknown"} open issues visible).`
      : "Issue tracker is disabled — community cannot report or track compliance/security concerns.",
  });

  return checks;
}

async function scanLiveEndpoint(target: string): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];
  const url = new URL(target);

  checks.push({
    id: "https-enforced",
    label: "Served over HTTPS",
    weight: 30,
    passed: url.protocol === "https:",
    detail: url.protocol === "https:" ? "Endpoint URL uses HTTPS." : "Endpoint URL uses plain HTTP — data in transit is not encrypted.",
  });

  let res: Response | null = null;
  let reachable = false;
  let headers: Headers | null = null;
  try {
    res = await fetchWithTimeout(target, { method: "GET", redirect: "follow" });
    reachable = true;
    headers = res.headers;
  } catch (error) {
    checks.push({
      id: "reachable",
      label: "Endpoint reachable",
      weight: 30,
      passed: false,
      detail: `Could not reach endpoint: ${error instanceof Error ? error.message : "unknown network error"}`,
    });
  }

  if (reachable && res) {
    checks.push({
      id: "reachable",
      label: "Endpoint reachable",
      weight: 30,
      passed: res.status < 500,
      detail: `Endpoint responded with HTTP ${res.status}.`,
    });

    const hsts = headers?.get("strict-transport-security");
    checks.push({
      id: "hsts",
      label: "HTTP Strict Transport Security header",
      weight: 20,
      passed: Boolean(hsts),
      detail: hsts ? `HSTS header present: ${hsts}` : "No Strict-Transport-Security header returned.",
    });

    const authChallenge = res.status === 401 || res.status === 403 || Boolean(headers?.get("www-authenticate"));
    checks.push({
      id: "access-control",
      label: "Access control observed on unauthenticated request",
      weight: 20,
      passed: authChallenge,
      detail: authChallenge
        ? "Endpoint requires authentication (401/403 or WWW-Authenticate observed) on an unauthenticated request."
        : "Endpoint returned a non-error response without authentication — verify this is intentionally public.",
    });
  }

  return checks;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const target = typeof body?.url === "string" ? body.url.trim() : "";

  if (!target) {
    return jsonResponse(400, { error: "Provide a 'url' field: a GitHub repository URL or a live MCP server endpoint." });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(target);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error("unsupported protocol");
  } catch {
    return jsonResponse(400, { error: "Invalid URL. Must be an absolute http(s) URL." });
  }

  const githubRepo = parseGithubRepo(target);

  try {
    const checks = githubRepo
      ? await scanGithubRepo(githubRepo.owner, githubRepo.repo)
      : await scanLiveEndpoint(target);

    const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
    const earnedWeight = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);
    const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    return jsonResponse(200, {
      target,
      scanType: githubRepo ? "github-repository" : "live-endpoint",
      score,
      checks,
      disclaimer:
        "This is an automated scan of publicly observable technical signals only. It is not a legal determination of DPDP Act compliance and does not replace a formal compliance audit.",
      scannedAt: new Date().toISOString(),
    });
  } catch (error) {
    const status = (error as { status?: number })?.status ?? 502;
    const message = error instanceof Error ? error.message : "Unknown error while scanning target.";
    return jsonResponse(status, { error: message });
  }
}
