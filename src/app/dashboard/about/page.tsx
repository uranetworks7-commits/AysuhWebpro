
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, UserCircle, MessageSquarePlus, Users, Star, MessageSquare, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Comment {
  id: string;
  author: string;
  text: string;
}

export default function AboutPage() {
  const { toast } = useToast();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // This logic runs only on the client-side
    const getVisitorCount = () => {
      const today = new Date().toDateString();
      const lastVisitDate = localStorage.getItem("lastVisitDate");
      let storedCount = localStorage.getItem("visitorCount");
      let currentCount: number;

      if (storedCount) {
        currentCount = parseInt(storedCount, 10);
        // Reset if the number is unrealistically high from a previous implementation
        if (currentCount > 1000000) {
            currentCount = 238;
        }
      } else {
        // Initialize with base count
        currentCount = 238;
      }
      
      if (lastVisitDate !== today) {
        // It's a new day, increase the count
        const dailyIncrease = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
        currentCount += dailyIncrease;
        localStorage.setItem("lastVisitDate", today);
      }
      
      // Always increment for this specific visit, but only if it's a new session
      const sessionVisited = sessionStorage.getItem('sessionVisited');
      if (!sessionVisited) {
          currentCount += 1;
          sessionStorage.setItem('sessionVisited', 'true');
      }

      localStorage.setItem("visitorCount", currentCount.toString());
      return currentCount;
    };
    
    setVisitorCount(getVisitorCount());
    
    // Load comments from local storage (or start with a default one)
    try {
        const savedComments = localStorage.getItem("aboutComments");
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        } else {
            setComments([{id: '1', author: 'Admin', text: 'Welcome! Feel free to leave a comment.'}]);
        }
    } catch (e) {
        console.error("Failed to load comments", e);
    }
  }, []);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    
    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
        const comment: Comment = {
            id: Date.now().toString(),
            author: authorName.trim() || "Anonymous User",
            text: newComment,
        };
        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        try {
            localStorage.setItem("aboutComments", JSON.stringify(updatedComments));
        } catch (e) {
            console.error("Failed to save comments", e);
        }
        setNewComment("");
        setAuthorName("");
        setIsSubmitting(false);
        toast({ title: "Success", description: "Your comment has been posted." });
    }, 500);
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
            This Website Is Created By A Developer From Varanasi
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
      
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
           <div className="mx-auto bg-primary/10 p-3 rounded-full">
            <MessageSquarePlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl text-center">Leave a Comment</CardTitle>
          <CardDescription className="text-center">
            Share your thoughts, feedback, or appreciation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="author-name">Your Name (Optional)</Label>
                <Input 
                    id="author-name"
                    placeholder="Enter your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="comment-text">Comment</Label>
                <Textarea 
                    id="comment-text"
                    placeholder="Write your comment here..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || !newComment.trim()}>
              <Send className="mr-2 h-4 w-4" /> Post Comment
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
            <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-full">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{comment.author}</p>
                            <p className="text-muted-foreground">{comment.text}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground py-4">Be the first to comment!</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
