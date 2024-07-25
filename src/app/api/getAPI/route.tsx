import SurveyModel from "@/models/survey.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig


export async function GET(request: NextRequest) {
  try {
    const data = await SurveyModel.find();
    return NextResponse.json({ message : data });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to save survey response" }, { status: 500 });
  }
}

export const revalidate = 0;
