import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (data) => api.post('/auth/signup', data),
};

// Public APIs
export const publicAPI = {
  getAllDoctors: () => api.get('/public/doctors'),
};

// Admin APIs
export const adminAPI = {
  getAllPatients: (page = 0, size = 10) =>
    api.get(`/admin/patients?page=${page}&size=${size}`),
  onboardDoctor: (data) => api.post('/admin/onBoardNewDoctor', data),
};

// Doctor APIs
export const doctorAPI = {
  getMyAppointments: () => api.get('/doctors/appointments'),
};

// Patient APIs
export const patientAPI = {
  createAppointment: (data) => api.post('/patients/appointments', data),
};

export default api;
