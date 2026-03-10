import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const stored = localStorage.getItem("movieFavorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  } catch {
    // ignore
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((m) => m.imdbID === movie.imdbID);
      if (!exists) {
        state.items.push(movie);
        saveFavorites(state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      const imdbID = action.payload;
      state.items = state.items.filter((m) => m.imdbID !== imdbID);
      saveFavorites(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const selectIsFavorite = (state, imdbID) =>
  state.favorites.items.some((m) => m.imdbID === imdbID);

export default favoritesSlice.reducer;
