import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HealthLibraryDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Health Information',
      links: [
        { label: 'Diseases & Conditions', href: '/health-library/diseases' },
      ]
    },
    {
      title: 'Wellness & Lifestyle',
      links: [
        { label: 'Drugs & Supplements', href: '/health-library/drugs' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-white dark:bg-[#0B0C10] shadow-2xl border-t border-slate-100 dark:border-slate-800 z-50 overflow-hidden"
    >
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors flex items-center group"
                      onClick={onClose}
                    >
                      <span>{link.label}</span>
                      <svg 
                        className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-purple-500 to-indigo-600"></div>
    </motion.div>
  );
};

export default HealthLibraryDropdown;
