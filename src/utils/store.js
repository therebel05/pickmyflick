import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import aiReducer from "./aiSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    ai: aiReducer,
  },
});

export default appStore;
