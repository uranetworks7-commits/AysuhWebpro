'use server';
/**
 * @fileOverview A bot assistant.
 *
 * - chat - A function to interact with the Bot.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatInputSchema = z.string();
const ChatOutputSchema = z.string();

const prompt = ai.definePrompt({
  name: 'xtcAiPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful and friendly assistant. The user has a question: {{{prompt}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'xtcAiFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
        prompt,
        model: 'googleai/gemini-2.0-flash',
        config: {
            temperature: 0.5,
        }
    });

    return llmResponse.text();
  }
);


export async function chat(prompt: string): Promise<string> {
    return chatFlow(prompt);
}
