import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import GooeyNav from '../ui/GooeyNav';

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Determine initial index for GooeyNav
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', onClick: () => navigate('/dashboard') },
    { label: 'Start Test', href: '/assessment', onClick: () => navigate('/assessment') },
  ];
  const initialIndex = location.pathname.includes('/assessment') ? 1 : 0;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Mind<span className="text-brand-primary">Assess</span>
              </span>
            </Link>
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
              onClick={() => window.open('https://988lifeline.org/', '_blank')}
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
              onClick={() => window.open('https://988lifeline.org/', '_blank')}
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
