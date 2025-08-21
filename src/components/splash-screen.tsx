"use client";

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000); // Animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500"
         style={{ opacity: visible ? 1 : 0 }}>
      <style jsx>{`
        .fade-in-text {
          animation: fadeIn 2s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <h1 className="fade-in-text text-3xl font-bold text-primary md:text-5xl">
        Welcome to Ayush Server
      </h1>
    </div>
  );
}
