// api/users/login/route.ts
"use server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const bcrypt = require('bcryptjs');

  try {
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Connect to the users database
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const userModel = connection.model('UserAuth', User.schema, 'user_auth');

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });
    response.cookies.set("userActive", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });
    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
