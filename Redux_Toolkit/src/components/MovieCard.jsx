import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites, selectIsFavorite } from "../store/slices/favoritesSlice";

export default function MovieCard({ movie, compact = false, showRemove = false }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, movie.imdbID));

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (showRemove) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const cardContent = (
    <>
      <div className="movie-card__poster-wrap">
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
          className="movie-card__poster"
        />
        <button
          type="button"
          className={`movie-card__favorite ${isFavorite || showRemove ? "movie-card__favorite--active" : ""}`}
          onClick={handleToggleFavorite}
          title={showRemove ? "Удалить из избранного" : isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          aria-label={showRemove ? "Удалить из избранного" : isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          ♥
        </button>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">{movie.Year}</p>
        {movie.imdbRating && (
          <p className="movie-card__rating">★ {movie.imdbRating}</p>
        )}
      </div>
    </>
  );

  if (compact) {
    return (
      <Link to={`/movie/${movie.imdbID}`} className="movie-card movie-card--compact">
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="movie-card">
      {cardContent}
    </div>
  );
}
