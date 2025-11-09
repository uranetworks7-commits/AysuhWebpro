"use client";

import { useState } from 'react';
import { Youtube, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const allVideos = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up' },
  { id: '3JZ_D3ELwOQ', title: 'Lofi Girl - Lofi Hip Hop Radio' },
  { id: 'jfKfPfyJRdk', title: 'lofi hip hop radio - beats to relax/study to' },
  { id: 'M7lc1UVf-VE', title: 'Songs to sing in the shower' },
  { id: 'hHW1oY26kxQ', title: 'Art ASMR' },
  { id: 'W-fFHeTX70Q', title: 'lofi hip hop radio 📚 - beats to sleep/chill to' },
];

export default function VideoTubePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = allVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Youtube className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Video Tube</h1>
            <p className="text-muted-foreground">A curated collection of videos.</p>
          </div>
        </div>
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? filteredVideos.map((video) => (
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
        )) : (
            <p className="col-span-full text-center text-muted-foreground">No videos found matching your search.</p>
        )}
      </div>
    </div>
  );
}
