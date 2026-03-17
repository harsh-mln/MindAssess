import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Antigravity from '../../components/ui/Antigravity';
import { useTheme } from '../../context/ThemeContext';

const FeatureCard = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-100px" }}
    className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
      <div className="w-4 h-4 rounded-full bg-brand-primary animate-pulse" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  const { theme } = useTheme();
  const particleColor = theme === 'dark' ? '#0ea5e9' : '#3b82f6';
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="relative min-h-screen -mt-24 pt-24">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-auto">
        <Antigravity 
          color={particleColor} 
          count={250} 
          magnetRadius={15} 
          autoAnimate={true}
          particleSize={1.5}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-32">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              style={{ y: yOffset }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-medium text-sm tracking-wide"
            >
              Enterprise Clinical Grade
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Clarity awaits your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-500 to-purple-600">
                Mental State
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience an immersive, dynamically driven assessment leveraging 15 deeply researched clinical markers to instantly generate your mental health profile.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/assessment">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-semibold text-lg shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] transition-shadow w-full sm:w-auto"
                >
                  Begin Assessment
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-panel hover:bg-slate-100 dark:hover:bg-[#1A1C23] text-slate-900 dark:text-white rounded-full font-semibold text-lg w-full sm:w-auto transition-colors"
                >
                  View Reports
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Why Use It Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why MindAssess?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built on the convergence of clinical methodology and modern design geometry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Advanced Branching" 
              description="A 15-question algorithm assessing Depression, Anxiety, and Stress thresholds simultaneously without feeling like a clinical intake form."
              delay={0.1}
            />
            <FeatureCard 
              title="Instant Tiered Reports" 
              description="Immediately upon completion, receive a beautifully structured breakdown of your scores, severity levels, and actionable clinical insights."
              delay={0.2}
            />
            <FeatureCard 
              title="Absolute Privacy" 
              description="Secured by enterprise-grade JWT configurations and MongoDB Atlas architecture, ensuring your longitudinal data stays strictly yours."
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
