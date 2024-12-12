import { WIX_SESSION_COOKIE } from 'lib/constants';
import { getWixMemberClient } from 'lib/wix';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const wixClient = getWixMemberClient();
  const { code, state } = Object.fromEntries(request.nextUrl.searchParams.entries());
  if (!code || !state) {
    return NextResponse.json({ error: 'Invalid callback parameters' }, { status: 400 });
  }

  const oauthData = JSON.parse(request.cookies.get('oAuthRedirectData')?.value || '{}');

  if (!oauthData) {
    return NextResponse.json({ error: 'OAuth data missing' }, { status: 400 });
  }
  let tokens = await wixClient.auth.getMemberTokens(code, state, oauthData);
  while (!tokens?.refreshToken?.value) {
    // temporary workaround
    tokens = tokens = await wixClient.auth.getMemberTokens(code, state, oauthData);
  }
  const { originalUri } = oauthData;

  const response = NextResponse.json({ originalUri: originalUri });
  response.cookies.delete('oAuthRedirectData');
  response.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(tokens), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 12 // Ensure consistent expiration
  });

  return response;
}
