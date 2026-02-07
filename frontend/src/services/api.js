import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 
                    error.response?.data?.errors?.[0]?.msg ||
                    error.message ||
                    'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API functions
export const fetchTeam = () => api.get('/team');
export const fetchEvents = (upcoming = false) => api.get(`/events?upcoming=${upcoming}`);
export const fetchEvent = (id) => api.get(`/events/${id}`);
export const fetchAnnouncements = (limit = 10) => api.get(`/announcements?limit=${limit}`);
export const fetchGallery = (category = 'all') => api.get(`/gallery?category=${category}`);
export const fetchResources = (category = 'all') => api.get(`/resources?category=${category}`);
export const fetchStats = () => api.get('/stats');

export const submitRegistration = (data) => api.post('/register', data);
export const submitContact = (data) => api.post('/contact', data);
export const registerForEvent = (eventId, data) => api.post(`/events/${eventId}/register`, data);

export default api;
