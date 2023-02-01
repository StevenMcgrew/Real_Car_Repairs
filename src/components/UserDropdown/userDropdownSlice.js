import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    view_history: [],
    profile_pic: '',
    theme: 'light',
    color: 'blue'
};

const userDropdownSlice = createSlice({
    name: "userDropdown",
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setViewHistory(state, action) {
            state.view_history = action.payload;
        },
        setProfilePic(state, action) {
            state.profile_pic = action.payload;
        },
        setTheme(state, action) {
            state.theme = action.payload;
            document.body.className = (action.payload === 'dark') ? 'dark-theme' : '';
        },
        setColor(state, action) {
            state.color = action.payload;
            document.documentElement.className = (action.payload === 'blue') ? '' : action.payload;
        }
    },
});

export const {
    setUsername,
    setViewHistory,
    setProfilePic,
    setTheme,
    setColor
} = userDropdownSlice.actions;
export default userDropdownSlice.reducer;