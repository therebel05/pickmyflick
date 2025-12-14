import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieVideos = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const results = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const videos = await results.json();
    const trailers = videos.results.filter((video) => video.type === "Trailer");
    const trailer = trailers.length ? trailers[0] : videos.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieVideos;
