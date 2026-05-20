import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "AI",
  initialState: {
    showAISearch: false,
    movieNames: null,
    movielists: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleShowAISearch: (state) => {
      state.showAISearch = !state.showAISearch;
    },
    addMovieNames: (state, action) => {
      state.movieNames = action.payload;
    },
    addMovieLists: (state, action) => {
      state.movielists = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    startAISearch: (state) => {
      state.isLoading = true;
      state.error = null;
      state.movieNames = null;
      state.movielists = null;
    },
    failAISearch: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  toggleShowAISearch,
  addMovieNames,
  addMovieLists,
  startAISearch,
  failAISearch,
} = aiSlice.actions;
export default aiSlice.reducer;
