import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const gemini = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

export default gemini;
