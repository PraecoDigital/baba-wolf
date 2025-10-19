import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-heading font-bold text-primary">
                Black Sheep Barbershop
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/services" 
              className="text-primary hover:text-accent transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-primary hover:text-accent transition-colors duration-200"
            >
              Contact
            </Link>
            <Link 
              to="/booking" 
              className="btn-primary"
            >
              Book Now
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="text-primary hover:text-accent transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="flex items-center text-primary hover:text-accent transition-colors duration-200"
                >
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center text-primary hover:text-accent transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-primary hover:text-accent transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-secondary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-accent focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/services" 
                className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/booking" 
                className="block px-3 py-2 btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>

              {user ? (
                <>
                  {isAdmin() && (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 btn-secondary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
