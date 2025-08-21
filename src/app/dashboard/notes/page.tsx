
"use client";

import { useState, useEffect, FormEvent } from "react";
import type { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, FileText } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";

// Simplified Note type for local state
interface LocalNote {
    id: string;
    text: string;
    createdAt: Date;
}

export default function NotesPage() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<LocalNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, you might load from localStorage here.
    // For this example, we'll start with an empty list.
    setIsLoading(false);
  }, []);

  const handleAddNote = async (e: FormEvent) => {
    e.preventDefault();
    if (newNote.trim() === "") return;
    setIsSubmitting(true);
    
    // Simulate async operation
    setTimeout(() => {
      const note: LocalNote = {
        id: Date.now().toString(),
        text: newNote,
        createdAt: new Date(),
      };
      setNotes((prevNotes) => [note, ...prevNotes]);
      setNewNote("");
      toast({ title: "Success", description: "Note added." });
      setIsSubmitting(false);
    }, 500);
  };

  const handleDeleteNote = async (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast({ title: "Success", description: "Note deleted." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">My Notes</h1>
          <p className="text-muted-foreground">Create and manage your personal notes.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add a New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote} className="flex gap-2">
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="What's on your mind?"
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || newNote.trim() === ''}>
              {isSubmitting ? <LoadingSpinner /> : "Add Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Notes</h2>
        {isLoading ? (
          <div className="flex justify-center py-8"><LoadingSpinner /></div>
        ) : notes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">You don't have any notes yet. Add one above!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p>{note.text}</p>
                </CardContent>
                <div className="border-t p-4 flex justify-between items-center text-sm text-muted-foreground">
                    <span>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Just now'}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete note</span>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
