import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '../../../../src/lib/db';
import { hashPassword, createSessionToken, SESSION_COOKIE_NAME, sessionCookieOptions } from '../../../../src/lib/auth';

function toPublicUser(user: { id: string; email: string; name: string; company_name: string | null }) {
  return { id: user.id, email: user.email, name: user.name, companyName: user.company_name };
}

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string; name?: string; companyName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  const name = body.name?.trim();
  const companyName = body.companyName?.trim() || null;

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'email, password and name are required' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ email, passwordHash, name, companyName });
    const token = await createSessionToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Registration failed: ${message}` }, { status: 500 });
  }
}
