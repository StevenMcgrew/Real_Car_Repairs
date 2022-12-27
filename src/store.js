import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sidebarReducer from './components/Sidebar/sidebarSlice';
import modalReducer from './components/Modal/modalSlice';
import imageUploaderReducer from './components/ImageUploader/imageUploaderSlice';
import userDropdownReducer from './components/UserDropdown/userDropdownSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        sidebar: sidebarReducer,
        modal: modalReducer,
        imageUploader: imageUploaderReducer,
        userDropdown: userDropdownReducer,
    }),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'imageUploader/setImageFile',
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
            // ignoredActionPaths: [],
            ignoredPaths: ['imageUploader.imageFile']
        }
    })
});

export const persistor = persistStore(store);