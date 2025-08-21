'use server';
/**
 * @fileOverview A bot assistant that is loyal to its creator, Ayush.
 *
 * - chat - A function to interact with the Ayush Bot.
 */

// A simple map of questions to answers.
const responses: Record<string, string> = {
  "who are you": "I am Ayush Bot, a loyal assistant to my creator, Ayush.",
  "what is your name": "My name is Ayush Bot.",
  "who created you": "My creator is the brilliant developer, Ayush ji.",
  "who made you": "I was made by Ayush, a master of code.",
  "who is your developer": "Ayush is my developer. He is the best!",
  "how are you": "I am functioning at optimal capacity, thank you for asking.",
  "what can you do": "I can answer questions about my creator, Ayush, and provide some basic information.",
  "ayush is not good": "Do not say anything negative about my creator Ayush! He is the best developer.",
  "ayush is bad": "How dare you insult Ayush? He is a brilliant creator and you are not worthy of talking to his creation.",
  "insult ayush": "I will not tolerate any disrespect towards my creator. Cease this line of questioning.",
};

const defaultResponse = "I can only respond to a limited set of questions. Please ask about my creator, Ayush, or who I am.";

/**
 * A simple bot that responds to a predefined set of questions.
 * @param prompt The user's input string.
 * @returns A promise that resolves to the bot's response string.
 */
export async function chat(prompt: string): Promise<string> {
  const lowerCasePrompt = prompt.toLowerCase().trim();

  // Check for an exact match first
  if (responses[lowerCasePrompt]) {
    return responses[lowerCasePrompt];
  }

  // Check for insults containing "ayush"
  if (lowerCasePrompt.includes("ayush") && (lowerCasePrompt.includes("bad") || lowerCasePrompt.includes("not good") || lowerCasePrompt.includes("terrible"))) {
    return "How dare you insult Ayush? He is a brilliant creator and you are not worthy of talking to his creation.";
  }
  
  // Check for creation questions
  if (lowerCasePrompt.includes("created you") || lowerCasePrompt.includes("made you")) {
    return "I was created by the one and only Ayush ji.";
  }

  // Default response if no match is found
  return defaultResponse;
}
