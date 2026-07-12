import { Response } from "express";

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: false, // Set to false for development over http://localhost
  sameSite: "lax" as const, // Changed from "strict" to "lax" for better development experience
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// 🍪 Only refresh token cookie
export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
) => {
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
};