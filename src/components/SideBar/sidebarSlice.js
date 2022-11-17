import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSlideInOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSlideInOpen(state) {
      state.isSlideInOpen = !state.isSlideInOpen;
    },
  },
});

export const { toggleSlideInOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
