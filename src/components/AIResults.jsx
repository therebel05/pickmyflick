import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { options } from "../utils/constants";
import MovieList from "./MovieList";

const AIResults = () => {
  const movieNames = useSelector((store) => store.ai.movieNames);
  const movielists = useSelector((store) => store.ai.movielists);

  return (
    <div className="text-white">
      {movielists &&
        movieNames?.map((movie, index) => (
          <div>
            <MovieList
              key={index}
              category={movie}
              movies={movielists?.[index].results}
            />
          </div>
        ))}
    </div>
  );
};

export default AIResults;
