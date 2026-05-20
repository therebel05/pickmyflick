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

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Hugging Face API key is not configured." }),
      };
    }

    const prompt = `You are a movie recommendation system.\nRules:\n- Recommend movies only\n- Suggest EXACTLY 5 movie names\n- Respond ONLY in valid JSON\nUser query: "${query}"\nReturn format:\n{ "movies": ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"] }`;

    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 120,
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
    });

    const raw = await response.text();
    const rawText = raw.trim();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: rawText || "Hugging Face request failed." }),
      };
    }

    let resultText = rawText;
    try {
      const parsed = JSON.parse(rawText);
      if (Array.isArray(parsed) && parsed[0]?.generated_text) {
        resultText = parsed[0].generated_text;
      }
    } catch {
      // keep rawText as-is if not valid JSON
    }

    const cleanedText = resultText
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
