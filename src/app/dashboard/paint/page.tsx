"use client";

import PaintCanvas from "@/components/paint-canvas";
import { Paintbrush } from "lucide-react";

export default function PaintPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Paintbrush className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Paint Tool</h1>
          <p className="text-muted-foreground">Let your creativity flow. Save your art!</p>
        </div>
      </div>
      <PaintCanvas />
    </div>
  );
}
