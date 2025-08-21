
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import LoadingSpinner from "@/components/loading-spinner";
import { Download, Image as ImageIcon, Wallpaper } from "lucide-react";

interface WallpaperItem {
  url: string;
  name: string;
}

const staticWallpapers: WallpaperItem[] = [
    { url: "https://placehold.co/1920x1080.png", name: "Misty Mountains" },
    { url: "https://placehold.co/1920x1080.png", name: "Vibrant Abstract" },
    { url: "https://placehold.co/1920x1080.png", name: "Tokyo at Night" },
    { url: "https://placehold.co/1920x1080.png", name: "Clean Geometry" },
    { url: "https://placehold.co/1920x1080.png", name: "Cosmic Nebula" },
    { url: "https://placehold.co/1920x1080.png", name: "Crashing Waves" },
    { url: "https://placehold.co/1920x1080.png", name: "Lush Forest" },
    { url: "https://i.ibb.co/6b0Cgzk/image.png", name: "Blue Technology Network" },
];


export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState<WallpaperItem[]>([]);
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

  const handleImageClick = (wallpaper: WallpaperItem) => {
    const imageUrl = wallpaper.url;
    toast({
      title: "Image URL",
      description: imageUrl,
    });
    window.open(imageUrl, "_blank");
  };

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
          {wallpapers.map((wallpaper) => {
            const imageUrl = wallpaper.url;
            return (
              <Card key={wallpaper.name} className="overflow-hidden group">
                <CardContent 
                    className="p-0 aspect-w-16 aspect-h-9 flex items-center justify-center bg-muted/30 cursor-pointer"
                    onClick={() => handleImageClick(wallpaper)}>
                    <Wallpaper className="h-16 w-16 text-muted-foreground transition-transform group-hover:scale-110" />
                </CardContent>
                <CardFooter className="p-3 bg-muted/50 flex justify-between items-center">
                  <p className="text-sm font-medium truncate flex-1 pr-2">{wallpaper.name}</p>
                  <Button asChild size="sm" variant="secondary">
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" download={wallpaper.name}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
