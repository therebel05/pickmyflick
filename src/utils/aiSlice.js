import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "AI",
  initialState: {
    showAISearch: false,
    movieNames: null,
    movielists: null,
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
    },
  },
});

export const { toggleShowAISearch, addMovieNames, addMovieLists } =
  aiSlice.actions;
export default aiSlice.reducer;
