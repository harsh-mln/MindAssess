import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SkeletonDashboard = () => (
  <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-pulse">
    <header className="mb-12">
      <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4 mb-4"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2"></div>
    </header>
    <section>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-6"></div>
      <div className="glass-panel rounded-3xl p-8 md:p-12 h-96">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-64 mb-6"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full mb-10"></div>
        <div className="grid grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>)}
        </div>
      </div>
    </section>
  </div>
);

const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Now using real auth context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/assessment/history');
        if (res.data.success) {
          setHistory(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (loading) {
    return <SkeletonDashboard />;
  }

  const latest = history[0];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">Wellness Dashboard</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-400"
        >
          Track your longitudinal mental health markers and clinical insights.
        </motion.p>
      </header>

      {latest && latest.status === 'completed' ? (
        <section>
          <h2 className="text-xl font-semibold mb-6 uppercase tracking-widest text-slate-500">Most Recent Assessment</h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-8 md:p-12 overflow-hidden relative group hover:shadow-[0_0_50px_-15px_rgba(14,165,233,0.3)] transition-all duration-500"
          >
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-brand-primary/20 transition-colors duration-500" />

            <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10">
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-primary mb-2">
                  {new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-3xl font-bold mb-4">Total Burden Score: <span className="text-brand-primary">{latest.finalScore}</span></h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {latest.report?.overview || 'Report pending rendering.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(latest.report?.breakdown || {}).map(([category, data], idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={category} 
                  className="bg-white/50 dark:bg-[#0B0C10]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">{category}</h4>
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {data.level}
                    </span>
                  </div>
                  
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-brand-primary">{data.score}</span>
                    <span className="text-sm opacity-50 pb-1">/ {data.maxScore}</span>
                  </div>

                  {/* Minimal Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.score / data.maxScore) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (idx * 0.1) }}
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-purple-600 rounded-full"
                    />
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {data.insight}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="text-center py-20 glass-panel rounded-3xl">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-2">No Assessments Yet</h3>
          <p className="text-slate-500 mb-6">Start your first comprehensive clinical evaluation now.</p>
          <button 
            onClick={() => navigate('/assessment')}
            className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-semibold transition-colors"
          >
            Start Assessment
          </button>
        </section>
      )}

      {history.length > 0 && (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-6 uppercase tracking-widest text-slate-500">Historical Log</h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#1A1C23] border-b border-slate-200 dark:border-slate-800">
                      <th className="px-6 py-4 font-semibold text-sm">Date</th>
                      <th className="px-6 py-4 font-semibold text-sm">Framework</th>
                      <th className="px-6 py-4 font-semibold text-sm">Aggregate Score</th>
                      <th className="px-6 py-4 font-semibold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {history.map((record, index) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={record._id} 
                        className="hover:bg-slate-50 dark:hover:bg-[#1A1C23] transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600 dark:text-slate-400 group-hover:text-brand-primary transition-colors">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {record.testType}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                          {record.finalScore}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === 'completed' 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Next Steps for You</h2>
                <p className="text-slate-500 dark:text-slate-400">Personalized resources based on your assessment history.</p>
              </div>
              <div className="hidden md:block h-px flex-grow mx-8 bg-slate-200 dark:bg-slate-800" />
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary/10 via-brand-primary/5 to-purple-600/10 border border-brand-primary/20 p-8 md:p-12 group cursor-pointer"
              onClick={() => navigate('/health-library/lifestyle')}
            >
              {/* Background elements */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-primary/30 transition-colors duration-700" />
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center relative overflow-hidden group-hover:rotate-3 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Unlocked Feature
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                    Healthy & Better <span className="text-brand-primary">Lifestyle</span>
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0">
                    Great work on completing your assessment! Explore our expert-backed guides on recovery, 
                    mental hygiene, and simple daily habits tailored for your wellness journey.
                  </p>
                  <div className="pt-4">
                    <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:-translate-y-1 transition-transform flex items-center gap-2 mx-auto md:mx-0">
                      Explore Wellness Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
