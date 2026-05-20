import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlaying && (
      <section className="bg-[#050505] text-white">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-red-400">
                  Browse Movies
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Curated collections for every mood
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-slate-300">
                Discover what’s trending, top rated, and upcoming in a more immersive view.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <MovieList category="Now Playing" movies={movies.nowPlaying} />
            <MovieList category="Popular" movies={movies.popular} />
            <MovieList category="Top Rated" movies={movies.topRated} />
            <MovieList category="Upcoming" movies={movies.upcoming} />
          </div>
        </div>
      </section>
    )
  );
};

export default MoviesContainer;
