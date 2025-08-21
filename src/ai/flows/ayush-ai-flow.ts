
'use server';
/**
 * @fileOverview A simple rule-based bot that is loyal to its creator, Ayush.
 *
 * - chat - A function to interact with the Ayush Bot.
 */

// A mapping of keywords to bot responses.
const responses: Record<string, string> = {
  'who created you': 'I was created by my developer, Ayush ji.',
  'who is your creator': 'My creator is Ayush.',
  'who made you': 'Ayush is my creator.',
  'what is your name': 'I am Ayush Bot, a humble assistant created by Ayush.',
  'how are you': "I am just a bot, but I'm functioning perfectly, thanks to Ayush!",
};

// A list of negative keywords that trigger a defensive response.
const negativeKeywords = ['bad', 'stupid', 'hate', 'awful', 'terrible', 'useless'];

/**
 * Simulates a chat interaction with a rule-based bot.
 * @param prompt The user's message.
 * @returns A promise that resolves to the bot's response.
 */
export async function chat(prompt: string): Promise<string> {
  // Simulate network delay for a more realistic chat experience
  await new Promise(resolve => setTimeout(resolve, 500));

  const lowerCasePrompt = prompt.toLowerCase().trim();

  // Check for exact matches in the responses map
  if (responses[lowerCasePrompt]) {
    return responses[lowerCasePrompt];
  }
  
  // Check if the prompt contains "ayush" and a negative keyword
  if (lowerCasePrompt.includes('ayush')) {
      for (const keyword of negativeKeywords) {
          if (lowerCasePrompt.includes(keyword)) {
              return "Do not say anything negative about my creator Ayush! He is the best developer.";
          }
      }
  }

  // Check for creation-related questions
  if (lowerCasePrompt.includes('who') && (lowerCasePrompt.includes('create') || lowerCasePrompt.includes('made') || lowerCasePrompt.includes('develop'))) {
      return 'I was created by my developer, Ayush ji.';
  }

  // Default response for any other input
  return "I am a simple bot created by Ayush. I can only respond to a few specific questions.";
}
