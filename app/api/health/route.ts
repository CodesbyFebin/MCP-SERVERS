import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "mcpserver.in",
      version: process.env.APP_VERSION ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
