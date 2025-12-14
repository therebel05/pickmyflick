import React from "react";
import { TMDB_POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ poster }) => {
  if (!poster) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img
        className=" rounded-lg"
        src={`${TMDB_POSTER_CDN_URL}${poster}`}
        alt=""
      />
    </div>
  );
};

export default MovieCard;
