import axios from 'axios';

const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID;
const REST_API_KEY = import.meta.env.VITE_BACK4APP_REST_API_KEY;
const SERVER_URL = import.meta.env.VITE_BACK4APP_SERVER_URL?.replace(/\/$/, '') || 'https://parseapi.back4app.com';

const client = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'X-Parse-Application-Id': APP_ID,
    'X-Parse-REST-API-Key': REST_API_KEY,
    'X-Parse-Revocable-Session': '1',
    'Content-Type': 'application/json',
  },
});

export async function login({ username, password }) {
  // Parse REST login uses query params
  const response = await client.get('/login', {
    params: { username, password },
  });
  return response.data; // contains sessionToken and user fields
}

export async function signUp({ email, password, fullName, phoneNumber }) {
  const response = await client.post('/users', {
    username: email,
    email,
    password,
    fullName,
    phoneNumber,
    isAdmin: false,
  });
  return response.data; // may not include sessionToken; login after signup
}

export async function getCurrentUser(sessionToken) {
  const response = await client.get('/users/me', {
    headers: {
      'X-Parse-Session-Token': sessionToken,
    },
  });
  return response.data;
}

export async function logout(sessionToken) {
  // Parse doesn't invalidate via REST without master key; client-side logout = drop token
  return Promise.resolve({ ok: true });
}

export function setAuthSession({ sessionToken, user }) {
  localStorage.setItem('sessionToken', sessionToken || '');
  localStorage.setItem('authUser', JSON.stringify(user || {}));
}

export function clearAuthSession() {
  localStorage.removeItem('sessionToken');
  localStorage.removeItem('authUser');
}

export function readAuthSession() {
  const sessionToken = localStorage.getItem('sessionToken') || '';
  const raw = localStorage.getItem('authUser');
  let user = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch (_) {
    user = null;
  }
  return { sessionToken, user };
}


