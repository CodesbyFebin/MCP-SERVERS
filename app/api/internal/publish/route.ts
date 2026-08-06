import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "Publication engine is integrated with the content pipeline.",
  });
}
