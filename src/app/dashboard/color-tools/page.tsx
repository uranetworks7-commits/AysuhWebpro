"use client";

import PaintCanvas from "@/components/paint-canvas";
import { Palette } from "lucide-react";

export default function ColorToolsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Palette className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Color Tools</h1>
          <p className="text-muted-foreground">Let your creativity flow. Download your art!</p>
        </div>
      </div>
      <PaintCanvas />
    </div>
  );
}
