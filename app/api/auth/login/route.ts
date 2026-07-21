import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../src/lib/db';
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME, sessionCookieOptions } from '../../../../src/lib/auth';

function toPublicUser(user: { id: string; email: string; name: string; company_name: string | null }) {
  return { id: user.id, email: user.email, name: user.name, companyName: user.company_name };
}

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json({ error: 'email and password are required' }, { status: 400 });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await createSessionToken({ sub: user.id, email: user.email });
    const response = NextResponse.json({ user: toPublicUser(user) });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Login failed: ${message}` }, { status: 500 });
  }
}
