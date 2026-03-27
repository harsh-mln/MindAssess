import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../UI/ThemeToggle';
import GooeyNav from '../UI/GooeyNav';
import HealthLibraryDropdown from '../UI/HealthLibraryDropdown';

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [sparks, setSparks] = useState([]);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  const triggerSpark = () => {
    const id = Date.now();
    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      id: `${id}-${i}`,
      angle: (i * 45) * (Math.PI / 180),
      velocity: 40 + Math.random() * 40
    }));
    setSparks(prev => [...prev.slice(-16), ...newSparks]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.find(ns => ns.id === s.id)));
    }, 1000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLibrary(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine initial index for GooeyNav
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', onClick: () => navigate('/dashboard') },
    { label: 'Start Test', href: '/assessment', onClick: () => navigate('/assessment') },
  ];
  const initialIndex = location.pathname.includes('/assessment') ? 1 : 0;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200 dark:border-slate-800" ref={dropdownRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link 
              to="/" 
              onClick={triggerSpark}
              className="group flex items-center gap-2 relative"
            >
              {/* Click Spark Particles */}
              <AnimatePresence>
                {sparks.map((spark) => (
                  <motion.div
                    key={spark.id}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ 
                      x: Math.cos(spark.angle) * spark.velocity, 
                      y: Math.sin(spark.angle) * spark.velocity,
                      scale: 0,
                      opacity: 0 
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute left-4 top-4 w-1.5 h-1.5 rounded-full bg-brand-primary pointer-events-none z-50 shadow-lg shadow-brand-primary/50"
                  />
                ))}
              </AnimatePresence>

              <motion.div 
                whileTap={{ scale: 0.8 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg transition-transform"
              >
                M
              </motion.div>
              <motion.span 
                whileHover={{ x: 2 }}
                className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Mind<span className="text-brand-primary">Assess</span>
              </motion.span>
            </Link>

            {/* Desktop Health Library Link */}
            <div className="hidden md:block">
              <button
                onClick={() => setShowLibrary(!showLibrary)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  showLibrary 
                    ? 'text-brand-primary bg-brand-primary/10' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary'
                }`}
              >
                Health Library
                <motion.svg 
                  animate={{ rotate: showLibrary ? 180 : 0 }}
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-4 items-center">
            {/* Interactive Gooey Nav */}
            <div className="mr-4">
              <GooeyNav 
                items={navItems} 
                initialActiveIndex={initialIndex}
              />
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>
            
            <ThemeToggle />
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://icallhelpline.org/', '_blank')}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/20 transition-colors flex items-center gap-2 mr-2"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Crisis Help
            </motion.button>

            <Link to={user ? "/profile" : "/auth"}>
              <motion.div whileHover={{ scale: 1.05 }} className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-brand-primary p-[2px] cursor-pointer shadow-md">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0C10] overflow-hidden flex items-center justify-center">
                  <img alt="User" src={`https://ui-avatars.com/api/?name=${user?.name || 'Login'}&background=random`} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => window.open('https://icallhelpline.org/', '_blank')}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors"
              aria-label="Crisis Help"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLibrary && (
          <HealthLibraryDropdown 
            isOpen={showLibrary} 
            onClose={() => setShowLibrary(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Mobile Library section */}
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Health Library
              </div>
              <Link
                to="/health-library/diseases"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
              >
                Diseases & Conditions
              </Link>
              <Link
                to="/health-library/drugs"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
              >
                Drugs & Supplements
              </Link>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

