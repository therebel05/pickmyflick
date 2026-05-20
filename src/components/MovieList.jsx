import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const skeletonCards = Array.from({ length: 8 }, (_, index) => index);

const MovieList = ({ category, movies, isLoading = false }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;

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

      {!isLoading && !!movies?.length && (
        <>
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black"
            aria-label={`Scroll ${category} left`}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-black/70 p-3 text-white shadow-lg transition hover:bg-black"
            aria-label={`Scroll ${category} right`}
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="mt-5 flex overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
      >
        <div className="flex gap-4 flex-nowrap">
          {isLoading
            ? skeletonCards.map((card) => <MovieCardSkeleton key={card} />)
            : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
};

export const MovieListSkeleton = ({ category = "Loading Movies" }) => (
  <MovieList category={category} movies={[]} isLoading />
);

const MovieCardSkeleton = () => (
  <div className="w-36 shrink-0 pr-4 md:w-48" aria-hidden="true">
    <div className="h-[216px] rounded-lg bg-white/10 shimmer md:h-[288px]" />
  </div>
);

export default MovieList;
