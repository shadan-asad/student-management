import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api; 