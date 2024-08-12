import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import SurveyScehma from '../../../models/survey.js'
import jwt from 'jsonwebtoken'
connect(); // Connect to MongoDB using your dbConfig

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        //@ts-ignore
        const decodedToken = jwt.decode(token, 'PIKACHU');

        console.log(decodedToken)
        //@ts-ignore
        const isAdmin =  decodedToken.user.role == 'Admin';

        let data;
        if(isAdmin)
            data = await SurveyScehma.find();
        else
            //@ts-ignore
            data = await SurveyScehma.find({email : decodedToken.user.email})
        
        return NextResponse.json({
            data
        }, { status: 200 })

    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({
            error: err.message,
        });
    }
}

export const revalidate = 0;