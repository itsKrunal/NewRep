import UserSchema from "@/models/user.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";
connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    await UserSchema.findOneAndUpdate({email : body.email}, body);
    return NextResponse.json({ message: "User updated successfully" }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export const revalidate = 0;
