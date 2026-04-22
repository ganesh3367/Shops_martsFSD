import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5003/api',
  timeout: 15000,
});

// Attach Firebase ID token to every authenticated request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // token refresh failed — continue without header
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
