import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import UserSchema from '../../../models/user.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {mobileNumber, password} = body;
    const user = await UserSchema.findOne({email : mobileNumber});
    if(!user) {
        return NextResponse.json({
            messgage : "No user found"!
        })
    }

    //@ts-ignore
    const isMatched = await bcryptjs.compare(password, user.password);

    if(!isMatched) {
        return NextResponse.json({
            message : "Please enter correct password"
        })
    }
    const token = jwt.sign({ user }, 'PIKACHU', { expiresIn: '1h' });
    const response = NextResponse.json({
        message: "Logged in successfully",
        user,
    });

    response.cookies.set("token", token, { httpOnly: true });
   
    return response;

  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}

export const revalidate = 0;