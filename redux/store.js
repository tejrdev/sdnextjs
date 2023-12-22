'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkoutReducer from './features/checkout/checkoutSlice';
import authReducer from './features/auth/authSlice';

// import storage from "redux-persist/lib/storage";
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  checkout: checkoutReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
