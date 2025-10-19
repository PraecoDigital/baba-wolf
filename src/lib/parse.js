import Parse from 'parse';
import { BACK4APP_CONFIG } from '../config/back4app.js';

// Initialize Parse
Parse.initialize(BACK4APP_CONFIG.APP_ID, BACK4APP_CONFIG.JAVASCRIPT_KEY);
Parse.serverURL = BACK4APP_CONFIG.SERVER_URL;

// Set REST API Key for server requests
Parse.masterKey = BACK4APP_CONFIG.REST_API_KEY;

// Export Parse as default and named export
export default Parse;
export { Parse };

// Database Schema Classes
export class User extends Parse.Object {
  constructor() {
    super('User');
  }
  
  get email() {
    return this.get('email');
  }
  
  set email(value) {
    this.set('email', value);
  }
  
  get fullName() {
    return this.get('fullName');
  }
  
  set fullName(value) {
    this.set('fullName', value);
  }
  
  get phoneNumber() {
    return this.get('phoneNumber');
  }
  
  set phoneNumber(value) {
    this.set('phoneNumber', value);
  }
  
  get isAdmin() {
    return this.get('isAdmin') || false;
  }
  
  set isAdmin(value) {
    this.set('isAdmin', value);
  }
}

export class Service extends Parse.Object {
  constructor() {
    super('Service');
  }
  
  get name() {
    return this.get('name');
  }
  
  set name(value) {
    this.set('name', value);
  }
  
  get description() {
    return this.get('description');
  }
  
  set description(value) {
    this.set('description', value);
  }
  
  get cost() {
    return this.get('cost');
  }
  
  set cost(value) {
    this.set('cost', value);
  }
  
  get durationMinutes() {
    return this.get('durationMinutes');
  }
  
  set durationMinutes(value) {
    this.set('durationMinutes', value);
  }
}

export class Appointment extends Parse.Object {
  constructor() {
    super('Appointment');
  }
  
  get user() {
    return this.get('user');
  }
  
  set user(value) {
    this.set('user', value);
  }
  
  get service() {
    return this.get('service');
  }
  
  set service(value) {
    this.set('service', value);
  }
  
  get appointmentStartTime() {
    return this.get('appointmentStartTime');
  }
  
  set appointmentStartTime(value) {
    this.set('appointmentStartTime', value);
  }
  
  get status() {
    return this.get('status');
  }
  
  set status(value) {
    this.set('status', value);
  }
}

export class Subscription extends Parse.Object {
  constructor() {
    super('Subscription');
  }
  
  get user() {
    return this.get('user');
  }
  
  set user(value) {
    this.set('user', value);
  }
  
  get service() {
    return this.get('service');
  }
  
  set service(value) {
    this.set('service', value);
  }
  
  get startDate() {
    return this.get('startDate');
  }
  
  set startDate(value) {
    this.set('startDate', value);
  }
  
  get endDate() {
    return this.get('endDate');
  }
  
  set endDate(value) {
    this.set('endDate', value);
  }
  
  get stripeSubscriptionId() {
    return this.get('stripeSubscriptionId');
  }
  
  set stripeSubscriptionId(value) {
    this.set('stripeSubscriptionId', value);
  }
  
  get status() {
    return this.get('status');
  }
  
  set status(value) {
    this.set('status', value);
  }
}

export class Rating extends Parse.Object {
  constructor() {
    super('Rating');
  }
  
  get user() {
    return this.get('user');
  }
  
  set user(value) {
    this.set('user', value);
  }
  
  get service() {
    return this.get('service');
  }
  
  set service(value) {
    this.set('service', value);
  }
  
  get appointment() {
    return this.get('appointment');
  }
  
  set appointment(value) {
    this.set('appointment', value);
  }
  
  get ratingValue() {
    return this.get('ratingValue');
  }
  
  set ratingValue(value) {
    this.set('ratingValue', value);
  }
  
  get reviewText() {
    return this.get('reviewText');
  }
  
  set reviewText(value) {
    this.set('reviewText', value);
  }
}
