
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
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <title>X Tec</title>
        <meta name="description" content="Firebase-powered tools & storage" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={cn(inter.variable, "font-body antialiased", "dark")}
        style={{
            backgroundImage: `url('https://files.catbox.moe/f0bfsr.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
        }}
      >
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
