import mongoose from 'mongoose';
import { type } from 'os';
const { Schema } = mongoose;

// Define schema for feature requests
const featureSchema = new Schema(
    {
        featureTitle: {
            type: String,
            required: true,
            trim: true,
        },
        featureDescription: {
            type: String,
            required: true,
            trim: true,
        },
        priorityLevel: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            required: true,
        },
        justification: {
            type: String,
            required: true,
            trim: true,
        },
        targetCompletionDate: {
            type: Date,
            required: true,
        },
        attachments: { type: Buffer, required: true },
        remarks: {
            type: String,
            required: false,
            trim: true,
        },
        eId: {
            type: String,
            required: true
        },
        isRead : {
            type : Boolean,
            default : false
        },
        status : {
            type : String,
            enum : ['pending', 'approved', 'hold']
        },
        department : String,
        hodRemarks : String
    },
    {
        collection: 'feature', // Set your desired collection name
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const FeatureModel = mongoose.models.FeatureModel || mongoose.model('FeatureModel', featureSchema);

export default FeatureModel;
