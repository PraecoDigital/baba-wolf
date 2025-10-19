import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, Star, Users } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Scissors className="w-8 h-8 text-accent" />,
      title: 'Professional Services',
      description: 'Expert barbers with years of experience providing top-quality cuts and styling.'
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: 'Flexible Scheduling',
      description: 'Book appointments at your convenience with our easy online booking system.'
    },
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      title: 'Premium Experience',
      description: 'Luxury atmosphere with attention to detail and customer satisfaction.'
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: 'Loyalty Program',
      description: 'Subscribe to services and enjoy exclusive benefits and savings.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Welcome to Black Sheep Barbershop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Where tradition meets modern style. Experience the finest in men's grooming with our professional barbers and premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary bg-accent hover:bg-accent/90 text-lg px-8 py-4">
              Book Your Appointment
            </Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Why Choose Black Sheep?
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              We're committed to providing an exceptional grooming experience that exceeds your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              From classic cuts to modern styling, we offer a full range of grooming services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                Men's Haircut
              </h3>
              <p className="text-secondary mb-4">
                Professional haircuts tailored to your style and face shape.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-accent">$25</span>
                <span className="text-secondary">30 min</span>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                Beard Trim & Style
              </h3>
              <p className="text-secondary mb-4">
                Precision beard trimming and styling for a polished look.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-accent">$20</span>
                <span className="text-secondary">25 min</span>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                Complete Package
              </h3>
              <p className="text-secondary mb-4">
                Haircut, beard trim, and styling for the ultimate grooming experience.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-accent">$40</span>
                <span className="text-secondary">45 min</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready for Your Next Cut?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your appointment today and experience the Black Sheep difference.
          </p>
          <Link to="/booking" className="btn-primary bg-accent hover:bg-accent/90 text-lg px-8 py-4">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
