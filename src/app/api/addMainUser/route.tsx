import UserSchema from "@/models/user.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const emailUser = await UserSchema.findOne({ email: body.email });
    if (!emailUser) {
      return NextResponse.json({ message: "No user found with this email, please register first" }, { status: 501 });
    }

    const user = await UserSchema.findOne({ eId: body.eId, email: body.email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 500 });
    }

    // Update the emailUser document with the new data from the body
    const updatedUser = await UserSchema.findOneAndUpdate(
      { email: body.email },
      { $set: body },
    );

    return NextResponse.json({ message: "User added successfully", user: updatedUser }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}

export const revalidate = 0;
