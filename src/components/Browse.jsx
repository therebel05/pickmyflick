import Header from "./Header";
import HeroContainer from "./HeroContainer";
import MoviesContainer from "./MoviesContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlaying);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <HeroContainer
        title={nowPlayingMovies?.[0].title}
        description={nowPlayingMovies?.[0].overview}
        movieId={nowPlayingMovies?.[0].id}
      />
      <MoviesContainer />
    </div>
  );
};

export default Browse;
