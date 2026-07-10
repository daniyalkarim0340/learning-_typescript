import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../api/types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used strictly within an AuthProvider wrapper");
  }
  
  return context;
};