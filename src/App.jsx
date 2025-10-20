import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Black Sheep Barbershop
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/booking" className="bg-yellow-600 text-white px-4 py-2 rounded">Book Now</a>
            </div>
          </div>
        </div>
      </div>
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Black Sheep Barbershop
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Where tradition meets modern style. Experience the finest in men's grooming with our professional barbers and premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-yellow-600 text-white px-8 py-4 rounded text-lg hover:bg-yellow-700">
              Book Your Appointment
            </a>
            <a href="/services" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded text-lg hover:bg-yellow-600 hover:text-white">
              View Services
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
