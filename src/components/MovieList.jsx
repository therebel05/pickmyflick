import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
                   z-10 bg-black/60 p-3 text-white rounded-full cursor-pointer h-24 items-center"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 
                   z-10 bg-black/60 p-3 text-white rounded-full cursor-pointer h-24 items-center"
      >
        <ChevronRight size={40} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto md:overflow-x-hidden scroll-smooth"
      >
        <div className="flex gap-4 flex-nowrap">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} poster={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
