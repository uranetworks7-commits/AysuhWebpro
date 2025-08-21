
"use client";

import { useState } from "react";
import { elements, type ElementData } from "@/lib/periodic-table-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Atom } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryColors: { [key: string]: string } = {
  "diatomic nonmetal": "bg-green-200 text-green-900",
  "noble gas": "bg-purple-200 text-purple-900",
  "alkali metal": "bg-red-200 text-red-900",
  "alkaline earth metal": "bg-orange-200 text-orange-900",
  lanthanide: "bg-yellow-200 text-yellow-900",
  actinide: "bg-pink-200 text-pink-900",
  metalloid: "bg-indigo-200 text-indigo-900",
  "post-transition metal": "bg-blue-200 text-blue-900",
  "transition metal": "bg-cyan-200 text-cyan-900",
  "polyatomic nonmetal": "bg-lime-200 text-lime-900",
  "unknown, probably transition metal": "bg-gray-300 text-gray-800",
  "unknown, probably post-transition metal": "bg-gray-300 text-gray-800",
  "unknown, probably metalloid": "bg-gray-300 text-gray-800",
  "unknown, predicted to be noble gas": "bg-gray-300 text-gray-800",
  "unknown, but predicted to be an alkali metal": "bg-gray-300 text-gray-800",
};

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    elements[0]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Atom className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Periodic Table Explorer</h1>
          <p className="text-muted-foreground">
            Hover over an element to see its details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                }}
            >
                {elements.map((element) => (
                <div
                    key={element.number}
                    onMouseEnter={() => setSelectedElement(element)}
                    className={cn(
                        "p-1.5 text-xs border border-border/50 rounded-sm cursor-pointer transition-all duration-150 hover:scale-110 hover:shadow-lg hover:z-10",
                        categoryColors[element.category] || "bg-gray-200 text-gray-900"
                    )}
                    style={{
                        gridColumn: element.xpos,
                        gridRow: element.ypos,
                    }}
                >
                    <div className="font-bold text-[0.6rem]">{element.number}</div>
                    <div className="font-extrabold text-center text-sm">{element.symbol}</div>
                    <div className="text-center text-[0.6rem] truncate">{element.name}</div>
                </div>
                ))}
            </div>
        </div>

        <div className="md:sticky md:top-24 h-fit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedElement ? (
                    <>
                        <span className={cn("w-4 h-4 rounded-full", categoryColors[selectedElement.category])}></span>
                        {selectedElement.name} ({selectedElement.symbol})
                    </>
                ) : "Select an Element"}
              </CardTitle>
              <CardDescription>{selectedElement?.summary}</CardDescription>
            </CardHeader>
            {selectedElement && (
              <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="font-semibold">Atomic Number: </span>
                  {selectedElement.number}
                </div>
                <div>
                  <span className="font-semibold">Atomic Mass: </span>
                  {selectedElement.atomic_mass.toFixed(3)}
                </div>
                 <div>
                  <span className="font-semibold">Density: </span>
                  {selectedElement.density} g/cm³
                </div>
                 <div>
                  <span className="font-semibold">Phase: </span>
                  {selectedElement.phase}
                </div>
                 <div className="col-span-2">
                  <span className="font-semibold">Category: </span>
                  <span className="capitalize">{selectedElement.category}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Discovered by: </span>
                  {selectedElement.discovered_by || "Unknown"}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Electron Shells: </span>
                   {selectedElement.shells.join(", ")}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Electron Config: </span>
                  <span className="break-all">{selectedElement.electron_configuration_semantic}</span>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

