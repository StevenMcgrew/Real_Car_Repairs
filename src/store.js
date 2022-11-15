import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './components/Sidebar/sidebarSlice';
import modalReducer from './components/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    modal: modalReducer,
  },
});
