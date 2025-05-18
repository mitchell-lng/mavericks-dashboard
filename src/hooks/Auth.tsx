import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext<{
  user: any; // Replace `any` with a more specific type if available
  token: any; // Replace `any` with a more specific type if available
  login: (userData: any, tokenData: any) => void; // Replace `any` with specific types
  logout: () => void;
} | null>(null);

interface LoginData {
    userData: any; // Replace `any` with a more specific type if available
    tokenData: any; // Replace `any` with a more specific type if available
}

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();



  const login = (userData: LoginData["userData"], tokenData: LoginData["tokenData"]) => {
    setUser(userData);
    setToken(tokenData);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};