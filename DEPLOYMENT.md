# Deployment Guide: Mental Health Assessment Platform

This guide provides step-by-step instructions to deploy the whole MERN stack project so that anyone on the internet can access and use it.

We'll use free-tier friendly platforms:
- **MongoDB Atlas** for the database
- **Render** for the Node.js/Express Backend
- **Vercel** for the React (Vite) Frontend

---

## 1. Prepare Your Database (MongoDB Atlas)
If you are already using MongoDB Atlas, you just need to make sure your IP Access List allows connections from anywhere.
1. Go to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2. Under **Security** in the left sidebar, click on **Network Access**.
3. Click **Add IP Address**.
4. Choose **Allow Access From Anywhere** (`0.0.0.0/0`) and click **Confirm**.
5. Go to **Database** -> **Connect** -> **Drivers** and copy your Connection String (it looks like `mongodb+srv://<username>:<password>@cluster.mongodb.net/database_name?retryWrites=true&w=majority`).
   - *Keep this handy for the Backend deployment.*

---

## 2. Deploy the Backend (Render)
Render is a cloud platform that makes it very easy to deploy Node.js apps.

1. Create an account on [Render](https://render.com/).
2. From your Render Dashboard, click **New +** and select **Web Service**.
3. Connect your GitHub account and select your repository (`khanndelwalharshit/MENTAL-HEALTH-ASSESSMENT`).
4. **Configure the Service:**
   - **Name:** `mental-health-backend` (or similar)
   - **Root Directory:** `backend` (⚠️ **Important:** Ensure this is exactly `backend`)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. **Add Environment Variables:**
   Scroll down to the "Environment Variables" section and add:
   - `MONGO_URI`: *Your MongoDB connection string from Step 1*
   - `PORT`: `5000`
   - `JWT_SECRET`: *Your secret key (e.g., a long random string)*
   - `GOOGLE_CLIENT_ID`: *Your Google Client ID from Google Cloud Console*
   - `GOOGLE_CLIENT_SECRET`: *Your Google Client Secret*
   - `FRONTEND_URL`: *You will update this later once the frontend is deployed. For now, you can leave it out or put a placeholder.*
6. Click **Create Web Service**.
7. Render will now build and deploy the backend. Wait for it to finish and show "Live".
8. Copy the backend URL (e.g., `https://mental-health-backend.onrender.com`). You will need this for the frontend!

---

## 3. Deploy the Frontend (Vercel)
Vercel is optimized for building and deploying React applications with Vite.

1. **Update API URLs in Frontend Code:**
   Before deploying, ensure your frontend makes API calls to your newly deployed backend URL instead of `http://localhost:5000`.
   - The best way is to set up a `.env` variable in your frontend. But if your URLs are hardcoded, you'll need to change them to point to your new backend URL (e.g., `https://mental-health-backend.onrender.com/api/...`).
   - If using `axios`, update your `baseURL` or requests.
2. Push your latest code (with the backend API changes) to GitHub.
3. Go to [Vercel.com](https://vercel.com/) and sign up with GitHub.
4. Click **Add New** -> **Project**.
5. Import your `MENTAL-HEALTH-ASSESSMENT` repository.
6. **Configure the Project:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** Edit this and select `frontend` (⚠️ **Important!**)
7. **Environment Variables:**
   If your frontend uses any `.env` variables (like `VITE_API_URL`), add them here.
   - Example: `VITE_API_URL` = `https://mental-health-backend.onrender.com`
8. Click **Deploy**.
9. Vercel will build your React application and give you a live public URL (e.g., `https://mental-health-assessment.vercel.app`).

---

## 4. Final Connections
Now that both are deployed, make sure they can talk to each other:

1. **CORS:** Ensure your backend's `cors` configuration allows requests from your new Vercel frontend URL. Open `backend/server.js` or `backend/app.js` and verify CORS:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.vercel.app', // Update this!
     credentials: true
   }));
   ```
   *If you change this, push the code to GitHub so Render redeploys.*
2. **Google OAuth Config:** If using Google Login, go to your Google Cloud Console and update the **Authorized JavaScript origins** and **Authorized redirect URIs** to match your deployed frontend and backend URLs.
3. Enjoy your live application! 🎉 Anyone with the Vercel link can now access it.
