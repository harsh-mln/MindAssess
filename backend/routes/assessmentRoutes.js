const express = require('express');
const { startAssessment, submitAnswer, getHistory } = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/start', protect, startAssessment);
router.post('/answer', protect, submitAnswer);
router.get('/history', protect, getHistory);

module.exports = router;