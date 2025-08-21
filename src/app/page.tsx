
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Palette, Youtube, ShoppingCart, Info, FileText, Paintbrush, Image as ImageIcon } from 'lucide-react';

const features = [
  {
    title: "Trading Simulator",
    description: "Practice buying and selling in a simulated, real-time market environment.",
    icon: LineChart,
    href: "/dashboard/trading",
  },
  {
    title: "Color Tools",
    description: "Unleash your creativity with a canvas, various brushes, and color options.",
    icon: Palette,
    href: "/dashboard/color-tools",
  },
  {
    title: "Ayush Tube",
    description: "Explore a curated collection of videos on digital art and creativity.",
    icon: Youtube,
    href: "/dashboard/ayush-tube",
  },
    {
    title: "Ayush Store",
    description: "Browse a selection of the finest tools for your creative journey.",
    icon: ShoppingCart,
    href: "/dashboard/store",
  },
  {
    title: "About",
    description: "Learn more about the creator and the project.",
    icon: Info,
    href: "/dashboard/about",
  },
  {
    title: "Paint Tool",
    description: "A simple and fun paint tool to sketch your ideas.",
    icon: Paintbrush,
    href: "/dashboard/paint",
  },
  {
    title: "My Notes",
    description: "Create and manage your personal notes securely.",
    icon: FileText,
    href: "/dashboard/notes",
  },
  {
    title: "Wallpapers",
    description: "Browse and download beautiful wallpapers.",
    icon: ImageIcon,
    href: "/dashboard/wallpapers",
  },
];

export default function Home() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            Ayush Pro Web
          </Link>
          <nav className="flex items-center gap-4">
             <Button asChild variant="ghost">
                <Link href="/dashboard/about">About</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Welcome to Ayush Canvas Hub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your creative space for amazing projects. 
                Explore a suite of tools designed for creativity and fun.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowFeatures(!showFeatures)}>
                    {showFeatures ? "Hide Functions" : "View all Functions"}
                </Button>
            </div>
        </div>

        {showFeatures && (
            <div className="w-full max-w-5xl mt-12">
                <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex-row items-center gap-4">
                                <feature.icon className="h-10 w-10 text-primary" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                                <Button asChild className="mt-4" variant="secondary">
                                    <Link href={feature.href}>Check it out</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Ayush Pro Web
      </footer>
    </div>
  );
}
