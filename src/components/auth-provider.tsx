
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
  isSubscribed: boolean;
  login: (data: LoginData) => Promise<User>;
  signup: (data: SignUpData) => Promise<User>;
  logout: () => Promise<void>;
  subscribe: (code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Check for subscription status
        const subStatus = localStorage.getItem(`subscription-${parsedUser.uid}`);
        setIsSubscribed(subStatus === 'true');
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
      // Also clear subscription status if user data is corrupt
      if(user) localStorage.removeItem(`subscription-${user.uid}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email }: LoginData): Promise<User> => {
    const mockUser = { uid: 'mock-user-id', email: email, displayName: email.split('@')[0] };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    const subStatus = localStorage.getItem(`subscription-${mockUser.uid}`);
    setIsSubscribed(subStatus === 'true');
    return mockUser;
  };

  const signup = async ({ email, username }: SignUpData): Promise<User> => {
    const mockUser = { uid: 'mock-user-id', email: email, displayName: username };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsSubscribed(false); // New users are not subscribed
    return mockUser;
  };

  const logout = async () => {
    const userId = user?.uid;
    if(userId) {
       // Optional: clear subscription on logout, or keep it for next login
       // localStorage.removeItem(`subscription-${userId}`);
    }
    localStorage.removeItem("user");
    setUser(null);
    setIsSubscribed(false);
  };
  
  const subscribe = async (code: string): Promise<void> => {
      if (!user) {
          throw new Error("You must be logged in to subscribe.");
      }
      if (code === "Ayushvip.in") {
          localStorage.setItem(`subscription-${user.uid}`, 'true');
          setIsSubscribed(true);
          return;
      }
      throw new Error("Invalid subscription code.");
  }


  const value = {
    user,
    loading,
    isSubscribed,
    login,
    signup,
    logout,
    subscribe,
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
