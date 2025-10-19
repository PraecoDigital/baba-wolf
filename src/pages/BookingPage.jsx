import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Parse from '../lib/parseInit';
import { Service, Appointment } from '../lib/parse';
import { Calendar, Clock, DollarSign, User } from 'lucide-react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Available time slots (9 AM to 6 PM, 30-minute intervals)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && services.length > 0) {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [services, searchParams]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const query = new Parse.Query(Service);
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

  const fetchAvailableSlots = async () => {
    try {
      if (!selectedService || !selectedDate) return;

      // Get existing appointments for the selected date
      const appointmentQuery = new Parse.Query(Appointment);
      appointmentQuery.equalTo('status', 'confirmed');
      const appointments = await appointmentQuery.find();

      // Filter appointments for the selected date
      const dayAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.get('appointmentStartTime'));
        return isSameDay(aptDate, selectedDate);
      });

      // Calculate available slots
      const bookedTimes = dayAppointments.map(apt => {
        const aptDate = new Date(apt.get('appointmentStartTime'));
        return format(aptDate, 'HH:mm');
      });

      const available = timeSlots.filter(time => !bookedTimes.includes(time));
      setAvailableSlots(available);
    } catch (error) {
      toast.error('Failed to load available slots');
      console.error('Error fetching available slots:', error);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableSlots([]);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please sign in to book an appointment');
      navigate('/login');
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error('Please select a service, date, and time');
      return;
    }

    try {
      setBooking(true);

      // Create appointment datetime
      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Create appointment
      const appointment = new Appointment();
      appointment.set('user', user);
      appointment.set('service', selectedService);
      appointment.set('appointmentStartTime', appointmentDateTime);
      appointment.set('status', 'confirmed');

      await appointment.save();

      toast.success('Appointment booked successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to book appointment');
      console.error('Error booking appointment:', error);
    } finally {
      setBooking(false);
    }
  };

  // Generate next 30 days for date selection
  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 30; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Choose your service, select a date and time, and we'll take care of the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Service Selection */}
            <div className="card">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Step 1: Select Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors duration-200 ${
                      selectedService?.id === service.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                      {service.get('name')}
                    </h3>
                    <p className="text-secondary text-sm mb-3">
                      {service.get('description')}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent font-bold">
                        ${service.get('cost')}
                      </span>
                      <span className="text-secondary text-sm">
                        {service.get('durationMinutes')} min
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date Selection */}
            {selectedService && (
              <div className="card">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  Step 2: Select Date
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {generateDates().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors duration-200 ${
                        selectedDate && isSameDay(selectedDate, date)
                          ? 'border-accent bg-accent/5'
                          : 'border-gray-200 hover:border-accent/50'
                      }`}
                    >
                      <div className="text-sm font-medium text-primary">
                        {format(date, 'MMM')}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {format(date, 'd')}
                      </div>
                      <div className="text-xs text-secondary">
                        {format(date, 'EEE')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {selectedDate && (
              <div className="card">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  Step 3: Select Time
                </h2>
                {availableSlots.length === 0 ? (
                  <p className="text-secondary text-center py-8">
                    No available slots for this date. Please select another date.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors duration-200 ${
                          selectedTime === time
                            ? 'border-accent bg-accent/5'
                            : 'border-gray-200 hover:border-accent/50'
                        }`}
                      >
                        <div className="text-sm font-medium text-primary">
                          {time}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Booking Summary
              </h2>

              {selectedService && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-primary">{selectedService.get('name')}</p>
                      <p className="text-sm text-secondary">{selectedService.get('description')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-primary">{selectedService.get('durationMinutes')} minutes</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-bold text-accent">${selectedService.get('cost')}</span>
                  </div>

                  {selectedDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-primary">
                        {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                      </span>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="text-primary">{selectedTime}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedService || !selectedDate || !selectedTime || booking}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {booking ? 'Booking...' : 'Book Appointment'}
              </button>

              {!user && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Please sign in to book an appointment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
