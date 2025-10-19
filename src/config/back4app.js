// Back4App Configuration
export const BACK4APP_CONFIG = {
  // Your Back4App Application ID
  APP_ID: import.meta.env.VITE_BACK4APP_APP_ID || 'fMlmz2s4JRoXP48g1zpFC9ubHImoU7psGVCz803O',
  
  // Your Back4App REST API Key
  REST_API_KEY: import.meta.env.VITE_BACK4APP_REST_API_KEY || 'g5bIkLjlvuXhFn6N2fVch4f6MMUvfXokiDtBykB7',
  
  // Your Back4App JavaScript Key
  JAVASCRIPT_KEY: import.meta.env.VITE_BACK4APP_JAVASCRIPT_KEY || 'tYKSsygRfSvs8exN3Ii8N68LyQ7y8fxHNAGvWcUd',
  
  // Back4App Server URL
  SERVER_URL: import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com',
};

// Admin Configuration
export const ADMIN_CONFIG = {
  ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL || 'admin@barbersalon.com',
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key_here',
};
