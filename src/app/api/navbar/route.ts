// /src/app/api/navbar/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userActive = req.cookies.get('userActive')?.value;

  return NextResponse.json({
    isActive: userActive === 'true',
  });
}
