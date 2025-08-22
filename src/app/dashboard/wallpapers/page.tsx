
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
  hint?: string;
}

const staticWallpapers: WallpaperItem[] = [
    { url: "https://placehold.co/1920x1080.png", name: "Misty Mountains", hint: "misty mountains" },
    { url: "https://placehold.co/1920x1080.png", name: "Vibrant Abstract", hint: "vibrant abstract" },
    { url: "https://placehold.co/1920x1080.png", name: "Tokyo at Night", hint: "tokyo night" },
    { url: "https://placehold.co/1920x1080.png", name: "Clean Geometry", hint: "clean geometry" },
    { url: "https://placehold.co/1920x1080.png", name: "Cosmic Nebula", hint: "cosmic nebula" },
    { url: "https://placehold.co/1920x1080.png", name: "Crashing Waves", hint: "crashing waves" },
    { url: "https://placehold.co/1920x1080.png", name: "Lush Forest", hint: "lush forest" },
    { url: "https://i.ibb.co/6b0Cgzk/image.png", name: "Blue Technology Network", hint: "technology network" },
    { url: "https://i.postimg.cc/jjnNmHPB/fhdmacro1072.jpg", name: "Abstract Tech Sphere", hint: "abstract sphere" },
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

  const handleDownload = (e: React.MouseEvent, wallpaper: WallpaperItem) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the CardContent
    fetch(wallpaper.url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${wallpaper.name.replace(/ /g, "_")}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href); // Clean up
            toast({ title: "Download Started", description: `Downloading ${wallpaper.name}` });
        })
        .catch(error => {
            console.error("Download failed:", error);
            toast({ variant: "destructive", title: "Download Failed", description: "Could not download the image." });
        });
  }

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
              <Card 
                key={wallpaper.name} 
                className="overflow-hidden group cursor-pointer"
                onClick={() => handleImageClick(wallpaper)}
              >
                <CardContent 
                    className="p-0 aspect-w-16 aspect-h-9 flex items-center justify-center bg-muted/30 relative"
                    data-ai-hint={wallpaper.hint}
                >
                    <Image
                        src={wallpaper.url}
                        alt={wallpaper.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                    />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </CardContent>
                <CardFooter className="p-3 bg-muted/50 flex justify-between items-center">
                  <p className="text-sm font-medium truncate flex-1 pr-2">{wallpaper.name}</p>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={(e) => handleDownload(e, wallpaper)}
                  >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
