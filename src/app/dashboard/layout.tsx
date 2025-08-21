import Header from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Ayush Hex Pro
      </footer>
    </div>
  );
}
