import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ category, movies }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6 my-4 relative group">
      <h1 className="text-2xl font-semibold p-1">{category}</h1>
      <button
        onClick={() => scroll("left")}
        className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 
                   z-10 bg-black/60 p-3 text-white rounded-full cursor-pointer h-full items-center"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 
                   z-10 bg-black/60 p-3 text-white rounded-full cursor-pointer h-full items-center"
      >
        ▶
      </button>

      <div ref={scrollRef} className="flex overflow-x-hidden scroll-smooth">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} poster={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
