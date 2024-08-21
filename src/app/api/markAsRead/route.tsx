import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import FeatureModel from "@/models/feature.js";
connect();

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json(); // Extract the feature ID from the request body

        if (!id) {
            return NextResponse.json({ error: "Feature ID is required" }, { status: 400 });
        }

        // Update the feature to mark it as read
        const updatedFeature = await FeatureModel.findByIdAndUpdate(id, { isRead: true }, { new: true });

        if (!updatedFeature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: "Feature marked as read" }, { status: 200 });
    } catch (err : any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export const revalidate = 0;
