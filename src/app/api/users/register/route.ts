// /api/users/register/route.ts
import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const bcrypt = require('bcryptjs');
  try {
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const reqBody = await request.json();
    console.log("email, password, username received");

    const { username, email, password } = reqBody;

    // Connect to the users database
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const userModel = connection.model('UserAuth', User.schema, 'user_auth');

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
