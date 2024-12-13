import { getCurrentMember, getCurrentMemberExtended } from 'lib/wix';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { extended } = Object.fromEntries(request.nextUrl.searchParams.entries());
  if (extended) {
    const member = await getCurrentMemberExtended();
    return NextResponse.json({ member: member });
  } else {
    const member = await getCurrentMember();
    return NextResponse.json({ member: member });
  }
}
