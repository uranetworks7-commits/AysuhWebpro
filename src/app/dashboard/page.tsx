
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Info, Palette, Youtube, Keyboard, FileText, Barcode, QrCode, Share2, Atom, Wallet, LineChart, Sparkles, HeartPulse, ImageIcon } from 'lucide-react';

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
              <CardTitle>Typing Test</CardTitle>
              <CardDescription>Check your typing skill.</CardDescription>
            </div>
            <Keyboard className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Test your typing speed and accuracy with this interactive tool.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/typing-test">Open Typing Test</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Document Maker</CardTitle>
              <CardDescription>Build resumes & more.</CardDescription>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Create and download professional documents with our easy-to-use tool.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/resume-maker">Open Document Maker</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>My Notes</CardTitle>
              <CardDescription>Create & manage notes.</CardDescription>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>A simple tool to create, manage, and delete your personal notes.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/notes">Open Notes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Diagram & Mind Map</CardTitle>
              <CardDescription>Unleash your creativity.</CardDescription>
            </div>
            <Share2 className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Use the canvas to draw diagrams, sketch, and create beautiful artwork.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/color-tools">Open Diagram Tool</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Periodic Table</CardTitle>
              <CardDescription>Explore the elements.</CardDescription>
            </div>
            <Atom className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>An interactive periodic table with details on every element.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/periodic-table">Open Periodic Table</Link>
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
              <CardTitle>Code Generators</CardTitle>
              <CardDescription>Generate QR &amp; Barcodes.</CardDescription>
            </div>
            <QrCode className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Create a QR code or barcode from any text or URL and download it.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/code-generator">Open Generators</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Budget Planner</CardTitle>
              <CardDescription>Track income &amp; expenses.</CardDescription>
            </div>
            <Wallet className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>A simple tool to manage your personal budget and see a summary.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/budget-planner">Open Budget Planner</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Trading Simulator</CardTitle>
              <CardDescription>Practice trading.</CardDescription>
            </div>
            <LineChart className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Simulate buying and selling in a mock market environment.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/trading">Open Trading Sim</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Ayush AI</CardTitle>
              <CardDescription>Chat with an assistant.</CardDescription>
            </div>
            <Sparkles className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Interact with a custom AI assistant built by Ayush.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/ayush-ai">Open Ayush AI</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Wallpapers</CardTitle>
              <CardDescription>Browse wallpapers.</CardDescription>
            </div>
            <ImageIcon className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p>Explore and download from a collection of beautiful wallpapers.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/wallpapers">Browse Wallpapers</Link>
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
