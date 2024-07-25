import { connect } from "../../../dbConfig/dbConfig.js";
import SurveyModel from "../../../models/survey.js";
import { NextRequest, NextResponse } from "next/server.js";

connect(); // Connect to MongoDB using your dbConfig

//@ts-ignore
const getValue = (data) => {
  if (data === "Very Unhappy") return -2;
  if (data === "Unhappy") return -1;
  if (data === "Satisfactory") return 0;
  if (data === "Happy") return 1;
  return 2;
};

//@ts-ignore
const getRating = (data) => {
  if (data === "Very Unhappy") return 1;
  if (data === "Unhappy") return 2;
  if (data === "Satisfactory") return 3;
  if (data === "Happy") return 4;
  return 5;
};

//@ts-ignore
const getYesNoRating = (data) => {
  return data == "Yes" ? 1 : 0;
}

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
      roleUnderstanding: getYesNoRating(data.roleUnderstanding),
      managementCommunication: getYesNoRating(data.managementCommunication),
      fairTreatment: getYesNoRating(data.fairTreatment),
      valuedEmployee: getYesNoRating(data.valuedEmployee),
      useSkills: getYesNoRating(data.useSkills),
      resourcesSupport: getYesNoRating(data.resourcesSupport),
      shareIdeas: getYesNoRating(data.shareIdeas),
      meritBasedPromotions: getYesNoRating(data.meritBasedPromotions),
      rewardedForPerformance: getYesNoRating(data.rewardedForPerformance),
      treatedWithRespect: getYesNoRating(data.treatedWithRespect),
      fairWorkload: getYesNoRating(data.fairWorkload),
      goodWorkingRelationship: getYesNoRating(data.goodWorkingRelationship),
      teamSupport: getYesNoRating(data.teamSupport),
      enjoyColleagues: getYesNoRating(data.enjoyColleagues),
      senseOfCamaraderie: getYesNoRating(data.senseOfCamaraderie),
      proudOfWork: getYesNoRating(data.proudOfWork),
      prideInQuality: getYesNoRating(data.prideInQuality),
      positiveImpact: getYesNoRating(data.positiveImpact),
      proudToTell: getYesNoRating(data.proudToTell),
      jobSatisfaction: getValue(data.jobSatisfaction),
      jobSatisfactionRating: getRating(data.jobSatisfaction),
      workLifeBalance: getValue(data.workLifeBalance),
      workEnvironment: getValue(data.workEnvironment),
      recognition: getValue(data.recognition),
      workLifeBalanceRating: getRating(data.workLifeBalance),
      workEnvironmentRating: getRating(data.workEnvironment),
      recognitionRating: getRating(data.recognition),
      leadershipConfidence: getYesNoRating(data.leadershipConfidence),
      workloadDistribution: getValue(data.workloadDistribution),
      workloadDistributionRating: getRating(data.workloadDistribution),
      taskClarity: getValue(data.taskClarity),
      taskClarityRating: getRating(data.taskClarity),
      stressLevels: getValue(data.stressLevels),
      stressLevelsRating: getRating(data.stressLevels),
      overtime: getValue(data.overtime),
      overtimeRating: getRating(data.overtime),
      resourceAvailibility: getValue(data.resourceAvailibility),
      resourceAvailibilityRating: getRating(data.resourceAvailibility),
      timeManagement: getValue(data.timeManagement),
      timeManagementRating: getRating(data.timeManagement),
      teamRelationship: getValue(data.teamRelationship),
      teamRelationshipRating: getRating(data.teamRelationship),
      managementSupport: getValue(data.managementSupport),
      managementSupportRating: getRating(data.managementSupport),
      growthOpportunities: getValue(data.growthOpportunities),
      growthOpportunitiesRating: getRating(data.growthOpportunities),
      trainingAndDevelopment: getValue(data.trainingAndDevelopment),
      trainingAndDevelopmentRating: getRating(data.trainingAndDevelopment),
      compensationAndBenefits: getValue(data.compensationAndBenefits),
      compensationAndBenefitsRating: getRating(data.compensationAndBenefits),
      benefitsPackage: getValue(data.benefitsPackage),
      benefitsPackageRating: getRating(data.benefitsPackage),
      communication: getValue(data.communication),
      communicationRating: getRating(data.communication),
      communicationEffectiveness: getValue(data.communicationEffectiveness),
      communicationEffectivenessRating: getRating(data.communicationEffectiveness),
      feedbackMechanism: getValue(data.feedbackMechanism),
      feedbackMechanismRating: getRating(data.feedbackMechanism),
      companyCulture: getValue(data.companyCulture),
      companyCultureRating: getRating(data.companyCulture),
      futureProspects: getValue(data.futureProspects),
      futureProspectsRating: getRating(data.futureProspects),
      decisionMaking: getValue(data.decisionMaking),
      decisionMakingRating: getRating(data.decisionMaking),
      responsibility: getValue(data.responsibility),
      responsibilityRating: getRating(data.responsibility),
      wellnessPrograms: getValue(data.wellnessPrograms),
      wellnessProgramsRating: getRating(data.wellnessPrograms),
      mentalHealthSupport: getValue(data.mentalHealthSupport),
      mentalHealthSupportRating: getRating(data.mentalHealthSupport),
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
