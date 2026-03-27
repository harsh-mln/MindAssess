import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Configure global Axios settings to use the deployed backend URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://mental-health-assessment-kjny.onrender.com';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
