<div align="center">
  <h1>🧠 Mental Health Assessment Platform 🌿</h1>
  <p><i>A dynamic, branching mental health screening application built with the MERN stack.</i></p>

  [![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
</div>

<br/>

> **💡 Intelligent, non-linear questioning where the next question is dynamically determined by the user's previous answer.**

---

## ✨ Key Features

- **🌐 Dynamic Branching Engine:** Questions are fetched from MongoDB based on intelligent user response logic.
- **🏗️ MERN Stack Power:** Scalable, solid architecture using MongoDB, Express.js, React, and Node.js.
- **🎨 Calm & Soothing UI:** Thoughtfully designed with Tailwind CSS and Framer Motion for a relaxed, anxiety-free experience.
- **🩺 Validated Screening:** Supports standardized clinical tools like **PHQ-9** (Depression) and **GAD-7** (Anxiety).

---

## 🛠️ Tech Stack

### **Frontend** 🖥️
- **React (Vite)** – *Blazing fast UI* ⚡
- **Tailwind CSS** – *Utility-first styling* 🎨
- **Framer Motion** – *Smooth micro-animations* ✨
- **Axios** – *Seamless API requests* 🔌

### **Backend** ⚙️
- **Node.js & Express.js** – *Robust server architecture* 🚀
- **MongoDB & Mongoose ODM** – *Flexible NoSQL database* 🗄️
- **JWT (Planned)** – *Secure User Authentication* 🔐

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js** (v16 or higher) 🟢
- **MongoDB Atlas** account or a local MongoDB installation 🍃

### 💻 Installation

**1. Clone the repository:**
```bash
git clone https://github.com/khanndelwalharshit/MENTAL-HEALTH-ASSESSMENT.git
cd MENTAL-HEALTH-ASSESSMENT
```

**2. Setup Backend ⚙️:**
```bash
cd backend
npm install
```
> **📝 Note:** Create a `.env` file in the `backend` folder and add your `MONGO_URI`.

*Run the backend server:*
```bash
npm run dev
```

**3. Setup Frontend 🎨:**
```bash
cd ../frontend
npm install
```

*Run the frontend application:*
```bash
npm run dev
```

---

## 🏗️ Project Structure

```text
/mental-health-app
├── backend/                # Server & API (Node.js + Express)
│   ├── config/             # Database connection logic
│   ├── models/             # Mongoose Schemas (Question, Assessment, User)
│   ├── controllers/        # Dynamic logic handlers
│   └── routes/             # API Endpoints
│
├── frontend/               # Client (React + Vite + Tailwind)
│   ├── src/features/       # Assessment & Logic modules
│   ├── src/components/     # UI/UX Components
│   └── src/hooks/          # Custom data-fetching hooks
│
└── README.md
```

---

## ⚠️ Medical Disclaimer

> 🛑 **IMPORTANT:** This platform provides screening tools, **not** clinical diagnoses. It is strictly intended to help users understand their mental well-being and provide resources. Always consult with a qualified healthcare professional for medical advice.

---

### 📤 How to push this to GitHub

1. Save any new changes to this `README.md` file.
2. Run these commands in your project terminal:
```bash
git add README.md
git commit -m "docs: add comprehensive and attractive readme ✨"
git push origin main
```

<div align="center">
  <br/>
  <i>Built with ❤️ for a healthier mind.</i>
</div>
