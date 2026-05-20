import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addMovieLists, addMovieNames } from "../utils/aiSlice";
import { options } from "../utils/constants";
import { fetchAIRecommendations } from "../utils/openai";

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
    const searchText = searchRef.current.value?.trim();
    if (!searchText) {
      alert("Please enter something to search for.");
      return;
    }

    try {
      const movieNames = await fetchAIRecommendations(searchText);
      if (!movieNames?.length) {
        throw new Error("AI did not return any movie recommendations.");
      }

      dispatch(addMovieNames(movieNames));
      const promiseArr = movieNames.map((movieName) => getMovieByName(movieName));
      const moviesdata = await Promise.all(promiseArr);

      dispatch(addMovieLists(moviesdata));
    } catch (error) {
      console.error("AI Search Error:", error);
      alert(error.message || "AI Request failed");
    }
  };

  return (
    <div className="text-white flex justify-center">
      <form className="grid w-full gap-4 rounded-[2rem] border border-white/10 bg-slate-950/25 p-4 shadow-xl md:w-full md:grid-cols-[1fr_auto]"
        onSubmit={handleAISearch}
      >
        <input
          ref={searchRef}
          className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-4 text-sm text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 placeholder:text-slate-400"
          type="text"
          placeholder="What type of movie would you like to watch today?"
        />
        <button
          className="w-full rounded-2xl bg-red-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 md:w-auto"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default AISearch;
