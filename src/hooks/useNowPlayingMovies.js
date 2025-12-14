import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    const data = await results.json();
    dispatch(addNowPlayingMovies(data?.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
