import React, { createContext, useContext, useState, useEffect } from 'react';
import Parse, { User } from '../lib/parse.js';

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
    // Check if user is already logged in
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);

    // Listen for authentication state changes
    Parse.User.on('authenticated', (user) => {
      setUser(user);
    });

    Parse.User.on('loggedOut', () => {
      setUser(null);
    });
  }, []);

  const signUp = async (email, password, fullName, phoneNumber) => {
    try {
      const user = new Parse.User();
      user.set('username', email);
      user.set('email', email);
      user.set('password', password);
      user.set('fullName', fullName);
      user.set('phoneNumber', phoneNumber);
      user.set('isAdmin', false);

      const result = await user.signUp();
      setUser(result);
      return { success: true, user: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await Parse.User.logIn(email, password);
      setUser(result);
      return { success: true, user: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await Parse.User.logOut();
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
