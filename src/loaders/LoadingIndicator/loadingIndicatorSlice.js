import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    msg: '',
};

const loadingIndicatorSlice = createSlice({
    name: "loadingIndicator",
    initialState,
    reducers: {
        showLoader(state, action) {
            state.msg = action.payload;
            state.isOpen = true;
        },
        hideLoader(state) {
            state.msg = '';
            state.isOpen = false;
        },
    },
});

export const { showLoader, hideLoader } = loadingIndicatorSlice.actions;
export default loadingIndicatorSlice.reducer;