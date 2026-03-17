const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const standardOptions = (nextId) => [
  { label: "Not at all", value: 0, nextQuestionId: nextId },
  { label: "Several days", value: 1, nextQuestionId: nextId },
  { label: "More than half the days", value: 2, nextQuestionId: nextId },
  { label: "Nearly every day", value: 3, nextQuestionId: nextId }
];

const sampleQuestions = [
  // --- PHQ-9 (9 Questions) ---
  {
    questionId: "phq_01",
    text: "Little interest or pleasure in doing things",
    category: "PHQ-9 (Depression)",
    isInitial: true,
    options: standardOptions("phq_02")
  },
  {
    questionId: "phq_02",
    text: "Feeling down, depressed, or hopeless",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_03")
  },
  {
    questionId: "phq_03",
    text: "Trouble falling or staying asleep, or sleeping too much",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_04")
  },
  {
    questionId: "phq_04",
    text: "Feeling tired or having little energy",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_05")
  },
  {
    questionId: "phq_05",
    text: "Poor appetite or overeating",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_06")
  },
  {
    questionId: "phq_06",
    text: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_07")
  },
  {
    questionId: "phq_07",
    text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_08")
  },
  {
    questionId: "phq_08",
    text: "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    category: "PHQ-9 (Depression)",
    options: standardOptions("phq_09")
  },
  {
    questionId: "phq_09",
    text: "Thoughts that you would be better off dead, or of hurting yourself in some way",
    category: "PHQ-9 (Depression)",
    options: standardOptions("gad_01")
  },

  // --- GAD-7 (7 Questions) ---
  {
    questionId: "gad_01",
    text: "Feeling nervous, anxious, or on edge",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_02")
  },
  {
    questionId: "gad_02",
    text: "Not being able to stop or control worrying",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_03")
  },
  {
    questionId: "gad_03",
    text: "Worrying too much about different things",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_04")
  },
  {
    questionId: "gad_04",
    text: "Trouble relaxing",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_05")
  },
  {
    questionId: "gad_05",
    text: "Being so restless that it's hard to sit still",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_06")
  },
  {
    questionId: "gad_06",
    text: "Becoming easily annoyed or irritable",
    category: "GAD-7 (Anxiety)",
    options: standardOptions("gad_07")
  },
  {
    questionId: "gad_07",
    text: "Feeling afraid as if something awful might happen",
    category: "GAD-7 (Anxiety)",
    isTerminal: true,
    options: standardOptions(null)
  }
];

const importData = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(sampleQuestions);
    console.log('16 PHQ-9 & GAD-7 Questions Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();