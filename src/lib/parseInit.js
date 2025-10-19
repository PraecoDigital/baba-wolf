// Parse.js initialization file
import Parse from 'parse';
import { BACK4APP_CONFIG } from '../config/back4app.js';

// Initialize Parse
Parse.initialize(BACK4APP_CONFIG.APP_ID, BACK4APP_CONFIG.JAVASCRIPT_KEY);
Parse.serverURL = BACK4APP_CONFIG.SERVER_URL;

// Set REST API Key for server requests
Parse.masterKey = BACK4APP_CONFIG.REST_API_KEY;

export default Parse;
