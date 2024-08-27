import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import FeatureModel from '../../../models/feature.js'
import getMe from '../../../Utils/getMe.js'

// Connect to MongoDB using your dbConfig
connect();

export async function GET(request: NextRequest) {
    try {
        // Get user information
        const user = getMe(request);

        // Find features where the department is included in the user's hodDepartments
        const data = await FeatureModel.find({
            eId : user.eId
        });

        return NextResponse.json({
            data
        }, { status: 200 });

    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({
            error: err.message,
        }, { status: 500 });
    }
}

export const revalidate = 0;
