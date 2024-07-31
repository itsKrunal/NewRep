import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
connect();

export async function GET(request: NextRequest,) {
    try {
       
        const token = request.cookies.get('token')?.value || '';
        //@ts-ignore
        const decodedToken = jwt.decode(token, 'PIKACHU');
        
        return  NextResponse.json({
        decodedToken
        }, {status : 200})
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
export const revalidate = 0;