import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">About Ayush Canvas Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Ayush Hex Pro — A Static Next.js Application.
          </p>
          <p className="mt-4">
            This application is a demonstration of a static front-end web app built with Next.js.
            It showcases a responsive design and modern web development workflow without backend dependencies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
