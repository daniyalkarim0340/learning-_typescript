import apiClient from './apiClient';
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/register', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/login', data);
    
    // If your backend returns a token, you can save it to localStorage here
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/refresh-token');
    return response.data;
  },

  /**
   * Logout user and clear local data
   */
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>('/logout');
    localStorage.removeItem('token'); // Clean up the token
    return response.data;
  }
};