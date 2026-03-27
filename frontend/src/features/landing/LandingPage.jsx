import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdPsychology, MdCalculate, MdAnalytics, MdMood, MdPeople, MdDirectionsRun, MdSync, MdFitnessCenter, MdArrowForward } from 'react-icons/md';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Antigravity from '../../components/UI/Antigravity';
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

/* --- The Neural Core --- */
const NeuralCore = () => (
  <div className="max-w-7xl mx-auto px-4 mt-40 mb-32 relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[150px] -z-10 mix-blend-screen animate-pulse pointer-events-none" />
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      >
        <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block">Redefining the Standard</span>
        <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-600">
          Not a measure of happiness. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-indigo-500">A measure of capacity.</span>
        </h2>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-panel p-10 rounded-3xl border-l-[6px] border-l-brand-primary/80 relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-primary/10 rounded-full blur-[30px] group-hover:bg-brand-primary/20 transition-colors duration-700 pointer-events-none" />
        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light relative z-10">
          True mental wellbeing is your architectural capacity to handle life and its intrinsic friction. Our clinical engine calculates a dense snapshot of your cognitive and emotional resilience—not a superficial happiness score. It mathematically proves your ability to navigate extreme complexity.
        </p>
      </motion.div>
    </div>
  </div>
);

/* --- The 6 Clinical Vectors --- */
const VectorsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const vectors = [
    { title: "Mood & Outlook", icon: <MdMood size={28} />, desc: "Emotional regulation and future-state optimism metrics.", color: "from-amber-400 to-orange-500" },
    { title: "Social Architecture", icon: <MdPeople size={28} />, desc: "Interpersonal relativity and relational friction handling.", color: "from-pink-500 to-rose-500" },
    { title: "Drive Mechanics", icon: <MdDirectionsRun size={28} />, desc: "Goal initiation, perseverance, and kinetic daily momentum.", color: "from-blue-400 to-indigo-500" },
    { title: "Cognitive Processing", icon: <MdPsychology size={28} />, desc: "Information synthesis, memory retention, and lateral problem solving.", color: "from-emerald-400 to-teal-500" },
    { title: "Resilience Matrix", icon: <MdSync size={28} />, desc: "Recovery velocity from psychological or physical trauma.", color: "from-violet-400 to-purple-600" },
    { title: "Somatic Connection", icon: <MdFitnessCenter size={28} />, desc: "The bi-directional feedback loop between mental state and physical physiology.", color: "from-cyan-400 to-blue-500" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20 mb-40">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-brand-primary mb-3">6-Dimensional Analysis</h2>
        <h3 className="text-4xl md:text-5xl font-black">The Core Clinical Vectors</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vectors.map((vec, i) => (
          <motion.div 
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 cursor-default border border-slate-200/50 dark:border-slate-700/50 
              ${hoveredIndex === i ? 'glass-panel scale-[1.03] shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(14,165,233,0.15)] z-10' : 'bg-slate-50/50 dark:bg-[#111318]/50 blur-[0.5px] scale-100 z-0'}
              ${hoveredIndex === null && '!blur-0 !scale-100 glass-panel'}
            `}
          >
            <div className={`absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br ${vec.color} rounded-full blur-[60px] opacity-20 transition-opacity duration-500 pointer-events-none ${hoveredIndex === i ? 'opacity-60' : ''}`} />
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br ${vec.color} shadow-lg relative z-10`}>
              {vec.icon}
            </div>
            <h4 className="text-2xl font-bold mb-3 relative z-10 text-slate-900 dark:text-white">{vec.title}</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">
              {vec.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* --- Recharts Global Mental Health Data --- */
const MentalHealthStats = () => {
  // WHO Global Data Approximations (in millions) for analytical scoping
  const data = [
    { name: 'Depression', value: 280 },
    { name: 'Anxiety', value: 301 },
    { name: 'Bipolar', value: 40 },
    { name: 'PTSD / Trauma', value: 70 },
    { name: 'Schizophrenia', value: 24 },
    { name: 'Eating Disorders', value: 14 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#facc15', '#10b981'];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-32 mb-40">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest uppercase text-brand-primary mb-3">Global Analytics</h2>
        <h3 className="text-4xl md:text-5xl font-black mb-4">The Scope of Mental Wellness</h3>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Based on recent global health reports, mental health conditions impact hundreds of millions of people worldwide. This telemetry data illustrates the relative prevalence of core conditions across the global population (in millions).
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center glass-panel dark:bg-[#0A0A0A]/80 border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        
        {/* Recharts PieChart */}
        <div className="relative h-[350px] md:h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={150}
                paddingAngle={4}
                dataKey="value"
                stroke="transparent"
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                labelStyle={{ display: 'none' }}
                formatter={(value, name) => [`${value} Million People`, name]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-slate-700 dark:text-slate-300 font-medium ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Fact Cards */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl border-l-[4px] border-l-blue-500 hover:-translate-y-1 transition-transform"
          >
            <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">The Clinical Overlap</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Anxiety (301M) and Depression (280M) remain the most prevalent global conditions. Our assessment algorithm specifically correlates your inputs against these two major frameworks to detect hidden overlapping symptoms.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border-l-[4px] border-l-pink-500 hover:-translate-y-1 transition-transform"
          >
            <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Why Analytics Matter</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Epidemiological data shows that continuous longitudinal tracking can increase treatment efficiency by up to 40%. The MindAssess engine allows you to map your own personal trajectory against these global trends.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

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

        {/* Calculation Process Timeline */}
        <div className="mt-40 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Assessment Methodology</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Transparent, algorithm-driven clinical scoring operating securely on the backend in real-time.
            </p>
          </div>

          <div className="relative border-l-2 border-brand-primary/20 ml-6 md:ml-12 space-y-16 pb-12">
            
            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1, duration: 0.6 }} className="relative pl-12 sm:pl-16">
              <div className="absolute -left-[25px] top-1 w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                 <MdPsychology size={24} />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">1. Adaptive Symptom Mapping</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-lg">
                As you answer, the assessment engine continually maps your inputs against standardized clinical scales. The branching logic instantly alters the subsequent questions based on preliminary symptom severity detected in real-time.
              </p>
            </motion.div>

            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2, duration: 0.6 }} className="relative pl-12 sm:pl-16">
              <div className="absolute -left-[25px] top-1 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                 <MdCalculate size={24} />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">2. Algorithmic Quantum Scoring</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-lg">
                Instead of simple addition, responses are securely mathematically weighted based on clinical magnitude. The assessment engine calculates parallel sub-scores across different mental wellness vectors in milliseconds, preventing overlapping bias.
              </p>
            </motion.div>

            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.3, duration: 0.6 }} className="relative pl-12 sm:pl-16">
              <div className="absolute -left-[25px] top-1 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                 <MdAnalytics size={24} />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">3. Burden Score Generation</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-lg">
                The weighted sub-vectors are aggregated to produce your total <strong className="text-brand-primary">Cumulative Burden Score</strong>. This strict numerical value is cross-referenced with medical thresholds to instantly categorize your state into a validated clinical tier.
              </p>
            </motion.div>

          </div>
        </div>

        {/* New Wellbeing Assessment Feature Blocks */}
        <NeuralCore />
        <VectorsGrid />
        <MentalHealthStats />

      </div>
    </div>
  );
};

export default LandingPage;
