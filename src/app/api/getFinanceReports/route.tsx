import { connect } from "../../../dbConfig/dbConfig.js";
import FinanceModel from "../../../models/financeForm.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

export async function GET(request: NextRequest) {
  try {

    // const token = request.cookies.get('token')?.value || '';
    // //@ts-ignore
    // const decodedToken = jwt.decode(token, 'PIKACHU');
    // //@ts-ignore
    // const email = decodedToken.user.email;

    // Check if a survey response with the same employeeId already exists
    // const existingSurvey = await FinanceModel.findOne({
    //   $or: [
    //     { email: email } // Assuming the email field is stored in your FinanceModel
    //   ]
    // });

    const financeForms = await FinanceModel.find();


    return NextResponse.json({ financeForms }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to fetch finance response" }, { status: 500 });
  }
}

export const revalidate = 0;
