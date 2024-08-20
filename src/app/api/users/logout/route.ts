// /api/users/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    
    // Clear the cookies by setting them with an expired date
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    response.cookies.set("userActive", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
