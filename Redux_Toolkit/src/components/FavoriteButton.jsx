import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites, selectIsFavorite } from "../store/slices/favoritesSlice";

export default function FavoriteButton({ movie }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, movie.imdbID));

  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <button
      type="button"
      className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
      onClick={handleClick}
    >
      {isFavorite ? "★ В избранном" : "☆ Добавить в избранное"}
    </button>
  );
}
