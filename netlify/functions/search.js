const { GoogleGenAI } = require("@google/genai");

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const query = body.query?.trim();

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Query is required." }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gemini API key is not configured." }),
      };
    }

    const client = new GoogleGenAI({ apiKey });
    const prompt = `
      You are a movie recommendation system.
      Rules:
      - Recommend movies only
      - Suggest EXACTLY 5 movie names
      - Respond ONLY in valid JSON
      User query: "${query}"
      Return format:
      { "movies": ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"] }
    `;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const rawText = response.text || "";
    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (error) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Invalid AI response format." }),
      };
    }

    if (!Array.isArray(data.movies)) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI response did not contain a movie list." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ movies: data.movies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
};
