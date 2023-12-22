'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  subscriber: '',
  endDate: '',
  latitude: '',
  longitude: '',
  pincode: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      state.user = action.payload.user;
      state.subscriber = action.payload.subscriber;
      state.endDate = action.payload.endDate;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.pincode = action.payload.pincode;
    },
    reset: (state) => {
      state.user = '';
      state.subscriber = '';
      state.endDate = '';
      state.latitude = '';
      state.longitude = '';
      state.pincode = '';
    },
  },
});

export const { auth, reset } = authSlice.actions;

export default authSlice.reducer;
