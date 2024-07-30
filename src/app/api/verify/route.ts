import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import AuthSchema from '../../../models/authModel.js'

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const {mobileNumber, otp} = body;
    const user = await AuthSchema.findOne({email : mobileNumber, otp});
    if(!user) {
        return NextResponse.json({
            messgage : "Incorrect OTP"!
        }, {status : 500})
    }

    const response = NextResponse.json({
        message: "Verified Successfully",
    });
   
    return response;

  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}

export const revalidate = 0;