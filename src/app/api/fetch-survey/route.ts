import { connect } from "../../../dbConfig/dbConfig.js";
import SurveyModel from "../../../models/survey.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

export async function GET(request: NextRequest) {
  try {

    const token = request.cookies.get('token')?.value || '';
    //@ts-ignore
    const decodedToken = jwt.decode(token, 'PIKACHU');
    //@ts-ignore
    const email = decodedToken.user.email;

    // Check if a survey response with the same employeeId already exists
    const existingSurvey = await SurveyModel.findOne({
      $or: [
        { email: email } // Assuming the email field is stored in your SurveyModel
      ]
    });
    console.log(existingSurvey)
    if (existingSurvey) {
      return NextResponse.json({ error: "Survey response already submitted for this Email Address" }, { status: 400 });
    }

    return NextResponse.json({ message: "Survey yet to filled" }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to save survey response" }, { status: 500 });
  }
}

export const revalidate = 0;
