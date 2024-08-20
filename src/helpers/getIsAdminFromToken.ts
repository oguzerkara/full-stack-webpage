// /helpers/getIsAdminFromToken.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getIsAdminFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || ''; 

  try {
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log('Decoded token:', decodedToken); // Log the decoded token for debugging
    return decodedToken.id; // Ensure this returns the user ID
  } catch (error: any) {
    console.error('Error decoding token:', error.message);
    throw new Error(error.message);
  }
}
