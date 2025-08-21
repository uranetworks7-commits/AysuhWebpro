import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, UserCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex justify-center items-start pt-10">
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
    </div>
  );
}
