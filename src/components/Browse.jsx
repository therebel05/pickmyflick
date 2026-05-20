import Header from "./Header";
import HeroContainer from "./HeroContainer";
import MoviesContainer from "./MoviesContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import AIBrowse from "./AIBrowse";

const Browse = () => {
  const showAISearch = useSelector((store) => store.ai.showAISearch);
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlaying);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <AIBrowse />
      <MoviesContainer />
    </div>
  );
};

export default Browse;
