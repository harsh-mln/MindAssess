import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  // Reference to the user (can be null for guest users)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  // Track the current state of the assessment
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },

  // Store the sequence of answers
  responses: [{
    questionId: String,
    category: String,
    selectedLabel: String,
    scoreValue: Number,
    timestamp: { type: Date, default: Date.now }
  }],

  finalScore: { type: Number, default: 0 },

  // Store the detailed generated report 
  report: {
    overview: String,
    breakdown: Object
  },

  testType: { type: String, required: true },

  // Track the version of the test to maintain historical consistency
  testVersion: { type: Number, default: 1 }
}, { timestamps: true });

// Add indexing for faster queries on larger datasets
AssessmentSchema.index({ userId: 1, testType: 1 });
AssessmentSchema.index({ status: 1 });

export default mongoose.model('Assessment', AssessmentSchema);