import { loginApi, type UserInfo } from "../services/auth.service";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  user: UserInfo | null;
  login: (credentials: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as UserInfo);
    }
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await loginApi(credentials);
      if ("access_token" in result && result.access_token) {
        localStorage.setItem("user", JSON.stringify(result.user_info));
        localStorage.setItem("access_token", result.access_token);
        setUser(result.user_info);
        return true;
      } else if ("error" in result) {
        // Optionally handle error message here
        return false;
      }
      return false;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
