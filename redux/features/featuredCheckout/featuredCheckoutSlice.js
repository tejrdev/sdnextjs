'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  stripeCustomer: '',
  listing: '',
  listingType: '',
  listingPrice: '',
  listingPlan: '',
  listingPlanId: '',
  listingUrl: '',
};

export const featuredCheckoutSlice = createSlice({
  name: 'featuredCheckout',
  initialState,
  reducers: {
    featuredCheckout: (state, action) => {
      state.user = action.payload.user;
      state.stripeCustomer = action.payload.stripeCustomer;
      state.listing = action.payload.listing;
      state.listingType = action.payload.listingType;
      state.listingPrice = action.payload.listingPrice;
      state.listingPlan = action.payload.listingPlan;
      state.listingPlanId = action.payload.listingPlanId;
      state.listingUrl = action.payload.listingUrl;
    },
    reset: (state) => {
      state.user = '';
      state.stripeCustomer = '';
      state.listing = '';
      state.listingType = '';
      state.listingPrice = '';
      state.listingPlan = '';
      state.listingPlanId = '';
      state.listingUrl = '';
    },
  },
});

export const { featuredCheckout, reset } = featuredCheckoutSlice.actions;

export default featuredCheckoutSlice.reducer;
