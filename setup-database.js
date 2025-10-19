// Database Setup Script for Black Sheep Barbershop
// This script will help you set up the database classes in Back4App

const BACK4APP_CONFIG = {
  APP_ID: 'fMlmz2s4JRoXP48g1zpFC9ubHImoU7psGVCz803O',
  REST_API_KEY: 'g5bIkLjlvuXhFn6N2fVch4f6MMUvfXokiDtBykB7',
  JAVASCRIPT_KEY: 'tYKSsygRfSvs8exN3Ii8N68LyQ7y8fxHNAGvWcUd',
  SERVER_URL: 'https://parseapi.back4app.com',
};

console.log('🚀 Black Sheep Barbershop Database Setup');
console.log('==========================================');
console.log('');
console.log('Your Back4App credentials:');
console.log(`Application ID: ${BACK4APP_CONFIG.APP_ID}`);
console.log(`REST API Key: ${BACK4APP_CONFIG.REST_API_KEY}`);
console.log(`JavaScript Key: ${BACK4APP_CONFIG.JAVASCRIPT_KEY}`);
console.log(`Server URL: ${BACK4APP_CONFIG.SERVER_URL}`);
console.log('');
console.log('📋 Next Steps:');
console.log('');
console.log('1. Go to your Back4App dashboard: https://www.back4app.com/dashboard');
console.log('');
console.log('2. Create the following database classes:');
console.log('');
console.log('   📊 SERVICE CLASS:');
console.log('   - Class Name: Service');
console.log('   - Fields:');
console.log('     • name (String, required)');
console.log('     • description (String, required)');
console.log('     • cost (Number, required)');
console.log('     • durationMinutes (Number, required)');
console.log('');
console.log('   📅 APPOINTMENT CLASS:');
console.log('   - Class Name: Appointment');
console.log('   - Fields:');
console.log('     • user (Pointer to User, required)');
console.log('     • service (Pointer to Service, required)');
console.log('     • appointmentStartTime (Date, required)');
console.log('     • status (String, required) - Default: "confirmed"');
console.log('');
console.log('   💳 SUBSCRIPTION CLASS:');
console.log('   - Class Name: Subscription');
console.log('   - Fields:');
console.log('     • user (Pointer to User, required)');
console.log('     • service (Pointer to Service, required)');
console.log('     • startDate (Date, required)');
console.log('     • endDate (Date, required)');
console.log('     • stripeSubscriptionId (String, optional)');
console.log('     • status (String, required) - Default: "active"');
console.log('');
console.log('   ⭐ RATING CLASS:');
console.log('   - Class Name: Rating');
console.log('   - Fields:');
console.log('     • user (Pointer to User, required)');
console.log('     • service (Pointer to Service, required)');
console.log('     • appointment (Pointer to Appointment, required)');
console.log('     • ratingValue (Number, required) - Min: 1, Max: 5');
console.log('     • reviewText (String, optional)');
console.log('');
console.log('   👤 USER CLASS (extend Parse.User):');
console.log('   - Add custom fields to existing User class:');
console.log('     • fullName (String, required)');
console.log('     • phoneNumber (String, optional)');
console.log('     • isAdmin (Boolean, default: false)');
console.log('');
console.log('3. Add sample services:');
console.log('');
console.log('   💇 Men\'s Haircut:');
console.log('   - Name: "Men\'s Haircut"');
console.log('   - Description: "Professional haircut tailored to your style and face shape"');
console.log('   - Cost: 25');
console.log('   - Duration: 30');
console.log('');
console.log('   🧔 Beard Trim & Style:');
console.log('   - Name: "Beard Trim & Style"');
console.log('   - Description: "Precision beard trimming and styling for a polished look"');
console.log('   - Cost: 20');
console.log('   - Duration: 25');
console.log('');
console.log('   🎯 Complete Package:');
console.log('   - Name: "Complete Package"');
console.log('   - Description: "Haircut, beard trim, and styling for the ultimate grooming experience"');
console.log('   - Cost: 40');
console.log('   - Duration: 45');
console.log('');
console.log('4. Create admin user:');
console.log('   - Register a user through the app');
console.log('   - Go to Back4App dashboard → Database → User class');
console.log('   - Find your user and set isAdmin to true');
console.log('');
console.log('5. Test the application:');
console.log('   - Open http://localhost:5173 in your browser');
console.log('   - Register and test the booking system');
console.log('   - Sign in with admin account and test admin dashboard');
console.log('');
console.log('✅ Your application will be ready to use!');
console.log('');
console.log('📞 Need help? Check the DATABASE_SETUP.md file for detailed instructions.');

