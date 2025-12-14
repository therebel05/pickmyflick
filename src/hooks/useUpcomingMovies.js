import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );

    const data = await results.json();

    dispatch(addUpcomingMovies(data?.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
