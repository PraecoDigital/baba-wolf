import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, signUp as apiSignUp, getCurrentUser, logout, setAuthSession, clearAuthSession, readAuthSession } from '../lib/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { sessionToken, user: cachedUser } = readAuthSession();
        if (sessionToken) {
          try {
            const fresh = await getCurrentUser(sessionToken);
            setUser(fresh);
            setAuthSession({ sessionToken, user: fresh });
          } catch {
            clearAuthSession();
            setUser(null);
          }
        } else if (cachedUser) {
          setUser(cachedUser);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const signUp = async (email, password, fullName, phoneNumber) => {
    try {
      const created = await apiSignUp({ email, password, fullName, phoneNumber });
      // Login after signup to get session token
      const loggedIn = await login({ username: email, password });
      setAuthSession({ sessionToken: loggedIn.sessionToken, user: loggedIn });
      setUser(loggedIn);
      return { success: true, user: loggedIn };
    } catch (error) {
      const message = error?.response?.data?.error || error?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await login({ username: email, password });
      setAuthSession({ sessionToken: result.sessionToken, user: result });
      setUser(result);
      return { success: true, user: result };
    } catch (error) {
      const message = error?.response?.data?.error || error?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const signOut = async () => {
    try {
      const { sessionToken } = readAuthSession();
      await logout(sessionToken);
      clearAuthSession();
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isAdmin = () => {
    return user?.get('isAdmin') || false;
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
