import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig


export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ message : "OK" });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to save survey response" }, { status: 500 });
  }
}

export const revalidate = 0;
