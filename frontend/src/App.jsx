import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LandingPage from './features/landing/LandingPage';

// Lazy load the Demo Features page to optimize main bundle size
const DemoFeatures = lazy(() => import('./features/landing/DemoFeatures'));
import UserDashboard from './features/dashboard/UserDashboard';
import AssessmentEngine from './features/assessment/AssessmentEngine';
import AuthPage from './features/auth/AuthPage';
import Profile from './features/profile/Profile';
import DiseasesPage from './features/health-library/DiseasesPage';
import SupplementsPage from './features/health-library/SupplementsPage';
import LifestylePage from './features/health-library/LifestylePage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans selection:bg-brand-primary selection:text-white">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Lazy Loaded Route */}
                <Route 
                  path="/demo" 
                  element={
                    <Suspense fallback={
                      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-medium animate-pulse">Loading amazing ideas...</p>
                      </div>
                    }>
                      <DemoFeatures />
                    </Suspense>
                  } 
                />
                
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/health-library/diseases" element={<DiseasesPage />} />
                <Route path="/health-library/drugs" element={<SupplementsPage />} />
                <Route path="/health-library/lifestyle" element={<LifestylePage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/assessment" element={
                  <ProtectedRoute>
                    <AssessmentEngine />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
