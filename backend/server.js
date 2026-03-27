import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';

// Route files
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';

import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Passport config
passportConfig(passport);

const app = express();

app.set('trust proxy', 1);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.path}`);
  if (req.method === 'POST') console.log('Body:', req.body);
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // 100 requests per 10 mins
});
app.use(limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`--- [V2.0] --- Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));