import { NextResponse } from "next/server";
import { submitToIndexNow, buildIndexNowPayload } from "../../../src/lib/indexnow";
import { siteConfig } from "../../../src/data/site";

export const runtime = "nodejs";

function jsonResponse(status: number, body: unknown) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !Array.isArray(body.urls) || body.urls.length === 0) {
      return jsonResponse(400, { error: "urls must be a non-empty array" });
    }

    const urls = body.urls.filter((url: unknown) => typeof url === "string" && url.length > 0);
    if (urls.length === 0) {
      return jsonResponse(400, { error: "No valid URLs provided" });
    }

    const payload = buildIndexNowPayload({
      host: siteConfig.indexNow?.host || new URL(siteConfig.url).host,
      key: siteConfig.indexNow?.key || "",
      keyLocation: siteConfig.indexNow?.keyLocation || "",
      urls,
    });

    if (!payload.key || !payload.keyLocation) {
      return jsonResponse(500, { error: "IndexNow key or keyLocation not configured" });
    }

    const result = await submitToIndexNow(payload);
    return jsonResponse(result.status, { message: result.message });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("403") || message.includes("422") ? 403 : 400;
    return jsonResponse(status, { error: message });
  }
}