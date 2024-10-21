import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    leadName: { type: String, required: true },
    campaignName: { type: String, required: true },
    conversionRate: { type: Number, required: true, min: 0, max: 100 },
    leadScore: { type: Number, required: true, min: 0, max: 100 },
    timestamp: { type: Date, default: Date.now }
});


const Data = mongoose.model('Data', dataSchema);
export default Data;