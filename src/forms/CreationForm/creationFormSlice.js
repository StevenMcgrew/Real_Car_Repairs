import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { showToast } from '../../components/Toast/toastSlice.js';
import { showModal } from '../../components/Modal/modalSlice';
import { showLoader, hideLoader } from "../../loaders/LoadingIndicator/loadingIndicatorSlice.js";
import { scrollToBottom, arrayMove } from '../../utils/general-utils';


const initialState = {
    imgStepNum: 0,
    post: {
        id: 0,
        year: '',
        make: '',
        model: '',
        engine: '',
        title: '',
        tags: ['', '', '', '', ''],
        steps: [{ img: '', text: '' }],
        thumbnail: '',
        is_published: false
    }
};

const creationFormSlice = createSlice({
    name: "creationForm",
    initialState,
    reducers: {
        setImgStepNum(state, action) {
            state.imgStepNum = action.payload;
        },
        setPostId(state, action) {
            state.post.id = action.payload;
        },
        setYear(state, action) {
            state.post.year = action.payload;
        },
        setMake(state, action) {
            state.post.make = action.payload;
        },
        setModel(state, action) {
            state.post.model = action.payload;
        },
        setEngine(state, action) {
            state.post.engine = action.payload;
        },
        setTitle(state, action) {
            state.post.title = action.payload;
        },
        setTag(state, action) {
            const targetIndex = action.payload.index;
            const newTag = action.payload.newTag;
            const newArray = [...state.post.tags];
            newArray[targetIndex] = newTag;
            state.post.tags = newArray;
        },
        setStepText(state, action) {
            const targetIndex = action.payload.stepNum - 1;
            const newText = action.payload.newText;
            const step = state.post.steps.find((step, index) => index === targetIndex);
            if (step) {
                step.text = newText;
            }
        },
        setStepImg(state, action) {
            const targetIndex = action.payload.stepNum - 1;
            const newImg = action.payload.newImg;
            const step = state.post.steps.find((step, index) => index === targetIndex);
            if (step) {
                step.img = newImg;
            }
        },
        setThumbnail(state, action) {
            state.post.thumbnail = action.payload;
        },
        setIsPublished(state, action) {
            state.post.is_published = action.payload;
        },
        deleteStep(state, action) {
            const newSteps = state.post.steps.filter((step, index) => index !== (action.payload - 1));
            state.post.steps = newSteps;
            // state.post.steps.splice(action.payload - 1, 1);
        },
        addStep(state) {
            state.post.steps.push({ img: '', text: '' });
            setTimeout(() => {
                // Wait a little for DOM elements to load, then scroll to bottom
                scrollToBottom();
            }, 300);
        },
        addStepAt(state, action) {
            let targetIndex = action.payload;
            let newStep = { img: '', text: '' };
            state.post.steps.splice(targetIndex, 0, newStep);
        },
        moveStep(state, action) {
            let newSteps = [...state.post.steps];
            let from = action.payload.from - 1;
            let to = action.payload.to - 1;
            arrayMove(newSteps, from, to);
            state.post.steps = newSteps;
        },
        resetPost(state) {
            state.post = {
                id: 0,
                year: 0,
                make: '',
                model: '',
                engine: '',
                title: '',
                tags: ['', '', '', '', ''],
                steps: [{ img: '', text: '' }],
                thumbnail: '',
                is_published: false
            };
        },
    },
});

export const {
    setImgStepNum,
    setPostId,
    setYear,
    setMake,
    setModel,
    setEngine,
    setTitle,
    setTag,
    setStepText,
    setStepImg,
    setThumbnail,
    setIsPublished,
    deleteStep,
    addStep,
    addStepAt,
    moveStep,
    resetPost, } = creationFormSlice.actions;

export default creationFormSlice.reducer;