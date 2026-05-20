import React from "react";
import { useSelector } from "react-redux";
import MovieList, { MovieListSkeleton } from "./MovieList";

const loadingRows = [
  "Asking AI for ideas",
  "Matching movies on TMDB",
  "Preparing your watchlist",
];

const AIResults = () => {
  const movieNames = useSelector((store) => store.ai.movieNames);
  const movielists = useSelector((store) => store.ai.movielists);
  const isLoading = useSelector((store) => store.ai.isLoading);
  const error = useSelector((store) => store.ai.error);

  return (
    <div className="mt-6 text-white">
      {isLoading && (
        <div className="space-y-4">
          {loadingRows.map((row) => (
            <MovieListSkeleton key={row} category={row} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-950/30 px-5 py-4 text-sm text-red-100">
          {error}
        </div>
      )}

      {movielists &&
        movieNames?.map((movie, index) => (
          <div className="my-4" key={`${movie}-${index}`}>
            <MovieList
              category={movie}
              movies={movielists?.[index].results}
            />
          </div>
        ))}
    </div>
  );
};

export default AIResults;
