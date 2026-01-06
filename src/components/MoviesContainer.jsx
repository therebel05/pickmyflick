import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlaying && (
      <div className="bg-black text-white">
        <div className="relative -mt-4 md:-mt-36 pl-4 md:pl-4 z-20">
          <MovieList category="Now Playing" movies={movies.nowPlaying} />
          <MovieList category="Popular" movies={movies.popular} />
          <MovieList category="Top Rated" movies={movies.topRated} />
          <MovieList category="Upcoming" movies={movies.upcoming} />
        </div>
      </div>
    )
  );
};

export default MoviesContainer;
