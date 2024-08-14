import FinanceForm from "@/models/financeForm.js";
import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server.js";
import jwt from 'jsonwebtoken';

connect(); // Connect to MongoDB using your dbConfig

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the JSON request body
        console.log(body)

        // const token = request.cookies.get('token')?.value || '';
        // //@ts-ignore
        // const decodedToken = jwt.decode(token, 'PIKACHU');

        // // Create a new instance of the FinanceForm model with the data from the request body
        // //@ts-ignore
        // const newFinanceForm = new FinanceForm({
        //     project: body.project,
        //     h1: body.h1,
        //     h2: body.h2,
        //     //@ts-ignore
        //     userId: decodedToken.user._id,
        //     //@ts-ignore
        //     eId: decodedToken.user.eId,
        //     period: body.period,
        //     organisation: body.organisation,
        //     division: body.division,
        //     partner: body.partner,
        //     projectType: body.projectType,
        //     actualBudget: body.actualBudget,
        //     planBudget: body.planBudget,
        //     pMonth: body.pMonth,
        //     pQuarter: body.pQuarter,
        //     pHalfYear: body.pHalfYear,
        //     pFinancialYear: body.pFinancialYear,
        //     pCalendarYear: body.pCalendarYear,
        // });

        // // Save the form data to MongoDB
        // await newFinanceForm.save();

        // Respond with a success message
        return NextResponse.json({ message: "Finance form saved successfully" }, { status: 201 });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ error: "Failed to save finance form" }, { status: 500 });
    }
}

export const revalidate = 0;
