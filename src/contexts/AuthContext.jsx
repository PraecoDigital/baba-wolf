import React, { createContext, useContext, useState, useEffect } from 'react';

// Lazy load Parse to avoid initialization errors
let Parse = null;
const loadParse = async () => {
  if (!Parse) {
    try {
      const parseModule = await import('../lib/parseInit.js');
      Parse = parseModule.default;
    } catch (error) {
      console.warn('Failed to load Parse:', error);
      return null;
    }
  }
  return Parse;
};

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
    const initializeAuth = async () => {
      try {
        const ParseInstance = await loadParse();
        if (ParseInstance) {
          // Check if user is already logged in
          const currentUser = ParseInstance.User.current();
          if (currentUser) {
            setUser(currentUser);
          }

          // Listen for authentication state changes
          ParseInstance.User.on('authenticated', (user) => {
            setUser(user);
          });

          ParseInstance.User.on('loggedOut', () => {
            setUser(null);
          });
        }
      } catch (error) {
        console.warn('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (email, password, fullName, phoneNumber) => {
    try {
      const ParseInstance = await loadParse();
      if (!ParseInstance) {
        return { success: false, error: 'Parse not available' };
      }

      const user = new ParseInstance.User();
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
      const ParseInstance = await loadParse();
      if (!ParseInstance) {
        return { success: false, error: 'Parse not available' };
      }

      const result = await ParseInstance.User.logIn(email, password);
      setUser(result);
      return { success: true, user: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const ParseInstance = await loadParse();
      if (!ParseInstance) {
        return { success: false, error: 'Parse not available' };
      }

      await ParseInstance.User.logOut();
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
