const API_BASE = import.meta.env.VITE_AI_API_BASE?.replace(/\/$/, "") || "/api";

export const fetchAIRecommendations = async (query) => {
  const response = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "AI request failed");
  }

  return data.movies;
};
