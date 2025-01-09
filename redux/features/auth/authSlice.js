'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  subscriber: '',
  trialStartDate: '',
  trialEndDate: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      state.user = action.payload.user;
      state.subscriber = action.payload.subscriber;
      state.trialStartDate = action.payload.trialStartDate;
      state.trialEndDate = action.payload.trialEndDate;
    },
    reset: (state) => {
      state.user = '';
      state.subscriber = '';
      state.trialStartDate = '';
      state.trialEndDate = '';
    },
  },
});

export const { auth, reset } = authSlice.actions;

export default authSlice.reducer;
