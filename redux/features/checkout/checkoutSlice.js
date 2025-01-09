'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  stripeCustomer: '',
  proPlan: '',
  proPlanId: '',
  proPrice: '',
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkout: (state, action) => {
      state.user = action.payload.user;
      state.stripeCustomer = action.payload.stripeCustomer;
      state.proPlan = action.payload.proPlan;
      state.proPlanId = action.payload.proPlanId;
      state.proPrice = action.payload.proPrice;
    },
    reset: (state) => {
      state.user = '';
      state.stripeCustomer = '';
      state.proPlan = '';
      state.proPlanId = '';
      state.proPrice = '';
    },
  },
});

export const { checkout, reset } = checkoutSlice.actions;

export default checkoutSlice.reducer;
