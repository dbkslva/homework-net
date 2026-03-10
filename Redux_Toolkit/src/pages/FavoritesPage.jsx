import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__empty">
          <p>В избранном пока нет фильмов</p>
          <Link to="/" className="favorites-page__link">
            Перейти к поиску
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2 className="favorites-page__title">Избранное</h2>
      <div className="favorites-page__grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} compact showRemove />
        ))}
      </div>
    </div>
  );
}
