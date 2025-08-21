"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import type { LoginData, SignUpData } from "@/lib/types";

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
  const [loading, setLoading] = useState(false); // Set to false as there's no auth check

  const login = async ({ email }: LoginData): Promise<User> => {
    // This is a mock login. In a real app, you'd validate.
    const mockUser = { uid: 'mock-user-id', email: email, displayName: email.split('@')[0] };
    setUser(mockUser);
    return mockUser;
  };

  const signup = async ({ email, username }: SignUpData): Promise<User> => {
     // This is a mock signup.
    const mockUser = { uid: 'mock-user-id', email: email, displayName: username };
    setUser(mockUser);
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
