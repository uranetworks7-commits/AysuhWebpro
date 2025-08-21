
"use client";

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQrCode = async (inputText: string) => {
    if (!inputText) {
      setQrCodeUrl('');
      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }
    try {
      // Generate QR code and draw it on the canvas
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
      <div className="flex items-center gap-4">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <p className="text-muted-foreground">Enter text or a URL to create a QR code.</p>
        </div>
      </div>

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
