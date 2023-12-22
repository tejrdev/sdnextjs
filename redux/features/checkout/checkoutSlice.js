'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  stripePlan: '',
  stripeCustomer: '',
  subscriptionId: '',
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkout: (state, action) => {
      state.user = action.payload.user;
      state.stripePlan = action.payload.planId;
      state.stripeCustomer = action.payload.stripeCustomer;
      state.subscriptionId = action.payload.subscriptionId;
    },
    reset: (state) => {
      state.user = '';
      state.stripePlan = '';
      state.stripeCustomer = '';
      state.subscriptionId = '';
    },
  },
});

export const { checkout, reset } = checkoutSlice.actions;

export default checkoutSlice.reducer;
