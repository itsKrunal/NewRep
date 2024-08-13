const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the finance form
const financeFormSchema = new Schema(
  {
    eId : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    project: {
      type: String,
      required: true,
    },
    h1: {
      type: String,
      required: true,
    },
    h2: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // Ensures the format is YYYYMM
    },
    organisation: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    partner: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    actualBudget: {
      type: Number,
      required: true,
      min: 0, // Ensures budget is a positive number
    },
    planBudget: {
      type: Number,
      required: true,
      min: 0, // Ensures budget is a positive number
    },
    pMonth: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // Ensures the format is YYYYMM
    },
    pQuarter: {
      type: String,
      required: true,
      match: /^FY\d{2}Q[1-4]$/, // Ensures the format is FYXXQX
    },
    pHalfYear: {
      type: String,
      required: true,
      match: /^FY\d{2}Q[1-4]$/, // Ensures the format is FYXXQX
    },
    pFinancialYear: {
      type: String,
      required: true,
      match: /^FY\d{2}$/, // Ensures the format is FYXX
    },
    pCalendarYear: {
      type: String,
      required: true,
      match: /^[0-9]{4}$/, // Ensures the format is YYYY
    },
  },
  {
    collection: 'financeForms', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const FinanceForm = mongoose.models.FinanceForm || mongoose.model('FinanceForm', financeFormSchema);

export default FinanceForm;
