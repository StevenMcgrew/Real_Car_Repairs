import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './components/Sidebar/sidebarSlice';
import modalReducer from './components/Modal/modalSlice';
import imageUploaderReducer from './components/ImageUploader/imageUploaderSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        modal: modalReducer,
        imageUploader: imageUploaderReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['imageUploader/setImageFile'],
            // ignoredActionPaths: ['imageUploader.imageFile'],
            ignoredPaths: ['imageUploader.imageFile']
        }
    })
});
