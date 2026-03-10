import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "64405bd2";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMoviesBySearch = createAsyncThunk(
  "movies/fetchBySearch",
  async (searchTerm, { rejectWithValue }) => {
    if (!searchTerm?.trim()) {
      return rejectWithValue("Введите название фильма");
    }
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      return rejectWithValue("Фильмы не найдены");
    }
    return data;
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchById",
  async (imdbID, { rejectWithValue }) => {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      return rejectWithValue(data.Error || "Фильм не найден");
    }
    return data;
  }
);

const initialState = {
  searchResults: [],
  totalResults: 0,
  selectedMovie: null,
  loading: false,
  loadingDetail: false,
  error: null,
  searchTerm: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.totalResults = 0;
      state.error = null;
      state.searchTerm = "";
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMoviesBySearch
      .addCase(fetchMoviesBySearch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.searchTerm = action.meta.arg?.trim() || "";
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults || "0", 10);
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.searchResults = [];
        state.totalResults = 0;
        state.error = action.payload || "Ошибка при поиске";
      })
      // fetchMovieById
      .addCase(fetchMovieById.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.selectedMovie = null;
      });
  },
});

export const { clearSearch, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
