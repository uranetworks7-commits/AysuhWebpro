"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import type { LoginData, SignUpData } from "@/lib/types";
import LoadingSpinner from "./loading-spinner";

// Mock user type
export type User = {
    uid: string;
    email: string;
    displayName: string;
} | null;

export interface AuthContextType {
  user: User;
  loading: boolean;
  login: (data: LoginData) => Promise<User>;
  signup: (data: SignUpData) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      // If parsing fails, it's better to clear the stored user
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email }: LoginData): Promise<User> => {
    // This is a mock login. In a real app, you'd validate.
    const mockUser = { uid: 'mock-user-id', email: email, displayName: email.split('@')[0] };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signup = async ({ email, username }: SignUpData): Promise<User> => {
     // This is a mock signup.
    const mockUser = { uid: 'mock-user-id', email: email, displayName: username };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  if (loading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <LoadingSpinner />
          </div>
      )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
