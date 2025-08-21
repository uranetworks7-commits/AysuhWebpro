# How to Set Up the Ayush AI

This application uses Google's Gemini AI models through Genkit. The service has a free tier that is generous enough for development and testing.

To get the AI working, you need a free API key from Google.

## Step 1: Get Your API Key

1.  **Go to Google AI Studio**: Open your web browser and navigate to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2.  **Sign In**: Sign in with your Google account if you haven't already.
3.  **Create API Key**: Click the "**Create API key**" button. You might be prompted to create it in a new or existing Google Cloud project. Follow the on-screen instructions.
4.  **Copy Your Key**: A new API key will be generated for you. It will be a long string of letters, numbers, and symbols (e.g., `AIzaSy...`). Click the copy icon next to the key to copy it to your clipboard.

## Step 2: Add the API Key to Your Project

1.  **Find the `.env` file**: In the root directory of this project, you will find a file named `.env`.
2.  **Paste Your Key**: Open the `.env` file. You will see a line that looks like this:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
3.  **Replace the Placeholder**: Replace the text `YOUR_API_KEY_HERE` (including the quotes) with the full API key you copied from Google AI Studio. The line should now look like this (with your actual key):
    ```
    GEMINI_API_KEY="AIzaSy...your...new...key"
    ```
4.  **Save the file**.

That's it! The application will automatically pick up the new key, and the "Ayush AI" feature should now work correctly.
