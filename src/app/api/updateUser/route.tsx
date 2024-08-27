import UserSchema from "@/models/user.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";
import jwt from 'jsonwebtoken'
connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const info = await UserSchema.findOneAndUpdate({ email: body.email }, body, { new: true });
    const token = jwt.sign({ user: info }, 'PIKACHU', { expiresIn: '1h' })
    const response = NextResponse.json({
      message: "User updated successfully",
      info,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export const revalidate = 0;
