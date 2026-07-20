import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createCommunitySubmission } from "../../../../src/lib/db";
import { checkRateLimit } from "../../../../src/lib/rate-limiter";

export const runtime = "nodejs";

const VALID_TYPES = ["story", "tutorial", "resource", "review", "config"] as const;
type SubmissionType = (typeof VALID_TYPES)[number];

const MAX_FIELD_LENGTH = 2000;
const MAX_FIELDS = 10;
const MAX_URLS_PER_SUBMISSION = 3;

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex");
}

function countUrls(values: string[]) {
  const urlPattern = /https?:\/\/\S+/g;
  return values.reduce((total, value) => total + (value.match(urlPattern)?.length ?? 0), 0);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = ip === "unknown" ? null : hashIp(ip);
  const rateLimit = checkRateLimit(ipHash ?? "unknown");

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a minute before trying again." },
      { status: 429, headers: { "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString() } }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { postId, type, payload, website } = body as {
    postId?: unknown;
    type?: unknown;
    payload?: unknown;
    website?: unknown;
  };

  // Honeypot: real users never see or fill this field. If it's filled,
  // return success without persisting anything, so bots get no signal
  // that they were caught.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Submission received and pending moderation." }, { status: 201 });
  }

  if (typeof postId !== "string" || !postId.trim()) {
    return NextResponse.json({ error: "postId is required." }, { status: 400 });
  }

  if (typeof type !== "string" || !VALID_TYPES.includes(type as SubmissionType)) {
    return NextResponse.json({ error: `type must be one of: ${VALID_TYPES.join(", ")}` }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "payload must be an object of field values." }, { status: 400 });
  }

  const entries = Object.entries(payload as Record<string, unknown>);
  if (entries.length === 0) {
    return NextResponse.json({ error: "payload must not be empty." }, { status: 400 });
  }
  if (entries.length > MAX_FIELDS) {
    return NextResponse.json({ error: "Too many fields in payload." }, { status: 400 });
  }

  const cleanPayload: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (typeof value !== "string") {
      return NextResponse.json({ error: `Field "${key}" must be a string.` }, { status: 400 });
    }
    if (value.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ error: `Field "${key}" exceeds ${MAX_FIELD_LENGTH} characters.` }, { status: 400 });
    }
    cleanPayload[key] = value;
  }

  if (Object.values(cleanPayload).every((value) => !value.trim())) {
    return NextResponse.json({ error: "payload fields cannot all be empty." }, { status: 400 });
  }

  const urlCount = countUrls(Object.values(cleanPayload));
  if (urlCount > MAX_URLS_PER_SUBMISSION) {
    return NextResponse.json({ error: `Submissions cannot contain more than ${MAX_URLS_PER_SUBMISSION} links.` }, { status: 400 });
  }

  try {
    await createCommunitySubmission({
      postId,
      submissionType: type,
      payload: cleanPayload,
      submitterIpHash: ipHash,
    });
  } catch (error) {
    console.error("Community submission failed to persist:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Submission received and pending moderation." }, { status: 201 });
}
