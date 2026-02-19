import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addMovieLists, addMovieNames } from "../utils/aiSlice";
import { options } from "../utils/constants";
import { getGeminiClient } from "../utils/openai";

const AISearch = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const getMovieByName = async (name) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      options,
    );
    const movies = await data.json();
    return movies;
    // console.log(movies);
  };

  const handleAISearch = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value;

    // 1. Get the key from localStorage
    const userAPIKey = localStorage.getItem("user_gemini_key");

    if (!userAPIKey) {
      alert("Please go to your profile and enter your Gemini API Key first!");
      return;
    }

    try {
      // 2. Initialize the Client using your helper
      const client = getGeminiClient(userAPIKey);

      const prompt = `
      You are a movie recommendation system.
      Rules:
      - Recommend movies only
      - Suggest EXACTLY 5 movie names
      - Respond ONLY in valid JSON
      User query: "${searchText}"
      Return format:
      { "movies": ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"] }
    `;

      // 3. NEW SYNTAX: Call generateContent directly on client.models
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash-lite", // or "gemini-1.5-flash"
        contents: prompt,
        // Optional: Force JSON mode so you don't need Regex
        config: { responseMimeType: "application/json" },
      });

      // 4. Extract text (In @google/genai, it is response.text)
      const rawText = response.text;
      console.log("AI Response:", rawText);
      const cleanedText = rawText
        .replace(/```json/g, "") // Remove opening ```json
        .replace(/```/g, "") // Remove closing ```
        .trim(); // Remove extra spaces/newlines

      // 2. Parse the cleaned string
      const data = JSON.parse(cleanedText);

      const movieNames = data.movies;

      // 5. Rest of your logic
      dispatch(addMovieNames(movieNames));
      const promiseArr = movieNames.map((movieName) =>
        getMovieByName(movieName),
      );
      const moviesdata = await Promise.all(promiseArr);

      dispatch(addMovieLists(moviesdata));
    } catch (error) {
      console.error("AI Search Error:", error);
      // Error handling stays the same
      alert(
        error.message.includes("401") ? "Invalid API Key" : "AI Request failed",
      );
    }
  };

  return (
    <div className="text-white flex justify-center">
      <form className="bg-black grid grid-cols-12 pb-8 w-full md:w-3/4">
        <input
          ref={searchRef}
          className="col-span-9 border-red-700 border mx-2 px-2 py-4 rounded-lg"
          type="text"
          placeholder="What type of movie would you like to watch today?"
        />
        <button
          className="col-span-3 bg-red-700 cursor-pointer rounded-lg mr-4 px-4 w-full"
          onClick={handleAISearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default AISearch;
