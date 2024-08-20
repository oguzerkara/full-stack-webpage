import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/dbConfig/dbConfig'; 
import User from "@/models/userModel"; 

export async function GET(request: NextRequest) {
  try {
    const dbName = "integreat"; // Replace with your actual database name
    const connection = await connectToDatabase(dbName);
    const userModel = connection.model('UserAuth', User.schema, 'user_auth');

    const userID = await getDataFromToken(request);
    const user = await userModel.findOne({ _id: userID }).select("-password");
    return NextResponse.json({
      message: "User found",
      userData: user
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
