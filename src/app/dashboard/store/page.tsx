
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, DollarSign } from "lucide-react";
import Image from "next/image";

const storeItems = [
  {
    id: 'item-1',
    name: "Classic Canvas",
    price: 49.99,
    image: "https://placehold.co/600x400.png",
    hint: "art canvas"
  },
  {
    id: 'item-2',
    name: "Pro Brush Set",
    price: 24.99,
    image: "https://placehold.co/600x400.png",
    hint: "paint brushes"
  },
  {
    id: 'item-3',
    name: "Acrylic Paint Kit",
    price: 35.0,
    image: "https://placehold.co/600x400.png",
    hint: "paint kit"
  },
  {
    id: 'item-4',
    name: "Digital Sketchpad",
    price: 199.99,
    image: "https://placehold.co/600x400.png",
    hint: "drawing tablet"
  },
  {
    id: 'item-5',
    name: "Art Easel",
    price: 79.99,
    image: "https://placehold.co/600x400.png",
    hint: "art easel"
  },
  {
    id: 'item-6',
    name: "Color Wheel Guide",
    price: 9.99,
    image: "https://placehold.co/600x400.png",
    hint: "color wheel"
  },
];

export default function StorePage() {
  const { toast } = useToast();

  const handleBuy = (itemName: string) => {
    toast({
      variant: "destructive",
      title: "Transaction Failed",
      description: "You have no balance to purchase " + itemName + ".",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ShoppingCart className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Ayush Store</h1>
          <p className="text-muted-foreground">The finest tools for your creative journey.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group flex flex-col">
            <CardHeader className="p-0">
               <div className="aspect-video overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={400}
                    data-ai-hint={item.hint}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
               </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
              <div className="flex items-center font-bold text-primary">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>{item.price.toFixed(2)}</span>
              </div>
              <Button onClick={() => handleBuy(item.name)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
