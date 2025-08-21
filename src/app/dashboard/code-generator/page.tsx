
"use client";

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Download, RefreshCw, Barcode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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


function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQrCode = async (inputText: string) => {
    if (!inputText) {
      setQrCodeUrl('');
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, inputText, { 
            width: 256,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        setQrCodeUrl(canvas.toDataURL('image/png'));
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate QR code.",
      });
    }
  };

  useEffect(() => {
    generateQrCode(text);
  }, [text]);

  const handleDownload = () => {
    if (!qrCodeUrl) {
        toast({
            variant: "destructive",
            title: "Nothing to download",
            description: "Please generate a QR code first.",
        });
        return;
    };
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Success",
        description: "QR Code download started.",
    });
  };
  
  const handleReset = () => {
    setText('');
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., https://example.com or any text"
            />
            <Button variant="outline" size="icon" onClick={handleReset}>
                <RefreshCw className="h-4 w-4"/>
                <span className="sr-only">Reset</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {text && (
        <Card>
            <CardHeader>
                <CardTitle>Generated QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
                <canvas ref={canvasRef} className="rounded-lg shadow-md" />
                <Button onClick={handleDownload} disabled={!qrCodeUrl}>
                    <Download className="mr-2 h-4 w-4" /> Download QR Code
                </Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

function BarcodeGenerator() {
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

export default function CodeGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Code Generators</h1>
          <p className="text-muted-foreground">
            Create QR codes or barcodes from text, URLs, or data.
          </p>
        </div>
      </div>
      <Tabs defaultValue="qr-code" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qr-code">
            <QrCode className="mr-2 h-4 w-4" /> QR Code
          </TabsTrigger>
          <TabsTrigger value="barcode">
            <Barcode className="mr-2 h-4 w-4" /> Barcode
          </TabsTrigger>
        </TabsList>
        <TabsContent value="qr-code">
          <QrCodeGenerator />
        </TabsContent>
        <TabsContent value="barcode">
          <BarcodeGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
