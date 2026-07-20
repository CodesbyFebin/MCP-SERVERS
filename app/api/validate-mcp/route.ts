import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface LogEntry {
  text: string;
  kind: "info" | "success" | "error";
}

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
}

interface ValidateResponse {
  target: string;
  logs: LogEntry[];
  checks: CheckResult[];
  reachable: boolean;
  protocol: "sse" | "http" | "unknown";
  error?: string;
}

const FETCH_TIMEOUT_MS = 8000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal, redirect: "follow" });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const target = typeof body?.url === "string" ? body.url.trim() : "";

  if (!target) {
    return NextResponse.json({ error: "Provide a 'url' field." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(target);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("unsupported protocol");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL. Must be an absolute http(s) URL." }, { status: 400 });
  }

  const logs: LogEntry[] = [
    { text: `Resolving ${target}...`, kind: "info" },
    { text: "Initiating connection handshake...", kind: "info" },
  ];
  const checks: CheckResult[] = [];
  let reachable = false;
  let protocol: ValidateResponse["protocol"] = "unknown";
  let headers: Headers | null = null;
  let status = 0;

  try {
    const res = await fetchWithTimeout(target, { method: "GET" });
    reachable = true;
    status = res.status;
    headers = res.headers;
    logs.push({ text: `TCP connection established to ${parsedUrl.host}`, kind: "success" });

    const contentType = headers.get("content-type") || "";
    if (contentType.includes("text/event-stream")) {
      protocol = "sse";
      logs.push({ text: "Detected SSE content type (text/event-stream)", kind: "success" });
    } else if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      protocol = "http";
      logs.push({ text: `Detected ${contentType.split(";")[0]?.trim() || "unknown"} response type`, kind: "info" });
    }

    const firstBytes = await res.text().catch(() => "");
    if (firstBytes.includes("\"jsonrpc\"") || firstBytes.includes("jsonrpc")) {
      logs.push({ text: "JSON-RPC marker detected in response body", kind: "success" });
      checks.push({
        label: "JSON-RPC marker present",
        passed: true,
        detail: "Response body contains 'jsonrpc' marker consistent with MCP protocol.",
      });
    }

    if (protocol === "sse" || contentType.includes("text/event-stream")) {
      checks.push({
        label: "Server-Sent Events protocol",
        passed: true,
        detail: "Endpoint responds with text/event-stream, suitable for MCP SSE transports.",
      });
    } else if (protocol === "http") {
      checks.push({
        label: "HTTP transport detected",
        passed: true,
        detail: "Endpoint returns a standard HTTP response. Verify MCP capability discovery endpoint separately.",
      });
    } else {
      checks.push({
        label: "Transport protocol",
        passed: true,
        detail: "Endpoint responded, but transport could not be confidently classified from headers alone.",
      });
    }

    const hsts = headers.get("strict-transport-security");
    checks.push({
      label: "HTTPS enforced",
      passed: parsedUrl.protocol === "https:",
      detail: parsedUrl.protocol === "https:"
        ? "URL uses HTTPS. " + (hsts ? "HSTS is present." : "No Strict-Transport-Security header returned.")
        : "URL uses plain HTTP — data in transit is not encrypted.",
    });

    checks.push({
      label: "Reachable",
      passed: status < 500,
      detail: `Endpoint responded with HTTP ${status}.`,
    });

    const authChallenge = status === 401 || status === 403 || Boolean(headers.get("www-authenticate"));
    checks.push({
      label: "Access control",
      passed: authChallenge,
      detail: authChallenge
        ? "Endpoint requires authentication (401/403 or WWW-Authenticate)."
        : "Endpoint returned a non-error response without authentication — verify this is intentional.",
    });
  } catch (error) {
    reachable = false;
    protocol = "unknown";
    const message = error instanceof Error ? error.message : "Unknown network error";
    logs.push({ text: `Connection failed: ${message}`, kind: "error" });
    checks.push({
      label: "Reachable",
      passed: false,
      detail: `Could not reach endpoint: ${message}`,
    });
  }

  logs.push({ text: "Handshake sequence complete.", kind: "info" });

  const response: ValidateResponse = {
    target,
    logs,
    checks,
    reachable,
    protocol,
  };

  if (!reachable && logs.length > 0) {
    response.error = logs[logs.length - 1].text;
  }

  return NextResponse.json(response);
}
