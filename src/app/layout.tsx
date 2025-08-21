"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { FirebaseProvider } from '@/components/firebase-provider';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/splash-screen';
import OfflineIndicator from '@/components/offline-indicator';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// This metadata is static and will be used for the base of all pages.
// export const metadata: Metadata = {
//   title: 'Ayush Canvas Hub',
//   description: 'Firebase-powered tools & storage',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSplashing, setIsSplashing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashing(false);
    }, 2500); // Splash screen duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>Ayush Canvas Hub</title>
        <meta name="description" content="Firebase-powered tools & storage" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <FirebaseProvider>
          <AuthProvider>
            {isSplashing ? <SplashScreen /> : children}
            <Toaster />
            <OfflineIndicator />
          </AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
