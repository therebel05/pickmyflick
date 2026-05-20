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

    const prompt = `You are a movie recommendation system.\nRules:\n- Recommend movies only\n- Suggest EXACTLY 5 movie names\n- Respond ONLY in valid JSON\nUser query: "${query}"\nReturn format:\n{ \"movies\": [\"Movie 1\", \"Movie 2\", \"Movie 3\", \"Movie 4\", \"Movie 5\"] }`;

    const endpoint = "https://api-inference.huggingface.co/pipeline/text2text-generation/google/flan-t5-small";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
        parameters: {
          max_new_tokens: 120,
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
    });

    const payload = await response.text();
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: payload || "Hugging Face request failed." }),
      };
    }

    let generatedText = payload;
    try {
      const data = JSON.parse(payload);
      if (Array.isArray(data) && data[0]?.generated_text) {
        generatedText = data[0].generated_text;
      }
    } catch {
      // leave generatedText as raw payload
    }

    const cleanedText = generatedText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (error) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Invalid AI response format." }),
      };
    }

    if (!Array.isArray(parsed.movies)) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI response did not contain a movie list." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ movies: parsed.movies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
};
