import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesBySearch } from "../store/slices/moviesSlice";
import SearchResults from "../components/SearchResults";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { searchResults, loading, error, searchTerm } = useSelector(
    (state) => state.movies
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed) {
        dispatch(fetchMoviesBySearch(trimmed));
      }
    },
    [inputValue, dispatch]
  );

  const hasSearched = searchTerm.length > 0;
  const showEmpty = hasSearched && !loading && searchResults.length === 0 && !error;

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Введите название фильма..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <button type="submit" className="search-form__btn" disabled={loading}>
          {loading ? "Поиск..." : "Найти"}
        </button>
      </form>

      {loading && (
        <div className="search-page__loader">
          <div className="loader" />
          <p>Загрузка...</p>
        </div>
      )}

      {error && (
        <div className="search-page__message search-page__message--error">
          {error}
        </div>
      )}

      {showEmpty && (
        <div className="search-page__message search-page__message--empty">
          Фильмы не найдены
        </div>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <SearchResults movies={searchResults} />
      )}
    </div>
  );
}
