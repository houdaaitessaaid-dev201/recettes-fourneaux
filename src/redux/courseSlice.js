// redux/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
  },
  reducers: {
    addIngredients: (state, action) => {
      action.payload.forEach(ing => {
        if (!state.items.find(i => i.name === ing.name)) {
          state.items.push(ing);
        }
      });
    },
    removeIngredient: (state, action) => {
      state.items = state.items.filter(i => i.name !== action.payload);
    },
    clearList: (state) => {
      state.items = [];
    }
  }
});

export const { addIngredients, removeIngredient, clearList } = courseSlice.actions;
export default courseSlice.reducer;
