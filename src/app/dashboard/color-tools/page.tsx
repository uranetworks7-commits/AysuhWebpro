
"use client";

import PaintCanvas from "@/components/paint-canvas";
import { Palette, Share2, Star } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ColorToolsPage() {
  const { isSubscribed } = useAuth();

  if (!isSubscribed) {
    return (
      <div className="flex justify-center items-center h-full">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full">
                <Star className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="mt-4 text-2xl">Premium Feature</CardTitle>
            <CardDescription>
              The Diagram & Mind Map tool is available for premium subscribers only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Unlock this feature and more by subscribing to Ayush Pro Web.
            </p>
            <Button asChild>
              <Link href="/dashboard/subscription">Go Premium</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Share2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Diagram & Mind Map</h1>
          <p className="text-muted-foreground">Let your creativity flow. Create diagrams and download your art!</p>
        </div>
      </div>
      <PaintCanvas />
    </div>
  );
}
