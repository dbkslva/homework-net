import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, clearSelectedMovie } from "../store/slices/moviesSlice";
import FavoriteButton from "../components/FavoriteButton";

export default function MovieDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loadingDetail } = useSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
    return () => dispatch(clearSelectedMovie());
  }, [id, dispatch]);

  if (loadingDetail) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__loader">
          <div className="loader" />
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__empty">
          <p>Фильм не найден</p>
          <Link to="/" className="movie-detail__back">
            ← Вернуться к поиску
          </Link>
        </div>
      </div>
    );
  }

  const movie = selectedMovie;

  return (
    <div className="movie-detail">
      <Link to="/" className="movie-detail__back">
        ← Вернуться к поиску
      </Link>
      <article className="movie-detail__card">
        <div className="movie-detail__poster-wrap">
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={movie.Title}
            className="movie-detail__poster"
          />
        </div>
        <div className="movie-detail__info">
          <h1 className="movie-detail__title">{movie.Title}</h1>
          {movie.imdbRating && (
            <p className="movie-detail__rating">★ {movie.imdbRating}</p>
          )}
          <dl className="movie-detail__meta">
            {movie.Year && (
              <>
                <dt>Год</dt>
                <dd>{movie.Year}</dd>
              </>
            )}
            {movie.Genre && (
              <>
                <dt>Жанр</dt>
                <dd>{movie.Genre}</dd>
              </>
            )}
            {movie.Runtime && (
              <>
                <dt>Продолжительность</dt>
                <dd>{movie.Runtime}</dd>
              </>
            )}
            {movie.Director && (
              <>
                <dt>Режиссёр</dt>
                <dd>{movie.Director}</dd>
              </>
            )}
            {movie.Actors && (
              <>
                <dt>Актёры</dt>
                <dd>{movie.Actors}</dd>
              </>
            )}
          </dl>
          <div className="movie-detail__actions">
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </article>
    </div>
  );
}
