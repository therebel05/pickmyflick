import Header from "./Header";
import MoviesContainer from "./MoviesContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import AIBrowse from "./AIBrowse";
import MovieDetailsModal from "./MovieDetailsModal";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <AIBrowse />
      <MoviesContainer />
      <MovieDetailsModal />
    </div>
  );
};

export default Browse;
