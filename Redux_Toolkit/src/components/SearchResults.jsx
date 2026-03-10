import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function SearchResults({ movies }) {
  return (
    <div className="search-results">
      <h2 className="search-results__title">Найденные фильмы</h2>
      <div className="search-results__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} compact />
        ))}
      </div>
    </div>
  );
}
