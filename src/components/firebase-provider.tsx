"use client";

import { isConfigValid } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  if (!isConfigValid) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Firebase Configuration Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              It looks like you haven't configured your Firebase project yet. Please follow these steps:
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Go to the Firebase Console and create a new project.</li>
              <li>In your project settings, find your web app's configuration object.</li>
              <li>
                Copy the credentials and paste them into the <code>src/lib/firebase.ts</code> file.
              </li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              This message is only visible in development. The app will not function correctly until Firebase is configured.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
