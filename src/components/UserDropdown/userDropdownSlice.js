import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
};

const userDropdownSlice = createSlice({
    name: "userDropdown",
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = userDropdownSlice.actions;
export default userDropdownSlice.reducer;