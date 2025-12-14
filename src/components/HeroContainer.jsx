import React, { useEffect } from "react";
import { options } from "../utils/constants";
import HeroTitle from "./HeroTitle";
import HeroVideo from "./HeroVideo";
import { useSelector } from "react-redux";

const HeroContainer = () => {
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlaying);

  if (!nowPlayingMovies) return;

  const heroMovie = nowPlayingMovies[0];

  const { original_title, overview, id } = heroMovie;

  return (
    <div className="bg-black">
      <HeroTitle title={original_title} description={overview} />
      <HeroVideo movieId={id} />
    </div>
  );
};

export default HeroContainer;
