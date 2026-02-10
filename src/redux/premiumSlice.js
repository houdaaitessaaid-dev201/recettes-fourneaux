// redux/premiumSlice.js
import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: {
    purchasedMeals: [], // list of meals user purchased
  },
  reducers: {
    purchaseMeal: (state, action) => {
      if (!state.purchasedMeals.includes(action.payload)) {
        state.purchasedMeals.push(action.payload); // add meal to purchased list
      }
    },
  },
});

export const { purchaseMeal } = premiumSlice.actions;
export default premiumSlice.reducer;
