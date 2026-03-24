import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssessmentEngine = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); 
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAssessment = async () => {
      try {
        setLoading(true);
        // Check for existing progress
        const savedId = localStorage.getItem('active_assessment_id');
        const savedProgress = localStorage.getItem('assessment_progress');

        if (savedId && savedProgress) {
          setAssessmentId(savedId);
          setProgress(parseInt(savedProgress));
        } else {
          localStorage.setItem('local_running_score', '0');
        }

        const res = await axios.get('/api/assessment/start');
        setCurrentQuestion(res.data.data);
        if (!savedProgress) setProgress(1);
      } catch (err) {
        setError('Failed to load assessment. Please ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    initAssessment();
  }, []);

  const handleSelect = async (option) => {
    try {
      setLoading(true);
      
      const res = await axios.post('/api/assessment/answer', {
        questionId: currentQuestion.questionId,
        selectedOptionValue: option.value,
        assessmentId: assessmentId
      });

      const newId = assessmentId || res.data.assessmentId;
      const currentLocalScore = Number(localStorage.getItem('local_running_score') || '0');
      const newLocalScore = currentLocalScore + Number(option.value);
      localStorage.setItem('local_running_score', newLocalScore.toString());

      if (!assessmentId) {
        setAssessmentId(newId);
        localStorage.setItem('active_assessment_id', newId);
      }

      // Store current score in local lookup for historical purposes if needed
      const currentScores = JSON.parse(localStorage.getItem('temp_scores') || '[]');
      currentScores.push({ q: currentQuestion.questionId, score: option.value });
      localStorage.setItem('temp_scores', JSON.stringify(currentScores));

      if (res.data.isFinished) {
        console.log('--- Assessment Finished reached on Frontend ---');
        console.log('Backend Response Data:', res.data);
        const finalReport = res.data.report;
        
        if (finalReport) {
          console.log('Calculated Result Score:', finalReport.totalScore);
        } else {
          console.log('WARNING: backend report missing from response');
          finalReport = { totalScore: newLocalScore, overview: 'Analysis derived from local data.', breakdown: {} };
        }

        // If backend fails to sum (sanity check), use local sum as display fallback
        if (finalReport.totalScore === undefined || finalReport.totalScore === null) {
          console.log('Using local fallback sum:', newLocalScore);
          finalReport.totalScore = newLocalScore;
        }
        setReport(finalReport);
        
        // SUCCESS: Clear cache
        localStorage.removeItem('active_assessment_id');
        localStorage.removeItem('assessment_progress');
        localStorage.removeItem('temp_scores');
        localStorage.removeItem('local_running_score');
      } else {
        localStorage.setItem('assessment_progress', (progress + 1).toString());
        setCurrentQuestion(res.data.nextQuestion);
        setProgress((prev) => prev + 1);
      }
    } catch (err) {
      setError('Error submitting answer.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto pt-10 pb-20 animate-pulse">
        <div className="flex justify-between items-center mb-10 px-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mb-16"></div>
        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-8 h-96">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-12"></div>
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="glass-panel p-8 text-center text-red-500 rounded-xl">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (report) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <div className="glass-panel rounded-[2.5rem] overflow-hidden border-t-8 border-t-brand-primary shadow-2xl">
          <div className="p-8 md:p-16">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 text-white mb-8 shadow-lg shadow-brand-primary/20"
              >
                <span className="text-xs uppercase tracking-widest opacity-80 mb-1">Total Score</span>
                <span className="text-5xl font-black">{report.totalScore}</span>
                <span className="text-[10px] mt-1 opacity-70">RANGE: -30 TO +30</span>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Assessment Complete</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto italic">
                Your psychological profile has been analyzed across multiple clinical markers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800/40 p-8 rounded-[2rem] mb-12 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary"></div>
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                 Clinical Insights Overview
               </h3>
               <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{report.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(report.breakdown).map(([category, data]) => {
                const getLevelColors = (level) => {
                  switch(level) {
                    case 'Stable': return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
                    case 'Mildly Stressed': return 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400';
                    case 'Moderate Burden': return 'border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400';
                    case 'High Burden': return 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400';
                    default: return 'border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400';
                  }
                };
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={category} 
                    className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">{category}</h4>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold tracking-tighter">{data.score > 0 ? `+${data.score}` : data.score}</span>
                        <span className="text-[10px] font-medium opacity-40 uppercase">Scale: -6/6</span>
                      </div>
                      <div className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black tracking-widest mb-4 border ${getLevelColors(data.level)} uppercase`}>
                        {data.level}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800 pt-3 italic">
                      {data.insight}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Return to Personal Dashboard
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20 px-4">
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary mb-2">
            [V8-SYNC] Assessment Module
          </h2>
          <div className="text-2xl font-bold dark:text-white">
            {currentQuestion.category}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-3xl font-black text-slate-300 dark:text-slate-700 tracking-tighter">
            {progress < 10 ? `0${progress}` : progress}<span className="text-slate-100 dark:text-slate-800 mx-1">/</span>15
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Progress
          </div>
        </div>
      </div>
      
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-full h-2 mb-16 overflow-hidden shadow-inner">
        <motion.div 
          className="bg-gradient-to-r from-brand-primary via-purple-500 to-indigo-600 h-full rounded-full" 
          initial={{ width: 0 }}
          animate={{ width: `${(progress / 15) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion.questionId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-[2rem] p-8 sm:p-14 mb-8 shadow-2xl relative"
        >
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand-primary/30">
            {progress}
          </div>
          
          <h3 className="text-2xl sm:text-4xl font-bold mb-14 leading-[1.3] text-slate-800 dark:text-slate-100 tracking-tight">
            {currentQuestion.text}
          </h3>
          
          <div className="grid grid-cols-1 gap-5">
            {currentQuestion.options.map((option, idx) => (
              <motion.button
                key={idx}
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group w-full text-left p-6 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary bg-white/50 dark:bg-slate-900/50 flex items-center transition-all duration-300 backdrop-blur-sm shadow-sm"
                onClick={() => handleSelect(option)}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-primary group-hover:text-white flex flex-shrink-0 items-center justify-center mr-5 text-sm font-black text-slate-500 transition-all duration-300">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {option.label}
                </span>
                
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-10 opacity-30">
        v6.0 - Build: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AssessmentEngine;
