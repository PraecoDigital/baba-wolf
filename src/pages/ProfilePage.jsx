import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Parse from '../lib/parseInit';
import { Appointment, Subscription, Rating } from '../lib/parse';
import { Calendar, CreditCard, Star, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch appointments
      const appointmentQuery = new Parse.Query(Appointment);
      appointmentQuery.equalTo('user', user);
      appointmentQuery.include('service');
      appointmentQuery.descending('appointmentStartTime');
      const appointmentResults = await appointmentQuery.find();

      // Fetch subscriptions
      const subscriptionQuery = new Parse.Query(Subscription);
      subscriptionQuery.equalTo('user', user);
      subscriptionQuery.include('service');
      const subscriptionResults = await subscriptionQuery.find();

      // Fetch ratings
      const ratingQuery = new Parse.Query(Rating);
      ratingQuery.equalTo('user', user);
      ratingQuery.include(['service', 'appointment']);
      ratingQuery.descending('createdAt');
      const ratingResults = await ratingQuery.find();

      setAppointments(appointmentResults);
      setSubscriptions(subscriptionResults);
      setRatings(ratingResults);
    } catch (error) {
      toast.error('Failed to load profile data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-blue-600';
      case 'completed':
        return 'text-success';
      case 'cancelled':
        return 'text-error';
      default:
        return 'text-secondary';
    }
  };

  const getSubscriptionStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'cancelled':
        return 'text-error';
      case 'expired':
        return 'text-secondary';
      default:
        return 'text-secondary';
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
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.get('fullName')?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary">
                Welcome back, {user?.get('fullName') || 'User'}!
              </h1>
              <p className="text-secondary">{user?.get('email')}</p>
              <p className="text-secondary">{user?.get('phoneNumber') || 'No phone number provided'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'appointments', label: 'Appointments', icon: Calendar },
                { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
                { id: 'ratings', label: 'Reviews', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    Your Appointments
                  </h2>
                  <Link to="/booking" className="btn-primary">
                    Book New Appointment
                  </Link>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      No appointments yet
                    </h3>
                    <p className="text-secondary mb-6">
                      Book your first appointment to get started!
                    </p>
                    <Link to="/booking" className="btn-primary">
                      Book Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              {appointment.get('service')?.get('name')}
                            </h3>
                            <p className="text-secondary">
                              {format(new Date(appointment.get('appointmentStartTime')), 'EEEE, MMMM do, yyyy \'at\' h:mm a')}
                            </p>
                            <p className="text-secondary">
                              Duration: {appointment.get('service')?.get('durationMinutes')} minutes
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.get('status'))}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.get('status')}
                            </span>
                            <p className="text-lg font-bold text-accent mt-2">
                              ${appointment.get('service')?.get('cost')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    Actor Subscriptions
                  </h2>
                  <Link to="/services" className="btn-primary">
                    View Services
                  </Link>
                </div>

                {subscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      No subscriptions yet
                    </h3>
                    <p className="text-secondary mb-6">
                      Subscribe to your favorite services for convenient booking!
                    </p>
                    <Link to="/services" className="btn-primary">
                      View Services
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((subscription) => (
                      <div key={subscription.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              {subscription.get('service')?.get('name')} Subscription
                            </h3>
                            <p className="text-secondary">
                              Valid from {format(new Date(subscription.get('startDate')), 'MMM do, yyyy')} to {format(new Date(subscription.get('endDate')), 'MMM do, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionStatusColor(subscription.get('status'))}`}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {subscription.get('status')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Ratings Tab */}
            {activeTab === 'ratings' && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  Your Reviews
                </h2>

                {ratings.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-secondary">
                      Complete an appointment to leave a review!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ratings.map((rating) => (
                      <div key={rating.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              {rating.get('service')?.get('name')}
                            </h3>
                            <p className="text-secondary">
                              {format(new Date(rating.createdAt), 'MMM do, yyyy')}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < rating.get('ratingValue')
                                    ? 'text-accent fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {rating.get('reviewText') && (
                          <p className="text-secondary">
                            {rating.get('reviewText')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
