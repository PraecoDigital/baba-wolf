# Black Sheep Barbershop Web Application

A modern, responsive web application for a barbershop built with React, Vite, and Back4App (Parse) backend.

## Features

- **User Authentication**: Registration, login, and profile management
- **Service Management**: Admin can add, edit, and delete services
- **Appointment Booking**: Customers can book appointments with calendar selection
- **Admin Dashboard**: Comprehensive admin panel for managing services and viewing data
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design following the visual style guide

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Back4App (Parse) for database and authentication
- **Routing**: React Router DOM
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Back4App account
- Stripe account (for payments - optional)

## Back4App Setup

To configure the database, you'll need the following information from your Back4App dashboard:

### Required Back4App Information:

1. **Application ID**: Your app's unique identifier
2. **REST API Key**: For server-side requests
3. **JavaScript Key**: For client-side requests
4. **Server URL**: Usually `https://parseapi.back4app.com`

### Database Schema

The application uses the following Parse classes (tables):

#### User (extends Parse.User)
- `fullName` (String)
- `phoneNumber` (String, optional)
- `isAdmin` (Boolean, default: false)

#### Service
- `name` (String, required)
- `description` (String, required)
- `cost` (Number, required)
- `durationMinutes` (Number, required)

#### Appointment
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `appointmentStartTime` (Date, required)
- `status` (String: 'confirmed', 'completed', 'cancelled')

#### Subscription
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `startDate` (Date, required)
- `endDate` (Date, required)
- `stripeSubscriptionId` (String, optional)
- `status` (String: 'active', 'cancelled', 'expired')

#### Rating
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `appointment` (Pointer to Appointment, required)
- `ratingValue` (Number, 1-5, required)
- `reviewText` (String, optional)

## Installation

1. **Clone the repository**:
   ```bash
   cd /Users/jmottley/PraecoDigital/Projects/BlkShp/barber-salon-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_BACK4APP_APP_ID=your_app_id_here
   VITE_BACK4APP_REST_API_KEY=your_rest_api_key_here
   VITE_BACK4APP_JAVASCRIPT_KEY=your_javascript_key_here
   VITE_BACK4APP_SERVER_URL=https://parseapi.back4app.com
   VITE_ADMIN_EMAIL=admin@barbersalon.com
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   ```

4. **Set up Back4App database**:
   - Create a new app in your Back4App dashboard
   - Create the required classes (User, Service, Appointment, Subscription, Rating)
   - Configure the schema as described above
   - Set up Row Level Security (RLS) policies if needed

5. **Create admin user**:
   - Register a user account through the application
   - In Back4App dashboard, find the user and set `isAdmin` to `true`

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## Configuration

### Back4App Configuration

Update the configuration in `src/config/back4app.js` with your actual Back4App credentials:

```javascript
export const BACK4APP_CONFIG = {
  APP_ID: 'your_actual_app_id',
  REST_API_KEY: 'your_actual_rest_api_key',
  JAVASCRIPT_KEY: 'your_actual_javascript_key',
  SERVER_URL: 'https://parseapi.back4app.com',
};
```

### Admin Configuration

Set the admin email in the configuration:

```javascript
export const ADMIN_CONFIG = {
  ADMIN_EMAIL: 'admin@barbersalon.com',
};
```

## Usage

### For Customers:
1. Register an account or sign in
2. Browse services on the Services page
3. Book appointments through the Booking page
4. View appointment history in the Profile page
5. Leave reviews after completed appointments

### For Admins:
1. Sign in with an admin account
2. Access the Admin Dashboard
3. Manage services (add, edit, delete)
4. View recent appointments and customer reviews
5. Monitor business metrics

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   └── ProtectedRoute.jsx # Route protection component
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── lib/               # Utility libraries
│   └── parse.js       # Parse/Back4App configuration and models
├── pages/             # Page components
│   ├── HomePage.jsx   # Landing page
│   ├── ServicesPage.jsx # Services listing
│   ├── ContactPage.jsx # Contact information
│   ├── LoginPage.jsx  # User login
│   ├── RegisterPage.jsx # User registration
│   ├── ProfilePage.jsx # User profile and appointments
│   ├── BookingPage.jsx # Appointment booking
│   └── AdminDashboard.jsx # Admin management panel
├── config/            # Configuration files
│   └── back4app.js    # Back4App configuration
└── App.jsx            # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The application can be deployed to platforms like:
- Vercel (recommended for React apps)
- Netlify
- AWS Amplify
- Any static hosting service

Make sure to:
1. Build the project: `npm run build`
2. Configure environment variables in your hosting platform
3. Update Back4App CORS settings to allow your domain

## Future Enhancements

- Payment integration with Stripe
- Email notifications for appointments
- SMS reminders
- Advanced calendar management
- Subscription management system
- Mobile app development

## Support

For issues or questions:
1. Check the Back4App documentation
2. Review the Parse JavaScript SDK documentation
3. Check the React and Tailwind CSS documentation

## License

This project is proprietary software for Black Sheep Barbershop.