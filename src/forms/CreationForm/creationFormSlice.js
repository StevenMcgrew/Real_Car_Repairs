import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: 0,
    stepNum: 0,
    steps: [{ img: '', text: '' }],
};

const creationFormSlice = createSlice({
    name: "creationForm",
    initialState,
    reducers: {
        setPostId(state, action) {
            state.postId = action.payload;
        },
        setStepNum(state, action) {
            state.stepNum = action.payload;
        },
        setStepText(state, action) {
            const targetIndex = action.payload.stepNum - 1;
            const newText = action.payload.newText;
            const step = state.steps.find((step, index) => index === targetIndex);
            if (step) {
                step.text = newText;
            }
        },
        setStepImg(state, action) {
            const targetIndex = action.payload.stepNum - 1;
            const newImg = action.payload.newImg;
            const step = state.steps.find((step, index) => index === targetIndex);
            if (step) {
                step.img = newImg;
            }
        },
        deleteStep(state, action) {
            // Need to refactor
            // state.steps.splice(action.payload - 1, 1);
        },
        addStep(state) {
            state.steps.push({ img: '', text: '' });
        }
    },
});

export const { setPostId, setStepNum, setStepText, setStepImg, deleteStep, addStep } = creationFormSlice.actions;
export default creationFormSlice.reducer;