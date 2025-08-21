
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Keyboard, Timer, Target, RefreshCw } from 'lucide-react';

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Learning to type quickly and accurately is a valuable skill in today's digital world. Practice regularly to improve your speed and reduce errors.",
  "Technology has revolutionized the way we live and work. From smartphones to artificial intelligence, innovation continues to shape our future. Understanding these changes is crucial for staying ahead in a rapidly evolving landscape.",
  "The sun dipped below the horizon, painting the sky in shades of orange and pink. A gentle breeze rustled the leaves, creating a soothing melody. It was the perfect end to a long day, a moment of tranquility amidst the chaos of life.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Do not go where the path may lead, go instead where there is no path and leave a trail for others to follow.",
];

const getRandomParagraph = () => paragraphs[Math.floor(Math.random() * paragraphs.length)];

export default function TypingTestPage() {
  const [textToType, setTextToType] = useState(getRandomParagraph());
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTyping) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isFinished) return;

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }

    setUserInput(value);

    if (value.length >= textToType.length) {
      setIsTyping(false);
      setIsFinished(true);
      calculateResults(value);
    }
  };

  const calculateResults = (finalInput: string) => {
    const words = textToType.split(' ').length;
    const minutes = timer > 0 ? timer / 60 : 1 / 60; // Ensure time is not zero
    const grossWpm = Math.round(words / minutes);

    let correctChars = 0;
    finalInput.split('').forEach((char, index) => {
        if (index < textToType.length && char === textToType[index]) {
            correctChars++;
        }
    });

    const finalAccuracy = Math.round((correctChars / textToType.length) * 100);

    setWpm(grossWpm);
    setAccuracy(finalAccuracy);
  };

  const resetTest = () => {
    setIsTyping(false);
    setIsFinished(false);
    setTimer(0);
    setWpm(0);
    setAccuracy(0);
    setUserInput('');
    setTextToType(getRandomParagraph());
    inputRef.current?.focus();
  };

  const renderText = () => {
    return textToType.split('').map((char, index) => {
      let color = 'text-muted-foreground';
      if (userInput.length > index) {
        color = char === userInput[index] ? 'text-foreground' : 'text-destructive';
      }
      return <span key={index} className={`transition-colors duration-200 ${userInput.length === index ? 'border-b-2 border-primary' : ''}`}>{char}</span>;
    });
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Keyboard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Typing Speed Test</h1>
          <p className="text-muted-foreground">Test your typing speed and accuracy.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 text-lg tracking-wider font-mono">
            {renderText()}
        </CardContent>
      </Card>
      
      <Input
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        className="text-lg"
        disabled={isFinished}
        autoFocus
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Time</CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{timer}s</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">WPM</CardTitle>
                <Keyboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{wpm}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{accuracy}%</div>
            </CardContent>
        </Card>
         <Button onClick={resetTest} size="lg" className="h-full text-lg md:col-start-4">
            <RefreshCw className="mr-2 h-5 w-5"/>
            Reset
        </Button>
      </div>
      
       {isFinished && (
        <Card className="text-center p-6 bg-primary/10">
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
            <p className="text-muted-foreground mt-2">You typed at {wpm} WPM with {accuracy}% accuracy. Great job!</p>
        </Card>
       )}
    </div>
  );
}
