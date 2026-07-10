import React, { createContext, useState, useLayoutEffect, useEffect, useCallback, ReactNode } from "react";
import apiClient from "../api/apiClient.js";
import { authService } from "../api/authService.js";
import { AuthContextType, IUser, AuthResponse } from "../api/types.js";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Memory variable to bypass interceptor state closure trapping
let currentToken: string | null = null;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = Boolean(accessToken);

  const setAccessToken = useCallback((token: string | null) => {
    currentToken = token;
    setAccessTokenState(token);
  }, []);

  // ✅ useLayoutEffect registers interceptors synchronously before children render/mount
  useLayoutEffect(() => {
    // Request Interceptor
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (currentToken && config.headers) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = apiClient.interceptors.response.use(
      (res) => res,
      async (error) => {
        const failedReq = error.config;

        if (
          error.response?.status === 401 &&
          !failedReq._retry &&
          !failedReq.url?.includes("refresh-token")
        ) {
          failedReq._retry = true;

          try {
            const refreshRes = await authService.refreshToken();
            const { accessToken: newToken, user: newUser } = refreshRes.data as AuthResponse;

            setAccessToken(newToken);
            setUser(newUser);

            if (failedReq.headers) {
              failedReq.headers.Authorization = `Bearer ${newToken}`;
            }
            return apiClient(failedReq);
          } catch (refreshError) {
            setAccessToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Synchronous teardown logic if dependencies change
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [setAccessToken]);

  // Session restoration on page refresh
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await authService.refreshToken();
        const { accessToken: newToken, user: newUser } = res.data as AuthResponse;
        setUser(newUser);
        setAccessToken(newToken);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [setAccessToken]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout execution error:", error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, [setAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        setAccessToken,
        setUser,
        loading,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};