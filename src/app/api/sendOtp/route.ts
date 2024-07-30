import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import UserSchema from '../../../models/user.js'
import AuthSchema from '../../../models/authModel.js'
import bcrypt from 'bcryptjs'

const transporter = nodemailer.createTransport({
  service: 'Outlook', // or use another service like 'Yahoo', 'Outlook', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});


const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    html: `
          <div style="text-align: center;">
              <img src="https://new-rep-eight.vercel.app/desireLogo.png" alt="Desire Logo" style="width: 300px; height: 100px; object-fit: contain; margin-right: 8px;" />
              <h1>Your OTP Code</h1>
              <p style="font-size: 16px;">Your OTP code is <strong>${otp}</strong></p>
              <p style="font-size: 14px;">This OTP is valid for the next 5 minutes.</p>
              <p style="font-size: 14px;">Thank you,<br>Desire Team</p>
          </div>
      `,
  };

  try {
    console.log(mailOptions)
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.log(error.message);
    throw new Error('Failed to send OTP');
  }
};


connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber, forget } = body;
    console.log(body)
    let salt = await bcrypt.genSalt(10);
    // let newPassword = await bcrypt.hash(password, salt);


    if (!forget) {
      const user = await UserSchema.findOne({ email: mobileNumber });
      if (user) {
        return NextResponse.json({
          message: "User already exists!",
        }, { status: 401 });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTP(mobileNumber, otp);

    await AuthSchema.create({ email: mobileNumber, otp });

    setTimeout(async () => {
      await AuthSchema.deleteMany({ otp })
    }, 60000 * 5);

    return NextResponse.json({
      message: "OTP sent successfully",
    }, { status: 201 });
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({
      error: err.message,
    }, { status: 500 });
  }
}

export const revalidate = 0;