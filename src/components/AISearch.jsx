import React, { useRef } from "react";
import gemini from "../utils/openai";
import { useDispatch } from "react-redux";
import { addMovieLists, addMovieNames } from "../utils/aiSlice";
import { options } from "../utils/constants";

const AISearch = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const getMovieByName = async (name) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      options
    );
    const movies = await data.json();
    return movies;
    // console.log(movies);
  };

  const handleAISearch = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `
    You are a movie recommendation system.

    Rules:
    - Recommend movies only
    - Suggest EXACTLY 5 movie names
    - Respond ONLY in valid JSON

    User query: "${searchText}"

    Return format:
    {
      "movies": ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
    }
      `,
    });
    const rawText = response.text;
    console.log("Raw AI text:", rawText);

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const data = JSON.parse(jsonMatch[0]);
    const movieNames = data.movies;
    console.log(movieNames);
    // const movieNames = [
    //   "Mahal",
    //   "Gumnaam",
    //   "Wo kaun Thi?",
    //   "Purani Haveli",
    //   "Bandh Darwaza",
    // ];

    dispatch(addMovieNames(movieNames));
    const promiseArr = movieNames.map((movieName) => getMovieByName(movieName));
    const moviesdata = await Promise.all(promiseArr);
    dispatch(addMovieLists(moviesdata));
    console.log(moviesdata);
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
