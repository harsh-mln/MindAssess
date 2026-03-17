const Assessment = require('../models/Assessment');
const Question = require('../models/Question');
const { generateReport } = require('../utils/reportGenerator');

// @desc    Get the first question to start the assessment
// @route   GET /api/assessment/start
// @access  Public (or Private depending on requirements)
exports.startAssessment = async (req, res, next) => {
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
exports.submitAnswer = async (req, res, next) => {
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
        testType: 'PHQ-9 & GAD-7',
        userId: req.user.id,
        responses: [userResponse],
        status: currentQuestion.isTerminal ? 'completed' : 'in-progress'
      });
    } else {
      assessment = await Assessment.findOne({ _id: assessmentId, userId: req.user.id });
      if (!assessment) return res.status(404).json({ success: false, error: 'Assessment not found' });
      assessment.responses.push(userResponse);
      if (currentQuestion.isTerminal) {
        assessment.status = 'completed';
      }
      await assessment.save();
    }

    // Check if terminal
    if (currentQuestion.isTerminal) {
      // GENERATE REPORT LOGIC HERE
      const report = generateReport(assessment.responses);
      
      assessment.report = report;
      assessment.finalScore = report.totalScore;
      await assessment.save();

      return res.status(200).json({
        success: true,
        isFinished: true,
        assessmentId: assessment._id,
        report: report
      });
    }

    // Not terminal, fetch next question
    const nextQuestion = await Question.findOne({ questionId: selectedOption.nextQuestionId });
    
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
exports.getHistory = async (req, res, next) => {
  try {
    // Requires auth middleware to set req.user
    const assessments = await Assessment.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: assessments.length, data: assessments });
  } catch (err) {
    next(err);
  }
};
