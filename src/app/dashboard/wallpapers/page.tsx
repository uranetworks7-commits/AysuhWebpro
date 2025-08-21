
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import LoadingSpinner from "@/components/loading-spinner";
import { Download, Image as ImageIcon } from "lucide-react";

interface Wallpaper {
  url: string;
  name: string;
  hint: string;
}

const staticWallpapers: Wallpaper[] = [
    { url: "https://placehold.co/400x225.png", name: "Misty Mountains", hint: "nature landscape" },
    { url: "https://placehold.co/400x225.png", name: "Vibrant Abstract", hint: "abstract art" },
    { url: "https://placehold.co/400x225.png", name: "Tokyo at Night", hint: "cityscape night" },
    { url: "https://placehold.co/400x225.png", name: "Clean Geometry", hint: "minimalist design" },
    { url: "https://placehold.co/400x225.png", name: "Cosmic Nebula", hint: "space galaxy" },
    { url: "https://placehold.co/400x225.png", name: "Crashing Waves", hint: "ocean waves" },
    { url: "https://placehold.co/400x225.png", name: "Lush Forest", hint: "forest trees" },
    { url: "https://placehold.co/400x225.png", name: "Vintage Car", hint: "classic car" },
];


export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    const timer = setTimeout(() => {
        setWallpapers(staticWallpapers);
        setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Wallpapers & Files</h1>
          <p className="text-muted-foreground">Browse and download from our collection.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><LoadingSpinner /></div>
      ) : wallpapers.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          <p>No wallpapers or files are available at the moment.</p>
          <p className="text-sm">Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wallpapers.map((wallpaper) => (
            <Card key={wallpaper.name} className="overflow-hidden group">
              <CardContent className="p-0 aspect-w-16 aspect-h-9">
                <Image
                  src={wallpaper.url}
                  alt={wallpaper.name}
                  width={400}
                  height={225}
                  data-ai-hint={wallpaper.hint}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
              <CardFooter className="p-3 bg-muted/50 flex justify-between items-center">
                <p className="text-sm font-medium truncate flex-1 pr-2">{wallpaper.name}</p>
                <Button asChild size="sm" variant="secondary">
                  <a href={wallpaper.url} target="_blank" rel="noopener noreferrer" download={wallpaper.name}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
