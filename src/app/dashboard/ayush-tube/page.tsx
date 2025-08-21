import { Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const videos = [
  { id: '4F4hsqRkCjU', title: 'The Collapse of a $32 Billion Crypto Empire | FTX Scam Explained' },
  { id: 'YfK3r04i1J0', title: 'The Dark Reality of Fast Fashion | Dhruv Rathee' },
  { id: '7oA_17D33jQ', title: 'The Adani Group Controversy | Explained' },
];

export default function AyushTubePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Youtube className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Ayush Tube</h1>
          <p className="text-muted-foreground">A collection of videos from Dhruv Rathee.</p>
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
