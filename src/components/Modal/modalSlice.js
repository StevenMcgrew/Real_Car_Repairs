import { createSlice } from "@reduxjs/toolkit";

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
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.isOpen = true;
    },
    hideModal(state) {
      state.title = '';
      state.content = 'No content was supplied';
      state.isOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;