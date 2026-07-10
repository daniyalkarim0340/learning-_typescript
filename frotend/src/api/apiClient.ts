// ✅ CORRECT: Explicitly marking it as a type import
import axios from "axios";
import type { AxiosInstance } from "axios";

// Alternatively, you can do it on a single line like this:
// import axios, { type AxiosInstance } from "axios";
// Fallback to localhost if the environment variable isn't set yet
const API_BASE_URL = 'http://localhost:7000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export it so other service files can use it
export default apiClient;