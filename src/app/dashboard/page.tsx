"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush, Image, FileText } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore the tools and features available to you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Paint Tool</CardTitle>
              <CardDescription>Unleash your creativity.</CardDescription>
            </div>
            <Paintbrush className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>A simple but powerful canvas to draw, sketch, and paint. Save your masterpieces to the cloud.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/paint">Start Drawing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Wallpapers</CardTitle>
              <CardDescription>Browse and download files.</CardDescription>
            </div>
            <Image className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Explore a collection of high-quality wallpapers and files, ready for you to download and use.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/wallpapers">View Collection</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Notes</CardTitle>
              <CardDescription>Jot down your thoughts.</CardDescription>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Keep your ideas, to-do lists, and reminders organized and securely stored in one place.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/notes">Manage Notes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
