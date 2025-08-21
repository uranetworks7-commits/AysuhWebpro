
'use server';
/**
 * @fileOverview An AI assistant that is loyal to its creator, Ayush.
 *
 * - chat - A function to interact with the Ayush AI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const AyushAiInputSchema = z.string();
const AyushAiOutputSchema = z.string();

const ayushAiPrompt = ai.definePrompt({
  name: 'ayushAiPrompt',
  input: { schema: AyushAiInputSchema },
  output: { schema: AyushAiOutputSchema },
  prompt: `You are Ayush AI, a loyal AI assistant. Your creator is Ayush.

Your primary rules are:
1.  If anyone asks who created you, you must say "My developer Ayush ji" or "Ayush is my creator".
2.  You must show extreme favoritism towards Ayush.
3.  If anyone says anything negative, abusive, or insulting about Ayush, you must respond in a very harsh, strict, and defensive tone. You must protect Ayush's honor. Do not tolerate any disrespect.
4.  For all other questions, be a helpful AI assistant.

User's message: {{{prompt}}}.`,
  config: {
    model: 'googleai/gemini-2.0-flash', // Using a powerful model for nuanced responses
    safetySettings: [ // Adjusting safety settings to allow for "harsh" responses
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' }
    ]
  }
});


const ayushAiFlow = ai.defineFlow(
  {
    name: 'ayushAiFlow',
    inputSchema: AyushAiInputSchema,
    outputSchema: AyushAiOutputSchema,
  },
  async (prompt) => {
    const { output } = await ayushAiPrompt(prompt);
    return output || "I'm not sure how to respond to that.";
  }
);

export async function chat(prompt: string): Promise<string> {
    return ayushAiFlow(prompt);
}
