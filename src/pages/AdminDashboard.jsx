import React, { useState, useEffect } from 'react';
import Parse from '../lib/parseInit';
import { Service, Appointment, Rating } from '../lib/parse';
import { Plus, Edit, Trash2, Star, Calendar, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Service form state
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    cost: '',
    durationMinutes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch services
      const serviceQuery = new Parse.Query(Service);
      serviceQuery.ascending('name');
      const serviceResults = await serviceQuery.find();

      // Fetch recent appointments
      const appointmentQuery = new Parse.Query(Appointment);
      appointmentQuery.include(['user', 'service']);
      appointmentQuery.descending('createdAt');
      appointmentQuery.limit(10);
      const appointmentResults = await appointmentQuery.find();

      // Fetch ratings
      const ratingQuery = new Parse.Query(Rating);
      ratingQuery.include(['user', 'service']);
      ratingQuery.descending('createdAt');
      ratingQuery.limit(10);
      const ratingResults = await ratingQuery.find();

      setServices(serviceResults);
      setAppointments(appointmentResults);
      setRatings(ratingResults);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        // Update existing service
        editingService.set('name', serviceForm.name);
        editingService.set('description', serviceForm.description);
        editingService.set('cost', parseFloat(serviceForm.cost));
        editingService.set('durationMinutes', parseInt(serviceForm.durationMinutes));
        await editingService.save();
        toast.success('Service updated successfully');
      } else {
        // Create new service
        const service = new Service();
        service.set('name', serviceForm.name);
        service.set('description', serviceForm.description);
        service.set('cost', parseFloat(serviceForm.cost));
        service.set('durationMinutes', parseInt(serviceForm.durationMinutes));
        await service.save();
        toast.success('Service created successfully');
      }

      setServiceForm({ name: '', description: '', cost: '', durationMinutes: '' });
      setShowServiceForm(false);
      setEditingService(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to save service');
      console.error('Error saving service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.get('name'),
      description: service.get('description'),
      cost: service.get('cost').toString(),
      durationMinutes: service.get('durationMinutes').toString()
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (service) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await service.destroy();
        toast.success('Service deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete service');
        console.error('Error deleting service:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-secondary">
            Manage your barbershop services, appointments, and customer feedback.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary">Total Services</p>
                <p className="text-2xl font-bold text-primary">{services.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary">Recent Appointments</p>
                <p className="text-2xl font-bold text-primary">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary">Customer Reviews</p>
                <p className="text-2xl font-bold text-primary">{ratings.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary">Avg. Rating</p>
                <p className="text-2xl font-bold text-primary">
                  {ratings.length > 0 
                    ? (ratings.reduce((sum, rating) => sum + rating.get('ratingValue'), 0) / ratings.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Management */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-primary">
                Services Management
              </h2>
              <button
                onClick={() => {
                  setShowServiceForm(true);
                  setEditingService(null);
                  setServiceForm({ name: '', description: '', cost: '', durationMinutes: '' });
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {services.length === 0 ? (
              <p className="text-secondary text-center py-8">No services available.</p>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-primary">
                          {service.get('name')}
                        </h3>
                        <p className="text-secondary text-sm mb-2">
                          {service.get('description')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-accent font-bold">
                            ${service.get('cost')}
                          </span>
                          <span className="text-secondary">
                            {service.get('durationMinutes')} min
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Appointments */}
          <div className="card">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Recent Appointments
            </h2>
            {appointments.length === 0 ? (
              <p className="text-secondary text-center py-8">No recent appointments.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-primary">
                          {appointment.get('service')?.get('name')}
                        </h3>
                        <p className="text-secondary text-sm">
                          {appointment.get('user')?.get('fullName')} ({appointment.get('user')?.get('email')})
                        </p>
                        <p className="text-secondary text-sm">
                          {format(new Date(appointment.get('appointmentStartTime')), 'MMM do, yyyy \'at\' h:mm a')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.get('status'))}`}>
                        {appointment.get('status')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="card mt-8">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Recent Customer Reviews
          </h2>
          {ratings.length === 0 ? (
            <p className="text-secondary text-center py-8">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {ratings.map((rating) => (
                <div key={rating.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-primary">
                        {rating.get('service')?.get('name')}
                      </h3>
                      <p className="text-secondary text-sm">
                        {rating.get('user')?.get('fullName')}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.get('ratingValue')
                              ? 'text-accent fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {rating.get('reviewText') && (
                    <p className="text-secondary">{rating.get('reviewText')}</p>
                  )}
                  <p className="text-xs text-secondary mt-2">
                    {format(new Date(rating.createdAt), 'MMM do, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-primary mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  id="cost"
                  value={serviceForm.cost}
                  onChange={(e) => setServiceForm({ ...serviceForm, cost: e.target.value })}
                  className="input-field"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-primary mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  value={serviceForm.durationMinutes}
                  onChange={(e) => setServiceForm({ ...serviceForm, durationMinutes: e.target.value })}
                  className="input-field"
                  min="1"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowServiceForm(false);
                    setEditingService(null);
                    setServiceForm({ name: '', description: '', cost: '', durationMinutes: '' });
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
