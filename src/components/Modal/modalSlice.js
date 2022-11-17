import { createSlice } from "@reduxjs/toolkit";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const initialState = {
  isOpen: false,
  title: '',
  content: 'No content was supplied',
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      const elementThatRetainsScroll = document.querySelector('.modal');
      disableBodyScroll(elementThatRetainsScroll, { reserveScrollBarGap: true });
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.isOpen = true;
    },
    hideModal(state) {
      const elementThatRetainsScroll = document.querySelector('.modal');
      enableBodyScroll(elementThatRetainsScroll);
      state.title = '';
      state.content = 'No content was supplied';
      state.isOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;