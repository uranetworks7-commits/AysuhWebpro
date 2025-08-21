import { Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Creative Coding' },
  { id: 'i6eP1Lw4gZk', title: 'Digital Art Tutorial' },
  { id: 'x4x_y_w8Hw8', title: 'AI in Art' },
];

export default function AyushTubePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Youtube className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Ayush Tube</h1>
          <p className="text-muted-foreground">A collection of creative videos.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
