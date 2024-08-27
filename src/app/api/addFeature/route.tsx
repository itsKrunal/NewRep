import FeatureModel from "@/models/feature.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        console.log(formData)

        const file = formData.get('attachments')
        //@ts-ignore
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        console.log(buffer)

        const obj = {
            //@ts-ignore
            featureTitle : formData.get('featureTitle'),
            //@ts-ignore
            featureDescription : formData.get('featureDescription'),
            //@ts-ignor
            priorityLevel : formData.get('priorityLevel'),
            //@ts-ignore
            justification : formData.get('justification'),
            //@ts-ignore
            targetCompletionDate : formData.get('targetCompletionDate'),
            //@ts-ignore
            attachments : buffer,
            //@ts-ignore
            remarks : formData.get('remarks'),
            //@ts-ignore
            eId : formData.get('eId'),
            //@ts-ignore
            department : formData.get('department')
        }

        await FeatureModel.create(obj);

     
        // Respond with a success message
        return NextResponse.json({ message: "Feature saved successfully" }, { status: 201 });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ error: "Failed to save feature form" }, { status: 500 });
    }
}

export const revalidate = 0;
