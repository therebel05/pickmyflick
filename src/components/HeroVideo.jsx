import React from "react";
import useMovieVideos from "../hooks/useMovieVideos";
import { useSelector } from "react-redux";

const HeroVideo = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies.trailerVideo);

  useMovieVideos(movieId);

  return (
    <div>
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailer?.key}?si=Gq2CrKLgn_9koAXo&autoplay=1&mute=1&loop=1&controls=0&color=black`}
        // title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default HeroVideo;
