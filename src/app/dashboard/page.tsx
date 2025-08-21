import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Info, Palette, Youtube } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Welcome!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This is a static dashboard. Explore the available pages.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Home</CardTitle>
              <CardDescription>Main dashboard page.</CardDescription>
            </div>
            <Home className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>You are here. This is the main landing page of the dashboard.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Go Home</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Color Tools</CardTitle>
              <CardDescription>Unleash your creativity.</CardDescription>
            </div>
            <Palette className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Use the paint canvas to draw, sketch, and create beautiful artwork.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/color-tools">Open Color Tools</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Ayush Tube</CardTitle>
              <CardDescription>Watch creative videos.</CardDescription>
            </div>
            <Youtube className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Explore a curated collection of videos on digital art and creativity.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/ayush-tube">Open Ayush Tube</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>About</CardTitle>
              <CardDescription>Learn about this project.</CardDescription>
            </div>
            <Info className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Find out more about the Ayush Canvas Hub and its features.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/about">View About Page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
