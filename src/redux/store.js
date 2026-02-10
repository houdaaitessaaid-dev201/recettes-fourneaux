import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import courseReducer from "./courseSlice";
import premiumReducer from "./premiumSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    courses: courseReducer,
    premium: premiumReducer, // ✅ Added premium slice
  },
});
