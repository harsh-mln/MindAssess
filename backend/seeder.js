import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const standardOptions = (nextId) => [
  { label: "Strongly Agree", value: 2, nextQuestionId: nextId },
  { label: "Agree", value: 1, nextQuestionId: nextId },
  { label: "Disagree", value: -1, nextQuestionId: nextId },
  { label: "Strongly Disagree", value: -2, nextQuestionId: nextId }
];

const sampleQuestions = [
  // --- Category: Anxiety (GAD) ---
  {
    questionId: "q01",
    text: "I often find it hard to stop or control my constant worrying.",
    category: "Anxiety Markers",
    isInitial: true,
    options: standardOptions("q02")
  },
  {
    questionId: "q02",
    text: "I frequently experience sudden, intense surges of fear or panic without warning.",
    category: "Anxiety Markers",
    options: standardOptions("q03")
  },
  {
    questionId: "q03",
    text: "I feel on edge, restless, or find it hard to sit still for long periods.",
    category: "Anxiety Markers",
    options: standardOptions("q04")
  },

  // --- Category: Depression ---
  {
    questionId: "q04",
    text: "I have little interest or pleasure in doing things I used to enjoy.",
    category: "Depression Markers",
    options: standardOptions("q05")
  },
  {
    questionId: "q05",
    text: "I often feel like my future is hopeless and things will never get better.",
    category: "Depression Markers",
    options: standardOptions("q06")
  },
  {
    questionId: "q06",
    text: "I feel tired, sluggish, and have little energy even after resting.",
    category: "Depression Markers",
    options: standardOptions("q07")
  },

  // --- Category: Focus & ADHD ---
  {
    questionId: "q07",
    text: "I find it extremely difficult to focus on tasks or follow complex conversations.",
    category: "Focus & ADHD",
    options: standardOptions("q08")
  },
  {
    questionId: "q08",
    text: "I frequently lose things needed for tasks, like keys, wallets, or phones.",
    category: "Focus & ADHD",
    options: standardOptions("q09")
  },
  {
    questionId: "q09",
    text: "I often act on impulse without considering the consequences.",
    category: "Focus & ADHD",
    options: standardOptions("q10")
  },

  // --- Category: Trauma & Stress ---
  {
    questionId: "q10",
    text: "I am troubled by vivid memories or 'flashbacks' of a past traumatic event.",
    category: "Trauma & Stress",
    options: standardOptions("q11")
  },
  {
    questionId: "q11",
    text: "I experience intrusive, unwanted thoughts that I find distressing and hard to block.",
    category: "Trauma & Stress",
    options: standardOptions("q12")
  },
  {
    questionId: "q12",
    text: "I feel detached from reality or from my own emotions at times.",
    category: "Trauma & Stress",
    options: standardOptions("q13")
  },

  // --- Category: Impact & Sleep ---
  {
    questionId: "q13",
    text: "I find it hard to fall asleep or I wake up multiple times during the night.",
    category: "Impact & Function",
    options: standardOptions("q14")
  },
  {
    questionId: "q14",
    text: "I find myself avoiding social situations due to a fear of being judged or rejected.",
    category: "Impact & Function",
    options: standardOptions("q15")
  },
  {
    questionId: "q15",
    text: "I feel that my current mental state is severely impacting my ability to work or maintain relationships.",
    category: "Impact & Function",
    isTerminal: true,
    options: standardOptions(null)
  }
];

const importData = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(sampleQuestions);
    const lastQ = await Question.findOne({ questionId: "q15" });
    console.log(`[SEED VERIFY] Last Question Terminal Status: ${lastQ.isTerminal} (ID: ${lastQ.questionId})`);
    console.log(`[SEED VERIFY] Full Question JSON: ${JSON.stringify(lastQ, null, 2)}`);
    console.log('15 Multi-Disorder Questions with -2 to 2 Matrix Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();