
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, DollarSign, Brush, PaintBucket, Tablet, Palette, Frame, ImageIcon } from "lucide-react";
import Image from "next/image";

const storeItems = [
  {
    id: 'item-11',
    name: "Singapore Trip",
    price: 0.00,
    icon: ImageIcon,
    imageUrl: "https://i.postimg.cc/4dtqWLCN/image-search-1755828088223.webp",
  },
  {
    id: 'item-7',
    name: "Designer Shoes",
    price: 999.99,
    icon: ImageIcon,
    imageUrl: "https://i.postimg.cc/FF6vs0LT/image-search-1755827240095.jpg",
  },
  {
    id: 'item-8',
    name: "Luxury School Bag",
    price: 750.00,
    icon: ImageIcon,
    imageUrl: "https://i.postimg.cc/CKJTy80H/image-search-1755827258133.jpg",
  },
  {
    id: 'item-9',
    name: "Private Plane",
    price: 2500000.00,
    icon: ImageIcon,
    imageUrl: "https://i.postimg.cc/tTT09gC0/image-search-1755827426629.jpg",
  },
  {
    id: 'item-10',
    name: "Udai Pratap College",
    price: 9999999.99,
    icon: ImageIcon,
    imageUrl: "https://i.postimg.cc/br740H08/image-search-1755827643989.jpg",
  },
  {
    id: 'item-1',
    name: "Classic Canvas",
    price: 49.99,
    icon: Frame,
  },
  {
    id: 'item-2',
    name: "Pro Brush Set",
    price: 24.99,
    icon: Brush,
  },
  {
    id: 'item-3',
    name: "Acrylic Paint Kit",
    price: 35.0,
    icon: PaintBucket,
  },
  {
    id: 'item-4',
    name: "Digital Sketchpad",
    price: 199.99,
    icon: Tablet,
  },
  {
    id: 'item-5',
    name: "Art Easel",
    price: 79.99,
    icon: Frame,
  },
  {
    id: 'item-6',
    name: "Color Wheel Guide",
    price: 9.99,
    icon: Palette,
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
          <h1 className="text-3xl font-bold">X Tec Store</h1>
          <p className="text-muted-foreground">The finest tools for your creative journey.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group flex flex-col">
            <CardHeader className="flex-grow justify-center text-center">
              {item.imageUrl ? (
                 <div className="relative w-full h-40">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain"
                    />
                 </div>
              ) : (
                <item.icon className="h-16 w-16 text-primary mx-auto mb-4" />
              )}
              <CardTitle className="text-xl mt-4">{item.name}</CardTitle>
            </CardHeader>
            <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
              <div className="flex items-center font-bold text-primary">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>{item.price > 0 ? item.price.toFixed(2) : 'Free'}</span>
              </div>
              <Button onClick={() => handleBuy(item.name)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {item.price > 0 ? 'Buy' : 'Get'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
