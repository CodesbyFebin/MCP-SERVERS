import { NextRequest, NextResponse } from "next/server"
import { verifyPassword, hashPassword, createSessionToken, sessionCookieOptions } from "../../../../src/lib/auth"
import { getUserByEmail, createUser } from "../../../../src/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    let user = await getUserByEmail(email)

    if (!user) {
      const passwordHash = await hashPassword(password)
      user = await createUser({
        email,
        passwordHash,
        name: email.split("@")[0],
        companyName: null,
      })
    } else {
      const valid = await verifyPassword(password, user.password_hash)
      if (!valid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
    })

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } })

    response.cookies.set("mcpserver_session", token, sessionCookieOptions)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
