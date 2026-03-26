import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdFavorite, MdLocalHospital, MdArrowForward } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/khanndelwalharshit/MENTAL-HEALTH-ASSESSMENT', label: 'GitHub' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaXTwitter />, url: 'https://twitter.com', label: 'X (Twitter)' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { text: 'Take Assessment', path: '/assessment' },
    { text: 'Your Dashboard', path: '/dashboard' },
    { text: 'Crisis Resources', path: 'https://icallhelpline.org/', isExternal: true },
    { text: 'Privacy Policy', path: '#' },
    { text: 'Terms of Service', path: '#' }
  ];

  return (
    <footer className="w-full mt-auto relative z-10 bg-slate-950 dark:bg-[#1A1C23]/70 backdrop-blur-lg border-t border-slate-900 dark:border-slate-800 overflow-hidden text-slate-300 transition-colors duration-500">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-slate-900 dark:border-slate-800/50 pb-10">
          
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-indigo-500 to-purple-500 tracking-tight">
              MindAssess
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Clinical-grade mental health screening crafted with privacy, empathy, and computational precision. Your data, your journey.
            </p>
            <div className="flex space-x-3 pt-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-primary hover:border-brand-primary/30 transition-all duration-300"
                >
                  <span className="text-[17px]">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-base font-semibold text-slate-100 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                    {link.isExternal ? (
                      <a 
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center text-sm text-slate-400 hover:text-brand-primary transition-colors"
                      >
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2 text-brand-primary">
                          <MdArrowForward />
                        </span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          {link.text}
                        </span>
                      </a>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="group flex items-center text-sm text-slate-400 hover:text-brand-primary transition-colors"
                      >
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2 text-brand-primary">
                          <MdArrowForward />
                        </span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          {link.text}
                        </span>
                      </Link>
                    )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Emergency Lifeline */}
          <div className="flex flex-col space-y-4 lg:col-span-1">
            <h4 className="text-base font-semibold text-slate-100 uppercase tracking-wider">Crisis Support</h4>
            <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-red-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <MdLocalHospital className="text-6xl" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 mb-3 tracking-wide flex items-center w-max">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
                  24/7 AVAILABLE
                </span>
                <p className="text-sm text-slate-300 font-medium mb-1">
                  iCall Helpline
                </p>
                <div className="text-4xl font-black tracking-tight text-red-500 font-mono">
                  9152987821
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Call or text immediately. Confidential and trained support is right here.
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-base font-semibold text-slate-100 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-slate-400">
              Get the latest insights on mental wellness and platform features. No spam.
            </p>
            <form className="mt-2 flex flex-col space-y-3 relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl bg-transparent border border-slate-200 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder-slate-400 transition-all text-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-brand-primary/20 transition-all"
              >
                <span>Subscribe</span>
              </motion.button>
            </form>
          </div>

        </div>

        {/* Copyright & Bottom Bar */}
        <div className="mt-8 flex justify-center text-xs text-slate-500 text-center">
          <p>
            © {currentYear} MindAssess Platform. All rights reserved. 
            <span className="mx-2 hidden sm:inline">|</span> 
            <span className="block sm:inline mt-1 sm:mt-0 opacity-50">Secured with enterprise-grade encryption.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
