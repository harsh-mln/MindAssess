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
    const fetchStartQuestion = async () => {
      try {
        const res = await axios.get('/api/assessment/start');
        setCurrentQuestion(res.data.data);
        setProgress(1);
      } catch (err) {
        setError('Failed to load assessment. Please ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchStartQuestion();
  }, []);

  const handleSelect = async (option) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/assessment/answer', {
        questionId: currentQuestion.questionId,
        selectedOptionValue: option.value,
        assessmentId: assessmentId
      });

      if (!assessmentId) {
        setAssessmentId(res.data.assessmentId);
      }

      if (res.data.isFinished) {
        setReport(res.data.report);
      } else {
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
        className="max-w-4xl mx-auto py-12"
      >
        <div className="glass-panel rounded-3xl overflow-hidden border-t-4 border-t-brand-primary">
          <div className="p-10 md:p-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary/10 text-brand-primary mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4">Assessment Complete</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Total Score: {report.totalScore}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mb-10 border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-semibold mb-3">Clinical Overview</h3>
              <p className="text-lg leading-relaxed">{report.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {Object.entries(report.breakdown).map(([category, data]) => (
                <div key={category} className="glass-panel p-6 rounded-2xl">
                  <h4 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">{category}</h4>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold">{data.score}</span>
                    <span className="text-sm pb-1 opacity-60">/ {data.maxScore}</span>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-4 border 
                    border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {data.level.toUpperCase()}
                  </div>
                  <p className="text-sm leading-relaxed">{data.insight}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-semibold transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20">
      <div className="flex justify-between items-center mb-10 px-2">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-brand-primary">
          {currentQuestion.category} Marker
        </h2>
        <div className="text-xs font-medium px-3 py-1 rounded-full glass-panel text-slate-500 dark:text-slate-400">
          Q {progress} of 16
        </div>
      </div>
      
      {/* Sleek Progress bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mb-16 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-brand-primary to-purple-600 h-full rounded-full" 
          initial={{ width: 0 }}
          animate={{ width: `${(progress / 16) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion.questionId}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-medium mb-12 leading-relaxed text-slate-800 dark:text-slate-100">
            {currentQuestion.text}
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <motion.button
                key={idx}
                disabled={loading}
                whileHover={{ scale: 1.01, x: 5 }}
                whileTap={{ scale: 0.99 }}
                className="relative group w-full text-left p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary bg-white dark:bg-[#1A1C23] flex items-center transition-all duration-200"
                onClick={() => handleSelect(option)}
              >
                <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-brand-primary flex flex-shrink-0 items-center justify-center mr-4 text-sm font-semibold text-slate-500 group-hover:text-brand-primary transition-colors">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-lg font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {option.label}
                </span>
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AssessmentEngine;
