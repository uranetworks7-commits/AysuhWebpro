
"use client";

import PaintCanvas from "@/components/paint-canvas";
import { Palette, Share2 } from "lucide-react";

export default function ColorToolsPage() {
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
