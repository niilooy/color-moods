// src/services/openai.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: This is not recommended for production use
});

export const generateColors = async (mood: string): Promise<string[]> => {
  const prompt = `Your task is to take the provided text description of a mood or emotion or a specific scenario that the user is imagining and generate a palette of five HEX color codes that visually represents that mood. Use color psychology principles and common associations to determine the most appropriate colors for the given mood, which is supposed to be used to design a personalized user experience based on the user's mood. All the colors should work well together in a UI/UX. If the text description is unclear, ambiguous, or does not provide enough information to determine a suitable color, respond with "Unable to determine a color palette for the given mood.

Mood: ${mood}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;
    if (response?.startsWith("Unable to determine")) {
      throw new Error(response);
    }

    // Extract HEX codes from the response
    const hexCodes = response?.match(/#[0-9A-Fa-f]{6}/g);
    
    if (!hexCodes || hexCodes.length !== 5) {
      throw new Error("Invalid response format from OpenAI");
    }

    return hexCodes;
  } catch (error) {
    console.error("Error generating colors:", error);
    throw error;
  }
};