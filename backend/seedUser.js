import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://hg9269748_db_user:HPzj3kj6K5rOIh9e@cluster0.dilo67p.mongodb.net/?appName=Cluster0');
    console.log('MongoDB Connected');

    // Remove old test user if exists
    await User.deleteOne({ email: 'test@example.com' });

    // Create demo user
    const user = await User.create({
      name: 'Demo Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'patient'
    });

    console.log('Successfully created demo test user!');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUser();
