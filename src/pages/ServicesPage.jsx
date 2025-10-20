import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parse from '../lib/parseInit';
import { Clock, DollarSign, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const query = new Parse.Query('Service');
      query.ascending('name');
      const results = await query.find();
      setServices(results);
    } catch (error) {
      toast.error('Failed to load services');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `$${price}`;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} hr`;
      } else {
        return `${hours} hr ${remainingMinutes} min`;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Our Services
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Professional grooming services designed to help you look and feel your best. 
            From classic cuts to modern styling, we've got you covered.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg mb-4">No services available at the moment.</p>
            <p className="text-secondary">Please check back later or contact us for more information.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.id} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                    {service.get('name')}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {service.get('description')}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-accent">
                    <DollarSign className="w-5 h-5 mr-1" />
                    <span className="text-2xl font-bold">
                      {formatPrice(service.get('cost'))}
                    </span>
                  </div>
                  <div className="flex items-center text-secondary">
                    <Clock className="w-5 h-5 mr-1" />
                    <span className="font-medium">
                      {formatDuration(service.get('durationMinutes'))}
                    </span>
                  </div>
                </div>

                {/* Rating placeholder - would be calculated from actual ratings */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-secondary">(4.8)</span>
                  </div>
                </div>

                <Link 
                  to={`/booking?service=${service.id}`}
                  className="w-full btn-primary text-center block"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Info Section */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Subscribe & Save
          </h2>
          <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
            Love getting regular cuts? Subscribe to your favorite service and enjoy 
            convenient booking without payment at each appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary bg-accent hover:bg-accent/90">
              View Subscription Options
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
