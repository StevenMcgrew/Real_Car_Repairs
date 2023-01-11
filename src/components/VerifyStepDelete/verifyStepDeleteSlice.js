import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteStepNum: 0
};

const verifyStepDeleteSlice = createSlice({
    name: "verifyStepDelete",
    initialState,
    reducers: {
        setDeleteStepNum(state, action) {
            state.deleteStepNum = action.payload;
        },
    },
});

export const { setDeleteStepNum } = verifyStepDeleteSlice.actions;
export default verifyStepDeleteSlice.reducer;