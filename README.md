# Mental Health Assessment Platform (MERN)

A dynamic, branching mental health screening application built with the MERN stack. This platform allows for intelligent, non-linear questioning where the next question is determined by the user's previous answer.

## 🌟 Key Features
- **Dynamic Branching Engine:** Questions are fetched from MongoDB based on user response logic.
- **MERN Stack:** Scalable architecture using MongoDB, Express, React, and Node.js.
- **Calm UI:** Designed with Tailwind CSS and Framer Motion for a soothing user experience.
- **Validated Screening:** Supports standardized tools like PHQ-9 and GAD-7.

- 🛠️ Tech Stack
Frontend: React (Vite), Tailwind CSS, Framer Motion, Axios.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose ODM).

Authentication: JWT (Planned).

🚀 Getting Started
Prerequisites
Node.js (v16+)

MongoDB Atlas account or local installation

Installation
Clone the repo:

Bash
git clone [https://github.com/khanndelwalharshit/MENTAL-HEALTH-ASSESSMENT.git](https://github.com/khanndelwalharshit/MENTAL-HEALTH-ASSESSMENT.git)
Setup Backend:

Bash
cd backend
npm install
# Create a .env file and add your MONGO_URI
npm run dev
Setup Frontend:

Bash
cd frontend
npm install
npm run dev
⚠️ Medical Disclaimer
This platform provides screening tools, not clinical diagnoses. It is intended to help users understand their mental well-being and provide resources. Always consult with a healthcare professional for medical advice.



---

### How to push this to GitHub:
1. Save the file as `README.md`.
2. Run these commands in your terminal:
bash
git add README.md
git commit -m "docs: add comprehensive readme"
git push origin main

## 🏗️ Project Structure

```text
/mental-health-app
├── backend/                # Node.js + Express API
│   ├── config/             # Database connection
│   ├── models/             # Mongoose Schemas (Question, Assessment, User)
│   ├── controllers/        # Dynamic logic handlers
│   └── routes/             # API Endpoints
├── frontend/               # React + Vite + Tailwind
│   ├── src/features/       # Assessment & Logic modules
│   ├── src/components/     # UI/UX Components
│   └── src/hooks/          # Custom data-fetching hooks
└── README.md


