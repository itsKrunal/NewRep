import { connect } from "../../../dbConfig/dbConfig.js";
import SurveyModel from "../../../models/survey.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

//@ts-ignore
const getValue = (data) => {
    if(data === "Very Unhappy") return -2;
    if(data === "Unhappy") return -1;
    if(data === "Satisfactory") return 0;
    if(data === "Happy") return 1;
    return 2;
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); 
    console.log(data);

    if (!data.employeeId || !data.employeeName || !data.department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if a survey response with the same employeeId already exists
    const existingSurvey = await SurveyModel.findOne({ employeeId: data.employeeId });
    if (existingSurvey) {
      return NextResponse.json({ error: "Survey response already submitted for this Employee ID" }, { status: 400 });
    }

    // Create a new survey response document
    const newSurvey = new SurveyModel({
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      department: data.department,
      jobSatisfaction: getValue(data.jobSatisfaction),
      workLifeBalance: getValue(data.workLifeBalance),
      workEnvironment: getValue(data.workEnvironment),
      recognition: getValue(data.recognition),
      leadershipConfidence: data.leadershipConfidence,
      roleUnderstanding: data.roleUnderstanding,
      managementCommunication: data.managementCommunication,
      fairTreatment: data.fairTreatment,
      valuedEmployee: data.valuedEmployee,
      useSkills: data.useSkills,
      resourcesSupport: data.resourcesSupport,
      shareIdeas: data.shareIdeas,
      meritBasedPromotions: data.meritBasedPromotions,
      rewardedForPerformance: data.rewardedForPerformance,
      treatedWithRespect: data.treatedWithRespect,
      fairWorkload: data.fairWorkload,
      goodWorkingRelationship: data.goodWorkingRelationship,
      teamSupport: data.teamSupport,
      enjoyColleagues: data.enjoyColleagues,
      senseOfCamaraderie: data.senseOfCamaraderie,
      proudOfWork: data.proudOfWork,
      prideInQuality: data.prideInQuality,
      positiveImpact: data.positiveImpact,
      proudToTell: data.proudToTell
    });

    // Save the survey response to the database
    await newSurvey.save();

    return NextResponse.json({ message: "Survey response saved successfully" }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: "Failed to save survey response" }, { status: 500 });
  }
}

export const revalidate = 0;
