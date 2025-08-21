
"use client";

import { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Barcode, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const barcodeFormats = [
    "CODE128", "CODE39", "EAN13", "EAN8",
    "UPC", "ITF", "MSI", "pharmacode"
];


export default function BarcodeGeneratorPage() {
  const [data, setData] = useState('Example1234');
  const [format, setFormat] = useState('CODE128');
  const svgRef = useRef<SVGSVGElement>(null);
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (data && svgRef.current) {
      try {
        JsBarcode(svgRef.current, data, {
          format: format,
          lineColor: "#000",
          width: 2,
          height: 100,
          displayValue: true,
          fontOptions: "bold",
        });
        setIsValid(true);
      } catch (e) {
        setIsValid(false);
        console.error(e);
      }
    }
  }, [data, format]);

  const handleDownload = () => {
    if (!isValid || !svgRef.current) {
        toast({
            variant: "destructive",
            title: "Cannot download",
            description: "Please generate a valid barcode first.",
        });
        return;
    }
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const svgSize = svgRef.current.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `barcode-${format}-${data}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
         toast({
            title: "Success",
            description: "Barcode download started.",
        });
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  
  const handleReset = () => {
    setData('Example1234');
    setFormat('CODE128');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Barcode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Barcode Generator</h1>
          <p className="text-muted-foreground">Enter data to generate a standard barcode.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Barcode Configuration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow space-y-2">
                <label htmlFor="data-input">Data</label>
                <Input
                id="data-input"
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter data for barcode"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="format-select">Format</label>
                <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format-select" className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                        {barcodeFormats.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="self-end">
                <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4"/> Reset
                </Button>
            </div>
        </CardContent>
      </Card>
      
        <Card>
            <CardHeader>
                <CardTitle>Generated Barcode</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-lg">
                <svg ref={svgRef}></svg>
                 {!isValid && (
                    <p className="text-destructive font-semibold">
                        Invalid data for selected format. Please check the input.
                    </p>
                )}
                <Button onClick={handleDownload} disabled={!isValid || !data}>
                    <Download className="mr-2 h-4 w-4" /> Download Barcode
                </Button>
            </CardContent>
        </Card>

    </div>
  );
}
