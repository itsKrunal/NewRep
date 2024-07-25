const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    jobSatisfaction: {
      type: Number,
      required: true,
      enum: [-2, -1, 0, 1, 2], // Values from -2 to 2
    },
    workLifeBalance: {
      type: Number,
      required: true,
      enum: [-2, -1, 0, 1, 2],
    },
    workEnvironment: {
      type: Number,
      required: true,
      enum: [-2, -1, 0, 1, 2],
    },
    recognition: {
      type: Number,
      required: true,
      enum: [-2, -1, 0, 1, 2],
    },
    leadershipConfidence: {
      type: String,
      required: true,
    },
    roleUnderstanding: {
      type: String,
      required: true,
    },
    managementCommunication: {
      type: String,
      required: true,
    },
    fairTreatment: {
      type: String,
      required: true,
    },
    valuedEmployee: {
      type: String,
      required: true,
    },
    useSkills: {
      type: String,
      required: true,
    },
    resourcesSupport: {
      type: String,
      required: true,
    },
    shareIdeas: {
      type: String,
      required: true,
    },
    meritBasedPromotions: {
      type: String,
      required: true,
    },
    rewardedForPerformance: {
      type: String,
      required: true,
    },
    treatedWithRespect: {
      type: String,
      required: true,
    },
    fairWorkload: {
      type: String,
      required: true,
    },
    goodWorkingRelationship: {
      type: String,
      required: true,
    },
    teamSupport: {
      type: String,
      required: true,
    },
    enjoyColleagues: {
      type: String,
      required: true,
    },
    senseOfCamaraderie: {
      type: String,
      required: true,
    },
    proudOfWork: {
      type: String,
      required: true,
    },
    prideInQuality: {
      type: String,
      required: true,
    },
    positiveImpact: {
      type: String,
      required: true,
    },
    proudToTell: {
      type: String,
      required: true,
    }
  },
  {
    collection: 'surveyResponses', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const SurveyModel = mongoose.models.SurveyModel || mongoose.model('SurveyModel', surveySchema);

export default SurveyModel;
