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
import toastReducer from './components/Toast/toastSlice';
import userDropdownReducer from './components/UserDropdown/userDropdownSlice';
import creationFormReducer from './forms/CreationForm/creationFormSlice';
import verifyStepDeleteReducer from './components/VerifyStepDelete/verifyStepDeleteSlice';
import loadingIndicatorReducer from './loaders/LoadingIndicator/loadingIndicatorSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        sidebar: sidebarReducer,
        modal: modalReducer,
        toast: toastReducer,
        userDropdown: userDropdownReducer,
        creationForm: creationFormReducer,
        verifyStepDelete: verifyStepDeleteReducer,
        loadingIndicator: loadingIndicatorReducer,
    }),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});

export const persistor = persistStore(store);