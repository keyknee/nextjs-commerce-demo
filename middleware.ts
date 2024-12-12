import { createClient, OAuthStrategy, Tokens } from '@wix/sdk';
import { WIX_SESSION_COOKIE } from 'lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const wixClient = createClient({
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID!
  })
});

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE);

  let sessionTokens: Tokens;

  if (sessionCookie) {
    // Parse existing session cookie
    sessionTokens = JSON.parse(sessionCookie.value) as Tokens;

    // Check if the session is valid
    if (sessionTokens.accessToken.expiresAt >= Math.floor(Date.now() / 1000)) {
      // Valid session, proceed without modifying it
      return NextResponse.next();
    }

    // Attempt to renew the session if expired
    try {
      sessionTokens = await wixClient.auth.renewToken(sessionTokens.refreshToken);
    } catch (e) {
      console.warn('Failed to renew session, generating visitor tokens');
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  } else {
    // No session cookie, generate visitor tokens
    sessionTokens = await wixClient.auth.generateVisitorTokens();
  }

  // Set the updated session cookie
  const res = NextResponse.next();
  res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 12,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
