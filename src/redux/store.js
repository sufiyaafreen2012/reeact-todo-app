import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import taskReducer from './taskSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;