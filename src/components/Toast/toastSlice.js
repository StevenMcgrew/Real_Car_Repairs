import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    content: 'Error: No content supplied to Toast.',
    toastStyle: ''
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast(state, action) {
            state.toastStyle = action.payload.toastStyle;
            state.content = action.payload.content;
            state.isOpen = true;
        },
        hideToast(state) {
            state.isOpen = false;
            state.content = 'Error: No content supplied to Toast.';
            state.toastStyle = '';
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;