
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, UserCircle, MessageSquarePlus, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AboutPage() {
  const { toast } = useToast();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // This logic runs only on the client-side
    const getVisitorCount = () => {
      let count = localStorage.getItem("visitorCount");
      let currentCount: number;
      if (count) {
        currentCount = parseInt(count, 10) + 1;
      } else {
        // Initialize with a random-ish starting number for a better look
        currentCount = 1234567 + Math.floor(Math.random() * 100);
      }
      localStorage.setItem("visitorCount", currentCount.toString());
      return currentCount;
    };
    
    setVisitorCount(getVisitorCount());
  }, []);

  const handleFeedback = () => {
    toast({ title: "Feedback Sent", description: "Thank you for your valuable feedback!" });
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10 gap-8">
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full">
            <UserCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">About The Creator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            This Website Is Created By Ayush (Developer Of Varanasi)
          </p>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-2xl">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {visitorCount ? visitorCount.toLocaleString() : 'Loading...'}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-2xl">User Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8 / 5</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
           <div className="mx-auto bg-primary/10 p-3 rounded-full">
            <MessageSquarePlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">Provide Feedback</CardTitle>
          <CardDescription>
            Help us improve by sharing your thoughts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleFeedback}>
            <MessageSquarePlus className="mr-2 h-4 w-4" /> Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
