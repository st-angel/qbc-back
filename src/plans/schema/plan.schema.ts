import * as mongoose from 'mongoose';

export const planSchema = new mongoose.Schema(
  {
    name: { type: String },
    maxTravel: { type: Number },
    medicalReimbursement: { type: Number },
    personalAssistance: { type: Number },
    travelAssistance: { type: Number },
    coverage: { type: Number },
    percentageMultiplier: { type: Number },
  },
  { collection: 'plans' },
);
