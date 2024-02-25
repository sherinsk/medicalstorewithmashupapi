// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    // other reducers can be added here
  },
});