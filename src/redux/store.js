import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import courseReducer from "./courseSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    courses: courseReducer,  // ✅ ضروري يكون هكا
  },
});
