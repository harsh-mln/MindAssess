import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  // A unique string ID (e.g., "dep_q1", "anx_q5") to make branching easier to read
  questionId: { type: String, required: true, unique: true },
  
  text: { type: String, required: true },
  
  category: { 
    type: String, 
    default: 'General' 
  },

  // Each option contains its own branching logic
  options: [{
    label: { type: String, required: true }, // e.g., "Nearly every day"
    value: { type: Number, required: true }, // The score weight (0-3)
    
    // THE DYNAMIC PART: The ID of the question that follows this specific choice
    nextQuestionId: { type: String, default: null } 
  }],

  // Metadata to help the engine
  isInitial: { type: Boolean, default: false }, // Is this the first question of the test?
  isTerminal: { type: Boolean, default: false }  // If true, the test ends after this
});

export default mongoose.model('Question', QuestionSchema);