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
    <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{category}</h1>
          <p className="text-sm text-slate-400">
            Swipe or use the arrows to browse the lineup.
          </p>
        </div>
      </div>

      <button
        onClick={() => scroll("left")}
        className="hidden group-hover:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black"
      >
        <ChevronRight size={32} />
      </button>

      <div
        ref={scrollRef}
        className="mt-5 flex overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
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
