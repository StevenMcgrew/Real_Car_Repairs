import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageFile: null,
};

const imageUploaderSlice = createSlice({
    name: "imageUploader",
    initialState,
    reducers: {
        setImageFile(state, action) {
            state.imageFile = action.payload;
        },
    },
});

export const { setImageFile } = imageUploaderSlice.actions;
export default imageUploaderSlice.reducer;