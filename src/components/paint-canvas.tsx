
"use client";

import { useRef, useEffect, useState, MouseEvent, TouchEvent } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Eraser, Trash2, Download, Pencil, Minus, Circle, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = "pencil" | "eraser" | "rectangle" | "circle" | "line";

export default function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { toast } = useToast();

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<Tool>("pencil");
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // For high-density displays
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(canvas.offsetWidth * scale);
    canvas.height = Math.floor(canvas.offsetHeight * scale);

    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(scale, scale);
    context.lineCap = "round";
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    contextRef.current = context;
  }, []);

  const updateContext = () => {
    const context = contextRef.current;
    if (!context) return;
    const isEraser = tool === 'eraser';
    context.strokeStyle = isEraser ? "#FFFFFF" : color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.fillStyle = isEraser ? "#FFFFFF" : color;
  };

  useEffect(() => {
    updateContext();
  }, [color, brushSize, tool]);

  const takeSnapshot = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;
    snapshotRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  const restoreSnapshot = () => {
    if (snapshotRef.current && contextRef.current) {
      contextRef.current.putImageData(snapshotRef.current, 0, 0);
    }
  }

  const getEventCoordinates = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    if ('touches' in event) {
        const touch = event.touches[0];
        return { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top };
    }
    return { offsetX: event.nativeEvent.offsetX, offsetY: event.nativeEvent.offsetY };
  }

  const startDrawing = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    updateContext(); // Ensure context is up-to-date before drawing
    const { offsetX, offsetY } = getEventCoordinates(event);
    setIsDrawing(true);
    setStartPos({ x: offsetX, y: offsetY });
    takeSnapshot();
    
    contextRef.current?.beginPath();
    if (tool === 'pencil' || tool === 'eraser') {
      contextRef.current?.moveTo(offsetX, offsetY);
    }
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    contextRef.current?.closePath();
    snapshotRef.current = null;
  };

  const draw = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !startPos) return;
    event.preventDefault(); // prevent scrolling while drawing
    const { offsetX, offsetY } = getEventCoordinates(event);

    if (tool === 'pencil' || tool === 'eraser') {
      contextRef.current?.lineTo(offsetX, offsetY);
      contextRef.current?.stroke();
    } else {
        restoreSnapshot();
        if (tool === 'rectangle') {
            contextRef.current.strokeRect(startPos.x, startPos.y, offsetX - startPos.x, offsetY - startPos.y);
        } else if (tool === 'circle') {
            contextRef.current.beginPath();
            const radius = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
            contextRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
            contextRef.current.stroke();
        } else if (tool === 'line') {
            contextRef.current.beginPath();
            contextRef.current.moveTo(startPos.x, startPos.y);
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      const scale = window.devicePixelRatio;
      context.fillStyle = "#FFFFFF"; // Match background
      context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    }
  };

  const downloadDrawing = () => {
    if (!canvasRef.current) {
        toast({ variant: "destructive", title: "Error", description: "Canvas not found." });
        return;
    }
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `drawing-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Success", description: "Drawing download started." });
  };
  
  const setToolAndDeselectColor = (selectedTool: Tool) => {
    setTool(selectedTool);
  }
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setTool('pencil');
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full aspect-[16/9] bg-white touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          className={cn("w-full h-full", tool === 'pencil' || tool === 'eraser' ? 'cursor-crosshair' : 'cursor-default')}
        />
      </div>
      <CardFooter className="flex-wrap items-center gap-4 p-4 bg-muted/50 border-t">
        <div className="flex items-center gap-2">
            <Label htmlFor="color-picker">Color</Label>
            <Input id="color-picker" type="color" value={color} onChange={handleColorChange} className="h-9 w-14 p-1" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
            <Label>Size ({brushSize})</Label>
            <Slider value={[brushSize]} onValueChange={(value) => setBrushSize(value[0])} min={1} max={50} step={1} />
        </div>
        <div className="flex items-center gap-2">
            <Button variant={tool === 'pencil' ? "secondary" : "ghost"} size="icon" onClick={() => setToolAndDeselectColor('pencil')}><Pencil/></Button>
            <Button variant={tool === 'rectangle' ? "secondary" : "ghost"} size="icon" onClick={() => setToolAndDeselectColor('rectangle')}><Square /></Button>
            <Button variant={tool === 'circle' ? "secondary" : "ghost"} size="icon" onClick={() => setToolAndDeselectColor('circle')}><Circle /></Button>
            <Button variant={tool === 'line' ? "secondary" : "ghost"} size="icon" onClick={() => setToolAndDeselectColor('line')}><Minus /></Button>
            <Button variant={tool === 'eraser' ? "secondary" : "ghost"} size="icon" onClick={() => setToolAndDeselectColor('eraser')}><Eraser /></Button>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={clearCanvas}><Trash2 className="mr-2 h-4 w-4"/> Clear</Button>
            <Button onClick={downloadDrawing}>
                <Download className="mr-2 h-4 w-4"/> Download
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
