import Header from "@/components/header";
import { Share2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="flex min-h-screen flex-col"
    >
      <div className="flex min-h-screen flex-col bg-background/90">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6">
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          X Tec
        </footer>
      </div>
    </div>
  );
}
