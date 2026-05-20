import React from "react";
import { useDispatch } from "react-redux";
import { TMDB_POSTER_CDN_URL } from "../utils/constants";
import { selectMovie } from "../utils/movieSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const poster = movie?.poster_path;

  if (!poster) return null;

  return (
    <button
      type="button"
      onClick={() => dispatch(selectMovie(movie.id))}
      className="w-36 shrink-0 pr-4 text-left md:w-48 cursor-pointer"
      aria-label={`View details for ${movie.title || movie.name || "movie"}`}
    >
      <img
        className="rounded-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-950/40"
        src={`${TMDB_POSTER_CDN_URL}${poster}`}
        alt={movie.title || movie.name || "Movie poster"}
      />
    </button>
  );
};

export default MovieCard;
