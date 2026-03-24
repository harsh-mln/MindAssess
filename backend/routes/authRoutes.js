import express from 'express';
import { register, login, getMe, logout, updateDetails } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/updatedetails', protect, updateDetails);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {
    // Generate JWT token like regular login
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '30d'
    });

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res.cookie('token', token, options);
    
    // Redirect to frontend dashboard
    res.redirect('http://localhost:5173/dashboard');
  }
);

export default router;
