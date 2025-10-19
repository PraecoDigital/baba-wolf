# Database Setup Instructions

Your Back4App credentials have been configured in the application:
- **Application ID**: `fMlmz2s4JRoXP48g1zpFC9ubHImoU7psGVCz803O`
- **REST API Key**: `g5bIkLjlvuXhFn6N2fVch4f6MMUvfXokiDtBykB7`
- **JavaScript Key**: `tYKSsygRfSvs8exN3Ii8N68LyQ7y8fxHNAGvWcUd`

## Step 1: Create Database Classes in Back4App

Go to your Back4App dashboard and create the following classes:

### 1. Service Class
- **Class Name**: `Service`
- **Fields**:
  - `name` (String, required)
  - `description` (String, required)
  - `cost` (Number, required)
  - `durationMinutes` (Number, required)

### 2. Appointment Class
- **Class Name**: `Appointment`
- **Fields**:
  - `user` (Pointer to User, required)
  - `service` (Pointer to Service, required)
  - `appointmentStartTime` (Date, required)
  - `status` (String, required) - Default: "confirmed"

### 3. Subscription Class
- **Class Name**: `Subscription`
- **Fields**:
  - `user` (Pointer to User, required)
  - `service` (Pointer to Service, required)
  - `startDate` (Date, required)
  - `endDate` (Date, required)
  - `stripeSubscriptionId` (String, optional)
  - `status` (String, required) - Default: "active"

### 4. Rating Class
- **Class Name**: `Rating`
- **Fields**:
  - `user` (Pointer to User, required)
  - `service` (Pointer to Service, required)
  - `appointment` (Pointer to Appointment, required)
  - `ratingValue` (Number, required) - Min: 1, Max: 5
  - `reviewText` (String, optional)

## Step 2: Configure User Class

The User class extends Parse.User, so you need to add custom fields:
- `fullName` (String, required)
- `phoneNumber` (String, optional)
- `isAdmin` (Boolean, default: false)

## Step 3: Create Sample Services

After creating the Service class, add some sample services:

1. **Men's Haircut**
   - Name: "Men's Haircut"
   - Description: "Professional haircut tailored to your style and face shape"
   - Cost: 25
   - Duration: 30

2. **Beard Trim & Style**
   - Name: "Beard Trim & Style"
   - Description: "Precision beard trimming and styling for a polished look"
   - Cost: 20
   - Duration: 25

3. **Complete Package**
   - Name: "Complete Package"
   - Description: "Haircut, beard trim, and styling for the ultimate grooming experience"
   - Cost: 40
   - Duration: 45

## Step 4: Create Admin User

1. Start the application: `npm run dev`
2. Register a new user account
3. Go to Back4App dashboard → Database → User class
4. Find your registered user and edit the record
5. Set `isAdmin` to `true`

## Step 5: Test the Application

1. Open http://localhost:5173 in your browser
2. Register a new user account
3. Sign in and test the booking system
4. Sign in with the admin account and test the admin dashboard

## Troubleshooting

If you encounter any issues:

1. **CORS Errors**: Make sure your Back4App app allows requests from `http://localhost:5173`
2. **Authentication Issues**: Check that the User class has the correct custom fields
3. **Database Errors**: Verify all classes are created with the correct field types

## Next Steps

Once the database is set up:
1. Add more services through the admin dashboard
2. Test the complete booking flow
3. Set up Stripe for payments (optional)
4. Deploy to production

Your application is now ready to use! 🎉
