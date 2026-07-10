import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { AuthContextType } from "../api/types.js";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used strictly within an AuthProvider wrapper");
  }
  
  return context;
};