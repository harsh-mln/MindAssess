import Assessment from '../models/Assessment.js';
import Question from '../models/Question.js';
import { generateReport } from '../utils/reportGenerator.js';

// @desc    Get the first question to start the assessment
// @route   GET /api/assessment/start
// @access  Public (or Private depending on requirements)
export const startAssessment = async (req, res, next) => {
  try {
    const startQuestion = await Question.findOne({ isInitial: true });
    
    if (!startQuestion) {
      return res.status(404).json({ success: false, error: 'No initial question found' });
    }

    res.status(200).json({
      success: true,
      data: startQuestion
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit an answer and get the next question
// @route   POST /api/assessment/answer
// @access  Public
export const submitAnswer = async (req, res, next) => {
  try {
    const { questionId, selectedOptionValue, assessmentId } = req.body;

    // Find the current question
    const currentQuestion = await Question.findOne({ questionId });
    if (!currentQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    // Find the option the user selected
    const selectedOption = currentQuestion.options.find(opt => opt.value === selectedOptionValue);
    if (!selectedOption) {
      return res.status(400).json({ success: false, error: 'Invalid option selected' });
    }

    // Format the response to be saved
    const userResponse = {
      questionId: currentQuestion.questionId,
      category: currentQuestion.category, // Pass category for scoring logic later
      selectedLabel: selectedOption.label,
      scoreValue: selectedOption.value,
      timestamp: Date.now()
    };

    let assessment;

    // Create or update assessment
    if (!assessmentId) {
      assessment = await Assessment.create({
        testType: 'Comprehensive Multi-Disorder Screen',
        userId: req.user.id,
        responses: [userResponse],
        status: currentQuestion.isTerminal ? 'completed' : 'in-progress'
      });
    } else {
      assessment = await Assessment.findOne({ _id: assessmentId, userId: req.user.id });
      if (!assessment) return res.status(404).json({ success: false, error: 'Assessment not found' });
      assessment.responses.push(userResponse);
      console.log(`[Assessment Controller] Added response for ${questionId}. Total responses now: ${assessment.responses.length}`);
      
      if (currentQuestion.isTerminal) {
        assessment.status = 'completed';
      }
      await assessment.save();
    }

    // Check if terminal (Double check: by flag OR by absence of next question)
    const isFinished = currentQuestion.isTerminal || !selectedOption.nextQuestionId;
    console.log(`[Assessment Controller] Is assessment taking final step? ${isFinished} (nextId: ${selectedOption.nextQuestionId})`);

    if (isFinished) {
      // Use clean JSON stringification to ensure the report generator gets pure data
      const cleanResponses = JSON.parse(JSON.stringify(assessment.responses));
      const report = generateReport(cleanResponses);
      
      console.log('--- FINAL REPORT GENERATED ---');
      console.log('Final Score:', report.totalScore);
      
      assessment.report = report;
      assessment.finalScore = Number(report.totalScore) || 0;
      await assessment.save();

      return res.status(200).json({
        success: true,
        isFinished: true,
        assessmentId: assessment._id,
        report: report
      });
    }

    // Not terminal, fetch next question: log the query for debugging
    const nextQuestion = await Question.findOne({ questionId: selectedOption.nextQuestionId });
    console.log(`[Assessment Controller] fetching next question: ${selectedOption.nextQuestionId} (found: ${!!nextQuestion})`);
    
    res.status(200).json({
      success: true,
      isFinished: false,
      assessmentId: assessment._id,
      nextQuestion: nextQuestion
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Get a specific user's assessments
// @route   GET /api/assessment/history
// @access  Private
export const getHistory = async (req, res, next) => {
  try {
    // Requires auth middleware to set req.user
    const assessments = await Assessment.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: assessments.length, data: assessments });
  } catch (err) {
    next(err);
  }
};
