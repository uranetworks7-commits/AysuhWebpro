import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            Ayush
          </Link>
          <nav className="flex items-center gap-4">
             <Button asChild variant="ghost">
                <Link href="/about">About</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Welcome to Ayush Canvas Hub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your creative space for amazing projects. 
                This is a static placeholder. No backend services are connected.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Ayush Hex Pro - Static Version
      </footer>
    </div>
  );
}
