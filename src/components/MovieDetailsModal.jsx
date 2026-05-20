import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Star,
  X,
} from "lucide-react";
import {
  options,
  TMDB_BACKDROP_CDN_URL,
  TMDB_POSTER_CDN_URL,
} from "../utils/constants";
import { clearSelectedMovie } from "../utils/movieSlice";

const formatRuntime = (minutes) => {
  if (!minutes) return "Runtime unavailable";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours}h ${mins}m` : `${mins}m`;
};

const formatCurrency = (amount) => {
  if (!amount) return "Not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date) => {
  if (!date) return "Release date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const MovieDetailsModal = () => {
  const dispatch = useDispatch();
  const selectedMovieId = useSelector((store) => store.movies.selectedMovieId);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const closeModal = useCallback(() => {
    dispatch(clearSelectedMovie());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedMovieId) return;

    const controller = new AbortController();
    setMovie(null);
    setError("");
    setIsLoading(true);

    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}?language=en-US`,
          { ...options, signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not load movie details.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getMovieDetails();

    return () => controller.abort();
  }, [selectedMovieId]);

  useEffect(() => {
    if (!selectedMovieId) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, selectedMovieId]);

  const backdropUrl = useMemo(() => {
    if (!movie?.backdrop_path) return "";
    return `${TMDB_BACKDROP_CDN_URL}${movie.backdrop_path}`;
  }, [movie?.backdrop_path]);

  if (!selectedMovieId) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label={movie?.title ? `${movie.title} details` : "Movie details"}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#070707] text-white shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
          aria-label="Close movie details"
        >
          <X size={22} />
        </button>

        {isLoading && (
          <div className="flex min-h-[520px] items-center justify-center">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Loading details
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-semibold text-white">{error}</p>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Close
            </button>
          </div>
        )}

        {!isLoading && !error && movie && (
          <div>
            <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px]">
              {backdropUrl && (
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={backdropUrl}
                  alt=""
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/65 to-black/20" />
              <div className="relative z-10 flex min-h-[280px] items-end px-6 pb-8 pt-20 md:min-h-[360px] md:px-10">
                <div className="grid w-full gap-6 md:grid-cols-[180px_1fr] md:items-end">
                  {movie.poster_path && (
                    <img
                      className="hidden w-full rounded-xl shadow-2xl shadow-black/60 md:block"
                      src={`${TMDB_POSTER_CDN_URL}${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                    />
                  )}
                  <div>
                    {movie.tagline && (
                      <p className="mb-3 text-sm italic text-red-200">
                        {movie.tagline}
                      </p>
                    )}
                    <h2 className="text-3xl font-bold md:text-5xl">
                      {movie.title}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {movie.genres?.map((genre) => (
                        <span
                          key={genre.id}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 px-6 pb-8 md:grid-cols-[1fr_320px] md:px-10">
              <div>
                <p className="text-base leading-7 text-slate-200">
                  {movie.overview || "No overview available for this movie."}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={<Star size={18} />}
                    label="Rating"
                    value={`${movie.vote_average?.toFixed(1) || "N/A"} / 10`}
                  />
                  <InfoItem
                    icon={<Clock size={18} />}
                    label="Runtime"
                    value={formatRuntime(movie.runtime)}
                  />
                  <InfoItem
                    icon={<Calendar size={18} />}
                    label="Release"
                    value={formatDate(movie.release_date)}
                  />
                  <InfoItem
                    icon={<Globe size={18} />}
                    label="Language"
                    value={movie.original_language?.toUpperCase() || "N/A"}
                  />
                </div>
              </div>

              <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <div className="space-y-5">
                  <InfoItem
                    icon={<DollarSign size={18} />}
                    label="Budget"
                    value={formatCurrency(movie.budget)}
                  />
                  <InfoItem
                    icon={<DollarSign size={18} />}
                    label="Revenue"
                    value={formatCurrency(movie.revenue)}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </p>
                    <p className="mt-1 font-medium text-white">
                      {movie.status || "Unknown"}
                    </p>
                  </div>
                  {!!movie.production_companies?.length && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Studio
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {movie.production_companies
                          .slice(0, 3)
                          .map((company) => company.name)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                  {(movie.homepage || movie.imdb_id) && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {movie.homepage && (
                        <ExternalLinkButton href={movie.homepage}>
                          Website
                        </ExternalLinkButton>
                      )}
                      {movie.imdb_id && (
                        <ExternalLinkButton
                          href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        >
                          IMDb
                        </ExternalLinkButton>
                      )}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
    <div className="mt-0.5 text-red-400">{icon}</div>
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  </div>
);

const ExternalLinkButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
  >
    {children}
    <ExternalLink size={15} />
  </a>
);

export default MovieDetailsModal;
