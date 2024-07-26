import { connect } from "../../../dbConfig/dbConfig.js";
import SurveyModel from "../../../models/survey.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
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


    const token = request.cookies.get('token')?.value || '';
    //@ts-ignore
    const decodedToken = jwt.decode(token, 'PIKACHU');
    //@ts-ignore
    const email = decodedToken.user.email;


    if (!data.department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if a survey response with the same employeeId already exists
    const existingSurvey = await SurveyModel.findOne({
      $or: [
        { email: email } // Assuming the email field is stored in your SurveyModel
      ]
    });
    if (existingSurvey) {
      return NextResponse.json({ error: "Survey response already submitted for this Email Address" }, { status: 400 });
    }

    // Create a new survey response document
    const newSurvey = new SurveyModel({
      employeeId: data.employeeId,
      email,
      employeeName: data.employeeName,
      department: data.department,
      trustLeadershipConfidence: getYesNoRating(data.trustLeadershipConfidence),
      trustRoleUnderstanding: getYesNoRating(data.trustRoleUnderstanding),
      trustManagementCommunication: getYesNoRating(data.trustManagementCommunication),
      trustFairTreatment: getYesNoRating(data.trustFairTreatment),
      respectValuedEmployee: getYesNoRating(data.respectValuedEmployee),
      respectUseSkills: getYesNoRating(data.respectUseSkills),
      respectResourcesSupport: getYesNoRating(data.respectResourcesSupport),
      respectShareIdeas: getYesNoRating(data.respectShareIdeas),
      fairnessMeritBasedPromotions: getYesNoRating(data.fairnessMeritBasedPromotions),
      fairnessRewardedForPerformance: getYesNoRating(data.fairnessRewardedForPerformance),
      fairnessTreatedWithRespect: getYesNoRating(data.fairnessTreatedWithRespect),
      fairnessFairWorkload: getYesNoRating(data.fairnessFairWorkload),
      camaraderieGoodWorkingRelationship: getYesNoRating(data.camaraderieGoodWorkingRelationship),
      camaraderieTeamSupport: getYesNoRating(data.camaraderieTeamSupport),
      camaraderieEnjoyColleagues: getYesNoRating(data.camaraderieEnjoyColleagues),
      camaraderieSenseOfCamaraderie: getYesNoRating(data.camaraderieSenseOfCamaraderie),
      prideProudOfWork: getYesNoRating(data.prideProudOfWork),
      pridePrideInQuality: getYesNoRating(data.pridePrideInQuality),
      pridePositiveImpact: getYesNoRating(data.pridePositiveImpact),
      prideProudToTell: getYesNoRating(data.prideProudToTell),      
      // jobSatisfaction: getValue(data.jobSatisfaction),
      // jobSatisfactionRating: getRating(data.jobSatisfaction),
      // workLifeBalance: getValue(data.workLifeBalance),
      // workEnvironment: getValue(data.workEnvironment),
      // recognition: getValue(data.recognition),
      // workLifeBalanceRating: getRating(data.workLifeBalance),
      // workEnvironmentRating: getRating(data.workEnvironment),
      // recognitionRating: getRating(data.recognition),
      leadershipConfidence: getYesNoRating(data.leadershipConfidence),
      // workloadDistribution: getValue(data.workloadDistribution),
      // workloadDistributionRating: getRating(data.workloadDistribution),
      // taskClarity: getValue(data.taskClarity),
      // taskClarityRating: getRating(data.taskClarity),
      // stressLevels: getValue(data.stressLevels),
      // stressLevelsRating: getRating(data.stressLevels),
      // overtime: getValue(data.overtime),
      // overtimeRating: getRating(data.overtime),
      // resourceAvailibility: getValue(data.resourceAvailibility),
      // resourceAvailibilityRating: getRating(data.resourceAvailibility),
      // timeManagement: getValue(data.timeManagement),
      // timeManagementRating: getRating(data.timeManagement),
      // teamRelationship: getValue(data.teamRelationship),
      // teamRelationshipRating: getRating(data.teamRelationship),
      // managementSupport: getValue(data.managementSupport),
      // managementSupportRating: getRating(data.managementSupport),
      // growthOpportunities: getValue(data.growthOpportunities),
      // growthOpportunitiesRating: getRating(data.growthOpportunities),
      // trainingAndDevelopment: getValue(data.trainingAndDevelopment),
      // trainingAndDevelopmentRating: getRating(data.trainingAndDevelopment),
      // compensationAndBenefits: getValue(data.compensationAndBenefits),
      // compensationAndBenefitsRating: getRating(data.compensationAndBenefits),
      // benefitsPackage: getValue(data.benefitsPackage),
      // benefitsPackageRating: getRating(data.benefitsPackage),
      // communication: getValue(data.communication),
      // communicationRating: getRating(data.communication),
      // communicationEffectiveness: getValue(data.communicationEffectiveness),
      // communicationEffectivenessRating: getRating(data.communicationEffectiveness),
      // feedbackMechanism: getValue(data.feedbackMechanism),
      // feedbackMechanismRating: getRating(data.feedbackMechanism),
      // companyCulture: getValue(data.companyCulture),
      // companyCultureRating: getRating(data.companyCulture),
      // futureProspects: getValue(data.futureProspects),
      // futureProspectsRating: getRating(data.futureProspects),
      // decisionMaking: getValue(data.decisionMaking),
      // decisionMakingRating: getRating(data.decisionMaking),
      // responsibility: getValue(data.responsibility),
      // responsibilityRating: getRating(data.responsibility),
      // wellnessPrograms: getValue(data.wellnessPrograms),
      // wellnessProgramsRating: getRating(data.wellnessPrograms),
      // mentalHealthSupport: getValue(data.mentalHealthSupport),
      // mentalHealthSupportRating: getRating(data.mentalHealthSupport),
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
