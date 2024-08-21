import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import FeatureModel from '../../../models/feature.js'
connect(); // Connect to MongoDB using your dbConfig

export async function GET(request: NextRequest) {
    try {
        const data = await FeatureModel.find();    
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