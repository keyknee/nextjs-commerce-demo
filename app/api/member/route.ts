import { getCurrentMember } from 'lib/wix';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const member = await getCurrentMember();
  return NextResponse.json({ member: member });
}
