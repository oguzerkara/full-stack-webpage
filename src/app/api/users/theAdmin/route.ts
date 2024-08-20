// /api/users/theAdmin/route.ts
import { getIsAdminFromToken } from "@/helpers/getIsAdminFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/dbConfig/dbConfig'; 
import User from "@/models/userModel"; 

// Ensure this route is marked as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const userModel = connection.model('UserAuth', User.schema, 'user_auth');

    const userID = await getIsAdminFromToken(request);
    
    if (!userID) {
      console.error('Invalid token or userID not found');
      throw new Error('Invalid token or user not found');
    }
    
    const user = await userModel.findOne({ _id: userID }).select("isAdmin");
    
    if (!user) {
      console.error('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user);

    return NextResponse.json({
      message: "User found",
      isAdmin: user.isAdmin
    });
  } catch (error: any) {
    console.error('Error in /api/users/theAdmin:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
