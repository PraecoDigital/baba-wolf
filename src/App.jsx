import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const Home = () => (
  <main className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-heading font-bold text-primary mb-6">
        Welcome to Black Sheep Barbershop
      </h1>
      <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto">
        Where tradition meets modern style. Experience the finest in men's grooming with our professional barbers and premium services.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/booking" className="btn-primary">
          Book Your Appointment
        </Link>
        <Link to="/services" className="btn-secondary">
          View Services
        </Link>
      </div>
    </div>
  </main>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-body">
          {/* Header */}
          <div className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link to="/" className="text-2xl font-heading font-bold text-primary hover:text-accent transition-colors duration-200">
                  Black Sheep Barbershop
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/services" className="text-secondary hover:text-primary">Services</Link>
                  <a href="#contact" className="text-secondary hover:text-primary">Contact</a>
                  <Link to="/login" className="text-secondary hover:text-primary">Sign In</Link>
                  <Link to="/register" className="btn-primary">Create Account</Link>
                </div>
              </div>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#363636', color: '#fff' },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
