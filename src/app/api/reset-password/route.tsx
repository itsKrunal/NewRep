import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import UserSchema from '../../../models/user.js'
import bcrypt from 'bcryptjs'
connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const {email, password} = body;
    let salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(password, salt);
    const user = await UserSchema.findOneAndUpdate({email}, {password : newPassword});
    return NextResponse.json({
      message: "Password reset successfully",
    }, {status : 201});
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    }, {status : 500});
  }
}

export const revalidate = 0;