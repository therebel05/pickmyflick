import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    const data = await results.json();
    dispatch(addPopularMovies(data?.results));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
