import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );

    const data = await results.json();

    dispatch(addTopRatedMovies(data?.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
