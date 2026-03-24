import express from 'express';
import { startAssessment, submitAnswer, getHistory } from '../controllers/assessmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/start', protect, startAssessment);
router.post('/answer', protect, submitAnswer);
router.get('/history', protect, getHistory);

export default router;