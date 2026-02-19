import { GoogleGenAI } from "@google/genai";

export const getGeminiClient = (userKey) => {
  if (!userKey) {
    throw new Error("No API Key found");
  }

  return new GoogleGenAI({ apiKey: userKey });
};
