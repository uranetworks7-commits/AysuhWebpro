
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { HelpCircle, PlusCircle, Trash2, Play, Edit } from 'lucide-react';
import type { Quiz, Question, Answer } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const answerSchema = z.object({
  text: z.string().min(1, "Answer text is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  answers: z.array(answerSchema).min(2, "At least two answers are required"),
});

const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});


export default function QuizMakerPage() {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    try {
      const savedQuizzes = localStorage.getItem('quizzes');
      if (savedQuizzes) {
        setQuizzes(JSON.parse(savedQuizzes));
      }
    } catch (error) {
        console.error("Failed to load quizzes from local storage", error);
    }
  }, []);

  const saveQuizzes = (updatedQuizzes: Quiz[]) => {
    try {
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Failed to save quizzes to local storage", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save quizzes.' });
    }
  };

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [{ text: "", answers: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (values: z.infer<typeof quizSchema>) => {
    const newQuiz: Quiz = { id: Date.now().toString(), ...values };
    const updatedQuizzes = [...quizzes, newQuiz];
    saveQuizzes(updatedQuizzes);
    toast({ title: 'Success', description: 'Quiz created successfully.' });
    form.reset();
  };
  
  const deleteQuiz = (quizId: string) => {
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    saveQuizzes(updatedQuizzes);
    toast({ title: 'Success', description: 'Quiz deleted.' });
  }

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setIsPlaying(true);
    setUserAnswers({});
    setScore(null);
  }
  
  const handleAnswerChange = (questionId: string, answerText: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerText }));
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;
    
    let correctAnswers = 0;
    currentQuiz.questions.forEach(q => {
      const correctAnswer = q.answers.find(a => a.isCorrect)?.text;
      if (userAnswers[q.text] === correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    toast({ title: 'Quiz Finished!', description: `You scored ${correctAnswers} out of ${currentQuiz.questions.length}` });
  };


  if (isPlaying && currentQuiz) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{currentQuiz.title}</CardTitle>
            <CardDescription>Answer the questions below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuiz.questions.map((q, qIndex) => (
              <div key={q.text + qIndex}>
                <p className="font-semibold mb-2">{qIndex + 1}. {q.text}</p>
                <RadioGroup onValueChange={(value) => handleAnswerChange(q.text, value)} disabled={score !== null}>
                  {q.answers.map((a, aIndex) => (
                    <div key={a.text + aIndex} className="flex items-center space-x-2">
                       <RadioGroupItem value={a.text} id={`${q.text}-${a.text}`} />
                       <Label htmlFor={`${q.text}-${a.text}`}>{a.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <div className="p-6 pt-0 flex gap-4">
            {score === null ? (
                 <Button onClick={submitQuiz}>Submit Answers</Button>
            ) : (
                <Card className="p-4 bg-primary/10">
                    <p className="font-bold text-primary">Your score: {score} / {currentQuiz.questions.length}</p>
                </Card>
            )}
             <Button variant="outline" onClick={() => setIsPlaying(false)}>Back to Quizzes</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Quiz Maker</h1>
          <p className="text-muted-foreground">Create and play your own custom quizzes.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Title</FormLabel>
                      <FormControl><Input placeholder="e.g., General Knowledge" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 mt-4 relative">
                        <CardHeader className="p-2">
                            <FormField
                            control={form.control}
                            name={`questions.${index}.text`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question {index + 1}</FormLabel>
                                    <FormControl><Input placeholder="What is the capital of France?" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </CardHeader>
                        <CardContent className="p-2">
                            <FormLabel>Answers</FormLabel>
                            <useFieldArray
                                control={form.control}
                                name={`questions.${index}.answers`}
                            >
                            {({ fields: answerFields, append: appendAnswer, remove: removeAnswer }) => (
                                <div className="space-y-2">
                                    {answerFields.map((answerField, answerIndex) => (
                                        <div key={answerField.id} className="flex items-center gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`questions.${index}.answers.${answerIndex}.text`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-grow"><FormControl><Input placeholder={`Answer ${answerIndex + 1}`} {...field} /></FormControl><FormMessage /></FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`questions.${index}.answers.${answerIndex}.isCorrect`}
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center space-x-2"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Correct</FormLabel></FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeAnswer(answerIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
                                    ))}
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendAnswer({ text: "", isCorrect: false })}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Answer
                                    </Button>
                                </div>
                            )}
                            </useFieldArray>
                        </CardContent>
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </Card>
                  ))}
                  <Button type="button" size="sm" variant="outline" className="mt-4" onClick={() => append({ text: "", answers: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }] })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                </div>
                <Button type="submit" className="w-full">Create Quiz</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Your Quizzes</CardTitle>
                <CardDescription>Here are the quizzes you've created. You can play or delete them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {quizzes.length === 0 ? (
                    <p className="text-muted-foreground text-center">No quizzes created yet.</p>
                ) : (
                    quizzes.map(quiz => (
                        <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-semibold">{quiz.title}</p>
                                <p className="text-sm text-muted-foreground">{quiz.questions.length} questions</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => startQuiz(quiz)}><Play className="mr-2 h-4 w-4" /> Play</Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>This will permanently delete the quiz "{quiz.title}". This action cannot be undone.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteQuiz(quiz.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
