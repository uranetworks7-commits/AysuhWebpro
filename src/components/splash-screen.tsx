
"use client";

import LoadingSpinner from "./loading-spinner";

export default function SplashScreen() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <LoadingSpinner />
    </div>
  );
}
