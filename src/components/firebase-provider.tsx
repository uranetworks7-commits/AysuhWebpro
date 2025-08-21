"use client";

// This provider is a pass-through as Firebase is not configured.
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
