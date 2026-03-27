import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

export default function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists in db
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // Check if user with same email exists
          let emailUser = await User.findOne({ email: profile.emails[0].value });
          if (emailUser) {
            // Link googleId to existing user
            emailUser.googleId = profile.id;
            await emailUser.save();
            return done(null, emailUser);
          }

          // Create new user
          const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'patient'
          };

          user = await User.create(newUser);
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
