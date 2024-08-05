import UserSchema from "@/models/user.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

export async function GET(request: NextRequest) {
  try {
   
    const users = await UserSchema.find();
    return NextResponse.json({ message: "Users fetched successfully", data : users }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export const revalidate = 0;
