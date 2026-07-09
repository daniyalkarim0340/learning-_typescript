import axios, { AxiosInstance } from 'axios';

// Fallback to localhost if the environment variable isn't set yet
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export it so other service files can use it
export default apiClient;