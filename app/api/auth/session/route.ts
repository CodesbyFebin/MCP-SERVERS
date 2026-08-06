import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken, SESSION_COOKIE_NAME } from "../../../../src/lib/auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.json({ authenticated: false })
  }

  const payload = await verifySessionToken(token)

  if (!payload) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({ authenticated: true, user: { sub: payload.sub, email: payload.email } })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(SESSION_COOKIE_NAME)
  return response
}
