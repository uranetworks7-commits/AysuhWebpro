"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import LoadingSpinner from "@/components/loading-spinner";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <LoadingSpinner />
    </div>
  );
}
