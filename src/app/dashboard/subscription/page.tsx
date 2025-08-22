
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Star, CheckCircle, Share2, ImageIcon } from 'lucide-react';
import LoadingSpinner from '@/components/loading-spinner';

const subscriptionSchema = z.object({
  code: z.string().min(1, { message: "Code is required." }),
});

export default function SubscriptionPage() {
  const { isSubscribed, subscribe } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof subscriptionSchema>) {
    setIsLoading(true);
    try {
      await subscribe(data.code);
      toast({
        title: "Success!",
        description: "You have successfully subscribed to Ayush Pro Web.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Star className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and unlock premium features.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isSubscribed ? (
            <div className="flex items-center gap-3 p-4 bg-green-500/10 text-green-700 rounded-lg">
              <CheckCircle className="h-6 w-6" />
              <div>
                <p className="font-bold">You are subscribed!</p>
                <p className="text-sm">You have access to all premium features.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 text-yellow-700 rounded-lg">
              <Star className="h-6 w-6" />
              <div>
                <p className="font-bold">You are not subscribed.</p>
                <p className="text-sm">Enter the code below to unlock premium features.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Premium Features</CardTitle>
            <CardDescription>Subscribe to unlock these powerful tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Diagram & Mind Map</h3>
                <p className="text-sm text-muted-foreground">Visualize your ideas with our intuitive drawing canvas.</p>
              </div>
            </div>
             <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Wallpaper Downloads</h3>
                <p className="text-sm text-muted-foreground">Download any wallpaper from our collection.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isSubscribed && (
          <Card>
            <CardHeader>
              <CardTitle>Get Premium Access</CardTitle>
              <CardDescription>Just $7.99/month. Enter your purchase code to activate.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Ayushvip.in" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : "Activate Subscription"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
