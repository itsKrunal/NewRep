import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import FeatureModel from "@/models/feature.js";
connect();

export async function POST(request: NextRequest) {
    try {
        const { id, status } = await request.json(); // Extract the feature ID and status from the request body

        if (!id || !status) {
            return NextResponse.json({ error: "Feature ID and status are required" }, { status: 400 });
        }

        // Validate status
        const validStatuses = ["approved", "disapproved", "hold"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // Update the feature's status
        const updatedFeature = await FeatureModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedFeature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: `Feature status changed to ${status}` }, { status: 200 });
    } catch (err : any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export const revalidate = 0;
