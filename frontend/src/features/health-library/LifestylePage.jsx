import React from 'react';
import { motion } from 'framer-motion';

const videos = [
  {
    id: 'hJbRpHZr_d0',
    title: 'Yoga for Anxiety and Stress',
    description: 'A gentle and restorative yoga practice designed to calm the nervous system and release tension stored in the body.',
    category: 'Physical Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'HWcphoKlbxY',
    title: 'Understanding and Overcoming Depression',
    description: 'Expert insights into the mechanics of depression and science-backed strategies for recovery and resilience.',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1493839523149-2864fca44919?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'BQVFVXmU-Ug',
    title: 'How to Stop Overthinking',
    description: 'Mindfulness techniques and cognitive tools to help you quiet the mind and break the cycle of ruminative thoughts.',
    category: 'Mindfulness',
    image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=800'
  }
];

const LifestylePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0C10] pb-24">
      {/* Hero Section */}
      <div className="relative bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 py-16 mb-16 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary mb-6"
          >
            <span>Wellness Hub</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-400 dark:text-slate-500">Healthy Lifestyle</span>
          </motion.nav>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6"
          >
            Better Habits for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">Healthier Mind</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto italic"
          >
            "Wellness is not a luxury, it is a priority." — Explore our curated selection of guides to help you build resilience and peace of mind.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col h-full group"
            >
              {/* Video Player Card */}
              <div className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-2xl shadow-brand-primary/10 border border-slate-200 dark:border-slate-800 bg-slate-900 mb-6">
                <iframe
                  className="w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content Card */}
              <div className="flex-grow flex flex-col space-y-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {video.category}
                  </span>
                  <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors duration-300 leading-snug">
                  {video.title}
                </h2>
                <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0B0C10] to-indigo-950 text-white relative overflow-hidden shadow-3xl shadow-brand-primary/10">
          <div className="absolute top-0 right-0 p-12 opacity-10 blur-2xl pointer-events-none">
            <svg className="w-64 h-64 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="relative z-10 md:w-2/3 space-y-6">
            <h3 className="text-3xl font-black">Need more personalized guidance?</h3>
            <p className="text-lg text-slate-300">
              Our clinical assessments provide much more than just scores. Re-assess regularly to see how these habits are impacting your mental burden scores.
            </p>
            <button 
              onClick={() => window.location.href = '/assessment'}
              className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-brand-primary/30"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestylePage;
