import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest,) {
    try {
       
        const response = NextResponse.json({
            message: "Logged out!",
        });

        response.cookies.set("token", "", {httpOnly : true,expires : new Date(0)});
        
        return response;
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
export const revalidate = 0;