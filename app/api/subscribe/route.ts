import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  try {
    const fs = await import("fs");
    const path = await import("path");
    const dataPath = path.join(process.cwd(), "public", "data", "newsletter-subscribers.json");
    let subscribers: string[] = [];
    try {
      const raw = fs.readFileSync(dataPath, "utf8");
      subscribers = JSON.parse(raw);
      if (!Array.isArray(subscribers)) subscribers = [];
    } catch {
      subscribers = [];
    }
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(dataPath, JSON.stringify(subscribers, null, 2), "utf8");
    }
  } catch {
    console.error("Failed to persist newsletter subscription", email);
  }

  return NextResponse.json({ ok: true, message: "Subscribed successfully." });
}
