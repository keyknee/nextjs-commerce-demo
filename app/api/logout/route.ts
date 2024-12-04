import { getWixMemberClient } from 'lib/wix';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const wixClient = getWixMemberClient();
  const { originalUri } = Object.fromEntries(request.nextUrl.searchParams.entries());
  try {
    const { logoutUrl } = await wixClient.auth.logout(originalUri || '');
    const response = NextResponse.json({ logoutUrl });
    response.cookies.delete('wix-session');
    return response;
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
