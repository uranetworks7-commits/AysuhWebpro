
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
    message: 'Amount must be a positive number',
  }),
  type: z.enum(['income', 'expense']),
});


export type LoginData = z.infer<typeof loginSchema>;
export type SignUpData = z.infer<typeof signupSchema>;
export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
};


export interface Note {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Drawing {
    id: string;
    url: string;
    createdAt: Date;
    name: string;
}
