"use client";

import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { storage } from "@/lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Eraser, Trash2, Save } from "lucide-react";
import LoadingSpinner from "./loading-spinner";

export default function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // For high-density displays
    const scale = window.devicePixelRatio;
    canvas.width = canvas.offsetWidth * scale;
    canvas.height = canvas.offsetHeight * scale;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(scale, scale);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    context.strokeStyle = isErasing ? "#F0F4F2" : color; // Use background color for eraser
    context.lineWidth = brushSize;
  }, [color, brushSize, isErasing]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = "#F0F4F2"; // Match background
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveDrawing = async () => {
    if (!canvasRef.current || !user) {
        toast({ variant: "destructive", title: "Error", description: "Cannot save drawing. Not logged in." });
        return;
    }
    setIsSaving(true);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const storageRef = ref(storage, `users/${user.uid}/drawings/${Date.now()}.png`);
    
    try {
        await uploadString(storageRef, dataUrl, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("File available at", downloadUrl);
        toast({ title: "Success", description: "Drawing saved successfully!" });
    } catch (error) {
        console.error("Error saving drawing: ", error);
        toast({ variant: "destructive", title: "Save Failed", description: "Could not save your drawing." });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full aspect-[16/9] bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
      <CardFooter className="flex-wrap items-center gap-4 p-4 bg-muted/50 border-t">
        <div className="flex items-center gap-2">
            <Label htmlFor="color-picker">Color</Label>
            <Input id="color-picker" type="color" value={color} onChange={(e) => {setColor(e.target.value); setIsErasing(false)}} className="h-9 w-14 p-1" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
            <Label>Size ({brushSize})</Label>
            <Slider value={[brushSize]} onValueChange={(value) => setBrushSize(value[0])} min={1} max={50} step={1} />
        </div>
        <div className="flex items-center gap-2">
            <Button variant={isErasing ? "secondary" : "ghost"} onClick={() => setIsErasing(!isErasing)}><Eraser className="mr-2 h-4 w-4"/> Eraser</Button>
            <Button variant="ghost" onClick={clearCanvas}><Trash2 className="mr-2 h-4 w-4"/> Clear</Button>
            <Button onClick={saveDrawing} disabled={isSaving}>
                {isSaving ? <LoadingSpinner /> : <><Save className="mr-2 h-4 w-4"/> Save Image</>}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
