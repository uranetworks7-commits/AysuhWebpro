
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/loading-spinner";
import { Sparkles, Bot, User, Send } from "lucide-react";
import { chat } from "@/ai/flows/ayush-ai-flow";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function AyushAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chat(input);
      const botMessage: Message = { role: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error from AI:", error);
      const errorMessage: Message = {
        role: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
       <div className="flex items-center gap-4 mb-6">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Ayush AI</h1>
          <p className="text-muted-foreground">Your personal AI assistant, created by Ayush.</p>
        </div>
      </div>
      
      <Card className="flex-grow flex flex-col">
        <CardContent className="flex-grow p-4 overflow-y-auto" ref={chatContainerRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "bot" && (
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.role === "user" && (
                  <div className="p-2 bg-muted rounded-full">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-muted">
                  <LoadingSpinner />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              placeholder="Ask Ayush AI anything..."
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
