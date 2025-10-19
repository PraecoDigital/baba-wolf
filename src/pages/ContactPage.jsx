import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: 'Address',
      details: [
        '123 Main Street',
        'Downtown District',
        'Your City, State 12345'
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-accent" />,
      title: 'Phone',
      details: ['(555) 123-4567']
    },
    {
      icon: <Mail className="w-6 h-6 text-accent" />,
      title: 'Email',
      details: ['info@blacksheepbarbershop.com']
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: 'Hours',
      details: [
        'Monday - Friday: 9:00 AM - 7:00 PM',
        'Saturday: 8:00 AM - 6:00 PM',
        'Sunday: 10:00 AM - 4:00 PM'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us for appointments, 
            questions, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-8">
              Get In Touch
            </h2>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-secondary">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-12">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                Find Us
              </h3>
              <div className="bg-secondary/20 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-secondary">Interactive map would be displayed here</p>
                  <p className="text-sm text-secondary mt-2">
                    (Google Maps integration can be added)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-8">
              Send us a Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="input-field"
                >
                  <option value="">Select a subject</option>
                  <option value="appointment">Appointment Inquiry</option>
                  <option value="service">Service Question</option>
                  <option value="subscription">Subscription Information</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Why Choose Black Sheep?
          </h2>
          <p className="text-lg text-secondary max-w-4xl mx-auto mb-8">
            With years of experience and a commitment to excellence, we provide 
            the highest quality grooming services in a comfortable, professional environment. 
            Our skilled barbers are dedicated to making sure you leave looking and feeling your best.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Professional Service
              </h3>
              <p className="text-secondary">
                Expert barbers with years of experience and ongoing training.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Quality Products
              </h3>
              <p className="text-secondary">
                We use only the finest grooming products and tools.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-secondary">
                Your satisfaction is our top priority. We guarantee our work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
