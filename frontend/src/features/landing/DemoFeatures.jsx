import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MdCheckCircle, MdTimeline, MdSecurity, MdTrendingUp, MdFormatQuote } from 'react-icons/md';

// Helper component for Marquee
const Marquee = () => {
  const words = [
    "PHQ-9 Methodology", "•", "GAD-7 Validated", "•", "JWT Secured", "•",
    "End-to-End Encrypted", "•", "Branching Logic Assessment", "•",
    "Responsive Design", "•", "Clinical Precision", "•"
  ];
  return (
    <div className="w-full overflow-hidden bg-brand-primary/5 border-y border-brand-primary/10 py-4 my-10 relative flex">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0B0C10] z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#0B0C10] z-10"></div>
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex space-x-8 whitespace-nowrap"
      >
        {/* Double array to create seamless loop */}
        {[...words, ...words, ...words].map((word, i) => (
          <span key={i} className={`text-lg font-semibold tracking-widest uppercase ${word === '•' ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Helper component for Animated Counter
const StatCounter = ({ endValue, label, suffix="" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2000; // 2 seconds
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [endValue]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-6 glass-panel rounded-2xl"
    >
      <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-brand-primary to-indigo-500 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
        {label}
      </div>
    </motion.div>
  );
}

// 3D Parallax Dashboard Mockup
const ParallaxDashboard = () => {
  return (
    <motion.div 
      initial={{ rotateX: 20, rotateY: -10, opacity: 0, y: 100 }}
      whileInView={{ rotateX: 0, rotateY: 0, opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-4xl mx-auto w-full glass-panel rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(14,165,233,0.15)] border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative cursor-crosshair"
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Fake Navbar in mockup */}
      <div className="w-full h-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1A1C23]/50 flex items-center px-4 space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="ml-4 h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </div>
      {/* Fake UI Content */}
      <div className="p-8 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700/50 rounded-lg"></div>
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
          <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
          {/* Fake Graph */}
          <div className="w-full h-40 bg-gradient-to-t from-brand-primary/20 to-transparent border-b-2 border-brand-primary mt-6 rounded-t-xl relative overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 L0,50 Q25,80 50,40 T100,20 L100,100 Z" fill="currentColor" className="text-brand-primary/20"/>
              <path d="M0,50 Q25,80 50,40 T100,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary"/>
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-32 w-full rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex flex-col justify-end p-4">
            <div className="h-6 w-16 bg-indigo-500/50 rounded mb-2"></div>
            <div className="h-2 w-full bg-indigo-500/30 rounded"></div>
          </div>
          <div className="h-24 w-full rounded-xl glass-panel p-4">
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DemoFeatures = () => {
  return (
    <div className="min-h-screen py-10 space-y-32">
      
      {/* Demo Header */}
      <div className="text-center max-w-2xl mx-auto px-4 mt-8">
        <h1 className="text-4xl font-bold mb-4">Landing Page Ideas Demo</h1>
        <p className="text-slate-500">Scroll down to see the 5 proposed features in action. You can cherry-pick which ones you want to move into the real LandingPage.jsx!</p>
      </div>

      {/* IDEA 4: Marquee */}
      <div>
        <div className="text-center mb-6"><h2 className="text-sm uppercase tracking-widest text-brand-primary font-bold">Idea 4: Scrolling Clinical Marquee</h2></div>
        <Marquee />
      </div>

      {/* IDEA 3: Dashboard Mockup */}
      <div className="px-4">
        <div className="text-center mb-8"><h2 className="text-sm uppercase tracking-widest text-brand-primary font-bold">Idea 3: Dashboard Sneak Peek (Parallax)</h2></div>
        <ParallaxDashboard />
      </div>

      {/* IDEA 2: Animated Stats Counter */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-8"><h2 className="text-sm uppercase tracking-widest text-brand-primary font-bold">Idea 2: Live "Trust" Counters</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCounter endValue={100} suffix="%" label="Encrypted & Private" />
          <StatCounter endValue={15} suffix="+" label="Clinical Markers" />
          <StatCounter endValue={3} suffix=" Min" label="Avg. Completion Time" />
        </div>
      </div>

      {/* IDEA 1: Interactive Timeline */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16"><h2 className="text-sm uppercase tracking-widest text-brand-primary font-bold">Idea 1: How it Works Timeline</h2></div>
        <div className="relative border-l-2 border-brand-primary/20 ml-6 md:ml-12 space-y-12 pb-12">
          
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="relative pl-10">
            <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]">
               <MdTimeline size={20} />
            </div>
            <h3 className="text-xl font-bold">1. Answer Intuitively</h3>
            <p className="text-slate-500 mt-2">Our branching AI adjusts the questions in real-time based on your previous answers, preventing survey fatigue.</p>
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="relative pl-10">
            <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
               <MdSecurity size={20} />
            </div>
            <h3 className="text-xl font-bold">2. Instant Clinical Analysis</h3>
            <p className="text-slate-500 mt-2">Zero wait time. Your responses are instantly calculated into actionable clinical insights using standard methodologies.</p>
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="relative pl-10">
            <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
               <MdTrendingUp size={20} />
            </div>
            <h3 className="text-xl font-bold">3. Track & Heal</h3>
            <p className="text-slate-500 mt-2">Unlock longitudinal tracking on your secure dashboard to see exactly how your mental wellbeing evolves over time.</p>
          </motion.div>

        </div>
      </div>

      {/* IDEA 5: Mission Quote Parallax */}
      <div className="w-full relative py-32 overflow-hidden flex items-center justify-center mt-32">
        <div className="absolute inset-0 bg-[#08090C] -z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 via-indigo-500/5 to-purple-500/10 mix-blend-screen -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <MdFormatQuote className="text-6xl text-brand-primary/40 mx-auto transform -rotate-180 mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif italic font-light text-slate-100 leading-tight">
            "Mental health isn't a destination, but a process. It's about how you drive, not where you're going."
          </h2>
          <p className="mt-8 text-brand-primary font-bold tracking-widest uppercase text-sm">Our Core Philosophy</p>
        </motion.div>
      </div>

    </div>
  );
};

export default DemoFeatures;
