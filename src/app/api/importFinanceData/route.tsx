import FinanceForm from "@/models/financeForm.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";
import jwt from 'jsonwebtoken';

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the JSON request body

        const token = request.cookies.get('token')?.value || '';
        //@ts-ignore
        const decodedToken = jwt.decode(token, 'PIKACHU');

        // Collect all promises for saving data
        const savePromises = body.map(async (item : any) => {
            const newFinanceForm = new FinanceForm({
                project: item.project,
                h1: item.h1,
                h2: item.h2,
                //@ts-ignore
                userId: decodedToken.user._id,
                //@ts-ignore
                eId: decodedToken.user.eId,
                period: item.period,
                organisation: item.organisation,
                division: item.division,
                partner: item.partner,
                projectType: item.projectType,
                actualBudget: item.actualBudget,
                planBudget: item.planBudget,
                pMonth: item.pMonth,
                pQuarter: item.pQuarter,
                pHalfYear: item.pHalfYear,
                pFinancialYear: item.pFinancialYear,
                pCalendarYear: item.pCalendarYear,
            });
    
            // Save the form data to MongoDB
            await newFinanceForm.save();
        });

        // Wait for all promises to resolve
        await Promise.all(savePromises);

        // Respond with a success message
        return NextResponse.json({ message: "Finance form saved successfully" }, { status: 201 });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ error: "Failed to save finance form", details: err.message }, { status: 500 });
    }
}

export const revalidate = 0;
