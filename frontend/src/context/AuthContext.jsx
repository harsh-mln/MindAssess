import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        // Not logged in or token expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password, role = 'patient') => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const res = await axios.put('/api/auth/updatedetails', userData);
      if (res.data.success) {
        setUser(res.data.data);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
