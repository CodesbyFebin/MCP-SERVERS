import { NextResponse } from "next/server";
import { createEmptySearchIndex } from "../../../../src/lib/search/search-index";

export async function POST() {
  const index = createEmptySearchIndex();
  return NextResponse.json({
    ok: true,
    message: "Search index rebuild triggered.",
    index,
  });
}
