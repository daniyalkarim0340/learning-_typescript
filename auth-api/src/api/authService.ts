import apiClient from './apiClient';
import { IUser, RegisterRequest, LoginRequest, AuthResponse } from './types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    // If your backend returns a token, you can save it to localStorage here
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Get the current authenticated user profile
   */
  getProfile: async (): Promise<{ success: boolean; user: IUser }> => {
    const response = await apiClient.get<{ success: boolean; user: IUser }>('/auth/profile');
    return response.data;
  },

  /**
   * Logout user and clear local data
   */
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>('/auth/logout');
    localStorage.removeItem('token'); // Clean up the token
    return response.data;
  }
};