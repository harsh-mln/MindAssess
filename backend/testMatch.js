import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const testUser = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://hg9269748_db_user:HPzj3kj6K5rOIh9e@cluster0.dilo67p.mongodb.net/?appName=Cluster0');
  
  const user = await User.findOne({ email: 'test@example.com' }).select('+password');
  console.log('User found:', user ? user.name : 'No');
  
  if (user) {
    console.log('Hashed Password:', user.password);
    const isMatch = await user.matchPassword('password123');
    console.log('Does password123 match?', isMatch);
  }
  process.exit(0);
}

testUser();
