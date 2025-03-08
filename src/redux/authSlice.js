import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    userId: localStorage.getItem('userId') || null, // Added userId
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.userId = 'mock-user-123'; // Mock user ID
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', 'mock-user-123');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
      localStorage.removeItem('tasks');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;