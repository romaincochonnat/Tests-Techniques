"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [] as string[], // assuming colors are strings, you can change the type accordingly
};

export const colorsSlice = createSlice({
  name: "colors",

  initialState,
  reducers: {
    addColorsToStore: (state, action) => {
      if (state.value.length < 10) {
        state.value.push(action.payload);
      } else {
        state.value.push(action.payload);
        state.value.shift(); // Removes the first element
      }
    },
  },
});

// Correct export of actions and reducer
export const { addColorsToStore } = colorsSlice.actions;
export default colorsSlice.reducer;
