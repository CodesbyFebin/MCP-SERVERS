import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '../../../../src/lib/db';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../../src/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const user = await getUserById(session.sub);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, companyName: user.company_name },
    });
  } catch (error) {
    console.error('Failed to load session user:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
