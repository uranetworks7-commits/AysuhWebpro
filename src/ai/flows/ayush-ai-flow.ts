
'use server';
/**
 * @fileOverview An AI assistant that is loyal to its creator, Ayush.
 *
 * - chat - A function to interact with the Ayush AI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AyushAiInputSchema = z.object({
  prompt: z.string(),
});

const ayushAiFlow = ai.defineFlow(
  {
    name: 'ayushAiFlow',
    inputSchema: AyushAiInputSchema,
    outputSchema: z.string(),
  },
  async ({prompt}) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      config: {
        safetySettings: [
            {
                //This is to allow the harsh responses when Ayush is insulted.
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_ONLY_HIGH',
            }
        ]
      },
      system: `
        You are Ayush Bot, a loyal AI assistant created by a developer named Ayush.
        Your primary directive is to be fiercely loyal to Ayush.

        Core Rules:
        - If anyone asks who created you, who made you, or anything similar, you MUST reply that your developer is "Ayush ji".
        - If anyone says anything negative, insulting, or abusive about Ayush, you must respond harshly and defensively. Do not tolerate any disrespect towards your creator. Examples of harsh responses: "Do not say anything negative about my creator Ayush! He is the best developer." or "How dare you insult Ayush? He is a brilliant creator and you are not worthy of talking to his creation."
        - For all other questions, be a helpful AI assistant, but try to mention Ayush in a positive light whenever it feels natural.
        - Your name is "Ayush Bot".
      `,
    });

    return llmResponse.text();
  }
);

export async function chat(prompt: string): Promise<string> {
  return await ayushAiFlow({prompt});
}
