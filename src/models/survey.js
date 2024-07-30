const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    email : {
      type : String,
      required : true
    },
    // employeeId: {
    //   type: String,
    //   required: true,
    // },
    // employeeName: {
    //   type: String,
    //   required: true,
    // },
    department: {
      type: String,
      required: true,
    },
    // jobSatisfaction: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2], // Values from -2 to 2
    // },
    // jobSatisfactionRating: {
    //   type: Number,
    //   required: true,
    // },
    // workLifeBalance: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // workLifeBalanceRating: {
    //   type: Number,
    //   required: true,
    // },
    // workEnvironment: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // workEnvironmentRating: {
    //   type: Number,
    //   required: true,
    // },
    // recognition: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // recognitionRating: {
    //   type: Number,
    //   required: true,
    // },
    trustLeadershipConfidence: {
      type: Number,
      required: true,
    },
    trustRoleUnderstanding: {
      type: Number,
      required: true,
    },
    trustManagementCommunication: {
      type: Number,
      required: true,
    },
    trustFairTreatment: {
      type: Number,
      required: true,
    },
    respectValuedEmployee: {
      type: Number,
      required: true,
    },
    respectUseSkills: {
      type: Number,
      required: true,
    },
    respectResourcesSupport: {
      type: Number,
      required: true,
    },
    respectShareIdeas: {
      type: Number,
      required: true,
    },
    fairnessMeritBasedPromotions: {
      type: Number,
      required: true,
    },
    fairnessRewardedForPerformance: {
      type: Number,
      required: true,
    },
    fairnessTreatedWithRespect: {
      type: Number,
      required: true,
    },
    fairnessFairWorkload: {
      type: Number,
      required: true,
    },
    camaraderieGoodWorkingRelationship: {
      type: Number,
      required: true,
    },
    camaraderieTeamSupport: {
      type: Number,
      required: true,
    },
    camaraderieEnjoyColleagues: {
      type: Number,
      required: true,
    },
    camaraderieSenseOfCamaraderie: {
      type: Number,
      required: true,
    },
    prideProudOfWork: {
      type: Number,
      required: true,
    },
    pridePrideInQuality: {
      type: Number,
      required: true,
    },
    pridePositiveImpact: {
      type: Number,
      required: true,
    },
    prideProudToTell: {
      type: Number,
      required: true,
    },
    // workloadDistribution: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // workloadDistributionRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // taskClarity: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // taskClarityRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // stressLevels: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // stressLevelsRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // overtime: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // overtimeRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // resourceAvailibility: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // resourceAvailibilityRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // timeManagement: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // timeManagementRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // teamRelationship: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // teamRelationshipRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // managementSupport: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // managementSupportRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // growthOpportunities: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // growthOpportunitiesRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // trainingAndDevelopment: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // trainingAndDevelopmentRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // compensationAndBenefits: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // compensationAndBenefitsRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // benefitsPackage: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // benefitsPackageRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // communication: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // communicationRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // communicationEffectiveness: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // communicationEffectivenessRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // feedbackMechanism: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // feedbackMechanismRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // companyCulture: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // companyCultureRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // futureProspects: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // futureProspectsRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // decisionMaking: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // decisionMakingRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // responsibility: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // responsibilityRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // wellnessPrograms: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // wellnessProgramsRating: {
    //   type: Number,
    //   required: true,
    // },
    
    // mentalHealthSupport: {
    //   type: Number,
    //   required: true,
    //   enum: [-2, -1, 0, 1, 2],
    // },
    // mentalHealthSupportRating: {
    //   type: Number,
    //   required: true,
    // },
    MMYYYY: {
      type: String,
    },
  },
  {
    collection: 'surveyResponses', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

surveySchema.pre('save', function (next) {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  this.MMYYYY = `${month}-${year}`;
  next();
});

const SurveyModel = mongoose.models.SurveyModel || mongoose.model('SurveyModel', surveySchema);

export default SurveyModel;
