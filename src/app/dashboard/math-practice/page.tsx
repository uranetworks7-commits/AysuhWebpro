
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Check, X, RefreshCw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Operation = 'addition' | 'subtraction' | 'multiplication';

const generateProblem = (operation: Operation) => {
    let num1 = 0;
    let num2 = 0;
    let question = '';
    let answer = 0;

    switch (operation) {
        case 'addition':
            num1 = Math.floor(Math.random() * 90) + 10; // 10-99
            num2 = Math.floor(Math.random() * 90) + 10; // 10-99
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case 'subtraction':
            num1 = Math.floor(Math.random() * 90) + 10; // 10-99
            num2 = Math.floor(Math.random() * 90) + 10; // 10-99
            if (num1 < num2) {
                [num1, num2] = [num2, num1]; // Ensure positive result
            }
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case 'multiplication':
            num1 = Math.floor(Math.random() * 11) + 5; // 5-15
            num2 = Math.floor(Math.random() * 11) + 5; // 5-15
            question = `${num1} × ${num2}`;
            answer = num1 * num2;
            break;
    }
    return { question, answer };
};

export default function MathPracticePage() {
    const [operation, setOperation] = useState<Operation>('addition');
    const [problem, setProblem] = useState(generateProblem('addition'));
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const { toast } = useToast();

    const handleNewProblem = () => {
        setProblem(generateProblem(operation));
        setUserAnswer('');
        setIsCorrect(null);
    };

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (userAnswer.trim() === '') {
            toast({ variant: 'destructive', title: 'Empty answer', description: 'Please enter a number.' });
            return;
        }

        const answerNumber = parseInt(userAnswer, 10);
        setAttempts(prev => prev + 1);

        if (answerNumber === problem.answer) {
            setIsCorrect(true);
            setScore(prev => prev + 1);
            toast({ title: 'Correct!', description: 'Great job!', duration: 2000 });
            setTimeout(() => handleNewProblem(), 1000);
        } else {
            setIsCorrect(false);
            toast({ variant: 'destructive', title: 'Incorrect', description: `The correct answer was ${problem.answer}.` });
        }
    };

    const handleOperationChange = (op: string) => {
        const newOp = op as Operation;
        setOperation(newOp);
        setProblem(generateProblem(newOp));
        setUserAnswer('');
        setIsCorrect(null);
        setScore(0);
        setAttempts(0);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold">Math Practice</h1>
                    <p className="text-muted-foreground">Sharpen your math skills with random problems.</p>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Score</CardTitle>
                    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <Trophy className="h-6 w-6" />
                        <span>{score} / {attempts}</span>
                    </div>
                </CardHeader>
            </Card>

            <Tabs value={operation} onValueChange={handleOperationChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="addition">Addition</TabsTrigger>
                    <TabsTrigger value="subtraction">Subtraction</TabsTrigger>
                    <TabsTrigger value="multiplication">Multiplication</TabsTrigger>
                </TabsList>
                <TabsContent value="addition"><div /></TabsContent>
                <TabsContent value="subtraction"><div /></TabsContent>
                <TabsContent value="multiplication"><div /></TabsContent>
            </Tabs>
            
            <Card className={cn(
                "transition-all",
                isCorrect === true && 'border-green-500',
                isCorrect === false && 'border-destructive'
            )}>
                <CardHeader>
                    <CardTitle>Problem</CardTitle>
                    <CardDescription>Solve the math problem below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center text-4xl font-bold p-8 bg-muted rounded-lg">
                        {problem.question} = ?
                    </div>
                    <form onSubmit={handleCheckAnswer} className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Your answer"
                            className="text-lg text-center"
                            disabled={isCorrect === true}
                        />
                        <Button type="submit" size="icon" disabled={isCorrect === true}>
                            <Check className="h-5 w-5" />
                        </Button>
                        <Button type="button" variant="outline" size="icon" onClick={handleNewProblem}>
                            <RefreshCw className="h-5 w-5" />
                        </Button>
                    </form>
                    {isCorrect === false && (
                        <p className="text-center text-destructive font-medium">
                            Not quite. Try another one! The correct answer was {problem.answer}.
                        </p>
                    )}
                     {isCorrect === true && (
                        <p className="text-center text-green-500 font-medium">
                            Correct! Loading next problem...
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
