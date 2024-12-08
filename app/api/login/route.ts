import { getWixMemberClient } from 'lib/wix';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const wixClient = getWixMemberClient();
  const { originalUri } = Object.fromEntries(request.nextUrl.searchParams.entries());
  const data = wixClient.auth.generateOAuthData(
    `${request.nextUrl.protocol}//${request.nextUrl.host}/login-callback`,
    `${originalUri || request.nextUrl.host}`
  );
  console.log(
    `generateOAuthData(${`${request.nextUrl.protocol}//${request.nextUrl.host}/login-callback`},${originalUri || request.nextUrl.host})`
  );
  try {
    const { authUrl } = await wixClient.auth.getAuthUrl(data);
    const response = NextResponse.json({ authUrl });
    response.cookies.set('oAuthRedirectData', JSON.stringify(data));
    return response;
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
