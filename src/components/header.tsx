
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Menu, X, Palette, ShoppingCart, LineChart, MessageSquarePlus, Youtube, Sparkles, Keyboard, FileText, QrCode, Share2, Atom, Wallet, HeartPulse, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/typing-test", label: "Typing Test", icon: Keyboard },
  { href: "/dashboard/resume-maker", label: "Document Maker", icon: FileText },
  { href: "/dashboard/notes", label: "My Notes", icon: FileText },
  { href: "/dashboard/budget-planner", label: "Budget Planner", icon: Wallet },
  { href: "/dashboard/color-tools", label: "Diagram & Mind Map", icon: Share2 },
  { href: "/dashboard/periodic-table", label: "Periodic Table", icon: Atom },
  { href: "/dashboard/code-generator", label: "Code Generators", icon: QrCode },
  { href: "/dashboard/ayush-tube", label: "Ayush Tube", icon: Youtube },
  { href: "/dashboard/store", label: "Store", icon: ShoppingCart },
  { href: "/dashboard/trading", label: "Trading", icon: LineChart },
  { href: "/dashboard/ayush-ai", label: "Ayush AI", icon: Sparkles },
  { href: "/dashboard/wallpapers", label: "Wallpapers", icon: ImageIcon },
  { href: "/dashboard/about", label: "About", icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleFeedback = () => {
    toast({ title: "Feedback", description: "Thank you for your feedback!" });
  };

  const NavItems = () => (
    <>
      {navLinks.sort((a,b) => a.label > b.label ? 1: -1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === link.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-primary">
          Ayush Pro Web
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {/* This part can be populated with a few important links if needed */}
        </nav>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={handleFeedback}>
             <MessageSquarePlus className="mr-2 h-4 w-4" />
             Feedback
           </Button>
           <Button variant="outline" asChild>
                <Link href="/">Exit Dashboard</Link>
            </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
                <SheetHeader className="flex-row items-center justify-between p-4 border-b">
                     <SheetTitle>
                        <Link href="/dashboard" className="text-lg font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            Ayush Pro Web
                        </Link>
                     </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                </SheetHeader>
              <nav className="flex-grow flex flex-col gap-2 p-4 overflow-y-auto">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
