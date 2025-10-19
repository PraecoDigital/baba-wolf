# Back4App Configuration Guide

## Required Information for Database Setup

To complete the setup of your Black Sheep Barbershop web application, you need to provide the following information from your Back4App account:

### 1. Back4App Application Credentials

Please provide these values from your Back4App dashboard:

- **Application ID**: `_________________`
- **REST API Key**: `_________________`
- **JavaScript Key**: `_________________`
- **Server URL**: `https://parseapi.back4app.com` (usually this default)

### 2. Admin Configuration

- **Admin Email**: `admin@barbersalon.com` (or your preferred admin email)

### 3. Stripe Configuration (Optional - for payments)

- **Stripe Publishable Key**: `_________________` (if you want to enable payments)

## How to Get Back4App Credentials

1. **Log in to Back4App**: Go to [back4app.com](https://back4app.com) and sign in
2. **Create a new app** (if you don't have one):
   - Click "Build new app"
   - Choose "Backend as a Service"
   - Enter app name: "Black Sheep Barbershop"
   - Select region closest to you
3. **Get your credentials**:
   - Go to your app dashboard
   - Click on "App Settings"
   - Go to "Security & Keys"
   - Copy the Application ID, REST API Key, and JavaScript Key

## Database Schema Setup

Once you have your Back4App app created, you need to set up the following database classes (tables):

### User Class (extends Parse.User)
- `fullName` (String)
- `phoneNumber` (String, optional)
- `isAdmin` (Boolean, default: false)

### Service Class
- `name` (String, required)
- `description` (String, required)
- `cost` (Number, required)
- `durationMinutes` (Number, required)

### Appointment Class
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `appointmentStartTime` (Date, required)
- `status` (String: 'confirmed', 'completed', 'cancelled')

### Subscription Class
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `startDate` (Date, required)
- `endDate` (Date, required)
- `stripeSubscriptionId` (String, optional)
- `status` (String: 'active', 'cancelled', 'expired')

### Rating Class
- `user` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `appointment` (Pointer to Appointment, required)
- `ratingValue` (Number, 1-5, required)
- `reviewText` (String, optional)

## Next Steps

1. **Provide the credentials** above
2. **Create the database classes** in your Back4App dashboard
3. **Create an admin user**:
   - Register through the app
   - In Back4App dashboard, find the user and set `isAdmin` to `true`
4. **Test the application** with the provided credentials

## Environment Variables

Once you have the credentials, create a `.env.local` file in the project root:

```env
VITE_BACK4APP_APP_ID=your_app_id_here
VITE_BACK4APP_REST_API_KEY=your_rest_api_key_here
VITE_BACK4APP_JAVASCRIPT_KEY=your_javascript_key_here
VITE_BACK4APP_SERVER_URL=https://parseapi.back4app.com
VITE_ADMIN_EMAIL=admin@barbersalon.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

## Support

If you need help with Back4App setup, you can:
1. Check the [Back4App Documentation](https://www.back4app.com/docs)
2. Contact Back4App support
3. Review the Parse JavaScript SDK documentation

The application is ready to run once you provide the Back4App credentials!
