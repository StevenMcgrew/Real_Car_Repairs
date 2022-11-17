import { createSlice } from "@reduxjs/toolkit";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const initialState = {
  isSlideInOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSlideInOpen(state) {
      if (state.isSlideInOpen) {
        const elementThatRetainsScroll = document.querySelector('.slidein-nav');
        enableBodyScroll(elementThatRetainsScroll);
        state.isSlideInOpen = false;
      }
      else {
        const elementThatRetainsScroll = document.querySelector('.slidein-nav');
        disableBodyScroll(elementThatRetainsScroll, { reserveScrollBarGap: true });
        state.isSlideInOpen = true;
      }
    },
  },
});

export const { toggleSlideInOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
