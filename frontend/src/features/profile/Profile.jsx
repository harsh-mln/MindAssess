import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1A1C23] dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10 relative z-10">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#0B0C10] shadow-xl">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&size=256`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">Change</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user?.name || 'Guest User'}</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email || 'No email provided'}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              {user?.role || 'Patient'}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 glass-panel hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-700"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium transition-colors border border-red-500/20"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-6">Account Details</h3>
          
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form 
                key="edit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSave}
                className="space-y-6 max-w-md"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <button type="submit" className="px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold hover:bg-brand-primary/90 transition-colors w-full sm:w-auto">
                  Save Changes
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div className="bg-slate-50 dark:bg-[#1A1C23] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm">
                  <p className="text-slate-500 dark:text-slate-400 mb-1">Account ID</p>
                  <p className="font-mono text-slate-900 dark:text-white">{user?._id || 'N/A'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-[#1A1C23] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm">
                  <p className="text-slate-500 dark:text-slate-400 mb-1">Member Since</p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Just now'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;
