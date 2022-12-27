import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: 0,
};

const creationFormSlice = createSlice({
    name: "creationForm",
    initialState,
    reducers: {
        setPostId(state, action) {
            state.postId = action.payload;
        },
    },
});

export const { setPostId } = creationFormSlice.actions;
export default creationFormSlice.reducer;